const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('เมี่ยงคำปลาซีบาส') || item.en.toLowerCase().includes('miang kham sea bass')) {
            item.price = 16;
            item.unit = '6 ชิ้น';
            console.log(`Updated price for ${item.th} (${item.en}) to £16 and unit to 6 ชิ้น`);
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
