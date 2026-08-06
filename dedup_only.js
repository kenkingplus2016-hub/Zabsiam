const fs = require('fs');
const data = JSON.parse(fs.readFileSync('public/api/buffet', 'utf8'));

// Only remove duplicates, do NOT touch image references
let removed = 0;
data.forEach(cat => {
    const seen = new Map();
    const unique = [];
    cat.items.forEach(item => {
        const key = item.th + '|' + item.en;
        if (!seen.has(key)) {
            seen.set(key, true);
            unique.push(item);
        } else {
            console.log(`REMOVED DUPE: ${item.th} / ${item.en}`);
            removed++;
        }
    });
    cat.items = unique;
});

fs.writeFileSync('public/api/buffet', JSON.stringify(data, null, 4), 'utf8');
console.log(`\nRemoved ${removed} duplicates. Image references left UNTOUCHED.`);
