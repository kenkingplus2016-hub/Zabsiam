const fs = require('fs');

let html = fs.readFileSync('public/canapes.html', 'utf8');

const regex = /<h3 style="color: var\(--color-gold\); font-size: 2rem; margin-bottom: 30px; text-align: center;">Canap&eacute; Packages<\/h3>/;

const newHTML = `<h3 style="color: var(--color-gold); font-size: 2rem; margin-bottom: 10px; text-align: center;">Canap&eacute; Packages</h3>
            
            <div style="background-color: rgba(255, 215, 0, 0.1); border: 1px solid var(--color-gold); border-radius: 8px; padding: 15px; margin-bottom: 30px; text-align: center;">
                <p style="color: #fff; margin-bottom: 10px; font-size: 1.1rem;"><strong>Suggested Portion Guide:</strong> Approximately <strong>6 pieces per guest</strong> for a Canap&eacute; reception.</p>
                <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; color: #ccc; font-size: 0.95rem;">
                    <span><strong>Siam Classic:</strong> Serves ~8 guests</span>
                    <span style="color: var(--color-gold);">|</span>
                    <span><strong>Zab Siam Signature:</strong> Serves ~12 guests</span>
                    <span style="color: var(--color-gold);">|</span>
                    <span><strong>Royal Thai Premium:</strong> Serves ~18 guests</span>
                </div>
            </div>`;

html = html.replace(regex, newHTML);

fs.writeFileSync('public/canapes.html', html, 'utf8');
console.log('Added suggested portion guide to canapes packages.');
