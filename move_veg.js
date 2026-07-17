const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const mainsCategory = data.find(c => c.id === 'mains');
let vegCategory = data.find(c => c.id === 'vegetables');

if (!vegCategory) {
    vegCategory = {
        id: "vegetables",
        title: { th: "เมนูผัก (Vegetable Dishes)", en: "Vegetable Dishes" },
        items: []
    };
    // Insert it before desserts
    const dessertsIndex = data.findIndex(c => c.id === 'desserts');
    data.splice(dessertsIndex !== -1 ? dessertsIndex : data.length, 0, vegCategory);
}

// Keywords to identify vegetable dishes
const vegKeywords = ["ผัดผัก", "หน่อไม้ฝรั่ง", "บ็อกฉ่อย", "ผักรวม"];

// Move from mains
if (mainsCategory) {
    let i = mainsCategory.items.length;
    while (i--) {
        const item = mainsCategory.items[i];
        if (vegKeywords.some(kw => item.th.includes(kw))) {
            const removed = mainsCategory.items.splice(i, 1)[0];
            vegCategory.items.unshift(removed); // keep original order mostly
            console.log(`Moved ${item.th} to vegetable dishes.`);
        }
    }
}

// Move from starters (just in case)
const startersCategory = data.find(c => c.id === 'starters');
if (startersCategory) {
    let i = startersCategory.items.length;
    while (i--) {
        const item = startersCategory.items[i];
        if (vegKeywords.some(kw => item.th.includes(kw))) {
            const removed = startersCategory.items.splice(i, 1)[0];
            vegCategory.items.unshift(removed);
            console.log(`Moved ${item.th} to vegetable dishes.`);
        }
    }
}

fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
console.log("Updated buffet_menu.json with vegetable dishes category.");
