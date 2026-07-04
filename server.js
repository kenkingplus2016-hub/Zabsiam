const express = require('express');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
// Initialize Stripe with a test key (replace with your real key later)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_replace_me');
const nodemailer = require('nodemailer');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Set up Nodemailer transporter using Khrua Thai Outlook
const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'khruathailondon@outlook.com',
        pass: 'Nisha13ken#'
    },
    tls: {
        ciphers: 'SSLv3'
    }
});
const app = express();
const PORT = process.env.PORT || 8080;

// Set up storage for uploaded images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'public', 'images'));
    },
    filename: function (req, file, cb) {
        // Keep original filename to easily replace existing images
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const line = require('@line/bot-sdk');

// LINE Messaging API Configuration
const lineConfig = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '1RwOWm/xr9A2ZjB/DtyKWdDLLZR3OOazbCqFjw6YWWbaFMbeLwXo92TJeMWDhHu1B305V2LT97tNHfgBVXLNOnB/d+qgMN/xA5PMkEAZbTw71jf8HJo2ey4XoOcfXHAqv1sLOW/rk0ICnCMo7Hqi0QdB04t89/1O/w1cDnyilFU=',
    channelSecret: process.env.LINE_CHANNEL_SECRET || '675ce1d6a258a621e5c5d2aa1223dce8'
};
const lineClient = new line.Client(lineConfig);

// Route for LINE Webhook - MUST be before express.json()
app.post('/api/line-webhook', line.middleware(lineConfig), (req, res) => {
    Promise
      .all(req.body.events.map(handleLineEvent))
      .then((result) => res.json(result))
      .catch((err) => {
        console.error("LINE Webhook Error:", err);
        res.status(500).end();
      });
});

