const fs = require('fs');

let cartJs = fs.readFileSync('public/cart.js', 'utf8');

// Update UI logic
cartJs = cartJs.replace(/if \(isCatering\) \{/g, `if (isCatering && !window.requireFullPayment) {`);

// Update WhatsApp generation logic
// Let's find the specific block for generating whatsapp text:
// let menuSetDetails = isCatering ? "Private Catering (50% Deposit Paid):\n" : "Postal Delivery Order:\n";
cartJs = cartJs.replace(/let menuSetDetails = isCatering \? "Private Catering \(50% Deposit Paid\):\\n" : "Postal Delivery Order:\\n";/g, `let menuSetDetails = "Order Details:\\n";\n    if (isCatering) {\n        menuSetDetails = window.requireFullPayment ? "Party Trays Pre-order (100% Paid):\\n" : "Private Catering (50% Deposit Paid):\\n";\n    } else {\n        menuSetDetails = "Postal Delivery Order:\\n";\n    }`);

cartJs = cartJs.replace(/if \(isCatering\) \{(\s*const deposit = subtotal \* 0\.5;)/, `if (isCatering && !window.requireFullPayment) {$1`);

fs.writeFileSync('public/cart.js', cartJs, 'utf8');

// Also inject the window.requireFullPayment = true in delivery.html
let deliveryHtml = fs.readFileSync('public/delivery.html', 'utf8');
deliveryHtml = deliveryHtml.replace('<script src="cart.js"></script>', '<script>window.requireFullPayment = true;</script>\n<script src="cart.js"></script>');
fs.writeFileSync('public/delivery.html', deliveryHtml, 'utf8');

console.log('Successfully updated cart logic for full payment on delivery page');
