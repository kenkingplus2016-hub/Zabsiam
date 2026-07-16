const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const newMenu = {
  "id": "lunch_box_crab_curry",
  "name": {
    "th": "Signature Box ปูผัดผงกะหรี่",
    "en": "Signature Box Stir-fried Crab in Yellow Curry"
  },
  "price": 18.95,
  "img": "Pad Prik Gaeng Moo krob.jpg", // fallback image
  "unit": {
    "th": "เซต",
    "en": "Set"
  },
  "desc": {
    "th": "เซตข้าวกล่องซิกเนเจอร์: เนื้อปูผัดผงกะหรี่รสละมุน หอมกลิ่นเครื่องเทศ เสิร์ฟพร้อมข้าวที่คุณชื่นชอบ ส้มตำแซ่บๆ และไข่ดาว",
    "en": "Signature Box: Delicious Stir-fried Crab in creamy Yellow Curry Powder. Served with your choice of rice, Som Tum Papaya Salad, and a Fried Egg."
  },
  "items": {
    "th": {
      "mains": [
        "ข้าว (เลือกข้าวสวย หรือ ข้าวผัดไข่)",
        "ปูผัดผงกะหรี่"
      ],
      "starters": [
        "ส้มตำ (เลือกประเภทได้)",
        "ไข่ดาว",
        "พริกน้ำปลา"
      ]
    },
    "en": {
      "mains": [
        "Rice (Choose Jasmine Rice or Egg Fried Rice)",
        "Stir-fried Crab in Yellow Curry"
      ],
      "starters": [
        "Som Tum (Choose Type)",
        "Fried Egg",
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

// Insert it right after the squid menu (index 5)
data.splice(5, 0, newMenu);

fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
console.log("Added new Crab Curry menu.");
