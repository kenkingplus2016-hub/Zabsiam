const fs = require('fs');
const path = require('path');

const targetPath = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/meeting-meals.html';

if (fs.existsSync(targetPath)) {
    let html = fs.readFileSync(targetPath, 'utf8');
    
    const oldText = `<div style="text-align: center; margin-top: 20px; padding: 20px;">
                <p style="color: #ddd; font-size: 1.1rem; line-height: 1.6; margin: 0;">Premium shared platters and buffet-style setups designed for boardroom meetings and team lunches.</p>
            </div>
            <div style="margin-top: 30px;">
                <a href="mailto:info@zabsiam.co.uk?subject=Inquiry:%20Meeting%20Meals" class="add-to-cart-btn" style="padding: 15px 30px; font-size: 1.1rem; display: inline-block; box-sizing: border-box; background-color: var(--color-gold); color: var(--color-black); font-weight: bold; text-decoration: none; border-radius: 4px;">Enquire to Customize</a>
            </div>`;
            
    const newText = `<div style="text-align: center; margin-top: 20px; padding: 20px 20px 0 20px;">
                <p style="color: #ddd; font-size: 1.1rem; line-height: 1.6; margin: 0; margin-bottom: 15px;">Premium shared platters and buffet-style setups designed for boardroom meetings and team lunches.</p>
                <p style="color: #aaa; font-size: 0.9rem; line-height: 1.4;">*Booking Conditions: Minimum 15 guests required. 7 days advance booking.</p>
            </div>
            <div style="margin-top: 20px; display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <a href="#" onclick="event.preventDefault(); addToCart('Meeting Meals Buffet (15 Guests Base)', 300, 'images/main_meeting_meals.jpg')" class="add-to-cart-btn" style="flex: 1; min-width: 150px; max-width: 200px; padding: 15px 20px; font-size: 1.1rem; text-align: center; box-sizing: border-box; background-color: var(--color-gold); color: var(--color-black); font-weight: bold; text-decoration: none; border-radius: 4px;">ADD</a>
                <a href="mailto:info@zabsiam.co.uk?subject=Inquiry:%20Meeting%20Meals" class="add-to-cart-btn" style="flex: 1; min-width: 200px; max-width: 250px; padding: 15px 20px; font-size: 1.1rem; text-align: center; box-sizing: border-box; background-color: transparent; border: 2px solid var(--color-gold); color: var(--color-gold); font-weight: bold; text-decoration: none; border-radius: 4px;">Enquire to Customize</a>
            </div>`;

    if (html.includes(oldText)) {
        html = html.replace(oldText, newText);
        fs.writeFileSync(targetPath, html, 'utf8');
        
        // Copy to Desktop folder
        const desktopPath = 'C:/Users/KENDEE/Desktop/เว็บ/public/meeting-meals.html';
        fs.copyFileSync(targetPath, desktopPath);
        
        console.log("Updated meeting-meals.html with new buttons and conditions.");
    } else {
        console.log("Error: oldText not found.");
    }
}
