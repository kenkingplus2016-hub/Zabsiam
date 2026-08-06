const fs = require('fs');

const files = [
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\menu.html',
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\menu.html'
];

const modalHTML = `
<!-- Product Detail Modal -->
<div id="product-modal" class="fixed inset-0 bg-black/60 z-[2000] hidden items-center justify-center p-4 md:p-8 backdrop-blur-sm overflow-y-auto" onclick="closeProductModal()">
    <div class="bg-white w-full max-w-[1000px] rounded-xl shadow-2xl relative my-auto flex flex-col md:flex-row overflow-hidden" onclick="event.stopPropagation()">
        <!-- Close Button -->
        <button onclick="closeProductModal()" class="absolute top-4 right-4 z-10 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 shadow-sm border border-gray-200 transition-colors backdrop-blur-sm">
            <i class="fas fa-times text-lg"></i>
        </button>

        <!-- Left: Images -->
        <div class="w-full md:w-1/2 bg-gray-50 flex flex-col">
            <div class="relative aspect-[4/3] md:aspect-square overflow-hidden bg-gray-100">
                <img id="modal-main-img" src="" class="absolute inset-0 w-full h-full object-cover">
            </div>
            <!-- Thumbnails -->
            <div class="flex gap-3 p-5 overflow-x-auto bg-white border-r border-gray-100">
                <img id="modal-thumb-1" src="" class="w-20 h-20 object-cover border-2 border-[#5c8b54] rounded-md cursor-pointer hover:opacity-90 transition-opacity" onclick="document.getElementById('modal-main-img').src=this.src; document.querySelectorAll('.modal-thumb').forEach(el=>el.classList.replace('border-[#5c8b54]', 'border-transparent')); this.classList.replace('border-transparent', 'border-[#5c8b54]');">
                <img id="modal-thumb-2" src="" class="w-20 h-20 object-cover border-2 border-transparent rounded-md cursor-pointer opacity-70 hover:opacity-100 transition-opacity hidden modal-thumb" onclick="document.getElementById('modal-main-img').src=this.src; document.querySelectorAll('.modal-thumb').forEach(el=>el.classList.replace('border-[#5c8b54]', 'border-transparent')); this.classList.replace('border-transparent', 'border-[#5c8b54]');">
            </div>
        </div>

        <!-- Right: Details -->
        <div class="w-full md:w-1/2 p-6 md:p-10 flex flex-col md:h-[600px] overflow-y-auto hide-scrollbar bg-white">
            <h2 id="modal-title" class="text-2xl md:text-[28px] font-bold text-gray-800 mb-3 font-serif leading-tight">Product Title</h2>
            
            <!-- Dietary Icons -->
            <div class="flex gap-2 mb-5 text-gray-500 text-xs font-bold">
                <span class="border border-gray-300 rounded-full w-7 h-7 flex items-center justify-center" title="Gluten Free">GF</span>
                <span class="border border-gray-300 rounded-full w-7 h-7 flex items-center justify-center" title="Dairy Free">DF</span>
                <span class="border border-gray-300 rounded-full w-7 h-7 flex items-center justify-center"><i class="fas fa-pepper-hot text-red-500"></i></span>
            </div>

            <!-- Description -->
            <div id="modal-desc" class="text-gray-600 mb-8 text-[15px] leading-relaxed">
                A classic mild Thai dish made with premium ingredients. Please check the ingredients tab for more details.
            </div>

            <!-- Pricing Rows -->
            <div class="flex flex-col gap-2.5 mb-8">
                <!-- Serves 1 -->
                <div class="flex items-center justify-between bg-[#f8f9fa] px-4 py-3 rounded border border-gray-100">
                    <div class="text-[15px] text-gray-700">Serves 1 <span class="text-gray-400 text-sm ml-1">(250g)</span></div>
                    <div class="flex items-center gap-6">
                        <span id="modal-price-1" class="font-bold text-gray-800 text-lg">£0.00</span>
                        <button id="modal-add-1" class="bg-[#598c73] text-white px-8 py-2 rounded font-semibold hover:bg-[#46705c] transition-colors">Add</button>
                    </div>
                </div>
                <!-- Serves 2 -->
                <div class="flex items-center justify-between bg-[#f8f9fa] px-4 py-3 rounded border border-gray-100">
                    <div class="text-[15px] text-gray-700">Serves 2 <span class="text-gray-400 text-sm ml-1">(500g)</span></div>
                    <div class="flex items-center gap-6">
                        <span id="modal-price-2" class="font-bold text-gray-800 text-lg">£0.00</span>
                        <button id="modal-add-2" class="bg-[#598c73] text-white px-8 py-2 rounded font-semibold hover:bg-[#46705c] transition-colors">Add</button>
                    </div>
                </div>
                <!-- Serves 4 -->
                <div class="flex items-center justify-between bg-[#f8f9fa] px-4 py-3 rounded border border-gray-100">
                    <div class="text-[15px] text-gray-700">Serves 4 <span class="text-gray-400 text-sm ml-1">(1kg)</span></div>
                    <div class="flex items-center gap-6">
                        <span id="modal-price-4" class="font-bold text-gray-800 text-lg">£0.00</span>
                        <button id="modal-add-4" class="bg-[#598c73] text-white px-8 py-2 rounded font-semibold hover:bg-[#46705c] transition-colors">Add</button>
                    </div>
                </div>
            </div>

            <!-- Accordions -->
            <div class="flex flex-col border-t border-gray-200 mt-auto">
                <div class="border-b border-gray-200">
                    <button onclick="toggleAccordion('acc-nutrition')" class="w-full py-4 flex justify-between items-center text-left text-gray-700 font-semibold hover:text-black transition-colors text-lg">
                        Nutrition
                        <i class="fas fa-plus text-gray-400 text-sm transition-transform duration-300" id="acc-nutrition-icon"></i>
                    </button>
                    <div id="acc-nutrition" class="hidden pb-5 text-[15px] text-gray-600 leading-relaxed">
                        Information will be updated soon. Typical values per 100g: Energy 500kJ/120kcal.
                    </div>
                </div>
                <div class="border-b border-gray-200">
                    <button onclick="toggleAccordion('acc-ingredients')" class="w-full py-4 flex justify-between items-center text-left text-gray-700 font-semibold hover:text-black transition-colors text-lg">
                        Ingredients
                        <i class="fas fa-plus text-gray-400 text-sm transition-transform duration-300" id="acc-ingredients-icon"></i>
                    </button>
                    <div id="acc-ingredients" class="hidden pb-5 text-[15px] text-gray-600 leading-relaxed">
                        Authentic Thai ingredients. See packaging for full list.
                    </div>
                </div>
                <div class="border-b border-gray-200">
                    <button onclick="toggleAccordion('acc-cooking')" class="w-full py-4 flex justify-between items-center text-left text-gray-700 font-semibold hover:text-black transition-colors text-lg">
                        Cooking/Serving Instructions
                        <i class="fas fa-plus text-gray-400 text-sm transition-transform duration-300" id="acc-cooking-icon"></i>
                    </button>
                    <div id="acc-cooking" class="hidden pb-5 text-[15px] text-gray-600 leading-relaxed">
                        Reheat thoroughly before serving. Ensure piping hot throughout.
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</div>
`;

