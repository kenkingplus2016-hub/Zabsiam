const fs = require('fs');

function addSteamedBass(filePath) {
    if (!fs.existsSync(filePath)) return;

    let html = fs.readFileSync(filePath, 'utf8');

    // The line to insert
    const steamedBass = '<li style="position: relative; padding-left: 15px; margin-bottom: 4px;"><span style="color: #FFD700; position: absolute; left: 0;">&bull;</span>Steamed Sea Bass in Soy Sauce (Pla Neung See-Ew ปลากะพงนึ่งซีอิ๊ว)</li>\n';
    
    // We want to insert it in the Main Course of Exotic Fusion Banquet. 
    // The previous line is Lamb Massaman Curry (Gaeng Massaman Gaeh...
    const lambRegex = /(<li[^>]*><span[^>]*>&bull;<\/span>Lamb Massaman Curry \(Gaeng Massaman Gaeh.*?\n)/;
    
    if (lambRegex.test(html) && !html.includes('Steamed Sea Bass in Soy Sauce (Pla Neung See-Ew')) {
        html = html.replace(lambRegex, steamedBass + '$1');
        fs.writeFileSync(filePath, html, 'utf8');
        console.log("Updated", filePath);
    } else {
        console.log("Not updated or already exists.", filePath);
    }
}

addSteamedBass('C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/index.html');
addSteamedBass('C:/Users/KENDEE/Desktop/เว็บ/public/index.html');
