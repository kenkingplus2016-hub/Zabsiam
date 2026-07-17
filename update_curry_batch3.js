const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const mappings = {
    'แกงมัสมันเนื้อ': 'massaman_beef.jpg',
    'แกงมัสมันไก่': 'massaman_chicken.jpg',
    'แกงเขียวหวานกุ้ง': 'green_curry_prawns.jpg',
    'แกงเขียวหวานไก่ / หมู': 'green_curry_chicken_pork.jpg',
    'แกงเขียวหวานเนื้อ': 'green_curry_beef.jpg'
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
