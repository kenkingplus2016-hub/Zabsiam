const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.unit && item.unit.includes('หม้อไฟ')) {
            if (item.th.includes('ปลากระพง')) {
                item.price = 45;
                item.unit = '3000 กรัม/หม้อ';
                console.log(`Updated price for ${item.th} to £45 and unit to 3000 กรัม/หม้อ`);
                updated++;
            } else if (item.th.includes('ปลาหมึก')) {
                item.price = 50;
                item.unit = '3000 กรัม/หม้อ';
                console.log(`Updated price for ${item.th} to £50 and unit to 3000 กรัม/หม้อ`);
                updated++;
            }
        }
    });
});

if (updated > 0) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find the items in the menu.');
}
