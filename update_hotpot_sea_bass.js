const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

const fishNames = [
    'แกงส้มแป๊ะซะปลากระพง',
    'ปลากระพงนึ่งมะนาว'
];

data.forEach(category => {
    category.items.forEach(item => {
        if (fishNames.some(name => item.th.includes(name))) {
            item.price = 29;
            item.unit = '450g หม้อไฟ';
            console.log(`Updated price for ${item.th} (${item.en}) to £29 and unit to 450g หม้อไฟ`);
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
