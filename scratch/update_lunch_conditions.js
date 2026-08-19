const fs = require('fs');
const path = require('path');

const targetPath = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/lunch-box.html';

if (fs.existsSync(targetPath)) {
    let html = fs.readFileSync(targetPath, 'utf8');
    
    // 1. Replace the Booking Conditions text globally in the file
    const oldCondition = '*Booking Conditions: Minimum 15 boxes required. 7 days advance booking.';
    const newCondition = '*Booking Conditions: No minimum order. 2 days advance booking.<br/>Delivery: Sat-Tue (10:00 - 11:00) | Wed-Fri (21:00 - 22:00)';
    
    // Using split and join to replace all instances
    html = html.split(oldCondition).join(newCondition);
    
    // 2. Replace the Add To Cart functions to reflect 1 Box instead of 15 Boxes
    html = html.replace(
        "addToCart('Signature Box: Crispy Pork Belly (15 Boxes)', 225,",
        "addToCart('Signature Box: Crispy Pork Belly', 15,"
    );
    
    html = html.replace(
        "addToCart('Signature Box: Mango Sticky Rice (15 Boxes)', 120,",
        "addToCart('Signature Box: Mango Sticky Rice', 8,"
    );

    fs.writeFileSync(targetPath, html, 'utf8');
    
    // Copy to Desktop folder
    const desktopPath = 'C:/Users/KENDEE/Desktop/เว็บ/public/lunch-box.html';
    if(fs.existsSync('C:/Users/KENDEE/Desktop/เว็บ/public/')) {
        fs.copyFileSync(targetPath, desktopPath);
    }
    
    console.log("Updated lunch-box.html with new booking conditions and single box cart logic.");
}
