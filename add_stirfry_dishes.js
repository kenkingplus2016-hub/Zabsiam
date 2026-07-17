const fs = require('fs');

const menuPath = 'data/menu.json';
const data = JSON.parse(fs.readFileSync(menuPath, 'utf8'));

// Prepare new choices to add
const newChoices = [
    { th: "ผัดผักบ็อกฉ่อยน้ำมันหอย", en: "Stir-fried Bok Choy in Oyster Sauce" },
    { th: "หน่อไม้ฝรั่งผัดน้ำมันหอย", en: "Stir-fried Asparagus in Oyster Sauce" },
    { th: "ปลาหมึกผัดพริกเผา", en: "Stir-fried Squid with Chili Paste" },
    { th: "ผัดฉ่า", en: "Pad Cha (Spicy Stir-fried with Herbs)" },
    { th: "ผัดเผ็ด", en: "Pad Phed (Spicy Stir-fried Red Curry)" },
    { th: "ผัดเปรี้ยวหวาน", en: "Sweet and Sour Stir-fry" },
    { th: "ไก่ผัดขิง", en: "Stir-fried Chicken with Ginger" }
];

let existingChoices = data[0].options[0].choices || [];
newChoices.forEach(nc => {
    // Avoid exact duplicates
    if (!existingChoices.find(c => c.th === nc.th || c.th === nc.th.replace('บ็อก', ''))) {
        existingChoices.push(nc);
    }
});

// Update choices for all sets
data.forEach(set => {
    if (set.options) {
        set.options.forEach(opt => {
            opt.choices = existingChoices;
        });
    }
});

fs.writeFileSync(menuPath, JSON.stringify(data, null, 4), 'utf8');
console.log("Added new dishes to menu options successfully.");
