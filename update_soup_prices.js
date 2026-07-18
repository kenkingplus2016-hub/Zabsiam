const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

const itemsToUpdate = [
    'ต้มยำกุ้ง',
    'ต้มข่ากุ้ง',
    'ต้มข่าไก่'
];

data.forEach(category => {
    category.items.forEach(item => {
        // Exact match or strict inclusion to avoid hitting "ข้าวผัดต้มยำกุ้ง"
        if (item.th === 'ต้มยำกุ้ง' || item.th === 'ต้มข่ากุ้ง' || item.th === 'ต้มข่าไก่') {
            item.price = 5;
            console.log(`Updated price for ${item.th} (${item.en}) to £5`);
            updated++;
        }
    });
});

if (updated > 0) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('No items found.');
}
