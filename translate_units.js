const fs = require('fs');
const path = require('path');

const dirs = [
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\data',
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\api',
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data',
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\api'
];

// Thai unit -> English unit mapping
const unitMap = {
    "12 ชิ้น": "12 pcs",
    "12 ไม้": "12 skewers",
    "120 กรัม": "120g",
    "500 กรัม 2 จาน": "500g / 2 plates",
    "225g จาน": "225g / plate",
    "2 ตัว": "2 pcs",
    "1000 กรัม": "1000g",
    "750 กรัม": "750g",
    "1500 กรัม": "1500g",
    "3 ตัว": "3 pcs",
    "ตัว": "pc",
    "โถ": "pot",
    "กระติบ (12 ที่)": "basket (12 servings)",
    "ถาด": "tray",
    "2000 กรัม / ถาด": "2000g / tray",
    "จาน": "plate",
    "10 ถ้วย / 10 Bowls": "10 Bowls",
    "25 ชิ้น / ถาด": "25 pcs/tray",
    "10 ถ้วย": "10 cups",
    "เหยือก (2.5L)": "jug (2.5L)",
    "ท่าน": "person",
};

function updateUnits(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isFile() && (file.endsWith('.json') || !file.includes('.'))) {
            try {
                let content = fs.readFileSync(filePath, 'utf8');
                let data = JSON.parse(content);
                let changed = false;

                function traverse(obj) {
                    if (Array.isArray(obj)) {
                        for (let item of obj) traverse(item);
                    } else if (obj !== null && typeof obj === 'object') {
                        if (obj.unit && typeof obj.unit === 'string') {
                            if (unitMap[obj.unit]) {
                                obj.unit = unitMap[obj.unit];
                                changed = true;
                            }
                        }
                        for (let key in obj) traverse(obj[key]);
                    }
                }

                traverse(data);

                if (changed) {
                    fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
                    console.log('Updated units in ' + filePath);
                }
            } catch (err) {
                // skip non-JSON
            }
        }
    }
}

dirs.forEach(updateUnits);
