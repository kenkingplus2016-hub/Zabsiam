const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const index = data.findIndex(m => m.id === 'lunch_box_pad_prik_gaeng');

if (index !== -1) {
    const menu = data[index];
    menu.name.th = "Signature Box ผัดพริกแกงหมูกรอบ";
    menu.name.en = "Signature Box Pad Prik Gaeng Moo krob";

    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log("Renamed Signature Box Pad Prik Gaeng.");
} else {
    console.log("Menu not found.");
}
