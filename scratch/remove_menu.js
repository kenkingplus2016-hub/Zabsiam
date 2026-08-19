const fs = require('fs');
const path = require('path');

const targetDir = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public';
const subpages = ['event-catering.html', 'meeting-meals.html', 'coffee-break.html', 'lunch-box.html'];

subpages.forEach(file => {
    let p = path.join(targetDir, file);
    if (fs.existsSync(p)) {
        let html = fs.readFileSync(p, 'utf8');
        
        const menuStart = html.indexOf('<section id="menu"');
        const contactStart = html.indexOf('<footer id="contact"');
        
        if (menuStart !== -1 && contactStart !== -1 && contactStart > menuStart) {
            html = html.substring(0, menuStart) + html.substring(contactStart);
            fs.writeFileSync(p, html, 'utf8');
            console.log("Cleaned up", file);
        } else {
            console.log("Could not find tags in", file);
        }
    }
});

// Sync to desktop
const destDir = 'C:/Users/KENDEE/Desktop/เว็บ/public';
subpages.forEach(file => {
    let p = path.join(targetDir, file);
    if (fs.existsSync(p)) {
        fs.copyFileSync(p, path.join(destDir, file));
    }
});
console.log("Sync complete!");
