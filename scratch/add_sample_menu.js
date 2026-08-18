const fs = require('fs');

function addMenuToList(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log("File not found:", filePath);
        return;
    }
    
    let html = fs.readFileSync(filePath, 'utf8');

    // The menu list HTML to inject
    const menuHtml = `
                    <div style="text-align: left; margin-top: 15px; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 5px;">
                        <p style="color: var(--color-gold); font-size: 0.9rem; margin-bottom: 8px; font-weight: bold; text-align: center;">Sample Menu Included:</p>
                        <ul style="color: #ddd; font-size: 0.8rem; line-height: 1.5; margin: 0; padding-left: 20px;">
                            <li>Prawn Spring Rolls (Kung Hom Sabai กุ้งห่มสไบ)</li>
                            <li>Northern Thai Sausage (Sai Ua หมูไส้อั่ว)</li>
                            <li>Grilled Pork Neck (Kor Moo Yang คอหมูย่าง)</li>
                            <li>Pad Thai with Prawns (Pad Thai Goong ผัดไทยกุ้ง)</li>
                            <li>Beef Massaman Curry (Massaman Neua แกงมัสมั่นเนื้อ)</li>
                            <li>Chicken Fried Rice (Khao Pad Gai ข้าวผัดไก่)</li>
                            <li>Mango Sticky Rice (Khao Niao Mamuang ข้าวเหนียวมะม่วง)</li>
                        </ul>
                    </div>`;

    // We'll insert it right after the price text inside each card
    const searchPriceStr = `<span style="color: var(--color-gold); font-size: 0.85rem;">8-Course Menu</span></p>`;
    
    if (html.includes(searchPriceStr)) {
        // Split and join to replace all occurrences
        html = html.split(searchPriceStr).join(searchPriceStr + menuHtml);
        fs.writeFileSync(filePath, html, 'utf8');
        console.log("Updated", filePath);
    } else {
        console.log("Could not find the insertion point.");
    }
}

addMenuToList('C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/index.html');
addMenuToList('C:/Users/KENDEE/Desktop/เว็บ/public/index.html');
