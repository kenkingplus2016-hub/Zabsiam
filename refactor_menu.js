const fs = require('fs');

const html = fs.readFileSync('public/menu.html', 'utf8');

const headPart = html.substring(0, html.indexOf('</header>') + 9);
const footPart = html.substring(html.indexOf('<footer>'));

const newBody = `
    <section class="hero-banner" style="background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('images/the-signature.jpg'); background-size: cover; background-position: center; height: 50vh; display: flex; flex-direction: column; justify-content: center; align-items: center; color: white; text-align: center; padding: 0 20px;">
        <h1 style="font-family: 'SarunsManorah', serif; font-size: 3rem; color: var(--gold); text-shadow: 2px 2px 4px rgba(0,0,0,0.5); margin-bottom: 10px;">ศรีสยาม อีเว้น/บุฟเฟต์</h1>
        <p style="font-size: 1.2rem; max-width: 600px; font-weight: 300;">Sri Siam Event & Buffet Catering. Customize your dream menu by selecting your favorite authentic dishes.</p>
    </section>

    <main class="w-full max-w-[1200px] mx-auto px-5 py-10" id="buffet-container">
        <!-- Rendered by JS -->
        <div class="text-center py-10"><i class="fas fa-spinner fa-spin text-3xl text-gold"></i><p class="mt-3 text-gray-500">Loading Menu...</p></div>
    </main>

    <!-- QR Code Modal -->
    <div id="qr-modal" class="fixed inset-0 bg-black/80 z-[4000] items-center justify-center p-5 hidden backdrop-blur-sm">
        <div class="bg-white w-full max-w-[350px] rounded-[20px] overflow-hidden relative shadow-2xl border-2 border-gold flex flex-col text-center" style="animation: popIn 0.3s ease-out;">
            <button onclick="document.getElementById('qr-modal').style.display='none'" class="absolute top-3 right-3 text-gray-400 hover:text-dark-green text-2xl transition-colors">&times;</button>
            <div class="bg-dark-green p-4 text-gold font-bold text-lg font-prompt">
                สแกนเพื่อสั่งเมนูนี้
            </div>
            <div class="p-6 flex flex-col items-center">
                <div id="qrcode-container" class="mb-4"></div>
                <h4 id="qr-item-title" class="text-dark-green font-bold text-lg mb-1"></h4>
                <p id="qr-item-price" class="text-gold font-bold mb-4"></p>
                <button onclick="document.getElementById('qr-modal').style.display='none'" class="bg-gold text-dark-green px-6 py-2 rounded-full font-bold w-full hover:bg-dark-green hover:text-gold transition-colors border-2 border-gold">ปิด (Close)</button>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
    <script src="js/cart_v2.js"></script>
    <script>
        let buffetData = [];
        let currentLang = 'th';

        async function loadBuffetMenu() {
            try {
                const res = await fetch('/api/buffet?t=' + new Date().getTime());
                if (res.ok) {
                    buffetData = await res.json();
                    renderBuffet();
                    checkUrlParams();
                }
            } catch (err) {
                console.error("Failed to load buffet menu", err);
            }
        }

        function renderBuffet() {
            const container = document.getElementById('buffet-container');
            let html = '';

            buffetData.forEach(category => {
                html += \`
                    <div class="mb-12">
                        <div class="flex items-center gap-4 mb-6">
                            <h2 class="text-2xl md:text-3xl font-bold text-dark-green font-prompt border-l-4 border-gold pl-4">\${category.title[currentLang]}</h2>
                            <div class="bg-gold text-dark-green px-4 py-1 rounded-full font-bold text-sm">£\${category.price} / จาน (Portion)</div>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                \`;

                category.items.forEach(item => {
                    const imgSrc = item.img === 'logo.png' ? 'logo.png' : (item.img.startsWith('http') ? item.img : \`images/\${item.img}\`);
                    
                    html += \`
                        <div class="bg-white rounded-xl overflow-hidden border border-[#eaeaea] transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_10px_20px_rgba(212,175,55,0.15)] flex flex-col relative group" id="card-\${item.id}">
                            <div class="absolute top-2 left-2 z-10">
                                <button onclick="showQRCode('\${item.id}', '\${item.th}', \${category.price})" class="bg-white/90 text-dark-green w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-gold hover:text-white transition-colors" title="QR Code">
                                    <i class="fas fa-qrcode"></i>
                                </button>
                            </div>
                            <div class="h-[180px] overflow-hidden">
                                <img src="\${imgSrc}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" onerror="this.src='logo.png';">
                            </div>
                            <div class="p-4 flex flex-col flex-1">
                                <h3 class="font-bold text-dark-green text-base mb-1 leading-snug">\${item.th}</h3>
                                <p class="text-xs text-gray-500 mb-3 flex-1">\${item.en}</p>
                                <button onclick="addBuffetItem('\${item.id}', '\${item.th}', \${category.price}, '\${imgSrc}')" class="w-full bg-dark-green text-gold py-2 rounded-full font-bold text-sm hover:bg-gold hover:text-dark-green transition-colors border border-dark-green">
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

        function showQRCode(itemId, title, price) {
            const modal = document.getElementById('qr-modal');
            const container = document.getElementById('qrcode-container');
            const titleEl = document.getElementById('qr-item-title');
            const priceEl = document.getElementById('qr-item-price');

            // Clear previous QR
            container.innerHTML = '';
            
            // Generate URL with parameter
            const url = window.location.origin + window.location.pathname + '?add=' + itemId;

            // Generate new QR
            new QRCode(container, {
                text: url,
                width: 200,
                height: 200,
                colorDark : "#1B3022",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });

            titleEl.textContent = title;
            priceEl.textContent = "£" + price + " / Portion";
            
            modal.style.display = 'flex';
        }

        function addBuffetItem(id, name, price, img) {
            addToCart({
                id: id,
                name: { th: name, en: name },
                price: price,
                qty: 1,
                img: img,
                options: [] // no inner options for buffet dish
            });
            
            // Visual feedback
            const btn = document.querySelector(\`#card-\${id} button.bg-dark-green\`);
            if(btn) {
                const oldHtml = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i> เพิ่มแล้ว';
                btn.classList.add('bg-gold', 'text-dark-green');
                setTimeout(() => {
                    btn.innerHTML = oldHtml;
                    btn.classList.remove('bg-gold', 'text-dark-green');
                }, 1500);
            }
        }

        function checkUrlParams() {
            const urlParams = new URLSearchParams(window.location.search);
            const addItemId = urlParams.get('add');
            
            if (addItemId) {
                // Find item
                for (let cat of buffetData) {
                    const item = cat.items.find(i => i.id === addItemId);
                    if (item) {
                        const imgSrc = item.img === 'logo.png' ? 'logo.png' : (item.img.startsWith('http') ? item.img : \`images/\${item.img}\`);
                        addBuffetItem(item.id, item.th, cat.price, imgSrc);
                        
                        // Scroll to item
                        setTimeout(() => {
                            const el = document.getElementById('card-' + addItemId);
                            if(el) {
                                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                el.style.boxShadow = '0 0 0 4px var(--gold)';
                                setTimeout(() => el.style.boxShadow = '', 2000);
                            }
                        }, 500);
                        
                        // Remove param from URL without reload
                        window.history.replaceState({}, document.title, window.location.pathname);
                        break;
                    }
                }
            }
        }

        document.addEventListener('DOMContentLoaded', loadBuffetMenu);
    </script>
`;

const finalHtml = headPart + newBody + footPart;
fs.writeFileSync('public/menu.html', finalHtml, 'utf8');
console.log("Refactored menu.html successfully.");
