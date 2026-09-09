const fs = require('fs');

let html = fs.readFileSync('public/canapes.html', 'utf8');

// Replace the main image
html = html.replace(/<img src="images\/logo2\.png" alt="Grilled Prawn &amp; Seafood Sauce"/g, 
                    '<img src="images/canape_grilled_prawn_seafood.jpg" alt="Grilled Prawn &amp; Seafood Sauce"');

html = html.replace(/<img src="images\/logo2\.png" alt="Grilled Prawn & Seafood Sauce"/g, 
                    '<img src="images/canape_grilled_prawn_seafood.jpg" alt="Grilled Prawn & Seafood Sauce"');

// Replace the image in addToCart
html = html.replace(/addToCart\(\{id: 'canape-07', name: 'Grilled Prawn & Seafood Sauce \(Tray of 12\)', price: 39.6, qty: 1, img: 'images\/logo2\.png'\}\)/g, 
                    "addToCart({id: 'canape-07', name: 'Grilled Prawn & Seafood Sauce (Tray of 12)', price: 39.6, qty: 1, img: 'images/canape_grilled_prawn_seafood.jpg'})");

html = html.replace(/addToCart\(\{id: 'canape-07', name: 'Grilled Prawn &amp; Seafood Sauce \(Tray of 12\)', price: 39.6, qty: 1, img: 'images\/logo2\.png'\}\)/g, 
                    "addToCart({id: 'canape-07', name: 'Grilled Prawn &amp; Seafood Sauce (Tray of 12)', price: 39.6, qty: 1, img: 'images/canape_grilled_prawn_seafood.jpg'})");

fs.writeFileSync('public/canapes.html', html, 'utf8');
console.log('Updated Grilled Prawn & Seafood Sauce image in canapes.html');
