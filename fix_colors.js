const fs = require('fs');
const path = require('path');

const publicDir = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public';
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Make modal text red-orange
    content = content.replace(
        /\.modal-content \{ background-color: #111 !important; color: #fff !important; \}/g, 
        '.modal-content { background-color: #111 !important; color: #e65c00 !important; }\n        .modal-content *, .modal-content h2, .modal-content h3, .modal-content p { color: #e65c00 !important; }'
    );

    // Make the "Thai Street Food" mega nav link red-orange
    if (content.includes('</style>') && !content.includes('a.mega-nav-link[href="menu.html"]')) {
        content = content.replace('</style>', '        a.mega-nav-link[href="menu.html"] { color: #e65c00 !important; font-weight: bold !important; }\n    </style>');
    }

    // Just in case the modal text color needs inline fixing for specific menu items
    content = content.replace(/id="menuModal" class="([^"]*)"/g, 'id="menuModal" class="$1" style="color: #e65c00;"');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Processed:', file);
});