const jsLogic = `
        // Modal Logic
        let activeItemData = null;
        
        window.openProductModal = function(itemId) {
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
            document.getElementById('modal-title').innerText = item.en;
            if (item.desc) {
                document.getElementById('modal-desc').innerHTML = item.desc;
            } else {
                document.getElementById('modal-desc').innerHTML = "Experience the authentic taste of Thailand with our signature " + item.en + ". Made fresh to order.";
            }
            
            // Images
            const mainImg = document.getElementById('modal-main-img');
            const thumb1 = document.getElementById('modal-thumb-1');
            const thumb2 = document.getElementById('modal-thumb-2');
            
            mainImg.src = imgSrc;
            thumb1.src = imgSrc;
            thumb1.classList.add('modal-thumb');
            thumb1.classList.replace('border-transparent', 'border-[#5c8b54]');
            
            if (item.img_hover) {
                const hoverSrc = item.img_hover.startsWith('http') ? item.img_hover : \`images/\${item.img_hover}\`;
                thumb2.src = hoverSrc;
                thumb2.classList.remove('hidden');
                thumb2.classList.add('modal-thumb');
                thumb2.classList.replace('border-[#5c8b54]', 'border-transparent');
            } else {
                thumb2.classList.add('hidden');
            }
            
            // Prices & Add functions
            document.getElementById('modal-price-1').innerText = '£' + item.price.toFixed(2);
            document.getElementById('modal-price-2').innerText = '£' + (item.price * 1.7).toFixed(2);
            document.getElementById('modal-price-4').innerText = '£' + (item.price * 3.2).toFixed(2);
            
            document.getElementById('modal-add-1').onclick = () => { addBuffetItem(item.id + '_s1', item.en + ' (Serves 1)', item.price, imgSrc); closeProductModal(); };
            document.getElementById('modal-add-2').onclick = () => { addBuffetItem(item.id + '_s2', item.en + ' (Serves 2)', item.price * 1.7, imgSrc); closeProductModal(); };
            document.getElementById('modal-add-4').onclick = () => { addBuffetItem(item.id + '_s4', item.en + ' (Serves 4)', item.price * 3.2, imgSrc); closeProductModal(); };
            
            // Show modal
            document.getElementById('product-modal').style.display = 'flex';
            document.body.style.overflow = 'hidden';
        };
        
        window.closeProductModal = function() {
            document.getElementById('product-modal').style.display = 'none';
            document.body.style.overflow = '';
        };
        
        window.toggleAccordion = function(id) {
            const el = document.getElementById(id);
            const icon = document.getElementById(id + '-icon');
            if (el.classList.contains('hidden')) {
                el.classList.remove('hidden');
                icon.classList.replace('fa-plus', 'fa-minus');
                icon.style.transform = 'rotate(180deg)';
            } else {
                el.classList.add('hidden');
                icon.classList.replace('fa-minus', 'fa-plus');
                icon.style.transform = 'rotate(0deg)';
            }
        };
`;

