const fs = require('fs');
const path = require('path');

const publicDirs = [
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public',
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public'
];

function updateLogoReference(dir) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Change src="logo.png" to src="logo2.png"
        content = content.replace(/src="logo\.png"/g, 'src="logo2.png"');
        // Change onerror="this.src='logo.png'" to logo2.png
        content = content.replace(/onerror="this\.src='logo\.png'/g, 'onerror="this.src=\'logo2.png\'');
        // Check for any other direct logo.png strings
        content = content.replace(/logo\.png/g, 'logo2.png');
        
        fs.writeFileSync(filePath, content, 'utf8');
    });
}

publicDirs.forEach(dir => updateLogoReference(dir));
console.log("Updated all HTML files to reference logo2.png");
