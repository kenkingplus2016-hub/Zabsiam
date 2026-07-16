const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const newMenu = {
  "id": "lunch_box_premium_pork_neck",
  "name": {
    "th": "Premium Box ผัดกะเพราคอหมูย่าง + ไข่ดาวลาวา",
    "en": "Premium Box Pad Krapow Grilled Pork Neck & Lava Fried Egg"
  },
  "price": 18.95,
  "img": "moo krob kau prik klua.jpg", // fallback image, user can change later
  "unit": {
    "th": "เซต",
    "en": "Set"
  },
  "desc": {
    "th": "เซตข้าวกล่องสุดพรีเมียม: ผัดกะเพราคอหมูย่างนุ่มๆ รสจัดจ้าน เสิร์ฟพร้อมไข่ดาวลาวาเยิ้มๆ และข้าวที่คุณชื่นชอบ",
    "en": "Premium Lunch Box: Spicy Pad Krapow with tender Grilled Pork Neck. Served with a Lava Fried Egg (runny yolk) and your choice of rice."
  },
  "items": {
    "th": {
      "mains": [
        "ข้าว (เลือกข้าวสวย หรือ ข้าวผัดไข่)",
        "ผัดกะเพราคอหมูย่าง"
      ],
      "starters": [
        "ส้มตำ (เลือกประเภทได้)",
        "ไข่ดาวลาวา",
        "พริกน้ำปลา"
      ]
    },
    "en": {
      "mains": [
        "Rice (Choose Jasmine Rice or Egg Fried Rice)",
        "Spicy Pad Krapow Grilled Pork Neck"
      ],
      "starters": [
        "Som Tum (Choose Type)",
        "Lava Fried Egg (Runny Yolk)",
        "Prik Nam Pla"
      ]
    }
  },
  "options": [
    {
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

// Insert it right after the crying tiger menu (index 2)
data.splice(2, 0, newMenu);

fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
console.log("Added new Premium Box Grilled Pork Neck Krapow menu.");
