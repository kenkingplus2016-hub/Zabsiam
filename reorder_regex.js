const fs = require('fs');

let html = fs.readFileSync('public/delivery.html', 'utf8');

const regex = /<div style="display: grid; grid-template-columns: repeat\(auto-fit, minmax\(300px, 1fr\)\); gap: 30px; text-align: left;">[\s\S]*?<\/div>\s*<\/div>/;

const newGrid = `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; text-align: left;">
            <!-- Fish 1 -->
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

            <!-- Fish 2 -->
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

            <!-- Fish 3 -->
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

            <!-- Curry 1 -->
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

            <!-- Curry 2 -->
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
                        <span style="color: #fff; font-weight: bold; font-size: 1.2rem;">&pound;65.00</span>
                        <span style="color: #888; font-size: 0.8rem;">per 4000ml</span>
                    </div>
                    <a href="#" onclick="event.preventDefault(); addToCart({id: 'delivery-7', name: 'Red Chicken Curry (4000ml)', price: 65.0, qty: 1, img: 'images/delivery_red_chicken_curry.jpg'})" style="display: block; text-align: center; padding: 12px; background-color: var(--color-gold); color: black; font-weight: bold; text-decoration: none; border-radius: 4px; transition: 0.3s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">Add to Order</a>
                </div>
            </div>

            <!-- Curry 5 -->
            <div style="background: rgba(0,0,0,0.5); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
                <img src="images/delivery_green_chicken_curry.jpg" alt="Green Chicken Curry" onerror="this.src='images/logo2.png'" style="width: 100%; height: 250px; object-fit: cover;">
                <div style="padding: 20px; flex-grow: 1; display: flex; flex-direction: column;">
                    <h3 style="color: var(--color-gold); font-size: 1.3rem; margin-bottom: 10px;">Green Chicken Curry (4000ml)</h3>
                    <p style="color: #ccc; font-size: 0.9rem; margin-bottom: 15px; flex-grow: 1;">Authentic Thai Green Curry with Chicken, Thai Aubergines, and Sweet Basil. Large 4-liter tub.</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <span style="color: #fff; font-weight: bold; font-size: 1.2rem;">&pound;65.00</span>
                        <span style="color: #888; font-size: 0.8rem;">per 4000ml</span>
                    </div>
                    <a href="#" onclick="event.preventDefault(); addToCart({id: 'delivery-8', name: 'Green Chicken Curry (4000ml)', price: 65.0, qty: 1, img: 'images/delivery_green_chicken_curry.jpg'})" style="display: block; text-align: center; padding: 12px; background-color: var(--color-gold); color: black; font-weight: bold; text-decoration: none; border-radius: 4px; transition: 0.3s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">Add to Order</a>
                </div>
            </div>
        </div>
        </div>`;

const newHtml = html.replace(regex, newGrid);

if (newHtml !== html) {
    fs.writeFileSync('public/delivery.html', newHtml, 'utf8');
    console.log('Successfully replaced grid');
} else {
    console.log('Regex did not match');
}