async function handleLineEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }
    
    const text = event.message.text.trim();
    const args = text.split(/\s+/);
    const command = args[0];
    
    const invPath = path.join(__dirname, 'data', 'inventory.json');
    let inventory = [];
    try {
        inventory = JSON.parse(fs.readFileSync(invPath, 'utf8'));
    } catch(e) {
        console.error("Cannot read inventory", e);
    }

    let replyText = '';

    if (command === 'สต็อก') {
        let lowStock = inventory.filter(item => item.quantity <= item.min_threshold);
        if (lowStock.length > 0) {
            replyText = '⚠️ รายการที่ใกล้หมด/หมดแล้ว:\n\n';
            lowStock.forEach(item => {
                replyText += `- ${item.name}: ${item.quantity} ${item.unit}\n`;
            });
            replyText += '\n(พิมพ์ "สต็อกทั้งหมด" เพื่อดูทุกรายการ)';
        } else {
            replyText = '✅ สต็อกสินค้าทุกรายการยังปกติครับ\n(พิมพ์ "สต็อกทั้งหมด" เพื่อดูทุกรายการ)';
        }
    } else if (command === 'สต็อกทั้งหมด') {
        replyText = '📦 รายการสต็อกทั้งหมด:\n\n';
        inventory.forEach(item => {
            const warning = item.quantity <= item.min_threshold ? ' ⚠️' : '';
            replyText += `- ${item.name}: ${item.quantity} ${item.unit}${warning}\n`;
        });
    } else if (command === 'เบิก' || command === 'เติม') {
        if (args.length < 3) {
            replyText = `❌ รูปแบบคำสั่งไม่ถูกต้อง\nตัวอย่าง: ${command} น้ำปลา 2`;
        } else {
            const amount = parseInt(args[args.length - 1]);
            const itemName = args.slice(1, -1).join(' ').toLowerCase();
            
            if (isNaN(amount) || amount <= 0) {
                replyText = '❌ จำนวนต้องเป็นตัวเลขที่มากกว่า 0';
            } else {
                // Find item (fuzzy match)
                const itemIndex = inventory.findIndex(i => i.name.toLowerCase().includes(itemName));
                
                if (itemIndex === -1) {
                    replyText = `❌ ไม่พบสินค้าที่ชื่อคล้าย "${itemName}" ในระบบ`;
                } else {
                    const item = inventory[itemIndex];
                    if (command === 'เบิก') {
                        item.quantity -= amount;
                        replyText = `✅ เบิก ${item.name} จำนวน ${amount} ${item.unit} เรียบร้อย\n📦 คงเหลือ: ${item.quantity} ${item.unit}`;
                    } else {
                        item.quantity += amount;
                        replyText = `✅ เติม ${item.name} จำนวน ${amount} ${item.unit} เรียบร้อย\n📦 คงเหลือ: ${item.quantity} ${item.unit}`;
                    }
                    
                    try {
                        fs.writeFileSync(invPath, JSON.stringify(inventory, null, 4), 'utf8');
                    } catch(e) {
                        replyText = '❌ เกิดข้อผิดพลาดในการบันทึกสต็อก';
                    }
                }
            }
        }
    } else if (command === 'ตั้งห้องครัว') {
        const targetId = event.source.groupId || event.source.roomId || event.source.userId;
        const groupPath = path.join(__dirname, 'data', 'kitchen_group.json');
        try {
            fs.writeFileSync(groupPath, JSON.stringify({ targetId }, null, 4), 'utf8');
            replyText = '✅ ตั้งค่าห้องครัวสำเร็จ!\nจากนี้ไประบบจะส่งออเดอร์ใหม่เข้ากลุ่มนี้ครับ 🛎️';
        } catch(e) {
            replyText = '❌ เกิดข้อผิดพลาดในการตั้งค่าห้องครัว';
        }
    } else if (command === 'สูตร') {
        const recipesPath = path.join(__dirname, 'data', 'recipes.csv');
        let recipesCsv = '';
        try { recipesCsv = fs.readFileSync(recipesPath, 'utf8'); } catch(e) {}
        
        const requestedMenu = args.slice(1).join(' ').trim();
        
        function parseCSVLine(line) {
            const result = [];
            let current = '';
            let inQuotes = false;
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                if (char === '"') inQuotes = !inQuotes;
                else if (char === ',' && !inQuotes) { result.push(current.trim()); current = ''; }
                else current += char;
            }
            result.push(current.trim());
            return result;
        }

        const lines = recipesCsv.split('\n').filter(l => l.trim().length > 0);
        let menus = new Set();
        let ingredients = [];
        let steps = [];
        
        for (let i = 1; i < lines.length; i++) {
            const parsed = parseCSVLine(lines[i]);
            if (parsed.length >= 4) {
                const menuName = parsed[0];
                menus.add(menuName);
                if (requestedMenu && menuName === requestedMenu) {
                    if (parsed[1] === 'วิธีทำ') steps.push(parsed[2].replace(/^"|"$/g, ''));
                    else ingredients.push(`- ${parsed[2]} ${parsed[3] !== '-' ? parsed[3] : ''}`);
                }
            }
        }

        if (!requestedMenu) {
            replyText = '📋 รายชื่อสูตรอาหาร:\n' + Array.from(menus).map(m => `- ${m}`).join('\n') + 
                       '\n\n(พิมพ์ "สูตร [ชื่ออาหาร]" เพื่อดูวิธีทำ)';
        } else if (ingredients.length === 0 && steps.length === 0) {
            replyText = `❌ ไม่พบสูตรของ "${requestedMenu}" ครับ\n(พิมพ์ "สูตร" เพื่อดูรายชื่อ)`;
        } else {
            replyText = `🍳 สูตร: ${requestedMenu}\n\n[ส่วนผสม]\n${ingredients.join('\n')}\n\n[วิธีทำ]\n${steps.join('\n')}`;
        }
    } else {
        replyText = 'คำสั่งที่รองรับ:\n1. สต็อก (ดูสินค้าใกล้หมด)\n2. สต็อกทั้งหมด\n3. เบิก/เติม [ชื่อสินค้า] [จำนวน]\n4. ตั้งห้องครัว\n5. สูตร (ดูสูตรอาหาร)';
    }

    return lineClient.replyMessage(event.replyToken, {
        type: 'text',
        text: replyText
    });
}

// Middleware
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(session({
    secret: 'khrua-thai-secret-key-12345',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));

// Authentication middleware
const requireAuth = (req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect('/admin.html');
    }
};

// --- ROUTES ---

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Root route redirects to index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Login Route
app.post('/api/login', (req, res) => {
    let { username, password } = req.body;
    username = (username || '').trim();
    password = (password || '').trim();

    // Hardcoded credentials for simplicity
    if (username === 'admin' && password === 'admin1234') {
        req.session.loggedIn = true;
        req.session.role = 'admin';
        res.json({ success: true, role: 'admin' });
    } else if (username === 'marketing' && password === 'market1234') {
        req.session.loggedIn = true;
        req.session.role = 'marketing';
        res.json({ success: true, role: 'marketing' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Logout Route
app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true });
});

// Check auth status
app.get('/api/check-auth', (req, res) => {
    res.json({ 
        loggedIn: req.session.loggedIn === true,
        role: req.session.role || null
    });
});

// Get list of images
app.get('/api/images', requireAuth, (req, res) => {
    const imagesDir = path.join(__dirname, 'public', 'images');
    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read images directory' });
        }
        // Filter out non-image files if necessary, or just send all
        const images = files.filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f));
        res.json({ images });
    });
});

