const fs = require('fs');
const path = require('path');

const publicDir = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public';
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Add style for footer to be black
    if (content.includes('</style>') && !content.includes('footer { background-color: #000 !important;')) {
        content = content.replace('</style>', '        footer { background-color: #000 !important; color: #fff !important; border-top: 1px solid #333 !important; }\n    </style>');
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Processed:', file);
});
