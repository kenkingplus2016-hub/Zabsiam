const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/royal_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

let modified = false;
data.forEach(category => {
    category.items.forEach(item => {
        if (item.id === 'r4' || item.name.en === 'Salmon with Herbs salad Crispy Wontons') {
            item.name.en = 'Salmon Lui Suan Kratong Tong';
            item.img = 'Salmon Lui Suan Kratong Tong.jpeg';
            modified = true;
        }
    });
});

if (modified) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log("Updated name and image for Salmon Lui Suan Kratong Tong.");
} else {
    console.log("Menu item not found.");
}
