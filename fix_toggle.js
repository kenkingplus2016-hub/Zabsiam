const fs = require('fs');

let cartJs = fs.readFileSync('public/cart.js', 'utf8');

cartJs = cartJs.replace(/if \(isCatering && !window\.requireFullPayment\) {\s*dateContainer\.style\.display = 'block';/, `if (isCatering) {\n        dateContainer.style.display = 'block';`);

fs.writeFileSync('public/cart.js', cartJs, 'utf8');

console.log('Fixed toggleCateringMode');
