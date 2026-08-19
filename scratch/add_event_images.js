const fs = require('fs');
const path = require('path');

const targetPath = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/event-catering.html';

if (fs.existsSync(targetPath)) {
    let html = fs.readFileSync(targetPath, 'utf8');
    
    // Replace Birthday icon
    html = html.replace(
        '<i class="fas fa-birthday-cake" style="font-size: 2.5rem; color: var(--color-gold); margin-bottom: 1rem;"></i>',
        '<img src="images/event_birthday.jpg" alt="Intimate Birthday Celebration" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">'
    );
    
    // Replace Wedding icon
    html = html.replace(
        '<i class="fas fa-ring" style="font-size: 2.5rem; color: var(--color-gold); margin-bottom: 1rem;"></i>',
        '<img src="images/event_wedding.jpg" alt="Wedding Summer Food Festival" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">'
    );
    
    // Replace Corporate icon
    html = html.replace(
        '<i class="fas fa-building" style="font-size: 2.5rem; color: var(--color-gold); margin-bottom: 1rem;"></i>',
        '<img src="images/event_corporate.jpg" alt="City Corporate Launch" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">'
    );
    
    // Replace Gallery icon
    html = html.replace(
        '<i class="fas fa-palette" style="font-size: 2.5rem; color: var(--color-gold); margin-bottom: 1rem;"></i>',
        '<img src="images/event_gallery.jpg" alt="Art Gallery Opening" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">'
    );

    fs.writeFileSync(targetPath, html, 'utf8');
    
    // Copy to Desktop
    const desktopPath = 'C:/Users/KENDEE/Desktop/เว็บ/public/event-catering.html';
    fs.copyFileSync(targetPath, desktopPath);
    
    console.log("Replaced icons with images in event-catering.html");
}
