const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const vipIndex = data.findIndex(m => m.id === 'lunch_box_vip');

if (vipIndex !== -1) {
    const vip = data[vipIndex];

    // Update Description
    vip.desc.th = "เซตวีไอพีสุดเอ็กซ์คลูซีฟ: เลือกเนื้อสัตว์ (หมูกรอบ/คอหมูย่าง/เสือร้องไห้) พร้อมส้มตำ น้ำพริก ข้าวเหนียว ผักเคียง และน้ำจิ้มรสเด็ด";
    vip.desc.en = "Exclusive VIP Set: Choose your meat (Crispy Pork/Pork Neck/Crying Tiger) served with Som Tum, Nam Prik (Chili Paste), Sticky Rice, Vegetables, and dipping sauce.";

    // Update Items
    vip.items.th = {
        "mains": [
            "เนื้อสัตว์ (หมูกรอบ / คอหมูย่าง / เสือร้องไห้)",
            "ส้มตำ (ส้มตำไทย / ปูปลาร้า)",
            "ข้าวเหนียว"
        ],
        "starters": [
            "น้ำพริก (หนุ่ม / อ่อง)",
            "น้ำจิ้ม (ซีฟู้ด / แจ่ว / มะขาม)",
            "ผักเคียง"
        ]
    };
    vip.items.en = {
        "mains": [
            "Meat (Crispy Pork / Pork Neck / Crying Tiger)",
            "Som Tum (Thai / Pu Pla Ra)",
            "Sticky Rice"
        ],
        "starters": [
            "Nam Prik (Noom / Ong)",
            "Dipping Sauce (Seafood / Jaew / Tamarind)",
            "Side Vegetables"
        ]
    };

    // Update Options
    vip.options = [
        {
            "id": "vip_meat",
            "label": { "th": "เลือกเนื้อสัตว์", "en": "Select Meat" },
            "choices": [
                { "th": "หมูกรอบ", "en": "Crispy Pork Belly" },
                { "th": "คอหมูย่าง", "en": "Grilled Pork Neck" },
                { "th": "เสือร้องไห้", "en": "Crying Tiger Beef" }
            ]
        },
        {
            "id": "vip_somtum",
            "label": { "th": "เลือกส้มตำ", "en": "Select Papaya Salad" },
            "choices": [
                { "th": "ส้มตำไทย", "en": "Som Tum Thai" },
                { "th": "ส้มตำปูปลาร้า", "en": "Som Tum Pu Pla Ra" }
            ]
        },
        {
            "id": "vip_namprik",
            "label": { "th": "เลือกน้ำพริก", "en": "Select Chili Paste" },
            "choices": [
                { "th": "น้ำพริกหนุ่ม", "en": "Nam Prik Noom (Green Chili Paste)" },
                { "th": "น้ำพริกอ่อง", "en": "Nam Prik Ong (Tomato Chili Paste)" }
            ]
        },
        {
            "id": "vip_sauce",
            "label": { "th": "เลือกน้ำจิ้ม", "en": "Select Dipping Sauce" },
            "choices": [
                { "th": "น้ำจิ้มซีฟู้ด", "en": "Seafood Sauce" },
                { "th": "น้ำจิ้มแจ่ว", "en": "Jaew Sauce" },
                { "th": "น้ำจิ้มมะขาม", "en": "Tamarind Sauce" }
            ]
        }
    ];

    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log("Updated VIP Box items and options.");
} else {
    console.log("Menu not found.");
}
