const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
let updated = false;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th === 'ยำวุ้นเส้นกุ้ง') {
            item.img = 'logo.png'; // Revert to logo
            console.log('Reverted ยำวุ้นเส้นกุ้ง to logo.png');
            updated = true;
        }
    });
});

if (updated) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log('JSON updated successfully.');
} else {
    console.log('No changes needed.');
}
