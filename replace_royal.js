const fs = require('fs');

let files = ['public/banquets.html', 'public/index.html'];

files.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    html = html.replace(/<img src="images\/new_larb_ped\.jpg" alt="8-Course Banquet"/g, 
                        '<img src="images/royal_banquet.jpg" alt="8-Course Royal Thai Experience"');
    
    // Check if the addToCart functions reference an old image
    // In banquets.html around line 191:
    // addToCart({id: '8-course-banquet--8-guests-', name: '8-Course Banquet (8 Guests)', price: 544, qty: 1, img: 'images/the-royal-artisan.jpg'})
    html = html.replace(/'images\/the-royal-artisan\.jpg'/g, "'images/royal_banquet.jpg'");
    
    fs.writeFileSync(file, html, 'utf8');
});

console.log('Updated Royal Thai Experience images in banquets.html and index.html');
