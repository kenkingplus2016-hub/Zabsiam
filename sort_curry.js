const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const mainsCategory = data.find(c => c.id === 'mains');

if (mainsCategory) {
    const targetTh = "แกงกะหรี่ไก่";
    const targetIndex = mainsCategory.items.findIndex(i => i.th.includes(targetTh));
    
    if (targetIndex !== -1) {
        const item = mainsCategory.items.splice(targetIndex, 1)[0];
        
        // Find the first curry (แกง) in mains
        const firstCurryIndex = mainsCategory.items.findIndex(i => i.th.startsWith('แกง'));
        
        if (firstCurryIndex !== -1) {
            // Insert it right after the first curry (or before it)
            mainsCategory.items.splice(firstCurryIndex + 1, 0, item);
            console.log(`Moved ${item.th} next to other curries.`);
        } else {
            // If no curries found, just push it back
            mainsCategory.items.push(item);
            console.log("No other curries found in mains.");
        }
        
        fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
    } else {
        console.log("Could not find แกงกะหรี่ไก่");
    }
}
