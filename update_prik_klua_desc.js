const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const index = data.findIndex(m => m.id === 'lunch_box_prik_klua');

if (index !== -1) {
    data[index].desc.en = data[index].desc.en.replace('Signature Lunch Box:', 'Signature Box:');
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log("Updated Prik Klua Box desc.");
} else {
    console.log("Menu not found.");
}
