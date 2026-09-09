const fs = require('fs');
const path = require('path');

// 1. Fix addToCart in index.html and banquets.html
['public/index.html', 'public/banquets.html'].forEach(file => {
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');
    
    // Replace: addToCart('Name', 464, 'images/the-signature.jpg')
    // With: addToCart({id: 'Name', name: 'Name', price: 464, qty: 1, img: 'images/the-signature.jpg'})
    html = html.replace(/addToCart\(\s*'([^']+)'\s*,\s*([0-9.]+)\s*,\s*'([^']+)'\s*\)/g, (match, name, price, img) => {
        let id = name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
        return `addToCart({id: '${id}', name: '${name}', price: ${price}, qty: 1, img: '${img}'})`;
    });

    // Also fix any missing parentheses in event.preventDefault
    html = html.replace(/event\.preventDefault;/g, 'event.preventDefault();');
    
    fs.writeFileSync(file, html, 'utf8');
    console.log(`Fixed addToCart syntax in ${file}`);
});

// 2. Make Event Catering and Meeting Meals tables clickable
['public/event-catering.html', 'public/meeting-meals.html'].forEach(file => {
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');
    
    // Find each option block and its table
    // The option name is in <h3...>Option A: THAI CLASSIC</h3>
    // We will replace the <tr> for the prices
    
    let currentOptionName = "";
    
    // We'll replace line by line or use a replacer function
    const lines = html.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        
        // Match option header
        const optMatch = line.match(/<h3[^>]*>(Option [^:]+:[^<]+)<\/h3>/);
        if (optMatch) {
            currentOptionName = optMatch[1].trim(); // e.g. "Option A: THAI CLASSIC"
        }
        
        // Match table row with price
        const trMatch = line.match(/<tr([^>]*)><td([^>]*)>([^<]+)<\/td><td[^>]*>&pound;([0-9.]+)<\/td><\/tr>/);
        if (trMatch && currentOptionName) {
            let trAttrs = trMatch[1];
            let tdAttrs = trMatch[2];
            let size = trMatch[3]; // e.g. "20-29"
            let price = trMatch[4];
            
            let itemName = `${currentOptionName} (${size} Guests)`;
            let itemId = itemName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
            
            // Add cursor pointer, hover effect, and onclick
            // Remove old border-bottom from trAttrs if present, we'll redefine it
            trAttrs = trAttrs.replace(/style="[^"]*"/, '');
            
            let newTr = `<tr style="border-bottom: 1px solid rgba(255, 215, 0, 0.1); cursor: pointer; transition: background-color 0.3s;" onmouseover="this.style.backgroundColor='rgba(255,215,0,0.2)'" onmouseout="this.style.backgroundColor='transparent'" onclick="addToCart({id: '${itemId}', name: '${itemName.replace(/'/g, "\\'")}', price: ${price}, qty: 1, img: 'images/logo2.png'})"><td${tdAttrs}>${size}</td><td style="padding: 4px; text-align: right;">&pound;${price}</td></tr>`;
            
            lines[i] = newTr;
        }
        
        // Change the "EnquireBook" button to "Add to Order" and link to "#" or checkout
        if (line.includes('class="add-to-cart-btn"')) {
            if (line.includes('mailto:')) {
                // If it's a generic mailto, let's just make it go to checkout
                lines[i] = line.replace(/href="mailto:[^"]+"/, 'href="checkout.html"').replace(/>EnquireBook<\/a>/, '>Checkout</a>').replace(/>Enquire to Customize<\/a>/, '>View Checkout</a>');
            }
        }
    }
    
    fs.writeFileSync(file, lines.join('\n'), 'utf8');
    console.log(`Made pricing tables clickable in ${file}`);
});

// 3. Make Canapes Enquire buttons into addToCart
if (fs.existsSync('public/canapes.html')) {
    let html = fs.readFileSync('public/canapes.html', 'utf8');
    
    // <a href="mailto:..." class="add-to-cart-btn...">Enquire</a> -> <a href="#" onclick="..." class="...">Add to Order</a>
    // Wait, let's just do a regex replace on the buttons
    
    html = html.replace(/<a href="mailto:[^"]+" class="add-to-cart-btn([^"]+)"([^>]*)>Enquire<\/a>/g, (match, classes, attrs) => {
        // We need to extract the title. This is a bit tricky with regex, we can just replace the specific ones.
        return match; 
    });
    
    // Let's do it simpler.
    html = html.replace(/<h3 class="text-2xl font-bold text-\[var\(--color-gold\)\] mb-2">Pomelo Miang Kham<\/h3>[\s\S]*?<a href="mailto:[^"]+" class="add-to-cart-btn([^>]+)>Enquire<\/a>/g, 
        `<h3 class="text-2xl font-bold text-[var(--color-gold)] mb-2">Pomelo Miang Kham</h3>
            <p class="text-gray-400 mb-4">A bite-sized burst of flavor with fresh pomelo, roasted coconut, peanuts, and Thai herbs on a betel leaf.</p>
            <a href="#" onclick="event.preventDefault(); addToCart({id: 'canape-pomelo', name: 'Pomelo Miang Kham Canapé', price: 2.50, qty: 1, img: 'images/canape_pomelo_miang_kham.jpg'})" class="add-to-cart-btn$1>Add to Order</a>`);
            
    html = html.replace(/<h3 class="text-2xl font-bold text-\[var\(--color-gold\)\] mb-2">Thai Pork Satay<\/h3>[\s\S]*?<a href="mailto:[^"]+" class="add-to-cart-btn([^>]+)>Enquire<\/a>/g, 
        `<h3 class="text-2xl font-bold text-[var(--color-gold)] mb-2">Thai Pork Satay</h3>
            <p class="text-gray-400 mb-4">Grilled marinated pork skewers served with our signature rich peanut sauce and cucumber relish.</p>
            <a href="#" onclick="event.preventDefault(); addToCart({id: 'canape-satay', name: 'Thai Pork Satay Canapé', price: 3.00, qty: 1, img: 'images/canape_pork_satay.jpg'})" class="add-to-cart-btn$1>Add to Order</a>`);
            
    html = html.replace(/<h3 class="text-2xl font-bold text-\[var\(--color-gold\)\] mb-2">Moo Ping<\/h3>[\s\S]*?<a href="mailto:[^"]+" class="add-to-cart-btn([^>]+)>Enquire<\/a>/g, 
        `<h3 class="text-2xl font-bold text-[var(--color-gold)] mb-2">Moo Ping</h3>
            <p class="text-gray-400 mb-4">Classic Thai street food style grilled pork skewers, sweet, savory, and perfectly caramelized.</p>
            <a href="#" onclick="event.preventDefault(); addToCart({id: 'canape-moo-ping', name: 'Moo Ping Canapé', price: 3.00, qty: 1, img: 'images/canape_pork_skewers.jpg'})" class="add-to-cart-btn$1>Add to Order</a>`);

    fs.writeFileSync('public/canapes.html', html, 'utf8');
    console.log(`Added addToCart to canapes.html`);
}

