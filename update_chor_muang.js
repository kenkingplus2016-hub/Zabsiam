const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/royal_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

let modified = false;
data.forEach(category => {
    category.items.forEach(item => {
        if (item.name.en === 'Chor Muang (Royal Pork Dumplings)' || item.name.en.includes('Chor Muang')) {
            item.img = 'Chor Muang (Royal Pork Dumplings).jpeg';
            modified = true;
        }
    });
});

if (modified) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log("Updated image for Chor Muang (Royal Pork Dumplings).");
} else {
    console.log("Menu item not found.");
}
