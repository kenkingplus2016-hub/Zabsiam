const fs = require('fs');
const path = require('path');

const targetPath = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/lunch-box.html';

if (fs.existsSync(targetPath)) {
    let html = fs.readFileSync(targetPath, 'utf8');
    
    // 1. Update Crispy Pork Belly price
    html = html.replace('&pound;15 per Box', '&pound;19 per Box');
    html = html.replace(
        "addToCart('Signature Box: Crispy Pork Belly', 15,",
        "addToCart('Signature Box: Crispy Pork Belly', 19,"
    );
    
    // 2. Update Mango Sticky Rice condition and cart logic
    // Since both boxes currently share the exact same condition string, we need to specifically target the Mango box.
    // The Mango Box starts with: <h3 style="color: var(--color-gold); font-size: 1.8rem; margin-bottom: 1rem;">Mango Sticky Rice</h3>
    // We will split the HTML at the Mango Sticky Rice heading.
    const splitTag = '<h3 style="color: var(--color-gold); font-size: 1.8rem; margin-bottom: 1rem;">Mango Sticky Rice</h3>';
    let parts = html.split(splitTag);
    
    if (parts.length === 2) {
        // Change condition text only in the second part (Mango box)
        parts[1] = parts[1].replace(
            '*Booking Conditions: No minimum order. 2 days advance booking.',
            '*Booking Conditions: Minimum 2 boxes required. 2 days advance booking.'
        );
        
        // Update cart button for Mango box to add 2 boxes
        parts[1] = parts[1].replace(
            "addToCart('Signature Box: Mango Sticky Rice', 8,",
            "addToCart('Signature Box: Mango Sticky Rice (2 Boxes Min.)', 16,"
        );
        
        html = parts.join(splitTag);
        
        fs.writeFileSync(targetPath, html, 'utf8');
        fs.copyFileSync(targetPath, 'C:/Users/KENDEE/Desktop/เว็บ/public/lunch-box.html');
        console.log("Updated lunch-box.html with new price and conditions.");
    } else {
        console.log("Error: Could not split HTML correctly.");
    }
}
