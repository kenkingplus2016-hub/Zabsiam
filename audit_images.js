const fs = require('fs');
const data = JSON.parse(fs.readFileSync('public/api/buffet', 'utf8'));
const images = fs.readdirSync('public/images').map(f => f.toLowerCase());

let report = [];
data.forEach(cat => {
    report.push(`\n=== ${cat.title.en} (${cat.id}) === ${cat.items.length} items`);
    cat.items.forEach((item, idx) => {
        const imgFile = item.img;
        const exists = fs.existsSync(`public/images/${imgFile}`);
        const sizeBytes = exists ? fs.statSync(`public/images/${imgFile}`).size : 0;
        const isPlaceholder = sizeBytes === 156898; // the placeholder size we copied earlier
        const status = !exists ? 'MISSING' : isPlaceholder ? 'PLACEHOLDER' : 'OK';
        report.push(`[${status}] ${item.th} / ${item.en} => img: ${imgFile} (${sizeBytes} bytes)`);
    });
});
fs.writeFileSync('image_audit.txt', report.join('\n'), 'utf8');
console.log('Audit complete. Written to image_audit.txt');
console.log(`Total categories: ${data.length}`);
let total = 0;
data.forEach(c => total += c.items.length);
console.log(`Total items: ${total}`);
