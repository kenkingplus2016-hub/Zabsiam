const fs = require('fs');

['public/index.html', 'public/banquets.html'].forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    
    // Replace the image for 8-Course Signature Banquet
    // We look for: <img src="images/new_grilled_pork.jpg" alt="8-Course Signature Banquet"
    html = html.replace(/<img src="images\/new_grilled_pork\.jpg" alt="8-Course Signature Banquet"/g, 
                        '<img src="images/the-signature.jpg" alt="8-Course Signature Banquet"');
                        
    fs.writeFileSync(file, html, 'utf8');
    console.log(`Updated image in ${file}`);
});
