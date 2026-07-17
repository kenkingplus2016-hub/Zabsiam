const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
let updated = false;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.en.includes('Sweet and Sour Stir-fry') || item.th.includes('ผัดเปรี้ยวหวาน')) {
            item.th = 'ผัดเปรี้ยวหวานไก่';
            item.en = 'Sweet and Sour Chicken';
            updated = true;
            console.log(`Updated to ผัดเปรี้ยวหวานไก่ (Sweet and Sour Chicken)`);
        }
    });
});

if (updated) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log('JSON updated successfully.');
} else {
    console.log('Could not find Sweet and Sour Stir-fry in the JSON.');
}
