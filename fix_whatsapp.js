const fs = require('fs');

let cartJs = fs.readFileSync('public/cart.js', 'utf8');

// The replacement logic:
const oldBlock = `    let finalTotal = subtotal + deliveryOption.fee;
    if (isCatering && !window.requireFullPayment) {
        const deposit = subtotal * 0.5;
        finalTotal = deposit + deliveryOption.fee;
        menuSetDetails += \`\\n** Full Order Value: \${subtotal.toFixed(2)} **\\n\`;
        menuSetDetails += \`** Deposit Paid (50%): \${deposit.toFixed(2)} **\\n\`;
        menuSetDetails += \`** Balance Due on Delivery: \${(subtotal - deposit).toFixed(2)} **\\n\\n\`;
    }`;

// Since the old file has the literal '', we should be careful. I will use regex or match the english part.
cartJs = cartJs.replace(/let finalTotal = subtotal \+ deliveryOption\.fee;\s*if \(isCatering && !window\.requireFullPayment\) \{[\s\S]*? \*\*(?:\\n)*\s*\}/, 
`let finalTotal = subtotal + deliveryOption.fee;
    if (isCatering && !window.requireFullPayment) {
        const deposit = subtotal * 0.5;
        finalTotal = deposit + deliveryOption.fee;
        menuSetDetails += \`\\n** Full Order Value: \xA3\${subtotal.toFixed(2)} **\\n\`;
        menuSetDetails += \`** Deposit Paid (50%): \xA3\${deposit.toFixed(2)} **\\n\`;
        menuSetDetails += \`** Balance Due on Delivery: \xA3\${(subtotal - deposit).toFixed(2)} **\\n\\n\`;
    } else {
        menuSetDetails += \`\\n** Total Due Now: \xA3\${finalTotal.toFixed(2)} **\\n\\n\`;
    }`);

fs.writeFileSync('public/cart.js', cartJs, 'utf8');
console.log('Fixed WhatsApp total rendering');
