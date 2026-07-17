const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const startersCategory = data.find(c => c.id === 'starters');

if (startersCategory) {
    let items = startersCategory.items;
    
    // Extract items to move
    let salmonItem = null;
    let larbItem = null;
    
    const salmonIndex = items.findIndex(i => i.th.includes('แซลมอนลุยสวนเกี๊ยวกรอบ'));
    if (salmonIndex !== -1) salmonItem = items.splice(salmonIndex, 1)[0];
    
    const larbIndex = items.findIndex(i => i.th.includes('ลาบไก่ / หมู'));
    if (larbIndex !== -1) larbItem = items.splice(larbIndex, 1)[0];
    
    // Find Miang Kham Sea Bass
    const miangIndex = items.findIndex(i => i.th.includes('เมี่ยงคำปลาซีบาส'));
    
    if (miangIndex !== -1) {
        let insertIndex = miangIndex + 1;
        if (salmonItem) {
            items.splice(insertIndex, 0, salmonItem);
            insertIndex++;
        }
        if (larbItem) {
            items.splice(insertIndex, 0, larbItem);
        }
        console.log("Moved แซลมอนลุยสวนเกี๊ยวกรอบ and ลาบไก่ / หมู next to เมี่ยงคำปลาซีบาส");
    } else {
        console.log("Could not find เมี่ยงคำปลาซีบาส, putting items back.");
        if (salmonItem) items.push(salmonItem);
        if (larbItem) items.push(larbItem);
    }
    
    fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
}
