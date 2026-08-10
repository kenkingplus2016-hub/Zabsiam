const fs = require('fs');

const repoJson = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data\\buffet_menu.json';
const localJson = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\data\\buffet_menu.json';

const newMenu = [
    {
        "id": "starters",
        "title": { "th": "Starters", "en": "Starters" },
        "items": [
            {
                "id": "pla_salmon",
                "th": "พล่าปลาแซลมอน",
                "en": "Salmon 'Pla' Salad",
                "img": "005dbfc3-c862-4aac-a9e7-57ada41bcfa5.jpg",
                "price": 14,
                "price_s1": 14,
                "weight_s1": "Portion"
            },
            {
                "id": "pla_prawn",
                "th": "พล่ากุ้ง",
                "en": "Prawn 'Pla' Salad",
                "img": "pla_goong.jpg",
                "price": 14,
                "price_s1": 14,
                "weight_s1": "Portion"
            },
            {
                "id": "pla_chicken",
                "th": "พล่าไก่",
                "en": "Chicken 'Pla' Salad",
                "img": "logo.png",
                "price": 12,
                "price_s1": 12,
                "weight_s1": "Portion"
            },
            {
                "id": "larb_chicken",
                "th": "ลาบไก่",
                "en": "Larb Chicken",
                "img": "ec66c9e5-348b-49d0-b53a-94f58b3b941f.jpg",
                "price": 12,
                "price_s1": 12,
                "weight_s1": "Portion"
            },
            {
                "id": "larb_salmon",
                "th": "ลาบปลาแซลมอน",
                "en": "Larb Salmon",
                "img": "logo.png",
                "price": 14,
                "price_s1": 14,
                "weight_s1": "Portion"
            },
            {
                "id": "miang_seabass",
                "th": "เมี่ยงคำปลาซีบาส",
                "en": "Miang Kham Sea Bass",
                "img": "58f1df5c-0f97-44c0-8327-02b4686f8f8b.jpg",
                "price": 15,
                "price_s1": 15,
                "weight_s1": "Portion"
            },
            {
                "id": "miang_salmon",
                "th": "เมี่ยงคำแซลมอน",
                "en": "Miang Kham Salmon",
                "img": "logo.png",
                "price": 15,
                "price_s1": 15,
                "weight_s1": "Portion"
            }
        ]
    },
    {
        "id": "mains",
        "title": { "th": "Meat", "en": "Meat" },
        "items": [
            {
                "id": "pad_krapow_chicken",
                "th": "ผัดกะเพราไก่",
                "en": "Pad Krapow Chicken",
                "img": "logo.png",
                "price": 12,
                "price_s1": 12,
                "weight_s1": "Portion"
            },
            {
                "id": "pad_krapow_beef",
                "th": "ผัดกะเพราเนื้อ",
                "en": "Pad Krapow Beef",
                "img": "logo.png",
                "price": 14,
                "price_s1": 14,
                "weight_s1": "Portion"
            },
            {
                "id": "hat_yai_chicken",
                "th": "ไก่ทอดหาดใหญ่",
                "en": "Hat Yai Fried Chicken",
                "img": "logo.png",
                "price": 12,
                "price_s1": 12,
                "weight_s1": "Portion"
            }
        ]
    },
    {
        "id": "vegetables",
        "title": { "th": "Vegetables", "en": "Vegetables" },
        "items": []
    },
    {
        "id": "desserts",
        "title": { "th": "Puddings", "en": "Puddings" },
        "items": [
            {
                "id": "mango_sticky_rice",
                "th": "ข้าวเหนียวมะม่วง",
                "en": "Mango Sticky Rice",
                "img": "mango sticky rice.jpg",
                "price": 8,
                "price_s1": 8,
                "weight_s1": "Portion"
            }
        ]
    }
];

fs.writeFileSync(repoJson, JSON.stringify(newMenu, null, 4), 'utf8');
if (fs.existsSync(localJson)) {
    fs.writeFileSync(localJson, JSON.stringify(newMenu, null, 4), 'utf8');
}
console.log("Rebuilt buffet_menu.json successfully!");
