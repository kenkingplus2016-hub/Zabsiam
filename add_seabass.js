const fs = require('fs');

const repoJson = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data\\buffet_menu.json';
const localJson = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\data\\buffet_menu.json';

try {
    let data = JSON.parse(fs.readFileSync(repoJson, 'utf8'));

    // Add to starters category (which acts as the Yum/Salads category)
    let startersCat = data.find(c => c.id === 'starters');
    if (startersCat) {
        startersCat.items.push({
            "id": "seabass_lui_suan",
            "th": "ปลาซีบาสลุยสวน",
            "en": "Sea Bass Lui Suan Salad",
            "img": "sea_bass_lui_suan.jpg",
            "price": 16,
            "price_s1": 16,
            "weight_s1": "Portion"
        });
    }

    fs.writeFileSync(repoJson, JSON.stringify(data, null, 4), 'utf8');
    if (fs.existsSync(localJson)) {
        fs.writeFileSync(localJson, JSON.stringify(data, null, 4), 'utf8');
    }
    console.log("Added Sea Bass Lui Suan to buffet_menu.json successfully!");
} catch (e) {
    console.error("Error:", e);
}
