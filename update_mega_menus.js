const fs = require('fs');
const path = require('path');

const publicDir = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public';
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const oldContent = `<div class="mega-columns">
                            <div class="mega-column">
                                <div class="mega-column-title">By Protein</div>
                                <a href="menu.html">Chicken Meals</a>
                                <a href="menu.html">Beef Meals</a>
                                <a href="menu.html">Pork Meals</a>
                                <a href="menu.html">Seafood</a>
                            </div>
                            <div class="mega-column">
                                <div class="mega-column-title">Vegetarian & Vegan</div>
                                <a href="menu.html">All Vegetarian</a>
                                <a href="menu.html">Vegan Meals</a>
                            </div>
                        </div>`;

const newContent = `<div class="mega-columns">
                            <div class="mega-column">
                                <div class="mega-column-title">Categories</div>
                                <a href="menu.html?cat=mains">เนื้อ (Meat & Main Courses)</a>
                                <a href="menu.html?cat=vegetables">ผัก (Vegetable Dishes)</a>
                                <a href="menu.html?cat=starters">สตาร์ทเตอร์ (Starters & Appetizers)</a>
                                <a href="menu.html?cat=box_sets">แบบกล่อง (Meal Boxes)</a>
                            </div>
                        </div>`;

let updatedCount = 0;
for (const file of files) {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('By Protein') || content.includes('mega-column-title">Categories')) {
        // Find the block and replace
        // Since the exact spacing might differ, let's use a regex that matches the start and end of the mega-columns div inside the "Main Meals" dropdown
        const regex = /<div class="mega-columns">\s*<div class="mega-column">\s*<div class="mega-column-title">(By Protein|Categories)<\/div>[\s\S]*?(?=<\/div>\s*<div class="mega-featured">)/;
        if(regex.test(content)) {
            content = content.replace(regex, newContent + '\n                        ');
            fs.writeFileSync(filePath, content, 'utf8');
            updatedCount++;
            console.log(`Updated ${file}`);
        }
    }
}
console.log(`Updated ${updatedCount} files.`);
