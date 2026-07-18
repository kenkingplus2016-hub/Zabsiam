const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let removedCount = 0;

data.forEach(category => {
    const originalLength = category.items.length;
    category.items = category.items.filter(item => !(item.th === 'ยำส้มโอ' && item.en === 'Pomelo Salad'));
    removedCount += originalLength - category.items.length;
});

if (removedCount > 0) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Removed ${removedCount} item(s) successfully.`);
} else {
    console.log('Could not find ยำส้มโอ (Pomelo Salad) to remove.');
}
