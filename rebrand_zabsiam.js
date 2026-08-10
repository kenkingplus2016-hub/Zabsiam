const fs = require('fs');
const path = require('path');

const publicDir = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public';
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

let updatedCount = 0;

for (const file of files) {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replace Brand Name
    content = content.replace(/Khrua Thai London/g, 'ZabSiam London');
    content = content.replace(/Khrua Thai/g, 'ZabSiam');
    content = content.replace(/KHRUA THAI/g, 'ZabSiam');
    
    // Replace domain references if any (optional, but good for SEO texts)
    content = content.replace(/khruathailondon\.co\.uk/g, 'zabsiam.co.uk');

    // Replace "Our Menu" -> "Thai Street Food"
    content = content.replace(/>Our Menu<\/a>/g, '>Thai Street Food</a>');
    
    // For the HTML comment we used before
    content = content.replace(/<!-- Our Menu -->/g, '<!-- Thai Street Food -->');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        
        // Also update GitHub repo
        const gitPath = path.join('C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public', file);
        if (fs.existsSync(gitPath)) {
            fs.writeFileSync(gitPath, content, 'utf8');
        }
        updatedCount++;
    }
}

console.log(`Rebranded to ZabSiam in ${updatedCount} files.`);
