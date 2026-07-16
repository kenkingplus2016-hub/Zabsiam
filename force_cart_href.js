const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/js/cart.js';
if (!fs.existsSync(file)) return;

let content = fs.readFileSync(file, 'utf8');

const oldCode = `    document.getElementById('floating-cart-badge').innerText = totalItems;`;
const newCode = `    document.getElementById('floating-cart-badge').innerText = totalItems;
    
    // Force update href in case it was created with the old absolute path
    if (floatBtn.getAttribute('href') === '/booking.html') {
        floatBtn.href = 'booking.html';
    }`;

if (content.includes(oldCode)) {
    content = content.replace(oldCode, newCode);
    fs.writeFileSync(file, content);
    console.log("Forced href update in cart.js");
} else {
    console.log("Could not find the insertion point in cart.js");
}
