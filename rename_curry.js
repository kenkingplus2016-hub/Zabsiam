const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const mainsCategory = data.find(c => c.id === 'mains');

if (mainsCategory) {
    const idx = mainsCategory.items.findIndex(i => i.th === 'แกงกะหรี่ไก่');
    if (idx !== -1) {
        mainsCategory.items[idx].en = 'Thai Curry Chicken';
        fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
        console.log("Renamed Yellow Chicken Curry to Thai Curry Chicken");
    } else {
        console.log("Could not find แกงกะหรี่ไก่");
    }
}
