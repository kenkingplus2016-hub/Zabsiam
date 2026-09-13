const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

let removedCount = 0;

for (const file of files) {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const startIdx = content.indexOf('<div class="delivery-checkout">');
    if (startIdx !== -1) {
        const nextSectionIdx = content.indexOf('<button type="submit" id="checkout-btn"', startIdx);
        if (nextSectionIdx !== -1) {
            const before = content.substring(0, startIdx);
            const after = content.substring(nextSectionIdx);
            content = before + after;
            fs.writeFileSync(filePath, content, 'utf8');
            removedCount++;
            console.log(`Removed delivery options from ${file}`);
        }
    }
}

console.log(`Total HTML files updated: ${removedCount}`);
