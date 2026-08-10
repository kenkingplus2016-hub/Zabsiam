const fs = require('fs');
const path = require('path');

const dataDir = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\data';
const ghDataDir = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data';

function updateImagesWith1(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file.endsWith('.json')) {
            const filePath = path.join(dir, file);
            let raw = fs.readFileSync(filePath, 'utf8');
            let data = JSON.parse(raw);
            let updated = false;

            function traverse(obj) {
                if (Array.isArray(obj)) {
                    for (let item of obj) {
                        traverse(item);
                    }
                } else if (obj !== null && typeof obj === 'object') {
                    let enVal = obj.en || (obj.name && obj.name.en) || "";
                    if (typeof enVal === 'string') {
                        const en = enVal.toLowerCase();
                        if (en === "pandan coconut jelly") {
                            if (obj.img !== "Pandan Coconut Jelly1.jpg") {
                                obj.img = "Pandan Coconut Jelly1.jpg";
                                updated = true;
                            }
                        } else if (en.includes("butterfly pea coconut jelly")) {
                            if (obj.img !== "Butterfly Pea Coconut Jelly1.jpg") {
                                obj.img = "Butterfly Pea Coconut Jelly1.jpg";
                                updated = true;
                            }
                        } else if (en === "khanom mo kaeng") {
                            if (obj.img !== "Khanom Mo Kaeng1.jpg") {
                                obj.img = "Khanom Mo Kaeng1.jpg";
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
                console.log(`Updated images to 1.jpg in ${filePath}`);
                
                const ghPath = path.join(ghDataDir, file);
                if (fs.existsSync(ghDataDir)) {
                    fs.copyFileSync(filePath, ghPath);
                }
            }
        }
    }
}

updateImagesWith1(dataDir);
updateImagesWith1(ghDataDir);
