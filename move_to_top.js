const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

// Find index of the item
const setAIndex = data.findIndex(m => m.id === 'lunch_box_set_a');

if (setAIndex !== -1) {
    // Remove it from its current position
    const [setAItem] = data.splice(setAIndex, 1);
    // Unshift it to the top (index 0)
    data.unshift(setAItem);

    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log("Moved Special Box Set Premium to the top.");
} else {
    console.log("Menu not found.");
}
