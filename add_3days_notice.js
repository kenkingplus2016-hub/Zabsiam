const fs = require('fs');

let html = fs.readFileSync('public/delivery.html', 'utf8');

// 1. Update the delivery info box at the top
const oldBox = `<div style="background: rgba(255, 215, 0, 0.1); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 8px; padding: 15px; margin: 0 auto 40px auto; max-width: 600px; text-align: center;">
    <h4 style="color: var(--color-gold); margin: 0 0 10px 0; font-size: 1.1rem;"><i class="fas fa-truck"></i> Delivery Fees</h4>
    <p style="color: #fff; margin: 0; font-size: 1rem; line-height: 1.6;">
        Up to 2 kg: <strong>&pound;4.65</strong><br/>
        2 kg - 10 kg: <strong>&pound;8.55</strong>
    </p>
</div>`;

const newBox = `<div style="background: rgba(255, 215, 0, 0.1); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 8px; padding: 15px; margin: 0 auto 40px auto; max-width: 600px; text-align: center;">
    <h4 style="color: var(--color-gold); margin: 0 0 10px 0; font-size: 1.1rem;"><i class="fas fa-clock"></i> Pre-order Information &amp; Delivery</h4>
    <p style="color: #fff; margin: 0; font-size: 1rem; line-height: 1.6;">
        <span style="color: #ffaa00; font-weight: bold;">⚠️ Please order at least 3 days in advance.</span><br/><br/>
        <strong>Delivery Fees:</strong><br/>
        Up to 2 kg: <strong>&pound;4.65</strong> | 2 kg - 10 kg: <strong>&pound;8.55</strong>
    </p>
</div>`;

html = html.replace(oldBox, newBox);

// 2. Update the form text at the bottom
html = html.replace('EventDelivery Date (Min. 7 days advance):', 'Delivery Date (Min. 3 days advance):');

fs.writeFileSync('public/delivery.html', html, 'utf8');
console.log('Successfully added 3 days advance notice.');
