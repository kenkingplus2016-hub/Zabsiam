const fs = require('fs');

const cssPath = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/chor-malee.css';
let css = fs.readFileSync(cssPath, 'utf8');

const hoverStyles = `
/* Event Catering Cards */
.event-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(255, 215, 0, 0.15) !important;
    background-color: rgba(255, 215, 0, 0.05) !important;
}

`;

if (!css.includes('.event-card:hover')) {
    css += hoverStyles;
    fs.writeFileSync(cssPath, css, 'utf8');
    console.log("Added CSS hover styles.");
} else {
    console.log("Styles already exist.");
}
