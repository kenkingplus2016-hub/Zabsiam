const fs = require('fs');
const d = require('./data/classic_menu.json');
const allSets = d;

const classicSets = allSets.filter(s => 
    s.name.en.includes('Family') || 
    s.name.en.includes('Lunch Box') || 
    s.name.en.includes('Special Box') || 
    s.name.en.includes('Siam Pruksa') || 
    s.name.en.includes('Siam Authentic')
);

console.log("Filtered sets length:", classicSets.length);

let currentLang = 'th';

classicSets.forEach(set => {
    try {
        const btnText = currentLang === 'th' ? 'ดูรายละเอียดอาหาร / View Details' : 'View Details / Items';
        const priceLabel = currentLang === 'th' ? 'ราคาขายสุทธิ' : 'Selling Price';
        const excludeLabel = currentLang === 'th' ? '*ไม่รวมภาษี อุปกรณ์ และบริการ' : '*Excl. Tax, Equipment & Service';

        const nameRep = set.name[currentLang].replace(': ', ':<br>').replace(' — ', '<br>').replace(' - ', '<br>');
        
        const priceF = parseFloat(set.price).toFixed(2);
        
        const desc = set.desc[currentLang];
        
        let target = '';
        if (set.name.en.match(/Set [A-Z]/)) {
            target = 'menuHtml';
        } else {
            target = 'pruksaHtml';
        }
        
    } catch (e) {
        console.error("FAILED ON SET:", set.id, e.message);
    }
});
console.log("TEST FINISHED.");
