const fs = require('fs');
const path = require('path');

function searchFiles(dir, text) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                searchFiles(fullPath, text);
            }
        } else {
            if (fullPath.endsWith('.json') || fullPath.endsWith('.js') || fullPath.endsWith('.html')) {
                const content = fs.readFileSync(fullPath, 'utf8');
                if (content.toLowerCase().includes(text.toLowerCase())) {
                    console.log(`Found in: ${fullPath}`);
                }
            }
        }
    }
}

searchFiles('C:\\Users\\KENDEE\\Desktop\\เว็บ', 'Krong Krang');
searchFiles('C:\\Users\\KENDEE\\Desktop\\เว็บ', '7.95');
