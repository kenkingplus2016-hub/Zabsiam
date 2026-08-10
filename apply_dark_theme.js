const fs = require('fs');
const path = require('path');

const publicDir = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public';
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Make body and html black by injecting CSS or adding Tailwind classes
    if (content.includes('<body')) {
        content = content.replace(/<body([^>]*)class="([^"]*)"/g, '<body$1class="$2 bg-black text-white"');
        if (!content.match(/<body[^>]*class=/)) {
            content = content.replace(/<body([^>]*)>/g, '<body$1 class="bg-black text-white">');
        }
    }

    // Common Tailwind background color replacements for a true black theme
    content = content.replace(/\bbg-white\b/g, 'bg-gray-900');
    content = content.replace(/\bbg-gray-50\b/g, 'bg-black');
    content = content.replace(/\bbg-gray-100\b/g, 'bg-black');
    content = content.replace(/\bbg-gray-200\b/g, 'bg-gray-900');
    
    // Common Tailwind text color replacements
    content = content.replace(/\btext-gray-900\b/g, 'text-white');
    content = content.replace(/\btext-gray-800\b/g, 'text-white');
    content = content.replace(/\btext-gray-700\b/g, 'text-gray-200');
    content = content.replace(/\btext-gray-600\b/g, 'text-gray-300');
    content = content.replace(/\btext-black\b/g, 'text-white');
    
    // Common Tailwind border color replacements
    content = content.replace(/\bborder-gray-100\b/g, 'border-gray-800');
    content = content.replace(/\bborder-gray-200\b/g, 'border-gray-700');
    content = content.replace(/\bborder-gray-300\b/g, 'border-gray-700');

    // Add a dark theme CSS override in head just to be safe
    const darkThemeCss = `
    <style>
        body, html { background-color: #000 !important; color: #fff !important; }
        .mega-header { background-color: #000 !important; border-bottom: 1px solid #333 !important; }
        .mega-nav-link { color: #fff !important; }
        .mega-dropdown { background-color: #111 !important; border-color: #333 !important; }
        .category-card, .menu-card { background-color: #111 !important; border-color: #333 !important; color: #fff !important; }
        .category-card:hover, .menu-card:hover { border-color: #e65c00 !important; }
        .category-card h3, .menu-card h3 { color: #fff !important; }
        .menu-card p { color: #ccc !important; }
        .modal-content { background-color: #111 !important; color: #fff !important; }
        .close { color: #fff !important; }
        /* Fix inputs in dark mode */
        input, textarea, select { background-color: #222 !important; color: #fff !important; border-color: #444 !important; }
    </style>
    </head>`;

    if (content.includes('</head>') && !content.includes('body, html { background-color: #000')) {
        content = content.replace('</head>', darkThemeCss);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Processed:', file);
});
