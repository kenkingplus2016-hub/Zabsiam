const fs = require('fs');

let html = fs.readFileSync('public/canapes.html', 'utf8');

// Replace the main image
html = html.replace(/<img src="images\/logo2\.png" alt="Mini Golden Bags"/g, 
                    '<img src="images/canape_golden_bags.jpg" alt="Mini Golden Bags"');

// Replace the image in addToCart (item 13)
html = html.replace(/addToCart\(\{id: 'canape-13', name: 'Mini Golden Bags \(Tray of 12\)', price: 33.6, qty: 1, img: 'images\/logo2\.png'\}\)/g, 
                    "addToCart({id: 'canape-13', name: 'Mini Golden Bags (Tray of 12)', price: 33.6, qty: 1, img: 'images/canape_golden_bags.jpg'})");

fs.writeFileSync('public/canapes.html', html, 'utf8');
console.log('Updated Mini Golden Bags image in canapes.html');
