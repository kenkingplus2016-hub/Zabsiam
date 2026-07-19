const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Change active state from TH to EN for buttons with onclick="changeLang(...)"
    content = content.replace(/class="([^"]*)lang-btn active([^"]*)"([^>]*)onclick="changeLang\('th', this\)"/g, 'class="$1lang-btn$2"$3onclick="changeLang(\'th\', this)"');
    content = content.replace(/class="([^"]*)lang-btn([^"]*)"([^>]*)onclick="changeLang\('en', this\)"/g, (match, p1, p2, p3) => {
        if (!match.includes('active')) {
            return `class="${p1}lang-btn active${p2}"${p3}onclick="changeLang('en', this)"`;
        }
        return match;
    });

    // Just in case they use data-lang without onclick
    content = content.replace(/class="([^"]*)lang-btn active([^"]*)"([^>]*)data-lang="th"/g, 'class="$1lang-btn$2"$3data-lang="th"');
    content = content.replace(/class="([^"]*)lang-btn([^"]*)"([^>]*)data-lang="en"/g, (match, p1, p2, p3) => {
        if (!match.includes('active')) {
            return `class="${p1}lang-btn active${p2}"${p3}data-lang="en"`;
        }
        return match;
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated buttons in ${file}`);
});
