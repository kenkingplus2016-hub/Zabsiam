const fs = require('fs');
const path = require('path');

const repoPath = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\menu.html';
const localPath = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\menu.html';

try {
    let content = fs.readFileSync(repoPath, 'utf8');

    // We want to remove the block that contains GF and DF
    const gfDfBlock = /<div class="flex gap-1 text-\[10px\] font-bold text-gray-500 mt-1">\s*<span class="border border-gray-300 rounded-full w-5 h-5 flex items-center justify-center" title="Gluten Free">GF<\/span>\s*<span class="border border-gray-300 rounded-full w-5 h-5 flex items-center justify-center" title="Dairy Free">DF<\/span>\s*<\/div>/g;

    content = content.replace(gfDfBlock, '');

    fs.writeFileSync(repoPath, content, 'utf8');
    if (fs.existsSync(localPath)) {
        fs.writeFileSync(localPath, content, 'utf8');
    }
    
    console.log("Successfully removed GF and DF badges from menu.html");
} catch (e) {
    console.error(e);
}
