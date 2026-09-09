const fs = require('fs');

let html = fs.readFileSync('public/canapes.html', 'utf8');

// Replace the image for the specific Kor Moo Yang Canape section
html = html.replace(/<img src="images\/grilled_pork_neck_new\.jpg" alt="Kor Moo Yang &amp; Sticky Rice"/g, 
                    '<img src="images/canape_kor_moo_yang.jpg" alt="Kor Moo Yang &amp; Sticky Rice"');
                    
// But wait, the alt might be "Kor Moo Yang & Sticky Rice" without the amp encoding
html = html.replace(/<img src="images\/grilled_pork_neck_new\.jpg" alt="Kor Moo Yang & Sticky Rice"/g, 
                    '<img src="images/canape_kor_moo_yang.jpg" alt="Kor Moo Yang & Sticky Rice"');

// Replace the image in addToCart
html = html.replace(/addToCart\(\{id: 'canape-04', name: 'Kor Moo Yang & Sticky Rice \(Tray of 12\)', price: 33.6, qty: 1, img: 'images\/grilled_pork_neck_new\.jpg'\}\)/g, 
                    "addToCart({id: 'canape-04', name: 'Kor Moo Yang & Sticky Rice (Tray of 12)', price: 33.6, qty: 1, img: 'images/canape_kor_moo_yang.jpg'})");

// Also try the amp version just in case
html = html.replace(/addToCart\(\{id: 'canape-04', name: 'Kor Moo Yang &amp; Sticky Rice \(Tray of 12\)', price: 33.6, qty: 1, img: 'images\/grilled_pork_neck_new\.jpg'\}\)/g, 
                    "addToCart({id: 'canape-04', name: 'Kor Moo Yang &amp; Sticky Rice (Tray of 12)', price: 33.6, qty: 1, img: 'images/canape_kor_moo_yang.jpg'})");


fs.writeFileSync('public/canapes.html', html, 'utf8');
console.log('Updated Kor Moo Yang image in canapes.html');
