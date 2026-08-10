const fs = require('fs');
let text = fs.readFileSync('public/booking.html', 'utf8');
text = text.replace('let totalItemsCount = 0;', 'let totalItemsCount = 0;\n    let isFullPayment = false;');
text = text.replace(/<div class="payment-methods">[\s\S]*?<\/div>\s*<\/div>/, '<div class="payment-methods">\n                <div class="pay-option active" style="cursor: default; width: 100%;">\n                    <i class="far fa-credit-card"></i>\n                    <span id="p-card">??????????<br>Credit Card</span>\n                </div>\n            </div>');
text = text.replace('let selectedPaymentMethod = \'PromptPay\';', 'let selectedPaymentMethod = \'Card\';');
fs.writeFileSync('public/booking.html', text, 'utf8');
