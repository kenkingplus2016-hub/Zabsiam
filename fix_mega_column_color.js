const fs = require('fs');
const path = require('path');

const publicDir = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public';
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Ensure we don't duplicate
    if (content.includes('</style>') && !content.includes('.mega-column a { color: #e65c00')) {
        content = content.replace('</style>', '        .mega-column-title { color: #e65c00 !important; }\n        .mega-column a { color: #e65c00 !important; }\n        .mega-column a:hover { background: #e65c00 !important; color: #fff !important; }\n    </style>');
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Processed:', file);
});
