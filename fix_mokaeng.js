const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ขนมหม้อแกง')) {
            delete item.unit; // Revert to default 'จาน'
            console.log(`Reverted unit for ${item.th}`);
        }
    });
});

fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
