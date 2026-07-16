const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/royal_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

let modified = false;
data.forEach(category => {
    category.items.forEach(item => {
        if (item.id === 'r2' || item.name.en === 'Pomelo Salad with Prawns') {
            item.name.en = 'Pomelo prawns Salad Kratong Tong';
            item.img = 'Pomelo prawns Salad Kratong Tong.jpeg';
            modified = true;
        }
    });
});

if (modified) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log("Updated name and image for Pomelo prawns Salad Kratong Tong.");
} else {
    console.log("Menu item not found.");
}
