const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/royal_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

let modified = false;
data.forEach(category => {
    category.items.forEach(item => {
        if (item.name.en === 'Larb Chicken Kratong Crispy Wonton') {
            item.name.en = 'Larb Chicken KrathongTong';
            item.img = 'Larb Chicken KrathongTong.jpeg';
            modified = true;
        }
    });
});

if (modified) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log("Updated name and image for Larb Chicken KrathongTong.");
} else {
    console.log("Menu item not found.");
}
