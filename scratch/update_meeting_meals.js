const fs = require('fs');
const path = require('path');

const targetPath = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/meeting-meals.html';

if (fs.existsSync(targetPath)) {
    let html = fs.readFileSync(targetPath, 'utf8');
    
    // Replace the main header icon (fa-handshake) with the new image
    // <i class="fas fa-handshake" style="font-size: 4rem; color: var(--color-gold); margin-bottom: 1.5rem;"></i>
    html = html.replace(
        '<i class="fas fa-handshake" style="font-size: 4rem; color: var(--color-gold); margin-bottom: 1.5rem;"></i>',
        '<img src="images/main_meeting_meals.jpg" alt="Meeting Meals" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 8px; margin-bottom: 1.5rem;">'
    );
    
    fs.writeFileSync(targetPath, html, 'utf8');
    
    // Copy to Desktop
    const desktopPath = 'C:/Users/KENDEE/Desktop/เว็บ/public/meeting-meals.html';
    fs.copyFileSync(targetPath, desktopPath);
    
    console.log("Replaced main header icon with image in meeting-meals.html");
}
