const fs = require('fs');
const ghData = JSON.parse(fs.readFileSync('C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data\\buffet_menu.json', 'utf8'));

// Check images in the GitHub version
let placeholders = 0;
let ok = 0;
let missing = 0;
ghData.forEach(cat => {
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
console.log(`\nGitHub version: OK=${ok}, Placeholder=${placeholders}, Missing=${missing}`);
console.log(`Total items: ${ok + placeholders + missing}`);
