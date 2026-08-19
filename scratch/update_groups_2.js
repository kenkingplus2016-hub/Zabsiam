const fs = require('fs');
const path = require('path');

const filePath1 = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/index.html';
const filePath2 = 'C:/Users/KENDEE/Desktop/เว็บ/public/index.html';

function replaceCateringSection(filePath) {
    if (!fs.existsSync(filePath)) return;
    
    let html = fs.readFileSync(filePath, 'utf8');

    // Use regex to find and replace the entire grid
    const regex = /<div class="events-grid" style="display: grid; grid-template-columns: repeat\(auto-fit, minmax\(280px, 1fr\)\); gap: 2rem;">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/;
    
    const newGridHtml = `<div class="events-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
                
                <!-- Group 1: Corporate Event Catering -->
                <div class="event-card" style="background-color: rgba(20, 20, 20, 0.8); border: 1px solid var(--color-gold); border-radius: 8px; padding: 2rem 1.5rem; text-align: center; box-shadow: 0 4px 15px rgba(255, 215, 0, 0.05); transition: transform 0.3s ease, box-shadow 0.3s ease;">
                    <i class="fas fa-building" style="font-size: 2.5rem; color: var(--color-gold); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--color-white); font-size: 1.1rem; line-height: 1.4;">Corporate Event Catering</h3>
                    <p style="color: #ccc; font-size: 0.95rem; margin-top: 12px; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 12px;">Starting from &pound;25 per Guest<br/><span style="color: var(--color-gold); font-size: 0.85rem;">Minimum 80 Guests</span></p>
                    <div style="text-align: left; margin-top: 15px; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 5px;">
                        <p style="color: #ddd; font-size: 0.85rem; line-height: 1.5; margin: 0;">Impress your clients and team with our 8-course Thai banquet. Perfect for product launches, gallery openings, and company parties.</p>
                    </div>
                    <div style="margin-top: 20px;">
                        <a href="#menu" class="add-to-cart-btn" style="padding: 10px 20px; font-size: 0.95rem; width: 100%; display: inline-block; box-sizing: border-box; background-color: var(--color-gold); color: var(--color-black); font-weight: bold; text-decoration: none;">View Banquet Menus</a>
                    </div>
                </div>

                <!-- Group 2: Wedding & Private Parties -->
                <div class="event-card" style="background-color: rgba(20, 20, 20, 0.8); border: 1px solid var(--color-gold); border-radius: 8px; padding: 2rem 1.5rem; text-align: center; box-shadow: 0 4px 15px rgba(255, 215, 0, 0.05); transition: transform 0.3s ease, box-shadow 0.3s ease;">
                    <i class="fas fa-rings" style="font-size: 2.5rem; color: var(--color-gold); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--color-white); font-size: 1.1rem; line-height: 1.4;">Wedding & Private Parties</h3>
                    <p style="color: #ccc; font-size: 0.95rem; margin-top: 12px; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 12px;">Starting from &pound;25 per Guest<br/><span style="color: var(--color-gold); font-size: 0.85rem;">Minimum 80 Guests</span></p>
                    <div style="text-align: left; margin-top: 15px; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 5px;">
                        <p style="color: #ddd; font-size: 0.85rem; line-height: 1.5; margin: 0;">Make your special day unforgettable with authentic Thai cuisine. Elegant 8-course sets designed for weddings and milestone birthdays.</p>
                    </div>
                    <div style="margin-top: 20px;">
                        <a href="#menu" class="add-to-cart-btn" style="padding: 10px 20px; font-size: 0.95rem; width: 100%; display: inline-block; box-sizing: border-box; background-color: var(--color-gold); color: var(--color-black); font-weight: bold; text-decoration: none;">View Banquet Menus</a>
                    </div>
                </div>
                
                <!-- Group 3: Meeting Meals -->
                <div class="event-card" style="background-color: rgba(20, 20, 20, 0.8); border: 1px solid var(--color-gold); border-radius: 8px; padding: 2rem 1.5rem; text-align: center; box-shadow: 0 4px 15px rgba(255, 215, 0, 0.05); transition: transform 0.3s ease, box-shadow 0.3s ease;">
                    <i class="fas fa-handshake" style="font-size: 2.5rem; color: var(--color-gold); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--color-white); font-size: 1.1rem; line-height: 1.4;">Meeting Meals</h3>
                    <p style="color: #ccc; font-size: 0.95rem; margin-top: 12px; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 12px;">Starting from &pound;20 per Guest<br/><span style="color: var(--color-gold); font-size: 0.85rem;">Buffet & Platter Style</span></p>
                    <div style="text-align: left; margin-top: 15px; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 5px;">
                        <p style="color: #ddd; font-size: 0.85rem; line-height: 1.5; margin: 0;">Premium shared platters and buffet-style setups designed for boardroom meetings and team lunches.</p>
                    </div>
                    <div style="margin-top: 20px;">
                        <a href="mailto:info@zabsiam.co.uk?subject=Inquiry:%20Meeting%20Meals" class="add-to-cart-btn" style="padding: 10px 20px; font-size: 0.95rem; width: 100%; display: inline-block; box-sizing: border-box; background-color: transparent; border: 2px solid var(--color-gold); color: var(--color-gold); font-weight: bold; text-decoration: none;">Enquire to Customize</a>
                    </div>
                </div>
                
                <!-- Group 4: Coffee Break -->
                <div class="event-card" style="background-color: rgba(20, 20, 20, 0.8); border: 1px solid var(--color-gold); border-radius: 8px; padding: 2rem 1.5rem; text-align: center; box-shadow: 0 4px 15px rgba(255, 215, 0, 0.05); transition: transform 0.3s ease, box-shadow 0.3s ease;">
                    <i class="fas fa-coffee" style="font-size: 2.5rem; color: var(--color-gold); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--color-white); font-size: 1.1rem; line-height: 1.4;">Coffee Break</h3>
                    <p style="color: #ccc; font-size: 0.95rem; margin-top: 12px; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 12px;">Starting from &pound;10 per Guest<br/><span style="color: var(--color-gold); font-size: 0.85rem;">Snacks & Beverages</span></p>
                    <div style="text-align: left; margin-top: 15px; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 5px;">
                        <p style="color: #ddd; font-size: 0.85rem; line-height: 1.5; margin: 0;">Perfect for morning or afternoon breaks. Includes authentic Thai sweet & savory snacks, tea, and coffee.</p>
                    </div>
                    <div style="margin-top: 20px;">
                        <a href="mailto:info@zabsiam.co.uk?subject=Inquiry:%20Coffee%20Break" class="add-to-cart-btn" style="padding: 10px 20px; font-size: 0.95rem; width: 100%; display: inline-block; box-sizing: border-box; background-color: transparent; border: 2px solid var(--color-gold); color: var(--color-gold); font-weight: bold; text-decoration: none;">Enquire to Customize</a>
                    </div>
                </div>

                <!-- Group 5: Lunch Box -->
                <div class="event-card" style="background-color: rgba(20, 20, 20, 0.8); border: 1px solid var(--color-gold); border-radius: 8px; padding: 2rem 1.5rem; text-align: center; box-shadow: 0 4px 15px rgba(255, 215, 0, 0.05); transition: transform 0.3s ease, box-shadow 0.3s ease;">
                    <i class="fas fa-box-open" style="font-size: 2.5rem; color: var(--color-gold); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--color-white); font-size: 1.1rem; line-height: 1.4;">Lunch Box</h3>
                    <p style="color: #ccc; font-size: 0.95rem; margin-top: 12px; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 12px;">Starting from &pound;15 per Box<br/><span style="color: var(--color-gold); font-size: 0.85rem;">Individual Portions</span></p>
                    <div style="text-align: left; margin-top: 15px; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 5px;">
                        <p style="color: #ddd; font-size: 0.85rem; line-height: 1.5; margin: 0;">Individual, premium packed Thai meals for convenience and hygiene. Ideal for studio shoots or quick lunches.</p>
                    </div>
                    <div style="margin-top: 20px;">
                        <a href="mailto:info@zabsiam.co.uk?subject=Inquiry:%20Lunch%20Box" class="add-to-cart-btn" style="padding: 10px 20px; font-size: 0.95rem; width: 100%; display: inline-block; box-sizing: border-box; background-color: transparent; border: 2px solid var(--color-gold); color: var(--color-gold); font-weight: bold; text-decoration: none;">Enquire to Customize</a>
                    </div>
                </div>

            </div>
        </div>
    </section>`;

    html = html.replace(regex, newGridHtml);

    fs.writeFileSync(filePath, html, 'utf8');
    console.log("Updated", filePath);
}

replaceCateringSection(filePath1);
replaceCateringSection(filePath2);
