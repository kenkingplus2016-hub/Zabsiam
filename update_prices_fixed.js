const fs = require('fs');
let html = fs.readFileSync('public/delivery.html', 'utf8');

// Replace displayed prices
html = html.replace(/&pound;35\.00/g, '&pound;26.00'); // All £35 to £26 (Fish trays & Pla Lui Suan)
// Wait, Panang, Red Chicken, Green Chicken are £65 right now. They need to become £35.
// Let's replace line by line based on ID.

const updates = [
  { id: 'delivery-1', oldDisplay: '&pound;35.00', newDisplay: '&pound;26.00', oldPrice: 35.0, newPrice: 26.0 }, // Sea Bass
  { id: 'delivery-4', oldDisplay: '&pound;35.00', newDisplay: '&pound;26.00', oldPrice: 35.0, newPrice: 26.0 }, // Pla Lui Suan
  { id: 'delivery-2', oldDisplay: '&pound;65.00', newDisplay: '&pound;26.00', oldPrice: 65.0, newPrice: 26.0 }, // Choo Chee
  { id: 'delivery-3', oldDisplay: '&pound;65.00', newDisplay: '&pound;45.00', oldPrice: 65.0, newPrice: 45.0 }, // Massaman Beef
  { id: 'delivery-5', oldDisplay: '&pound;65.00', newDisplay: '&pound;35.00', oldPrice: 65.0, newPrice: 35.0 }, // Panang Chicken
  { id: 'delivery-7', oldDisplay: '&pound;65.00', newDisplay: '&pound;35.00', oldPrice: 65.0, newPrice: 35.0 }, // Red Chicken
  { id: 'delivery-8', oldDisplay: '&pound;65.00', newDisplay: '&pound;35.00', oldPrice: 65.0, newPrice: 35.0 }  // Green Chicken
];

updates.forEach(u => {
    // We need to replace the display price AND the JS price just for this specific item.
    // Let's use a regex that matches the block for this item.
    const regex = new RegExp(`(<span[^>]*>)${u.oldDisplay.replace(/&/g, '&amp;')}(</span>\\s*<span[^>]*>.*?</span>\\s*</div>\\s*<a[^>]*addToCart\\({id: '${u.id}',.*?)price: ${u.oldPrice.toFixed(1)}`);
    // Wait, the original string uses &pound; not &amp;pound;
    const regex2 = new RegExp(`(<span[^>]*>)${u.oldDisplay}(</span>\\s*<span[^>]*>.*?</span>\\s*</div>\\s*<a[^>]*addToCart\\(\\{id: '${u.id}',.*?)price: ${u.oldPrice.toFixed(1)}`);
    
    html = html.replace(regex2, `$1${u.newDisplay}$2price: ${u.newPrice.toFixed(1)}`);
});

fs.writeFileSync('public/delivery.html', html, 'utf8');
console.log('Prices updated');
