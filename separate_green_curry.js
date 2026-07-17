const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

data.forEach(category => {
    let items = category.items;
    
    const index = items.findIndex(i => i.th === 'แกงเขียวหวานไก่ / หมู');
    
    if (index !== -1) {
        const combinedItem = items[index];
        
        // Create Chicken item
        const chickenItem = {
            id: 'item_' + Math.random().toString(36).substr(2, 9),
            th: 'แกงเขียวหวานไก่',
            en: 'Green Curry Chicken',
            img: combinedItem.img,
            price: combinedItem.price,
            unit: combinedItem.unit || 'ถ้วย'
        };
        
        // Create Pork item
        const porkItem = {
            id: 'item_' + Math.random().toString(36).substr(2, 9),
            th: 'แกงเขียวหวานหมู',
            en: 'Green Curry Pork',
            img: combinedItem.img,
            price: combinedItem.price,
            unit: combinedItem.unit || 'ถ้วย'
        };
        
        // Replace the combined item with the two new ones
        items.splice(index, 1, chickenItem, porkItem);
        
        console.log('Successfully separated แกงเขียวหวานไก่ / หมู into two items.');
    }
});

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
