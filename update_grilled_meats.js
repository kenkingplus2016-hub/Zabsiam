const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

const meats = [
    'คอหมูย่าง',
    'เสือร้องไห้'
];

data.forEach(category => {
    category.items.forEach(item => {
        // Need to be careful not to match "น้ำตกคอหมูย่าง" or "น้ำตกเสือร้องไห้" if they exist, 
        // unless the user means all of them. The user explicitly said "คอหมูย่าง เสือร้องไห้".
        // Let's use strict match or check if it's in the Grill category if needed.
        // Actually, matching the base string is fine, but I'll ensure I log what is updated.
        if (meats.some(name => item.th === name || item.th.startsWith(name))) {
            item.unit = '180g ชุด';
            console.log(`Updated unit for ${item.th} (${item.en}) to 180g ชุด`);
            updated++;
        }
    });
});

if (updated > 0) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find those grilled items in the menu.');
}
