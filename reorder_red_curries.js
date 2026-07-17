const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

data.forEach(category => {
    let items = category.items;
    
    // Check if both exist in this category
    const hasGreenCurryBeef = items.some(i => i.th === 'แกงเขียวหวานเนื้อ');
    const hasRedCurry = items.some(i => i.th.includes('แกงแดง'));
    
    if (hasGreenCurryBeef && hasRedCurry) {
        // Find all red curries
        const redCurries = items.filter(i => i.th.includes('แกงแดง'));
        
        // Remove all red curries from their current positions
        items = items.filter(i => !i.th.includes('แกงแดง'));
        
        // Find the index of แกงเขียวหวานเนื้อ in the new array
        const targetIndex = items.findIndex(i => i.th === 'แกงเขียวหวานเนื้อ');
        
        // Insert red curries right after แกงเขียวหวานเนื้อ
        items.splice(targetIndex + 1, 0, ...redCurries);
        
        // Put the modified items back into category
        category.items = items;
        
        console.log('Successfully moved all แกงแดง after แกงเขียวหวานเนื้อ');
    }
});

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
