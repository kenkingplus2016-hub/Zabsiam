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

        // Replace Thai text in navigation
        content = content.replace(/>เซตตำรับไทย</g, '>อีเว้น/บุฟเฟต์<');
        
        // Replace English text in navigation (index.html uses Thai Set Menus)
        content = content.replace(/>Thai Set Menus</g, '>Event & Buffet<');
        
        // menu.html and others use Authentic Thai Sets
        content = content.replace(/>Authentic Thai Sets</g, '>Event & Buffet<');

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated: ${file}`);
            changedFiles++;
        }
    });

    console.log(`Finished updating ${changedFiles} files.`);
}

replaceInHtml();
