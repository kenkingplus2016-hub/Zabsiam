const fs = require('fs');

let html = fs.readFileSync('public/canapes.html', 'utf8');

// Replace the main image
html = html.replace(/<img src="images\/logo2\.png" alt="Mini Chicken Basil Burger"/g, 
                    '<img src="images/canape_chicken_basil_burger.jpg" alt="Mini Chicken Basil Burger"');

// Replace the image in addToCart
html = html.replace(/addToCart\(\{id: 'canape-05', name: 'Mini Chicken Basil Burger \(Tray of 12\)', price: 38.4, qty: 1, img: 'images\/logo2\.png'\}\)/g, 
                    "addToCart({id: 'canape-05', name: 'Mini Chicken Basil Burger (Tray of 12)', price: 38.4, qty: 1, img: 'images/canape_chicken_basil_burger.jpg'})");

fs.writeFileSync('public/canapes.html', html, 'utf8');
console.log('Updated Mini Chicken Basil Burger image in canapes.html');
