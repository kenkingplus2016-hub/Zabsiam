const fs = require('fs');

let html = fs.readFileSync('public/canapes.html', 'utf8');

// The original image used was 'images/canape_salad_pomelo.jpg'. 
// We will replace it with 'images/canape_pomelo_salad_prawns.jpg'
html = html.replace(/<img src="images\/canape_salad_pomelo\.jpg" alt="Pomelo Salad with Prawns"/g, 
                    '<img src="images/canape_pomelo_salad_prawns.jpg" alt="Pomelo Salad with Prawns"');

// Replace the image in addToCart (item 16)
html = html.replace(/addToCart\(\{id: 'canape-16', name: 'Pomelo Salad with Prawns \(Tray of 12\)', price: 39.6, qty: 1, img: 'images\/canape_salad_pomelo\.jpg'\}\)/g, 
                    "addToCart({id: 'canape-16', name: 'Pomelo Salad with Prawns (Tray of 12)', price: 39.6, qty: 1, img: 'images/canape_pomelo_salad_prawns.jpg'})");

fs.writeFileSync('public/canapes.html', html, 'utf8');
console.log('Updated Pomelo Salad with Prawns image in canapes.html');
