const fs = require('fs');

let html = fs.readFileSync('public/delivery.html', 'utf8');

const newItems = `
            <!-- Item 6 -->
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

            <!-- Item 7 -->
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

            <!-- Item 8 -->
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
`;

// Insert the new items right before the closing </div> of the grid
const insertIndex = html.lastIndexOf('</div>\n        </div>');
if (insertIndex !== -1) {
    const finalHtml = html.substring(0, insertIndex) + newItems + html.substring(insertIndex);
    fs.writeFileSync('public/delivery.html', finalHtml, 'utf8');
    console.log('Added 3 new curries to delivery.html');
} else {
    console.log('Could not find insertion point.');
}
