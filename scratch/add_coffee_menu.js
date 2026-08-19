const fs = require('fs');
const path = require('path');

const targetPath = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/coffee-break.html';

if (fs.existsSync(targetPath)) {
    let html = fs.readFileSync(targetPath, 'utf8');
    
    const menuHtml = `
            <div style="text-align: left; margin-top: 20px; background: rgba(0,0,0,0.3); padding: 20px; border-radius: 5px; max-width: 600px; margin-left: auto; margin-right: auto; margin-bottom: 20px;">
                <p style="color: var(--color-gold); font-size: 1.1rem; margin-bottom: 15px; font-weight: bold; text-align: center;">Set Includes:</p>
                <ul style="color: #ddd; font-size: 0.95rem; line-height: 1.8; margin: 0; padding-left: 20px;">
                    <li><strong>Thai Desserts:</strong> Khanom Babin (Thai Coconut Macaroons) & Khanom Krok (Coconut Pancakes)</li>
                    <li><strong>Beverage:</strong> Premium illy Coffee</li>
                    <li><strong>Lunch Box (Choose 1 per guest):</strong>
                        <ul style="padding-left: 20px; margin-top: 5px; list-style-type: circle; color: #bbb; line-height: 1.6;">
                            <li>Beef Panang Curry with Rice (พะแนงเนื้อราดข้าว)</li>
                            <li>Stir-fried Beef in Oyster Sauce with Rice (ผัดเนื้อน้ำมันหอยราดข้าว)</li>
                            <li>Pad Thai with Prawns (ผัดไทยกุ้ง)</li>
                        </ul>
                    </li>
                </ul>
            </div>`;

    // We will insert this menuHtml right before the Booking conditions <p> tag.
    // The target is: <p style="color: #aaa; font-size: 0.9rem; line-height: 1.4;">*Booking Conditions: Minimum 15 guests required. 14 days advance booking.</p>
    const searchString = '<p style="color: #aaa; font-size: 0.9rem; line-height: 1.4;">*Booking Conditions: Minimum 15 guests required. 14 days advance booking.</p>';
    
    if(html.includes(searchString)) {
        html = html.replace(searchString, menuHtml + '\n                ' + searchString);
        fs.writeFileSync(targetPath, html, 'utf8');
        
        // Copy to Desktop folder
        const desktopPath = 'C:/Users/KENDEE/Desktop/เว็บ/public/coffee-break.html';
        fs.copyFileSync(targetPath, desktopPath);
        
        console.log("Added menu to coffee-break.html");
    } else {
        console.log("Could not find the target string to inject menu.");
    }
}
