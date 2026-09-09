const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let filePath = path.join(publicDir, file);
    let html = fs.readFileSync(filePath, 'utf8');

    // Add to Desktop Nav
    html = html.replace(/<li><a href="event-catering\.html">Event Catering<\/a><\/li>/g, 
        '<li><a href="event-catering.html">Event Catering</a></li>\n                        <li><a href="canapes.html">Canap&eacute;</a></li>');
    
    // Add to Mobile Nav
    html = html.replace(/<a href="event-catering\.html" class="block text-white hover:text-\[var\(--color-gold\)\]">Event Catering<\/a>/g,
        '<a href="event-catering.html" class="block text-white hover:text-[var(--color-gold)]">Event Catering</a>\n                    <a href="canapes.html" class="block text-white hover:text-[var(--color-gold)]">Canap&eacute;</a>');

    fs.writeFileSync(filePath, html, 'utf8');
});
console.log('Added Canapé to navigation in all HTML files.');