// Upload/Replace image
app.post('/api/upload', requireAuth, upload.single('imageFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    res.json({ success: true, message: 'Image uploaded successfully!', filename: req.file.filename });
});

// Get Menu Data
app.get('/api/menu', (req, res) => {
    const menuPath = path.join(__dirname, 'data', 'menu.json');
    fs.readFile(menuPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Cannot read menu data' });
        res.json(JSON.parse(data));
    });
});

// Update Menu Data (Admin Only)
app.post('/api/menu', requireAuth, (req, res) => {
    const menuPath = path.join(__dirname, 'data', 'menu.json');
    const newMenuData = JSON.stringify(req.body, null, 4);
    
    fs.writeFile(menuPath, newMenuData, 'utf8', (err) => {
        if (err) return res.status(500).json({ success: false, error: 'Cannot save menu data' });
        res.json({ success: true });
    });
});

// Get Classic Menu Data
app.get('/api/classic-menu', (req, res) => {
    const menuPath = path.join(__dirname, 'data', 'classic_menu.json');
    fs.readFile(menuPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Cannot read classic menu data' });
        res.json(JSON.parse(data));
    });
});

// Update Classic Menu Data (Admin Only)
app.post('/api/classic-menu', requireAuth, (req, res) => {
    const menuPath = path.join(__dirname, 'data', 'classic_menu.json');
    const newMenuData = JSON.stringify(req.body, null, 4);
    
    fs.writeFile(menuPath, newMenuData, 'utf8', (err) => {
        if (err) return res.status(500).json({ success: false, error: 'Cannot save classic menu data' });
        res.json({ success: true });
    });
});

// Get Royal Menu Data (The Royal Siam Gathering - 12 Pcs sets)
app.get('/api/royal-menu', (req, res) => {
    const menuPath = path.join(__dirname, 'data', 'royal_menu.json');
    fs.readFile(menuPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Cannot read royal menu data' });
        res.json(JSON.parse(data));
    });
});

// Update Royal Menu Data (Admin Only)
app.post('/api/royal-menu', requireAuth, (req, res) => {
    const menuPath = path.join(__dirname, 'data', 'royal_menu.json');
    const newMenuData = JSON.stringify(req.body, null, 4);
    
    fs.writeFile(menuPath, newMenuData, 'utf8', (err) => {
        if (err) return res.status(500).json({ success: false, error: 'Cannot save royal menu data' });
        res.json({ success: true });
    });
});

// Get Curry Menu Data (The Royal Siam Curry Gathering - Set of 6 Meals)
app.get('/api/curry-menu', (req, res) => {
    const menuPath = path.join(__dirname, 'data', 'curry_menu.json');
    fs.readFile(menuPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Cannot read curry menu data' });
        res.json(JSON.parse(data));
    });
});

// Update Curry Menu Data (Admin Only)
app.post('/api/curry-menu', requireAuth, (req, res) => {
    const menuPath = path.join(__dirname, 'data', 'curry_menu.json');
    const newMenuData = JSON.stringify(req.body, null, 4);
    
    fs.writeFile(menuPath, newMenuData, 'utf8', (err) => {
        if (err) return res.status(500).json({ success: false, error: 'Cannot save curry menu data' });
        res.json({ success: true });
    });
});


// Get Reviews
app.get('/api/reviews', (req, res) => {
    const reviewsPath = path.join(__dirname, 'data', 'reviews.json');
    fs.readFile(reviewsPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Cannot read reviews' });
        res.json(JSON.parse(data));
    });
});

// Update Reviews (Admin Only)
app.post('/api/reviews', requireAuth, (req, res) => {
    const reviewsPath = path.join(__dirname, 'data', 'reviews.json');
    const newReviews = JSON.stringify(req.body, null, 4);
    
    fs.writeFile(reviewsPath, newReviews, 'utf8', (err) => {
        if (err) return res.status(500).json({ success: false, error: 'Cannot save reviews' });
        res.json({ success: true });
    });
});

// Get Inventory
app.get('/api/inventory', (req, res) => {
    const invPath = path.join(__dirname, 'data', 'inventory.json');
    fs.readFile(invPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Cannot read inventory data' });
        res.json(JSON.parse(data));
    });
});

