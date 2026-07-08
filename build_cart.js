const fs = require('fs');
const path = require('path');

const publicDir = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public';

if (!fs.existsSync(path.join(publicDir, 'css'))) fs.mkdirSync(path.join(publicDir, 'css'));
if (!fs.existsSync(path.join(publicDir, 'js'))) fs.mkdirSync(path.join(publicDir, 'js'));

// 1. Create cart.css
const cssContent = `/* public/css/cart.css */
#floating-cart {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: var(--gold);
    color: var(--dark-green);
    width: 65px;
    height: 65px;
    border-radius: 50%;
    display: none; /* Block when has items */
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    z-index: 1000;
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    text-decoration: none;
    border: 2px solid #fff;
}
#floating-cart:hover {
    transform: scale(1.1);
    color: #fff;
    background: var(--dark-green);
    border-color: var(--gold);
}
#floating-cart-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #FF3B30;
    color: #fff;
    font-size: 0.9rem;
    font-weight: bold;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #fff;
}
#cart-toast {
    position: fixed;
    bottom: -100px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--dark-green);
    color: white;
    padding: 15px 25px;
    border-radius: 30px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    z-index: 1001;
    transition: bottom 0.4s ease;
    display: flex;
    align-items: center;
    font-family: 'Prompt', sans-serif;
    border: 1px solid var(--gold);
}
#cart-toast.show {
    bottom: 30px;
}
`;
fs.writeFileSync(path.join(publicDir, 'css', 'cart.css'), cssContent);
console.log('Created cart.css');

// 2. Create cart.js
const jsContent = `// public/js/cart.js
const CART_KEY = 'khruathai_cart';

function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateFloatingCart();
}

function addToCart(item) {
    let cart = getCart();
    const optionsStr = JSON.stringify(item.options || []);
    let existing = cart.find(c => c.id === item.id && JSON.stringify(c.options || []) === optionsStr);
    
    if (existing) {
        existing.qty += parseInt(item.qty);
    } else {
        cart.push(item);
    }
    
    saveCart(cart);
    showCartToast(item.qty);
}

function removeFromCart(index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
}

function updateCartQty(index, newQty) {
    let cart = getCart();
    if (newQty > 0) {
        cart[index].qty = newQty;
        saveCart(cart);
    }
}

function clearCart() {
    localStorage.removeItem(CART_KEY);
    updateFloatingCart();
}

function updateFloatingCart() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    
    let floatBtn = document.getElementById('floating-cart');
    if (!floatBtn) {
        floatBtn = document.createElement('a');
        floatBtn.id = 'floating-cart';
        floatBtn.href = '/booking.html';
        floatBtn.innerHTML = \`
            <i class="fas fa-shopping-cart"></i>
            <span id="floating-cart-badge">0</span>
        \`;
        document.body.appendChild(floatBtn);
    }
    
    document.getElementById('floating-cart-badge').innerText = totalItems;
    
    // Do not show floating cart inside booking.html
    if (window.location.pathname.includes('booking.html')) {
        floatBtn.style.display = 'none';
        return;
    }
    
    if (totalItems > 0) {
        floatBtn.style.display = 'flex';
    } else {
        floatBtn.style.display = 'none';
    }
}

function showCartToast(qty) {
    let toast = document.getElementById('cart-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'cart-toast';
        document.body.appendChild(toast);
    }
    
    const lang = document.documentElement.lang || 'en';
    toast.innerHTML = lang === 'th' ? 
        \`<i class="fas fa-check-circle" style="color:#4CAF50; margin-right:10px;"></i> เพิ่ม <b>\${qty}</b> รายการลงตะกร้าเรียบร้อย\` :
        \`<i class="fas fa-check-circle" style="color:#4CAF50; margin-right:10px;"></i> Added <b>\${qty}</b> items to cart\`;
    
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

document.addEventListener('DOMContentLoaded', updateFloatingCart);
`;
fs.writeFileSync(path.join(publicDir, 'js', 'cart.js'), jsContent);
console.log('Created cart.js');

// 3. Inject CSS and JS links into HTML files
const targetFiles = ['index.html', 'delivery.html', 'desserts.html', 'royal_siam.html', 'booking.html'];

for (const filename of targetFiles) {
    const file = path.join(publicDir, filename);
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        if (!content.includes('cart.css')) {
            content = content.replace('</head>', '    <link rel="stylesheet" href="css/cart.css">\n</head>');
        }
        
        if (!content.includes('cart.js')) {
            content = content.replace('</body>', '    <script src="js/cart.js"></script>\n</body>');
        }
        
        fs.writeFileSync(file, content);
        console.log('Injected cart assets into ' + filename);
    }
}
