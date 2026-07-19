const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('แกงเขียวหวานผักรวมเต้าหู้') || 
            item.th.includes('แกงแดงผักรวมเต้าหู้') || 
            item.th.includes('แกงพะแนงผักรวมเต้าหู้') || 
            item.th.includes('แกงเทโพผักรวมเต้าหู้')) {
            item.price = 14;
            item.unit = '750 กรัม 6 ถ้วย';
            console.log(`Fixed ${item.th} back to £14 and unit to 750 กรัม 6 ถ้วย`);
            updated++;
        }
    });
});

if (updated > 0) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Successfully fixed ${updated} items.`);
} else {
    console.log('No items needed fixing.');
}
