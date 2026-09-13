const fs = require('fs');

let html = fs.readFileSync('public/delivery.html', 'utf8');

const newItemHtml = `
            <!-- Beef Grill -->
            <div style="background: rgba(0,0,0,0.5); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
                <img src="images/delivery_suea_rong_hai.jpg" alt="Suea Rong Hai" onerror="this.src='images/logo2.png'" style="width: 100%; height: 250px; object-fit: cover;">
                <div style="padding: 20px; flex-grow: 1; display: flex; flex-direction: column;">
                    <h3 style="color: var(--color-gold); font-size: 1.3rem; margin-bottom: 10px;">Suea Rong Hai (Weeping Tiger Beef)</h3>
                    <p style="color: #ccc; font-size: 0.9rem; margin-bottom: 15px; flex-grow: 1;">Premium marinated Thai grilled beef, sliced and served with our signature spicy tamarind dipping sauce. Large party tray.</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <span style="color: #fff; font-weight: bold; font-size: 1.2rem;">&pound;55.00</span>
                        <span style="color: #888; font-size: 0.8rem;">per tray</span>
                    </div>
                    <a href="#" onclick="event.preventDefault(); addToCart({id: 'delivery-10', name: 'Suea Rong Hai (Tray)', price: 55.0, qty: 1, img: 'images/delivery_suea_rong_hai.jpg'})" style="display: block; text-align: center; padding: 12px; background-color: var(--color-gold); color: black; font-weight: bold; text-decoration: none; border-radius: 4px; transition: 0.3s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">Add to Order</a>
                </div>
            </div>
`;

// Insert after Kor Moo Yang
const searchTarget = `addToCart({id: 'delivery-9', name: 'Kor Moo Yang (Tray)'`;
const searchIndex = html.indexOf(searchTarget);

if (searchIndex !== -1) {
    const endOfDiv = html.indexOf('</div>', searchIndex);
    const insertPosition = html.indexOf('</div>', endOfDiv + 1) + 6; // To cover the item div closure
    
    html = html.substring(0, insertPosition) + newItemHtml + html.substring(insertPosition);
    fs.writeFileSync('public/delivery.html', html, 'utf8');
    console.log('Successfully inserted Suea Rong Hai');
} else {
    console.log('Failed to find insertion point');
}
