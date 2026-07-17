const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const mainsCategory = data.find(c => c.id === 'mains');
const dessertsCategory = data.find(c => c.id === 'desserts');

const targetItems = ["ข้าวเหนียวมะม่วงน้ำดอกไม้", "บวชชีกล้วย"];

targetItems.forEach(target => {
    const index = mainsCategory.items.findIndex(i => i.th.includes(target));
    if (index !== -1) {
        const item = mainsCategory.items.splice(index, 1)[0];
        // Ensure price is 12 for desserts
        item.price = 12;
        dessertsCategory.items.push(item);
        console.log(`Moved ${item.th} to desserts.`);
    }
});

fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
console.log("File saved.");
