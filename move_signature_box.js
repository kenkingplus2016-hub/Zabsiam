const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

// Find index of the item
const sigIndex = data.findIndex(m => m.id === 18 || m.id === '18');

if (sigIndex !== -1) {
    // Remove it from its current position
    const [sigItem] = data.splice(sigIndex, 1);
    // Insert it at index 2 (after 0: Premium Box, 1: VIP Box)
    data.splice(2, 0, sigItem);

    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log("Moved Special Signature Box Set to index 2.");
} else {
    console.log("Menu not found.");
}
