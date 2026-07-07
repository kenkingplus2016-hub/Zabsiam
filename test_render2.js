const fs = require('fs');
const d = require('./data/classic_menu.json');
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
        if (set.name.en.match(/Set [A-Z]/)) {
            target = 'menuHtml';
        } else {
            target = 'pruksaHtml';
        }
    } catch (e) {
        console.error("FAILED ON SET:", set.name ? set.name.en : set.id, "Error:", e.message);
        errorFound = true;
    }
});
if (!errorFound) console.log("NO ERRORS IN RENDER!");
