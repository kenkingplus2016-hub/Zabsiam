const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const mainsCategory = data.find(c => c.id === 'mains');

if (mainsCategory) {
    const mappings = {
        'แกงเทโพเนื้อ': 'taepo_beef.jpg',
        'แกงเทโพไก่': 'taepo_chicken.jpg',
        'แกงเทโพกุ้ง': 'taepo_prawn.jpg',
        'แกงเทโพหมู': 'taepo_pork.jpg',
        'แกงเทโพหมูสามชั้น': 'taepo_porkbelly.jpg'
    };

    let updated = 0;
    mainsCategory.items.forEach(item => {
        if (mappings[item.th]) {
            item.img = mappings[item.th];
            updated++;
        }
    });

    if (updated > 0) {
        fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
        console.log(`Updated images for ${updated} Tae Po curries`);
    } else {
        console.log("Could not find the Tae Po curries to update");
    }
}
