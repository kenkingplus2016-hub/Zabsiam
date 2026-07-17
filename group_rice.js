const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Find or create rice category
let riceCategory = data.find(c => c.id === 'rice');
if (!riceCategory) {
    riceCategory = {
        id: "rice",
        title: { th: "เมนูข้าว และ ผัดเส้น (Rice & Noodles)", en: "Rice & Noodles" },
        items: []
    };
    // Insert after mains and veg
    let insertIndex = data.findIndex(c => c.id === 'vegetables');
    if (insertIndex === -1) insertIndex = data.findIndex(c => c.id === 'desserts');
    if (insertIndex === -1) insertIndex = data.length;
    data.splice(insertIndex, 0, riceCategory);
}

// Find all items with "ข้าวผัด" or "ผัดไทย"
const keywords = ["ข้าวผัด", "ผัดไทย", "เส้น"];

data.forEach(category => {
    if (category.id === 'rice') return;

    let i = category.items.length;
    while (i--) {
        const item = category.items[i];
        if (keywords.some(kw => item.th.includes(kw))) {
            const removed = category.items.splice(i, 1)[0];
            riceCategory.items.unshift(removed);
            console.log(`Moved ${item.th} to Rice & Noodles category.`);
        }
    }
});

fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
console.log("Updated buffet_menu.json with Rice category.");
