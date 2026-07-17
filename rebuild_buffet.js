const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/menu.json', 'utf8'));
const choices = data[0].options[0].choices;

const buffetMenu = {
    starters: {
        id: "starters",
        title: { th: "สตาร์ทเตอร์ (Starters & Appetizers)", en: "Starters & Appetizers" },
        items: []
    },
    mains: {
        id: "mains",
        title: { th: "เมนคอร์ส (Main Courses)", en: "Main Courses" },
        items: []
    },
    desserts: {
        id: "desserts",
        title: { th: "ของหวาน (Desserts)", en: "Desserts" },
        items: []
    }
};

choices.forEach(c => {
    let course = "mains"; // default to mains
    let price = 14; // default to meat price

    const thName = c.th;

    // 1. Determine Price (Ingredient Type)
    if (thName.includes("ปลา") || thName.includes("กุ้ง") || thName.includes("หมึก") || thName.includes("หอย") || thName.includes("แซลมอน") || thName.includes("ซีบาส") || thName.includes("ปู")) {
        price = 15; // Seafood
    } else if (thName.includes("หมู") || thName.includes("ไก่") || thName.includes("เนื้อ") || thName.includes("ไส้กรอก") || thName.includes("ไส้อั่ว") || thName.includes("แกง")) {
        // If it also contains fish/shrimp, it's already caught above.
        price = 14; // Meat
    } else {
        price = 12; // Veg/Dessert
    }

    // specific price overrides based on previous assumptions
    if (c.extra) price += c.extra; // Apply existing extra logic if any, though the user said flat 12/14/15. Let's just stick to 12/14/15 based on ingredient.

    // 2. Determine Course Type
    if (thName.includes("ขนม") || thName.includes("ไอศกรีม") || thName.includes("ผลไม้") || thName.includes("บัวลอย") || thName.includes("วุ้น") || thName.includes("ลอดช่อง") || thName.includes("ทับทิมกรอบ")) {
        course = "desserts";
        price = 12; // Desserts are always 12
    } else if (
        thName.includes("ถุงทอง") || 
        thName.includes("ช่อม่วง") || 
        thName.includes("ข้าวเกรียบ") || 
        thName.includes("เมี่ยงคำ") || 
        thName.includes("ส้มตำ") || 
        thName.includes("ยำ") || 
        thName.includes("พล่า") || 
        thName.includes("ลาบ") || 
        thName.includes("น้ำตก") || 
        thName.includes("หมูสะเต๊ะ") || 
        thName.includes("ปีกไก่") ||
        thName.includes("ไส้อั่ว") ||
        thName.includes("ไส้กรอก") ||
        thName.includes("ทอดมันกุ้ง") ||
        thName.includes("กุ้งห่มสไบ") ||
        thName.includes("น้ำพริก") ||
        thName.includes("คอหมูย่าง")
    ) {
        course = "starters";
    } else {
        course = "mains";
    }

    // Add image if missing (default to logo)
    let img = c.img || "logo.png";
    let matchedItem = null;
    for (let set of data) {
        let found = set.items.find(i => i.th.includes(c.th) || c.th.includes(i.th));
        if (found && found.img !== "logo.png") {
            img = found.img;
            break;
        }
    }

    buffetMenu[course].items.push({
        id: `item_${Math.random().toString(36).substr(2, 9)}`,
        th: c.th,
        en: c.en,
        img: img,
        price: price
    });
});

fs.writeFileSync('data/buffet_menu.json', JSON.stringify(Object.values(buffetMenu), null, 4), 'utf8');
console.log("Re-categorized buffet_menu.json by courses with individual pricing.");
