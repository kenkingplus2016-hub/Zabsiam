const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const krapowIndex = data.findIndex(m => m.id === 'lunch_box_krapow');

if (krapowIndex !== -1) {
    const menu = data[krapowIndex];
    menu.name.th = "Signature Box ผัดกะเพรา + ส้มตำ";
    menu.name.en = "Signature Box Pad Krapow & Som Tum";

    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log("Renamed Signature Box Krapow.");
} else {
    console.log("Menu not found.");
}
