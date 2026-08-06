const fs = require('fs');
const path = require('path');

const dirs = [
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public',
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public'
];

dirs.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    const menuFile = path.join(dir, 'menu.html');
    
    if (fs.existsSync(menuFile)) {
        let content = fs.readFileSync(menuFile, 'utf8');
        let modified = false;

        const filterRegex = /<!-- Category Filter Bar -->[\s\S]*?<div class="max-w-\[1200px\][^>]*id="category-filter-bar"[\s\S]*?<\/div>\s*<\/div>/;
        
        if (filterRegex.test(content)) {
            content = content.replace(filterRegex, '');
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(menuFile, content, 'utf8');
            console.log(`Removed filter bar from menu.html in ${dir}`);
        }
    }
});
