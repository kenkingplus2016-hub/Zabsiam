const fs = require('fs');

['public/banquets.html', 'public/index.html'].forEach(file => {
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    // Replace the exact text
    html = html.replace(/Watermelon &amp; Dried Fish \(Tangmo Pla Haeng\)/g, 'Mini Crispy Thai Prawn Cake');
    html = html.replace(/Watermelon & Dried Fish \(Tangmo Pla Haeng\)/g, 'Mini Crispy Thai Prawn Cake');
    
    fs.writeFileSync(file, html, 'utf8');
    console.log(`Updated ${file}`);
});
