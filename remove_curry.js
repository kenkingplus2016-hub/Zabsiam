const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const filteredData = data.filter(m => {
    const nameTh = (m.name && m.name.th) ? m.name.th : '';
    const nameEn = (m.name && m.name.en) ? m.name.en : '';
    
    // Check if it's explicitly a curry (แกง or curry)
    // But EXCLUDE "ผัดพริกแกง" (Pad Prik Gaeng) because that's a stir fry!
    const isCurry = (nameTh.includes('แกง') || nameEn.toLowerCase().includes('curry')) 
                    && !nameTh.includes('ผัดพริกแกง') && !nameEn.toLowerCase().includes('prik gaeng');
    
    if (isCurry) {
        console.log(`Removing: ${m.id} - ${nameTh} / ${nameEn}`);
        return false; // exclude from filtered array
    }
    return true; // keep
});

fs.writeFileSync(file, JSON.stringify(filteredData, null, 2), 'utf8');
console.log(`Removed ${data.length - filteredData.length} items.`);
