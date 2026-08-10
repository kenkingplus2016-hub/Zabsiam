const fs = require('fs');
const path = require('path');

const dirs = [
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\data',
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\api',
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data',
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\api'
];

function updateTakoImages(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isFile() && (file.endsWith('.json') || !file.includes('.'))) {
            try {
                let content = fs.readFileSync(filePath, 'utf8');
                let data = JSON.parse(content);
                let updated = false;

                function traverse(obj) {
                    if (Array.isArray(obj)) {
                        for (let item of obj) {
                            traverse(item);
                        }
                    } else if (obj !== null && typeof obj === 'object') {
                        let enVal = obj.en || (obj.name && obj.name.en) || "";
                        if (typeof enVal === 'string') {
                            const en = enVal.trim().toLowerCase();
                            if (en.includes("tako") && en.includes("sweet corn")) {
                                if (obj.img !== "Tako (Sweet Corn Thai Pudding).jpg") {
                                    obj.img = "Tako (Sweet Corn Thai Pudding).jpg";
                                    updated = true;
                                }
                            } else if (en.includes("tako") && en.includes("taro")) {
                                if (obj.img !== "Tako (Taro Thai Pudding).jpg") {
                                    obj.img = "Tako (Taro Thai Pudding).jpg";
                                    updated = true;
                                }
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
                    console.log(`Updated Tako images in ${filePath}`);
                }
            } catch (err) {
                console.error(`Error processing ${filePath}:`, err.message);
            }
        }
    }
}

dirs.forEach(updateTakoImages);
