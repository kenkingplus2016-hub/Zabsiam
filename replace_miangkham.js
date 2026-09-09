const fs = require('fs');

['public/banquets.html', 'public/index.html'].forEach(file => {
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    // Replace Sea Bass Miang Kham with Miang Kham Duo
    html = html.replace(/Sea Bass Miang Kham \(Miang Kham Pla Sea Bass\)/g, 'Miang Kham Duo (Miang Kham Duo)');
    
    fs.writeFileSync(file, html, 'utf8');
    console.log(`Updated ${file}`);
});
