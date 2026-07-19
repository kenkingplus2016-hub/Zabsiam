const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

const updates = [
    { name: 'ผัดฉ่าปลากระพง', price: 16, unit: 'จาน' },
    { name: 'ผัดเผ็ดปลากระพง', price: 16, unit: 'จาน' },
    { name: 'ผัดเปรี้ยวหวานปลากระพง', price: 16, unit: 'จาน' },
    { name: 'ปลาหมึกผัดพริกเผา', price: 18, unit: 'จาน' },
    { name: 'ผัดเผ็ดกุ้ง', price: 15, unit: 'จาน' },
    { name: 'ผัดเผ็ดเนื้อ', price: 18, unit: 'จาน' },
    { name: 'ผัดเปรี้ยวหวานไก่', price: 14, unit: 'จาน' }
];

data.forEach(category => {
    category.items.forEach(item => {
        updates.forEach(update => {
            if (item.th.includes(update.name)) {
                item.price = update.price;
                item.unit = update.unit;
                console.log(`Updated ${item.th} to £${update.price} and unit to ${update.unit}`);
                updated++;
            }
        });
    });
});

if (updated > 0) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('No items found.');
}
