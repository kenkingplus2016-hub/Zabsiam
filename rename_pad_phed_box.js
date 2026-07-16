const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const padPhedIndex = data.findIndex(m => m.id === 'lunch_box_pad_phed');

if (padPhedIndex !== -1) {
    const menu = data[padPhedIndex];
    menu.name.th = "Signature Box ผัดเผ็ด";
    menu.name.en = "Signature Box Pad Phed";

    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log("Renamed Signature Box Pad Phed.");
} else {
    console.log("Menu not found.");
}
