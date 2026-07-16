const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

// Filter out the item with id 14 or '14'
const filteredData = data.filter(m => m.id !== 14 && m.id !== '14');

if (data.length !== filteredData.length) {
    fs.writeFileSync(file, JSON.stringify(filteredData, null, 2), 'utf8');
    console.log(`Removed ${data.length - filteredData.length} item(s) with id 14.`);
} else {
    console.log("No items with id 14 found.");
}
