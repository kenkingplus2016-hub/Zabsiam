const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const mainsCategory = data.find(c => c.id === 'mains');

const newItems = [
    { th: "แกงกะหรี่ไก่", en: "Yellow Chicken Curry", price: 14 },
    { th: "ไก่ย่าง", en: "Thai Grilled Chicken", price: 14 },
    { th: "ไก่ทอดหาดใหญ่", en: "Hat Yai Fried Chicken", price: 14 },
    { th: "เสือร้องไห้ย่าง", en: "Crying Tiger Grilled Beef", price: 14 },
    { th: "ยำวุ้นเส้นหมูยอ", en: "Glass Noodle Salad with Vietnamese Pork Sausage", price: 14 }
];

let addedCount = 0;

newItems.forEach(target => {
    // Check if it exists anywhere
    let exists = false;
    data.forEach(cat => {
        if (cat.items.some(i => i.th.includes(target.th) || i.th.includes(target.th.replace('ไก่', '')) && i.th.includes('หาดใหญ่'))) {
            exists = true;
        }
    });

    if (!exists) {
        mainsCategory.items.push({
            id: `item_${Math.random().toString(36).substr(2, 9)}`,
            th: target.th,
            en: target.en,
            img: "logo.png",
            price: target.price
        });
        console.log(`Added new main course: ${target.th}`);
        addedCount++;
    } else {
        console.log(`${target.th} already exists.`);
    }
});

if (addedCount > 0) {
    fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
    console.log("Updated buffet_menu.json");
}
