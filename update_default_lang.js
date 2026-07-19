const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Change HTML tag lang
    content = content.replace(/<html lang="th">/, '<html lang="en">');
    
    // 2. Change the TH button to not be active
    content = content.replace(/class="([^"]*)lang-btn active([^"]*)"\s+data-lang="th"/, 'class="$1lang-btn px-2$2" data-lang="th"');
    
    // 3. Change the EN button to be active
    content = content.replace(/class="([^"]*)lang-btn px-2([^"]*)"\s+data-lang="en"/, 'class="$1lang-btn active$2" data-lang="en"');
    content = content.replace(/class="([^"]*)lang-btn([^"]*)"\s+data-lang="en"/, (match, p1, p2) => {
        if (!match.includes('active')) {
            return `class="${p1}lang-btn active${p2}" data-lang="en"`;
        }
        return match;
    });

    // 4. Update menu.html currentLang if it exists
    content = content.replace(/let\s+currentLang\s*=\s*['"]th['"];/, 'let currentLang = "en";');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated default language to EN in ${file}`);
});
