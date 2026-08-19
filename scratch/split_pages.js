const fs = require('fs');
const path = require('path');

const targetDir = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public';

// 1. Read the current index.html to use as a template
const indexPath = path.join(targetDir, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

// 2. Remove the catering grid section from indexHtml
const cateringGridRegex = /<section id="zabsiam-street-food"[\s\S]*?<\/section>/;
indexHtml = indexHtml.replace(cateringGridRegex, '');

// 3. Update the navigation bar
const oldNavRegex = /<li class="dropdown">\s*<a href="#menu" class="dropbtn">Menu.*?<\/li>/s;
const newNav = `
                    <li><a href="banquets.html">Signature Thai Banquets</a></li>
                    <li><a href="event-catering.html">Event Catering</a></li>
                    <li><a href="meeting-meals.html">Meeting Meals</a></li>
                    <li><a href="coffee-break.html">Coffee Break</a></li>
                    <li><a href="lunch-box.html">Lunch Box</a></li>
`;
indexHtml = indexHtml.replace(oldNavRegex, newNav);

// 4. Also we need to make sure Home links to index.html instead of #home if we are on other pages,
// so let's change <a href="#home">Home</a> to <a href="index.html">Home</a> globally in our template
indexHtml = indexHtml.replace(/<a href="#home">Home<\/a>/g, '<a href="index.html">Home</a>');

// Write updated index.html
fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log("Updated index.html");


// 5. Create the 5 individual pages.
// We will use the updated indexHtml as a base, but REMOVE the #menu section from the 4 non-banquet pages,
// and REMOVE the #menu section from index.html eventually? Wait, if banquets are on banquets.html, 
// we should move <section id="menu"> to banquets.html and remove it from index.html!

const menuSectionRegex = /<section id="menu"[\s\S]*?<\/section>\s*<!-- End Menu Section -->/;
const menuSectionMatch = indexHtml.match(menuSectionRegex);
const menuSectionHtml = menuSectionMatch ? menuSectionMatch[0] : '';

// Remove menu section from index.html
if (menuSectionHtml) {
    let cleanIndexHtml = indexHtml.replace(menuSectionRegex, '');
    fs.writeFileSync(indexPath, cleanIndexHtml, 'utf8');
}

// Helper to create a page
function createPage(filename, title, icon, subtitle, desc, price) {
    // Start with the clean index (no menu, no catering grid)
    let pageHtml = fs.readFileSync(indexPath, 'utf8');
    
    // Create a hero/content section for this specific service
    const contentHtml = `
    <section style="padding: 120px 20px 60px 20px; background-color: var(--color-black); min-height: 60vh; text-align: center;">
        <div class="container" style="max-width: 800px; margin: 0 auto; background-color: rgba(20, 20, 20, 0.8); border: 1px solid var(--color-gold); border-radius: 8px; padding: 4rem 2rem; box-shadow: 0 4px 15px rgba(255, 215, 0, 0.05);">
            <i class="fas ${icon}" style="font-size: 4rem; color: var(--color-gold); margin-bottom: 1.5rem;"></i>
            <h2 style="color: var(--color-gold); font-size: 2.5rem; margin-bottom: 1rem;">${title}</h2>
            <p style="color: #ccc; font-size: 1.2rem; margin-top: 12px; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 20px;">${price}<br/><span style="color: var(--color-gold); font-size: 1rem;">${subtitle}</span></p>
            <div style="text-align: center; margin-top: 20px; padding: 20px;">
                <p style="color: #ddd; font-size: 1.1rem; line-height: 1.6; margin: 0;">${desc}</p>
            </div>
            <div style="margin-top: 30px;">
                <a href="mailto:info@zabsiam.co.uk?subject=Inquiry:%20${encodeURIComponent(title)}" class="add-to-cart-btn" style="padding: 15px 30px; font-size: 1.1rem; display: inline-block; box-sizing: border-box; background-color: var(--color-gold); color: var(--color-black); font-weight: bold; text-decoration: none; border-radius: 4px;">Enquire to Customize</a>
            </div>
        </div>
    </section>
    `;
    
    // Inject the content right after the header
    pageHtml = pageHtml.replace(/(<\/header>)/, `$1\n${contentHtml}`);
    
    fs.writeFileSync(path.join(targetDir, filename), pageHtml, 'utf8');
    console.log("Created", filename);
}

// Create banquets.html
// This one is special, it gets the menuSectionHtml instead of a generic card
let banquetsHtml = fs.readFileSync(indexPath, 'utf8');
banquetsHtml = banquetsHtml.replace(/(<\/header>)/, `$1\n${menuSectionHtml}`);
fs.writeFileSync(path.join(targetDir, 'banquets.html'), banquetsHtml, 'utf8');
console.log("Created banquets.html");

// Create the other 4 pages
createPage('event-catering.html', 'Event Catering', 'fa-glass-cheers', 'Minimum 80 Guests', 'Bespoke catering solutions for your large events, weddings, and corporate gatherings. Fully customizable to your needs.', 'Starting from &pound;25 per Guest');
createPage('meeting-meals.html', 'Meeting Meals', 'fa-handshake', 'Buffet & Platter Style', 'Premium shared platters and buffet-style setups designed for boardroom meetings and team lunches.', 'Starting from &pound;20 per Guest');
createPage('coffee-break.html', 'Coffee Break', 'fa-coffee', 'Snacks & Beverages', 'Perfect for morning or afternoon breaks. Includes authentic Thai sweet & savory snacks, tea, and coffee.', 'Starting from &pound;10 per Guest');
createPage('lunch-box.html', 'Lunch Box', 'fa-box-open', 'Individual Portions', 'Individual, premium packed Thai meals for convenience and hygiene. Ideal for studio shoots or quick lunches.', 'Starting from &pound;15 per Box');

// Copy all of this to Desktop folder as well to keep sync
const destDir = 'C:/Users/KENDEE/Desktop/เว็บ/public';
const files = ['index.html', 'banquets.html', 'event-catering.html', 'meeting-meals.html', 'coffee-break.html', 'lunch-box.html'];
files.forEach(file => {
    fs.copyFileSync(path.join(targetDir, file), path.join(destDir, file));
});
console.log("Copied all files to Desktop.");
