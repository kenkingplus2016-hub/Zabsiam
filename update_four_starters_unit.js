const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

const itemsToUpdate = [
    'ยำส้มโอกุ้งสด',
    'เมี่ยงคำปลาซีบาส',
    'แซลมอนลุยสวนเกี๊ยวกรอบ',
    'เมี่ยงคำส้มโอกุ้ง'
];

data.forEach(category => {
    category.items.forEach(item => {
        if (itemsToUpdate.some(name => item.th.includes(name))) {
            item.price = 16;
            item.unit = '6 ชิ้น';
            console.log(`Updated price for ${item.th} (${item.en}) to £16 and unit to 6 ชิ้น`);
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
