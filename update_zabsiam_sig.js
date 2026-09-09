const fs = require('fs');

let html = fs.readFileSync('public/canapes.html', 'utf8');

const regex = /<h4 style="color: var\(--color-gold\); font-size: 1\.5rem; margin-bottom: 5px;">Zab Siam Signature<\/h4>[\s\S]*?<\/ul>/;

const newHTML = `<h4 style="color: var(--color-gold); font-size: 1.5rem; margin-bottom: 5px;">Zab Siam Signature</h4>
                        <p style="color: #fff; font-weight: bold; margin-bottom: 15px;">6 Trays (72 pieces) - &pound;195.60</p>
                        <ul style="color: #ccc; font-size: 0.9rem; padding-left: 20px; margin-bottom: 20px; flex-grow: 1; line-height: 1.6;">
                            <li>Mini Moo Ping (12 pcs)</li>
                            <li>Chicken Satay (12 pcs)</li>
                            <li>Goong Hom Sabai (12 pcs)</li>
                            <li>Kor Moo Yang & Sticky Rice (12 pcs)</li>
                            <li>Mini Chicken Basil Burger (12 pcs)</li>
                            <li>Salmon Pla (12 pcs)</li>
                        </ul>`;

html = html.replace(regex, newHTML);

fs.writeFileSync('public/canapes.html', html, 'utf8');
console.log('Updated Zab Siam Signature package items.');
