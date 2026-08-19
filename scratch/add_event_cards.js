const fs = require('fs');
const path = require('path');

const targetPath = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/event-catering.html';

if (fs.existsSync(targetPath)) {
    let html = fs.readFileSync(targetPath, 'utf8');
    
    // We want to insert the 4 cards right after the </section> of the main header.
    // The main header section ends with </section>. We will find the first </section> after the header content
    
    const cardsHtml = `
    <!-- Event Types Grid -->
    <section style="padding: 40px 20px 80px 20px; background-color: var(--color-black);">
        <div class="container">
            <h2 style="color: var(--color-gold); text-align: center; margin-bottom: 3rem; font-size: 2rem;">Events We Cater</h2>
            <div class="event-card-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
                
                <!-- Card 1 -->
                <div class="event-card" style="background-color: rgba(20, 20, 20, 0.8); border: 1px solid var(--color-gold); border-radius: 8px; padding: 2rem 1.5rem; text-align: center; box-shadow: 0 4px 15px rgba(255, 215, 0, 0.05); transition: transform 0.3s ease, box-shadow 0.3s ease;">
                    <i class="fas fa-birthday-cake" style="font-size: 2.5rem; color: var(--color-gold); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--color-white); font-size: 1.1rem; line-height: 1.4;">Intimate Birthday Celebration</h3>
                    <p style="color: #ccc; font-size: 0.95rem; margin-top: 12px; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 12px;">Make your milestone birthdays unforgettable with authentic flavors.</p>
                </div>
                
                <!-- Card 2 -->
                <div class="event-card" style="background-color: rgba(20, 20, 20, 0.8); border: 1px solid var(--color-gold); border-radius: 8px; padding: 2rem 1.5rem; text-align: center; box-shadow: 0 4px 15px rgba(255, 215, 0, 0.05); transition: transform 0.3s ease, box-shadow 0.3s ease;">
                    <i class="fas fa-ring" style="font-size: 2.5rem; color: var(--color-gold); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--color-white); font-size: 1.1rem; line-height: 1.4;">Wedding Summer Food Festival</h3>
                    <p style="color: #ccc; font-size: 0.95rem; margin-top: 12px; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 12px;">A vibrant, festival-style catering experience for your special day.</p>
                </div>
                
                <!-- Card 3 -->
                <div class="event-card" style="background-color: rgba(20, 20, 20, 0.8); border: 1px solid var(--color-gold); border-radius: 8px; padding: 2rem 1.5rem; text-align: center; box-shadow: 0 4px 15px rgba(255, 215, 0, 0.05); transition: transform 0.3s ease, box-shadow 0.3s ease;">
                    <i class="fas fa-building" style="font-size: 2.5rem; color: var(--color-gold); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--color-white); font-size: 1.1rem; line-height: 1.4;">City Corporate Launch</h3>
                    <p style="color: #ccc; font-size: 0.95rem; margin-top: 12px; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 12px;">Impress your clients and team with our premium corporate catering.</p>
                </div>
                
                <!-- Card 4 -->
                <div class="event-card" style="background-color: rgba(20, 20, 20, 0.8); border: 1px solid var(--color-gold); border-radius: 8px; padding: 2rem 1.5rem; text-align: center; box-shadow: 0 4px 15px rgba(255, 215, 0, 0.05); transition: transform 0.3s ease, box-shadow 0.3s ease;">
                    <i class="fas fa-palette" style="font-size: 2.5rem; color: var(--color-gold); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--color-white); font-size: 1.1rem; line-height: 1.4;">Art Gallery Opening</h3>
                    <p style="color: #ccc; font-size: 0.95rem; margin-top: 12px; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 12px;">Elegant Thai canapés and dishes perfect for sophisticated gatherings.</p>
                </div>
                
            </div>
        </div>
    </section>
    `;

    // The file has a section at the top, then <footer id="contact">
    // We will inject the cards right before the footer.
    const footerRegex = /(<footer id="contact">)/;
    html = html.replace(footerRegex, cardsHtml + '\n    $1');

    fs.writeFileSync(targetPath, html, 'utf8');
    
    // Copy to Desktop
    const desktopPath = 'C:/Users/KENDEE/Desktop/เว็บ/public/event-catering.html';
    fs.copyFileSync(targetPath, desktopPath);
    
    console.log("Added 4 event cards to event-catering.html");
}
