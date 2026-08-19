const fs = require('fs');
const path = require('path');

const targetPath = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/coffee-break.html';

if (fs.existsSync(targetPath)) {
    let html = fs.readFileSync(targetPath, 'utf8');
    
    const oldText = `<div style="text-align: center; margin-top: 20px; padding: 20px;">
                <p style="color: #ddd; font-size: 1.1rem; line-height: 1.6; margin: 0;">Perfect for morning or afternoon breaks. Includes authentic Thai sweet & savory snacks, tea, and coffee.</p>
            </div>
            <div style="margin-top: 30px;">
                <a href="mailto:info@zabsiam.co.uk?subject=Inquiry:%20Coffee%20Break" class="add-to-cart-btn" style="padding: 15px 30px; font-size: 1.1rem; display: inline-block; box-sizing: border-box; background-color: var(--color-gold); color: var(--color-black); font-weight: bold; text-decoration: none; border-radius: 4px;">Enquire to Customize</a>
            </div>`;
            
    const newText = `<div style="text-align: center; margin-top: 20px; padding: 20px 20px 0 20px;">
                <p style="color: #ddd; font-size: 1.1rem; line-height: 1.6; margin: 0; margin-bottom: 15px;">Perfect for morning or afternoon breaks. Includes authentic Thai sweet & savory snacks, tea, and coffee.</p>
                <p style="color: #aaa; font-size: 0.9rem; line-height: 1.4;">*Booking Conditions: Minimum 20 guests required. 14 days advance booking.</p>
            </div>
            <div style="margin-top: 20px; display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <a href="#" onclick="event.preventDefault(); addToCart('Coffee Break Package (20 Guests Base)', 200, 'images/main_coffee_break.jpg')" class="add-to-cart-btn" style="flex: 1; min-width: 150px; max-width: 200px; padding: 15px 20px; font-size: 1.1rem; text-align: center; box-sizing: border-box; background-color: var(--color-gold); color: var(--color-black); font-weight: bold; text-decoration: none; border-radius: 4px;">ADD</a>
                <a href="mailto:info@zabsiam.co.uk?subject=Inquiry:%20Coffee%20Break" class="add-to-cart-btn" style="flex: 1; min-width: 200px; max-width: 250px; padding: 15px 20px; font-size: 1.1rem; text-align: center; box-sizing: border-box; background-color: transparent; border: 2px solid var(--color-gold); color: var(--color-gold); font-weight: bold; text-decoration: none; border-radius: 4px;">Enquire to Customize</a>
            </div>`;

    html = html.replace(oldText, newText);
    
    fs.writeFileSync(targetPath, html, 'utf8');
    
    // Copy to Desktop
    const desktopPath = 'C:/Users/KENDEE/Desktop/เว็บ/public/coffee-break.html';
    fs.copyFileSync(targetPath, desktopPath);
    
    console.log("Updated coffee-break.html with new buttons and conditions.");
}
