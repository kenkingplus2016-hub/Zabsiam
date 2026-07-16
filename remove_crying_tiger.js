const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

// Filter out the crying tiger menu
const filteredData = data.filter(m => m.id !== 'lunch_box_premium_crying_tiger');

fs.writeFileSync(file, JSON.stringify(filteredData, null, 2), 'utf8');
console.log(`Removed ${data.length - filteredData.length} items (Crying Tiger Box).`);
