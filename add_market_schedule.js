const fs = require('fs');
const path = require('path');

const repoIndex = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\index.html';
const localIndex = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\index.html';

try {
    let indexHtml = fs.readFileSync(repoIndex, 'utf8');

    // Make sure we only add it once
    if (!indexHtml.includes('Market Schedule')) {
        const scheduleHtml = `
    <!-- Market Schedule Section -->
    <section class="market-schedule-section" style="padding: 60px 20px; background-color: #f4f8f5; text-align: center;">
        <div style="max-width: 1000px; margin: 0 auto;">
            <h2 style="font-size: 2rem; font-weight: bold; color: #1a433d; margin-bottom: 10px;">Our Market Schedule</h2>
            <p style="color: #666; font-size: 1.1rem; margin-bottom: 40px;">Find us at these locations to pick up your pre-orders or enjoy fresh street food.</p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
                <!-- Duke of York Square -->
                <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); text-align: left; border-top: 4px solid #e65c00;">
                    <h3 style="font-size: 1.5rem; font-weight: bold; color: #333; margin-bottom: 15px;">Duke of York Square</h3>
                    <div style="margin-bottom: 15px;">
                        <i class="fas fa-map-marker-alt" style="color: #e65c00; width: 20px;"></i>
                        <span style="color: #555;">Chelsea, London SW3 4LY</span>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <i class="far fa-calendar-alt" style="color: #598c73; width: 20px;"></i>
                        <span style="font-weight: bold; color: #333;">Every Saturday</span>
                    </div>
                    <div style="margin-bottom: 25px;">
                        <i class="far fa-clock" style="color: #598c73; width: 20px;"></i>
                        <span style="color: #555;">10:00 AM - 4:00 PM</span>
                    </div>
                    
                    <div style="display: flex; gap: 10px;">
                        <span style="background: #eef7f3; color: #2e6047; padding: 5px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: bold;">Walk-ins</span>
                        <span style="background: #fdf2ea; color: #c44e00; padding: 5px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: bold;">Pre-order Available</span>
                    </div>
                </div>
                
                <!-- Placeholder for future markets -->
                <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); text-align: left; display: flex; flex-direction: column; justify-content: center; align-items: center; border: 2px dashed #ddd;">
                    <i class="fas fa-store-alt" style="font-size: 3rem; color: #ccc; margin-bottom: 15px;"></i>
                    <h3 style="font-size: 1.2rem; font-weight: bold; color: #999;">More Markets Coming Soon</h3>
                </div>
            </div>
            
            <div style="margin-top: 40px;">
                <a href="menu.html" style="display: inline-block; background-color: #1a433d; color: white; padding: 15px 30px; border-radius: 8px; font-size: 1.1rem; font-weight: bold; text-decoration: none; transition: background 0.3s;">
                    Pre-order Now
                </a>
            </div>
        </div>
    </section>
`;

        // Insert before footer
        indexHtml = indexHtml.replace(/<footer>/, scheduleHtml + '\n    <footer>');
        
        fs.writeFileSync(repoIndex, indexHtml, 'utf8');
        if (fs.existsSync(localIndex)) {
            fs.writeFileSync(localIndex, indexHtml, 'utf8');
        }
        console.log("Market Schedule added to index.html successfully.");
    } else {
        console.log("Market Schedule already exists.");
    }
} catch (e) {
    console.error(e);
}
