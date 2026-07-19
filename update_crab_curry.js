const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ปูผัดผงกะหรี่') || item.en.toLowerCase().includes('crab curry')) {
            item.price = 45;
            item.unit = '500 กรัม 2 จาน';
            console.log(`Updated price for ${item.th} (${item.en}) to £45 and unit to 500 กรัม 2 จาน`);
            updated++;
        }
    });
});

if (updated > 0) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find ปูผัดผงกะหรี่ in the menu.');
}
