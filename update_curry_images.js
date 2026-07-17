const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const mappings = {
    'แกงแดงผักรวมเต้าหู้': 'red_curry_veg.jpg',
    'แกงพะแนงผักรวมเต้าหู้': 'panang_curry_veg.jpg',
    'แกงเขียวหวานผักรวมเต้าหู้': 'green_curry_veg.jpg',
    'แกงพะแนงกุ้ง': 'panang_prawns.jpg',
    'แกงพะแนงเนื้อ': 'panang_beef.jpg'
};

let updated = 0;
data.forEach(category => {
    category.items.forEach(item => {
        if (mappings[item.th]) {
            item.img = mappings[item.th];
            console.log(`Updated image for ${item.th} -> ${mappings[item.th]}`);
            updated++;
        }
    });
});

if (updated > 0) {
    fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Successfully assigned images for ${updated} items.`);
} else {
    console.log("No matching items found.");
}
