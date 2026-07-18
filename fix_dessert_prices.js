const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

const itemsToFix = [
    'ข้าวเหนียวมะม่วงน้ำดอกไม้',
    'ไอศกรีมกะทิข้าวเหนียว',
    'ไอศกรีมมะม่วงข้าวเหนียวมูน'
];

data.forEach(category => {
    category.items.forEach(item => {
        if (itemsToFix.includes(item.th)) {
            item.price = 12;
            console.log(`Reverted price for ${item.th} to £12`);
            updated++;
        }
    });
});

if (updated > 0) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Successfully fixed ${updated} items.`);
}
