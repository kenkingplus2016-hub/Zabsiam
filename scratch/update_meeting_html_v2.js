const fs = require('fs');
const path = require('path');

const targetPath = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/meeting-meals.html';

if (fs.existsSync(targetPath)) {
    let html = fs.readFileSync(targetPath, 'utf8');
    
    // Replace the handshake icon with the new main_meeting_meals.jpg image
    html = html.replace(
        '<i class="fas fa-handshake" style="font-size: 4rem; color: var(--color-gold); margin-bottom: 1.5rem;"></i>',
        '<img src="images/main_meeting_meals.jpg" alt="Meeting Meals Buffet" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 8px; margin-bottom: 1.5rem;">'
    );
    
    fs.writeFileSync(targetPath, html, 'utf8');
    
    // Copy to Desktop folder
    const desktopPath = 'C:/Users/KENDEE/Desktop/เว็บ/public/meeting-meals.html';
    fs.copyFileSync(targetPath, desktopPath);
    
    console.log("Updated meeting-meals.html with the new buffet image");
}
