const fs = require('fs');
const path = require('path');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('คอหมูย่าง') || item.th.includes('เสือร้องไห้') || item.en.toLowerCase().includes('grilled pork neck') || item.en.toLowerCase().includes('crying tiger')) {
            item.price = 16;
            console.log(`Updated price for ${item.th} (${item.en}) to £16`);
            updated++;
        }
    });
});

if (updated > 0) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find คอหมูย่าง or เสือร้องไห้ in the menu.');
}
