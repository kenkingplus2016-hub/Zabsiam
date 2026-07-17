const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const mappings = {
    'ไส้กรอกอีสาน': 'sausage.jpg',
    'ต้มข่าไก่': 'tom_kha_chicken.jpg',
    'ต้มข่ากุ้ง': 'tom_kha_prawn.jpg',
    'กุ้งห่มสไบ': 'prawn_roll.jpg',
    'ปอเปี๊ยะกุ้งทอด': 'prawn_roll.jpg'
};

let updated = 0;
data.forEach(category => {
    category.items.forEach(item => {
        // Match exact or contains
        for (const [thName, imgName] of Object.entries(mappings)) {
            if (item.th.includes(thName)) {
                item.img = imgName;
                console.log(`Updated image for ${item.th} -> ${imgName}`);
                updated++;
            }
        }
    });
});

if (updated > 0) {
    fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Successfully assigned images for ${updated} items.`);
} else {
    console.log("No matching items found.");
}
