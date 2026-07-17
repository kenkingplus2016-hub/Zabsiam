const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

data.forEach(category => {
    let items = category.items;
    
    const hasTarget = items.some(i => i.th === 'แกงพะแนงกุ้ง');
    const hasTaePo = items.some(i => i.th.includes('แกงเทโพ'));
    
    if (hasTarget && hasTaePo) {
        // Find all Tae Po curries
        const taePoCurries = items.filter(i => i.th.includes('แกงเทโพ'));
        
        // Remove them from current positions
        items = items.filter(i => !i.th.includes('แกงเทโพ'));
        
        // Find target index
        const targetIndex = items.findIndex(i => i.th === 'แกงพะแนงกุ้ง');
        
        // Insert right after target
        items.splice(targetIndex + 1, 0, ...taePoCurries);
        
        category.items = items;
        console.log('Successfully moved all แกงเทโพ after แกงพะแนงกุ้ง');
    }
});

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
