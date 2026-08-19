const fs = require('fs');
const path = require('path');

const targetDir = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public';

// Fix navigation across ALL files to point Banquets to index.html#menu
const filesToUpdate = ['index.html', 'banquets.html', 'event-catering.html', 'meeting-meals.html', 'coffee-break.html', 'lunch-box.html'];

filesToUpdate.forEach(file => {
    let p = path.join(targetDir, file);
    if (fs.existsSync(p)) {
        let html = fs.readFileSync(p, 'utf8');
        html = html.replace(/<a href="banquets\.html">Signature Thai Banquets<\/a>/g, '<a href="index.html#menu">Signature Thai Banquets</a>');
        fs.writeFileSync(p, html, 'utf8');
    }
});

// Clean up the 4 subpages: remove hero section and menu section
const subpages = ['event-catering.html', 'meeting-meals.html', 'coffee-break.html', 'lunch-box.html'];
const heroRegex = /<!-- Hero Section[\s\S]*?<\/section>/;
const menuRegex = /<!-- Menu Section -->[\s\S]*?<section id="menu"[\s\S]*?<\/section>/; // Attempt to catch the whole menu

subpages.forEach(file => {
    let p = path.join(targetDir, file);
    if (fs.existsSync(p)) {
        let html = fs.readFileSync(p, 'utf8');
        
        // Remove hero section
        html = html.replace(heroRegex, '');
        
        // Remove menu section. Since it's large and regex might fail, let's use a simpler string split or regex
        // The menu section starts with <section id="menu" and ends before <section id="contact">
        const menuStart = html.indexOf('<section id="menu"');
        const contactStart = html.indexOf('<section id="contact"');
        
        if (menuStart !== -1 && contactStart !== -1 && contactStart > menuStart) {
            html = html.substring(0, menuStart) + html.substring(contactStart);
        }
        
        fs.writeFileSync(p, html, 'utf8');
    }
});

// Sync to desktop
const destDir = 'C:/Users/KENDEE/Desktop/เว็บ/public';
filesToUpdate.forEach(file => {
    let p = path.join(targetDir, file);
    if (fs.existsSync(p)) {
        fs.copyFileSync(p, path.join(destDir, file));
    }
});
console.log("Cleanup complete!");
