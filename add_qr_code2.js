const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/royal.html';
let content = fs.readFileSync(file, 'utf8');

const regex = /<span class="text-xs text-gray-400 font-medium">\$\{currentLang === 'th' \? 'จำนวนสั่งซื้อ \(ชุด 12 ชิ้น\)' : 'Quantity \(32-Pcs Set\)'\}<\/span>/g;

const replacement = `<div class="flex items-center gap-2 relative group">
                                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=\${encodeURIComponent('https://khruathai.london/royal.html?item=' + item.id)}" class="w-10 h-10 border border-gray-200 rounded p-1 cursor-pointer" alt="QR Code">
                                            <div class="absolute bottom-full left-0 mb-2 hidden group-hover:block z-50 bg-white p-2 rounded shadow-xl border border-gold/30">
                                                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=\${encodeURIComponent('https://khruathai.london/royal.html?item=' + item.id)}" class="w-32 h-32" alt="QR Code Large">
                                                <div class="text-[10px] text-center mt-1 text-dark-green font-bold">Scan to Order</div>
                                            </div>
                                            <span class="text-[10px] text-gray-400 font-medium leading-tight">\${currentLang === 'th' ? 'แสกนสั่งอาหาร<br>(ชุด 12 ชิ้น)' : 'Scan to Order<br>(12-Pcs Set)'}</span>
                                        </div>`;

if (content.match(regex)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content, 'utf8');
    console.log("QR Code added successfully.");
} else {
    console.log("Target string not found in royal.html using regex.");
}
