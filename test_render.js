const fs = require('fs');
const classicSets = require('./data/classic_menu.json').filter(s => s.name && s.name.en && (s.name.en.includes('Family') || s.name.en.includes('Lunch Box') || s.name.en.includes('Special Box') || s.name.en.includes('Siam Pruksa') || s.name.en.includes('Siam Authentic')));
const currentLang = 'th';

classicSets.forEach(set => {
    try {
        const btnText = currentLang === 'th' ? 'ดู' : 'View';
        const priceLabel = currentLang === 'th' ? 'ราคา' : 'Price';
        const excludeLabel = currentLang === 'th' ? '*ไม่รวม' : '*Excl.';

        const test = `
            ${set.id}
            ${set.name[currentLang].replace(': ', ':<br>')}
            £${set.price}
            ${set.unit[currentLang]}
            ${parseFloat(set.price).toFixed(2)}
            ${set.img}
            ${set.desc[currentLang]}
        `;
    } catch (e) {
        console.error("FAILED ON SET:", set.id, e.message);
    }
});
console.log("TEST FINISHED.");
