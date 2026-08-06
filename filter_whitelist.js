const fs = require('fs');
const path = require('path');

const repoJson = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data\\buffet_menu.json';
const localJson = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\data\\buffet_menu.json';

try {
    let data = JSON.parse(fs.readFileSync(repoJson, 'utf8'));

    const keepKeywords = [
        "กระเพรา", "กะเพรา", "basil", 
        "ยำ", "yum", "spicy salad", 
        "พล่า", 
        "ลาบ", "larb", 
        "เมี่ยง", "เมียง", "miang", 
        "ข้าวเหนียวมะม่วง", "mango sticky rice"
    ];

    data.forEach(cat => {
        cat.items = cat.items.filter(item => {
            const enName = (item.en || '').toLowerCase();
            const thName = (item.th || '').toLowerCase();
            
            // Allow if any keyword matches
            return keepKeywords.some(kw => enName.includes(kw) || thName.includes(kw));
        });
    });

    // Remove empty categories entirely (optional, but keeps JSON clean)
    // Wait, the UI expects specific categories, I'll just leave them empty if they have no items.

    fs.writeFileSync(repoJson, JSON.stringify(data, null, 4), 'utf8');
    if (fs.existsSync(localJson)) {
        fs.writeFileSync(localJson, JSON.stringify(data, null, 4), 'utf8');
    }
    console.log("Filtered buffet_menu.json successfully! Only keeping specific menus.");
} catch (e) {
    console.error("Error:", e);
}
