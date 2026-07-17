const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const mainsCategory = data.find(c => c.id === 'mains');

if (mainsCategory) {
    const gcIndex = mainsCategory.items.findIndex(i => i.th.includes('แกงเขียวหวาน'));
    
    const gcPrawns = {
        id: `item_${Math.random().toString(36).substr(2, 9)}`,
        th: "แกงเขียวหวานกุ้ง",
        en: "Green Curry with Prawns",
        img: "logo.png",
        price: 15,
        unit: "ถ้วย"
    };
    
    if (gcIndex !== -1) {
        mainsCategory.items.splice(gcIndex + 1, 0, gcPrawns);
        console.log("Added แกงเขียวหวานกุ้ง right next to แกงเขียวหวาน");
    } else {
        mainsCategory.items.push(gcPrawns);
        console.log("Could not find แกงเขียวหวาน, appended to end of mains");
    }
    
    fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
}
