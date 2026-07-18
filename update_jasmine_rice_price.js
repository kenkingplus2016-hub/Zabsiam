const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ข้าวสวย') || item.en.toLowerCase() === 'jasmine rice' || item.en.toLowerCase().includes('steamed jasmine rice')) {
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
    console.log('Could not find ข้าวสวย in the menu.');
}
