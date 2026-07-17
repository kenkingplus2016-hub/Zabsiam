const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const riceCategory = data.find(c => c.id === 'rice');

if (riceCategory) {
    // Find generic Pad Thai
    const genericIndex = riceCategory.items.findIndex(i => i.th === 'ผัดไทย' || i.th === 'ผัดไทยไก่');
    
    if (genericIndex !== -1) {
        const item = riceCategory.items.splice(genericIndex, 1)[0];
        item.th = "ผัดไทยไก่";
        item.en = "Pad Thai with Chicken";
        
        // Find Pad Thai with Prawn
        const prawnIndex = riceCategory.items.findIndex(i => i.th.includes('ผัดไทยกุ้ง'));
        
        if (prawnIndex !== -1) {
            riceCategory.items.splice(prawnIndex + 1, 0, item);
            console.log("Renamed to ผัดไทยไก่ and moved next to ผัดไทยกุ้ง");
        } else {
            riceCategory.items.push(item);
            console.log("Renamed to ผัดไทยไก่, but couldn't find ผัดไทยกุ้ง");
        }
        
        fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
    } else {
        console.log("Could not find generic ผัดไทย");
    }
}
