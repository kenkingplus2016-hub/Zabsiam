const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const vegCategory = data.find(c => c.id === 'vegetables');

if (vegCategory) {
    const idx = vegCategory.items.findIndex(i => i.th === 'ผัดผักบ็อกฉ่อยน้ำมันหอย');
    if (idx !== -1) {
        vegCategory.items[idx].th = 'ผัดผักฉ่อยน้ำมันหอย';
        
        // Let's also update the English name just in case it was weird, usually it's "Stir-fried Bok Choy in Oyster Sauce" or similar.
        // It's probably fine to leave it.
        
        fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
        console.log("Renamed ผัดผักบ็อกฉ่อยน้ำมันหอย to ผัดผักฉ่อยน้ำมันหอย");
    } else {
        console.log("Item not found");
    }
}
