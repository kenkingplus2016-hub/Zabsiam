const fs = require('fs');
const path = require('path');

const dirs = [
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\data',
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\api',
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data',
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\api'
];

function updateFiles(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isFile() && (file.endsWith('.json') || !file.includes('.'))) {
            try {
                let content = fs.readFileSync(filePath, 'utf8');
                let changed = false;

                // 1. Update Mixed Fruits image
                let data = JSON.parse(content);
                function traverse(obj) {
                    if (Array.isArray(obj)) {
                        for (let item of obj) traverse(item);
                    } else if (obj !== null && typeof obj === 'object') {
                        let enVal = obj.en || (obj.name && obj.name.en) || "";
                        if (typeof enVal === 'string') {
                            const en = enVal.trim().toLowerCase();
                            if (en === "mixed fruits" || en === "mixed fruit") {
                                if (obj.img !== "Mixed Fruits 1.jpg") {
                                    obj.img = "Mixed Fruits 1.jpg";
                                    changed = true;
                                }
                            }
                        }
                        for (let key in obj) traverse(obj[key]);
                    }
                }
                traverse(data);

                // 2. Replace Thai units with English
                let newContent = JSON.stringify(data, null, 4);
                const replacements = [
                    ["กรัม/หม้อ", "g/pot"],
                    ["กรัม/ถาด", "g/tray"],
                    ["กรัม/ถ้วย", "g/cup"],
                    ["ชิ้น/ถาด", "pcs/tray"],
                    ["ชิ้น/กล่อง", "pcs/box"],
                    ["ลูก/ถาด", "pcs/tray"],
                    ["ถ้วย/ถาด", "cups/tray"],
                ];
                for (const [thai, eng] of replacements) {
                    if (newContent.includes(thai)) {
                        newContent = newContent.split(thai).join(eng);
                        changed = true;
                    }
                }

                if (changed) {
                    fs.writeFileSync(filePath, newContent, 'utf8');
                    console.log(`Updated: ${filePath}`);
                }
            } catch (err) {
                // skip non-JSON files
            }
        }
    }
}

dirs.forEach(updateFiles);
