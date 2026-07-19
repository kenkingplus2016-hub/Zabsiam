const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ผลไม้รวม') || item.en.toLowerCase().includes('mixed fruit')) {
            item.price = 25;
            item.unit = 'ถาด';
            console.log(`Updated price for ${item.th} (${item.en}) to £25 and unit to ถาด`);
            updated++;
        }
    });
});

if (updated > 0) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find ผลไม้รวม in the menu.');
}
