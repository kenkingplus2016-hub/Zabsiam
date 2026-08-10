const fs = require('fs');

const files = [
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\menu.html',
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\menu.html'
];

const newHeader = `<header class="bg-white border-b border-gray-200 sticky top-0 z-[1000] shadow-sm">
    <!-- Top Row: Logo, Search, Cart -->
    <div class="max-w-[1200px] mx-auto px-5 py-4 flex items-center justify-between gap-4 md:gap-8">
        <!-- Logo -->
        <a href="index.html" class="flex-shrink-0">
            <img src="logo.png" alt="Khrua Thai London" class="h-[40px] md:h-[50px] w-auto">
        </a>
        
        <!-- Search Bar -->
        <div class="hidden md:flex flex-1 max-w-[600px] relative">
            <input type="text" id="menu-search" onkeyup="searchMenu(this.value)" placeholder="Search for dishes..." class="w-full pl-4 pr-10 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:border-[#5c8b54] focus:ring-1 focus:ring-[#5c8b54] transition-colors shadow-inner bg-gray-50/50">
            <button class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#5c8b54]">
                <i class="fas fa-search"></i>
            </button>
        </div>

        <!-- Right: Cart & Mobile Menu -->
        <div class="flex items-center gap-4">
            <a href="booking.html" class="flex items-center gap-2 text-gray-700 hover:text-[#5c8b54] transition-colors group bg-gray-50 px-4 py-2 rounded-full border border-gray-200 hover:border-[#5c8b54]">
                <div class="relative">
                    <i class="fas fa-shopping-basket text-xl group-hover:scale-110 transition-transform"></i>
                    <span id="nav-cart-badge-inner" class="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm" style="display:none;">0</span>
                </div>
                <span class="hidden md:block font-bold text-sm">Basket</span>
            </a>
            <div class="mobile-menu-btn md:hidden text-2xl cursor-pointer text-gray-700"><i class="fas fa-bars"></i></div>
        </div>
    </div>
    
    <!-- Mobile Search -->
    <div class="md:hidden px-5 pb-4">
        <div class="relative">
            <input type="text" id="mobile-menu-search" onkeyup="searchMenu(this.value)" placeholder="Search for dishes..." class="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-[#5c8b54] bg-gray-50/50 shadow-inner">
            <i class="fas fa-search absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
    </div>

    <!-- Bottom Row: Navigation Links -->
    <nav class="hidden md:block border-t border-gray-100 bg-gray-50/30" id="main-nav">
        <div class="max-w-[1200px] mx-auto px-5 flex justify-start gap-2 py-1.5 overflow-x-auto hide-scrollbar">
            <a href="index.html" id="nav-home" class="nav-link">Home</a>
            <a href="menu.html" id="nav-menu" class="nav-link active">Event & Buffet</a>
            <a href="royal.html" id="nav-royal" class="nav-link">Cocktails and Canapés</a>
            <a href="delivery.html" id="nav-delivery" class="nav-link">Delivery Box Sets</a>
            <a href="desserts.html" id="nav-desserts" class="nav-link">Desserts</a>
        </div>
    </nav>
</header>`;

for (const filePath of files) {
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Replace entire header
    content = content.replace(/<header[\s\S]*?<\/header>/, newHeader);

    // 2. Add search logic to JS
    if (!content.includes('function searchMenu')) {
        // Find renderGrid to update it
        const oldRenderGrid = `function renderGrid() {
            const container = document.getElementById('buffet-container');
            let html = '';

            buffetData.forEach(category => {
                if (category.id === 'services') return;
                if (currentCategory !== 'all' && category.id !== currentCategory) return;
                
                const catTitle = category.title.en || category.title.th || category.title;`;

        const newRenderGrid = `
        window.searchMenu = function(query) {
            const searchTerm = query.toLowerCase().trim();
            // Sync both search bars
            const desktopSearch = document.getElementById('menu-search');
            const mobileSearch = document.getElementById('mobile-menu-search');
            if (desktopSearch && desktopSearch.value !== query) desktopSearch.value = query;
            if (mobileSearch && mobileSearch.value !== query) mobileSearch.value = query;
            
            if (searchTerm !== '') {
                currentCategory = 'search'; // special state
            } else if (currentCategory === 'search') {
                currentCategory = 'all';
            }
            renderFilters();
            renderGrid(searchTerm);
        };

        function renderGrid(searchTerm = '') {
            const container = document.getElementById('buffet-container');
            let html = '';
            let hasResults = false;

            buffetData.forEach(category => {
                if (category.id === 'services') return;
                if (currentCategory !== 'all' && currentCategory !== 'search' && category.id !== currentCategory) return;
                
                // Filter items by search term
                const filteredItems = category.items.filter(item => {
                    if (!searchTerm) return true;
                    return item.en.toLowerCase().includes(searchTerm) || (item.th && item.th.toLowerCase().includes(searchTerm));
                });
                
                if (filteredItems.length === 0) return;
                hasResults = true;
                
                const catTitle = category.title.en || category.title.th || category.title;`;
                
        content = content.replace(oldRenderGrid, newRenderGrid);
        
        // Also update the inner loop of renderGrid to use filteredItems instead of category.items
        content = content.replace(/category\.items\.forEach\(item => \{/g, 'filteredItems.forEach(item => {');
        
        // Add empty state if no results
        const closingGridTags = `</div></div>\`;
            });

            container.innerHTML = html;`;
            
        const newClosingGridTags = `</div></div>\`;
            });

            if (!hasResults && searchTerm) {
                html = \`<div class="text-center py-12"><i class="fas fa-search text-4xl text-gray-300 mb-4"></i><h3 class="text-xl font-bold text-gray-700">No dishes found for "\${searchTerm}"</h3><p class="text-gray-500 mt-2">Try adjusting your search or browsing the categories.</p></div>\`;
            }

            container.innerHTML = html;`;
            
        content = content.replace(closingGridTags, newClosingGridTags);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Processed: ' + filePath);
}
