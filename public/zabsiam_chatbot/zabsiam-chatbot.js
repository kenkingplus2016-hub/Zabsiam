(function(){
    const C = Object.assign({
        brandName: 'Zab Siam',
        assistantName: 'Siam Assistant',
        contactEmail: 'info@zabsiam.com',
        bookingUrl: '#booking',
        accent: '#8f1d24',
        gold: '#b38a43',
        position: 'right',
        apiEndpoint: '',
        welcomeMessage: 'สวัสดีค่ะ ยินดีต้อนรับสู่ Zab Siam 🌶️ และ Chor Malee 🌸 ต้องการดูเมนู หรือจองแพ็กเกจจัดเลี้ยงดีคะ?'
    }, window.ZABSIAM_CHATBOT_CONFIG || {});

    // Chatbot UI CSS
    const st = document.createElement('style');
    st.textContent = `
        #zs-chat-root { position: fixed; bottom: 20px; ${C.position}: 20px; z-index: 2147483000; font-family: 'Prompt', sans-serif; color: #333; }
        .zs-launch { width: 62px; height: 62px; border-radius: 50%; border: 0; background: ${C.accent}; color: #fff; font-size: 26px; cursor: pointer; box-shadow: 0 10px 30px rgba(143, 29, 36, 0.4); transition: transform 0.3s; display: flex; align-items: center; justify-content: center; }
        .zs-launch:hover { transform: scale(1.08); }
        .zs-panel { display: none; width: min(380px, calc(100vw - 28px)); height: min(650px, calc(100vh - 110px)); background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 15px 40px rgba(0,0,0,0.25); margin-bottom: 12px; border: 1px solid #eadfce; flex-direction: column; }
        .zs-panel.open { display: flex; animation: zs-slideUp 0.3s ease-out; }
        @keyframes zs-slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .zs-head { background: linear-gradient(135deg, ${C.accent}, #6a1318); color: #fff; padding: 18px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid ${C.gold}; }
        .zs-head div { display: flex; flex-direction: column; }
        .zs-head strong { font-family: 'Playfair Display', serif; font-size: 19px; font-weight: 700; letter-spacing: 0.5px; }
        .zs-head small { font-size: 13px; opacity: 0.9; margin-top: 2px; }
        .zs-close { border: 0; background: transparent; color: #fff; font-size: 28px; cursor: pointer; line-height: 1; opacity: 0.8; transition: opacity 0.2s; padding: 0; margin-top: -5px; }
        .zs-close:hover { opacity: 1; }
        .zs-messages { flex: 1; overflow-y: auto; padding: 20px 16px; background: #faf8f5; display: flex; flex-direction: column; gap: 14px; scroll-behavior: smooth; }
        .zs-msg { max-width: 85%; padding: 12px 16px; border-radius: 16px; font-size: 14px; line-height: 1.5; word-wrap: break-word; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
        .zs-bot { background: #fff; border: 1px solid #eadfce; border-bottom-left-radius: 4px; color: #333; align-self: flex-start; }
        .zs-user { background: ${C.accent}; color: #fff; border-bottom-right-radius: 4px; align-self: flex-end; }
        
        /* Card UI */
        .zs-card-container { display: flex; flex-direction: column; gap: 12px; margin-top: 4px; width: 100%; align-self: flex-start; max-width: 90%; }
        .zs-card { background: #fff; border: 1px solid #eadfce; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.06); width: 100%; display: flex; flex-direction: column; cursor: pointer; transition: transform 0.2s, border-color 0.2s; }
        .zs-card:hover { transform: translateY(-3px); border-color: ${C.gold}; }
        .zs-card img { width: 100%; height: 140px; object-fit: cover; border-bottom: 1px solid #f5f5f5; }
        .zs-card-body { padding: 12px 14px; }
        .zs-card-title { font-weight: bold; font-size: 15px; color: ${C.accent}; margin-bottom: 4px; }
        .zs-card-desc { font-size: 13px; color: #666; line-height: 1.4; }
        .zs-card-btn { background: #fdfdfd; color: ${C.gold}; border-top: 1px solid #f0f0f0; text-align: center; padding: 10px; font-size: 13px; font-weight: bold; transition: all 0.2s; }
        .zs-card:hover .zs-card-btn { background: ${C.gold}; color: #fff; }

        .zs-quick { display: flex; gap: 8px; flex-wrap: wrap; padding: 12px 16px; background: #faf8f5; border-top: 1px dashed #eadfce; }
        .zs-chip { border: 1px solid ${C.gold}; background: #fff; border-radius: 999px; padding: 8px 14px; font-size: 13px; cursor: pointer; color: #444; font-weight: 500; transition: all 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.03); }
        .zs-chip:hover { background: ${C.gold}; color: #fff; border-color: ${C.gold}; }
        .zs-form { display: flex; gap: 10px; padding: 14px; border-top: 1px solid #eadfce; background: #fff; }
        .zs-input { flex: 1; border: 1px solid #d8cbb8; border-radius: 999px; padding: 12px 16px; color: #333; background: #fdfdfd; font-size: 14px; outline: none; transition: border-color 0.2s; }
        .zs-input:focus { border-color: ${C.gold}; box-shadow: 0 0 0 2px rgba(179, 138, 67, 0.15); }
        .zs-send { border: 0; border-radius: 999px; background: ${C.gold}; color: #fff; padding: 0 18px; font-weight: bold; cursor: pointer; transition: background 0.2s; font-size: 14px; }
        .zs-send:hover { background: #9e783a; }
        .zs-link { color: ${C.accent}; font-weight: bold; text-decoration: underline; }
        .zs-typing { opacity: 0.65; font-style: italic; }
        @media(max-width: 520px){ #zs-chat-root{left: 14px; right: 14px; bottom: 14px; } .zs-panel{width: 100%; height: calc(100svh - 90px);} .zs-launch{float: right;} }
    `;
    document.head.appendChild(st);

    // Build DOM
    const root = document.createElement('div');
    root.id = 'zs-chat-root';
    root.innerHTML = `
        <div class="zs-panel">
            <div class="zs-head">
                <div>
                    <strong>${C.assistantName}</strong>
                    <small>${C.brandName} Event Catering</small>
                </div>
                <button class="zs-close">&times;</button>
            </div>
            <div class="zs-messages"></div>
            <div class="zs-quick">
                <button class="zs-chip">ดูเมนูอาหารคาว</button>
                <button class="zs-chip">ดูเมนูของหวาน</button>
                <button class="zs-chip">แพ็กเกจจัดเลี้ยง</button>
                <button class="zs-chip">ติดต่อเรา</button>
            </div>
            <form class="zs-form">
                <input class="zs-input" placeholder="พิมพ์คำถามของคุณ..." autocomplete="off">
                <button class="zs-send" type="submit">ส่ง</button>
            </form>
        </div>
        <button class="zs-launch" aria-label="Open Chat">
            <i class="fas fa-comment-dots"></i>
        </button>
    `;
    document.body.appendChild(root);

    // FontAwesome fallback if not loaded
    if (!document.querySelector('link[href*="font-awesome"]')) {
        root.querySelector('.zs-launch').textContent = '💬';
    }

    const p = root.querySelector('.zs-panel'), 
          m = root.querySelector('.zs-messages'), 
          i = root.querySelector('.zs-input');

    // Utility
    const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));

    function addMessage(html, type) {
        const e = document.createElement('div');
        e.className = 'zs-msg zs-' + type;
        e.innerHTML = html;
        m.appendChild(e);
        setTimeout(() => m.scrollTop = m.scrollHeight, 10);
        return e;
    }

    function addCards(cardsData) {
        const container = document.createElement('div');
        container.className = 'zs-card-container';
        
        cardsData.forEach(c => {
            const card = document.createElement('div');
            card.className = 'zs-card';
            card.innerHTML = `
                <img src="${c.img}" alt="${c.title}">
                <div class="zs-card-body">
                    <div class="zs-card-title">${c.title}</div>
                    <div class="zs-card-desc">${c.desc}</div>
                </div>
                <div class="zs-card-btn">${c.btnText || 'ดูรายละเอียด'}</div>
            `;
            card.onclick = () => {
                if (c.action === 'send') send(c.title);
                else if (c.link) {
                    window.location.href = c.link;
                    p.classList.remove('open'); // Close chat when navigating
                }
            };
            container.appendChild(card);
        });
        m.appendChild(container);
        setTimeout(() => m.scrollTop = m.scrollHeight, 10);
    }

    // Logic
    function localLogic(raw) {
        const q = raw.toLowerCase().trim();
        
        if (/street|สตรีท|อาหารคาว|คาว|หมูปิ้ง|เมี่ยงคำ|คอหมู|ไส้อั่ว/.test(q) || raw === 'ดูเมนูอาหารคาว') {
            addMessage('นี่คือตัวอย่างเมนู <strong>Zab Siam Street Food</strong> สำหรับคุณค่ะ:', 'bot');
            addCards([
                { img: 'images/miang_kham_duo.jpg', title: 'Miang Kham Duo', desc: 'เมี่ยงคำ 2 รสชาติ (กุ้งกรอบและปลากะพง)', btnText: 'คลิกเพื่อสั่ง', link: '#zabsiam-street-food' },
                { img: 'images/mini_moo_ping_on_khao_jee.jpg', title: 'Mini Moo Ping on Khao Jee', desc: 'หมูปิ้งนุ่มๆ เสิร์ฟพร้อมข้าวจี่แสนอร่อย', btnText: 'คลิกเพื่อสั่ง', link: '#zabsiam-street-food' },
                { img: 'images/sai_ua_nam_prik_noom.jpg', title: 'Sai Ua & Nam Prik Noom', desc: 'ไส้อั่วโฮมเมด และน้ำพริกหนุ่มสูตรเด็ด', btnText: 'คลิกเพื่อสั่ง', link: '#zabsiam-street-food' }
            ]);
            return null;
        }
        
        if (/chor malee|ช่อมาลี|ของหวาน|dessert|หวาน|ขนม|ช่อม่วง|ลืมกลืน/.test(q) || raw === 'ดูเมนูของหวาน') {
            addMessage('<strong>Thai Desserts (Chor Malee)</strong> 🌸 ขนมไทยสูตรประณีตและพรีเมียม:', 'bot');
            addCards([
                { img: 'images/chor_muang_pack.jpeg', title: 'Chor Muang', desc: 'ช่อม่วงนุ่มละมุน ไส้ไก่เข้มข้น', btnText: 'สั่งเลย', link: '#menu' },
                { img: 'images/khanom_luem_kleun_pack.jpeg', title: 'Khanom Luem Kleun', desc: 'ขนมลืมกลืน หอมหวานละลายในปาก', btnText: 'สั่งเลย', link: '#menu' },
                { img: 'images/luk_chup_fruit.jpg', title: 'Luk Chup', desc: 'ลูกชุบผลไม้จิ๋ว สีสันสวยงาม', btnText: 'สั่งเลย', link: '#menu' }
            ]);
            return null;
        }

        if (/แพ็กเกจจัดเลี้ยง|catering|package|จัดเลี้ยง|แพ็กเกจ/.test(q)) {
            addMessage('เรามีแพ็กเกจจัดเลี้ยง 3 รูปแบบให้เลือกตามจำนวนแขกค่ะ:', 'bot');
            addCards([
                { img: 'images/category_fine_dining.jpg', title: 'Package 1: SIAM CLASSIC', desc: 'สำหรับ 7-8 ท่าน ราคาเริ่มต้น £500', action: 'send', btnText: 'ดูข้อมูล Package 1' },
                { img: 'images/category_canapes.jpg', title: 'Package 2: SIGNATURE', desc: 'สำหรับ 9-12 ท่าน ราคาเริ่มต้น £900', action: 'send', btnText: 'ดูข้อมูล Package 2' },
                { img: 'images/category_buffet.jpg', title: 'Package 3: CELEBRATION', desc: 'สำหรับ 13-15 ท่าน ราคาเริ่มต้น £1,050', action: 'send', btnText: 'ดูข้อมูล Package 3' }
            ]);
            return null;
        }

        if (/package\s*1|แพ็กเกจ\s*1|siam classic/.test(q)) return '<strong>SIAM CLASSIC (Package 1)</strong><br>• สำหรับ 7-8 ท่าน<br>• ราคาเริ่มต้น £500<br>• เมนู: Starter 2, Main 2, ข้าว/เส้น 2, ผัก 1<br><br><a class="zs-link" href="/event-catering#booking">เริ่มจองงาน</a>';
        if (/package\s*2|แพ็กเกจ\s*2|signature/.test(q)) return '<strong>ZAB SIAM SIGNATURE (Package 2)</strong><br>• สำหรับ 9-12 ท่าน<br>• ราคาเริ่มต้น £900<br>• เมนู: Starter 2, Main 3, ข้าว/เส้น 2, ผัก 2<br><br><a class="zs-link" href="/event-catering#booking">เริ่มจองงาน</a>';
        if (/package\s*3|แพ็กเกจ\s*3|celebration/.test(q)) return '<strong>ZAB SIAM CELEBRATION (Package 3)</strong><br>• สำหรับ 13-15 ท่าน<br>• ราคาเริ่มต้น £1,050<br>• เมนู: Starter 3, Main 3, ข้าว/เส้น 3, ผัก 2<br><br><a class="zs-link" href="/event-catering#booking">เริ่มจองงาน</a>';
        if (/ราคา|price|cost|เท่าไหร่/.test(q)) return 'ราคาเริ่มต้น:<br>• แพ็กเกจจัดเลี้ยง: £500 - £1,050+<br>• อาหารคาวและหวาน: £9 - £35+<br>สอบถามราคาแบบเป๊ะๆ ทักหาแอดมินได้เลยค่ะ';
        if (/ติดต่อ|แอดมิน|contact/.test(q)) return `สามารถติดต่อทีมงานได้ที่:<br>อีเมล: <a class="zs-link" href="mailto:${C.contactEmail}">${C.contactEmail}</a><br>หรือกรอกฟอร์มในหน้า Contact ค่ะ`;
        if (/สวัสดี|hello|hi|hey/.test(q)) return 'สวัสดีค่ะ 😊 ต้องการให้เราดูแลเรื่องอาหารมื้อพิเศษของคุณแบบไหนดีคะ? พิมพ์ถาม หรือกดเลือกจากเมนูด้านล่างได้เลยค่ะ';
        
        return `ขออภัยค่ะ ฉันยังไม่เข้าใจ ลองคลิกเลือกจากเมนูด้านล่าง หรือพิมพ์คำว่า "อาหารคาว", "ของหวาน" หรือ "จัดเลี้ยง" ดูนะคะ<br><br><a class="zs-link" href="mailto:${C.contactEmail}">ติดต่อแอดมิน</a>`;
    }

    async function send(t) {
        if (!t.trim()) return;
        addMessage(esc(t), 'user');
        
        const typing = addMessage('<span class="zs-typing">กำลังพิมพ์...</span>', 'bot');
        
        // Fake latency for realistic feel
        await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
        
        typing.remove();
        const response = localLogic(t);
        if (response !== null) {
            addMessage(response, 'bot');
        }
    }

    // Events
    root.querySelector('.zs-launch').onclick = () => {
        p.classList.toggle('open');
        if (p.classList.contains('open')) i.focus();
    };
    root.querySelector('.zs-close').onclick = () => p.classList.remove('open');
    root.querySelector('.zs-form').onsubmit = e => {
        e.preventDefault();
        const t = i.value;
        i.value = '';
        send(t);
    };
    root.querySelectorAll('.zs-chip').forEach(b => {
        b.onclick = () => send(b.textContent);
    });

    // Init welcome message
    setTimeout(() => {
        addMessage(C.welcomeMessage, 'bot');
    }, 500);

})();
