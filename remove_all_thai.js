const fs = require('fs');
const path = require('path');

const dirs = [
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public',
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public'
];

function processHTML(filePath) {
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // 1. Remove the language toggle CSS
    content = content.replace(/<style>\s*html\[lang="th"\].*?<\/style>\s*/gs, '');
    
    // 2. Remove the language buttons
    content = content.replace(/<div class="flex justify-center gap-2 mt-2\.5">.*?<\/div>\s*/gs, '');
    
    // 3. Remove <span class="nav-th">...</span>
    let oldContent;
    do {
        oldContent = content;
        content = content.replace(/<span class="nav-th">(?:[^<]|<(?!\/span>))*<\/span>/g, '');
    } while (content !== oldContent);

    // 4. Unwrap <span class="nav-en">...</span>
    do {
        oldContent = content;
        content = content.replace(/<span class="nav-en">((?:[^<]|<(?!\/span>))*)<\/span>/g, '$1');
    } while (content !== oldContent);
    
    // Replace specific hardcoded Thai titles if any
    content = content.replace('สำรับไทย อีเว้น/บุฟเฟต์', 'Samrub Thai Event & Buffet');
    content = content.replace('เงื่อนไขการรับจัดเลี้ยง', 'Catering Terms');
    
    // Update JS rendering in menu.html
    if (filePath.endsWith('menu.html')) {
        // Fix category title
        content = content.replace(/\$\{category\.title\[currentLang\]\}/g, '${category.title.en || category.title.th || category.title}');
        
        // Remove Thai name display and use English name as the main title
        // Current: <h3 class="font-bold...">${item.th}</h3><p class="text-xs...">${item.en}</p>
        content = content.replace(/<h3 class="font-bold text-dark-green text-base mb-1 leading-snug">\$\{item\.th\}<\/h3>\s*<p class="text-xs text-gray-500 mb-3 flex-1">\$\{item\.en\}<\/p>/g, 
                                  '<h3 class="font-bold text-dark-green text-base mb-3 flex-1 leading-snug">${item.en}</h3>');
                                  
        // Update onclick handlers to pass item.en instead of item.th
        content = content.replace(/showQRCode\('\$\{item\.id\}', '\$\{item\.th\}'/g, "showQRCode('${item.id}', '${item.en}'");
        content = content.replace(/addBuffetItem\('\$\{item\.id\}', '\$\{item\.th\}'/g, "addBuffetItem('${item.id}', '${item.en}'");
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Processed: ' + filePath);
    }
}

for (const dir of dirs) {
    if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            if (file.endsWith('.html')) {
                processHTML(path.join(dir, file));
            }
        }
    }
}
