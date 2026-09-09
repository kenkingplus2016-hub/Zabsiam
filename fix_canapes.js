const fs = require('fs');

let html = fs.readFileSync('public/canapes.html', 'utf8');

// Find the header end and footer start
const headerEndIdx = html.indexOf('<section style="padding: 120px');
const footerStartIdx = html.indexOf('<footer id="contact">');

if (headerEndIdx === -1 || footerStartIdx === -1) {
    console.error("Could not find header or footer");
    process.exit(1);
}

const headerPart = html.substring(0, headerEndIdx);
const footerPart = html.substring(footerStartIdx);

const canapes = [
    { id: 'canape-01', name: 'Mini Moo Ping', desc: 'Classic Thai grilled pork skewers.', price: 28.80, img: 'images/canape_pork_skewers.jpg' },
    { id: 'canape-02', name: 'Chicken Satay', desc: 'Grilled marinated chicken skewers with peanut sauce.', price: 28.80, img: 'images/canape_pork_satay.jpg' },
    { id: 'canape-03', name: 'Goong Hom Sabai', desc: 'Crispy prawns wrapped in spring roll pastry.', price: 36.00, img: 'images/logo2.png' },
    { id: 'canape-04', name: 'Kor Moo Yang & Sticky Rice', desc: 'Grilled pork neck served with sticky rice.', price: 33.60, img: 'images/grilled_pork_neck_new.jpg' },
    { id: 'canape-05', name: 'Mini Chicken Basil Burger', desc: 'Spicy Thai basil chicken slider.', price: 38.40, img: 'images/logo2.png' },
    { id: 'canape-06', name: 'Mini Beef Basil Burger', desc: 'Spicy Thai basil beef slider.', price: 42.00, img: 'images/logo2.png' },
    { id: 'canape-07', name: 'Grilled Prawn & Seafood Sauce', desc: 'Juicy grilled prawns with spicy seafood dip.', price: 39.60, img: 'images/logo2.png' },
    { id: 'canape-08', name: 'Crispy Prawn with Tamarind Sauce', desc: 'Crispy prawns drizzled with sweet tamarind sauce.', price: 39.60, img: 'images/logo2.png' },
    { id: 'canape-09', name: 'Salmon Pla', desc: 'Spicy salmon salad bite.', price: 38.40, img: 'images/salmon_spicy_salad_new.jpg' },
    { id: 'canape-10', name: 'Miang Kham Duo', desc: 'Traditional bite-sized wrap with roasted coconut and peanuts.', price: 33.60, img: 'images/canape_pomelo_miang_kham.jpg' },
    { id: 'canape-11', name: 'Ma Hor', desc: 'Sweet radish and peanut mixture on fresh fruit.', price: 33.60, img: 'images/logo2.png' },
    { id: 'canape-12', name: 'Mini Crispy Thai Prawn Cake', desc: 'Crispy prawn cake served with plum sauce.', price: 39.60, img: 'images/logo2.png' },
    { id: 'canape-13', name: 'Mini Golden Bags', desc: 'Crispy pastry bags filled with savory minced meat.', price: 33.60, img: 'images/logo2.png' },
    { id: 'canape-14', name: 'Mini Northern Thai Sausage (Sai Oua)', desc: 'Spicy and aromatic Northern Thai pork sausage.', price: 38.40, img: 'images/logo2.png' },
    { id: 'canape-15', name: 'Mini Sai Krok Isan', desc: 'Fermented Northeastern Thai pork sausage.', price: 38.40, img: 'images/logo2.png' },
    { id: 'canape-16', name: 'Pomelo Salad with Prawns', desc: 'Yum Som O Goong - Zesty pomelo salad with fresh prawns.', price: 39.60, img: 'images/canape_salad_pomelo.jpg' }
];

let mainContent = `
<section style="padding: 120px 20px 60px 20px; background-color: var(--color-black); min-height: 60vh; text-align: center;">
    <div style="max-w-7xl mx-auto">
        <h2 style="color: var(--color-gold); font-size: 2.5rem; margin-bottom: 1rem; text-transform: uppercase;">Canap&eacute; Selection</h2>
        <p style="color: #ccc; font-size: 1.2rem; margin-top: 12px; margin-bottom: 40px;">Authentic Thai Flavours for Every Occasion<br/><span style="color: var(--color-gold); font-size: 1rem;">12 Pieces per Tray - Prices Include VAT at 20%</span></p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; text-align: left;">
`;

