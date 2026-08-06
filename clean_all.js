const fs = require('fs');
const path = require('path');

const dataDir = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\data';
const ghDataDir = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data';

function cleanFiles(dir) {
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
                    for (let i = 0; i < obj.length; i++) {
                        if (typeof obj[i] === 'string') {
                            let oldStr = obj[i];
                            let newStr = oldStr.replace(/[£]?\s*69\s*\/10\/\s*Bowl/g, "").trim();
                            if (oldStr !== newStr) {
                                obj[i] = newStr;
                                updated = true;
                            }
                        } else {
                            traverse(obj[i]);
                        }
                    }
                } else if (obj !== null && typeof obj === 'object') {
                    for (let key in obj) {
                        if (typeof obj[key] === 'string') {
                            let oldStr = obj[key];
                            let newStr = oldStr.replace(/[£]?\s*69\s*\/10\/\s*Bowl/g, "").trim();
                            if (oldStr !== newStr) {
                                obj[key] = newStr;
                                updated = true;
                            }
                        } else {
                            traverse(obj[key]);
                        }
                    }
                    
                    // Also check if this is a dessert item that needs price/unit update
                    if (obj.price === 7.95 || obj.price === "7.95" || obj.unit === "ถ้วย" || obj.unit === "12 ชิ้น / 12 Pcs") {
                        // Check if it's one of the bowl desserts based on name
                        const nameEn = (obj.en || (obj.name && obj.name.en) || "").toLowerCase();
                        if (nameEn.includes("lod chong") || nameEn.includes("bua loy") || nameEn.includes("tub tim krop") || nameEn.includes("banana in coconut milk") || nameEn.includes("krong krang") || nameEn.includes("tapioca shells") || nameEn.includes("coconut dumplings") || nameEn.includes("sago")) {
                            if (obj.price !== 69) {
                                obj.price = 69;
                                obj.unit = "10 ถ้วย / 10 Bowls";
                                updated = true;
                            }
                        }
                    }
                }
            }

            traverse(data);

            if (updated) {
                fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
                console.log(`Cleaned ${filePath}`);
                
                // Copy to GH folder
                const ghPath = path.join(ghDataDir, file);
                if (fs.existsSync(ghDataDir)) {
                    fs.copyFileSync(filePath, ghPath);
                }
            }
        }
    }
}

cleanFiles(dataDir);
cleanFiles(ghDataDir);
