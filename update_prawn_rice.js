const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ข้าวผัดมันกุ้ง') || item.th.includes('ข้าวผัดต้มยำกุ้ง')) {
            item.price = 16;
            item.unit = 'จาน';
            console.log(`Updated price for ${item.th} (${item.en}) to £16 and unit to จาน`);
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
