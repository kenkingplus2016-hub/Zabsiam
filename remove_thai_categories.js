const fs = require('fs');
const path = require('path');

const buffetPath = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data\\buffet_menu.json';

try {
    let buffetData = JSON.parse(fs.readFileSync(buffetPath, 'utf8'));

    for (let cat of buffetData) {
        if (cat.id === 'mains') {
            cat.title = { th: "Meat", en: "Meat" };
        } else if (cat.id === 'vegetables') {
            cat.title = { th: "Vegetables", en: "Vegetables" };
        } else if (cat.id === 'starters') {
            cat.title = { th: "Starters", en: "Starters" };
        } else if (cat.id === 'box_sets') {
            cat.title = { th: "Meal Boxes", en: "Meal Boxes" };
        } else if (cat.id === 'desserts') {
            cat.title = { th: "Desserts", en: "Desserts" };
        } else if (cat.id === 'drinks') {
            cat.title = { th: "Drinks", en: "Drinks" };
        }
    }

    fs.writeFileSync(buffetPath, JSON.stringify(buffetData, null, 4), 'utf8');
    
    // Also save a copy to Desktop
    const localPath = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\data\\buffet_menu.json';
    if (fs.existsSync('C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\data')) {
        fs.writeFileSync(localPath, JSON.stringify(buffetData, null, 4), 'utf8');
    }

    console.log("Updated JSON categories!");

    // Now update all HTML files in Desktop
    const publicDir = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public';
    const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

    const oldContent = `<div class="mega-columns">
                            <div class="mega-column">
                                <div class="mega-column-title">Categories</div>
                                <a href="menu.html?cat=mains">เนื้อ (Meat & Main Courses)</a>
                                <a href="menu.html?cat=vegetables">ผัก (Vegetable Dishes)</a>
                                <a href="menu.html?cat=starters">สตาร์ทเตอร์ (Starters & Appetizers)</a>
                                <a href="menu.html?cat=box_sets">แบบกล่อง (Meal Boxes)</a>
                            </div>
                        </div>`;

    const newContent = `<div class="mega-columns">
                            <div class="mega-column">
                                <div class="mega-column-title">Categories</div>
                                <a href="menu.html?cat=mains">Meat</a>
                                <a href="menu.html?cat=vegetables">Vegetables</a>
                                <a href="menu.html?cat=starters">Starters</a>
                                <a href="menu.html?cat=box_sets">Meal Boxes</a>
                            </div>
                        </div>`;

    let updatedCount = 0;
    for (const file of files) {
        const filePath = path.join(publicDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Regex to replace the mega-columns exactly
        const regex = /<div class="mega-columns">\s*<div class="mega-column">\s*<div class="mega-column-title">Categories<\/div>\s*<a href="menu\.html\?cat=mains">เนื้อ \(Meat & Main Courses\)<\/a>\s*<a href="menu\.html\?cat=vegetables">ผัก \(Vegetable Dishes\)<\/a>\s*<a href="menu\.html\?cat=starters">สตาร์ทเตอร์ \(Starters & Appetizers\)<\/a>\s*<a href="menu\.html\?cat=box_sets">แบบกล่อง \(Meal Boxes\)<\/a>\s*<\/div>\s*<\/div>/;
        
        if (regex.test(content)) {
            content = content.replace(regex, newContent);
            fs.writeFileSync(filePath, content, 'utf8');
            updatedCount++;
        }
    }
    console.log(`Updated ${updatedCount} HTML files.`);
} catch(e) {
    console.error("Error:", e);
}
