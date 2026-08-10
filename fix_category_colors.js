const fs = require('fs');
const path = require('path');

const publicDir = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public';
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Add styles for category-title and category-subtitle to be red-orange
    if (content.includes('</style>') && !content.includes('.category-title { color: #e65c00 !important;')) {
        content = content.replace('</style>', '        .category-title { color: #e65c00 !important; }\n        .category-subtitle { color: #e65c00 !important; }\n    </style>');
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Processed:', file);
});
