const fs = require('fs');
const path = require('path');

const newHTML = `<a href="booking.html" id="nav-booking" class="nav-link" style="position:relative; padding-right:15px; display:inline-flex; align-items:center;">
            <i class="fas fa-shopping-cart" style="font-size: 1.3rem;"></i>
            <span id="nav-cart-badge-inner" style="position:absolute; top:-8px; right:-5px; background:#FF3B30; color:white; font-size:0.75rem; width:20px; height:20px; border-radius:50%; display:none; align-items:center; justify-content:center; font-weight:bold; border:2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">0</span>
        </a>`;

const dir = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(f => {
    const file = path.join(dir, f);
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    const target1 = '<a href="booking.html" id="nav-booking" class="nav-link"><span class="nav-th">จองงาน</span><span class="nav-en">Booking</span></a>';
    const target2 = '<a href="booking.html" id="nav-booking" class="nav-link active"><span class="nav-th">จองงาน</span><span class="nav-en">Booking</span></a>';
    const target3 = '<a href="booking.html" class="book-now-btn">Enquire Now</a>';
    
    if (content.includes(target1)) {
        content = content.replace(target1, newHTML);
        changed = true;
    }
    
    if (content.includes(target2)) {
        const newHTMLActive = newHTML.replace('class="nav-link"', 'class="nav-link active"');
        content = content.replace(target2, newHTMLActive);
        changed = true;
    }
    
    if (content.includes(target3)) {
        const newHTMLHome = newHTML.replace('class="nav-link"', 'class="book-now-btn"');
        content = content.replace(target3, newHTMLHome);
        changed = true;
    }
    
    if (changed) {
        fs.writeFileSync(file, content);
        console.log("Updated HTML directly in " + f);
    }
});
