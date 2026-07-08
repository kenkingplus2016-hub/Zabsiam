const fs = require('fs');
const path = require('path');

const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/booking.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Replace UI sections
const oldUIStart = '<label id="t-menu-select" style="color:var(--dark-green); font-weight:600; display:block; margin-bottom:10px;">เลือกชุดเมนู (ราคายังไม่รวมภาษีและบริการ) / Select Menu Set (Excl. Tax & Service)</label>';
const oldUIEnd = '<!-- Payment Method -->';

const startIndex = content.indexOf(oldUIStart);
const endIndex = content.indexOf(oldUIEnd);

if (startIndex !== -1 && endIndex !== -1) {
    const newUI = `
            <div id="cart-summary-container" style="background:#fff; border:1.5px solid var(--gold); border-radius:12px; padding:20px; margin-bottom:20px;">
                <h3 style="color:var(--dark-green); font-weight:bold; font-size:1.2rem; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px;">
                    <i class="fas fa-shopping-cart" style="color:var(--gold); margin-right:8px;"></i> 
                    <span id="lbl-cart-title">ตะกร้าสินค้า / Your Cart</span>
                </h3>
                <div id="cart-items-list">
                    <!-- Cart items will be rendered here -->
                </div>
                
                <div style="margin-top:20px; padding-top:15px; border-top:2px dashed var(--gold);">
                    <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                        <span id="lbl-total-classic" style="color:#666;">ยอดเต็มจำนวน (กล่อง/ของหวาน):</span>
                        <span style="font-weight:bold;">£<span id="cart-classic-price">0.00</span></span>
                    </div>
                    <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                        <span id="lbl-total-catering" style="color:#666;">ยอดมัดจำ 50% (จัดเลี้ยง):</span>
                        <span style="font-weight:bold; color:var(--dark-green);">£<span id="cart-catering-deposit">0.00</span></span>
                    </div>
                    <div style="display:flex; justify-content:space-between; margin-top:10px; padding-top:10px; border-top:1px solid #eee;">
                        <span id="lbl-amount-to-pay" style="color:var(--dark-green); font-weight:bold; font-size:1.1rem;">ยอดชำระเบื้องต้น / Amount to Pay Now:</span>
                        <span style="color:red; font-weight:bold; font-size:1.3rem;">£<span id="cart-total-to-pay">0.00</span></span>
                    </div>
                </div>
            </div>
            
            `;
    content = content.substring(0, startIndex) + newUI + content.substring(endIndex);
}

// 2. Replace JS logic
const scriptStart = 'let currentLang = \'th\';';
const scriptEnd = 'document.getElementById(\'t-connect\').innerText = t.connect;';

const sIndex = content.indexOf(scriptStart);
const eIndex = content.indexOf(scriptEnd);

