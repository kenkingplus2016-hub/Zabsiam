const fs = require('fs');

let html = fs.readFileSync('public/menu.html', 'utf8');

// The old renderBuffet function
const oldRenderStart = html.indexOf('function renderBuffet() {');
const oldRenderEnd = html.indexOf('function showQRCode(itemId, title, price) {');

const oldRender = html.substring(oldRenderStart, oldRenderEnd);

const newRender = `function renderBuffet() {
            const container = document.getElementById('buffet-container');
            let html = '';

            buffetData.forEach(category => {
                html += \`
                    <div class="mb-12">
                        <div class="flex items-center gap-4 mb-6">
                            <h2 class="text-2xl md:text-3xl font-bold text-dark-green font-prompt border-l-4 border-gold pl-4">\${category.title[currentLang]}</h2>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                \`;

                category.items.forEach(item => {
                    const imgSrc = item.img === 'logo.png' ? 'logo.png' : (item.img.startsWith('http') ? item.img : \`images/\${item.img}\`);
                    
                    html += \`
                        <div class="bg-white rounded-xl overflow-hidden border border-[#eaeaea] transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_10px_20px_rgba(212,175,55,0.15)] flex flex-col relative group" id="card-\${item.id}">
                            <div class="absolute top-2 left-2 z-10 flex gap-2">
                                <button onclick="showQRCode('\${item.id}', '\${item.th}', \${item.price})" class="bg-white/90 text-dark-green w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-gold hover:text-white transition-colors" title="QR Code">
                                    <i class="fas fa-qrcode"></i>
                                </button>
                            </div>
                            <div class="absolute top-2 right-2 z-10">
                                <div class="bg-gold text-dark-green px-3 py-1 rounded-full font-bold text-sm shadow-md">£\${item.price} / จาน</div>
                            </div>
                            <div class="h-[180px] overflow-hidden">
                                <img src="\${imgSrc}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" onerror="this.src='logo.png';">
                            </div>
                            <div class="p-4 flex flex-col flex-1">
                                <h3 class="font-bold text-dark-green text-base mb-1 leading-snug">\${item.th}</h3>
                                <p class="text-xs text-gray-500 mb-3 flex-1">\${item.en}</p>
                                <button onclick="addBuffetItem('\${item.id}', '\${item.th}', \${item.price}, '\${imgSrc}')" class="w-full bg-dark-green text-gold py-2 rounded-full font-bold text-sm hover:bg-gold hover:text-dark-green transition-colors border border-dark-green mt-auto">
                                    <i class="fas fa-plus mr-1"></i> เพิ่มลงตะกร้า
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

html = html.replace(oldRender, newRender);

// Also need to update the checkUrlParams logic since cat.price is gone
const oldCheck = `addBuffetItem(item.id, item.th, cat.price, imgSrc);`;
const newCheck = `addBuffetItem(item.id, item.th, item.price, imgSrc);`;
html = html.replace(oldCheck, newCheck);

fs.writeFileSync('public/menu.html', html, 'utf8');
console.log("Updated menu.html to show item-level prices and new categories.");
