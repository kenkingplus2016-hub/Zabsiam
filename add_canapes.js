const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/royal_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const newCategory = {
  "category": "Royal Cocktails & Canapés",
  "category_th": "ค็อกเทลและคานาเป้ / Royal Cocktails & Canapés",
  "items": [
    {
      "id": "c1",
      "name": {
        "th": "มินิยำเนื้อย่างโบราณ",
        "en": "Mini Beef Salad Thai Style"
      },
      "price": 15,
      "unit": "10 ชิ้น / 10 Pcs",
      "desc": {
        "th": "ยำเนื้อย่างรสแซ่บสไตล์ไทยแท้ เสิร์ฟพอดีคำ",
        "en": "Spicy grilled beef salad with Thai herbs, served in bite-sized portions."
      },
      "img": "corporate-cover.jpg",
      "main_ingredients": {
        "th": ["เนื้อย่างคุณภาพ", "สมุนไพรยำไทย", "น้ำยำรสเด็ด"],
        "en": ["Premium Grilled Beef", "Thai Herbs", "Spicy Dressing"]
      }
    },
    {
      "id": "c2",
      "name": {
        "th": "มินิยำทูน่า",
        "en": "Mini Tuna Salad"
      },
      "price": 15,
      "unit": "10 ชิ้น / 10 Pcs",
      "desc": {
        "th": "ยำทูน่ารสจัดจ้าน คลุกเคล้าสมุนไพรหอมกรุ่น",
        "en": "Spicy tuna salad with aromatic Thai herbs."
      },
      "img": "corporate-cover.jpg",
      "main_ingredients": {
        "th": ["ทูน่า", "ตะไคร้", "หอมแดง", "น้ำยำรสแซ่บ"],
        "en": ["Tuna", "Lemongrass", "Shallot", "Spicy Dressing"]
      }
    },
    {
      "id": "c3",
      "name": {
        "th": "มินิไก่ย่างตะไคร้",
        "en": "Mini Chicken Roasted Lemongrass"
      },
      "price": 15,
      "unit": "10 ชิ้น / 10 Pcs",
      "desc": {
        "th": "ไก่หมักตะไคร้ย่างหอมกรุ่น ขนาดพอดีคำ",
        "en": "Bite-sized grilled chicken marinated in fragrant lemongrass."
      },
      "img": "corporate-cover.jpg",
      "main_ingredients": {
        "th": ["เนื้อไก่", "ตะไคร้", "กระเทียมพริกไทย", "น้ำจิ้มแจ่ว"],
        "en": ["Chicken", "Lemongrass", "Garlic & Pepper", "Jaew Sauce"]
      }
    },
    {
      "id": "c4",
      "name": {
        "th": "มินิยำกุ้งแซ่บ",
        "en": "Mini Spicy Shrimp Salad"
      },
      "price": 15,
      "unit": "10 ชิ้น / 10 Pcs",
      "desc": {
        "th": "ยำกุ้งสดเด้งรสแซ่บจัดจ้าน เสิร์ฟเป็นคำ",
        "en": "Zesty and spicy fresh shrimp salad bites."
      },
      "img": "corporate-cover.jpg",
      "main_ingredients": {
        "th": ["กุ้งสด", "สมุนไพรยำ", "น้ำยำรสเด็ด"],
        "en": ["Fresh Shrimp", "Thai Herbs", "Spicy Dressing"]
      }
    },
    {
      "id": "c5",
      "name": {
        "th": "มินิกุ้งซอสมะขาม",
        "en": "Mini Shrimp Tamarind Sauce"
      },
      "price": 15,
      "unit": "10 ชิ้น / 10 Pcs",
      "desc": {
        "th": "กุ้งทอดกรอบราดซอสมะขามเปรี้ยวหวานกลมกล่อม",
        "en": "Crispy fried shrimp topped with sweet and sour tamarind sauce."
      },
      "img": "corporate-cover.jpg",
      "main_ingredients": {
        "th": ["กุ้งทอด", "ซอสมะขาม", "หอมเจียว", "พริกแห้งคั่ว"],
        "en": ["Fried Shrimp", "Tamarind Sauce", "Fried Shallot", "Dried Chili"]
      }
    },
    {
      "id": "c6",
      "name": {
        "th": "มินิปลากะพงซอสมะขาม",
        "en": "Mini Sea Bass Tamarind Sauce"
      },
      "price": 15,
      "unit": "10 ชิ้น / 10 Pcs",
      "desc": {
        "th": "เนื้อปลากะพงทอดราดซอสมะขามรสเด็ดพอดีคำ",
        "en": "Crispy sea bass chunks with signature tamarind sauce."
      },
      "img": "corporate-cover.jpg",
      "main_ingredients": {
        "th": ["ปลากะพงทอด", "ซอสมะขาม", "หอมเจียว", "พริกแห้งคั่ว"],
        "en": ["Fried Sea Bass", "Tamarind Sauce", "Fried Shallot", "Dried Chili"]
      }
    }
  ]
};

data.push(newCategory);

fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
console.log("Added Royal Cocktails & Canapés category.");
