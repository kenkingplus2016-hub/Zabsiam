const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

// Filter out the tom yum seafood menu (id: 101)
const filteredData = data.filter(m => m.id !== 101 && m.id !== '101');

fs.writeFileSync(file, JSON.stringify(filteredData, null, 2), 'utf8');
console.log(`Removed ${data.length - filteredData.length} items (Tom Yum Seafood).`);
