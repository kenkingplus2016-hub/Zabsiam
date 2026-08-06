const fs = require('fs');
const path = require('path');

const publicDir = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public';
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

let updatedCount = 0;
for (const file of files) {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // The extra div is right before <div class="mega-featured">
    // Looking at the exact HTML:
    //                         </div>
    //                         </div>
    //                         <div class="mega-featured">
    const regex = /<\/div>\s*<\/div>\s*<div class="mega-featured">/g;
    
    if (regex.test(content)) {
        content = content.replace(regex, '</div>\n                        <div class="mega-featured">');
        fs.writeFileSync(filePath, content, 'utf8');
        updatedCount++;
    }
}
console.log(`Fixed extra div in ${updatedCount} HTML files.`);
