const fs = require('fs');

let html = fs.readFileSync('public/delivery.html', 'utf8');

const targetP = `<p style="color: #ccc; font-size: 1.2rem; margin-top: 12px; margin-bottom: 40px;">Authentic Thai Flavours for Every Occasion<br/><span style="color: var(--color-gold); font-size: 1rem;">12 Pieces per Tray - Prices Include VAT at 20%</span></p>`;

const replacementHtml = `<p style="color: #ccc; font-size: 1.2rem; margin-top: 12px; margin-bottom: 30px;">
    Authentic Thai party trays and large portion delivery.<br/>
    Perfect for house parties, office lunches, or family gatherings.<br/>
    <span style="color: var(--color-gold); font-size: 1rem;">Prices Include VAT at 20%</span>
</p>
<div style="background: rgba(255, 215, 0, 0.1); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 8px; padding: 15px; margin: 0 auto 40px auto; max-width: 600px; text-align: center;">
    <h4 style="color: var(--color-gold); margin: 0 0 10px 0; font-size: 1.1rem;"><i class="fas fa-truck"></i> Delivery Fees</h4>
    <p style="color: #fff; margin: 0; font-size: 1rem; line-height: 1.6;">
        Up to 2 kg: <strong>&pound;4.65</strong><br/>
        2 kg - 10 kg: <strong>&pound;8.55</strong>
    </p>
</div>`;

if (html.includes(targetP)) {
    html = html.replace(targetP, replacementHtml);
    fs.writeFileSync('public/delivery.html', html, 'utf8');
    console.log('Successfully updated delivery text and fees');
} else {
    console.log('Failed to find target paragraph. Let me try regex.');
    const regex = /<p style="color: #ccc; font-size: 1\.2rem; margin-top: 12px; margin-bottom: 40px;">.*?<\/p>/s;
    if (regex.test(html)) {
        html = html.replace(regex, replacementHtml);
        fs.writeFileSync('public/delivery.html', html, 'utf8');
        console.log('Successfully updated delivery text and fees using regex');
    } else {
        console.log('Still failed to find target paragraph.');
    }
}
