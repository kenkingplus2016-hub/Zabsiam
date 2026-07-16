const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const updates = {
    'lunch_box_gai_kluk_fun': 'Signature Box Spicy Dust Grilled Chicken.jpg',
    'lunch_box_yam_gai_zaap': 'Signature Box Spicy Chicken Salad.jpg'
};

let modified = false;

data.forEach(menu => {
    if (updates[menu.id]) {
        menu.img = updates[menu.id];
        modified = true;
        console.log(`Updated image for ${menu.id} to ${menu.img}`);
    }
});

if (modified) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log("Image links for chicken menus updated successfully.");
}
