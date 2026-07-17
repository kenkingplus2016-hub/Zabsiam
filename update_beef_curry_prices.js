const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
let updatedCount = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('แกง') && item.th.includes('เนื้อ')) {
            if (item.price !== 16) {
                console.log(`Updating ${item.th} price from ${item.price} to 16`);
                item.price = 16;
                updatedCount++;
            }
        }
    });
});

if (updatedCount > 0) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Updated ${updatedCount} beef curries to 16 pounds.`);
} else {
    console.log('All beef curries are already 16 pounds.');
}
