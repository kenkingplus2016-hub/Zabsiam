const fs = require('fs');

['public/banquets.html', 'public/index.html'].forEach(file => {
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    // Replace the exact text (including the corrupted question marks just in case)
    html = html.replace(/Steamed Fish in Lime Sauce \(Pla Neung Ma-Now\)[^\n<]*/g, 'Duck Larb (Larb Ped)');
    
    // Also clean up any other ??? that might have been corrupted emojis
    // e.g., Green Chicken Curry (Gaeng Keow Wan Gai) ???
    html = html.replace(/ \?\?\?/g, '');
    html = html.replace(/ YO\?/g, ''); // the other corrupted symbol
    
    fs.writeFileSync(file, html, 'utf8');
    console.log(`Updated ${file}`);
});
