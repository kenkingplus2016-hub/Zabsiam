const fs = require('fs');

let html = fs.readFileSync('public/canapes.html', 'utf8');

// Replace the main image
html = html.replace(/<img src="images\/logo2\.png" alt="Ma Hor"/g, 
                    '<img src="images/canape_ma_hor.jpg" alt="Ma Hor"');

// Replace the image in addToCart (item 11)
html = html.replace(/addToCart\(\{id: 'canape-11', name: 'Ma Hor \(Tray of 12\)', price: 33.6, qty: 1, img: 'images\/logo2\.png'\}\)/g, 
                    "addToCart({id: 'canape-11', name: 'Ma Hor (Tray of 12)', price: 33.6, qty: 1, img: 'images/canape_ma_hor.jpg'})");

fs.writeFileSync('public/canapes.html', html, 'utf8');
console.log('Updated Ma Hor image in canapes.html');
