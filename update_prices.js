const fs = require('fs');

let html = fs.readFileSync('public/delivery.html', 'utf8');

// Update Deep Fried Sea Bass (delivery-1)
html = html.replace(/&pound;35\.00(.*?id: 'delivery-1'.*?price: )35\.0/s, '&pound;26.00$126.0');

// Update Pla Lui Suan (delivery-4)
html = html.replace(/&pound;35\.00(.*?id: 'delivery-4'.*?price: )35\.0/s, '&pound;26.00$126.0');

// Update Choo Chee Sea Bass (delivery-2)
html = html.replace(/&pound;65\.00(.*?id: 'delivery-2'.*?price: )65\.0/s, '&pound;26.00$126.0'); // Wait, Choo Chee was £65 for 4000ml. Is it now £26? "ราคาปลาปรับราคาลง เป็น £26". I assume they mean ALL fish, or maybe they just mean the fish trays? Let's assume all fish items are £26. Wait! "Choo Chee Fried Sea Bass (4000ml)" is a huge 4-liter tub of fish. But they just said "ราคาปลาปรับราคาลง เป็น £26". Wait, I should make Choo Chee £26 too. Or maybe it's no longer a 4000ml tub? I will change the price to £26.

// Update Massaman Beef (delivery-3)
html = html.replace(/&pound;65\.00(.*?id: 'delivery-3'.*?price: )65\.0/s, '&pound;45.00$145.0');

// Update Panang Chicken (delivery-5)
html = html.replace(/&pound;65\.00(.*?id: 'delivery-5'.*?price: )65\.0/s, '&pound;35.00$135.0');

// Update Red Chicken (delivery-7)
html = html.replace(/&pound;65\.00(.*?id: 'delivery-7'.*?price: )65\.0/s, '&pound;35.00$135.0');

// Update Green Chicken (delivery-8)
html = html.replace(/&pound;65\.00(.*?id: 'delivery-8'.*?price: )65\.0/s, '&pound;35.00$135.0');

fs.writeFileSync('public/delivery.html', html, 'utf8');
console.log('Prices updated in delivery.html');
