const fs = require('fs');

let html = fs.readFileSync('public/canapes.html', 'utf8');

const packageSectionRegex = /<h3 style="color: var\(--color-gold\); font-size: 2rem; margin-bottom: 20px;">Canap&eacute; Packages<\/h3>[\s\S]*?<\/table>/;

const newPackageHTML = `<h3 style="color: var(--color-gold); font-size: 2rem; margin-bottom: 30px; text-align: center;">Canap&eacute; Packages</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
                
                <!-- Siam Classic -->
                <div style="background: rgba(0,0,0,0.7); border: 1px solid var(--color-gold); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
                    <img src="images/canape_pork_skewers.jpg" alt="Siam Classic" style="width: 100%; height: 200px; object-fit: cover;">
                    <div style="padding: 20px; flex-grow: 1; display: flex; flex-direction: column;">
                        <h4 style="color: var(--color-gold); font-size: 1.5rem; margin-bottom: 5px;">Siam Classic</h4>
                        <p style="color: #fff; font-weight: bold; margin-bottom: 15px;">4 Trays (48 pieces) - &pound;124.80</p>
                        <ul style="color: #ccc; font-size: 0.9rem; padding-left: 20px; margin-bottom: 20px; flex-grow: 1; line-height: 1.6;">
                            <li>Mini Moo Ping (12 pcs)</li>
                            <li>Chicken Satay (12 pcs)</li>
                            <li>Kor Moo Yang & Sticky Rice (12 pcs)</li>
                            <li>Goong Hom Sabai (12 pcs)</li>
                        </ul>
                        <a href="#" onclick="event.preventDefault(); addToCart({id: 'pkg-siam-classic', name: 'Siam Classic Canap&eacute; Package', price: 124.80, qty: 1, img: 'images/canape_pork_skewers.jpg'})" style="display: block; text-align: center; padding: 12px; background-color: var(--color-gold); color: black; font-weight: bold; text-decoration: none; border-radius: 4px; transition: 0.3s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">Add Package to Order</a>
                    </div>
                </div>

                <!-- Zab Siam Signature -->
                <div style="background: rgba(0,0,0,0.7); border: 1px solid var(--color-gold); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
                    <img src="images/canape_chicken_basil_burger.jpg" alt="Zab Siam Signature" style="width: 100%; height: 200px; object-fit: cover;">
                    <div style="padding: 20px; flex-grow: 1; display: flex; flex-direction: column;">
                        <h4 style="color: var(--color-gold); font-size: 1.5rem; margin-bottom: 5px;">Zab Siam Signature</h4>
                        <p style="color: #fff; font-weight: bold; margin-bottom: 15px;">6 Trays (72 pieces) - &pound;195.60</p>
                        <ul style="color: #ccc; font-size: 0.9rem; padding-left: 20px; margin-bottom: 20px; flex-grow: 1; line-height: 1.6;">
                            <li>Mini Chicken Basil Burger (12 pcs)</li>
                            <li>Crispy Prawn with Tamarind Sauce (12 pcs)</li>
                            <li>Mini Crispy Thai Prawn Cake (12 pcs)</li>
                            <li>Grilled Prawn & Seafood Sauce (12 pcs)</li>
                            <li>+ 2 items from Siam Classic</li>
                        </ul>
                        <a href="#" onclick="event.preventDefault(); addToCart({id: 'pkg-zabsiam-sig', name: 'Zab Siam Signature Canap&eacute; Package', price: 195.60, qty: 1, img: 'images/canape_chicken_basil_burger.jpg'})" style="display: block; text-align: center; padding: 12px; background-color: var(--color-gold); color: black; font-weight: bold; text-decoration: none; border-radius: 4px; transition: 0.3s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">Add Package to Order</a>
                    </div>
                </div>

                <!-- Royal Thai Premium -->
                <div style="background: rgba(0,0,0,0.7); border: 1px solid var(--color-gold); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
                    <img src="images/canape_salmon_pla.jpg" alt="Royal Thai Premium" style="width: 100%; height: 200px; object-fit: cover;">
                    <div style="padding: 20px; flex-grow: 1; display: flex; flex-direction: column;">
                        <h4 style="color: var(--color-gold); font-size: 1.5rem; margin-bottom: 5px;">Royal Thai Premium</h4>
                        <p style="color: #fff; font-weight: bold; margin-bottom: 15px;">9 Trays (108 pieces) - &pound;306.00</p>
                        <ul style="color: #ccc; font-size: 0.9rem; padding-left: 20px; margin-bottom: 20px; flex-grow: 1; line-height: 1.6;">
                            <li>Salmon Pla (12 pcs)</li>
                            <li>Mini Beef Basil Burger (12 pcs)</li>
                            <li>Miang Kham Duo (12 pcs)</li>
                            <li>Ma Hor (12 pcs)</li>
                            <li>+ 5 items from previous packages</li>
                        </ul>
                        <a href="#" onclick="event.preventDefault(); addToCart({id: 'pkg-royal-premium', name: 'Royal Thai Premium Canap&eacute; Package', price: 306.00, qty: 1, img: 'images/canape_salmon_pla.jpg'})" style="display: block; text-align: center; padding: 12px; background-color: var(--color-gold); color: black; font-weight: bold; text-decoration: none; border-radius: 4px; transition: 0.3s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">Add Package to Order</a>
                    </div>
                </div>

            </div>`;

html = html.replace(packageSectionRegex, newPackageHTML);

fs.writeFileSync('public/canapes.html', html, 'utf8');
console.log('Updated Canape Packages section to use cards with images and item details.');
