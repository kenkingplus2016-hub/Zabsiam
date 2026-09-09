const fs = require('fs');

let html = fs.readFileSync('public/canapes.html', 'utf8');

// Replace the main image
html = html.replace(/<img src="images\/logo2\.png" alt="Mini Northern Thai Sausage \(Sai Oua\)"/g, 
                    '<img src="images/canape_sai_oua.jpg" alt="Mini Northern Thai Sausage (Sai Oua)"');

// Replace the image in addToCart (item 14)
html = html.replace(/addToCart\(\{id: 'canape-14', name: 'Mini Northern Thai Sausage \(Sai Oua\) \(Tray of 12\)', price: 38.4, qty: 1, img: 'images\/logo2\.png'\}\)/g, 
                    "addToCart({id: 'canape-14', name: 'Mini Northern Thai Sausage (Sai Oua) (Tray of 12)', price: 38.4, qty: 1, img: 'images/canape_sai_oua.jpg'})");

fs.writeFileSync('public/canapes.html', html, 'utf8');
console.log('Updated Mini Northern Thai Sausage image in canapes.html');
