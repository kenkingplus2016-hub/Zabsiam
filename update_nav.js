const fs = require('fs');
const path = require('path');

const publicDir = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public';
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

let updatedCount = 0;
for (const file of files) {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Remove Entertaining
    content = content.replace(/<!-- Entertaining -->[\s\S]*?(?=<!-- Puddings -->)/, '');
    
    // Remove Puddings
    content = content.replace(/<!-- Puddings -->[\s\S]*?(?=<!-- Meal Boxes -->)/, '');
    
    // Remove Meal Boxes
    content = content.replace(/<!-- Meal Boxes -->[\s\S]*?(?=<!-- Summer Meals -->)/, '');
    
    // Remove Summer Meals
    content = content.replace(/<!-- Summer Meals -->[\s\S]*?<\/div>\s*<\/div>\s*<div class="mega-search">/, '</div>\n        <div class="mega-search">');

    // Remove Shopping Cart Icon (mega-icons)
    content = content.replace(/<div class="mega-icons">[\s\S]*?<\/div>\s*<\/div>\s*<\/header>/, '</div>\n</header>');
    
    // Rename Main Meals to Our Menu
    content = content.replace(/<a href="menu\.html" class="mega-nav-link">Main Meals<\/a>/g, '<a href="menu.html" class="mega-nav-link">Our Menu</a>');
    content = content.replace(/<!-- Main Meals -->/g, '<!-- Our Menu -->');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        
        // Update github folder as well
        const gitPath = path.join('C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public', file);
        if (fs.existsSync(gitPath)) {
            fs.writeFileSync(gitPath, content, 'utf8');
        }
        updatedCount++;
    }
}
console.log(`Updated mega-nav and removed cart in ${updatedCount} files.`);
