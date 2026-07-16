const fs = require('fs');

const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/js/cart.js';
if (!fs.existsSync(file)) return;
let content = fs.readFileSync(file, 'utf8');

const oldCode = `    // Do not show floating cart inside booking.html`;
const newCode = `    // Update top nav booking link to show cart icon
    const navBooking = document.getElementById('nav-booking');
    if (navBooking) {
        if (!document.getElementById('nav-cart-badge-inner')) {
            navBooking.style.position = 'relative';
            navBooking.style.paddingRight = '15px';
            navBooking.style.display = 'inline-flex';
            navBooking.style.alignItems = 'center';
            navBooking.innerHTML = \`<i class="fas fa-shopping-cart" style="font-size: 1.3rem;"></i>
                <span id="nav-cart-badge-inner" style="position:absolute; top:-8px; right:-5px; background:#FF3B30; color:white; font-size:0.75rem; width:20px; height:20px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold; border:2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2); display:none;">0</span>\`;
        }
        
        const navBadge = document.getElementById('nav-cart-badge-inner');
        if (navBadge) {
            navBadge.innerText = totalItems;
            if (totalItems > 0) {
                navBadge.style.display = 'flex';
            } else {
                navBadge.style.display = 'none';
            }
        }
    }
    
    // Do not show floating cart inside booking.html`;

if (content.includes(oldCode) && !content.includes('nav-cart-badge-inner')) {
    content = content.replace(oldCode, newCode);
    fs.writeFileSync(file, content);
    console.log("Updated cart.js to replace top nav booking link with cart icon");
} else {
    console.log("Could not inject or already injected");
}
