const fs = require('fs');
let html = fs.readFileSync('public/royal.html', 'utf8');
const target = '            font-weight: 700;\r\n    <section class="points-section"';
const target2 = '            font-weight: 700;\n    <section class="points-section"';

const replacement = `            font-weight: 700;
            color: var(--dark-green, #1B3022);
            font-size: 1.2rem;
        }
        .customer-name {
            font-weight: 600;
            color: white;
            font-size: 1.1rem;
        }
        .customer-date {
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.5);
        }
    </style>

    <section style="background-color: var(--dark-green, #1B3022); color: white; padding: 70px 20px; border-top: 1px solid rgba(212,175,55,0.2); border-bottom: 1px solid rgba(212,175,55,0.2);">
        <div style="max-width: 1200px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 50px;">
                <span style="color: var(--gold, #D4AF37); font-size: 0.9rem; letter-spacing: 2px; text-transform: uppercase;">Professional Facilities</span>
                <h2 style="font-family: 'Playfair Display', serif; font-size: 2.5rem; color: #f5e6b8; margin: 10px 0 20px;">State-of-the-Art Commercial Kitchen</h2>
                <p style="color: rgba(255, 255, 255, 0.8); max-width: 700px; margin: 0 auto; line-height: 1.6; font-size: 1.1rem;">
                    To ensure impeccable quality and hygiene for your events, all Khrua Thai dishes are prepared in a premium shared commercial kitchen, equipped with industry-leading technology.
                </p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px;">
                <div style="background: rgba(0,0,0,0.3); padding: 30px; border-radius: 10px; border: 1px solid rgba(212,175,55,0.1); display: flex; align-items: flex-start; gap: 20px; transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="font-size: 2rem; color: var(--gold, #D4AF37);">🔥</div>
                    <div>
                        <h3 style="color: #f5e6b8; font-size: 1.2rem; margin-bottom: 10px; font-family: 'Playfair Display', serif;">Advanced Cooking</h3>
                        <p style="color: rgba(255,255,255,0.7); font-size: 0.9rem; line-height: 1.5;">Featuring <strong>Rational Combi Ovens</strong> and <strong>iVario Cooking Centres</strong> for precise temperature control, alongside Heavy Duty Gas Burners and Bratt Pans for authentic wok-hei.</p>
                    </div>
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 30px; border-radius: 10px; border: 1px solid rgba(212,175,55,0.1); display: flex; align-items: flex-start; gap: 20px; transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="font-size: 2rem; color: var(--gold, #D4AF37);">⚡</div>
                    <div>
                        <h3 style="color: #f5e6b8; font-size: 1.2rem; margin-bottom: 10px; font-family: 'Playfair Display', serif;">High-Volume Prep</h3>
                        <p style="color: rgba(255,255,255,0.7); font-size: 0.9rem; line-height: 1.5;">Equipped with <strong>10L, 30L & 40L High Volume Mixers</strong>, Food Processors, and Vacuum Packers to handle massive catering orders flawlessly.</p>
                    </div>
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 30px; border-radius: 10px; border: 1px solid rgba(212,175,55,0.1); display: flex; align-items: flex-start; gap: 20px; transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="font-size: 2rem; color: var(--gold, #D4AF37);">❄️</div>
                    <div>
                        <h3 style="color: #f5e6b8; font-size: 1.2rem; margin-bottom: 10px; font-family: 'Playfair Display', serif;">Maximum Freshness</h3>
                        <p style="color: rgba(255,255,255,0.7); font-size: 0.9rem; line-height: 1.5;">Utilizing <strong>Blast Chillers & Freezers</strong> to immediately lock in the freshness, nutrients, and authentic taste of our premium ingredients.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="reviews-section">
        <span class="section-tag">Testimonials</span>
        <h2 class="section-title"><span style="font-family:'Prompt', sans-serif; font-size:1.5rem; color: #f5e6b8;">Customer Reviews</span></h2>
        
        <div class="reviews-grid" id="reviews-grid">
            <!-- Dynamic Reviews will load here -->
            <div style="color:white; width: 100%; text-align: center;">Loading reviews...</div>
        </div>
    </section>

    <section class="points-section"`;

if (html.includes(target)) {
    html = html.replace(target, replacement);
    fs.writeFileSync('public/royal.html', html, 'utf8');
    console.log('Replaced via \\r\\n');
} else if (html.includes(target2)) {
    html = html.replace(target2, replacement);
    fs.writeFileSync('public/royal.html', html, 'utf8');
    console.log('Replaced via \\n');
} else {
    console.log('Target not found!');
}
