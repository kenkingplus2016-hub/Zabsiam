const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const vipIndex = data.findIndex(m => m.id === 'lunch_box_vip');

if (vipIndex !== -1) {
    data[vipIndex].price = 25.95;
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log("Updated Special Box Set VIP price to £25.95.");
} else {
    console.log("Menu not found.");
}
