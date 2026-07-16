const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
let data = fs.readFileSync(file, 'utf8');

// Replace all occurrences
data = data.replace(/ผัดหมึกไข่เค็ม/g, 'ปลาหมึกผัดไข่เค็ม');

fs.writeFileSync(file, data, 'utf8');
console.log("Renamed Squid menu.");
