const fs = require('fs');

const files = [
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\menu.html',
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\menu.html'
];

for (const filePath of files) {
    if (!fs.existsSync(filePath)) {
        console.log('SKIP (not found): ' + filePath);
        continue;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Remove the language toggle CSS
    content = content.replace(/<style>\s*html\[lang="th"\].*?<\/style>\s*/s, '');
    
    // 2. Remove the language buttons
    content = content.replace(/<div class="flex justify-center gap-2 mt-2\.5">.*?<\/div>\s*/s, '');
    
    // 3. Remove <span class="nav-th">...</span>
    // This regex attempts to match the span and its contents. It handles some nesting if it's not too complex, but it's better to use a loop or more robust parsing if it fails.
    // However, looking at the code, it's mostly simple inline content.
    // We can use a non-greedy match. We have to be careful not to match across multiple spans.
    let oldContent;
    do {
        oldContent = content;
        content = content.replace(/<span class="nav-th">(?:[^<]|<(?!\/span>))*<\/span>/g, '');
    } while (content !== oldContent); // In case of nested spans, though unlikely for nav-th

    // 4. Unwrap <span class="nav-en">...</span>
    do {
        oldContent = content;
        content = content.replace(/<span class="nav-en">((?:[^<]|<(?!\/span>))*)<\/span>/g, '$1');
    } while (content !== oldContent);
    
    // 5. Hardcoded Thai title
    content = content.replace('สำรับไทย อีเว้น/บุฟเฟต์', 'Samrub Thai Event & Buffet');
    
    // Clean up empty spaces left by removal
    content = content.replace(/<span>\s*<\/span>/g, '');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Processed: ' + filePath);
}
