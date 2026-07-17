const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const dessertsCategory = data.find(c => c.id === 'desserts');

const newItems = [
    { th: "ข้าวเหนียวมะม่วงน้ำดอกไม้", en: "Mango Sticky Rice (Nam Dok Mai Mango)", price: 12 },
    { th: "กล้วยบวชชี", en: "Banana in Coconut Milk", price: 12 }
];

let addedCount = 0;

newItems.forEach(target => {
    // Check if it exists anywhere
    let exists = false;
    data.forEach(cat => {
        if (cat.items.some(i => i.th.includes(target.th) || i.th.includes(target.th.replace('กล้วยบวชชี', 'บวชชีกล้วย')))) {
            exists = true;
        }
    });

    if (!exists) {
        dessertsCategory.items.push({
            id: `item_${Math.random().toString(36).substr(2, 9)}`,
            th: target.th,
            en: target.en,
            img: "logo.png",
            price: target.price
        });
        console.log(`Added new dessert: ${target.th}`);
        addedCount++;
    } else {
        console.log(`${target.th} already exists.`);
    }
});

if (addedCount > 0) {
    fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
    console.log("Updated buffet_menu.json");
}
