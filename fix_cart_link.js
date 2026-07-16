const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/js/cart.js';
if (!fs.existsSync(file)) return;

let content = fs.readFileSync(file, 'utf8');

if (content.includes("floatBtn.href = '/booking.html';")) {
    content = content.replace("floatBtn.href = '/booking.html';", "floatBtn.href = 'booking.html';");
    fs.writeFileSync(file, content);
    console.log("Fixed cart.js link");
} else {
    console.log("Could not find the link in cart.js");
}
