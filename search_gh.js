const fs = require('fs');
const path = require('path');

function searchFiles(dir, text) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                searchFiles(fullPath, text);
            }
        } else {
            if (fullPath.endsWith('.json') || fullPath.endsWith('.js') || fullPath.endsWith('.html')) {
                try {
                    const content = fs.readFileSync(fullPath, 'utf8');
                    if (content.toLowerCase().includes(text.toLowerCase())) {
                        console.log(`Found in: ${fullPath}`);
                    }
                } catch(e) {}
            }
        }
    }
}

console.log("Searching in GitHub repo:");
searchFiles('C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london', 'Krong Krang Butterfly Pea');
