const fs = require('fs');

function fixUnit(file) {
    if (!fs.existsSync(file)) return;
    let data = JSON.parse(fs.readFileSync(file, 'utf8'));
    let updated = false;
    
    function recurse(obj) {
        if (Array.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                recurse(obj[i]);
            }
        } else if (obj !== null && typeof obj === 'object') {
            if (obj.price === "69.00" || obj.price === 69) {
                if (obj.unit === "12 ชิ้น / 12 Pcs" || typeof obj.unit === 'string') {
                    obj.unit = "10 ถ้วย / 10 Bowls";
                    console.log(`Fixed unit for ${obj.name.en}`);
                    updated = true;
                }
            }
            for (const key in obj) {
                recurse(obj[key]);
            }
        }
    }
    
    recurse(data);
    
    if (updated) {
        fs.writeFileSync(file, JSON.stringify(data, null, 4), 'utf8');
        console.log(`Saved ${file}`);
    }
}

fixUnit('data/royal_menu.json');
fixUnit('data/classic_menu.json');
