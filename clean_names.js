const fs = require('fs');

function cleanNames(filePath) {
    if (!fs.existsSync(filePath)) return;
    
    let raw = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(raw);
    let updated = false;
    
    function traverse(obj) {
        if (Array.isArray(obj)) {
            for (let item of obj) {
                traverse(item);
            }
        } else if (obj !== null && typeof obj === 'object') {
            if (obj.en && obj.en.includes("£69 /10/ Bowl")) {
                obj.en = obj.en.replace(" £69 /10/ Bowl", "").replace("£69 /10/ Bowl", "").trim();
                console.log(`Cleaned name: ${obj.en}`);
                updated = true;
            }
            if (obj.name && obj.name.en && obj.name.en.includes("£69 /10/ Bowl")) {
                obj.name.en = obj.name.en.replace(" £69 /10/ Bowl", "").replace("£69 /10/ Bowl", "").trim();
                console.log(`Cleaned name.en: ${obj.name.en}`);
                updated = true;
            }
            
            // Revert Roasted Duck Red Curry if it was accidentally changed
            if (obj.en === "Roasted Duck Red Curry") {
                if (obj.price === 69) {
                    obj.price = 45; // Standard curry price
                    obj.unit = "3000 กรัม/หม้อ";
                    console.log("Reverted Roasted Duck Red Curry");
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
        console.log(`Cleaned ${filePath}`);
    }
}

cleanNames('C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data\\buffet_menu.json');
cleanNames('C:\\Users\\KENDEE\\Desktop\\เว็บ\\data\\buffet_menu.json');
