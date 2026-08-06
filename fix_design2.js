const fs = require('fs');

const filePath = 'public/royal.html';
let html = fs.readFileSync(filePath, 'utf8');

// Find the start of the section to replace
const startMarker = '<section style="position: relative; padding: 100px 20px; background-image: url(\'images/premium_kitchen_bg.jpg\');';
const endMarker = '    <section class="reviews-section">';

const startIndex = html.indexOf(startMarker);
const endIndex = html.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
    console.error('Could not find the section to replace.');
    process.exit(1);
}

const newSection = `    <section style="position: relative; padding: 90px 20px; background-color: #0D1F14; border-top: 1px solid rgba(212,175,55,0.2); border-bottom: 1px solid rgba(212,175,55,0.2); overflow: hidden;">
        <!-- Subtle Pattern Overlay -->
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: radial-gradient(rgba(212, 175, 55, 0.05) 1px, transparent 1px); background-size: 30px 30px; opacity: 0.5; pointer-events: none;"></div>
        
        <!-- Glow Effect -->
        <div style="position: absolute; top: -50px; left: 50%; transform: translateX(-50%); width: 60%; height: 200px; background: radial-gradient(ellipse, rgba(212, 175, 55, 0.1) 0%, transparent 70%); pointer-events: none;"></div>

        <div style="max-width: 1200px; margin: 0 auto; position: relative; z-index: 10;">
            <div style="text-align: center; margin-bottom: 60px;">
                <span style="display: inline-block; padding: 6px 18px; border: 1px solid rgba(212,175,55,0.5); border-radius: 30px; color: var(--gold, #D4AF37); font-size: 0.85rem; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 20px; background: rgba(212,175,55,0.05);">Professional Facilities</span>
                <h2 style="font-family: 'Playfair Display', serif; font-size: 3rem; color: #f5e6b8; margin: 0 0 20px; font-weight: 600;">State-of-the-Art Commercial Kitchen</h2>
                <div style="width: 60px; height: 3px; background: var(--gold, #D4AF37); margin: 0 auto 25px;"></div>
                <p style="color: rgba(255, 255, 255, 0.7); max-width: 700px; margin: 0 auto; line-height: 1.8; font-size: 1.1rem; font-weight: 300;">
                    To ensure impeccable quality and hygiene for your events, all Khrua Thai dishes are prepared in a premium shared commercial kitchen, equipped with industry-leading technology.
                </p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px;">
                <!-- Card 1 -->
                <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(212, 175, 55, 0.15); border-radius: 16px; padding: 45px 35px; text-align: center; transition: all 0.4s ease; box-shadow: 0 10px 30px rgba(0,0,0,0.2);" onmouseover="this.style.transform='translateY(-10px)'; this.style.background='rgba(255,255,255,0.05)'; this.style.borderColor='rgba(212, 175, 55, 0.5)'; this.style.boxShadow='0 15px 40px rgba(212,175,55,0.1)';" onmouseout="this.style.transform='translateY(0)'; this.style.background='rgba(255,255,255,0.02)'; this.style.borderColor='rgba(212, 175, 55, 0.15)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.2)';">
                    <div style="width: 80px; height: 80px; margin: 0 auto 25px; background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; color: var(--gold, #D4AF37); transition: all 0.4s ease;"><i class="fas fa-fire"></i></div>
                    <h3 style="color: #f5e6b8; font-size: 1.4rem; margin-bottom: 15px; font-family: 'Playfair Display', serif;">Advanced Cooking</h3>
                    <p style="color: rgba(255,255,255,0.6); font-size: 0.95rem; line-height: 1.6;">Featuring <strong style="color: rgba(255,255,255,0.85);">Rational Combi Ovens</strong> and <strong style="color: rgba(255,255,255,0.85);">iVario Cooking Centres</strong> for precise temperature control, alongside Heavy Duty Gas Burners and Bratt Pans.</p>
                </div>
                <!-- Card 2 -->
                <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(212, 175, 55, 0.15); border-radius: 16px; padding: 45px 35px; text-align: center; transition: all 0.4s ease; box-shadow: 0 10px 30px rgba(0,0,0,0.2);" onmouseover="this.style.transform='translateY(-10px)'; this.style.background='rgba(255,255,255,0.05)'; this.style.borderColor='rgba(212, 175, 55, 0.5)'; this.style.boxShadow='0 15px 40px rgba(212,175,55,0.1)';" onmouseout="this.style.transform='translateY(0)'; this.style.background='rgba(255,255,255,0.02)'; this.style.borderColor='rgba(212, 175, 55, 0.15)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.2)';">
                    <div style="width: 80px; height: 80px; margin: 0 auto 25px; background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; color: var(--gold, #D4AF37); transition: all 0.4s ease;"><i class="fas fa-bolt"></i></div>
                    <h3 style="color: #f5e6b8; font-size: 1.4rem; margin-bottom: 15px; font-family: 'Playfair Display', serif;">High-Volume Prep</h3>
                    <p style="color: rgba(255,255,255,0.6); font-size: 0.95rem; line-height: 1.6;">Equipped with <strong style="color: rgba(255,255,255,0.85);">10L, 30L & 40L High Volume Mixers</strong>, Food Processors, and Vacuum Packers to handle massive catering orders flawlessly.</p>
                </div>
                <!-- Card 3 -->
                <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(212, 175, 55, 0.15); border-radius: 16px; padding: 45px 35px; text-align: center; transition: all 0.4s ease; box-shadow: 0 10px 30px rgba(0,0,0,0.2);" onmouseover="this.style.transform='translateY(-10px)'; this.style.background='rgba(255,255,255,0.05)'; this.style.borderColor='rgba(212, 175, 55, 0.5)'; this.style.boxShadow='0 15px 40px rgba(212,175,55,0.1)';" onmouseout="this.style.transform='translateY(0)'; this.style.background='rgba(255,255,255,0.02)'; this.style.borderColor='rgba(212, 175, 55, 0.15)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.2)';">
                    <div style="width: 80px; height: 80px; margin: 0 auto 25px; background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; color: var(--gold, #D4AF37); transition: all 0.4s ease;"><i class="fas fa-snowflake"></i></div>
                    <h3 style="color: #f5e6b8; font-size: 1.4rem; margin-bottom: 15px; font-family: 'Playfair Display', serif;">Maximum Freshness</h3>
                    <p style="color: rgba(255,255,255,0.6); font-size: 0.95rem; line-height: 1.6;">Utilizing <strong style="color: rgba(255,255,255,0.85);">Blast Chillers & Freezers</strong> to immediately lock in the freshness, nutrients, and authentic taste of our premium ingredients.</p>
                </div>
            </div>
        </div>
    </section>\r\n\r\n`;

html = html.substring(0, startIndex) + newSection + html.substring(endIndex);
fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully replaced the section.');
