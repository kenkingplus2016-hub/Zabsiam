const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const mainsCategory = data.find(c => c.id === 'mains');

if (mainsCategory) {
    // Check and remove old แกงหมูเทโพ if exists
    const oldIndex = mainsCategory.items.findIndex(i => i.th === 'แกงหมูเทโพ' || i.th === 'แกงเทโพหมู');
    if (oldIndex !== -1) {
        mainsCategory.items.splice(oldIndex, 1);
        console.log("Removed old แกงหมูเทโพ");
    }

    const newItems = [
        { th: "แกงเทโพเนื้อ", en: "Tae Po Curry Beef", price: 14, unit: "ถ้วย" },
        { th: "แกงเทโพไก่", en: "Tae Po Curry Chicken", price: 14, unit: "ถ้วย" },
        { th: "แกงเทโพกุ้ง", en: "Tae Po Curry Prawn", price: 15, unit: "ถ้วย" },
        { th: "แกงเทโพหมู", en: "Tae Po Curry Pork", price: 14, unit: "ถ้วย" },
        { th: "แกงเทโพหมูสามชั้น", en: "Tae Po Curry Pork Belly", price: 14, unit: "ถ้วย" }
    ];

    // Find a good place to insert (after another curry)
    let insertIndex = mainsCategory.items.length;
    for (let i = mainsCategory.items.length - 1; i >= 0; i--) {
        if (mainsCategory.items[i].th.includes('แกง')) {
            insertIndex = i + 1;
            break;
        }
    }

    const itemsToInsert = newItems.map(item => ({
        id: `item_${Math.random().toString(36).substr(2, 9)}`,
        th: item.th,
        en: item.en,
        img: "logo.png",
        price: item.price,
        unit: item.unit
    }));

    mainsCategory.items.splice(insertIndex, 0, ...itemsToInsert);

    fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
    console.log("Added 5 Tae Po curries");
}
