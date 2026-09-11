const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const today = new Date().toISOString().split('T')[0];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

files.forEach(file => {
    // skip admin, ai, and utility files
    if (file.includes('admin') || file.includes('ai-') || file === 'googlec1aae5dba0c506fb.html' || file === 'cancel.html' || file === 'success.html' || file === 'checkout.html' || file === 'pos.html' || file === 'popup.html' || file === 'delivery-old.html') {
        return;
    }
    
    let loc = `https://zabsiam.com/${file === 'index.html' ? '' : file}`;
    let priority = file === 'index.html' ? '1.0' : (file.includes('catering') || file.includes('canapes') || file.includes('delivery')) ? '0.9' : '0.8';
    
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${loc}</loc>\n`;
    sitemap += `    <lastmod>${today}</lastmod>\n`;
    sitemap += `    <changefreq>weekly</changefreq>\n`;
    sitemap += `    <priority>${priority}</priority>\n`;
    sitemap += `  </url>\n`;
});

sitemap += `</urlset>`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
console.log('Updated sitemap.xml');
