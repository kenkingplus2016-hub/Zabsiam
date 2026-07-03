const fs = require('fs');
const files = ['public/delivery.html', 'public/menu.html', 'public/royal.html'];

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    
    // 1. Remove display: none
    content = content.replace('<section class="reviews-section" style="display: none;">', '<section class="reviews-section">');
    
    // 2. Remove the Thai word
    content = content.replace('เสียงตอบรับจากลูกค้า <br>', '');
    
    fs.writeFileSync(f, content, 'utf8');
    console.log('Fixed ' + f);
});
