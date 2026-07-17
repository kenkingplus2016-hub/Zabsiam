const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

data.forEach(category => {
    let items = category.items;
    
    const index = items.findIndex(i => i.th === 'แกงพะแนงหมู / ไก่');
    
    if (index !== -1) {
        const combinedItem = items[index];
        
        // Create Pork item
        const porkItem = {
            id: 'item_' + Math.random().toString(36).substr(2, 9),
            th: 'แกงพะแนงหมู',
            en: 'Panang Curry with Pork',
            img: combinedItem.img,
            price: combinedItem.price,
            unit: combinedItem.unit || 'ถ้วย'
        };
        
        // Create Chicken item
        const chickenItem = {
            id: 'item_' + Math.random().toString(36).substr(2, 9),
            th: 'แกงพะแนงไก่',
            en: 'Panang Curry with Chicken',
            img: combinedItem.img,
            price: combinedItem.price,
            unit: combinedItem.unit || 'ถ้วย'
        };
        
        // Replace the combined item with the two new ones
        items.splice(index, 1, porkItem, chickenItem);
        
        console.log('Successfully separated แกงพะแนงหมู / ไก่ into two items.');
    }
});

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
