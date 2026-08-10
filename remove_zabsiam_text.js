const fs = require('fs');
const path = require('path');

const publicDirs = [
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public',
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public'
];

function removeZabsiamText(dir) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remove text "ZabSiam" that appears immediately after the logo image
        content = content.replace(/(<img src="logo2\.png"[^>]*>)\s*ZabSiam/g, '$1');
        
        // Remove text "ZabSiam" if it has class="h-10"
        content = content.replace(/(<img src="logo2\.png" alt="ZabSiam" class="h-10">)\s*ZabSiam/g, '$1');

        fs.writeFileSync(filePath, content, 'utf8');
    });
}

publicDirs.forEach(dir => removeZabsiamText(dir));
console.log("Successfully removed redundant ZabSiam text next to the logo.");
