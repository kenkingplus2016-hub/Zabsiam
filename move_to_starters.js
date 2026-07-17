const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const startersCategory = data.find(c => c.id === 'starters');
const mainsCategory = data.find(c => c.id === 'mains');
const dessertsCategory = data.find(c => c.id === 'desserts');

const targetItems = [
    { th: "หมูปิ้งนมสด", en: "Pork Skewer", price: 14 },
    { th: "ม้าฮ่อ", en: "Ma Hor", price: 12 },
    { th: "แซลมอนลุยสวนเกี๊ยวกรอบ", en: "Salmon Lui Suan Wonton", price: 15 },
    { th: "ปอเปี๊ยะกุ้งทอด", en: "Crispy Prawn Spring Rolls", price: 15 },
    { th: "ปอเปี๊ยะสดเห็ดเข็มทอง", en: "Fresh Spring Rolls with Enoki Mushroom", price: 12 },
    { th: "ต้มข่าไก่", en: "Tom Kha Gai", price: 14 },
    { th: "ต้มข่ากุ้ง", en: "Tom Kha Goong", price: 15 }
];

targetItems.forEach(target => {
    let foundItem = null;
    let foundCategory = null;

    // Search in all categories
    [startersCategory, mainsCategory, dessertsCategory].forEach(category => {
        if (!category) return;
        const index = category.items.findIndex(i => i.th.includes(target.th));
        if (index !== -1) {
            foundItem = category.items[index];
            foundCategory = category;
            // Remove it from current category
            category.items.splice(index, 1);
        }
    });

    if (foundItem) {
        // Move to starters
        startersCategory.items.push(foundItem);
        console.log(`Moved ${foundItem.th} to starters.`);
    } else {
        // Create new item and add to starters
        const newItem = {
            id: `item_${Math.random().toString(36).substr(2, 9)}`,
            th: target.th,
            en: target.en,
            img: "logo.png",
            price: target.price
        };
        startersCategory.items.push(newItem);
        console.log(`Created new item ${target.th} in starters.`);
    }
});

fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
console.log("Updated buffet_menu.json with starters");
