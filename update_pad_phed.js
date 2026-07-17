const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
let updated = false;

data.forEach(category => {
    let items = category.items;
    const index = items.findIndex(i => i.th === 'ผัดเผ็ด' || i.en.includes('Pad Phed'));
    
    if (index !== -1) {
        // Change the existing one to Sea Bass
        const existingItem = items[index];
        existingItem.th = 'ผัดเผ็ดปลากระพง';
        existingItem.en = 'Pad Phed Sea Bass (Spicy Stir-fried Red Curry)';
        existingItem.price = 15;
        
        // Add the new ones
        const newItems = [
            {
                id: 'item_' + Math.random().toString(36).substr(2, 9),
                th: 'ผัดเผ็ดกุ้ง',
                en: 'Pad Phed Prawns (Spicy Stir-fried Red Curry)',
                img: 'logo.png',
                price: 15
            },
            {
                id: 'item_' + Math.random().toString(36).substr(2, 9),
                th: 'ผัดเผ็ดหมู',
                en: 'Pad Phed Pork (Spicy Stir-fried Red Curry)',
                img: 'logo.png',
                price: 14
            },
            {
                id: 'item_' + Math.random().toString(36).substr(2, 9),
                th: 'ผัดเผ็ดไก่',
                en: 'Pad Phed Chicken (Spicy Stir-fried Red Curry)',
                img: 'logo.png',
                price: 14
            },
            {
                id: 'item_' + Math.random().toString(36).substr(2, 9),
                th: 'ผัดเผ็ดเนื้อ',
                en: 'Pad Phed Beef (Spicy Stir-fried Red Curry)',
                img: 'logo.png',
                price: 15
            }
        ];
        
        items.splice(index + 1, 0, ...newItems);
        updated = true;
        console.log('Successfully updated Pad Phed and added variants.');
    }
});

if (updated) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log('JSON updated successfully.');
} else {
    console.log('Could not find ผัดเผ็ด in the JSON.');
}
