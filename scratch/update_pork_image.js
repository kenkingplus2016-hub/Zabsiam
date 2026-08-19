const fs = require('fs');
const path = require('path');

const targetPath = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/lunch-box.html';

if (fs.existsSync(targetPath)) {
    let html = fs.readFileSync(targetPath, 'utf8');
    
    // Replace the fa-box icon with the uploaded image
    const oldIcon = '<i class="fas fa-box" style="font-size: 3rem; color: var(--color-gold); margin-bottom: 1.5rem;"></i>';
    const newImage = '<img src="images/crispy_pork_box.jpg" alt="Crispy Pork Belly Signature Box" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1.5rem;">';
    
    if (html.includes(oldIcon)) {
        html = html.replace(oldIcon, newImage);
        fs.writeFileSync(targetPath, html, 'utf8');
        fs.copyFileSync(targetPath, 'C:/Users/KENDEE/Desktop/เว็บ/public/lunch-box.html');
        console.log("Updated lunch-box.html with crispy pork image.");
    } else {
        console.log("Error: fa-box icon not found.");
    }
}
