const fs = require('fs');

function updateExoticFusion(filePath) {
    if (!fs.existsSync(filePath)) return;

    let html = fs.readFileSync(filePath, 'utf8');

    // Split HTML into parts so we only target the Exotic Fusion Banquet section
    const parts = html.split('<h3>8-Course Exotic Fusion Banquet</h3>');
    if (parts.length === 2) {
        let exoticSection = parts[1];
        
        const oldText = /<li[^>]*><span[^>]*>&bull;<\/span>Pomelo Salad with Prawns \(Yum Som O Goong.*?\n/;
        const newText = '<li style="position: relative; padding-left: 15px; margin-bottom: 4px;"><span style="color: #FFD700; position: absolute; left: 0;">&bull;</span>Sea Bass Miang Kham (Miang Kham Pla Sea Bass เมี่ยงคำปลาซีบาส)</li>\n';
        
        exoticSection = exoticSection.replace(oldText, newText);
        
        html = parts[0] + '<h3>8-Course Exotic Fusion Banquet</h3>' + exoticSection;
        fs.writeFileSync(filePath, html, 'utf8');
        console.log("Updated", filePath);
    } else {
        console.log("Could not find Exotic Fusion Banquet section");
    }
}

updateExoticFusion('C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/index.html');
updateExoticFusion('C:/Users/KENDEE/Desktop/เว็บ/public/index.html');
