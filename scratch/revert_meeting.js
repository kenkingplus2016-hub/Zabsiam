const fs = require('fs');
const path = require('path');

const targetPath = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/meeting-meals.html';

if (fs.existsSync(targetPath)) {
    let html = fs.readFileSync(targetPath, 'utf8');
    
    // Revert to the original handshake icon
    html = html.replace(
        /<img src="images\/main_meeting_meals\.jpg"[^>]*>/,
        '<i class="fas fa-handshake" style="font-size: 4rem; color: var(--color-gold); margin-bottom: 1.5rem;"></i>'
    );
    
    fs.writeFileSync(targetPath, html, 'utf8');
    
    // Copy to Desktop
    const desktopPath = 'C:/Users/KENDEE/Desktop/เว็บ/public/meeting-meals.html';
    fs.copyFileSync(targetPath, desktopPath);
}
