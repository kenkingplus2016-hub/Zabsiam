const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('แซลมอนลุยสวนเกี๊ยวกรอบ') || item.en.toLowerCase().includes('salmon lui suan wonton')) {
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
    console.log('Could not find แซลมอนลุยสวนเกี๊ยวกรอบ in the menu.');
}
