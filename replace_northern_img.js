const fs = require('fs');

['public/index.html', 'public/banquets.html'].forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    
    // Replace the main image
    html = html.replace(/<img src="images\/new_sai_ua\.jpg" alt="8-Course Northern Banquet"/g, 
                        '<img src="images/northern_heritage.jpg" alt="8-Course Northern Heritage Banquet"');
                        
    // Replace the addToCart image
    // Currently it is: img: 'images/the-signature-touch.jpg' for 8-course-northern-heritage-banquet
    html = html.replace(/img: 'images\/the-signature-touch\.jpg'}\)"/g, 
                        "img: 'images/northern_heritage.jpg'})\"");
                        
    fs.writeFileSync(file, html, 'utf8');
    console.log(`Updated image for Northern Heritage in ${file}`);
});
