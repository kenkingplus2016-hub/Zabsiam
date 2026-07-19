const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

const fishNames = [
    'เมี่ยงคำปลาซีบาส',
    'ปลากะพงทอดน้ำปลา',
    'ปลากะพงทอดสามรส',
    'ปลาซีบาสลุยสวน',
    'แกงส้มแป๊ะซะปลากระพง',
    'ปลากระพงนึ่งมะนาว'
];

data.forEach(category => {
    category.items.forEach(item => {
        if (fishNames.some(name => item.th.includes(name))) {
            item.price = 16; // Ensure price is 16
            item.unit = '225g จาน';
            console.log(`Updated unit for ${item.th} (${item.en}) to 225g จาน`);
            updated++;
        }
    });
});

if (updated > 0) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('No items updated.');
}
