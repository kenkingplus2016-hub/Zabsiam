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

            const regex = /\s*[£]\s*\d+[\s\S]*/; // Match £ or  followed by digits and anything else to the end of string

            function traverse(obj) {
                if (Array.isArray(obj)) {
                    for (let i = 0; i < obj.length; i++) {
                        if (typeof obj[i] === 'string') {
                            let oldStr = obj[i];
                            let newStr = oldStr.replace(regex, "").trim();
                            // Specific targeted replace for known patterns if regex missed it:
                            newStr = newStr.replace(/\s*£\d+\s*\/.*/, "").trim();
                            if (oldStr !== newStr) {
                                obj[i] = newStr;
                                console.log(`Cleaned string in ${file}: "${oldStr}" -> "${newStr}"`);
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
                            let newStr = oldStr.replace(regex, "").trim();
                            if (oldStr !== newStr) {
                                obj[key] = newStr;
                                console.log(`Cleaned string in ${file} (key ${key}): "${oldStr}" -> "${newStr}"`);
                                updated = true;
                            }
                        } else {
                            traverse(obj[key]);
                        }
                    }
                }
            }

            traverse(data);

            if (updated) {
                fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
                console.log(`Saved ${filePath}`);
                
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
