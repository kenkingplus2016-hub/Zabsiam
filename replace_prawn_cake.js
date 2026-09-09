const fs = require('fs');

let html = fs.readFileSync('public/canapes.html', 'utf8');

// Replace the main image
html = html.replace(/<img src="images\/logo2\.png" alt="Mini Crispy Thai Prawn Cake"/g, 
                    '<img src="images/canape_prawn_cake.jpg" alt="Mini Crispy Thai Prawn Cake"');

// Replace the image in addToCart
html = html.replace(/addToCart\(\{id: 'canape-12', name: 'Mini Crispy Thai Prawn Cake \(Tray of 12\)', price: 39.6, qty: 1, img: 'images\/logo2\.png'\}\)/g, 
                    "addToCart({id: 'canape-12', name: 'Mini Crispy Thai Prawn Cake (Tray of 12)', price: 39.6, qty: 1, img: 'images/canape_prawn_cake.jpg'})");

fs.writeFileSync('public/canapes.html', html, 'utf8');
console.log('Updated Mini Crispy Thai Prawn Cake image in canapes.html');
