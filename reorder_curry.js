const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

data.forEach(category => {
    const items = category.items;
    
    const currIndex = items.findIndex(i => i.th.includes('แกงกะหรี่ไก่'));
    const targetIndex = items.findIndex(i => i.th.includes('แกงมัสมันเนื้อ'));
    
    if (currIndex !== -1 && targetIndex !== -1) {
        // Remove แกงกะหรี่ไก่
        const [currItem] = items.splice(currIndex, 1);
        
        // Find new target index (it might have shifted)
        const newTargetIndex = items.findIndex(i => i.th.includes('แกงมัสมันเนื้อ'));
        
        // Insert แกงกะหรี่ไก่ after แกงมัสมันเนื้อ
        items.splice(newTargetIndex + 1, 0, currItem);
        
        console.log('Successfully moved แกงกะหรี่ไก่ next to แกงมัสมันเนื้อ');
    }
});

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
