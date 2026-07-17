const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const dessertsCategory = data.find(c => c.id === 'desserts');

if (dessertsCategory) {
    const anchanIndex = dessertsCategory.items.findIndex(i => i.th.includes('ขนมชั้นอัญชัน'));
    
    if (anchanIndex !== -1) {
        const anchanItem = dessertsCategory.items.splice(anchanIndex, 1)[0];
        
        const baitoeyIndex = dessertsCategory.items.findIndex(i => i.th.includes('ขนมชั้นใบเตย'));
        
        if (baitoeyIndex !== -1) {
            // Insert anchan right next to baitoey
            dessertsCategory.items.splice(baitoeyIndex + 1, 0, anchanItem);
            console.log("Moved ขนมชั้นอัญชัน next to ขนมชั้นใบเตย");
        } else {
            dessertsCategory.items.push(anchanItem);
            console.log("Could not find ขนมชั้นใบเตย, appended ขนมชั้นอัญชัน to end");
        }
        
        fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
    } else {
        console.log("Could not find ขนมชั้นอัญชัน");
    }
}
