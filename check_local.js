const fs = require('fs');
const localData = JSON.parse(fs.readFileSync('public/api/buffet', 'utf8'));
let ok = 0;
let placeholders = 0;
let missing = 0;
localData.forEach(cat => {
    cat.items.forEach(item => {
        const imgFile = item.img;
        if (imgFile === 'logo.png' || imgFile.startsWith('http')) { ok++; return; }
        const exists = fs.existsSync(`public/images/${imgFile}`);
        if (!exists) {
            console.log(`[MISSING] ${item.th} => ${imgFile}`);
            missing++;
        } else {
            const size = fs.statSync(`public/images/${imgFile}`).size;
            if (size === 156898) {
                placeholders++;
            } else {
                ok++;
            }
        }
    });
});
console.log(`\nCurrent local version: OK=${ok}, Placeholder=${placeholders}, Missing=${missing}`);
console.log(`Total items: ${ok + placeholders + missing}`);
