const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

const takoDesserts = [
    'ขนมตะโก้ข้าวโพด',
    'ขนมตะโก้เผือก'
];

data.forEach(category => {
    category.items.forEach(item => {
        if (takoDesserts.some(name => item.th.includes(name))) {
            item.price = 25;
            item.unit = '25 ชิ้น / ถาด';
            console.log(`Updated price for ${item.th} (${item.en}) to £25 and unit to 25 ชิ้น / ถาด`);
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
