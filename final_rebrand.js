const fs = require('fs');
const path = require('path');

const repoJson = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data\\buffet_menu.json';
const localJson = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\data\\buffet_menu.json'; // Just in case it exists here too

const newMenu = [
    {
        "id": "pad_krapow",
        "title": { "th": "Pad Krapow", "en": "Pad Krapow" },
        "items": [
            {
                "id": "pad_krapow_chicken",
                "th": "Pad Krapow Chicken",
                "en": "Pad Krapow Chicken",
                "img": "logo.png",
                "price": 12,
                "price_s1": 12,
                "weight_s1": "Portion"
            },
            {
                "id": "pad_krapow_beef",
                "th": "Pad Krapow Beef",
                "en": "Pad Krapow Beef",
                "img": "logo.png",
                "price": 14,
                "price_s1": 14,
                "weight_s1": "Portion"
            },
            {
                "id": "fried_chicken",
                "th": "Fried Chicken",
                "en": "Fried Chicken",
                "img": "logo.png",
                "price": 12,
                "price_s1": 12,
                "weight_s1": "Portion"
            }
        ]
    },
    {
        "id": "spicy_salads",
        "title": { "th": "Spicy Salads", "en": "Spicy Salads" },
        "items": [
            {
                "id": "pla_salmon",
                "th": "Salmon Pla Salad",
                "en": "Salmon Pla Salad",
                "img": "005dbfc3-c862-4aac-a9e7-57ada41bcfa5.jpg",
                "price": 14,
                "price_s1": 14,
                "weight_s1": "Portion"
            },
            {
                "id": "pla_prawn",
                "th": "Prawn Pla Salad",
                "en": "Prawn Pla Salad",
                "img": "pla_goong.jpg",
                "price": 14,
                "price_s1": 14,
                "weight_s1": "Portion"
            },
            {
                "id": "pla_chicken",
                "th": "Chicken Pla Salad",
                "en": "Chicken Pla Salad",
                "img": "logo.png",
                "price": 12,
                "price_s1": 12,
                "weight_s1": "Portion"
            },
            {
                "id": "larb_chicken",
                "th": "Larb Chicken",
                "en": "Larb Chicken",
                "img": "ec66c9e5-348b-49d0-b53a-94f58b3b941f.jpg",
                "price": 12,
                "price_s1": 12,
                "weight_s1": "Portion"
            },
            {
                "id": "larb_salmon",
                "th": "Larb Salmon",
                "en": "Larb Salmon",
                "img": "logo.png",
                "price": 14,
                "price_s1": 14,
                "weight_s1": "Portion"
            },
            {
                "id": "miang_seabass",
                "th": "Miang Kham Sea Bass",
                "en": "Miang Kham Sea Bass",
                "img": "58f1df5c-0f97-44c0-8327-02b4686f8f8b.jpg",
                "price": 15,
                "price_s1": 15,
                "weight_s1": "Portion"
            },
            {
                "id": "miang_salmon",
                "th": "Miang Kham Salmon",
                "en": "Miang Kham Salmon",
                "img": "logo.png",
                "price": 15,
                "price_s1": 15,
                "weight_s1": "Portion"
            },
            {
                "id": "seabass_lui_suan",
                "th": "Sea Bass Lui Suan Salad",
                "en": "Sea Bass Lui Suan Salad",
                "img": "sea_bass_lui_suan.jpg",
                "price": 16,
                "price_s1": 16,
                "weight_s1": "Portion"
            }
        ]
    },
    {
        "id": "desserts",
        "title": { "th": "Puddings", "en": "Puddings" },
        "items": [
            {
                "id": "mango_sticky_rice",
                "th": "Mango Sticky Rice",
                "en": "Mango Sticky Rice",
                "img": "mango sticky rice.jpg",
                "price": 8,
                "price_s1": 8,
                "weight_s1": "Portion"
            }
        ]
    }
];

// Write the JSON
fs.writeFileSync(repoJson, JSON.stringify(newMenu, null, 4), 'utf8');
if (fs.existsSync(localJson)) {
    fs.writeFileSync(localJson, JSON.stringify(newMenu, null, 4), 'utf8');
}

// 2. Update HTML Files
const publicDir = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public';
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

for (const file of files) {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Update Mega Menu Links
    content = content.replace(/<a href="menu\.html\?cat=mains">Meat<\/a>/g, '<a href="menu.html?cat=pad_krapow">Pad Krapow</a>');
    content = content.replace(/<a href="menu\.html\?cat=starters">Spicy Salads \(Yum & Larb\)<\/a>/g, '<a href="menu.html?cat=spicy_salads">Spicy Salads</a>');
    
    // Update the mega featured link
    content = content.replace(/href="menu\.html\?cat=starters"/g, 'href="menu.html?cat=spicy_salads"');

    // Update Grid on index.html
    if (file === 'index.html') {
        // Change the Meat card
        const oldMeatCard = /<a href="menu\.html\?cat=mains" class="category-card">[\s\S]*?<\/a>/;
        const newMeatCard = `<a href="menu.html?cat=pad_krapow" class="category-card">
            <img src="logo.png" alt="Pad Krapow">
            <div class="category-text">
                <div class="category-title">Pad Krapow</div>
                <div class="category-subtitle">Classic Thai Basil Stir Fry</div>
            </div>
        </a>`;
        content = content.replace(oldMeatCard, newMeatCard);

        // Change the Spicy Salads card
        const oldSaladCard = /<a href="menu\.html\?cat=spicy_salads" class="category-card">[\s\S]*?<\/a>/; // Wait, it currently has ?cat=starters
        const oldSaladCardActual = /<a href="menu\.html\?cat=starters" class="category-card">[\s\S]*?<\/a>/;
        const newSaladCard = `<a href="menu.html?cat=spicy_salads" class="category-card">
            <img src="images/780f7b8bb98d.jpg" alt="Spicy Salads">
            <div class="category-text">
                <div class="category-title">Spicy Salads</div>
                <div class="category-subtitle">Authentic Thai spicy salads</div>
            </div>
        </a>`;
        content = content.replace(oldSaladCardActual, newSaladCard);
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        const gitPath = path.join('C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public', file);
        if (fs.existsSync(gitPath)) {
            fs.writeFileSync(gitPath, content, 'utf8');
        }
    }
}

console.log("Final rebrand and curry removal completed.");
