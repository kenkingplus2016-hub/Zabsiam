const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/menu.html';
if (!fs.existsSync(file)) return;
let content = fs.readFileSync(file, 'utf8');

const oldCode = `<button onclick="event.preventDefault(); addToCart({
                                id: 'authentic-' + set.id,
                                name_th: set.name.th || set.name_th,
                                name_en: set.name.en || set.name_en,
                                price: parseFloat(set.price),
                                qty: 1,
                                category: 'Authentic',
                                unit_th: set.unit?.th || '5 ท่าน',
                                unit_en: set.unit?.en || '5 Persons'
                            })" class="inline-block mt-3 bg-dark-green text-gold border-2 border-gold px-5 py-2 rounded-full font-bold text-sm no-underline transition-all duration-300 hover:bg-gold hover:text-dark-green shadow-md cursor-pointer">`;

const newCode = `<button onclick="event.preventDefault(); try { addToCart({
                                id: 'authentic-' + set.id,
                                name_th: set.name && set.name.th ? set.name.th : set.name_th,
                                name_en: set.name && set.name.en ? set.name.en : set.name_en,
                                price: parseFloat(set.price),
                                qty: 1,
                                category: 'Authentic',
                                unit_th: (set.unit && set.unit.th) ? set.unit.th : '5 ท่าน',
                                unit_en: (set.unit && set.unit.en) ? set.unit.en : '5 Persons'
                            }); } catch(err) { alert('Error: ' + err.message); }" class="inline-block mt-3 bg-dark-green text-gold border-2 border-gold px-5 py-2 rounded-full font-bold text-sm no-underline transition-all duration-300 hover:bg-gold hover:text-dark-green shadow-md cursor-pointer">`;

if (content.includes(oldCode)) {
    content = content.replace(oldCode, newCode);
    fs.writeFileSync(file, content);
    console.log("Injected try/catch in menu.html");
} else {
    console.log("Could not find oldCode in menu.html");
}
