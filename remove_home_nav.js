const fs = require('fs');

const files = [
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\menu.html',
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\menu.html'
];

for (const filePath of files) {
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove the Home link from the navigation
    content = content.replace(/<a href="index\.html" id="nav-home" class="nav-link[^"]*">Home<\/a>\s*/g, '');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Processed: ' + filePath);
}
