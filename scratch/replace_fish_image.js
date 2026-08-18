const fs = require('fs');

function replaceLastBanquetImage(filePath) {
    if (!fs.existsSync(filePath)) return;

    let html = fs.readFileSync(filePath, 'utf8');

    // Replace the-modernist-aesthetic.jpg with new_deep_fried_fish.jpg
    html = html.replace(/"images\/the-modernist-aesthetic\.jpg"/g, '"images/new_deep_fried_fish.jpg"');

    fs.writeFileSync(filePath, html, 'utf8');
    console.log("Updated image in", filePath);
}

replaceLastBanquetImage('C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/index.html');
replaceLastBanquetImage('C:/Users/KENDEE/Desktop/เว็บ/public/index.html');
