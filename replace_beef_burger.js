const fs = require('fs');

let html = fs.readFileSync('public/canapes.html', 'utf8');

// Replace the main image
html = html.replace(/<img src="images\/logo2\.png" alt="Mini Beef Basil Burger"/g, 
                    '<img src="images/canape_beef_basil_burger.jpg" alt="Mini Beef Basil Burger"');

// Replace the image in addToCart (item 06)
html = html.replace(/addToCart\(\{id: 'canape-06', name: 'Mini Beef Basil Burger \(Tray of 12\)', price: 42, qty: 1, img: 'images\/logo2\.png'\}\)/g, 
                    "addToCart({id: 'canape-06', name: 'Mini Beef Basil Burger (Tray of 12)', price: 42, qty: 1, img: 'images/canape_beef_basil_burger.jpg'})");

fs.writeFileSync('public/canapes.html', html, 'utf8');
console.log('Updated Mini Beef Basil Burger image in canapes.html');
