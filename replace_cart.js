const fs = require('fs');
const path = require('path');

const directoryPath = 'public';

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Replace standalone occurrences
    content = content.replace(/เพิ่มลงตะกร้า/g, 'Add to Cart');
    
    // Clean up if it caused duplication like `<span class="nav-th">Add to Cart</span><span class="nav-en">Add to Cart</span>`
    // Actually, it's safer to just let it be Add to Cart for both language modes if they switch.

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.html') || fullPath.endsWith('.js')) {
            replaceInFile(fullPath);
        }
    }
}

processDirectory(directoryPath);
console.log('Done replacing text.');
