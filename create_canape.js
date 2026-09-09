const fs = require('fs');
const path = require('path');

let html = fs.readFileSync('public/event-catering.html', 'utf8');

// Replace titles
html = html.replace(/<title>.*<\/title>/, '<title>Canap&eacute;s | ZabSiam - Thai Street Food</title>');
html = html.replace(/<h2 class="text-4xl[^>]*>Event Catering<\/h2>/, '<h2 class="text-4xl md:text-5xl font-bold text-center mb-12 text-[var(--color-gold)] uppercase tracking-wider" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">Canap&eacute; Selection</h2>');
html = html.replace(/<p class="text-center text-gray-300 max-w-3xl mx-auto mb-12 text-lg">[^<]*<\/p>/, '<p class="text-center text-gray-300 max-w-3xl mx-auto mb-12 text-lg">Elevate your event with our exquisite Thai Canap&eacute;s. Perfect for receptions and parties.</p>');

// Remove everything inside <div class="max-w-7xl mx-auto px-4 relative z-10" id="catering-content"> ... </div>
// and replace it with a simple grid.

const newContent = `
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div class="menu-card bg-black border border-gray-800 rounded-lg overflow-hidden shadow-2xl relative" style="border-color: rgba(255, 215, 0, 0.3);">
        <img src="images/canape_pomelo_miang_kham.jpg" alt="Pomelo Miang Kham" class="w-full h-64 object-cover" onerror="this.src='images/logo2.png'">
        <div class="p-6">
            <h3 class="text-2xl font-bold text-[var(--color-gold)] mb-2">Pomelo Miang Kham</h3>
            <p class="text-gray-400 mb-4">A bite-sized burst of flavor with fresh pomelo, roasted coconut, peanuts, and Thai herbs on a betel leaf.</p>
            <a href="mailto:info@zabsiam.co.uk?subject=Inquiry:%20Canapes" class="add-to-cart-btn inline-block w-full text-center py-3 bg-[var(--color-gold)] text-black font-bold rounded">Enquire</a>
        </div>
    </div>
    <div class="menu-card bg-black border border-gray-800 rounded-lg overflow-hidden shadow-2xl relative" style="border-color: rgba(255, 215, 0, 0.3);">
        <img src="images/canape_pork_satay.jpg" alt="Pork Satay" class="w-full h-64 object-cover" onerror="this.src='images/logo2.png'">
        <div class="p-6">
            <h3 class="text-2xl font-bold text-[var(--color-gold)] mb-2">Thai Pork Satay</h3>
            <p class="text-gray-400 mb-4">Grilled marinated pork skewers served with our signature rich peanut sauce and cucumber relish.</p>
            <a href="mailto:info@zabsiam.co.uk?subject=Inquiry:%20Canapes" class="add-to-cart-btn inline-block w-full text-center py-3 bg-[var(--color-gold)] text-black font-bold rounded">Enquire</a>
        </div>
    </div>
    <div class="menu-card bg-black border border-gray-800 rounded-lg overflow-hidden shadow-2xl relative" style="border-color: rgba(255, 215, 0, 0.3);">
        <img src="images/canape_pork_skewers.jpg" alt="Moo Ping" class="w-full h-64 object-cover" onerror="this.src='images/logo2.png'">
        <div class="p-6">
            <h3 class="text-2xl font-bold text-[var(--color-gold)] mb-2">Moo Ping</h3>
            <p class="text-gray-400 mb-4">Classic Thai street food style grilled pork skewers, sweet, savory, and perfectly caramelized.</p>
            <a href="mailto:info@zabsiam.co.uk?subject=Inquiry:%20Canapes" class="add-to-cart-btn inline-block w-full text-center py-3 bg-[var(--color-gold)] text-black font-bold rounded">Enquire</a>
        </div>
    </div>
</div>
`;

// Inject into HTML
html = html.replace(/(<div class="max-w-7xl mx-auto px-4 relative z-10"[^>]*>)[\s\S]*?(<\/section>)/, `$1\n${newContent}\n</div>\n$2`);

// Remove the Modals from the bottom of event-catering since they don't apply
html = html.replace(/<div id="allergen-modal-[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g, '');
html = html.replace(/<div id="allergen-modal-[\s\S]*?<\/div>\s*<\/div>/g, ''); // catch any remaining

fs.writeFileSync('public/canapes.html', html, 'utf8');
console.log('Created canapes.html');
