const fs = require('fs');

let html = fs.readFileSync('public/canapes.html', 'utf8'); // Start from clean slate

const firstGrid = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; text-align: left;">';
const gridStart = html.indexOf(firstGrid);
let headerHtml = html.substring(0, gridStart);

headerHtml = headerHtml.replace(/<title>.*?<\/title>/, '<title>Party Trays & Delivery | ZabSiam</title>');
headerHtml = headerHtml.replace(/<h1.*?>.*?<\/h1>/, '<h1 style="color: var(--color-gold); font-size: 2.5rem; margin-bottom: 1rem; text-transform: uppercase;">Party Trays & Delivery</h1>');
// In case it was h2
headerHtml = headerHtml.replace(/<h2.*?>.*?<\/h2>/, '<h1 style="color: var(--color-gold); font-size: 2.5rem; margin-bottom: 1rem; text-transform: uppercase;">Party Trays & Delivery</h1>');
headerHtml = headerHtml.replace(/<p style="color: #ccc; max-width: 800px; margin: 0 auto; font-size: 1\.1rem; line-height: 1\.6;">[\s\S]*?<\/p>/, '<p style="color: #ccc; max-width: 800px; margin: 0 auto; font-size: 1.1rem; line-height: 1.6;">Authentic Thai party trays and large portion delivery. Perfect for house parties, office lunches, or family gatherings.<br/><span style="color: var(--color-gold); font-size: 1rem;">Prices Include VAT at 20%</span></p>');

// Also update SEO in header Html
headerHtml = headerHtml.replace(/<meta name="description" content=".*?">/s, `<meta name="description" content="Order authentic Thai party trays and large portion curries delivered across London. Ideal for office lunches, house parties, and family gatherings. Featuring Green Curry, Red Duck Curry, and Sea Bass.">`);
if (headerHtml.includes('<meta name="keywords"')) {
    headerHtml = headerHtml.replace(/<meta name="keywords" content=".*?">/s, `<meta name="keywords" content="Thai party trays London, Thai food delivery London, order Thai food bulk, Thai office lunch, Zab Siam delivery, large portion Thai food">`);
} else {
    headerHtml = headerHtml.replace('</head>', `    <meta name="keywords" content="Thai party trays London, Thai food delivery London, order Thai food bulk, Thai office lunch, Zab Siam delivery, large portion Thai food">\n</head>`);
}

const businessContext = {
    "@type": "FoodEstablishment",
    "@id": "https://zabsiam.com/#business",
    "name": "Zab Siam",
    "url": "https://zabsiam.com/",
    "logo": "https://zabsiam.com/images/zabsiam_logo_transparent.png",
    "address": {"@type":"PostalAddress","streetAddress":"Mission Kitchen, 1st Floor, The Food Exchange, New Covent Garden Market","addressLocality":"London","postalCode":"SW8 5EL","addressCountry":"GB"},
    "areaServed": "London, UK",
    "servesCuisine": "Thai"
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "name": "Thai Party Trays & Delivery",
    "description": "Large portion Thai delivery for office lunches and parties.",
    "mainEntityOfPage": "https://zabsiam.com/delivery.html",
    "publisher": businessContext,
    "hasMenuItem": [
        {"@type": "MenuItem", "name": "Deep Fried Sea Bass with Fish Sauce (Tray)", "offers": {"@type": "Offer", "price": "26.00", "priceCurrency": "GBP"}},
        {"@type": "MenuItem", "name": "Pla Lui Suan (Tray)", "offers": {"@type": "Offer", "price": "26.00", "priceCurrency": "GBP"}},
        {"@type": "MenuItem", "name": "Choo Chee Fried Sea Bass (4000ml)", "offers": {"@type": "Offer", "price": "26.00", "priceCurrency": "GBP"}},
        {"@type": "MenuItem", "name": "Massaman Beef Curry (4000ml)", "offers": {"@type": "Offer", "price": "45.00", "priceCurrency": "GBP"}},
        {"@type": "MenuItem", "name": "Panang Chicken Curry (4000ml)", "offers": {"@type": "Offer", "price": "35.00", "priceCurrency": "GBP"}},
        {"@type": "MenuItem", "name": "Red Duck Curry (4000ml)", "offers": {"@type": "Offer", "price": "65.00", "priceCurrency": "GBP"}},
        {"@type": "MenuItem", "name": "Red Chicken Curry (4000ml)", "offers": {"@type": "Offer", "price": "35.00", "priceCurrency": "GBP"}},
        {"@type": "MenuItem", "name": "Green Chicken Curry (4000ml)", "offers": {"@type": "Offer", "price": "35.00", "priceCurrency": "GBP"}}
    ]
};
headerHtml = headerHtml.replace('</head>', `    <script type="application/ld+json">\n    ${JSON.stringify(jsonLd, null, 2)}\n    </script>\n</head>`);


