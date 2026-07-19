const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ข้าวเหนียวมะม่วง') || item.en.toLowerCase().includes('mango sticky rice')) {
            item.price = 7;
            item.unit = 'ชุด';
            console.log(`Updated price for ${item.th} (${item.en}) to £7 and unit to ชุด`);
            updated++;
        }
    });
});

if (updated > 0) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find the items in the menu.');
}
