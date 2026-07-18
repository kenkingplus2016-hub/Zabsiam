const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

function replaceInHtml() {
    const files = fs.readdirSync(publicDir).filter(file => file.endsWith('.html'));

    let changedFiles = 0;

    files.forEach(file => {
        const filePath = path.join(publicDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Replace for pages with dual language
        content = content.replace(/>The Royal Siam Gathering</g, '><span class="nav-th">ค็อกเทลและคานาเป้</span><span class="nav-en">The Royal Siam Gathering</span><');
        
        // Replace for index.html (which just has simple text)
        content = content.replace(/>Royal Siam</g, '>Cocktails & Canapés<');

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated: ${file}`);
            changedFiles++;
        }
    });

    console.log(`Finished updating ${changedFiles} files.`);
}

replaceInHtml();
