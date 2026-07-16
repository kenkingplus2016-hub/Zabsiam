const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const item18 = data.find(m => String(m.id) === '18');
if (item18) {
    console.log("Item 18 is STILL in the file!");
    console.log(item18.name.en);
} else {
    console.log("Item 18 is NOT in the file!");
}

const vip = data.find(m => m.id === 'lunch_box_vip');
if (vip) {
    console.log("VIP is STILL in the file!");
} else {
    console.log("VIP is NOT in the file!");
}
