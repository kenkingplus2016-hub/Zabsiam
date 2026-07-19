const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ขนมต้มไทยโบราณ') || item.en.toLowerCase().includes('khanom tom')) {
            item.price = 8;
            item.unit = '2 ลูก';
            console.log(`Updated price for ${item.th} (${item.en}) to £8 and unit to 2 ลูก`);
            updated++;
        }
    });
});

if (updated > 0) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find ขนมต้มไทยโบราณ in the menu.');
}
