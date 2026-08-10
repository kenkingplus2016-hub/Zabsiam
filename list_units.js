const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:\\Users\\KENDEE\\Desktop\\เว็บ\\data\\buffet_menu.json', 'utf8'));
const units = new Set();
function traverse(obj) {
    if (Array.isArray(obj)) {
        for (let item of obj) traverse(item);
    } else if (obj !== null && typeof obj === 'object') {
        if (obj.unit) units.add(obj.unit);
        for (let key in obj) traverse(obj[key]);
    }
}
traverse(data);
units.forEach(u => console.log(u));
