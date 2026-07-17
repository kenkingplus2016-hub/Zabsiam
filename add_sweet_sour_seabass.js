const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
let updated = false;

data.forEach(category => {
    let items = category.items;
    const index = items.findIndex(i => i.th === 'ผัดเปรี้ยวหวานไก่' || i.en === 'Sweet and Sour Chicken');
    
    if (index !== -1) {
        // Add new item
        const newItem = {
            id: 'item_' + Math.random().toString(36).substr(2, 9),
            th: 'ผัดเปรี้ยวหวานปลากระพง',
            en: 'Sweet and Sour Sea Bass',
            img: 'logo.png', // Default image until uploaded
            price: 15
        };
        
        items.splice(index + 1, 0, newItem);
        updated = true;
        console.log('Successfully added Sweet and Sour Sea Bass.');
    }
});

if (updated) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log('JSON updated successfully.');
} else {
    console.log('Could not find Sweet and Sour Chicken in the JSON.');
}
