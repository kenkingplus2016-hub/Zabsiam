const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

const itemsToUpdate = [
    'แกงเขียวหวานไก่',
    'แกงเขียวหวานหมู',
    'แกงแดงไก่',
    'แกงแดงหมู',
    'แกงมัสมันไก่',
    'แกงกะหรี่ไก่',
    'แกงพะแนงหมู',
    'แกงพะแนงไก่',
    'แกงเทโพไก่',
    'แกงเทโพหมู',
    'แกงเทโพหมูสามชั้น'
];

data.forEach(category => {
    category.items.forEach(item => {
        // Use exact match or strict inclusion to ensure we hit the right curries
        // E.g., item.th === 'แกงเขียวหวานไก่'
        if (itemsToUpdate.some(name => item.th.includes(name))) {
            item.price = 14;
            item.unit = '750 กรัม 6 ถ้วย';
            console.log(`Updated price for ${item.th} (${item.en}) to £14 and unit to 750 กรัม 6 ถ้วย`);
            updated++;
        }
    });
});

if (updated > 0) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('No items found.');
}
