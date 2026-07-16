const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/menu.json', 'utf8'));

const masterChoices = [
    { th: "ส้มตำไทย", en: "Som Tum Thai" },
    { th: "ยำส้มโอ", en: "Pomelo Salad" },
    { th: "ยำส้มโอกุ้งสด (+£3)", en: "Pomelo Salad with Shrimp (+£3)", extra: 3 },
    { th: "เมี่ยงคำปลาซีบาส", en: "Miang Kham Sea Bass" },
    { th: "เมี่ยงคำส้มโอกุ้ง (+£3)", en: "Pomelo Miang Kham with Shrimp (+£3)", extra: 3 },
    { th: "ข้าวเกรียบปากหม้อ", en: "Rice Skin Dumplings" },
    { th: "หมูปิ้งนมสด", en: "Pork Skewer with Milk" },
    { th: "หมูสะเต๊ะ", en: "Pork Satay" },
    { th: "ม้าฮ่อ", en: "Ma Hor" },
    { th: "แซลมอนลุยสวนเกี๊ยวกรอบ (+£2)", en: "Salmon Lui Suan Wonton (+£2)", extra: 2 },
    { th: "แกงเขียวหวานไก่ / หมู", en: "Green Curry Chicken / Pork" },
    { th: "แกงเขียวหวานเนื้อ (+£2)", en: "Green Curry Beef (+£2)", extra: 2 },
    { th: "แกงมัสมันไก่", en: "Massaman Chicken" },
    { th: "แกงมัสมันเนื้อ (+£2)", en: "Massaman Beef (+£2)", extra: 2 },
    { th: "แกงแดงไก่", en: "Red Curry with Chicken" },
    { th: "แกงพะแนงหมู / ไก่", en: "Panang Curry with Pork / Chicken" },
    { th: "แกงพะแนงเนื้อ (+£2)", en: "Panang Curry with Beef (+£2)", extra: 2 },
    { th: "แกงหมูเทโพ", en: "Tae Po Pork Curry" },
    { th: "ลาบไก่ / หมู", en: "Larb Gai / Pork" },
    { th: "พล่าปลาแซลมอน (+£2)", en: "Salmon 'Pla' Salad (+£2)", extra: 2 },
    { th: "ยำวุ้นเส้นกุ้ง (+£3)", en: "Glass Noodle Salad with Shrimp (+£3)", extra: 3 },
    { th: "ยำแซ่บปลาหมึกยัดไส้", en: "Spicy Stuffed Squid" },
    { th: "ผัดผักรวมน้ำมันหอย", en: "Stir-fried Mixed Veg" },
    { th: "ผัดเนื้อผักรวมน้ำมันหอย (+£2)", en: "Stir-fried Beef with Veg (+£2)", extra: 2 },
    { th: "ผัดผักรวมกุ้งน้ำมันหอย (+£3)", en: "Stir-fried Veg with Shrimp (+£3)", extra: 3 },
    { th: "ปลาซีบาสลุยสวน", en: "Sea Bass Fish Larb" },
    { th: "ปูผัดผงกะหรี่ (+£3)", en: "Crab Curry (+£3)", extra: 3 },
    { th: "คอหมูย่าง", en: "Grilled Pork Neck" },
    { th: "ข้าวหอมมะลิ", en: "Jasmine Rice" },
    { th: "ข้าวเหนียวมะม่วงน้ำดอกไม้", en: "Mango Sticky Rice (Nam Dok Mai)" },
    { th: "ผลไม้รวม", en: "Mixed Fruits" },
    { th: "ลอดช่องสิงคโปร์", en: "Lod Chong Singapore" },
    { th: "ทับทิมกรอบ", en: "Tub Tim Krop" },
    { th: "บวชชีกล้วย", en: "Banana in Coconut Milk" }
];

data.forEach(set => {
    const numDishes = set.items.filter(i => i.type.en !== 'Highlight').length;
    set.options = [];
    for(let i=1; i<=numDishes; i++) {
        set.options.push({
            id: `dish_${i}`,
            label: { th: `เลือกเมนูที่ ${i}`, en: `Select Dish ${i}` },
            choices: masterChoices
        });
    }
});

fs.writeFileSync('data/menu.json', JSON.stringify(data, null, 4), 'utf8');
console.log("Updated menu.json with dropdowns successfully.");
