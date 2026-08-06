const fs = require('fs');
const path = require('path');

const publicDir = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public';
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

let updatedCount = 0;

const oldMegaLinks = /<div class="mega-column-title">Categories<\/div>[\s\S]*?<\/div>/;
const newMegaLinks = `<div class="mega-column-title">Categories</div>
                                <a href="menu.html?cat=mains">Meat</a>
                                <a href="menu.html?cat=starters">Spicy Salads (Yum & Larb)</a>
                                <a href="menu.html?cat=desserts">Puddings</a>
                            </div>`;

const oldFeatured = /<div class="mega-featured">[\s\S]*?<\/div>\s*<\/div>/;
const newFeatured = `<div class="mega-featured">
                            <a href="menu.html?cat=starters" class="mega-feature-card">
                                <img src="images/780f7b8bb98d.jpg" alt="Spicy Salads">
                                <span>Authentic Thai Street Food</span>
                            </a>
                        </div>
                    </div>`;

for (const file of files) {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Standardize mega menu categories
    if (content.match(oldMegaLinks)) {
        content = content.replace(oldMegaLinks, newMegaLinks);
    }
    
    // Replace the curry banner
    if (content.includes('Authentic Thai Curries')) {
        content = content.replace(oldFeatured, newFeatured);
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        
        // Also update GitHub repo
        const gitPath = path.join('C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public', file);
        if (fs.existsSync(gitPath)) {
            fs.writeFileSync(gitPath, content, 'utf8');
        }
        updatedCount++;
    }
}

console.log(`Removed curry banner and standardized mega menu in ${updatedCount} files.`);
