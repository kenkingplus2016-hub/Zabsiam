const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const setAIndex = data.findIndex(m => m.id === 'lunch_box_set_a');

if (setAIndex !== -1) {
    data[setAIndex].name.th = "Special Box Set พรีเมียม";
    data[setAIndex].name.en = "Special Box Set Premium";

    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log("Renamed Set A to Special Box Set Premium.");
} else {
    console.log("Menu not found.");
}
