const fs = require('fs');

const file = 'data/royal_menu.json';
let data = JSON.parse(fs.readFileSync(file, 'utf8'));

let added = false;
data.forEach(category => {
    // Check if this category contains r24 (Pandan Coconut Jelly)
    const hasJelly = category.items.some(i => i.id === 'r24');
    if (hasJelly) {
        // Add Khanom Mo Kaeng
        // Let's generate a unique id like r27
        const newId = "r" + (Math.max(...category.items.map(i => parseInt(i.id.replace('r','')) || 0)) + 1);
        
        const moKaeng = {
            "id": newId,
            "name": {
                "th": "ขนมหม้อแกง",
                "en": "Khanom Mo Kaeng"
            },
            "price": 12,
            "unit": "12 ชิ้น / 12 Pcs",
            "desc": {
                "th": "ขนมหม้อแกงสูตรโบราณ อบจนหน้าเหลืองหอม หวานมันกำลังดี โรยหน้าด้วยอัลมอนด์สไลด์บางๆ และอบเชย",
                "en": "Traditional baked Thai custard with coconut milk and palm sugar, beautifully garnished with sliced almonds and cinnamon."
            },
            "img": "Khanom Mo Kaeng.jpg",
            "main_ingredients": {
                "th": [
                    "เผือก/ถั่วทองนึ่งสุก",
                    "ไข่เป็ดและไข่ไก่",
                    "หัวกะทิคั้นสด",
                    "น้ำตาลมะพร้าวแท้",
                    "อัลมอนด์สไลด์",
                    "อบเชย (ตกแต่ง)"
                ],
                "en": [
                    "Steamed Taro / Mung Bean",
                    "Duck & Chicken Eggs",
                    "Fresh Coconut Cream",
                    "Palm Sugar",
                    "Sliced Almonds",
                    "Cinnamon stick (Garnish)"
                ]
            }
        };
        
        category.items.push(moKaeng);
        added = true;
        console.log(`Added Khanom Mo Kaeng with ID ${newId}`);
    }
});

if (added) {
    fs.writeFileSync(file, JSON.stringify(data, null, 4), 'utf8');
}
