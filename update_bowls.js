const fs = require('fs');

function updateBowlsRecursive(obj) {
    let updated = false;
    const bowlKeywords = ['bua loy', 'sago', 'lod chong', 'thapthim', 'tapioca shells', 'tub tim'];
    
    if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
            if (updateBowlsRecursive(obj[i])) {
                updated = true;
            }
        }
    } else if (obj !== null && typeof obj === 'object') {
        if (obj.name && (obj.name.en || obj.name.th)) {
            const nameEn = (obj.name.en || '').toLowerCase();
            const nameTh = (obj.name.th || '').toLowerCase();
            let isBowl = false;
            for (const kw of bowlKeywords) {
                if (nameEn.includes(kw) || nameTh.includes(kw)) {
                    isBowl = true;
                    break;
                }
            }
            if (isBowl) {
                console.log(`Updating ${obj.name.en}`);
                obj.price = "69.00";
                if (!obj.unit) obj.unit = {};
                obj.unit.th = "10 ถ้วย";
                obj.unit.en = "10 Bowls";
                updated = true;
            }
        }
        
        for (const key in obj) {
            if (updateBowlsRecursive(obj[key])) {
                updated = true;
            }
        }
    }
    return updated;
}

function updateFile(file) {
    if (!fs.existsSync(file)) return;
    let data = JSON.parse(fs.readFileSync(file, 'utf8'));
    let updated = updateBowlsRecursive(data);
    
    if (updated) {
        fs.writeFileSync(file, JSON.stringify(data, null, 4), 'utf8');
        console.log(`Saved ${file}`);
    } else {
        console.log(`No bowls found in ${file}`);
    }
}

updateFile('data/classic_menu.json');
updateFile('data/royal_menu.json');
console.log('Done.');
