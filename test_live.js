const fs = require('fs');

const d = JSON.parse(fs.readFileSync('live_menu.json', 'utf8'));
const classicSets = d.filter(s => s.name && s.name.en && (s.name.en.includes('Family') || s.name.en.includes('Lunch Box') || s.name.en.includes('Special Box') || s.name.en.includes('Siam Pruksa') || s.name.en.includes('Siam Authentic')));
const currentLang = 'th';

let errorFound = false;

classicSets.forEach(set => {
    try {
        const id = set.id;
        const nameTh = set.name['th'].replace(': ', ':<br>');
        const nameEn = set.name['en'].replace(': ', ':<br>');
        const price = parseFloat(set.price).toFixed(2);
        const unit = set.unit['th'];
        const img = set.img;
        const desc = set.desc['th'];
        
        let target = '';
        if (set.name.en.match(/Set [A-Z]/) && !set.name.en.includes('VIP')) {
            target = 'menuHtml';
        } else {
            target = 'pruksaHtml';
        }
    } catch (e) {
        console.error("FAILED ON SET:", set.name ? set.name.en : set.id, "Error:", e.message);
        errorFound = true;
    }
});

if (!errorFound) {
    console.log("NO ERRORS IN RENDER!");
    const vip = classicSets.find(s => s.id === 'lunch_box_vip');
    if (vip) {
        let target = '';
        if (vip.name.en.match(/Set [A-Z]/) && !vip.name.en.includes('VIP')) {
            target = 'menuHtml';
        } else {
            target = 'pruksaHtml';
        }
        console.log("VIP Box Target Tab:", target);
    } else {
        console.log("VIP Box missing from filtered array!");
    }
}
