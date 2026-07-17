const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const dessertsCategory = data.find(c => c.id === 'desserts');

const bowlItems = [
    "ลอดช่องสิงคโปร์",
    "ทับทิมกรอบ",
    "บวชชีกล้วย",
    "ขนมครองแครงอัญชันมะพร้าวอ่อน",
    "บัวลอยสาคู",
    "บัวลอย 5 สี",
    "ลอดช่องอัญชันใบเตย"
];

// If Lod Chong Singapore is missing, add it
if (dessertsCategory) {
    let foundLodChong = false;
    dessertsCategory.items.forEach(i => {
        if (i.th.includes('ลอดช่องสิงคโปร์')) foundLodChong = true;
    });
    
    if (!foundLodChong) {
        dessertsCategory.items.push({
            id: `item_${Math.random().toString(36).substr(2, 9)}`,
            th: "ลอดช่องสิงคโปร์",
            en: "Lod Chong Singapore",
            img: "logo.png",
            price: 12,
            unit: "ถ้วย"
        });
        console.log("Added ลอดช่องสิงคโปร์");
    }
}

let updatedCount = 0;
data.forEach(category => {
    category.items.forEach(item => {
        if (bowlItems.some(bi => item.th.includes(bi))) {
            item.unit = "ถ้วย";
            console.log(`Set unit to ถ้วย for: ${item.th}`);
            updatedCount++;
        }
    });
});

if (updatedCount > 0) {
    fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
    console.log("Updated buffet_menu.json with custom units");
}
