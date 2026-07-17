const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const dessertsCategory = data.find(c => c.id === 'desserts');

if (dessertsCategory) {
    const takoIndex = dessertsCategory.items.findIndex(i => i.th === 'ขนมตะโก้');
    
    if (takoIndex !== -1) {
        // Rename existing
        dessertsCategory.items[takoIndex].th = "ขนมตะโก้ข้าวโพด";
        dessertsCategory.items[takoIndex].en = "Tako (Sweet Corn Thai Pudding)";
        
        // Add new
        const taroTako = {
            id: `item_${Math.random().toString(36).substr(2, 9)}`,
            th: "ขนมตะโก้เผือก",
            en: "Tako (Taro Thai Pudding)",
            img: "logo.png",
            price: 12
        };
        
        dessertsCategory.items.splice(takoIndex + 1, 0, taroTako);
        
        fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
        console.log("Renamed ขนมตะโก้ to ขนมตะโก้ข้าวโพด and added ขนมตะโก้เผือก");
    } else {
        console.log("Could not find ขนมตะโก้");
    }
}
