const fs = require('fs');
const path = require('path');

const dirs = [
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\data',
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\api',
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data',
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\api'
];

function update(dir) {
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
                        let enVal = obj.en || (obj.name && obj.name.en) || "";
                        if (typeof enVal === 'string') {
                            const en = enVal.trim().toLowerCase();
                            if (en.includes("spicy stuffed squid") && !en.includes("salad")) {
                                if (obj.img !== "spicy stuffed squid salad.jpg") {
                                    obj.img = "spicy stuffed squid salad.jpg";
                                    changed = true;
                                }
                            }
                        }
                        for (let key in obj) traverse(obj[key]);
                    }
                }

                traverse(data);

                if (changed) {
                    fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
                    console.log('Updated: ' + filePath);
                }
            } catch (err) {}
        }
    }
}

dirs.forEach(update);
