const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// I will add them to the 'vegetables' category.
const vegCategory = data.find(c => c.id === 'vegetables');

if (vegCategory) {
    const newItems = [
        {
            th: "แกงแดงผักรวมเต้าหู้",
            en: "Red Curry Mixed Vegetables Tofu",
        },
        {
            th: "แกงเขียวหวานผักรวมเต้าหู้",
            en: "Green Curry Mixed Vegetables Tofu",
        },
        {
            th: "แกงพะแนงผักรวมเต้าหู้",
            en: "Panang Curry Mixed Vegetables Tofu",
        },
        {
            th: "แกงเทโพผักรวมเต้าหู้",
            en: "Tae Po Curry Mixed Vegetables Tofu",
        }
    ];

    newItems.forEach(item => {
        vegCategory.items.push({
            id: `item_${Math.random().toString(36).substr(2, 9)}`,
            th: item.th,
            en: item.en,
            img: "logo.png",
            price: 12,
            unit: "ถ้วย"
        });
        console.log(`Added ${item.en}`);
    });

    fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
    console.log("Updated buffet_menu.json");
} else {
    console.log("vegetables category not found");
}
