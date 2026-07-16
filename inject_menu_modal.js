const fs = require('fs');

let html = fs.readFileSync('public/menu.html', 'utf8');

// 1. Update the Add to Cart button in renderMenu()
html = html.replace(
    /<button onclick="event.preventDefault\(\); try \{ addToCart\(\{[\s\S]*?\}\); \} catch\(err\) \{ alert\('Error: ' \+ err.message\); \}" class="([^"]+)">/g,
    '<button onclick="event.preventDefault(); openSetModal(${set.id});" class="$1">'
);

// 2. Inject Customization HTML into comp-modal
const customizeHTML = `
            <!-- Dynamic Customization Options -->
            <div id="modal-customize" style="display:none; margin-top:20px; background:rgba(27,48,34,0.06); padding:20px; border-radius:15px; border:2px solid var(--dark-green);">
                <h4 class="text-dark-green text-lg mb-3 flex items-center gap-2 border-b border-dark-green/20 pb-2">
                    <i class="fas fa-list-check text-gold"></i>
                    <span id="modal-custom-title">เลือกเมนูคละกันได้ / Customize Your Menu</span>
                </h4>
                <div id="modal-custom-options" style="display:grid; gap:12px;"></div>
                
                <div id="modal-qty-section" style="margin-top:20px; text-align:center; display:flex; justify-content:center; align-items:center;">
                    <div style="background:white; border:2px solid var(--gold); border-radius:30px; display:inline-flex; align-items:center; overflow:hidden;">
                        <button type="button" onclick="decreaseModalQty()" style="border:none; background:var(--cream); color:var(--dark-green); width:40px; height:40px; font-weight:bold; font-size:1.2rem; cursor:pointer;">-</button>
                        <input type="text" id="modal-qty-input" value="1" readonly style="width:50px; text-align:center; border:none; font-weight:bold; font-size:1.1rem; color:var(--dark-green); pointer-events:none; background:transparent;">
                        <button type="button" onclick="increaseModalQty()" style="border:none; background:var(--cream); color:var(--dark-green); width:40px; height:40px; font-weight:bold; font-size:1.2rem; cursor:pointer;">+</button>
                    </div>
                </div>

                <div id="modal-book-section" style="margin-top:20px; text-align:center;">
                    <a id="modal-book-btn" href="#" style="display:inline-block; background:var(--dark-green); color:var(--gold); border:2px solid var(--gold); padding:12px 35px; border-radius:30px; font-weight:700; font-size:1rem; text-decoration:none; transition:0.3s; box-shadow:0 6px 15px rgba(0,0,0,0.2);" onmouseover="this.style.background='var(--gold)';this.style.color='var(--dark-green)';" onmouseout="this.style.background='var(--dark-green)';this.style.color='var(--gold)';">
                        <i class="fas fa-cart-plus"></i> <span id="modal-book-text">เพิ่มลงตะกร้า / Add to Cart</span>
                    </a>
                </div>
            </div>
`;

// Insert after the allergy notice in the modal
html = html.replace(
    /<\/div>\s*<\/div>\s*<\/div>\s*<!-- 14-Day Advance Booking Popup -->/,
    `</div>\n${customizeHTML}\n        </div>\n</div>\n\n<!-- 14-Day Advance Booking Popup -->`
);

// 3. Add JS functions for openSetModal
const jsLogic = `
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
        document.getElementById('modal-en-title').innerText = \`\${set.name.en} - £\${set.price} (\${set.unit.en})\`;
        
        document.getElementById('modal-ingredients').innerHTML = '<li class="mb-2 pl-5 relative text-gray-700 leading-relaxed before:content-[\\'•\\'] before:text-gold before:font-bold before:absolute before:left-0">' + set.desc[currentLang] + '</li>';

        const modalCustomize = document.getElementById('modal-customize');
        const modalCustomOptions = document.getElementById('modal-custom-options');
        const modalBookBtn = document.getElementById('modal-book-btn');

        if (set.options && set.options.length > 0) {
            modalCustomize.style.display = 'block';
            modalCustomOptions.innerHTML = '';
            set.options.forEach(opt => {
                const wrapper = document.createElement('div');
                let selectHtml = \`
                    <div style="font-weight:bold; margin-bottom:5px; color:var(--dark-green);">\${opt.label[currentLang]}</div>
                    <select class="modal-opt-select" data-id="\${opt.id}" style="width:100%; padding:12px; border:2px solid #ddd; border-radius:10px; font-family:'Prompt'; font-size:0.95rem; color:var(--dark-green); background:white; cursor:pointer;" required>
                \`;
                opt.choices.forEach(c => {
                    selectHtml += \`<option value="\${c.en}" data-extra="\${c.extra || 0}">\${c[currentLang]}</option>\`;
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
                    
                    customChoicesArr.push({
                        option_id: optId,
                        choice: choiceText,
                        extra: extra
                    });
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
`;

html = html.replace('function closeModal() {', jsLogic + '\n    function closeModal() {');

fs.writeFileSync('public/menu.html', html, 'utf8');
console.log("Injected modal Customization UI and logic successfully.");
