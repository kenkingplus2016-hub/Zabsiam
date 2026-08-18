const fs = require('fs');

function updateSEO(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log("File not found:", filePath);
        return;
    }
    
    let html = fs.readFileSync(filePath, 'utf8');

    const oldTitle = '<title>Zab Siam | Premium Authentic Thai Desserts</title>';
    const newTitle = '<title>Zab Siam | Authentic Thai Street Food, Desserts & Premium Catering in UK</title>';
    
    const oldDesc = '<meta name="description" content="Zab Siam - Authentic and premium Thai desserts crafted with passion and tradition. Experience the true taste of Thong Yip, Thong Yod, Foi Thong, and more.">';
    const newDesc = '<meta name="description" content="Zab Siam offers authentic Thai street food, premium traditional Thai desserts, and exclusive event catering services across the UK. Discover the true taste of Thailand with our banquet menus and custom catering for 80+ guests.">';
    
    const oldKeywords = '<meta name="keywords" content="Zab Siam, Thai desserts, Thong Yip, Thong Yod, Foi Thong, Luk Chup, Premium Thai sweets">';
    const newKeywords = '<meta name="keywords" content="Zab Siam, Thai street food UK, Thai desserts London, Thai catering UK, Thai food delivery, authentic Thai cuisine, Thai banquet, Thai event catering">';
    
    if (html.includes(oldTitle)) html = html.replace(oldTitle, newTitle);
    if (html.includes(oldDesc)) html = html.replace(oldDesc, newDesc);
    if (html.includes(oldKeywords)) html = html.replace(oldKeywords, newKeywords);
    
    fs.writeFileSync(filePath, html, 'utf8');
    console.log("Updated SEO metadata in", filePath);
}

updateSEO('C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/index.html');
updateSEO('C:/Users/KENDEE/Desktop/เว็บ/public/index.html');
