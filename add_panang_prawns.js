const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const mainsCategory = data.find(c => c.id === 'mains');

if (mainsCategory) {
    const pnIndex = mainsCategory.items.findIndex(i => i.th.includes('แกงพะแนง'));
    
    const pnPrawns = {
        id: `item_${Math.random().toString(36).substr(2, 9)}`,
        th: "แกงพะแนงกุ้ง",
        en: "Panang Curry with Prawns",
        img: "logo.png",
        price: 15,
        unit: "ถ้วย"
    };
    
    if (pnIndex !== -1) {
        // Find the LAST Panang item to put it at the end of the Panang group
        let insertIndex = pnIndex;
        while (insertIndex < mainsCategory.items.length && mainsCategory.items[insertIndex].th.includes('แกงพะแนง')) {
            insertIndex++;
        }
        
        mainsCategory.items.splice(insertIndex, 0, pnPrawns);
        console.log("Added แกงพะแนงกุ้ง right next to other Panang curries");
    } else {
        mainsCategory.items.push(pnPrawns);
        console.log("Could not find แกงพะแนง, appended to end of mains");
    }
    
    fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
}
