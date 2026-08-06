const fs = require('fs');

const files = [
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\menu.html',
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\menu.html'
];

for (const filePath of files) {
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Add Filter Bar Container above buffet-container
    if (!content.includes('<div id="category-filter-bar"')) {
        content = content.replace(
            '<main class="w-full max-w-[1200px] mx-auto px-5 py-10" id="buffet-container">',
            `<!-- Category Filter Bar -->
    <div class="sticky top-[80px] md:top-[120px] z-[900] bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm mb-6 w-full hidden md:block">
        <div class="max-w-[1200px] mx-auto px-5 py-3 overflow-x-auto whitespace-nowrap hide-scrollbar flex gap-2" id="category-filter-bar">
            <!-- Filter buttons injected here -->
        </div>
    </div>
    
    <main class="w-full max-w-[1200px] mx-auto px-5 py-6" id="buffet-container">`
        );
    }
    
    // 2. Add some CSS for the active filter and hide-scrollbar
    if (!content.includes('.hide-scrollbar')) {
        content = content.replace(
            '</style>',
            `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .filter-btn {
            @apply px-5 py-2 rounded-full text-sm font-semibold border border-gray-300 text-gray-600 hover:border-dark-green hover:text-dark-green transition-colors cursor-pointer bg-white;
        }
        .filter-btn.active {
            @apply bg-dark-green text-white border-dark-green;
        }
        </style>`
        );
    }

    // 3. Update the renderBuffet JS to generate filters and use the new grid layout
    // I will completely replace the renderBuffet function
    const newRenderBuffet = `
        let currentCategory = 'all';

        function renderBuffet() {
            renderFilters();
            renderGrid();
        }

        function renderFilters() {
            const filterContainer = document.getElementById('category-filter-bar');
            if (!filterContainer) return;
            
            let html = \`<button class="filter-btn \${currentCategory === 'all' ? 'active' : ''}" onclick="filterCategory('all')">All Dishes</button>\`;
            
            buffetData.forEach(category => {
                if (category.id === 'services') return;
                const catTitle = category.title.en || category.title.th || category.title;
                const isActive = currentCategory === category.id ? 'active' : '';
                html += \`<button class="filter-btn \${isActive}" onclick="filterCategory('\${category.id}')">\${catTitle}</button>\`;
            });
            
            filterContainer.innerHTML = html;
        }

        window.filterCategory = function(catId) {
            currentCategory = catId;
            renderFilters();
            renderGrid();
            window.scrollTo({ top: document.getElementById('category-filter-bar').offsetTop - 100, behavior: 'smooth' });
        };

        function renderGrid() {
            const container = document.getElementById('buffet-container');
            let html = '';

            buffetData.forEach(category => {
                if (category.id === 'services') return;
                if (currentCategory !== 'all' && category.id !== currentCategory) return;
                
                const catTitle = category.title.en || category.title.th || category.title;
                
                html += \`
                    <div class="mb-12" id="section-\${category.id}">
                        <div class="flex items-center gap-4 mb-6 pb-2 border-b-2 border-gray-100">
                            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 font-prompt">\${catTitle}</h2>
                        </div>
                        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                \`;

                category.items.forEach(item => {
                    const imgSrc = item.img === 'logo.png' ? 'logo.png' : (item.img.startsWith('http') ? item.img : \`images/\${item.img}\`);
                    const unit = item.unit || 'Portion';
                    
                    html += \`
                        <div class="bg-white rounded-lg overflow-hidden flex flex-col relative group" id="card-\${item.id}">
                            <div class="relative w-full aspect-square overflow-hidden bg-gray-50 mb-3 rounded-lg">
                                <img src="\${imgSrc}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" onerror="this.src='logo.png';">
                                <div class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-dark-green px-2.5 py-1 rounded-md font-bold text-sm shadow-sm border border-gray-100">
                                    £\${item.price}
                                </div>
                            </div>
                            <div class="flex flex-col flex-1 px-1">
                                <h3 class="font-bold text-gray-800 text-[15px] mb-1 leading-snug flex-1">\${item.en}</h3>
                                <p class="text-[11px] text-gray-500 mb-3 uppercase tracking-wider">\${unit}</p>
                                <button onclick="addBuffetItem('\${item.id}', '\${item.en}', \${item.price}, '\${imgSrc}')" class="w-full bg-[#1B3022] text-white py-2.5 rounded-md font-bold text-sm hover:bg-[#2c4c36] transition-colors flex items-center justify-center gap-2 mt-auto">
                                    <i class="fas fa-shopping-basket"></i> Add to basket
                                </button>
                            </div>
                        </div>
                    \`;
                });

                html += \`</div></div>\`;
            });

            container.innerHTML = html;
        }
    `;

    // Replace the old renderBuffet function
    const renderBuffetRegex = /function renderBuffet\(\) \{[\s\S]*?(?=let currentPackage = null;)/;
    if (renderBuffetRegex.test(content)) {
        content = content.replace(renderBuffetRegex, newRenderBuffet);
    } else {
        console.log("Could not find renderBuffet block to replace in " + filePath);
    }
    
    // Also remove the old A La Carte divider
    content = content.replace(/<!-- Divider before a la carte -->[\s\S]*?<\/section>/, '</section>');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Processed: ' + filePath);
}
