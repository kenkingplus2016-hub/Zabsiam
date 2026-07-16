const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

// 1. Update Krapow Box Description
const krapowIndex = data.findIndex(m => m.id === 'lunch_box_krapow');
if (krapowIndex !== -1) {
    data[krapowIndex].desc.en = data[krapowIndex].desc.en.replace('Ready-to-eat Lunch Box', 'Ready-to-eat Signature Box');
    console.log("Updated Krapow Box desc.");
}

// 2. Update Image Filenames (from user's previous request)
const imgUpdates = {
    'lunch_box_hor_mok_seafood': 'Signature Box Seafood Hor Mok with Rice.jpg',
    'lunch_box_crab_curry': 'Signature Box Stir-fried Crab in Yellow Curry.jpg',
    'lunch_box_squid_salted_egg': 'Signature Box Stir-fried Squid with Salted Egg.jpg'
};

data.forEach(menu => {
    if (imgUpdates[menu.id]) {
        menu.img = imgUpdates[menu.id];
        console.log(`Updated image for ${menu.id} to ${menu.img}`);
    }
});

fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
console.log("Updates applied successfully.");
