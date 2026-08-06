const fs = require('fs');
const data = JSON.parse(fs.readFileSync('public/api/buffet', 'utf8'));

// Remove duplicates from each category
data.forEach(cat => {
    const seen = new Map();
    const unique = [];
    cat.items.forEach(item => {
        const key = item.th + '|' + item.en;
        if (!seen.has(key)) {
            seen.set(key, true);
            unique.push(item);
        } else {
            console.log(`REMOVED DUPE [${cat.id}]: ${item.th} / ${item.en} (id: ${item.id})`);
        }
    });
    cat.items = unique;
});

fs.writeFileSync('public/api/buffet', JSON.stringify(data, null, 4), 'utf8');
console.log('Done - duplicates removed');
