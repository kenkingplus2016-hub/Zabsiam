
    let menuSets = [];
    let currentLang = 'th';

    async function loadMenuData() {
        try {
            const res = await fetch('/api/menu');
            if (res.ok) {
                menuSets = await res.json();
                menuSets.forEach(s => s.unit = { th: '5 ท่าน', en: '5 Persons' });
                renderMenu();
            } else {
                console.error('Failed to load menu data');
            }
        } catch (err) {
            console.error('Error loading menu:', err);
        }
    }

    function renderMenu() {
        const container = document.getElementById('menu-container');
        let html = '';

        menuSets.forEach(set => {
            const priceLabel = currentLang === 'th' ? 'ราคารวมต่อเซต' : 'Total Price per Set';
            const paxLabel = currentLang === 'th' ? `สำหรับ ${set.unit[currentLang]}` : `For ${set.unit[currentLang]}`;
            const excludeLabel = currentLang === 'th' ? '*ไม่รวมภาษี อุปกรณ์ และบริการ' : '*Excl. Tax, Equipment & Service';

            // Build Inner Slider Items
            let slidesHtml = '';
            set.items.forEach((item, index) => {
                const imgSrc = item.img === 'logo.png' ? 'logo.png' : (item.img.startsWith('http') ? item.img : `images/${item.img}`);
                slidesHtml += `
                    <div class="swiper-slide h-auto cursor-pointer" onclick="openItemModal(${set.id}, ${index})">
                        <div class="bg-[#fafafa] rounded-xl overflow-hidden border border-[#eaeaea] transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_10px_20px_rgba(212,175,55,0.15)] h-full flex flex-col group relative">
                            <div class="absolute top-3 right-3 bg-white/80 w-8 h-8 rounded-full flex items-center justify-center z-10 text-gold shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <i class="fas fa-search-plus"></i>
                            </div>
                            <div class="overflow-hidden h-[160px] md:h-[200px]">
                                <img src="${imgSrc}" alt="${item[currentLang]}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" onerror="this.onerror=null; this.src='logo.png';">
                            </div>
                            <div class="p-4 text-center flex-1 flex flex-col justify-center">
                                <div class="text-xs text-gold font-bold uppercase mb-1 tracking-widest">${item.type[currentLang]}</div>
                                <div class="text-base text-dark-green font-semibold leading-snug">${item.th}</div>
                                <div class="text-sm text-gray-500 mt-1">${item.en}</div>
                            </div>
                        </div>
                    </div>
                `;
            });

            html += `
                <div class="mb-20 bg-white rounded-2xl p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100">
                    <div class="flex flex-col md:flex-row items-start md:items-center justify-between border-b-2 border-gold-light pb-4 mb-6 gap-5">
                        <div class="flex items-center gap-5">
                            <div class="bg-gold text-dark-green py-1.5 px-5 rounded font-extrabold text-lg md:text-xl shadow-md">SET ${set.id}</div>
                            <div>
                                <h2 class="font-manorah text-dark-green text-3xl md:text-4xl font-bold">${set.name[currentLang].replace(': ', ':<br>').replace(' — ', '<br>').replace(' - ', '<br>')}</h2>
                                <p class="text-gray-600 text-sm md:text-base leading-relaxed mt-1 max-w-[600px]">${set.desc[currentLang]}</p>
                            </div>
                        </div>
                        <div class="text-left md:text-right mt-2 md:mt-0">
                            <div class="text-3xl font-extrabold text-dark-green">£${set.price}</div>
                            <div class="text-sm text-gray-500 font-semibold mt-1">${priceLabel} (${set.unit[currentLang]})</div>
                            <div class="text-xs text-gold mt-0.5">${excludeLabel}</div>
                            <button onclick="event.preventDefault(); openSetModal(${set.id});" class="inline-block mt-3 bg-dark-green text-gold border-2 border-gold px-5 py-2 rounded-full font-bold text-sm no-underline transition-all duration-300 hover:bg-gold hover:text-dark-green shadow-md cursor-pointer">
                                <i class="fas fa-shopping-cart mr-1"></i> ${currentLang === 'th' ? 'เพิ่มลงตะกร้า' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>
                    
                    <div class="swiper item-swiper swiper-set-${set.id} w-full pb-10">
                        <div class="swiper-wrapper">
                            ${slidesHtml}
                        </div>
                        <div class="swiper-pagination"></div>
                        <div class="swiper-button-next !text-gold scale-75 after:font-extrabold"></div>
                        <div class="swiper-button-prev !text-gold scale-75 after:font-extrabold"></div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;

        // Initialize Swipers for each set
        menuSets.forEach(set => {
            new Swiper(".swiper-set-" + set.id, {
                slidesPerView: 1,
                spaceBetween: 20,
                breakpoints: {
                    640: { slidesPerView: 2 },
                    900: { slidesPerView: 3 },
                    1100: { slidesPerView: 4 }
                },
                pagination: {
                    el: ".swiper-set-" + set.id + " .swiper-pagination",
                    clickable: true,
                },
                navigation: {
                    nextEl: ".swiper-set-" + set.id + " .swiper-button-next",
                    prevEl: ".swiper-set-" + set.id + " .swiper-button-prev",
                },
            });
        });
    }

    function changeLang(lang, btn) {
        currentLang = lang;
        document.documentElement.lang = lang;
        
        // Update Buttons
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update Static Content
        const t = {
            th: {
                hero_title: "รายการสำรับอาหาร", 
                hero_subtitle: "ยกระดับงานเลี้ยงของคุณด้วยรสชาติไทยแท้ระดับพรีเมียม",
                hero_desc: "สูตรพรีเมียมมาตรฐานสำหรับ 5 ท่าน (ราคายังไม่รวมภาษี อุปกรณ์ และบริการ)",
                services_title: "✨ บริการของเรา",
                services_desc: "ไม่ว่าจะเป็นงานปาร์ตี้ส่วนตัว งานเลี้ยงบริษัท หรืองานอีเว้นท์สำคัญ ครัวไทย พร้อมเนรมิตสำรับไทยที่จัดจ้านและประณีต ส่งตรงถึงสถานที่ของคุณในลอนดอนและพื้นที่ใกล้เคียง"
            },
            en: {
                hero_title: "Thai Set Menus", 
                hero_subtitle: "Elevate your event with authentic, premium Thai flavors.",
                hero_desc: "Premium Standard for 5 Persons (Excluding Tax, Equipment, and Service)",
                services_title: "✨ Our Services",
                services_desc: "Whether it's a private party, corporate event, or a special celebration, Khrua Thai London is ready to create exquisite and authentic Thai sets, delivered directly to your venue in London and surrounding areas."
            }
        }[lang];

                document.getElementById('hero-title').innerText = t.hero_title;
        document.getElementById('hero-subtitle').innerText = t.hero_subtitle;
        document.getElementById('hero-desc').innerText = t.hero_desc;
        document.getElementById('services-title').innerText = t.services_title;
        document.getElementById('services-desc').innerText = t.services_desc;
        const lblIng = document.getElementById('lbl-ingredients-text');
        if(lblIng) lblIng.innerText = lang === 'th' ? 'วัตถุดิบหลัก / Main Ingredients' : 'Main Ingredients / Details';

        renderMenu();
    }

    function openItemModal(setId, itemIndex) {
        const set = menuSets.find(s => s.id == setId);
        if (!set) return;
        const item = set.items[itemIndex];
        if (!item) return;

        const imgSrc = item.img === 'logo.png' ? 'logo.png' : (item.img.startsWith('http') ? item.img : `images/${item.img}`);
        document.getElementById('modal-img').src = imgSrc;
        document.getElementById('modal-title').innerText = item.th;
        document.getElementById('modal-en-title').innerText = item.en;
        
        const ingList = document.getElementById('modal-ingredients');
        
        const mockIngredients = {
            th: ['วัตถุดิบหลักคัดพิเศษเกรดพรีเมียม', 'สมุนไพรไทยและเครื่องเทศสดใหม่', 'ปรุงรสด้วยสูตรต้นตำรับเฉพาะของร้าน'],
            en: ['Premium grade selected ingredients', 'Fresh authentic Thai herbs and spices', 'Seasoned with our secret original recipe']
        };
        
        let ingredientsHTML = '';
        if (item.ingredients) {
            const ingData = item.ingredients[currentLang] || [];
            ingredientsHTML = ingData.map(i => `<li class="mb-2 pl-5 relative text-gray-700 leading-relaxed before:content-['•'] before:text-gold before:font-bold before:absolute before:left-0">${i}</li>`).join('');
        } else {
            const placeholder = mockIngredients[currentLang];
            ingredientsHTML = placeholder.map(i => `<li class="mb-2 pl-5 relative text-gray-700 leading-relaxed before:content-['•'] before:text-gold before:font-bold before:absolute before:left-0">${i}</li>`).join('');
        }
        
        ingList.innerHTML = ingredientsHTML;

        document.getElementById('comp-modal').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    
    function increaseModalQty() {
        const input = document.getElementById('modal-qty-input');
        input.value = parseInt(input.value) + 1;
    }
    function decreaseModalQty() {
        const input = document.getElementById('modal-qty-input');
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
        }
    }

    function openSetModal(setId) {
        const set = menuSets.find(s => s.id == setId);
        if (!set) return;

        document.getElementById('modal-qty-input').value = 1;
        document.getElementById('modal-img').src = 'images/' + set.img;
        document.getElementById('modal-title').innerHTML = set.name[currentLang].replace(': ', ':<br>').replace(' - ', '<br>');
        document.getElementById('modal-en-title').innerText = `${set.name.en} - £${set.price} (${set.unit.en})`;
        
        document.getElementById('modal-ingredients').innerHTML = '<li class="mb-2 pl-5 relative text-gray-700 leading-relaxed before:content-[\'•\'] before:text-gold before:font-bold before:absolute before:left-0">' + set.desc[currentLang] + '</li>';

        const modalCustomize = document.getElementById('modal-customize');
        const modalCustomOptions = document.getElementById('modal-custom-options');
        const modalBookBtn = document.getElementById('modal-book-btn');

        if (set.options && set.options.length > 0) {
            modalCustomize.style.display = 'block';
            modalCustomOptions.innerHTML = '';
            set.options.forEach(opt => {
                const wrapper = document.createElement('div');
                let selectHtml = `
                    <div style="font-weight:bold; margin-bottom:5px; color:var(--dark-green);">${opt.label[currentLang]}</div>
                    <select class="modal-opt-select" data-id="${opt.id}" style="width:100%; padding:12px; border:2px solid #ddd; border-radius:10px; font-family:'Prompt'; font-size:0.95rem; color:var(--dark-green); background:white; cursor:pointer;" required>
                `;
                opt.choices.forEach(c => {
                    selectHtml += `<option value="${c.en}" data-extra="${c.extra || 0}">${c[currentLang]}</option>`;
                });
                selectHtml += '</select>';
                wrapper.innerHTML = selectHtml;
                modalCustomOptions.appendChild(wrapper);
            });

            modalBookBtn.onclick = function(e) {
                e.preventDefault();
                const selects = modalCustomOptions.querySelectorAll('select');
                let allSelected = true;
                const qty = parseInt(document.getElementById('modal-qty-input').value) || 1;
                
                let customChoicesArr = [];
                let extraTotal = 0;

                selects.forEach(sel => {
                    if (!sel.value) allSelected = false;
                    const optId = sel.getAttribute('data-id');
                    const selectedOpt = sel.options[sel.selectedIndex];
                    const choiceText = selectedOpt.text;
                    const extra = parseFloat(selectedOpt.getAttribute('data-extra')) || 0;
                    
                    customChoicesArr.push(choiceText);
                    extraTotal += extra;
                });

                if (!allSelected) {
                    alert(currentLang === 'th' ? 'กรุณาเลือกตัวเลือกให้ครบ' : 'Please select all options');
                    return;
                }

                try {
                    addToCart({
                        id: 'authentic-' + set.id,
                        name_th: set.name && set.name.th ? set.name.th : set.name_th,
                        name_en: set.name && set.name.en ? set.name.en : set.name_en,
                        price: parseFloat(set.price) + extraTotal,
                        qty: qty,
                        category: 'Authentic',
                        unit_th: (set.unit && set.unit.th) ? set.unit.th : '5 ท่าน',
                        unit_en: (set.unit && set.unit.en) ? set.unit.en : '5 Persons',
                        options: customChoicesArr
                    });
                    closeModal();
                } catch(err) {
                    alert('Error: ' + err.message);
                }
            };
        } else {
            modalCustomize.style.display = 'none';
            modalCustomOptions.innerHTML = '';
            modalBookBtn.onclick = function(e) {
                e.preventDefault();
                const qty = parseInt(document.getElementById('modal-qty-input').value) || 1;
                try {
                    addToCart({
                        id: 'authentic-' + set.id,
                        name_th: set.name && set.name.th ? set.name.th : set.name_th,
                        name_en: set.name && set.name.en ? set.name.en : set.name_en,
                        price: parseFloat(set.price),
                        qty: qty,
                        category: 'Authentic',
                        unit_th: (set.unit && set.unit.th) ? set.unit.th : '5 ท่าน',
                        unit_en: (set.unit && set.unit.en) ? set.unit.en : '5 Persons'
                    });
                    closeModal();
                } catch(err) {
                    alert('Error: ' + err.message);
                }
            };
        }

        document.getElementById('comp-modal').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        document.getElementById('comp-modal').style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    window.onclick = function(event) {
        if (event.target == document.getElementById('comp-modal')) closeModal();
    }

    loadMenuData();
