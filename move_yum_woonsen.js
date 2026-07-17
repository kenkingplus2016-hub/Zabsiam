const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const startersCategory = data.find(c => c.id === 'starters');
const mainsCategory = data.find(c => c.id === 'mains');

if (startersCategory && mainsCategory) {
    const targetTh = "ยำวุ้นเส้นกุ้ง";
    const index = startersCategory.items.findIndex(i => i.th.includes(targetTh));
    
    if (index !== -1) {
        const item = startersCategory.items.splice(index, 1)[0];
        mainsCategory.items.push(item);
        console.log(`Moved ${item.th} to mains.`);
        
        fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
    } else {
        console.log("Could not find the item in starters.");
    }
}
