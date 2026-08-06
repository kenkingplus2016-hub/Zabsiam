const fs = require('fs');

function fixPrices(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        return;
    }
    
    let raw = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(raw);
    let updated = false;
    
    function traverse(obj) {
        if (Array.isArray(obj)) {
            for (let item of obj) {
                traverse(item);
            }
        } else if (obj !== null && typeof obj === 'object') {
            if (obj.unit && (obj.unit.includes("ถ้วย") || obj.unit === "Bowl" || obj.price === 7.95 || obj.price === "7.95")) {
                if (obj.price === 7.95 || obj.price === "7.95" || obj.unit === "ถ้วย") {
                    obj.price = 69;
                    obj.unit = "10 ถ้วย / 10 Bowls";
                    console.log(`Updated price for: ${obj.en || obj.name?.en}`);
                    updated = true;
                }
            }
            for (let key in obj) {
                traverse(obj[key]);
            }
        }
    }
    
    traverse(data);
    
    if (updated) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
        console.log(`Saved updates to ${filePath}`);
    } else {
        console.log(`No items matched criteria in ${filePath}`);
    }
}

// Update GitHub repo file directly
fixPrices('C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data\\buffet_menu.json');

// Copy it to the local Desktop folder so they match
const ghPath = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data\\buffet_menu.json';
const localPath = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\data\\buffet_menu.json';
if (fs.existsSync(ghPath)) {
    fs.copyFileSync(ghPath, localPath);
    console.log("Copied updated buffet_menu.json to Desktop project");
}
