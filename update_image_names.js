const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const updates = {
    'lunch_box_hor_mok_seafood': 'box_hor_mok_seafood.jpg',
    'lunch_box_crab_curry': 'box_crab_curry.jpg',
    'lunch_box_squid_salted_egg': 'box_squid_salted_egg.jpg'
};

let modified = false;

data.forEach(menu => {
    if (updates[menu.id]) {
        menu.img = updates[menu.id];
        modified = true;
    }
});

if (modified) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log("Updated image names for Hor Mok, Crab Curry, and Squid Salted Egg.");
}
