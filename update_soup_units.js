const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

let updatedCount = 0;
data.forEach(category => {
    category.items.forEach(item => {
        // Match soups but exclude fried rice
        if ((item.th.includes('ต้มยำ') || item.th.includes('ต้มข่า')) && !item.th.includes('ข้าวผัด')) {
            item.unit = "ถ้วย";
            console.log(`Set unit to ถ้วย for: ${item.th}`);
            updatedCount++;
        }
    });
});

if (updatedCount > 0) {
    fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
    console.log("Updated buffet_menu.json with soup units");
}
