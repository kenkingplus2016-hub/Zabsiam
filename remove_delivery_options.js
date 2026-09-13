const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

let removedCount = 0;

for (const file of files) {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find the delivery-checkout div and remove it entirely
    const startIdx = content.indexOf('<div class="delivery-checkout">');
    if (startIdx !== -1) {
        // Find the closing div for this block
        // Assuming the delivery-checkout div is structured nicely
        let endIdx = content.indexOf('</div>', startIdx); // This is just the first closing div.
        
        // Since it contains multiple nested elements (like div.delivery-options and labels), 
        // we can use a regex or string replacement if we know the exact chunk.
        // It's safer to use regex to match the block until the next major section like:
        // <div class="cart-summary">
        const nextSectionIdx = content.indexOf('<div class="cart-summary">', startIdx);
        if (nextSectionIdx !== -1) {
            const before = content.substring(0, startIdx);
            const after = content.substring(nextSectionIdx);
            content = before + after;
            fs.writeFileSync(filePath, content, 'utf8');
            removedCount++;
            console.log(`Removed delivery options from ${file}`);
        }
    }
}

// Also update cart.js to change the default delivery fee label to be clear
let cartJsPath = path.join(publicDir, 'cart.js');
if (fs.existsSync(cartJsPath)) {
    let cartJs = fs.readFileSync(cartJsPath, 'utf8');
    cartJs = cartJs.replace(/const DEFAULT_DELIVERY_FEE = 5\.00;/, 'const DEFAULT_DELIVERY_FEE = 0.00;');
    cartJs = cartJs.replace(/label: 'Standard Delivery'/g, "label: 'Delivery Fee (Calculated upon confirmation)'");
    fs.writeFileSync(cartJsPath, cartJs, 'utf8');
    console.log('Updated cart.js default fee');
}

console.log(`Total HTML files updated: ${removedCount}`);