// Update Inventory (Admin Only)
app.post('/api/inventory', requireAuth, (req, res) => {
    const invPath = path.join(__dirname, 'data', 'inventory.json');
    const newInv = JSON.stringify(req.body, null, 4);
    
    fs.writeFile(invPath, newInv, 'utf8', (err) => {
        if (err) return res.status(500).json({ success: false, error: 'Cannot save inventory data' });
        res.json({ success: true });
    });
});

// Get Expenses
app.get('/api/expenses', (req, res) => {
    const expensesPath = path.join(__dirname, 'data', 'expenses.json');
    fs.readFile(expensesPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Cannot read expenses data' });
        res.json(JSON.parse(data));
    });
});

// Update Expenses (Admin Only)
app.post('/api/expenses', requireAuth, (req, res) => {
    const expensesPath = path.join(__dirname, 'data', 'expenses.json');
    const newExpenses = JSON.stringify(req.body, null, 4);
    
    fs.writeFile(expensesPath, newExpenses, 'utf8', (err) => {
        if (err) return res.status(500).json({ success: false, error: 'Cannot save expenses data' });
        res.json({ success: true });
    });
});

// Get Internal Chat
app.get('/api/chat', requireAuth, (req, res) => {
    const chatPath = path.join(__dirname, 'data', 'chat.json');
    if (!fs.existsSync(chatPath)) {
        fs.writeFileSync(chatPath, JSON.stringify([]));
    }
    fs.readFile(chatPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Cannot read chat data' });
        res.json(JSON.parse(data));
    });
});

// Update Internal Chat
app.post('/api/chat', requireAuth, (req, res) => {
    const chatPath = path.join(__dirname, 'data', 'chat.json');
    const newChat = JSON.stringify(req.body, null, 4);
    
    fs.writeFile(chatPath, newChat, 'utf8', (err) => {
        if (err) return res.status(500).json({ success: false, error: 'Cannot save chat data' });
        res.json({ success: true });
    });
});

// Get Members (Admin Only)
app.get('/api/members', requireAuth, (req, res) => {
    const membersPath = path.join(__dirname, 'data', 'members.json');
    if (!fs.existsSync(membersPath)) {
        fs.writeFileSync(membersPath, JSON.stringify([]));
    }
    fs.readFile(membersPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Cannot read members' });
        res.json(JSON.parse(data));
    });
});

// Adjust Points (Admin Only)
app.post('/api/members/adjust', requireAuth, (req, res) => {
    const { phone, pointsDelta } = req.body;
    const membersPath = path.join(__dirname, 'data', 'members.json');
    if (!fs.existsSync(membersPath)) {
        return res.status(404).json({ success: false, error: 'No members database found' });
    }
    try {
        let members = JSON.parse(fs.readFileSync(membersPath, 'utf8'));
        const member = members.find(m => m.phone === phone);
        if (member) {
            member.points += parseInt(pointsDelta);
            fs.writeFileSync(membersPath, JSON.stringify(members, null, 4));
            res.json({ success: true });
        } else {
            res.status(404).json({ success: false, error: 'Member not found' });
        }
    } catch (e) {
        res.status(500).json({ success: false, error: 'Cannot adjust points' });
    }
});

// Get Member Points by Phone (Public)
app.get('/api/members/:phone', (req, res) => {
    const phone = req.params.phone.replace(/[^0-9+]/g, ''); // sanitize phone
    const membersPath = path.join(__dirname, 'data', 'members.json');
    if (!fs.existsSync(membersPath)) {
        return res.json({ points: 0 });
    }
    try {
        const members = JSON.parse(fs.readFileSync(membersPath, 'utf8'));
        const member = members.find(m => m.phone.replace(/[^0-9+]/g, '') === phone);
        if (member) {
            res.json({ points: member.points, name: member.name });
        } else {
            res.json({ points: 0 });
        }
    } catch (e) {
        res.status(500).json({ error: 'Error reading members' });
    }
});

// Get Bookings (Admin Only)
app.get('/api/bookings', requireAuth, (req, res) => {
    const bookingsPath = path.join(__dirname, 'data', 'bookings.json');
    if (!fs.existsSync(bookingsPath)) {
        return res.json([]);
    }
    fs.readFile(bookingsPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Cannot read bookings' });
        res.json(JSON.parse(data));
    });
});

