const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

const piecesItems = [
    'ลาบไก่',
    'ลาบหมู',
    'ข้าวเกรียบปากหม้อ'
];

const skewerItems = [
    'หมูสะเต๊ะ',
    'หมูปิ้งนมสด',
    'ไก่สะเต๊ะ'
];

data.forEach(category => {
    category.items.forEach(item => {
        // Group 1: 14 / 6 ชิ้น
        if (piecesItems.some(name => item.th.includes(name))) {
            item.price = 14;
            item.unit = '6 ชิ้น';
            console.log(`Updated price for ${item.th} (${item.en}) to £14 and unit to 6 ชิ้น`);
            updated++;
        }
        
        // Group 2: 14 / 6 ไม้
        if (skewerItems.some(name => item.th.includes(name) || (name === 'หมูปิ้งนมสด' && item.en.toLowerCase().includes('pork skewer')))) {
            item.price = 14;
            item.unit = '6 ไม้';
            console.log(`Updated price for ${item.th} (${item.en}) to £14 and unit to 6 ไม้`);
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
