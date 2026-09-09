const fs = require('fs');

function processHtmlFile(filename) {
    let html = fs.readFileSync(filename, 'utf8');

    // Add 'Action' header to the tables
    html = html.replace(/<th style="padding: 4px; text-align: right;">Price<\/th><\/tr>/g, 
                        '<th style="padding: 4px; text-align: right;">Price</th><th style="padding: 4px; text-align: center;">Action</th></tr>');

    // Modify every row to include the Add button instead of making the whole row clickable
    html = html.replace(/<tr style="([^"]*)" onmouseover="[^"]*" onmouseout="[^"]*" onclick="addToCart\((.*?)\)"><td style="padding: 4px;">(.*?)<\/td><td style="padding: 4px; text-align: right;">(.*?)<\/td><\/tr>/g,
        (match, styleStr, addToCartArgs, guestsStr, priceStr) => {
            return `<tr style="border-bottom: 1px solid rgba(255, 215, 0, 0.1);"><td style="padding: 4px;">${guestsStr}</td><td style="padding: 4px; text-align: right;">${priceStr}</td><td style="padding: 4px; text-align: center;"><button onclick="addToCart(${addToCartArgs})" style="padding: 4px 10px; background-color: var(--color-gold); color: black; font-weight: bold; border: none; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">Add</button></td></tr>`;
        }
    );

    // Replace the raw checkout.html link with openCart()
    html = html.replace(/<a href="checkout\.html"[^>]*>Checkout<\/a>/g, 
                        '<button onclick="openCart()" class="add-to-cart-btn" style="text-align: center; padding: 10px; font-size: 0.9rem; background-color: var(--color-gold); color: var(--color-black); font-weight: bold; text-decoration: none; border-radius: 4px; cursor: pointer; border: none; width: 100%;">View Order & Checkout</button>');

    fs.writeFileSync(filename, html, 'utf8');
}

processHtmlFile('public/meeting-meals.html');
processHtmlFile('public/event-catering.html');

console.log('Updated tables and checkout buttons in meeting-meals.html and event-catering.html');
