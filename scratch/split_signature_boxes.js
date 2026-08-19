const fs = require('fs');
const path = require('path');

const targetPath = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/lunch-box.html';

if (fs.existsSync(targetPath)) {
    let html = fs.readFileSync(targetPath, 'utf8');
    
    // We will use regex to replace the entire <section> containing the old single box.
    const sectionRegex = /<section style="padding: 120px 20px 60px 20px; background-color: var\(--color-black\); min-height: 60vh; text-align: center;">[\s\S]*?<\/section>/;
    
    const newSection = `<section style="padding: 120px 20px 60px 20px; background-color: var(--color-black); min-height: 60vh; text-align: center;">
        <h2 style="color: var(--color-gold); font-size: 2.5rem; margin-bottom: 2rem;">Signature Boxes</h2>
        <div class="container" style="display: flex; gap: 30px; justify-content: center; flex-wrap: wrap; max-width: 1000px; margin: 0 auto;">
            
            <!-- Box 1 -->
            <div style="flex: 1; min-width: 300px; background-color: rgba(20, 20, 20, 0.8); border: 1px solid var(--color-gold); border-radius: 8px; padding: 2rem; box-shadow: 0 4px 15px rgba(255, 215, 0, 0.05);">
                <i class="fas fa-box" style="font-size: 3rem; color: var(--color-gold); margin-bottom: 1.5rem;"></i>
                <h3 style="color: var(--color-gold); font-size: 1.8rem; margin-bottom: 1rem;">Crispy Pork Belly with Rice</h3>
                <p style="color: #ccc; font-size: 1.1rem; margin-top: 12px; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 15px;">Starting from &pound;15 per Box</p>
                <div style="text-align: center; margin-top: 15px; padding: 10px;">
                    <p style="color: #ddd; font-size: 1rem; line-height: 1.6; margin: 0; margin-bottom: 15px;">Premium packed authentic Thai crispy pork belly over rice. Perfect for individual meals.</p>
                    <p style="color: #aaa; font-size: 0.85rem; line-height: 1.4;">*Booking Conditions: Minimum 15 boxes required. 7 days advance booking.</p>
                </div>
                <div style="margin-top: 20px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                    <a href="#" onclick="event.preventDefault(); addToCart('Signature Box: Crispy Pork Belly (15 Boxes)', 225, 'images/zabsiam_logo_transparent.png')" class="add-to-cart-btn" style="flex: 1; padding: 12px 15px; font-size: 1rem; text-align: center; background-color: var(--color-gold); color: var(--color-black); font-weight: bold; text-decoration: none; border-radius: 4px;">ADD</a>
                    <a href="mailto:info@zabsiam.co.uk?subject=Inquiry:%20Signature%20Box" class="add-to-cart-btn" style="flex: 1; padding: 12px 15px; font-size: 1rem; text-align: center; background-color: transparent; border: 2px solid var(--color-gold); color: var(--color-gold); font-weight: bold; text-decoration: none; border-radius: 4px;">Enquire</a>
                </div>
            </div>

            <!-- Box 2 -->
            <div style="flex: 1; min-width: 300px; background-color: rgba(20, 20, 20, 0.8); border: 1px solid var(--color-gold); border-radius: 8px; padding: 2rem; box-shadow: 0 4px 15px rgba(255, 215, 0, 0.05);">
                <i class="fas fa-leaf" style="font-size: 3rem; color: var(--color-gold); margin-bottom: 1.5rem;"></i>
                <h3 style="color: var(--color-gold); font-size: 1.8rem; margin-bottom: 1rem;">Mango Sticky Rice</h3>
                <p style="color: #ccc; font-size: 1.1rem; margin-top: 12px; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 15px;">Starting from &pound;8 per Box</p>
                <div style="text-align: center; margin-top: 15px; padding: 10px;">
                    <p style="color: #ddd; font-size: 1rem; line-height: 1.6; margin: 0; margin-bottom: 15px;">Sweet, fresh mango served with authentic Thai coconut sticky rice. A delightful premium dessert box.</p>
                    <p style="color: #aaa; font-size: 0.85rem; line-height: 1.4;">*Booking Conditions: Minimum 15 boxes required. 7 days advance booking.</p>
                </div>
                <div style="margin-top: 20px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                    <a href="#" onclick="event.preventDefault(); addToCart('Signature Box: Mango Sticky Rice (15 Boxes)', 120, 'images/zabsiam_logo_transparent.png')" class="add-to-cart-btn" style="flex: 1; padding: 12px 15px; font-size: 1rem; text-align: center; background-color: var(--color-gold); color: var(--color-black); font-weight: bold; text-decoration: none; border-radius: 4px;">ADD</a>
                    <a href="mailto:info@zabsiam.co.uk?subject=Inquiry:%20Signature%20Box" class="add-to-cart-btn" style="flex: 1; padding: 12px 15px; font-size: 1rem; text-align: center; background-color: transparent; border: 2px solid var(--color-gold); color: var(--color-gold); font-weight: bold; text-decoration: none; border-radius: 4px;">Enquire</a>
                </div>
            </div>

        </div>
    </section>`;

    html = html.replace(sectionRegex, newSection);
    
    fs.writeFileSync(targetPath, html, 'utf8');
    fs.copyFileSync(targetPath, 'C:/Users/KENDEE/Desktop/เว็บ/public/lunch-box.html');
    console.log("Updated lunch-box.html with two separate boxes.");
}
