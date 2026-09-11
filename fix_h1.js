const fs = require('fs');
const path = require('path');
const publicDir = path.join(__dirname, 'public');

['canapes.html', 'delivery.html', 'event-catering.html', 'meeting-meals.html'].forEach(file => {
    const filePath = path.join(publicDir, file);
    if (fs.existsSync(filePath)) {
        let html = fs.readFileSync(filePath, 'utf8');
        
        // Find the first <h2 style="...">...</h2> which is the main title and change it to <h1>
        html = html.replace(/<h2 (style="color: var\(--color-gold\); font-size: 2\.5rem;.*?)>(.*?)<\/h2>/, '<h1 $1>$2</h1>');
        
        fs.writeFileSync(filePath, html, 'utf8');
        console.log('Fixed H1 heading in', file);
    }
});
