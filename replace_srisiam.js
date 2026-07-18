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

        // Replace Thai text
        content = content.replace(/ศรีสยาม/g, 'สำรับไทย');
        
        // Let's also replace 'Sri Siam' with 'Samrub Thai' (if it appears in english, e.g. "Sri Siam Event & Buffet")
        // But the user only specified "ศรีสยาม เป็น สำรับไทย"
        // I will replace "Sri Siam" with "Samrub Thai" to keep it consistent
        content = content.replace(/Sri Siam/g, 'Samrub Thai');

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated: ${file}`);
            changedFiles++;
        }
    });

    console.log(`Finished updating ${changedFiles} files.`);
}

replaceInHtml();
