const fs = require('fs');

let html = fs.readFileSync('public/canapes.html', 'utf8');

// Change Title
html = html.replace(/<title>Canap&eacute; Menu - Khrua Thai London<\/title>/g, '<title>Party Trays & Delivery - Khrua Thai London</title>');
html = html.replace(/<h2 style="color: var\(--color-gold\); font-size: 2\.5rem; margin-bottom: 20px; font-family: 'Playfair Display', serif;">Canap&eacute; Menu<\/h2>/g, '<h2 style="color: var(--color-gold); font-size: 2.5rem; margin-bottom: 20px; font-family: \\'Playfair Display\\', serif;">Party Trays & Delivery</h2>');
html = html.replace(/<p style="color: #ccc; max-width: 800px; margin: 0 auto; font-size: 1\.1rem; line-height: 1\.6;">[\s\S]*?<\/p>/, '<p style="color: #ccc; max-width: 800px; margin: 0 auto; font-size: 1.1rem; line-height: 1.6;">Authentic Thai party trays and large portion delivery. Perfect for house parties, office lunches, or family gatherings.</p>');

// Remove Canapes Grid and Packages
const contentRegex = /<div style="display: grid; grid-template-columns: repeat\(auto-fit, minmax\(300px, 1fr\)\); gap: 30px;">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/;

