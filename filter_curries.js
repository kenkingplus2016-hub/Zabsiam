const fs = require('fs');
const path = require('path');

const repoJson = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data\\buffet_menu.json';
const localJson = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\data\\buffet_menu.json';
const repoIndex = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\index.html';
const localIndex = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\index.html';

// 1. Update JSON data
try {
    let data = JSON.parse(fs.readFileSync(repoJson, 'utf8'));

    data.forEach(cat => {
        // Empty out vegetables and desserts categories
        if (cat.id === 'vegetables' || cat.id === 'desserts') {
            cat.items = [];
            return;
        }

        // Filter out curries
        cat.items = cat.items.filter(item => {
            const enName = (item.en || '').toLowerCase();
            const thName = (item.th || '').toLowerCase();
            
            // Check for curry keywords
            const isCurry = thName.includes('แกง') || thName.includes('พะแนง') || thName.includes('มัสมั่น') || thName.includes('เขียวหวาน') || thName.includes('แพนง') || enName.includes('curry') || enName.includes('massaman') || enName.includes('panang');
            
            return !isCurry;
        });
    });

    fs.writeFileSync(repoJson, JSON.stringify(data, null, 4), 'utf8');
    if (fs.existsSync(localJson)) {
        fs.writeFileSync(localJson, JSON.stringify(data, null, 4), 'utf8');
    }
    console.log("Updated buffet_menu.json successfully!");
} catch (e) {
    console.error("Error updating JSON:", e);
}

// 2. Update index.html to remove the cards
try {
    let indexHtml = fs.readFileSync(repoIndex, 'utf8');
    
    // Remove Vegetables card
    indexHtml = indexHtml.replace(/<a href="menu\.html\?cat=vegetables" class="category-card">[\s\S]*?<\/a>\s*/, '');
    
    // Remove Puddings card
    indexHtml = indexHtml.replace(/<a href="menu\.html\?cat=desserts" class="category-card">[\s\S]*?<\/a>\s*/, '');
    
    fs.writeFileSync(repoIndex, indexHtml, 'utf8');
    if (fs.existsSync(localIndex)) {
        fs.writeFileSync(localIndex, indexHtml, 'utf8');
    }
    console.log("Updated index.html successfully!");
} catch (e) {
    console.error("Error updating index.html:", e);
}
