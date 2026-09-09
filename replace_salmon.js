const fs = require('fs');

let html = fs.readFileSync('public/canapes.html', 'utf8');

// Replace the main image
html = html.replace(/<img src="images\/salmon_spicy_salad_new\.jpg" alt="Salmon Pla"/g, 
                    '<img src="images/canape_salmon_pla.jpg" alt="Salmon Pla"');

// Replace the image in addToCart (item 09)
html = html.replace(/addToCart\(\{id: 'canape-09', name: 'Salmon Pla \(Tray of 12\)', price: 38.4, qty: 1, img: 'images\/salmon_spicy_salad_new\.jpg'\}\)/g, 
                    "addToCart({id: 'canape-09', name: 'Salmon Pla (Tray of 12)', price: 38.4, qty: 1, img: 'images/canape_salmon_pla.jpg'})");

fs.writeFileSync('public/canapes.html', html, 'utf8');
console.log('Updated Salmon Pla image in canapes.html');
