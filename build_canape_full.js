const fs = require('fs');

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

let html = fs.readFileSync('public/canapes.html', 'utf8');

let gridHtml = '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">\n';

canapes.forEach(c => {
    gridHtml += `
    <div class="menu-card bg-black border border-gray-800 rounded-lg overflow-hidden shadow-2xl relative" style="border-color: rgba(255, 215, 0, 0.3);">
        <img src="${c.img}" alt="${c.name}" class="w-full h-64 object-cover" onerror="this.src='images/logo2.png'">
        <div class="p-6">
            <h3 class="text-2xl font-bold text-[var(--color-gold)] mb-2">${c.name}</h3>
            <p class="text-gray-400 mb-4 h-12">${c.desc}</p>
            <div class="flex justify-between items-center mb-4">
                <span class="text-white font-bold text-xl">&pound;${c.price.toFixed(2)}</span>
                <span class="text-sm text-gray-500">per tray (12 pcs)</span>
            </div>
            <a href="#" onclick="event.preventDefault(); addToCart({id: '${c.id}', name: '${c.name} (Tray of 12)', price: ${c.price}, qty: 1, img: '${c.img}'})" class="add-to-cart-btn inline-block w-full text-center py-3 bg-[var(--color-gold)] text-black font-bold rounded hover:bg-yellow-500 transition-colors">Add to Order</a>
        </div>
    </div>
    `;
});

gridHtml += '</div>';

// Also add the Packages at the bottom
const packagesHtml = `
<div class="mt-16 bg-[#111] p-8 rounded-lg border border-[var(--color-gold)]">
    <h3 class="text-3xl font-bold text-[var(--color-gold)] mb-6 text-center">Canap&eacute; Packages</h3>
    <div class="overflow-x-auto">
        <table class="w-full text-left text-gray-300">
            <thead>
                <tr class="border-b border-[var(--color-gold)]">
                    <th class="p-4 font-bold text-white">Package</th>
                    <th class="p-4 font-bold text-white">Trays</th>
                    <th class="p-4 font-bold text-white">Total Pieces</th>
                    <th class="p-4 font-bold text-white text-right">Price (VAT Inc.)</th>
                    <th class="p-4 text-center">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-b border-gray-800 hover:bg-gray-900 transition-colors">
                    <td class="p-4 font-bold">Siam Classic</td>
                    <td class="p-4">4 trays</td>
                    <td class="p-4">48 pieces</td>
                    <td class="p-4 text-right text-[var(--color-gold)] font-bold">&pound;124.80</td>
                    <td class="p-4 text-center"><a href="#" onclick="event.preventDefault(); addToCart({id: 'pkg-siam-classic', name: 'Siam Classic Canap&eacute; Package', price: 124.80, qty: 1, img: 'images/logo2.png'})" class="px-4 py-2 bg-[var(--color-gold)] text-black font-bold rounded text-sm hover:bg-yellow-500">Add</a></td>
                </tr>
                <tr class="border-b border-gray-800 hover:bg-gray-900 transition-colors">
                    <td class="p-4 font-bold">Zab Siam Signature</td>
                    <td class="p-4">6 trays</td>
                    <td class="p-4">72 pieces</td>
                    <td class="p-4 text-right text-[var(--color-gold)] font-bold">&pound;195.60</td>
                    <td class="p-4 text-center"><a href="#" onclick="event.preventDefault(); addToCart({id: 'pkg-zabsiam-sig', name: 'Zab Siam Signature Canap&eacute; Package', price: 195.60, qty: 1, img: 'images/logo2.png'})" class="px-4 py-2 bg-[var(--color-gold)] text-black font-bold rounded text-sm hover:bg-yellow-500">Add</a></td>
                </tr>
                <tr class="hover:bg-gray-900 transition-colors">
                    <td class="p-4 font-bold">Royal Thai Premium</td>
                    <td class="p-4">9 trays</td>
                    <td class="p-4">108 pieces</td>
                    <td class="p-4 text-right text-[var(--color-gold)] font-bold">&pound;306.00</td>
                    <td class="p-4 text-center"><a href="#" onclick="event.preventDefault(); addToCart({id: 'pkg-royal-premium', name: 'Royal Thai Premium Canap&eacute; Package', price: 306.00, qty: 1, img: 'images/logo2.png'})" class="px-4 py-2 bg-[var(--color-gold)] text-black font-bold rounded text-sm hover:bg-yellow-500">Add</a></td>
                </tr>
            </tbody>
        </table>
    </div>
    <p class="text-sm text-gray-500 mt-4 text-center">All selections are supplied in trays of 12 pieces. Minimum order of four trays applies.</p>
</div>
`;

gridHtml += packagesHtml;

// Replace the old grid with the new grid
html = html.replace(/<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/, gridHtml + '\n</div>\n</section>');

fs.writeFileSync('public/canapes.html', html, 'utf8');
console.log('Updated canapes.html with all 15 items and packages');
