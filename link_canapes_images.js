const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/royal_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

// The newly added category is the last one in the array
const canapesCategory = data.find(c => c.category === 'Royal Cocktails & Canapés');

if (canapesCategory) {
    const imgMap = {
        'c1': 'MiniBeef Salad Thai Style.jpg',
        'c2': 'MiniTuna Salad.jpg',
        'c3': 'MiniChicken Roasted Lemongrass.jpg',
        'c4': 'MiniSpicy Shrimp Salad.jpg',
        'c5': 'Mini  Shrimp with Tamarind Sauce.jpg',
        'c6': 'Mini Sea Bass  Tamarind Sauce.jpg'
    };

    let modified = false;
    canapesCategory.items.forEach(item => {
        if (imgMap[item.id]) {
            item.img = imgMap[item.id];
            modified = true;
            console.log(`Updated image for ${item.id} to ${item.img}`);
        }
    });

    if (modified) {
        fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
        console.log("Images for Canapés successfully updated in JSON.");
    }
} else {
    console.log("Canapés category not found!");
}
