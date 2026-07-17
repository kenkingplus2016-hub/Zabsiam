const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/menu.json', 'utf8'));
const choices = data[0].options[0].choices;

const buffetMenu = {
    seafood: {
        id: "seafood",
        title: { th: "เมนูซีฟู้ด (Seafood)", en: "Seafood Dishes" },
        price: 15,
        items: []
    },
    meat: {
        id: "meat",
        title: { th: "เมนูเนื้อสัตว์ (Meat & Poultry)", en: "Meat & Poultry Dishes" },
        price: 14,
        items: []
    },
    veg_dessert: {
        id: "veg_dessert",
        title: { th: "เมนูผัก อาหารว่าง และของหวาน", en: "Vegetables, Appetizers & Desserts" },
        price: 12,
        items: []
    }
};

choices.forEach(c => {
    let type = "meat"; // default
    const thName = c.th;

    if (thName.includes("ปลา") || thName.includes("กุ้ง") || thName.includes("หมึก") || thName.includes("หอย") || thName.includes("แซลมอน") || thName.includes("ซีบาส") || thName.includes("ปู")) {
        type = "seafood";
    } else if (thName.includes("ผัก") || thName.includes("เห็ด") || thName.includes("เต้าหู้") || thName.includes("ขนม") || thName.includes("ไอศกรีม") || thName.includes("ผลไม้") || thName.includes("บัวลอย") || thName.includes("วุ้น") || thName.includes("ลอดช่อง") || thName.includes("ทับทิมกรอบ") || thName.includes("ส้มตำ") || thName.includes("หน่อไม้") || thName.includes("ข้าวผัด")) {
        // Wait, Khao Pad (Fried Rice) is probably 12 unless it's Khao Pad Goong.
        if (thName.includes("กุ้ง") || thName.includes("ปู")) {
            type = "seafood";
        } else {
            type = "veg_dessert";
        }
    } else if (thName.includes("หมู") || thName.includes("ไก่") || thName.includes("เนื้อ") || thName.includes("ไส้กรอก") || thName.includes("ไส้อั่ว") || thName.includes("ทอดมัน") || thName.includes("แกง")) {
        if (thName.includes("กุ้ง") || thName.includes("ปลา")) {
             type = "seafood";
        } else {
             type = "meat";
        }
    }

    // specific overrides
    if (thName.includes("ถุงทอง") || thName.includes("ช่อม่วง") || thName.includes("ข้าวเกรียบ") || thName.includes("เมี่ยงคำ")) {
        type = "veg_dessert"; // Appetizers usually 12? Or maybe 14 if they contain meat. Let's put in 12 for now.
    }
    
    // Add image if missing (default to logo)
    let img = c.img || "logo.png";
    // We can map some known images based on the old items list
    let matchedItem = null;
    for (let set of data) {
        let found = set.items.find(i => i.th.includes(c.th) || c.th.includes(i.th));
        if (found && found.img !== "logo.png") {
            img = found.img;
            break;
        }
    }

    buffetMenu[type].items.push({
        id: `item_${Math.random().toString(36).substr(2, 9)}`,
        th: c.th,
        en: c.en,
        img: img
    });
});

fs.writeFileSync('data/buffet_menu.json', JSON.stringify(Object.values(buffetMenu), null, 4), 'utf8');
console.log("Created buffet_menu.json with " + choices.length + " items.");
