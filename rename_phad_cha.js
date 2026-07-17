const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
let updated = false;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th === 'ผัดฉ่าทะเล' || item.th === 'ผัดฉ่า') {
            item.th = 'ผัดฉ่าปลากระพง';
            item.en = 'Stir-fried Sea Bass with Herbs and Spices (Phad Cha)';
            updated = true;
            console.log('Updated to ผัดฉ่าปลากระพง');
        } else if (item.th.includes('ผัดฉ่า')) {
            item.th = 'ผัดฉ่าปลากระพง';
            item.en = 'Stir-fried Sea Bass with Herbs and Spices (Phad Cha)';
            updated = true;
            console.log(`Updated ${item.th} to ผัดฉ่าปลากระพง`);
        }
    });
});

if (updated) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log('JSON updated successfully.');
} else {
    console.log('Could not find ผัดฉ่า in the JSON.');
}
