const fs = require('fs');
const path = require('path');

const targetPath = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/event-catering.html';

if (fs.existsSync(targetPath)) {
    let html = fs.readFileSync(targetPath, 'utf8');
    
    // Add text-align: center to the buttons so the text is in the middle of the button box
    html = html.replace(/<a href="#" onclick="event\.preventDefault\(\);[^>]*class="add-to-cart-btn"[^>]*>/g, function(match) {
        return match.replace('style="', 'style="text-align: center; ');
    });
    
    html = html.replace(/<a href="mailto:info@zabsiam\.co\.uk[^>]*class="add-to-cart-btn"[^>]*>/g, function(match) {
        return match.replace('style="', 'style="text-align: center; ');
    });

    fs.writeFileSync(targetPath, html, 'utf8');
    
    // Copy to Desktop
    const desktopPath = 'C:/Users/KENDEE/Desktop/เว็บ/public/event-catering.html';
    fs.copyFileSync(targetPath, desktopPath);
    
    console.log("Centered button text.");
}
