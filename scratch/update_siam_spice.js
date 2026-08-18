const fs = require('fs');

function updateSiamSpice(filePath) {
    if (!fs.existsSync(filePath)) return;

    let html = fs.readFileSync(filePath, 'utf8');

    // Split HTML into parts so we only target the Siam Spice Banquet section
    const parts = html.split('<h3>8-Course Siam Spice Banquet</h3>');
    if (parts.length === 2) {
        let siamSection = parts[1];
        
        const oldText = /<li[^>]*><span[^>]*>&bull;<\/span>Pomelo Salad with Prawns \(Yum Som O Goong.*?\n/;
        const newText = '<li style="position: relative; padding-left: 15px; margin-bottom: 4px;"><span style="color: #FFD700; position: absolute; left: 0;">&bull;</span>Spicy Salmon Salad (Phla Pla Salmon พล่าปลาแซลมอน) 🌶️🌶️</li>\n';
        
        siamSection = siamSection.replace(oldText, newText);
        
        html = parts[0] + '<h3>8-Course Siam Spice Banquet</h3>' + siamSection;
        fs.writeFileSync(filePath, html, 'utf8');
        console.log("Updated", filePath);
    } else {
        console.log("Could not find Siam Spice Banquet section");
    }
}

updateSiamSpice('C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/index.html');
updateSiamSpice('C:/Users/KENDEE/Desktop/เว็บ/public/index.html');
