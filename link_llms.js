const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');
if (!html.includes('llms.txt')) {
    html = html.replace('</head>', '    <link rel="alternate" type="text/plain" href="/llms.txt" title="AI Menu Data">\n</head>');
    fs.writeFileSync('public/index.html', html, 'utf8');
}
