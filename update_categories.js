const fs = require('fs');

const repoIndex = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\index.html';
const localIndex = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\index.html';
const repoMenu = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data\\buffet_menu.json';
const localMenu = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\data\\buffet_menu.json';

try {
    let indexHtml = fs.readFileSync(repoIndex, 'utf8');

    // 1. Update Mega Menu
    const oldMegaLinks = /<div class="mega-column-title">Categories<\/div>[\s\S]*?<\/div>/;
    const newMegaLinks = `<div class="mega-column-title">Categories</div>
                                <a href="menu.html?cat=mains">Meat</a>
                                <a href="menu.html?cat=starters">Spicy Salads (Yum & Larb)</a>
                                <a href="menu.html?cat=desserts">Puddings</a>
                            </div>`;
    indexHtml = indexHtml.replace(oldMegaLinks, newMegaLinks);

    // 2. Update the Grid
    // I need to add Puddings to the grid and update the Starters title
    // First, let's just replace the entire categories-grid inner HTML
    const gridStart = '<section class="categories-grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">';
    const gridEnd = '</section>';
    
    const newGrid = `<section class="categories-grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
        <a href="menu.html?cat=mains" class="category-card">
            <img src="images/green_curry_pork_bowl.jpg" alt="Meat & Main Courses">
            <div class="category-text">
                <div class="category-title">Meat</div>
                <div class="category-subtitle">Hearty street food mains</div>
            </div>
        </a>
        <a href="menu.html?cat=starters" class="category-card">
            <img src="images/780f7b8bb98d.jpg" alt="Spicy Salads">
            <div class="category-text">
                <div class="category-title">Spicy Salads (Yum & Larb)</div>
                <div class="category-subtitle">Authentic Thai spicy salads</div>
            </div>
        </a>
        <a href="menu.html?cat=desserts" class="category-card">
            <img src="images/mango sticky rice.jpg" alt="Puddings" onerror="this.src='logo.png'">
            <div class="category-text">
                <div class="category-title">Puddings</div>
                <div class="category-subtitle">Sweet street food treats</div>
            </div>
        </a>
    </section>`;
    
    // Use regex to replace the section
    const gridRegex = /<section class="categories-grid"[\s\S]*?<\/section>/;
    indexHtml = indexHtml.replace(gridRegex, newGrid);

    fs.writeFileSync(repoIndex, indexHtml, 'utf8');
    if (fs.existsSync(localIndex)) {
        fs.writeFileSync(localIndex, indexHtml, 'utf8');
    }
    
    // 3. Update buffet_menu.json to match "Spicy Salads (Yum & Larb)"
    let data = JSON.parse(fs.readFileSync(repoMenu, 'utf8'));
    let startersCat = data.find(c => c.id === 'starters');
    if (startersCat) {
        startersCat.title = { "th": "Spicy Salads (Yum & Larb)", "en": "Spicy Salads (Yum & Larb)" };
    }
    fs.writeFileSync(repoMenu, JSON.stringify(data, null, 4), 'utf8');
    if (fs.existsSync(localMenu)) {
        fs.writeFileSync(localMenu, JSON.stringify(data, null, 4), 'utf8');
    }

    console.log("Updated categories successfully!");
} catch (e) {
    console.error(e);
}
