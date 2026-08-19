const fs = require('fs');
const path = require('path');

const targetPath = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/event-catering.html';

if (fs.existsSync(targetPath)) {
    let html = fs.readFileSync(targetPath, 'utf8');
    
    const sampleMenuHtml = `
                    <div style="text-align: left; margin-top: 15px; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 5px;">
                        <p style="color: var(--color-gold); font-size: 0.9rem; margin-bottom: 8px; font-weight: bold; text-align: center;">Sample Menu Included:</p>
                        <ul style="color: #ddd; font-size: 0.8rem; line-height: 1.5; margin: 0; padding-left: 20px;">
                            <li>Prawn Spring Rolls (Kung Hom Sabai)</li>
                            <li>Northern Thai Sausage (Sai Ua)</li>
                            <li>Fish Maw Soup (Kra Pho Pla)</li>
                            <li>Grilled Pork Neck (Kor Moo Yang)</li>
                            <li>Pad Thai with Prawns (Pad Thai Goong)</li>
                            <li>Beef Massaman Curry (Massaman Neua)</li>
                            <li>Chicken Fried Rice (Khao Pad Gai)</li>
                            <li>Mango Sticky Rice (Khao Niao Mamuang)</li>
                        </ul>
                    </div>
    `;

    // We will inject this before the closing </div> of each event-card.
    // However, event-card divs close with </div>.
    // It's safer to just replace the description <p> tags and append the menu after them.

    // 1. Birthday
    html = html.replace(
        '<p style="color: #ccc; font-size: 0.95rem; margin-top: 12px; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 12px;">Make your milestone birthdays unforgettable with authentic flavors.</p>',
        '<p style="color: #ccc; font-size: 0.95rem; margin-top: 12px; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 12px;">Make your milestone birthdays unforgettable with authentic flavors.</p>' + sampleMenuHtml
    );

    // 2. Wedding
    html = html.replace(
        '<p style="color: #ccc; font-size: 0.95rem; margin-top: 12px; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 12px;">A vibrant, festival-style catering experience for your special day.</p>',
        '<p style="color: #ccc; font-size: 0.95rem; margin-top: 12px; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 12px;">A vibrant, festival-style catering experience for your special day.</p>' + sampleMenuHtml
    );
    
    // 3. Corporate
    html = html.replace(
        '<p style="color: #ccc; font-size: 0.95rem; margin-top: 12px; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 12px;">Impress your clients and team with our premium corporate catering.</p>',
        '<p style="color: #ccc; font-size: 0.95rem; margin-top: 12px; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 12px;">Impress your clients and team with our premium corporate catering.</p>' + sampleMenuHtml
    );
    
    // 4. VIP Gatherings (was Art Gallery Opening)
    html = html.replace(
        '<p style="color: #ccc; font-size: 0.95rem; margin-top: 12px; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 12px;">Elegant Thai canapés and premium service tailored for high-end corporate and VIP events.</p>',
        '<p style="color: #ccc; font-size: 0.95rem; margin-top: 12px; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 12px;">Elegant Thai canapés and premium service tailored for high-end corporate and VIP events.</p>' + sampleMenuHtml
    );

    fs.writeFileSync(targetPath, html, 'utf8');
    
    // Copy to Desktop
    const desktopPath = 'C:/Users/KENDEE/Desktop/เว็บ/public/event-catering.html';
    fs.copyFileSync(targetPath, desktopPath);
    
    console.log("Added sample menus to event-catering.html");
}
