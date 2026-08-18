const fs = require('fs');

function replaceNamPrik(filePath) {
    if (!fs.existsSync(filePath)) return;

    let html = fs.readFileSync(filePath, 'utf8');

    const newAppetizer = '<li style="position: relative; padding-left: 15px; margin-bottom: 4px;"><span style="color: #FFD700; position: absolute; left: 0;">&bull;</span>Grilled Pork wrapped in Betel Leaves (Moo Yang Bai Chaplu หมูย่างใบชะพลู)</li>\n';

    const namPrikOng = /<li[^>]*><span[^>]*>&bull;<\/span>Northern Thai Pork & Tomato Dip \(Nam Prik Ong.*?\n/g;
    const namPrikNoom = /<li[^>]*><span[^>]*>&bull;<\/span>Northern Thai Green Chili Dip with Veggies \(Nam Prik Noom.*?\n/g;
    const namPrikLongRuea = /<li[^>]*><span[^>]*>&bull;<\/span>Spicy Shrimp Paste Dip with Sweet Pork \(Nam Prik Long Ruea.*?\n/g;

    html = html.replace(namPrikOng, newAppetizer);
    html = html.replace(namPrikNoom, newAppetizer);
    html = html.replace(namPrikLongRuea, newAppetizer);

    fs.writeFileSync(filePath, html, 'utf8');
    console.log("Updated", filePath);
}

replaceNamPrik('C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/index.html');
replaceNamPrik('C:/Users/KENDEE/Desktop/เว็บ/public/index.html');
