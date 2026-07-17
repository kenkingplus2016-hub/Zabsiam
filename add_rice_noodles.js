const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const riceCategory = data.find(c => c.id === 'rice');

if (!riceCategory) {
    console.log("Rice category not found!");
    process.exit(1);
}

const targets = [
    { th: "ข้าวหอมมะลิ", en: "Steamed Jasmine Rice", price: 12 },
    { th: "ผัดไทยกุ้ง", en: "Pad Thai with Prawns", price: 15 },
    { th: "ผัดไทยผักรวม", en: "Pad Thai with Mixed Vegetables", price: 12 }
];

targets.forEach(target => {
    // Check if exists
    let found = false;
    data.forEach(cat => {
        const idx = cat.items.findIndex(i => i.th === target.th);
        if (idx !== -1) {
            found = true;
            if (cat.id !== 'rice') {
                const item = cat.items.splice(idx, 1)[0];
                riceCategory.items.push(item);
                console.log(`Moved ${item.th} to Rice & Noodles.`);
            } else {
                console.log(`${target.th} already in Rice & Noodles.`);
            }
        }
    });

    if (!found) {
        riceCategory.items.push({
            id: `item_${Math.random().toString(36).substr(2, 9)}`,
            th: target.th,
            en: target.en,
            img: "logo.png",
            price: target.price
        });
        console.log(`Added new item ${target.th} to Rice & Noodles.`);
    }
});

fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
console.log("Updated buffet_menu.json");
