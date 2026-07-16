const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/royal_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

let modified = false;

data.forEach(category => {
    if (category.category === 'Veg') {
        category.items.forEach(item => {
            if (item.price !== 12) {
                item.price = 12;
                modified = true;
            }
        });
    } else if (category.category === 'Meat') {
        category.items.forEach(item => {
            if (item.price !== 14) {
                item.price = 14;
                modified = true;
            }
        });
    } else if (category.category === 'Seafood') {
        category.items.forEach(item => {
            if (item.price !== 15) {
                item.price = 15;
                modified = true;
            }
        });
    }
});

if (modified) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log("Updated prices for Veg (£12), Meat (£14), and Seafood (£15).");
} else {
    console.log("No prices needed updating.");
}
