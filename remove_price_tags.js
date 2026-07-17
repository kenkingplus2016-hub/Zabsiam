const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

let updatedCount = 0;

data.forEach(category => {
    category.items.forEach(item => {
        const originalTh = item.th;
        const originalEn = item.en;

        // Remove (+£X) or (+£ X) pattern and trim
        item.th = item.th.replace(/\(\+\£\d+\)/g, '').trim();
        if (item.en) item.en = item.en.replace(/\(\+\£\d+\)/g, '').trim();

        if (originalTh !== item.th || originalEn !== item.en) {
            console.log(`Cleaned: ${originalTh} -> ${item.th}`);
            updatedCount++;
        }
    });
});

if (updatedCount > 0) {
    fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Updated ${updatedCount} items in buffet_menu.json`);
} else {
    console.log("No price tags found to remove.");
}
