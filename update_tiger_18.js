const fs = require('fs');
const path = require('path');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('เสือร้องไห้') || item.en.toLowerCase().includes('crying tiger')) {
            item.price = 18;
            console.log(`Updated price for ${item.th} (${item.en}) to £18`);
            updated++;
        }
    });
});

if (updated > 0) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find เสือร้องไห้ in the menu.');
}
