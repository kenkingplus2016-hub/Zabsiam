const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        // Update Grilled Chicken & Hat Yai Fried Chicken unit to 'ตัว'
        if (item.th.includes('ไก่ย่าง') && !item.th.includes('น้ำตก')) {
            item.unit = 'ตัว';
            console.log(`Updated unit for ${item.th} (${item.en}) to ตัว`);
            updated++;
        }
        if (item.th.includes('ไก่ทอดหาดใหญ่')) {
            item.unit = 'ตัว';
            console.log(`Updated unit for ${item.th} (${item.en}) to ตัว`);
            updated++;
        }
        // Update Pineapple Fried Rice price and unit
        if (item.th.includes('ข้าวผัดสับปะรด') || item.en.toLowerCase().includes('pineapple')) {
            item.price = 18;
            item.unit = 'จาน';
            console.log(`Updated price for ${item.th} (${item.en}) to £18 and unit to จาน`);
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
