const fs = require('fs');

const htmlPath = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const eventCateringSection = `
    <!-- Event Catering Section -->
    <section id="zabsiam-street-food" class="catering-section" style="padding: 4rem 1rem; background-color: var(--color-black);">
        <div class="container">
            <div class="section-header" style="text-align: center; margin-bottom: 3rem;">
                <h2 style="color: var(--color-gold); font-family: 'Cinzel', serif; font-size: 2.5rem; margin-bottom: 0.5rem; letter-spacing: 2px;">Event Catering</h2>
                <p style="color: #FFD700; font-size: 1.2rem; margin-top: 10px;">รับจัดเลี้ยงนอกสถานที่ สำหรับแขกตั้งแต่ 80 ท่านขึ้นไป</p>
                <div class="header-line" style="width: 100px; height: 2px; background-color: var(--color-gold); margin: 15px auto;"></div>
            </div>
            
            <div class="event-card-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
                <!-- Card 1 -->
                <div class="event-card" style="background-color: rgba(20, 20, 20, 0.8); border: 1px solid var(--color-gold); border-radius: 8px; padding: 2rem 1.5rem; text-align: center; box-shadow: 0 4px 15px rgba(255, 215, 0, 0.05); transition: transform 0.3s ease, box-shadow 0.3s ease;">
                    <i class="fas fa-glass-cheers" style="font-size: 2.5rem; color: var(--color-gold); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--color-white); font-size: 1.1rem; line-height: 1.4;">Intimate Birthday Celebration</h3>
                </div>
                
                <!-- Card 2 -->
                <div class="event-card" style="background-color: rgba(20, 20, 20, 0.8); border: 1px solid var(--color-gold); border-radius: 8px; padding: 2rem 1.5rem; text-align: center; box-shadow: 0 4px 15px rgba(255, 215, 0, 0.05); transition: transform 0.3s ease, box-shadow 0.3s ease;">
                    <i class="fas fa-palette" style="font-size: 2.5rem; color: var(--color-gold); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--color-white); font-size: 1.1rem; line-height: 1.4;">Art Gallery Opening Catering</h3>
                </div>
                
                <!-- Card 3 -->
                <div class="event-card" style="background-color: rgba(20, 20, 20, 0.8); border: 1px solid var(--color-gold); border-radius: 8px; padding: 2rem 1.5rem; text-align: center; box-shadow: 0 4px 15px rgba(255, 215, 0, 0.05); transition: transform 0.3s ease, box-shadow 0.3s ease;">
                    <i class="fas fa-city" style="font-size: 2.5rem; color: var(--color-gold); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--color-white); font-size: 1.1rem; line-height: 1.4;">City Corporate Launch</h3>
                </div>
                
                <!-- Card 4 -->
                <div class="event-card" style="background-color: rgba(20, 20, 20, 0.8); border: 1px solid var(--color-gold); border-radius: 8px; padding: 2rem 1.5rem; text-align: center; box-shadow: 0 4px 15px rgba(255, 215, 0, 0.05); transition: transform 0.3s ease, box-shadow 0.3s ease;">
                    <i class="fas fa-ring" style="font-size: 2.5rem; color: var(--color-gold); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--color-white); font-size: 1.1rem; line-height: 1.4;">Wedding Summer Food Festival Style</h3>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 3rem;">
                <a href="mailto:info@zabsiam.co.uk?subject=Event%20Catering%20Inquiry" class="add-to-cart-btn" style="padding: 12px 30px; font-size: 1.1rem;">Contact Us for Your Event</a>
            </div>
        </div>
    </section>
`;

if (!html.includes('id="zabsiam-street-food"')) {
    html = html.replace('<section id="menu"', eventCateringSection + '\n    <section id="menu"');
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log("Successfully added Event Catering section.");
} else {
    console.log("Section already exists.");
}

