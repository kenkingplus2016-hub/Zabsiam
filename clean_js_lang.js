const fs = require('fs');

const files = [
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\menu.html',
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\menu.html'
];

for (const filePath of files) {
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix JS language ternaries
    content = content.replace(/currentLang === 'th' \? thName : enName/g, 'enName');
    content = content.replace(/currentLang === 'th' \? thUnit : enUnit/g, 'enUnit');
    content = content.replace(/currentLang === 'th' \? '[^']*' : ('[^']*')/g, '$1');
    content = content.replace(/currentLang === 'th' \? cb\.getAttribute\('data-thname'\) : cb\.getAttribute\('data-enname'\)/g, "cb.getAttribute('data-enname')");
    
    // Also remove the currentLang variable if it's there
    content = content.replace(/let currentLang = 'en';\n/g, '');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Cleaned JS in: ' + filePath);
}
