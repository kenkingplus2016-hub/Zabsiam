const fs = require('fs');

function updateMenu(filePath) {
    if (!fs.existsSync(filePath)) return;

    let html = fs.readFileSync(filePath, 'utf8');

    // Regex to match the Duck Salad line
    const duckRegex = /<li[^>]*><span[^>]*>&bull;<\/span>Spicy Minced Duck Salad \(Larb Ped.*?\n/g;
    const newAppetizer = '<li style="position: relative; padding-left: 15px; margin-bottom: 4px;"><span style="color: #FFD700; position: absolute; left: 0;">&bull;</span>Deep-Fried Sea Bass with Mango Salsa (Pla Kapong Thod Rad Salsa Mamuang ปลากะพงทอดซัลซ่ามะม่วง)</li>\n';

    html = html.replace(duckRegex, newAppetizer);

    // Regex to match the Sea Bass line in Main Course
    const seaBassMainRegex = /<li[^>]*><span[^>]*>&bull;<\/span>Deep-Fried Sea Bass with Mango Salsa \(Pla Kapong Thod Rad Salsa Mamuang.*?\n/g;
    html = html.replace(seaBassMainRegex, '');

    fs.writeFileSync(filePath, html, 'utf8');
    console.log("Updated", filePath);
}

updateMenu('C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/index.html');
updateMenu('C:/Users/KENDEE/Desktop/เว็บ/public/index.html');
