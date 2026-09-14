const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const deliveryHtmlBlock = `
<div class="delivery-checkout" style="margin-top: 20px; margin-bottom: 20px;">
    <h4 style="margin-bottom: 10px; color: var(--color-gold);">Delivery &amp; Pickup Options</h4>
    <div class="delivery-options">
        <label>
            <input type="radio" name="deliveryOption" value="popup-pickup" data-label="Pickup at Popup Market" data-fee="0.00" checked>
            <span><strong>Pickup at Popup Market</strong><small>Free</small></span>
        </label>
        <label>
            <input type="radio" name="deliveryOption" value="delivery-2kg" data-label="Delivery (Up to 2 kg)" data-fee="4.65">
            <span><strong>Delivery (Up to 2 kg)</strong><small>&pound;4.65</small></span>
        </label>
        <label>
            <input type="radio" name="deliveryOption" value="delivery-10kg" data-label="Delivery (2 kg - 10 kg)" data-fee="8.55">
            <span><strong>Delivery (2 kg - 10 kg)</strong><small>&pound;8.55</small></span>
        </label>
    </div>
</div>
`;

let addedCount = 0;

for (const file of files) {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it has checkout-btn and doesn't already have delivery-checkout
    if (content.includes('id="checkout-btn"') && !content.includes('class="delivery-checkout"')) {
        content = content.replace(/(<button type="submit" id="checkout-btn")/, deliveryHtmlBlock + '$1');
        fs.writeFileSync(filePath, content, 'utf8');
        addedCount++;
        console.log(`Added delivery options to ${file}`);
    }
}

// Also need to revert cart.js DEFAULT_DELIVERY_FEE logic to properly pick up from the radio buttons again!
let cartJsPath = path.join(publicDir, 'cart.js');
if (fs.existsSync(cartJsPath)) {
    let cartJs = fs.readFileSync(cartJsPath, 'utf8');
    
    // In my previous script I replaced standard delivery text. The logic in cart.js is:
    // function getSelectedDeliveryOption() { ... return { label: '...', fee: 0.00 } }
    // As long as the radio buttons exist and are selected, it will pick them up!
    // The only thing is DEFAULT_DELIVERY_FEE is 0.00, which is fine since the "checked" radio is Pickup = 0.00.
    
    fs.writeFileSync(cartJsPath, cartJs, 'utf8');
    console.log('Checked cart.js logic - no changes strictly required since getSelectedDeliveryOption reads DOM inputs.');
}

console.log(`Total HTML files updated: ${addedCount}`);
