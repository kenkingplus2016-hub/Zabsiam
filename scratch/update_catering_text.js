const fs = require('fs');

function updateCatering(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log("File not found:", filePath);
        return;
    }
    
    let html = fs.readFileSync(filePath, 'utf8');

    // Update subtitle
    html = html.replace(
        '<p style="color: #FFD700; font-size: 1.2rem; margin-top: 10px;">รับจัดเลี้ยงนอกสถานที่ สำหรับแขกตั้งแต่ 80 ท่านขึ้นไป</p>',
        '<p style="color: #FFD700; font-size: 1.2rem; margin-top: 10px;">Event Catering for a minimum of 80 guests</p>'
    );

    // Update cards to add the pricing and course info
    const priceHtml = `\n                    <p style="color: #ccc; font-size: 0.95rem; margin-top: 12px; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 12px;">Starting from &pound;25 per Guest<br/><span style="color: var(--color-gold); font-size: 0.85rem;">8-Course Menu</span></p>`;

    // Helper to safely append price tag if not already there
    function addPriceToCard(title) {
        const searchStr = `<h3 style="color: var(--color-white); font-size: 1.1rem; line-height: 1.4;">${title}</h3>`;
        if (html.includes(searchStr) && !html.includes(`${title}</h3>${priceHtml}`)) {
            html = html.replace(searchStr, searchStr + priceHtml);
        }
    }

    addPriceToCard('Intimate Birthday Celebration');
    addPriceToCard('Art Gallery Opening Catering');
    addPriceToCard('City Corporate Launch');
    addPriceToCard('Wedding Summer Food Festival Style');

    fs.writeFileSync(filePath, html, 'utf8');
    console.log("Updated", filePath);
}

updateCatering('C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/index.html');
updateCatering('C:/Users/KENDEE/Desktop/เว็บ/public/index.html');
