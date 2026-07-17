const fs = require('fs');

const royalPath = 'data/royal_menu.json';
const buffetPath = 'data/buffet_menu.json';

const royalData = JSON.parse(fs.readFileSync(royalPath, 'utf8'));
const buffetData = JSON.parse(fs.readFileSync(buffetPath, 'utf8'));

// Find Desserts category in royal_menu.json
const royalDessertsCategory = royalData.find(c => c.category === 'Desserts' || c.category_th && c.category_th.includes('ของหวาน'));

if (!royalDessertsCategory) {
    console.log("Could not find desserts in royal_menu.json");
    process.exit(1);
}

const buffetDessertsCategory = buffetData.find(c => c.id === 'desserts');

let addedCount = 0;

royalDessertsCategory.items.forEach(item => {
    // Check if it already exists
    const exists = buffetDessertsCategory.items.some(i => i.th === item.name.th);
    if (!exists) {
        buffetDessertsCategory.items.push({
            id: `item_${Math.random().toString(36).substr(2, 9)}`,
            th: item.name.th,
            en: item.name.en,
            img: item.img || "logo.png",
            price: 12 // Desserts are 12
        });
        addedCount++;
        console.log(`Added: ${item.name.th}`);
    } else {
        console.log(`Skipped (already exists): ${item.name.th}`);
    }
});

fs.writeFileSync(buffetPath, JSON.stringify(buffetData, null, 4), 'utf8');
console.log(`Successfully added ${addedCount} desserts from Royal Menu to Buffet Menu.`);
