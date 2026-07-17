const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const mainsCategory = data.find(c => c.id === 'mains');

if (mainsCategory) {
    const salmonIndex = mainsCategory.items.findIndex(i => i.th.includes('พล่าปลาแซลมอน'));
    
    const plaGoong = {
        id: `item_${Math.random().toString(36).substr(2, 9)}`,
        th: "พล่ากุ้ง",
        en: "Spicy Lemongrass Prawn Salad (Pla Goong)",
        img: "logo.png",
        price: 15
    };
    
    if (salmonIndex !== -1) {
        mainsCategory.items.splice(salmonIndex + 1, 0, plaGoong);
        console.log("Added พล่ากุ้ง right next to พล่าปลาแซลมอน");
    } else {
        mainsCategory.items.push(plaGoong);
        console.log("Could not find พล่าปลาแซลมอน, appended พล่ากุ้ง to end of mains");
    }
    
    fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
}