if (sIndex !== -1 && eIndex !== -1) {
    const newJS = `
    let currentLang = 'th';
    let selectedPaymentMethod = 'PromptPay';
    let finalAmountToPay = 0;
    let totalItemsCount = 0;
    
    function renderCartSummary() {
        const cart = getCart();
        const container = document.getElementById('cart-items-list');
        
        if (cart.length === 0) {
            container.innerHTML = \`<div style="text-align:center; padding:30px; color:#999;">
                <i class="fas fa-box-open" style="font-size:3rem; margin-bottom:15px; color:var(--gold);"></i><br>
                \${currentLang === 'th' ? 'ไม่มีสินค้าในตะกร้า' : 'Your cart is empty'}
            </div>\`;
            document.getElementById('cart-classic-price').innerText = "0.00";
            document.getElementById('cart-catering-deposit').innerText = "0.00";
            document.getElementById('cart-total-to-pay').innerText = "0.00";
            document.getElementById('btn-submit').disabled = true;
            return;
        }
        
        document.getElementById('btn-submit').disabled = false;
        
        let html = '';
        let classicTotal = 0;
        let cateringTotal = 0;
        totalItemsCount = 0;
        
        cart.forEach((item, index) => {
            const isCatering = item.category === 'Authentic';
            const itemTotal = item.price * item.qty;
            
            if (isCatering) {
                cateringTotal += itemTotal;
            } else {
                classicTotal += itemTotal;
            }
            
            totalItemsCount += item.qty;
            
            let optionsHtml = '';
            if (item.options && item.options.length > 0) {
                optionsHtml = \`<div style="font-size:0.85rem; color:#666; margin-top:4px;">
                    <i class="fas fa-utensils" style="color:var(--gold); font-size:0.75rem;"></i> \${item.options.join(', ')}
                </div>\`;
            }
            
            html += \`
                <div style="display:flex; justify-content:space-between; align-items:flex-start; padding:12px 0; border-bottom:1px solid #f0f0f0;">
                    <div style="flex:1; padding-right:10px;">
                        <div style="font-weight:bold; color:var(--dark-green); font-size:1.05rem;">
                            \${currentLang === 'th' ? item.name_th : item.name_en}
                        </div>
                        <div style="font-size:0.85rem; color:#888;">
                            £\${item.price.toFixed(2)} / \${currentLang === 'th' ? item.unit_th : item.unit_en}
                            <span style="display:inline-block; margin-left:8px; padding:2px 6px; background:\${isCatering ? 'rgba(212,175,55,0.2)' : '#e8f5e9'}; color:\${isCatering ? '#b08d00' : '#2e7d32'}; border-radius:10px; font-size:0.75rem; font-weight:bold;">
                                \${isCatering ? (currentLang === 'th' ? 'มัดจำ 50%' : '50% Deposit') : (currentLang === 'th' ? 'ชำระเต็มจำนวน' : 'Full Payment')}
                            </span>
                        </div>
                        \${optionsHtml}
                        
                        <div style="display:flex; align-items:center; margin-top:8px; border:1.5px solid #eee; border-radius:8px; width:fit-content; background:#fafafa;">
                            <button type="button" onclick="changeQty(\${index}, -1)" style="border:none; background:transparent; width:30px; height:30px; font-weight:bold; color:var(--dark-green); cursor:pointer;">-</button>
                            <span style="font-weight:bold; width:30px; text-align:center; font-size:0.95rem;">\${item.qty}</span>
                            <button type="button" onclick="changeQty(\${index}, 1)" style="border:none; background:transparent; width:30px; height:30px; font-weight:bold; color:var(--dark-green); cursor:pointer;">+</button>
                        </div>
                    </div>
                    
                    <div style="text-align:right; display:flex; flex-direction:column; justify-content:space-between; height:100%;">
                        <div style="font-weight:bold; color:var(--dark-green); font-size:1.1rem; margin-bottom:15px;">
                            £\${itemTotal.toFixed(2)}
                        </div>
                        <button type="button" onclick="removeItem(\${index})" style="border:none; background:transparent; color:#ff3b30; cursor:pointer; font-size:0.85rem; text-decoration:underline; text-align:right;">
                            \${currentLang === 'th' ? 'ลบรายการ' : 'Remove'}
                        </button>
                    </div>
                </div>
            \`;
        });
        
        container.innerHTML = html;
        
        const cateringDeposit = cateringTotal / 2;
        finalAmountToPay = classicTotal + cateringDeposit;
        
        document.getElementById('cart-classic-price').innerText = classicTotal.toFixed(2);
        document.getElementById('cart-catering-deposit').innerText = cateringDeposit.toFixed(2);
        document.getElementById('cart-total-to-pay').innerText = finalAmountToPay.toFixed(2);
    }
    
    window.changeQty = function(index, delta) {
        let cart = getCart();
        if (cart[index]) {
            let newQty = cart[index].qty + delta;
            if (newQty < 1) newQty = 1;
            updateCartQty(index, newQty);
            renderCartSummary();
        }
    };
    
    window.removeItem = function(index) {
        removeFromCart(index);
        renderCartSummary();
    };

    function selectPay(el, method) {
        document.querySelectorAll('.pay-option').forEach(opt => opt.classList.remove('active'));
        el.classList.add('active');
        selectedPaymentMethod = method;
    }

    async function submitBooking() {
        const cart = getCart();
        if (cart.length === 0) return;
        
        const custName = document.getElementById('custName').value;
        const custPhone = document.getElementById('custPhone').value;
        const custEmail = document.getElementById('custEmail').value;
        const eventDate = document.getElementById('eventDate').value;
        const eventTime = document.getElementById('eventTime').value;
        const eventPlace = document.getElementById('eventPlace').value;
        const custAddress = document.getElementById('custAddress').value;

        if (!custName || !custPhone || !custEmail || !eventDate || !eventTime || !eventPlace || !custAddress) {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน / Please fill in all required fields.");
            return;
        }

        // Format cart into a readable string for the backend/LINE
        let menuSetStr = cart.map(item => {
            let line = \`\${item.qty}x \${item.name_th} (\${item.name_en})\`;
            if (item.options && item.options.length > 0) {
                line += \` [ \${item.options.join(', ')} ]\`;
            }
            return line;
        }).join('\\n');
        
        const allergyEls = document.querySelectorAll('input[name="allergy"]:checked');
        const allergy = Array.from(allergyEls).map(el => el.value);
        const allergyDetail = document.getElementById('allergy-detail').value;

        const btn = document.getElementById('btn-submit');
        const originalText = btn.innerText;
        btn.innerText = "กำลังประมวลผล... / Processing...";
        btn.disabled = true;

        try {
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    custName, custPhone, custEmail, eventDate, eventTime, eventPlace, custAddress,
                    menuSet: menuSetStr, 
                    allergy, allergyDetail,
                    paymentMethod: selectedPaymentMethod,
                    totalAmount: finalAmountToPay,
                    totalSets: totalItemsCount,
                    category: 'Mixed Cart'
                })
            });

            const result = await response.json();

            if (result.url) {
                clearCart();
                window.location.href = result.url;
            } else if (result.success) {
                clearCart();
                window.location.href = \`/success.html?method=\${result.method}&id=\${result.bookingId}\`;
            } else {
                alert('เกิดข้อผิดพลาด / Error: ' + (result.error || 'Unknown error.'));
                btn.innerText = originalText;
                btn.disabled = false;
            }
        } catch (error) {
            console.error('Error submitting booking:', error);
            alert('เกิดข้อผิดพลาดในการเชื่อมต่อ / Connection error');
            btn.innerText = originalText;
            btn.disabled = false;
        }
    }

    function changeLang(lang, btn) {
        document.documentElement.lang = lang;
        if (btn) { document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); }
        const t = {
            th: { 
                connect: "ติดต่อเรา", booking: "ข้อมูลการสั่งจอง", name: "ชื่อ-นามสกุล", phone: "เบอร์ติดต่อ", date: "วันที่จัดส่ง / Delivery Date", time: "เวลาจัดส่ง / Delivery Time",
                venue: "สถานที่จัดงาน", address: "ที่อยู่จัดส่ง", payment: "วิธีชำระเงิน", submit: "ยืนยันการสั่งจอง",
                allergy: "ข้อมูลการแพ้อาหาร", peanuts: "ถั่ว", milk: "นม", seafood: "อาหารทะเล", eggs: "ไข่", msg: "ผงชูรส", fishsauce: "น้ำปลา", knorr: "คนอร์",
                other: "อื่นๆ ระบุ",
                d_title: "เงื่อนไขการชำระเงิน:",
                d_desc: "ระบบจะคำนวณยอดชำระเต็มจำนวนสำหรับชุดอาหารกล่อง และยอดมัดจำ 50% สำหรับเมนูจัดเลี้ยงโดยอัตโนมัติ"
            },
            en: { 
                connect: "Connect With Us", booking: "Booking Details", name: "Contact Name", phone: "Phone Number", date: "Delivery Date", time: "Delivery Time", 
                venue: "Venue Name", address: "Full Address", payment: "Payment Method", submit: "Confirm Booking",
                allergy: "Food Allergy", peanuts: "Peanuts", milk: "Dairy", seafood: "Seafood", eggs: "Eggs", msg: "MSG", fishsauce: "Fish Sauce", knorr: "Bouillon",
                other: "Others",
                d_title: "Payment Terms:",
                d_desc: "The system automatically calculates full payment for delivery sets and a 50% deposit for catering menus."
            }
        }[lang];

        document.getElementById('lbl-cart-title').innerText = lang === 'th' ? 'ตะกร้าสินค้า / Your Cart' : 'Your Cart';
        document.getElementById('lbl-total-classic').innerText = lang === 'th' ? 'ยอดเต็มจำนวน (กล่อง/ของหวาน):' : 'Full Payment (Boxes/Desserts):';
        document.getElementById('lbl-total-catering').innerText = lang === 'th' ? 'ยอดมัดจำ 50% (จัดเลี้ยง):' : '50% Deposit (Catering):';
        document.getElementById('lbl-amount-to-pay').innerText = lang === 'th' ? 'ยอดชำระเบื้องต้น / Amount to Pay Now:' : 'Amount to Pay Now:';
        
        renderCartSummary();

    `;
    content = content.substring(0, sIndex) + newJS + content.substring(eIndex);
}

// 3. Remove the DOMContentLoaded block from the end that was calling onMenuSelectChange
content = content.replace(/document\.addEventListener\('DOMContentLoaded', \(\) => {[\s\S]*?}\);/, 'document.addEventListener("DOMContentLoaded", () => { renderCartSummary(); });');

fs.writeFileSync(file, content);
console.log('Rewrote booking.html to use Cart System');
