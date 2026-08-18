const fs = require('fs');

function updateToCart(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log("File not found:", filePath);
        return;
    }
    
    let html = fs.readFileSync(filePath, 'utf8');

    // The old button template (from previous step)
    const oldBtn = `<a href="mailto:info@zabsiam.co.uk?subject=Event%20Catering%20Inquiry" class="add-to-cart-btn" style="padding: 10px 20px; font-size: 0.95rem; width: 100%; display: inline-block; box-sizing: border-box;">Contact Us for Your Event</a>`;

    // We have to replace each one uniquely based on the card title. 
    // We can just use split and keep an index, or replace one by one.
    
    const options = [
        { name: 'Event Catering: Intimate Birthday Celebration (80 Guests Base)', price: 2000, img: 'images/the-signature-touch.jpg' },
        { name: 'Event Catering: Art Gallery Opening Catering (80 Guests Base)', price: 2000, img: 'images/the-royal-experience.jpg' },
        { name: 'Event Catering: City Corporate Launch (80 Guests Base)', price: 2000, img: 'images/the-ultimate-feast.jpg' },
        { name: 'Event Catering: Wedding Summer Food Festival Style (80 Guests Base)', price: 2000, img: 'images/the-ultimate-feast.jpg' }
    ];

    let parts = html.split(oldBtn);
    if (parts.length === 5) { // 4 replacements -> 5 parts
        let newHtml = parts[0];
        for (let i = 0; i < 4; i++) {
            let opt = options[i];
            let newBtn = `<a href="#" onclick="event.preventDefault(); addToCart('${opt.name}', ${opt.price}, '${opt.img}')" class="add-to-cart-btn" style="padding: 10px 20px; font-size: 0.95rem; width: 100%; display: inline-block; box-sizing: border-box; background-color: var(--color-gold); color: var(--color-black); font-weight: bold;">Book Event Catering</a>`;
            newHtml += newBtn + parts[i + 1];
        }
        fs.writeFileSync(filePath, newHtml, 'utf8');
        console.log("Updated", filePath);
    } else {
        console.log("Could not find exactly 4 buttons. Found:", parts.length - 1);
    }
}

updateToCart('C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/index.html');
updateToCart('C:/Users/KENDEE/Desktop/เว็บ/public/index.html');
