const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ผักรวมเต้าหู้') && item.th.startsWith('แกง')) {
            item.price = 14;
            item.unit = '750 กรัม 6 ถ้วย';
            console.log(`Updated Tofu Curry: ${item.th} to £14 and 750 กรัม 6 ถ้วย`);
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