for (const filePath of files) {
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // Inject HTML modal before scripts
    if (!content.includes('id="product-modal"')) {
        content = content.replace('<!-- Scripts -->', modalHTML + '\n    <!-- Scripts -->');
    }
    
    // Inject JS logic
    if (!content.includes('function openProductModal')) {
        content = content.replace('function renderGrid(searchTerm = \'\') {', jsLogic + '\n        function renderGrid(searchTerm = \'\') {');
    }

    // Update Grid to make images and titles clickable to open modal
    // Find: <img src="${imgSrc}" class="absolute inset-0
    const imgRegex = /<img src="\$\{imgSrc\}" class="absolute inset-0/g;
    content = content.replace(imgRegex, '<img src="${imgSrc}" onclick="openProductModal(\'${item.id}\')" class="cursor-pointer absolute inset-0');
    
    // Find hover image and make it clickable too
    const hoverRegex = /<img src="\$\{hoverImgSrc\}" class="absolute inset-0/g;
    content = content.replace(hoverRegex, '<img src="${hoverImgSrc}" onclick="openProductModal(\'${item.id}\')" class="cursor-pointer absolute inset-0');
    
    // Find title and make it clickable
    // <h3 class="font-bold text-gray-800 text-[16px] mb-2 leading-snug">${item.en}</h3>
    const titleRegex = /<h3 class="font-bold text-gray-800 text-\[16px\] mb-2 leading-snug">\$\{item\.en\}<\/h3>/g;
    content = content.replace(titleRegex, '<h3 onclick="openProductModal(\'${item.id}\')" class="font-bold text-gray-800 text-[16px] mb-2 leading-snug cursor-pointer hover:text-[#598c73] transition-colors">${item.en}</h3>');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Processed: ' + filePath);
}
