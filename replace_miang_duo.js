const fs = require('fs');

let html = fs.readFileSync('public/canapes.html', 'utf8');

// Replace the main image
html = html.replace(/<img src="images\/canape_pomelo_miang_kham\.jpg" alt="Miang Kham Duo"/g, 
                    '<img src="images/canape_miang_kham_duo.jpg" alt="Miang Kham Duo"');

// Replace the image in addToCart (item 10)
html = html.replace(/addToCart\(\{id: 'canape-10', name: 'Miang Kham Duo \(Tray of 12\)', price: 33.6, qty: 1, img: 'images\/canape_pomelo_miang_kham\.jpg'\}\)/g, 
                    "addToCart({id: 'canape-10', name: 'Miang Kham Duo (Tray of 12)', price: 33.6, qty: 1, img: 'images/canape_miang_kham_duo.jpg'})");

fs.writeFileSync('public/canapes.html', html, 'utf8');
console.log('Updated Miang Kham Duo image in canapes.html');
