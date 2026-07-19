const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ไอศกรีมกะทิข้าวเหนียว') || item.en.toLowerCase().includes('coconut ice cream')) {
            item.price = 70;
            item.unit = '10 ถ้วย';
            console.log(`Updated price for ${item.th} (${item.en}) to £70 and unit to 10 ถ้วย`);
            updated++;
        } else if (item.th.includes('ไอศกรีมมะม่วงข้าวเหนียวมูน') || item.en.toLowerCase().includes('mango ice cream')) {
            item.price = 80;
            item.unit = '10 ถ้วย';
            console.log(`Updated price for ${item.th} (${item.en}) to £80 and unit to 10 ถ้วย`);
            updated++;
        }
    });
});

if (updated > 0) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find the ice cream items in the menu.');
}
