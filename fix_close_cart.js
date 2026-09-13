const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

for (const file of files) {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix broken closeCart calls
    content = content.replace(/onclick="closeCart"/g, 'onclick="closeCart()"');
    content = content.replace(/closeCart;/g, 'closeCart();');
    content = content.replace(/closeSetPopup;/g, 'closeSetPopup();');
    
    // Add "Continue Shopping" button at the bottom of the checkout form if not present
    // Let's insert it before the WhatsApp order button
    const continueShoppingBtn = `\n<button type="button" onclick="closeCart()" style="width: 100%; padding: 12px; background-color: #333; color: white; border: 1px solid #555; border-radius: 4px; font-weight: bold; cursor: pointer; margin-top: 10px; font-size: 1.1rem;">Continue Shopping</button>`;
    
    // The main submit button is usually:
    // <button class="checkout-btn" onclick="submitOrder()">Send Order via WhatsApp</button>
    if (content.includes('onclick="submitOrder()"') && !content.includes('Continue Shopping')) {
        content = content.replace(/(<button[^>]*onclick="submitOrder\(\)"[^>]*>.*?<\/button>)/, `$1${continueShoppingBtn}`);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed closures in ${file}`);
}