const sectionEnd = html.indexOf('</section>');
let footerHtml = html.substring(sectionEnd);

const newGrid = `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; text-align: left;">
            <!-- Fish 1 -->
            <div style="background: rgba(0,0,0,0.5); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
                <img src="images/delivery_seabass_fish_sauce.jpg" alt="Deep Fried Sea Bass with Fish Sauce" onerror="this.src='images/logo2.png'" style="width: 100%; height: 250px; object-fit: cover;">
                <div style="padding: 20px; flex-grow: 1; display: flex; flex-direction: column;">
                    <h3 style="color: var(--color-gold); font-size: 1.3rem; margin-bottom: 10px;">Deep Fried Sea Bass with Fish Sauce</h3>
                    <p style="color: #ccc; font-size: 0.9rem; margin-bottom: 15px; flex-grow: 1;">Whole Deep-Fried Sea Bass in Sweet Fish Sauce, served with Shredded Mango Salad, Peanuts, and Fried Shallots.</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <span style="color: #fff; font-weight: bold; font-size: 1.2rem;">&pound;26.00</span>
                        <span style="color: #888; font-size: 0.8rem;">per tray</span>
                    </div>
                    <a href="#" onclick="event.preventDefault(); addToCart({id: 'delivery-1', name: 'Deep Fried Sea Bass with Fish Sauce (Tray)', price: 26.0, qty: 1, img: 'images/delivery_seabass_fish_sauce.jpg'})" style="display: block; text-align: center; padding: 12px; background-color: var(--color-gold); color: black; font-weight: bold; text-decoration: none; border-radius: 4px; transition: 0.3s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">Add to Order</a>
                </div>
            </div>

            <!-- Fish 2 -->
            <div style="background: rgba(0,0,0,0.5); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
                <img src="images/delivery_pla_lui_suan.jpg" alt="Pla Lui Suan" onerror="this.src='images/logo2.png'" style="width: 100%; height: 250px; object-fit: cover;">
                <div style="padding: 20px; flex-grow: 1; display: flex; flex-direction: column;">
                    <h3 style="color: var(--color-gold); font-size: 1.3rem; margin-bottom: 10px;">Pla Lui Suan</h3>
                    <p style="color: #ccc; font-size: 0.9rem; margin-bottom: 15px; flex-grow: 1;">Deep-Fried Sea Bass with Herb Salad, Lemongrass, Kaffir Lime Leaves, Shallots, Peanuts, and Chili.</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <span style="color: #fff; font-weight: bold; font-size: 1.2rem;">&pound;26.00</span>
                        <span style="color: #888; font-size: 0.8rem;">per tray</span>
                    </div>
                    <a href="#" onclick="event.preventDefault(); addToCart({id: 'delivery-4', name: 'Pla Lui Suan (Tray)', price: 26.0, qty: 1, img: 'images/delivery_pla_lui_suan.jpg'})" style="display: block; text-align: center; padding: 12px; background-color: var(--color-gold); color: black; font-weight: bold; text-decoration: none; border-radius: 4px; transition: 0.3s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">Add to Order</a>
                </div>
            </div>

            <!-- Fish 3 -->
            <div style="background: rgba(0,0,0,0.5); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
                <img src="images/delivery_choo_chee_seabass.jpg" alt="Choo Chee Fried Sea Bass" onerror="this.src='images/logo2.png'" style="width: 100%; height: 250px; object-fit: cover;">
                <div style="padding: 20px; flex-grow: 1; display: flex; flex-direction: column;">
                    <h3 style="color: var(--color-gold); font-size: 1.3rem; margin-bottom: 10px;">Choo Chee Fried Sea Bass (4000ml)</h3>
                    <p style="color: #ccc; font-size: 0.9rem; margin-bottom: 15px; flex-grow: 1;">Fried Sea Bass in Rich Red Curry with Coconut Milk, Kaffir Lime Leaves, and Thai Basil. Large 4-liter tub.</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <span style="color: #fff; font-weight: bold; font-size: 1.2rem;">&pound;26.00</span>
                        <span style="color: #888; font-size: 0.8rem;">per 4000ml</span>
                    </div>
                    <a href="#" onclick="event.preventDefault(); addToCart({id: 'delivery-2', name: 'Choo Chee Fried Sea Bass (4000ml)', price: 26.0, qty: 1, img: 'images/delivery_choo_chee_seabass.jpg'})" style="display: block; text-align: center; padding: 12px; background-color: var(--color-gold); color: black; font-weight: bold; text-decoration: none; border-radius: 4px; transition: 0.3s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">Add to Order</a>
                </div>
            </div>

            <!-- Curry 1 -->
            <div style="background: rgba(0,0,0,0.5); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
                <img src="images/delivery_massaman_beef.jpg" alt="Massaman Beef Curry" onerror="this.src='images/logo2.png'" style="width: 100%; height: 250px; object-fit: cover;">
                <div style="padding: 20px; flex-grow: 1; display: flex; flex-direction: column;">
                    <h3 style="color: var(--color-gold); font-size: 1.3rem; margin-bottom: 10px;">Massaman Beef Curry (4000ml)</h3>
                    <p style="color: #ccc; font-size: 0.9rem; margin-bottom: 15px; flex-grow: 1;">Slow-cooked Beef in Rich Massaman Curry with Potatoes, Roasted Peanuts, and Spices. Large 4-liter tub.</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <span style="color: #fff; font-weight: bold; font-size: 1.2rem;">&pound;45.00</span>
                        <span style="color: #888; font-size: 0.8rem;">per 4000ml</span>
                    </div>
                    <a href="#" onclick="event.preventDefault(); addToCart({id: 'delivery-3', name: 'Massaman Beef Curry (4000ml)', price: 45.0, qty: 1, img: 'images/delivery_massaman_beef.jpg'})" style="display: block; text-align: center; padding: 12px; background-color: var(--color-gold); color: black; font-weight: bold; text-decoration: none; border-radius: 4px; transition: 0.3s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">Add to Order</a>
                </div>
            </div>

            <!-- Curry 2 -->
            <div style="background: rgba(0,0,0,0.5); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
                <img src="images/delivery_panang_chicken.jpg" alt="Panang Chicken Curry" onerror="this.src='images/logo2.png'" style="width: 100%; height: 250px; object-fit: cover;">
                <div style="padding: 20px; flex-grow: 1; display: flex; flex-direction: column;">
                    <h3 style="color: var(--color-gold); font-size: 1.3rem; margin-bottom: 10px;">Panang Chicken Curry (4000ml)</h3>
                    <p style="color: #ccc; font-size: 0.9rem; margin-bottom: 15px; flex-grow: 1;">Chicken in creamy Panang Curry Paste, Coconut Milk, Kaffir Lime Leaves, and Thai Basil. Large 4-liter tub.</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <span style="color: #fff; font-weight: bold; font-size: 1.2rem;">&pound;35.00</span>
                        <span style="color: #888; font-size: 0.8rem;">per 4000ml</span>
                    </div>
                    <a href="#" onclick="event.preventDefault(); addToCart({id: 'delivery-5', name: 'Panang Chicken Curry (4000ml)', price: 35.0, qty: 1, img: 'images/delivery_panang_chicken.jpg'})" style="display: block; text-align: center; padding: 12px; background-color: var(--color-gold); color: black; font-weight: bold; text-decoration: none; border-radius: 4px; transition: 0.3s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">Add to Order</a>
                </div>
            </div>

            <!-- Curry 3 -->
            <div style="background: rgba(0,0,0,0.5); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
                <img src="images/delivery_red_duck_curry.jpg" alt="Red Duck Curry" onerror="this.src='images/logo2.png'" style="width: 100%; height: 250px; object-fit: cover;">
                <div style="padding: 20px; flex-grow: 1; display: flex; flex-direction: column;">
                    <h3 style="color: var(--color-gold); font-size: 1.3rem; margin-bottom: 10px;">Red Duck Curry (4000ml)</h3>
                    <p style="color: #ccc; font-size: 0.9rem; margin-bottom: 15px; flex-grow: 1;">Roasted Duck in Red Curry with Pineapple, Cherry Tomatoes, and Lychee. Large 4-liter tub.</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <span style="color: #fff; font-weight: bold; font-size: 1.2rem;">&pound;65.00</span>
                        <span style="color: #888; font-size: 0.8rem;">per 4000ml</span>
                    </div>
                    <a href="#" onclick="event.preventDefault(); addToCart({id: 'delivery-6', name: 'Red Duck Curry (4000ml)', price: 65.0, qty: 1, img: 'images/delivery_red_duck_curry.jpg'})" style="display: block; text-align: center; padding: 12px; background-color: var(--color-gold); color: black; font-weight: bold; text-decoration: none; border-radius: 4px; transition: 0.3s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">Add to Order</a>
                </div>
            </div>

            <!-- Curry 4 -->
            <div style="background: rgba(0,0,0,0.5); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
                <img src="images/delivery_red_chicken_curry.jpg" alt="Red Chicken Curry" onerror="this.src='images/logo2.png'" style="width: 100%; height: 250px; object-fit: cover;">
                <div style="padding: 20px; flex-grow: 1; display: flex; flex-direction: column;">
                    <h3 style="color: var(--color-gold); font-size: 1.3rem; margin-bottom: 10px;">Red Chicken Curry (4000ml)</h3>
                    <p style="color: #ccc; font-size: 0.9rem; margin-bottom: 15px; flex-grow: 1;">Classic Thai Red Curry with Chicken, Bamboo Shoots, and Thai Basil. Large 4-liter tub.</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <span style="color: #fff; font-weight: bold; font-size: 1.2rem;">&pound;35.00</span>
                        <span style="color: #888; font-size: 0.8rem;">per 4000ml</span>
                    </div>
                    <a href="#" onclick="event.preventDefault(); addToCart({id: 'delivery-7', name: 'Red Chicken Curry (4000ml)', price: 35.0, qty: 1, img: 'images/delivery_red_chicken_curry.jpg'})" style="display: block; text-align: center; padding: 12px; background-color: var(--color-gold); color: black; font-weight: bold; text-decoration: none; border-radius: 4px; transition: 0.3s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">Add to Order</a>
                </div>
            </div>

            <!-- Curry 5 -->
            <div style="background: rgba(0,0,0,0.5); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
                <img src="images/delivery_green_chicken_curry.jpg" alt="Green Chicken Curry" onerror="this.src='images/logo2.png'" style="width: 100%; height: 250px; object-fit: cover;">
                <div style="padding: 20px; flex-grow: 1; display: flex; flex-direction: column;">
                    <h3 style="color: var(--color-gold); font-size: 1.3rem; margin-bottom: 10px;">Green Chicken Curry (4000ml)</h3>
                    <p style="color: #ccc; font-size: 0.9rem; margin-bottom: 15px; flex-grow: 1;">Authentic Thai Green Curry with Chicken, Thai Aubergines, and Sweet Basil. Large 4-liter tub.</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <span style="color: #fff; font-weight: bold; font-size: 1.2rem;">&pound;35.00</span>
                        <span style="color: #888; font-size: 0.8rem;">per 4000ml</span>
                    </div>
                    <a href="#" onclick="event.preventDefault(); addToCart({id: 'delivery-8', name: 'Green Chicken Curry (4000ml)', price: 35.0, qty: 1, img: 'images/delivery_green_chicken_curry.jpg'})" style="display: block; text-align: center; padding: 12px; background-color: var(--color-gold); color: black; font-weight: bold; text-decoration: none; border-radius: 4px; transition: 0.3s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">Add to Order</a>
                </div>
            </div>
        </div>
        </div>`; 

fs.writeFileSync('public/delivery.html', headerHtml + newGrid + footerHtml, 'utf8');
console.log('Successfully recreated delivery.html properly this time!');
