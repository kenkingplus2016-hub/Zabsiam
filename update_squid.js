const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ปลาหมึกนึ่งมะนาว') || item.en.toLowerCase().includes('steamed squid')) {
            item.price = 35;
            item.unit = '450g หม้อไฟ';
            console.log(`Updated price for ${item.th} (${item.en}) to £35 and unit to 450g หม้อไฟ`);
            updated++;
        }
    });
});

if (updated > 0) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find ปลาหมึกนึ่งมะนาว in the menu.');
}
