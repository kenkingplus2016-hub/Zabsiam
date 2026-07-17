const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

let updated = 0;
data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('แกงเทโพผักรวมเต้าหู้')) {
            item.img = 'taepo_veg.jpg';
            console.log(`Updated image for ${item.th}`);
            updated++;
        }
    });
});

if (updated > 0) {
    fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
} else {
    console.log("Not found");
}
