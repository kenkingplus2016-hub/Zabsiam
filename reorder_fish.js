const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

data.forEach(category => {
    let items = category.items;
    
    // Check if both exist in this category
    const hasTarget = items.some(i => i.th === 'ปลากะพงทอดสามรส');
    const hasItemToMove = items.some(i => i.th === 'ปลาซีบาสลุยสวน');
    
    if (hasTarget && hasItemToMove) {
        // Find and remove the item to move
        const currIndex = items.findIndex(i => i.th === 'ปลาซีบาสลุยสวน');
        const [currItem] = items.splice(currIndex, 1);
        
        // Find the new target index
        const targetIndex = items.findIndex(i => i.th === 'ปลากะพงทอดสามรส');
        
        // Insert after target
        items.splice(targetIndex + 1, 0, currItem);
        
        console.log('Successfully moved ปลาซีบาสลุยสวน after ปลากะพงทอดสามรส');
    }
});

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
