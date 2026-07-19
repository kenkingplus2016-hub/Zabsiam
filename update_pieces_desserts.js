const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

const piecesDesserts = [
    'ขนมชั้นใบเตย',
    'ขนมชั้นอัญชัน',
    'วุ้นกะทิใบเตย',
    'วุ้นกะทิอัญชันมะพร้าวอ่อน',
    'ขนมหม้อแกง',
    'ขนมเปียกปูน'
];

data.forEach(category => {
    category.items.forEach(item => {
        if (piecesDesserts.some(name => item.th.includes(name))) {
            item.price = 8;
            item.unit = '2 ชิ้น';
            console.log(`Updated price for ${item.th} (${item.en}) to £8 and unit to 2 ชิ้น`);
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
