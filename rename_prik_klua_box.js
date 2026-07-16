const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const prikKluaIndex = data.findIndex(m => m.id === 'lunch_box_prik_klua');

if (prikKluaIndex !== -1) {
    const menu = data[prikKluaIndex];
    menu.name.th = "Signature Box คั่วพริกเกลือหมูกรอบ + ส้มตำ";
    menu.name.en = "Signature Box Moo krob kau prik klua & Som Tum";

    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log("Renamed Signature Box Prik Klua.");
} else {
    console.log("Menu not found.");
}
