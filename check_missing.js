const fs = require('fs');
const data = JSON.parse(fs.readFileSync('public/api/buffet', 'utf8'));

let missing = [];
let ok = 0;
data.forEach(cat => {
    cat.items.forEach(item => {
        if (item.img === 'logo.png' || item.img.startsWith('http')) { ok++; return; }
        const path = `public/images/${item.img}`;
        if (!fs.existsSync(path)) {
            missing.push(`${item.th} / ${item.en} => ${item.img}`);
        } else {
            ok++;
        }
    });
});

console.log(`OK: ${ok}`);
console.log(`Missing: ${missing.length}`);
if (missing.length > 0) {
    console.log('\n--- Missing images ---');
    missing.forEach(m => console.log(m));
}
