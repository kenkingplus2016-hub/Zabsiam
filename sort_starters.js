const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const startersCategory = data.find(c => c.id === 'starters');
const mainsCategory = data.find(c => c.id === 'mains');

if (!startersCategory) {
    console.log("Starters category not found!");
    process.exit(1);
}

// 1. Move Tom Yum Goong next to Tom Kha
// Find Tom Yum Goong
let tomYumItem = null;
[startersCategory, mainsCategory].forEach(cat => {
    if (!cat) return;
    const idx = cat.items.findIndex(i => i.th.includes('ต้มยำกุ้ง') && !i.th.includes('ข้าวผัด'));
    if (idx !== -1) {
        tomYumItem = cat.items.splice(idx, 1)[0];
    }
});

if (tomYumItem) {
    // Find Tom Kha in starters
    const tomKhaIndex = startersCategory.items.findIndex(i => i.th.includes('ต้มข่า'));
    if (tomKhaIndex !== -1) {
        startersCategory.items.splice(tomKhaIndex + 1, 0, tomYumItem);
        console.log("Moved ต้มยำกุ้ง next to ต้มข่า");
    } else {
        startersCategory.items.push(tomYumItem);
        console.log("Pushed ต้มยำกุ้ง to starters (ต้มข่า not found)");
    }
}

// 2. Add Chicken Satay
let chickenSatay = {
    id: `item_${Math.random().toString(36).substr(2, 9)}`,
    th: "ไก่สะเต๊ะ",
    en: "Chicken Satay",
    img: "logo.png",
    price: 14
};

// 3. Put Moo Ping and Chicken Satay next to Moo Satay
let mooPingItem = null;
[startersCategory, mainsCategory].forEach(cat => {
    if (!cat) return;
    const idx = cat.items.findIndex(i => i.th.includes('หมูปิ้งนมสด'));
    if (idx !== -1) {
        mooPingItem = cat.items.splice(idx, 1)[0];
    }
});

const mooSatayIndex = startersCategory.items.findIndex(i => i.th.includes('หมูสะเต๊ะ'));

if (mooSatayIndex !== -1) {
    let insertIndex = mooSatayIndex + 1;
    if (mooPingItem) {
        startersCategory.items.splice(insertIndex, 0, mooPingItem);
        insertIndex++;
        console.log("Moved หมูปิ้งนมสด next to หมูสะเต๊ะ");
    }
    startersCategory.items.splice(insertIndex, 0, chickenSatay);
    console.log("Added ไก่สะเต๊ะ next to หมูปิ้ง/หมูสะเต๊ะ");
} else {
    // If Moo Satay doesn't exist, just add them
    if (mooPingItem) startersCategory.items.push(mooPingItem);
    startersCategory.items.push(chickenSatay);
    console.log("หมูสะเต๊ะ not found, just added them to starters.");
}

fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
console.log("Updated buffet_menu.json");
