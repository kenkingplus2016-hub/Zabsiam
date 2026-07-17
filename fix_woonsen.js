const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const mainsCategory = data.find(c => c.id === 'mains');
const riceCategory = data.find(c => c.id === 'rice');

if (riceCategory && mainsCategory) {
    const targetTh = "ยำวุ้นเส้นกุ้ง";
    const index = riceCategory.items.findIndex(i => i.th.includes(targetTh));
    
    if (index !== -1) {
        const item = riceCategory.items.splice(index, 1)[0];
        mainsCategory.items.push(item);
        console.log(`Moved ${item.th} back to mains.`);
        
        fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
    }
}
