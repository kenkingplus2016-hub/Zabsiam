const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const mainsCategory = data.find(c => c.id === 'mains');

const targetTh = "ยำวุ้นเส้นกุ้ง";
let found = false;

data.forEach(category => {
    if (category.id === 'mains') return; // skip if already in mains
    
    const index = category.items.findIndex(i => i.th.includes(targetTh));
    if (index !== -1) {
        const item = category.items.splice(index, 1)[0];
        mainsCategory.items.push(item);
        console.log(`Moved ${item.th} from ${category.id} to mains.`);
        found = true;
    }
});

if (found) {
    fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
    console.log("File saved.");
} else {
    // Maybe it's already in mains?
    const inMains = mainsCategory.items.some(i => i.th.includes(targetTh));
    if (inMains) {
        console.log("Item is already in mains.");
    } else {
        console.log("Item not found anywhere!");
    }
}
