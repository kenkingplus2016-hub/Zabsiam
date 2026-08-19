const fs = require('fs');
const path = require('path');

const targetPath = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/lunch-box.html';

if (fs.existsSync(targetPath)) {
    let html = fs.readFileSync(targetPath, 'utf8');
    
    // 1. Change Title
    html = html.replace(
        '<h2 style="color: var(--color-gold); font-size: 2.5rem; margin-bottom: 1rem;">Lunch Box</h2>',
        '<h2 style="color: var(--color-gold); font-size: 2.5rem; margin-bottom: 1rem;">Signature Box</h2>'
    );
    
    // 2. Change Description and add Menu and Buttons
    const oldContent = `<p style="color: #ccc; font-size: 1.2rem; margin-top: 12px; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 20px;">Starting from &pound;15 per Box<br/><span style="color: var(--color-gold); font-size: 1rem;">Individual Portions</span></p>
            <div style="text-align: center; margin-top: 20px; padding: 20px;">
                <p style="color: #ddd; font-size: 1.1rem; line-height: 1.6; margin: 0;">Individual, premium packed Thai meals for convenience and hygiene. Ideal for studio shoots or quick lunches.</p>
            </div>
            <div style="margin-top: 30px;">
                <a href="mailto:info@zabsiam.co.uk?subject=Inquiry:%20Lunch%20Box" class="add-to-cart-btn" style="padding: 15px 30px; font-size: 1.1rem; display: inline-block; box-sizing: border-box; background-color: var(--color-gold); color: var(--color-black); font-weight: bold; text-decoration: none; border-radius: 4px;">Enquire to Customize</a>
            </div>`;
            
    const newContent = `<p style="color: #ccc; font-size: 1.2rem; margin-top: 12px; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 20px;">Starting from &pound;15 per Box<br/><span style="color: var(--color-gold); font-size: 1rem;">Premium Individual Portions</span></p>
            <div style="text-align: center; margin-top: 20px; padding: 20px 20px 0 20px;">
                <p style="color: #ddd; font-size: 1.1rem; line-height: 1.6; margin: 0; margin-bottom: 15px;">Individual, premium packed Thai meals for convenience and hygiene. Ideal for studio shoots or quick lunches.</p>
                
                <div style="text-align: left; margin-top: 20px; background: rgba(0,0,0,0.3); padding: 20px; border-radius: 5px; max-width: 600px; margin-left: auto; margin-right: auto; margin-bottom: 20px;">
                    <p style="color: var(--color-gold); font-size: 1.1rem; margin-bottom: 15px; font-weight: bold; text-align: center;">Menu Includes / เมนูอาหาร:</p>
                    <ul style="color: #ddd; font-size: 0.95rem; line-height: 1.8; margin: 0; padding-left: 20px;">
                        <li><strong>Main:</strong> Crispy Pork Belly with Rice (ข้าวหมูกรอบ)</li>
                        <li><strong>Dessert:</strong> Mango Sticky Rice (ข้าวเหนียวมะม่วง)</li>
                    </ul>
                </div>
                
                <p style="color: #aaa; font-size: 0.9rem; line-height: 1.4;">*Booking Conditions: Minimum 15 boxes required. 7 days advance booking.</p>
            </div>
            <div style="margin-top: 20px; display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <a href="#" onclick="event.preventDefault(); addToCart('Signature Box (15 Boxes Base)', 225, 'images/zabsiam_logo_transparent.png')" class="add-to-cart-btn" style="flex: 1; min-width: 150px; max-width: 200px; padding: 15px 20px; font-size: 1.1rem; text-align: center; box-sizing: border-box; background-color: var(--color-gold); color: var(--color-black); font-weight: bold; text-decoration: none; border-radius: 4px;">ADD</a>
                <a href="mailto:info@zabsiam.co.uk?subject=Inquiry:%20Signature%20Box" class="add-to-cart-btn" style="flex: 1; min-width: 200px; max-width: 250px; padding: 15px 20px; font-size: 1.1rem; text-align: center; box-sizing: border-box; background-color: transparent; border: 2px solid var(--color-gold); color: var(--color-gold); font-weight: bold; text-decoration: none; border-radius: 4px;">Enquire to Customize</a>
            </div>`;

    if (html.includes(oldContent)) {
        html = html.replace(oldContent, newContent);
        fs.writeFileSync(targetPath, html, 'utf8');
        fs.copyFileSync(targetPath, 'C:/Users/KENDEE/Desktop/เว็บ/public/lunch-box.html');
        console.log("Updated lunch-box.html");
    } else {
        console.log("Error: oldContent not found");
    }
}
