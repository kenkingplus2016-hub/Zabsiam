const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/royal_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

// Find Categories
const seafoodCat = data.find(c => c.category === 'Seafood');
const meatCat = data.find(c => c.category === 'Meat');
const canapesIndex = data.findIndex(c => c.category === 'Royal Cocktails & Canapés');

if (canapesIndex !== -1) {
    const canapes = data[canapesIndex].items;

    // Distribute items
    canapes.forEach(item => {
        if (item.name.en.includes('Beef') || item.name.en.includes('Chicken')) {
            meatCat.items.push(item);
        } else if (item.name.en.includes('Tuna') || item.name.en.includes('Shrimp') || item.name.en.includes('Sea Bass')) {
            seafoodCat.items.push(item);
        }
    });

    // Remove the Canapes category
    data.splice(canapesIndex, 1);

    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log("Categorized 6 items into Meat and Seafood. Removed empty Canapes category.");
} else {
    console.log("Canapes category not found!");
}
