const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('กุ้งแม่น้ำย่าง') || item.en.toLowerCase().includes('river prawn')) {
            item.price = 45;
            item.unit = '2 ตัว';
            console.log(`Updated price for ${item.th} (${item.en}) to £45 and unit to 2 ตัว`);
            updated++;
        }
    });
});

if (updated > 0) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find กุ้งแม่น้ำย่าง in the menu.');
}
