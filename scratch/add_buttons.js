const fs = require('fs');
const path = require('path');

const targetPath = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/event-catering.html';

if (fs.existsSync(targetPath)) {
    let html = fs.readFileSync(targetPath, 'utf8');
    
    // We want to add this block right after the Sample Menu div inside each event-card.
    // The Sample Menu div ends with: </ul>\n                    </div>
    // We will replace that ending with the new pricing and buttons, plus the ending </div>.
    
    const block1 = `</ul>
                    </div>
                    <div style="margin-top: 15px; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 15px;">
                        <p style="color: var(--color-gold); font-size: 1.1rem; font-weight: bold; margin-bottom: 5px;">Starting from &pound;25 per Guest</p>
                        <p style="color: #aaa; font-size: 0.8rem; margin-bottom: 15px; line-height: 1.4;">*Booking Conditions: Minimum 80 guests required. 14 days advance booking. 50% deposit required to secure the date.</p>
                        <div style="display: flex; gap: 10px;">
                            <a href="#" onclick="event.preventDefault(); addToCart('Event Catering: Intimate Birthday Celebration (80 Guests)', 2000, 'images/event_birthday.jpg')" class="add-to-cart-btn" style="flex: 1; padding: 10px; font-size: 0.9rem; background-color: var(--color-gold); color: var(--color-black); font-weight: bold; text-decoration: none; border-radius: 4px;">ADD</a>
                            <a href="mailto:info@zabsiam.co.uk?subject=Inquiry:%20Intimate%20Birthday%20Celebration" class="add-to-cart-btn" style="flex: 1; padding: 10px; font-size: 0.9rem; background-color: transparent; border: 1px solid var(--color-gold); color: var(--color-gold); font-weight: bold; text-decoration: none; border-radius: 4px;">Enquire to Customize</a>
                        </div>
                    </div>`;

    const block2 = `</ul>
                    </div>
                    <div style="margin-top: 15px; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 15px;">
                        <p style="color: var(--color-gold); font-size: 1.1rem; font-weight: bold; margin-bottom: 5px;">Starting from &pound;25 per Guest</p>
                        <p style="color: #aaa; font-size: 0.8rem; margin-bottom: 15px; line-height: 1.4;">*Booking Conditions: Minimum 80 guests required. 14 days advance booking. 50% deposit required to secure the date.</p>
                        <div style="display: flex; gap: 10px;">
                            <a href="#" onclick="event.preventDefault(); addToCart('Event Catering: Wedding Festival (80 Guests)', 2000, 'images/event_wedding.jpg')" class="add-to-cart-btn" style="flex: 1; padding: 10px; font-size: 0.9rem; background-color: var(--color-gold); color: var(--color-black); font-weight: bold; text-decoration: none; border-radius: 4px;">ADD</a>
                            <a href="mailto:info@zabsiam.co.uk?subject=Inquiry:%20Wedding%20Festival" class="add-to-cart-btn" style="flex: 1; padding: 10px; font-size: 0.9rem; background-color: transparent; border: 1px solid var(--color-gold); color: var(--color-gold); font-weight: bold; text-decoration: none; border-radius: 4px;">Enquire to Customize</a>
                        </div>
                    </div>`;

    const block3 = `</ul>
                    </div>
                    <div style="margin-top: 15px; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 15px;">
                        <p style="color: var(--color-gold); font-size: 1.1rem; font-weight: bold; margin-bottom: 5px;">Starting from &pound;25 per Guest</p>
                        <p style="color: #aaa; font-size: 0.8rem; margin-bottom: 15px; line-height: 1.4;">*Booking Conditions: Minimum 80 guests required. 14 days advance booking. 50% deposit required to secure the date.</p>
                        <div style="display: flex; gap: 10px;">
                            <a href="#" onclick="event.preventDefault(); addToCart('Event Catering: City Corporate Launch (80 Guests)', 2000, 'images/event_corporate.jpg')" class="add-to-cart-btn" style="flex: 1; padding: 10px; font-size: 0.9rem; background-color: var(--color-gold); color: var(--color-black); font-weight: bold; text-decoration: none; border-radius: 4px;">ADD</a>
                            <a href="mailto:info@zabsiam.co.uk?subject=Inquiry:%20City%20Corporate%20Launch" class="add-to-cart-btn" style="flex: 1; padding: 10px; font-size: 0.9rem; background-color: transparent; border: 1px solid var(--color-gold); color: var(--color-gold); font-weight: bold; text-decoration: none; border-radius: 4px;">Enquire to Customize</a>
                        </div>
                    </div>`;

    const block4 = `</ul>
                    </div>
                    <div style="margin-top: 15px; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 15px;">
                        <p style="color: var(--color-gold); font-size: 1.1rem; font-weight: bold; margin-bottom: 5px;">Starting from &pound;25 per Guest</p>
                        <p style="color: #aaa; font-size: 0.8rem; margin-bottom: 15px; line-height: 1.4;">*Booking Conditions: Minimum 80 guests required. 14 days advance booking. 50% deposit required to secure the date.</p>
                        <div style="display: flex; gap: 10px;">
                            <a href="#" onclick="event.preventDefault(); addToCart('Event Catering: Executive & VIP Gatherings (80 Guests)', 2000, 'images/event_gallery.jpg')" class="add-to-cart-btn" style="flex: 1; padding: 10px; font-size: 0.9rem; background-color: var(--color-gold); color: var(--color-black); font-weight: bold; text-decoration: none; border-radius: 4px;">ADD</a>
                            <a href="mailto:info@zabsiam.co.uk?subject=Inquiry:%20Executive%20Gatherings" class="add-to-cart-btn" style="flex: 1; padding: 10px; font-size: 0.9rem; background-color: transparent; border: 1px solid var(--color-gold); color: var(--color-gold); font-weight: bold; text-decoration: none; border-radius: 4px;">Enquire to Customize</a>
                        </div>
                    </div>`;

    // To safely replace each one, we can split the file by '</ul>\n                    </div>'
    // Since there are 4 event cards, there will be 4 such occurrences.
    
    let parts = html.split(/<\/ul>\s*<\/div>/);
    if (parts.length === 5) {
        html = parts[0] + block1 + parts[1] + block2 + parts[2] + block3 + parts[3] + block4 + parts[4];
        fs.writeFileSync(targetPath, html, 'utf8');
        
        // Copy to Desktop
        const desktopPath = 'C:/Users/KENDEE/Desktop/เว็บ/public/event-catering.html';
        fs.copyFileSync(targetPath, desktopPath);
        console.log("Added price, buttons, and booking conditions.");
    } else {
        console.log("Error: Expected 4 closing menu divs, found " + (parts.length - 1));
    }
}