const newGrid = `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
            <!-- Item 1 -->
            <div style="background: rgba(0,0,0,0.5); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
                <img src="images/delivery_seabass_fish_sauce.jpg" alt="Deep Fried Sea Bass with Fish Sauce" onerror="this.src='images/logo2.png'" style="width: 100%; height: 250px; object-fit: cover;">
                <div style="padding: 20px; flex-grow: 1; display: flex; flex-direction: column;">
                    <h3 style="color: var(--color-gold); font-size: 1.3rem; margin-bottom: 10px;">Deep Fried Sea Bass with Fish Sauce</h3>
                    <p style="color: #ccc; font-size: 0.9rem; margin-bottom: 15px; flex-grow: 1;">Whole Deep-Fried Sea Bass in Sweet Fish Sauce, served with Shredded Mango Salad, Peanuts, and Fried Shallots.</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <span style="color: #fff; font-weight: bold; font-size: 1.2rem;">&pound;35.00</span>
                        <span style="color: #888; font-size: 0.8rem;">per tray</span>
                    </div>
                    <a href="#" onclick="event.preventDefault(); addToCart({id: 'delivery-1', name: 'Deep Fried Sea Bass with Fish Sauce (Tray)', price: 35.0, qty: 1, img: 'images/delivery_seabass_fish_sauce.jpg'})" style="display: block; text-align: center; padding: 12px; background-color: var(--color-gold); color: black; font-weight: bold; text-decoration: none; border-radius: 4px; transition: 0.3s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">Add to Order</a>
                </div>
            </div>

            <!-- Item 2 -->
            <div style="background: rgba(0,0,0,0.5); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
                <img src="images/delivery_choo_chee_seabass.jpg" alt="Choo Chee Fried Sea Bass" onerror="this.src='images/logo2.png'" style="width: 100%; height: 250px; object-fit: cover;">
                <div style="padding: 20px; flex-grow: 1; display: flex; flex-direction: column;">
                    <h3 style="color: var(--color-gold); font-size: 1.3rem; margin-bottom: 10px;">Choo Chee Fried Sea Bass (4000ml)</h3>
                    <p style="color: #ccc; font-size: 0.9rem; margin-bottom: 15px; flex-grow: 1;">Fried Sea Bass in Rich Red Curry with Coconut Milk, Kaffir Lime Leaves, and Thai Basil. Large 4-liter tub.</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <span style="color: #fff; font-weight: bold; font-size: 1.2rem;">&pound;65.00</span>
                        <span style="color: #888; font-size: 0.8rem;">per 4000ml</span>
                    </div>
                    <a href="#" onclick="event.preventDefault(); addToCart({id: 'delivery-2', name: 'Choo Chee Fried Sea Bass (4000ml)', price: 65.0, qty: 1, img: 'images/delivery_choo_chee_seabass.jpg'})" style="display: block; text-align: center; padding: 12px; background-color: var(--color-gold); color: black; font-weight: bold; text-decoration: none; border-radius: 4px; transition: 0.3s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">Add to Order</a>
                </div>
            </div>

            <!-- Item 3 -->
            <div style="background: rgba(0,0,0,0.5); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
                <img src="images/delivery_massaman_beef.jpg" alt="Massaman Beef Curry" onerror="this.src='images/logo2.png'" style="width: 100%; height: 250px; object-fit: cover;">
                <div style="padding: 20px; flex-grow: 1; display: flex; flex-direction: column;">
                    <h3 style="color: var(--color-gold); font-size: 1.3rem; margin-bottom: 10px;">Massaman Beef Curry (4000ml)</h3>
                    <p style="color: #ccc; font-size: 0.9rem; margin-bottom: 15px; flex-grow: 1;">Slow-cooked Beef in Rich Massaman Curry with Potatoes, Roasted Peanuts, and Spices. Large 4-liter tub.</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <span style="color: #fff; font-weight: bold; font-size: 1.2rem;">&pound;65.00</span>
                        <span style="color: #888; font-size: 0.8rem;">per 4000ml</span>
                    </div>
                    <a href="#" onclick="event.preventDefault(); addToCart({id: 'delivery-3', name: 'Massaman Beef Curry (4000ml)', price: 65.0, qty: 1, img: 'images/delivery_massaman_beef.jpg'})" style="display: block; text-align: center; padding: 12px; background-color: var(--color-gold); color: black; font-weight: bold; text-decoration: none; border-radius: 4px; transition: 0.3s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">Add to Order</a>
                </div>
            </div>

            <!-- Item 4 -->
            <div style="background: rgba(0,0,0,0.5); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
                <img src="images/delivery_pla_lui_suan.jpg" alt="Pla Lui Suan" onerror="this.src='images/logo2.png'" style="width: 100%; height: 250px; object-fit: cover;">
                <div style="padding: 20px; flex-grow: 1; display: flex; flex-direction: column;">
                    <h3 style="color: var(--color-gold); font-size: 1.3rem; margin-bottom: 10px;">Pla Lui Suan</h3>
                    <p style="color: #ccc; font-size: 0.9rem; margin-bottom: 15px; flex-grow: 1;">Deep-Fried Sea Bass with Herb Salad, Lemongrass, Kaffir Lime Leaves, Shallots, Peanuts, and Chili.</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <span style="color: #fff; font-weight: bold; font-size: 1.2rem;">&pound;35.00</span>
                        <span style="color: #888; font-size: 0.8rem;">per tray</span>
                    </div>
                    <a href="#" onclick="event.preventDefault(); addToCart({id: 'delivery-4', name: 'Pla Lui Suan (Tray)', price: 35.0, qty: 1, img: 'images/delivery_pla_lui_suan.jpg'})" style="display: block; text-align: center; padding: 12px; background-color: var(--color-gold); color: black; font-weight: bold; text-decoration: none; border-radius: 4px; transition: 0.3s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">Add to Order</a>
                </div>
            </div>

            <!-- Item 5 -->
            <div style="background: rgba(0,0,0,0.5); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
                <img src="images/delivery_panang_chicken.jpg" alt="Panang Chicken Curry" onerror="this.src='images/logo2.png'" style="width: 100%; height: 250px; object-fit: cover;">
                <div style="padding: 20px; flex-grow: 1; display: flex; flex-direction: column;">
                    <h3 style="color: var(--color-gold); font-size: 1.3rem; margin-bottom: 10px;">Panang Chicken Curry (4000ml)</h3>
                    <p style="color: #ccc; font-size: 0.9rem; margin-bottom: 15px; flex-grow: 1;">Chicken in creamy Panang Curry Paste, Coconut Milk, Kaffir Lime Leaves, and Thai Basil. Large 4-liter tub.</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <span style="color: #fff; font-weight: bold; font-size: 1.2rem;">&pound;65.00</span>
                        <span style="color: #888; font-size: 0.8rem;">per 4000ml</span>
                    </div>
                    <a href="#" onclick="event.preventDefault(); addToCart({id: 'delivery-5', name: 'Panang Chicken Curry (4000ml)', price: 65.0, qty: 1, img: 'images/delivery_panang_chicken.jpg'})" style="display: block; text-align: center; padding: 12px; background-color: var(--color-gold); color: black; font-weight: bold; text-decoration: none; border-radius: 4px; transition: 0.3s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">Add to Order</a>
                </div>
            </div>

        </div>
        </div>
    </section>`;

html = html.replace(/<h2 style="color: var\(--color-gold\); font-size: 2\.5rem; margin-bottom: 20px; font-family: 'Playfair Display', serif;">Canap&eacute; Menu<\/h2>/g, '<h2 style="color: var(--color-gold); font-size: 2.5rem; margin-bottom: 20px; font-family: \\'Playfair Display\\', serif;">Party Trays & Delivery</h2>');

html = html.replace(contentRegex, newGrid);

// Remove the suggested portion guide for canapes
html = html.replace(/<div style="background-color: rgba\(255, 215, 0, 0\.1\); border: 1px solid var\(--color-gold\); border-radius: 8px; padding: 15px; margin-bottom: 30px; text-align: center;">[\s\S]*?<\/div>/, '');

fs.writeFileSync('public/delivery.html', html, 'utf8');
console.log('Created modern dark-theme delivery.html');