// Update Booking Status (Admin Only)
app.post('/api/bookings/status', requireAuth, (req, res) => {
    const { id, status } = req.body;
    const bookingsPath = path.join(__dirname, 'data', 'bookings.json');
    if (!fs.existsSync(bookingsPath)) {
        return res.status(404).json({ success: false, error: 'No bookings found' });
    }
    fs.readFile(bookingsPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ success: false, error: 'Cannot read bookings' });
        try {
            let bookings = JSON.parse(data);
            const booking = bookings.find(b => b.id === id);
            if (booking) {
                booking.status = status;
                fs.writeFile(bookingsPath, JSON.stringify(bookings, null, 4), 'utf8', (err) => {
                    if (err) return res.status(500).json({ success: false, error: 'Cannot save booking status' });
                    
                    // Send Email Notification if status is confirmed
                    if (status === 'confirmed' && booking.custEmail) {
                        const mailOptions = {
                            from: `"Khrua Thai" <khruathailondon@outlook.com>`,
                            to: booking.custEmail,
                            subject: 'Khrua Thai Booking Confirmed ✅',
                            html: `<h2>Hello ${booking.custName},</h2>
                                   <p>Great news! Your booking <b>${booking.id}</b> for the date <b>${booking.eventDate}</b> has been confirmed.</p>
                                   <p><b>Venue:</b> ${booking.eventPlace}</p>
                                   <p>Thank you for choosing Khrua Thai. We look forward to serving you!</p>`
                        };
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) console.error('Error sending confirmation email:', error);
                            else {
                                console.log('Confirmation email sent:', info.response);
                                console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
                            }
                        });
                    }

                    res.json({ success: true });
                });
            } else {
                res.status(404).json({ success: false, error: 'Booking not found' });
            }
        } catch (e) {
            res.status(500).json({ success: false, error: 'Invalid bookings database' });
        }
    });
});

// ManyChat Webhook Endpoint
app.post('/api/webhook/manychat', (req, res) => {
    // ManyChat will send a JSON payload with order details
    const { name, phone, menuSet, address, pax } = req.body;
    
    console.log("Received Order from ManyChat:", req.body);
    
    if (!name || !menuSet) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const bookingsPath = path.join(__dirname, 'data', 'bookings.json');
    let bookings = [];
    if (fs.existsSync(bookingsPath)) {
        try {
            bookings = JSON.parse(fs.readFileSync(bookingsPath, 'utf8'));
        } catch (e) {
            bookings = [];
        }
    }

    // Generate unique ID like BKG-1234
    const newId = 'BKG-' + Math.floor(1000 + Math.random() * 9000);
    const dateToday = new Date().toISOString().split('T')[0];

    const newBooking = {
        id: newId,
        custName: name,
        custPhone: phone || 'N/A',
        custEmail: '',
        menuSet: menuSet,
        pax: pax || '1',
        eventDate: dateToday,
        eventPlace: address || 'N/A',
        status: 'pending',
        timestamp: new Date().toISOString(),
        source: 'manychat'
    };

    bookings.push(newBooking);
    fs.writeFileSync(bookingsPath, JSON.stringify(bookings, null, 4), 'utf8');

    // Send LINE Notification to Admin about new ManyChat order
    try {
        const message = `🔔 New Order from Facebook (ManyChat)!
Order ID: ${newId}
Name: ${name}
Order: ${menuSet}
Phone: ${phone || '-'}
Address: ${address || '-'}`;
        
        client.broadcast({ type: 'text', text: message }).catch(err => {
            console.error("Failed to broadcast ManyChat order to LINE:", err);
        });
    } catch(err) {
        console.error("LINE Notify Error:", err);
    }

    res.json({ success: true, message: 'Order received and saved' });
});

