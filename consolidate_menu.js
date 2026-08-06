const fs = require('fs');
const path = require('path');

const filePaths = [
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\index.html',
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\index.html'
];

const menuLogic = 
    '<!-- Menu Section -->\\n' +
    '<main class="w-full max-w-[1200px] mx-auto px-5 py-6" id="buffet-container">\\n' +
    '    <!-- Content will be injected by JavaScript -->\\n' +
    '</main>\\n' +
    '\\n' +
    '<script>\\n' +
    '    document.addEventListener("DOMContentLoaded", () => {\\n' +
    '        fetch("data/buffet_menu.json")\\n' +
    '            .then(res => res.json())\\n' +
    '            .then(data => {\\n' +
    '                const container = document.getElementById("buffet-container");\\n' +
    '                let html = "";\\n' +
    '                \\n' +
    '                data.categories.forEach(cat => {\\n' +
    '                    if (!cat.items || cat.items.length === 0) return;\\n' +
    '                    \\n' +
    '                    html += "\\n' +
    '                        <div class=\\"mb-12\\" id=\\"section-" + cat.id + "\\">\\n' +
    '                            <h2 class=\\"text-3xl font-bold mb-6 pb-2 border-b border-gray-800\\" style=\\"color: #e65c00;\\">" + cat.title + "</h2>\\n' +
    '                            <div class=\\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6\\">\\n' +
    '                    ";\\n' +
    '                    \\n' +
    '                    cat.items.forEach(item => {\\n' +
    '                        html += "\\n' +
    '                            <div class=\\"menu-card bg-[#111] rounded-lg overflow-hidden border border-gray-800 transition hover:border-[#e65c00]\\">\\n' +
    '                                <div class=\\"aspect-w-16 aspect-h-9 w-full\\">\\n' +
    '                                    <img src=\\"" + item.image + "\\" alt=\\"" + item.name + "\\" class=\\"w-full h-[200px] object-cover\\" onerror=\\"this.src=\'logo2.png\'; this.style.objectFit=\'contain\';\\">\\n' +
    '                                </div>\\n' +
    '                                <div class=\\"p-4\\">\\n' +
    '                                    <div class=\\"flex justify-between items-start mb-2\\">\\n' +
    '                                        <h3 class=\\"text-xl font-bold text-white\\">" + item.name + "</h3>\\n' +
    '                                        <span class=\\"text-[#e65c00] font-bold\\">" + item.price + "</span>\\n' +
    '                                    </div>\\n' +
    '                                    <p class=\\"text-gray-400 text-sm mb-4\\">" + item.description + "</p>\\n' +
    '                                </div>\\n' +
    '                            </div>\\n' +
    '                        ";\\n' +
    '                    });\\n' +
    '                    \\n' +
    '                    html += "\\n' +
    '                            </div>\\n' +
    '                        </div>\\n' +
    '                    ";\\n' +
    '                });\\n' +
    '                \\n' +
    '                container.innerHTML = html;\\n' +
    '                \\n' +
    '                if(window.location.hash) {\\n' +
    '                    setTimeout(() => {\\n' +
    '                        const el = document.querySelector(window.location.hash);\\n' +
    '                        if(el) el.scrollIntoView({ behavior: \'smooth\' });\\n' +
    '                    }, 500);\\n' +
    '                }\\n' +
    '            })\\n' +
    '            .catch(err => {\\n' +
    '                console.error("Error loading menu:", err);\\n' +
    '                document.getElementById("buffet-container").innerHTML = "<p class=\\"text-center text-red-500\\">Failed to load menu. Please try again later.</p>";\\n' +
    '            });\\n' +
    '    });\\n' +
    '</script>\\n';

filePaths.forEach(filePath => {
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 1. Update mega-menu links
        content = content.replace(/menu\.html\?cat=pad_krapow/g, '#section-pad_krapow');
        content = content.replace(/menu\.html\?cat=spicy_salads/g, '#section-spicy_salads');
        content = content.replace(/menu\.html\?cat=desserts/g, '#section-desserts');
        
        // Update general menu.html links to #buffet-container
        content = content.replace(/href="menu\.html"/g, 'href="#buffet-container"');
        
        // 2. Replace the old categories-grid
        const gridStart = '<section class="categories-grid"';
        const gridEnd = '</section>';
        const startIndex = content.indexOf(gridStart);
        if (startIndex !== -1) {
            const endIndex = content.indexOf(gridEnd, startIndex) + gridEnd.length;
            
            // Replace the grid with the new menu logic
            content = content.substring(0, startIndex) + menuLogic + content.substring(endIndex);
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated ' + filePath);
    }
});

// Delete menu.html
const menuPaths = [
    'C:\\\\Users\\\\KENDEE\\\\Documents\\\\GitHub\\\\khruathai-london\\\\public\\\\menu.html',
    'C:\\\\Users\\\\KENDEE\\\\Desktop\\\\เว็บ\\\\public\\\\menu.html'
];
menuPaths.forEach(p => {
    if (fs.existsSync(p)) {
        fs.unlinkSync(p);
        console.log('Deleted ' + p);
    }
});

console.log("Done.");
