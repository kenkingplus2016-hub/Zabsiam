const fs = require('fs');
const path = require('path');

const targetPath = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/event-catering.html';

if (fs.existsSync(targetPath)) {
    let html = fs.readFileSync(targetPath, 'utf8');
    
    // Replace "Art Gallery Opening" with "Executive & VIP Gatherings"
    html = html.replace(
        'Art Gallery Opening',
        'Executive & VIP Gatherings'
    );
    
    // Optional: update the description slightly if needed, though "Elegant Thai canapés..." works well for VIP too.
    html = html.replace(
        'Elegant Thai canapés and dishes perfect for sophisticated gatherings.',
        'Elegant Thai canapés and premium service tailored for high-end corporate and VIP events.'
    );

    fs.writeFileSync(targetPath, html, 'utf8');
    
    // Copy to Desktop
    const desktopPath = 'C:/Users/KENDEE/Desktop/เว็บ/public/event-catering.html';
    fs.copyFileSync(targetPath, desktopPath);
    
    console.log("Renamed Art Gallery Opening in event-catering.html");
}
