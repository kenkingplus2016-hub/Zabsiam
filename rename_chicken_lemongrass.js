const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/royal_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

let modified = false;

// Search for the item in all categories
data.forEach(category => {
    category.items.forEach(item => {
        if (item.id === 'c3' || item.name.th === 'มินิไก่ย่างตะไคร้') {
            item.name.th = 'มินิยำไก่ตะไคร้';
            item.name.en = 'Mini Chicken Lemongrass Salad';
            modified = true;
        }
    });
});

if (modified) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log("Renamed Mini Chicken Roasted Lemongrass to Mini Chicken Lemongrass Salad.");
} else {
    console.log("Menu item not found.");
}
