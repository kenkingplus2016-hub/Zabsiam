const fs = require('fs');

function removeLineIcon(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log("File not found:", filePath);
        return;
    }
    
    let html = fs.readFileSync(filePath, 'utf8');

    // The Line icon HTML
    const lineHtml = '<a href="#contact" aria-label="Line" style="color: var(--color-green-light);"><i class="fab fa-line"></i></a>';
    
    if (html.includes(lineHtml)) {
        html = html.replace(lineHtml, '');
        fs.writeFileSync(filePath, html, 'utf8');
        console.log("Removed LINE icon from", filePath);
    } else {
        console.log("LINE icon not found in", filePath);
    }
}

removeLineIcon('C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/index.html');
removeLineIcon('C:/Users/KENDEE/Desktop/เว็บ/public/index.html');
