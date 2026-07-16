const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const riceOption = {
    "id": "rice_type",
    "label": {
        "th": "เลือกประเภทข้าว",
        "en": "Choose Rice"
    },
    "choices": [
        {
            "th": "ข้าวสวย",
            "en": "Jasmine Rice"
        },
        {
            "th": "ข้าวผัดไข่",
            "en": "Egg Fried Rice"
        }
    ]
};

const newMenus = [
    {
        "id": "lunch_box_hor_mok_seafood",
        "name": {
            "th": "Signature Box ข้าวห่อหมกทะเล",
            "en": "Signature Box Seafood Hor Mok with Rice"
        },
        "price": 17.95,
        "img": "corporate-cover.jpg",
        "unit": { "th": "เซต", "en": "Set" },
        "desc": {
            "th": "เซตข้าวกล่องซิกเนเจอร์: ห่อหมกทะเลรสชาติเข้มข้น หอมเครื่องแกง เสิร์ฟพร้อมข้าว",
            "en": "Signature Box: Rich and aromatic Thai Steamed Seafood Curry (Hor Mok). Served with your choice of rice."
        },
        "items": {
            "th": {
                "mains": ["ข้าว (เลือกข้าวสวย หรือ ข้าวผัดไข่)", "ห่อหมกทะเล"],
                "starters": ["พริกน้ำปลา"]
            },
            "en": {
                "mains": ["Rice (Choose Jasmine Rice or Egg Fried Rice)", "Seafood Hor Mok"],
                "starters": ["Prik Nam Pla"]
            }
        },
        "options": [riceOption]
    },
    {
        "id": "lunch_box_gai_kluk_fun",
        "name": {
            "th": "Signature Box ข้าวไก่ย่างคลุกฝุ่น",
            "en": "Signature Box Spicy Dust Grilled Chicken with Rice"
        },
        "price": 14.95,
        "img": "corporate-cover.jpg",
        "unit": { "th": "เซต", "en": "Set" },
        "desc": {
            "th": "เซตข้าวกล่องซิกเนเจอร์: ไก่ย่างคลุกฝุ่นหอมข้าวคั่วและพริกป่น รสแซ่บ เสิร์ฟพร้อมข้าว",
            "en": "Signature Box: Spicy Dust Grilled Chicken tossed in roasted rice powder and chili. Served with your choice of rice."
        },
        "items": {
            "th": {
                "mains": ["ข้าว (เลือกข้าวสวย หรือ ข้าวผัดไข่)", "ไก่ย่างคลุกฝุ่น"],
                "starters": ["น้ำจิ้มแจ่ว", "พริกน้ำปลา"]
            },
            "en": {
                "mains": ["Rice (Choose Jasmine Rice or Egg Fried Rice)", "Spicy Dust Grilled Chicken"],
                "starters": ["Jaew Dipping Sauce", "Prik Nam Pla"]
            }
        },
        "options": [riceOption]
    },
    {
        "id": "lunch_box_yam_gai_zaap",
        "name": {
            "th": "Signature Box ข้าวยำไก่แซ่บ",
            "en": "Signature Box Spicy Chicken Salad with Rice"
        },
        "price": 14.95,
        "img": "corporate-cover.jpg",
        "unit": { "th": "เซต", "en": "Set" },
        "desc": {
            "th": "เซตข้าวกล่องซิกเนเจอร์: ยำไก่แซ่บรสจัดจ้าน เปรี้ยวเค็มเผ็ดครบรส เสิร์ฟพร้อมข้าว",
            "en": "Signature Box: Spicy & Sour Crispy Chicken Salad (Yam Gai Zaap). Served with your choice of rice."
        },
        "items": {
            "th": {
                "mains": ["ข้าว (เลือกข้าวสวย หรือ ข้าวผัดไข่)", "ยำไก่แซ่บ"],
                "starters": ["พริกน้ำปลา"]
            },
            "en": {
                "mains": ["Rice (Choose Jasmine Rice or Egg Fried Rice)", "Spicy Chicken Salad"],
                "starters": ["Prik Nam Pla"]
            }
        },
        "options": [riceOption]
    }
];

// Append new menus
data.push(...newMenus);

fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
console.log("Added 3 new signature boxes.");