// Make.com (Facebook Messenger AI) Webhook Endpoint
app.post('/api/webhook/make', async (req, res) => {
    // Make.com will send JSON payload after AI extraction
    const { name, phone, menuSet, address, price, quantity } = req.body;
    
    console.log("Received Order from Make.com (Messenger):", req.body);
    
    if (!name || !menuSet || !price) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    try {
        const qty = parseInt(quantity) || 1;
        const totalAmount = parseFloat(price) * qty;

        // 1. Generate Stripe Checkout Session URL
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'gbp',
                        product_data: {
                            name: `Khrua Thai Order: ${menuSet}`,
                            description: `Delivery to: ${address || 'N/A'}`
                        },
                        unit_amount: Math.round(totalAmount * 100), // convert GBP to pence
                    },
                    quantity: qty,
                },
            ],
            mode: 'payment',
            // Hardcode base URL or use request host in real production
            success_url: `https://khruathailondon.co.uk/success.html`,
            cancel_url: `https://khruathailondon.co.uk/cancel.html`,
        });

        // 2. Save Booking to Database
        const bookingsPath = path.join(__dirname, 'data', 'bookings.json');
        let bookings = [];
        if (fs.existsSync(bookingsPath)) {
            try {
                bookings = JSON.parse(fs.readFileSync(bookingsPath, 'utf8'));
            } catch (e) {
                bookings = [];
            }
        }

        const newId = 'FB-' + Math.floor(1000 + Math.random() * 9000);
        const dateToday = new Date().toISOString().split('T')[0];

        const newBooking = {
            id: newId,
            custName: name,
            custPhone: phone || 'N/A',
            custEmail: '',
            menuSet: `${menuSet} (x${qty})`,
            pax: qty.toString(),
            eventDate: dateToday,
            eventPlace: address || 'N/A',
            status: 'pending_payment',
            amount: totalAmount,
            stripeSessionId: session.id,
            timestamp: new Date().toISOString(),
            source: 'messenger_ai'
        };

        bookings.push(newBooking);
        fs.writeFileSync(bookingsPath, JSON.stringify(bookings, null, 4), 'utf8');

        // 3. Send LINE Notification to Admin
        try {
            const message = `🚨 New FB Messenger Order (Pending Payment)!
Order ID: ${newId}
Name: ${name}
Order: ${newBooking.menuSet}
Total: £${totalAmount}
Address: ${newBooking.eventPlace}`;
            
            client.broadcast({ type: 'text', text: message }).catch(err => {
                console.error("Failed to broadcast Make.com order to LINE:", err);
            });
        } catch(err) {
            console.error("LINE Notify Error:", err);
        }

        // 4. Return Stripe URL back to Make.com
        // Make.com will use this URL to reply to the customer in Messenger
        res.json({ 
            success: true, 
            message: 'Order received', 
            checkoutUrl: session.url,
            orderId: newId
        });

    } catch (error) {
        console.error('Make.com Webhook Error:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Delete Booking (Admin Only)
app.delete('/api/bookings/:id', requireAuth, (req, res) => {
    const { id } = req.params;
    const bookingsPath = path.join(__dirname, 'data', 'bookings.json');
    if (!fs.existsSync(bookingsPath)) {
        return res.status(404).json({ success: false, error: 'No bookings found' });
    }
    fs.readFile(bookingsPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ success: false, error: 'Cannot read bookings' });
        try {
            let bookings = JSON.parse(data);
            bookings = bookings.filter(b => b.id !== id);
            fs.writeFile(bookingsPath, JSON.stringify(bookings, null, 4), 'utf8', (err) => {
                if (err) return res.status(500).json({ success: false, error: 'Cannot delete booking' });
                res.json({ success: true });
            });
        } catch (e) {
            res.status(500).json({ success: false, error: 'Invalid bookings database' });
        }
    });
});

// --- BOOKING & STRIPE INTEGRATION ---

