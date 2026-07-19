const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ยำแซ่บปลาหมึกยัดไส้') || item.en.toLowerCase().includes('stuffed squid')) {
            item.price = 18;
            item.unit = '3 ตัว';
            console.log(`Updated price for ${item.th} (${item.en}) to £18 and unit to 3 ตัว`);
            updated++;
        }
    });
});

if (updated > 0) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find ยำแซ่บปลาหมึกยัดไส้ in the menu.');
}
