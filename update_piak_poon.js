const fs = require('fs');
const path = require('path');

const dirs = [
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\data',
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\api',
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data',
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\api'
];

function updateName(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isFile() && (file.endsWith('.json') || !file.includes('.'))) {
            try {
                let content = fs.readFileSync(filePath, 'utf8');
                // Use a global string replacement for safety across all matches
                let newContent = content.replace(/Khanom Piak Poon \(Pandan Sweet Pudding\)/g, "Khanom Piak Poon Pandan");
                
                if (content !== newContent) {
                    fs.writeFileSync(filePath, newContent, 'utf8');
                    console.log(`Updated name in ${filePath}`);
                }
            } catch (err) {
                console.error(`Error reading ${filePath}:`, err);
            }
        }
    }
}

dirs.forEach(updateName);
