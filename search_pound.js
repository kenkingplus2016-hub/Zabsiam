const fs = require('fs');
const path = require('path');

const dataDir = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\data';

function searchFiles(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file.endsWith('.json')) {
            const filePath = path.join(dir, file);
            let raw = fs.readFileSync(filePath, 'utf8');
            let data = JSON.parse(raw);

            function traverse(obj) {
                if (Array.isArray(obj)) {
                    for (let i = 0; i < obj.length; i++) {
                        if (typeof obj[i] === 'string') {
                            if (obj[i].includes('£') || obj[i].includes('')) {
                                console.log(`Found in ${file}: ${obj[i]}`);
                            }
                        } else {
                            traverse(obj[i]);
                        }
                    }
                } else if (obj !== null && typeof obj === 'object') {
                    for (let key in obj) {
                        if (typeof obj[key] === 'string') {
                            if (obj[key].includes('£') || obj[key].includes('')) {
                                console.log(`Found in ${file} (key ${key}): ${obj[key]}`);
                            }
                        } else {
                            traverse(obj[key]);
                        }
                    }
                }
            }

            traverse(data);
        }
    }
}

searchFiles(dataDir);
