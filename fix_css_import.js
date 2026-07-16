const fs = require('fs');

function injectCSS(file) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    if (!content.includes('cart.css')) {
        content = content.replace('</head>', '    <link href="css/cart.css" rel="stylesheet">\n</head>');
        fs.writeFileSync(file, content);
        console.log('Injected cart.css into ' + file);
    } else {
        console.log('cart.css already in ' + file);
    }
}

injectCSS('C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/delivery.html');
injectCSS('C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/desserts.html');
injectCSS('C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/royal.html');
