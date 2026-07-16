const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/royal_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

let modified = false;
data.forEach(category => {
    category.items.forEach(item => {
        if (item.id === 'r1' || item.name.en === 'Sea Bass Miang Kham Kratong Tong') {
            item.img = 'Mini Sea Bass Miang Kham Kratong Tong.jpeg';
            modified = true;
        }
    });
});

if (modified) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log("Updated image for Sea Bass Miang Kham Kratong Tong.");
} else {
    console.log("Menu item not found.");
}
