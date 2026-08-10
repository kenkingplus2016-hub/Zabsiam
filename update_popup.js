const fs = require('fs');

// 1. Update buffet_menu.json
const repoJson = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data\\buffet_menu.json';
const localJson = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\data\\buffet_menu.json';

try {
    let data = JSON.parse(fs.readFileSync(repoJson, 'utf8'));
    let startersCat = data.find(c => c.id === 'starters');
    if (startersCat) {
        startersCat.title = { "th": "Thai Street Food", "en": "Thai Street Food" };
    }
    fs.writeFileSync(repoJson, JSON.stringify(data, null, 4), 'utf8');
    if (fs.existsSync(localJson)) {
        fs.writeFileSync(localJson, JSON.stringify(data, null, 4), 'utf8');
    }
} catch (e) { console.error(e); }

// 2. Update index.html
const repoIndex = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\index.html';
const localIndex = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\index.html';
try {
    let indexHtml = fs.readFileSync(repoIndex, 'utf8');
    indexHtml = indexHtml.replace(/<div class="category-title">Starters<\/div>/, '<div class="category-title">Thai Street Food</div>');
    indexHtml = indexHtml.replace(/alt="Starters"/, 'alt="Thai Street Food"');
    fs.writeFileSync(repoIndex, indexHtml, 'utf8');
    if (fs.existsSync(localIndex)) {
        fs.writeFileSync(localIndex, indexHtml, 'utf8');
    }
} catch (e) { console.error(e); }

// 3. Update menu.html (Redesign Modal & Javascript)
const repoMenu = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\menu.html';
const localMenu = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\menu.html';
try {
    let menuHtml = fs.readFileSync(repoMenu, 'utf8');
    
    // Replace the entire modal HTML (from <div id="product-modal" to <!-- Scripts -->)
    const modalRegex = /<div id="product-modal"[\s\S]*?(?=<!-- Scripts -->)/;
    
    const newModal = `<div id="product-modal" class="fixed inset-0 bg-black/60 z-[9999] hidden items-center justify-center p-4 backdrop-blur-sm">
    <div class="bg-white rounded-xl w-full max-w-[500px] overflow-hidden flex flex-col relative shadow-2xl animate-fade-in-up">
        <!-- Close button -->
        <button onclick="closeProductModal()" class="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white w-8 h-8 flex items-center justify-center rounded-full z-10 transition-colors">
            <i class="fas fa-times"></i>
        </button>

        <!-- Image Container -->
        <div class="w-full aspect-[4/3] bg-gray-100 relative">
            <img id="modal-main-img" src="" alt="Product" class="w-full h-full object-cover">
        </div>

        <!-- Content -->
        <div class="p-6 md:p-8 flex flex-col bg-white">
            <div class="flex justify-between items-start gap-4 mb-3">
                <h2 id="modal-title" class="text-2xl font-bold text-gray-800 font-prompt leading-tight">Product Title</h2>
                <span id="modal-price" class="text-xl font-bold text-[#e65c00]">£0.00</span>
            </div>
            
            <div id="modal-desc" class="text-gray-600 mb-6 text-[15px] leading-relaxed">
                Experience the authentic taste of Thailand with our signature street food dish. Made fresh to order with premium ingredients.
            </div>

            <button onclick="closeProductModal()" class="w-full bg-[#1a433d] text-white py-3 rounded-lg font-bold hover:bg-[#122e2a] transition-colors text-lg">
                Close
            </button>
        </div>
    </div>
</div>\n\n    `;
    
    menuHtml = menuHtml.replace(modalRegex, newModal);
    
    // Also remove the old javascript for modal that populates nutrition and ingredients
    // Find openProductModal function and simplify it
    const jsRegex = /window\.openProductModal = function\(itemId\) \{[\s\S]*?window\.closeProductModal = function\(\) \{[\s\S]*?\};/m;
    
    const newJs = `window.openProductModal = function(itemId) {
            // Find item data
            for (const cat of buffetData) {
                const item = cat.items.find(i => i.id === itemId);
                if (item) {
                    activeItemData = item;
                    break;
                }
            }
            if (!activeItemData) return;
            
            const item = activeItemData;
            const imgSrc = item.img === 'logo.png' ? 'logo.png' : (item.img.startsWith('http') ? item.img : \`images/\${item.img}\`);
            
            // Populate data
            document.getElementById('modal-title').innerText = item.en || item.th;
            if (item.desc) {
                document.getElementById('modal-desc').innerHTML = item.desc;
            }
            document.getElementById('modal-main-img').src = imgSrc;
            
            const p1 = item.price_s1 || item.price;
            document.getElementById('modal-price').innerText = '£' + p1.toFixed(2);
            
            // Show modal
            document.getElementById('product-modal').style.display = 'flex';
            document.body.style.overflow = 'hidden';
        };
        
        window.closeProductModal = function() {
            document.getElementById('product-modal').style.display = 'none';
            document.body.style.overflow = '';
        };`;
        
    menuHtml = menuHtml.replace(jsRegex, newJs);

    fs.writeFileSync(repoMenu, menuHtml, 'utf8');
    if (fs.existsSync(localMenu)) {
        fs.writeFileSync(localMenu, menuHtml, 'utf8');
    }
    console.log("Updated modal successfully!");
} catch (e) { console.error(e); }
