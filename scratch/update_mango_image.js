const fs = require('fs');
const path = require('path');

const targetPath = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/lunch-box.html';

if (fs.existsSync(targetPath)) {
    let html = fs.readFileSync(targetPath, 'utf8');
    
    // Replace the fa-leaf icon with the uploaded image
    const oldIcon = '<i class="fas fa-leaf" style="font-size: 3rem; color: var(--color-gold); margin-bottom: 1.5rem;"></i>';
    const newImage = '<img src="images/mango_sticky_rice_box.jpg" alt="Mango Sticky Rice Box" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1.5rem;">';
    
    if (html.includes(oldIcon)) {
        html = html.replace(oldIcon, newImage);
        fs.writeFileSync(targetPath, html, 'utf8');
        fs.copyFileSync(targetPath, 'C:/Users/KENDEE/Desktop/เว็บ/public/lunch-box.html');
        console.log("Updated lunch-box.html with mango sticky rice image.");
    } else {
        console.log("Error: fa-leaf icon not found.");
    }
}
