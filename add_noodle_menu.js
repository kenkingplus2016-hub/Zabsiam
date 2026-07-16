const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const newMenu = {
  "id": "lunch_box_krapow_yellow_noodles",
  "name": {
    "th": "Signature Box ผัดกะเพราหมี่เหลือง (ไม่มีไข่ดาว)",
    "en": "Signature Box Pad Krapow Yellow Noodles (No Egg)"
  },
  "price": 14.95,
  "img": "moo krob kau prik klua.jpg", // fallback image
  "unit": {
    "th": "เซต",
    "en": "Set"
  },
  "desc": {
    "th": "เซตกล่องซิกเนเจอร์: ผัดกะเพรารสเด็ดคลุกเคล้าเส้นหมี่เหลืองนุ่มๆ เลือกเนื้อสัตว์ได้ดั่งใจ เสิร์ฟคู่กับส้มตำ (เซตนี้ไม่มีไข่ดาว)",
    "en": "Signature Box: Spicy Pad Krapow stir-fried with Yellow Egg Noodles. Customize your meat. Served with Som Tum Papaya Salad. (No Fried Egg)"
  },
  "items": {
    "th": {
      "mains": [
        "ผัดกะเพราหมี่เหลือง (เลือกเนื้อสัตว์ได้)"
      ],
      "starters": [
        "ส้มตำ (เลือกประเภทได้)",
        "พริกน้ำปลา"
      ]
    },
    "en": {
      "mains": [
        "Spicy Pad Krapow Yellow Noodles (Choose Meat)"
      ],
      "starters": [
        "Som Tum (Choose Type)",
        "Prik Nam Pla"
      ]
    }
  },
  "options": [
    {
      "id": "meat_type",
      "label": {
        "th": "เลือกเนื้อสัตว์",
        "en": "Choose Meat"
      },
      "choices": [
        {
          "th": "ไก่",
          "en": "Chicken"
        },
        {
          "th": "หมู",
          "en": "Pork"
        },
        {
          "th": "ผักรวม",
          "en": "Vegetables"
        },
        {
          "th": "หมูกรอบ (+£1)",
          "en": "Crispy Pork Belly (+£1)",
          "extra": 1
        },
        {
          "th": "เนื้อ (+£1)",
          "en": "Beef (+£1)",
          "extra": 1
        },
        {
          "th": "กุ้ง (+£1)",
          "en": "Prawns (+£1)",
          "extra": 1
        }
      ]
    },
    {
      "id": "somtum_type",
      "label": {
        "th": "เลือกส้มตำ",
        "en": "Choose Papaya Salad"
      },
      "choices": [
        {
          "th": "ส้มตำไทย",
          "en": "Som Tum Thai"
        },
        {
          "th": "ส้มตำปูปลาร้า",
          "en": "Som Tum Pu Pla Ra"
        },
        {
          "th": "ตำแตง",
          "en": "Spicy Cucumber Salad"
        }
      ]
    }
  ]
};

// Insert it right after the previous menus
data.splice(3, 0, newMenu);

fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
console.log("Added new Krapow Yellow Noodles menu.");