canapes.forEach(c => {
    mainContent += `
            <div style="background: rgba(0,0,0,0.5); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
                <img src="${c.img}" alt="${c.name}" onerror="this.src='images/logo2.png'" style="width: 100%; height: 200px; object-fit: cover;">
                <div style="padding: 20px; flex-grow: 1; display: flex; flex-direction: column;">
                    <h3 style="color: var(--color-gold); font-size: 1.3rem; margin-bottom: 10px;">${c.name}</h3>
                    <p style="color: #ccc; font-size: 0.9rem; margin-bottom: 15px; flex-grow: 1;">${c.desc}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <span style="color: #fff; font-weight: bold; font-size: 1.2rem;">&pound;${c.price.toFixed(2)}</span>
                        <span style="color: #888; font-size: 0.8rem;">per tray (12 pcs)</span>
                    </div>
                    <a href="#" onclick="event.preventDefault(); addToCart({id: '${c.id}', name: '${c.name.replace(/'/g, "\\'")} (Tray of 12)', price: ${c.price}, qty: 1, img: '${c.img}'})" style="display: block; text-align: center; padding: 12px; background-color: var(--color-gold); color: black; font-weight: bold; text-decoration: none; border-radius: 4px; transition: 0.3s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">Add to Order</a>
                </div>
            </div>
    `;
});

mainContent += `
        </div>
        
        <div style="margin-top: 60px; background: rgba(0,0,0,0.5); padding: 30px; border: 1px solid var(--color-gold); border-radius: 8px;">
            <h3 style="color: var(--color-gold); font-size: 2rem; margin-bottom: 20px;">Canap&eacute; Packages</h3>
            <table style="width: 100%; border-collapse: collapse; color: #fff; text-align: left;">
                <thead>
                    <tr style="border-bottom: 2px solid var(--color-gold);">
                        <th style="padding: 12px;">Package</th>
                        <th style="padding: 12px;">Trays</th>
                        <th style="padding: 12px;">Pieces</th>
                        <th style="padding: 12px; text-align: right;">Total Price</th>
                        <th style="padding: 12px; text-align: center;">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom: 1px solid rgba(255,215,0,0.2);">
                        <td style="padding: 15px; font-weight: bold;">Siam Classic</td>
                        <td style="padding: 15px;">4 trays</td>
                        <td style="padding: 15px;">48 pieces</td>
                        <td style="padding: 15px; text-align: right; color: var(--color-gold); font-weight: bold;">&pound;124.80</td>
                        <td style="padding: 15px; text-align: center;"><a href="#" onclick="event.preventDefault(); addToCart({id: 'pkg-siam-classic', name: 'Siam Classic Canap&eacute; Package', price: 124.80, qty: 1, img: 'images/logo2.png'})" style="padding: 8px 16px; background-color: var(--color-gold); color: black; font-weight: bold; text-decoration: none; border-radius: 4px;">Add</a></td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgba(255,215,0,0.2);">
                        <td style="padding: 15px; font-weight: bold;">Zab Siam Signature</td>
                        <td style="padding: 15px;">6 trays</td>
                        <td style="padding: 15px;">72 pieces</td>
                        <td style="padding: 15px; text-align: right; color: var(--color-gold); font-weight: bold;">&pound;195.60</td>
                        <td style="padding: 15px; text-align: center;"><a href="#" onclick="event.preventDefault(); addToCart({id: 'pkg-zabsiam-sig', name: 'Zab Siam Signature Canap&eacute; Package', price: 195.60, qty: 1, img: 'images/logo2.png'})" style="padding: 8px 16px; background-color: var(--color-gold); color: black; font-weight: bold; text-decoration: none; border-radius: 4px;">Add</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 15px; font-weight: bold;">Royal Thai Premium</td>
                        <td style="padding: 15px;">9 trays</td>
                        <td style="padding: 15px;">108 pieces</td>
                        <td style="padding: 15px; text-align: right; color: var(--color-gold); font-weight: bold;">&pound;306.00</td>
                        <td style="padding: 15px; text-align: center;"><a href="#" onclick="event.preventDefault(); addToCart({id: 'pkg-royal-premium', name: 'Royal Thai Premium Canap&eacute; Package', price: 306.00, qty: 1, img: 'images/logo2.png'})" style="padding: 8px 16px; background-color: var(--color-gold); color: black; font-weight: bold; text-decoration: none; border-radius: 4px;">Add</a></td>
                    </tr>
                </tbody>
            </table>
            <p style="color: #aaa; font-size: 0.9rem; margin-top: 20px; text-align: center;">Minimum order of 4 trays applies. Delivery and equipment are quoted separately.</p>
        </div>

    </div>
</section>
`;

fs.writeFileSync('public/canapes.html', headerPart + mainContent + footerPart, 'utf8');
console.log('Fixed canapes.html successfully');
