const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

const updates = [
    { name: 'ผัดไทยกุ้ง', price: 16, unit: 'จาน' },
    { name: 'ผัดไทยไก่', price: 14, unit: 'จาน' },
    { name: 'ยำวุ้นเส้นหมูยอ', price: 16, unit: 'จาน' },
    { name: 'ยำวุ้นเส้นกุ้ง', price: 16, unit: 'จาน' }
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
