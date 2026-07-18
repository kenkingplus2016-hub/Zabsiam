const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ยำส้มโอกุ้งสด') || item.en.toLowerCase().includes('pomelo salad with shrimp')) {
            item.price = 16;
            console.log(`Updated price for ${item.th} (${item.en}) to £16`);
            updated++;
        }
    });
});

if (updated > 0) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find ยำส้มโอกุ้งสด in the menu.');
}
