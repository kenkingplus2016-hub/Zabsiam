const fs = require('fs');
const path = require('path');

const dirs = [
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\data',
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\api',
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data',
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\api'
];

function updateImage(dir) {
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
                            const en = enVal.trim();
                            // Handle if there's any remaining spaces or exactly matches
                            if (en === "Khanom Piak Poon Pandan") {
                                if (obj.img !== "Khanom Piak Poon Pandan.jpg") {
                                    obj.img = "Khanom Piak Poon Pandan.jpg";
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
                    console.log(`Updated image in ${filePath}`);
                }
            } catch (err) {
                // Not all files without extensions are JSON, e.g., if there were others. But api files are.
                console.error(`Error processing ${filePath}:`, err.message);
            }
        }
    }
}

dirs.forEach(updateImage);
