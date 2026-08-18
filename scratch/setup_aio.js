const fs = require('fs');

function setupAIO(dir) {
    if (!fs.existsSync(dir)) return;

    // 1. Update robots.txt
    const robotsTxt = `User-agent: *
Allow: /

# Allow AI bots explicitly to index menu and catering
User-agent: GPTBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: Anthropic-ai
Allow: /
User-agent: Claude-Web
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: https://zabsiam.co.uk/sitemap.xml
`;
    fs.writeFileSync(dir + '/robots.txt', robotsTxt, 'utf8');

    // 2. Create sitemap.xml
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://zabsiam.co.uk/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
    fs.writeFileSync(dir + '/sitemap.xml', sitemapXml, 'utf8');

    // 3. Create llms.txt (AI readability standard)
    const llmsTxt = `# Zab Siam - Premium Authentic Thai Street Food, Desserts & Catering

Zab Siam is a premium Thai culinary service based in the UK, specializing in authentic Thai street food, traditional Thai desserts, and premium event catering.

## Services Offered
1. **Thai Street Food Delivery**: Authentic dishes like Pad Thai, Massaman Curry, Grilled Pork Neck (Kor Moo Yang), and more.
2. **Premium Thai Desserts**: Specializing in traditional Thai sweets such as Thong Yip, Thong Yod, Foi Thong, Luk Chup, and Mango Sticky Rice.
3. **Premium Banquets**: 8-course banquet menus available for groups of 8-15+ guests, starting from £55 per guest. Themes include The Ultimate Feast, The Signature Touch, The Royal Experience, and Exotic Fusion.
4. **Event Catering**: Specialized event catering for a minimum of 80 guests. Suitable for Intimate Birthdays, Art Gallery Openings, Corporate Launches, and Weddings. Starting from £25 per guest.

## Contact & Booking
- **Website**: https://zabsiam.co.uk
- **Catering Minimum Requirements**: Minimum 80 guests, 7 days advance booking required.
- **Location**: Based in London/UK.
- **Deposit**: 50% deposit required for private catering bookings.

## Target Audience
Customers in the UK looking for authentic, high-quality Thai food, traditional desserts, and professional catering for large events.
`;
    fs.writeFileSync(dir + '/llms.txt', llmsTxt, 'utf8');
}

setupAIO('C:/Users/KENDEE/Documents/GitHub/khruathai-london/public');
setupAIO('C:/Users/KENDEE/Desktop/เว็บ/public');

console.log("Successfully created SEO and AIO (AI Optimization) files.");
