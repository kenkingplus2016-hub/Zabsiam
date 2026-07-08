const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public';
const files = ['menu.html', 'royal.html', 'delivery.html', 'booking.html', 'desserts.html'];

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Remove all lines updating nav- via JS
    content = content.replace(/.*document\.getElementById\('nav-[^']+'\)\.innerText.*/g, '');
    
    // If it's desserts.html, update the English text inside changeLang
    if (file === 'desserts.html') {
        content = content.replace(/hero_title: "Delivery Box Sets"/g, 'hero_title: "Thai Desserts"');
        content = content.replace(/hero_subtitle: "Home delivery sets, ready to eat"/g, 'hero_subtitle: "Authentic & Premium Thai Sweets"');
        content = content.replace(/hero_desc: "\(Excl. Tax, Equipment & Service\)"/g, 'hero_desc: ""');
    }
    
    fs.writeFileSync(path.join(dir, file), content);
    console.log('Fixed ' + file);
});
