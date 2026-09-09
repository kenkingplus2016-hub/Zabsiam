const fs = require('fs');

let html = fs.readFileSync('public/canapes.html', 'utf8');

// Replace the main image
html = html.replace(/<img src="images\/logo2\.png" alt="Goong Hom Sabai"/g, 
                    '<img src="images/goong_hom_sabai.jpg" alt="Goong Hom Sabai"');

// Replace the image in addToCart
html = html.replace(/addToCart\(\{id: 'canape-03', name: 'Goong Hom Sabai \(Tray of 12\)', price: 36, qty: 1, img: 'images\/logo2\.png'\}\)/g, 
                    "addToCart({id: 'canape-03', name: 'Goong Hom Sabai (Tray of 12)', price: 36, qty: 1, img: 'images/goong_hom_sabai.jpg'})");

fs.writeFileSync('public/canapes.html', html, 'utf8');
console.log('Updated Goong Hom Sabai image in canapes.html');
