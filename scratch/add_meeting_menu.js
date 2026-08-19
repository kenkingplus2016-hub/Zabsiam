const fs = require('fs');
const path = require('path');

const targetPath = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/meeting-meals.html';

if (fs.existsSync(targetPath)) {
    let html = fs.readFileSync(targetPath, 'utf8');
    
    const menuHtml = `
            <div style="text-align: left; margin-top: 20px; background: rgba(0,0,0,0.3); padding: 20px; border-radius: 5px; max-width: 600px; margin-left: auto; margin-right: auto; margin-bottom: 20px;">
                <p style="color: var(--color-gold); font-size: 1.1rem; margin-bottom: 15px; font-weight: bold; text-align: center;">Sample Buffet Menu Includes / เมนูอาหารตัวอย่าง:</p>
                <ul style="color: #ddd; font-size: 0.95rem; line-height: 1.8; margin: 0; padding-left: 20px;">
                    <li><strong>Appetizers:</strong> Prawn Spring Rolls & Northern Thai Pork Sausage (Sai Ua Moo)</li>
                    <li><strong>Soup:</strong> Fish Maw Soup (Kra Pho Pla)</li>
                    <li><strong>Mains:</strong> Beef Massaman Curry & Grilled Pork Neck (Kor Moo Yang)</li>
                    <li><strong>Noodles & Rice:</strong> Pad Thai with Prawns & Chicken Fried Rice</li>
                    <li><strong>Desserts:</strong> Mango Sticky Rice (Khao Niao Mamuang) & Assorted Thai Sweets on Khantoke</li>
                </ul>
            </div>`;

    // We will insert this menuHtml right before the Booking conditions <p> tag.
    const searchString = '<p style="color: #aaa; font-size: 0.9rem; line-height: 1.4;">*Booking Conditions: Minimum 15 guests required. 7 days advance booking.</p>';
    
    if(html.includes(searchString)) {
        html = html.replace(searchString, menuHtml + '\n                ' + searchString);
        fs.writeFileSync(targetPath, html, 'utf8');
        
        // Copy to Desktop folder
        const desktopPath = 'C:/Users/KENDEE/Desktop/เว็บ/public/meeting-meals.html';
        fs.copyFileSync(targetPath, desktopPath);
        
        console.log("Added menu to meeting-meals.html");
    } else {
        console.log("Could not find the target string to inject menu.");
    }
}