// Save booking and create Stripe Checkout Session
app.post('/api/create-checkout-session', async (req, res) => {
    try {
        const { custName, custPhone, custEmail, eventDate, eventPlace, custAddress, menuSet, allergy, allergyDetail, customChoices, paymentMethod, totalAmount, category } = req.body;
        
        // 1. Save booking to file
        const bookingsPath = path.join(__dirname, 'data', 'bookings.json');
        let bookings = [];
        try {
            if (fs.existsSync(bookingsPath)) {
                bookings = JSON.parse(fs.readFileSync(bookingsPath, 'utf8'));
            }
        } catch (e) { console.error('Error reading bookings:', e); }

        const bookingId = 'BK' + Date.now();
        
        // Generate Daily Ticket Number
        let ticketNumber = 1;
        try {
            const ticketPath = path.join(__dirname, 'data', 'ticket_counter.json');
            const todayStr = new Date().toISOString().split('T')[0];
            let counter = { date: todayStr, lastNumber: 0 };
            if (fs.existsSync(ticketPath)) {
                const saved = JSON.parse(fs.readFileSync(ticketPath, 'utf8'));
                if (saved.date === todayStr) counter = saved;
            }
            counter.lastNumber += 1;
            ticketNumber = counter.lastNumber;
            fs.writeFileSync(ticketPath, JSON.stringify(counter, null, 2), 'utf8');
        } catch(e) { console.error('Ticket counter error:', e); }

        // 50% deposit for Catering, 100% for Delivery Box (Classic)
        const depositAmount = (category === 'Classic') ? totalAmount : totalAmount / 2;
        
        const newBooking = {
            id: bookingId,
            date: new Date().toISOString(),
            custName, custPhone, custEmail, eventDate, eventPlace, custAddress,
            menuSet, allergy, allergyDetail, customChoices, paymentMethod,
            totalAmount, depositAmount,
            status: paymentMethod === 'Card' ? 'pending_payment' : 'pending_confirmation'
        };

        bookings.push(newBooking);
        fs.writeFileSync(bookingsPath, JSON.stringify(bookings, null, 4));

        // Send data to Make.com Webhook
        try {
            fetch('https://hook.us2.make.com/tzigcu51uj5ftfo2hmr9j6mom33wg0td', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBooking)
            }).then(r => console.log('Make.com webhook fired')).catch(e => console.error('Make.com webhook error:', e));
        } catch(e) {
            console.error('Make.com fetch error:', e);
        }

        // Send LINE Notification to Kitchen
        try {
            const groupPath = path.join(__dirname, 'data', 'kitchen_group.json');
            if (fs.existsSync(groupPath)) {
                const { targetId } = JSON.parse(fs.readFileSync(groupPath, 'utf8'));
                if (targetId) {
                    const message = `🛎️ [ออเดอร์ใหม่เข้าแล้ว!]\n` +
                                    `🎫 คิวที่: ${ticketNumber}\n` +
                                    `รหัส: ${bookingId}\n` +
                                    `เวลา/วันที่: ${eventDate || '-'}\n` +
                                    `สถานที่: ${eventPlace || '-'} ${custAddress ? '('+custAddress+')' : ''}\n` +
                                    `ลูกค้า: ${custName}\n` +
                                    `เบอร์: ${custPhone}\n` +
                                    `เมนู: ${menuSet}\n` +
                                    `แพ้/ไม่กิน: ${allergyDetail || '-'}\n` +
                                    `เพิ่มเติม: ${customChoices || '-'}\n` +
                                    `ยอดรวม: £${totalAmount.toFixed(2)}\n` +
                                    `วิธีจ่าย: ${paymentMethod}`;
                    lineClient.pushMessage(targetId, { type: 'text', text: message })
                        .catch(e => console.error('Error sending LINE notify:', e));
                }
            }
        } catch(e) { console.error('Error in kitchen notify:', e); }

        // Send Email Notification to Customer
        if (custEmail) {
            const mailOptions = {
                from: `"Khrua Thai" <khruathailondon@outlook.com>`,
                to: custEmail,
                subject: 'Khrua Thai Booking Received',
                html: `<h2>Hello ${custName},</h2>
                       <p>We have received your booking <b>${bookingId}</b> for <b>${eventDate}</b>.</p>
                       <p><b>Venue:</b> ${eventPlace}</p>
                       <p><b>Menu:</b> ${menuSet}</p>
                       <p><b>Total Amount:</b> £${totalAmount.toFixed(2)}</p>
                       <p>Your booking is currently pending. We will contact you shortly to confirm the details.</p>
                       <p>Thank you,<br>Khrua Thai Team</p>`
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) console.error('Error sending email:', error);
                else {
                    console.log('Email sent:', info.response);
                    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
                }
            });
        }

        // 1.5 Reward Points (Loyalty Program)
        const membersPath = path.join(__dirname, 'data', 'members.json');
        let members = [];
        if (fs.existsSync(membersPath)) {
            try {
                members = JSON.parse(fs.readFileSync(membersPath, 'utf8'));
            } catch (e) { console.error('Error reading members:', e); }
        } else {
            fs.writeFileSync(membersPath, JSON.stringify([]));
        }

        const totalSets = req.body.totalSets || 1;
        const pointsEarned = totalSets * 10; // 10 points per Set
        let member = members.find(m => m.phone === custPhone);
        if (member) {
            member.points += pointsEarned;
            member.totalSpent += totalAmount;
            member.name = custName; // Update name just in case
        } else {
            members.push({
                phone: custPhone,
                name: custName,
                points: pointsEarned,
                totalSpent: totalAmount
            });
        }
        fs.writeFileSync(membersPath, JSON.stringify(members, null, 4));

        // 2. Handle Payment Method
        if (paymentMethod === 'Card') {
            // Create Stripe Checkout Session
            // Note: Since this is a UK/Thai project, let's use GBP as currency based on the pricing in booking.html (£)
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'gbp',
                            product_data: {
                                name: `Deposit for ${menuSet} - ${custName}`,
                                description: `Event Date: ${eventDate} at ${eventPlace}`,
                            },
                            unit_amount: Math.round(depositAmount * 100), // Stripe expects amount in cents/pence
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${req.protocol}://${req.get('host')}/success.html?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.protocol}://${req.get('host')}/cancel.html`,
                client_reference_id: bookingId,
            });

            res.json({ id: session.id, url: session.url, method: 'Card' });
        } else {
            // Manual payment (Transfer/PromptPay)
            res.json({ success: true, method: paymentMethod, bookingId });
        }
    } catch (error) {
        console.error('Stripe Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Invoice Number API
app.get('/api/next-invoice-number', requireAuth, (req, res) => {
    try {
        const counterPath = path.join(__dirname, 'data', 'invoice_counter.json');
        let counter = JSON.parse(fs.readFileSync(counterPath, 'utf8'));
        const currentYear = new Date().getFullYear();
        if (counter.year !== currentYear) {
            counter = { lastNumber: 0, year: currentYear };
        }
        counter.lastNumber += 1;
        fs.writeFileSync(counterPath, JSON.stringify(counter, null, 2));
        const invoiceNumber = `INV-${counter.year}-${String(counter.lastNumber).padStart(4, '0')}`;
        res.json({ invoiceNumber });
    } catch (err) {
        console.error('Invoice counter error:', err);
        res.status(500).json({ error: 'Failed to generate invoice number' });
    }
});

// --- AI CHATBOT INTEGRATION ---
app.post('/api/ai-chat', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: 'Message is required' });

        const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyDtVug40uCmgMCzJMR5ssQeKEvUxoi3RbM';
        if (apiKey === 'AIzaSy_YOUR_API_KEY_HERE') {
            return res.json({ reply: "ขออภัยค่ะ ตอนนี้ระบบ AI ของร้านยังไม่ได้เชื่อมต่อ API Key รบกวนคุณลูกค้าติดต่อผ่านเบอร์โทรศัพท์แทนนะคะ 🙏" });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // Load dynamic menu data
        const dataDir = path.join(__dirname, 'data');
        let menuInfoString = "";
        try {
            const menuData = JSON.parse(fs.readFileSync(path.join(dataDir, 'menu.json'), 'utf8'));
            menuInfoString += "--- Premium Catering Sets ---\n";
            menuInfoString += menuData.map(set => `- ${set.name.th} (${set.name.en}) : £${set.price}`).join('\n') + "\n";
            
            const classicData = JSON.parse(fs.readFileSync(path.join(dataDir, 'classic_menu.json'), 'utf8'));
            menuInfoString += "--- Delivery Box Sets (Classic/Lunch Box) ---\n";
            menuInfoString += classicData.map(set => `- ${set.name.th} (${set.name.en}) : £${set.price}`).join('\n') + "\n";
            
            const curryData = JSON.parse(fs.readFileSync(path.join(dataDir, 'curry_menu.json'), 'utf8'));
            menuInfoString += "--- Curry Box Sets ---\n";
            menuInfoString += curryData.map(set => `- ${set.name.th} (${set.name.en}) : £${set.price}`).join('\n') + "\n";
            
        } catch (e) {
            console.error('Error loading menu for AI:', e);
        }

        const prompt = `You are a helpful, polite, and professional customer service administrator named "Admin Ravity" for a Thai catering business in London called "Khrua Thai" (Khrua Thai London). 
CRITICAL RULE ABOUT LANGUAGE: You MUST reply in the EXACT SAME LANGUAGE that the user used. 
- If the user asks in English, your ENTIRE response MUST be in English. Do NOT use any Thai characters. Use the English names of the menus provided in the database (the names inside the parentheses).
- If the user asks in Thai, reply in Thai.
Here is the information about the business:
- Name: Khrua Thai
- Services: Premium Thai catering and delivery box sets in London and surrounding areas. We do private parties, corporate events, and special celebrations.
- Current Menu Options (Read from database):
${menuInfoString}
- Payment: 50% deposit required to confirm booking. We accept Card and Bank Transfer.
- Contact: Customers can book through the website or call the number listed on the site.
- Delivery Conditions for Lunch Box (Set A-D): Delivery Wed - Fri (Delivery time 12.00 - 13.00), Order cutoff 15.00 of the previous day (Pre-order), Delivery radius within 5 miles.

User's message: "${message}"

Your reply:`;

        console.log("--- AI PROMPT ---");
        console.log(prompt);
        console.log("-----------------");

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (err) {
        console.error('AI Chat Error:', err);
        res.status(500).json({ error: 'Failed to communicate with AI' });
    }
});
// Start Server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
