const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const mainsCategory = data.find(c => c.id === 'mains');

if (mainsCategory) {
    // Find tiger and rename
    let tigerItem = null;
    const tigerIndex = mainsCategory.items.findIndex(i => i.th.includes('เสือร้องไห้ย่าง'));
    
    if (tigerIndex !== -1) {
        tigerItem = mainsCategory.items.splice(tigerIndex, 1)[0];
        tigerItem.th = "เสือร้องไห้";
        
        // Find pork neck
        const porkNeckIndex = mainsCategory.items.findIndex(i => i.th.includes('คอหมูย่าง'));
        
        if (porkNeckIndex !== -1) {
            // Insert tiger right after pork neck
            mainsCategory.items.splice(porkNeckIndex + 1, 0, tigerItem);
            console.log("Renamed to เสือร้องไห้ and moved next to คอหมูย่าง");
        } else {
            // If pork neck not found, just put it back
            mainsCategory.items.push(tigerItem);
            console.log("Renamed to เสือร้องไห้ but couldn't find คอหมูย่าง");
        }
        
        fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
    } else {
        console.log("Could not find เสือร้องไห้ย่าง");
    }
}
