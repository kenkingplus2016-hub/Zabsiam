const fs = require('fs');

let html = fs.readFileSync('public/canapes.html', 'utf8');

// Replace the main image
html = html.replace(/<img src="images\/logo2\.png" alt="Mini Sai Krok Isan"/g, 
                    '<img src="images/canape_sai_krok_isan.jpg" alt="Mini Sai Krok Isan"');

// Replace the image in addToCart (item 15)
html = html.replace(/addToCart\(\{id: 'canape-15', name: 'Mini Sai Krok Isan \(Tray of 12\)', price: 38.4, qty: 1, img: 'images\/logo2\.png'\}\)/g, 
                    "addToCart({id: 'canape-15', name: 'Mini Sai Krok Isan (Tray of 12)', price: 38.4, qty: 1, img: 'images/canape_sai_krok_isan.jpg'})");

fs.writeFileSync('public/canapes.html', html, 'utf8');
console.log('Updated Mini Sai Krok Isan image in canapes.html');
