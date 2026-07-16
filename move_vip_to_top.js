const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const vipIndex = data.findIndex(m => m.id === 'lunch_box_vip');

if (vipIndex !== -1) {
    const [vipItem] = data.splice(vipIndex, 1);
    data.unshift(vipItem);
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log("Moved Special Box Set VIP to the top.");
} else {
    console.log("Menu not found.");
}
