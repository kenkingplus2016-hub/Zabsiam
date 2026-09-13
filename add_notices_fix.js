const fs = require('fs');

function insertNoticeRegex(file, regexStr, noticeHtml) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        let regex = new RegExp(regexStr);
        if (regex.test(content)) {
            content = content.replace(regex, `$& ${noticeHtml}`);
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Updated ${file}`);
        } else {
            console.log(`Could not find target in ${file}`);
        }
    }
}

// 2. Event Catering (event-catering.html) - 14 days
const eventNotice = `<div style="margin-top: 15px; padding: 10px; background: rgba(255, 215, 0, 0.1); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 5px; color: #ffaa00; font-weight: bold; text-align: center; display: inline-block;">⚠️ Please book at least 14 days in advance.</div>`;
insertNoticeRegex(
    'public/event-catering.html',
    '<p style="color: #ddd; font-size: 1\\.1rem; line-height: 1\\.6; margin: 0;">Authentic Thai flavours for every occasion\\. Bespoke catering solutions tailored to your event size, from intimate gatherings to large corporate functions\\.</p>',
    eventNotice
);

// 3. Canapes (canapes.html) - 3 days + delivery fee
const canapeNotice = `</p><div style="margin-top: 15px; padding: 10px; background: rgba(255, 215, 0, 0.1); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 5px; color: #ffaa00; text-align: center; display: inline-block;">
    <strong>⚠️ Please order at least 3 days in advance.</strong><br/>
    <span style="color:#fff; font-size:0.9rem;">Delivery Fees: Up to 2 kg: &pound;4.65 | 2 kg - 10 kg: &pound;8.55</span>
</div><p style="display:none">`;
// Wait, canapes.html target: <p style="color: #ccc; font-size: 1.2rem; margin-top: 12px; margin-bottom: 40px;">Authentic Thai Flavours for Every Occasion<br/><span style="color: var(--color-gold); font-size: 1rem;">12 Pieces per Tray - Prices Include VAT at 20%</span></p>
let canapeHtml = fs.readFileSync('public/canapes.html', 'utf8');
const oldCanapeText = `<p style="color: #ccc; font-size: 1.2rem; margin-top: 12px; margin-bottom: 40px;">Authentic Thai Flavours for Every Occasion<br/><span style="color: var(--color-gold); font-size: 1rem;">12 Pieces per Tray - Prices Include VAT at 20%</span></p>`;
const newCanapeText = `<p style="color: #ccc; font-size: 1.2rem; margin-top: 12px; margin-bottom: 30px;">Authentic Thai Flavours for Every Occasion<br/><span style="color: var(--color-gold); font-size: 1rem;">12 Pieces per Tray - Prices Include VAT at 20%</span></p>
<div style="background: rgba(255, 215, 0, 0.1); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 8px; padding: 15px; margin: 0 auto 40px auto; max-width: 600px; text-align: center;">
    <h4 style="color: var(--color-gold); margin: 0 0 10px 0; font-size: 1.1rem;"><i class="fas fa-clock"></i> Pre-order Information &amp; Delivery</h4>
    <p style="color: #fff; margin: 0; font-size: 1rem; line-height: 1.6;">
        <span style="color: #ffaa00; font-weight: bold;">⚠️ Please order at least 3 days in advance.</span><br/><br/>
        <strong>Delivery Fees:</strong><br/>
        Up to 2 kg: <strong>&pound;4.65</strong> | 2 kg - 10 kg: <strong>&pound;8.55</strong>
    </p>
</div>`;
canapeHtml = canapeHtml.replace(oldCanapeText, newCanapeText);
fs.writeFileSync('public/canapes.html', canapeHtml, 'utf8');
console.log('Updated public/canapes.html');


// 4. Meeting Meals (meeting-meals.html) - 14 days
const meetingNotice = `<div style="margin-top: 15px; padding: 10px; background: rgba(255, 215, 0, 0.1); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 5px; color: #ffaa00; font-weight: bold; text-align: center; display: inline-block;">⚠️ Please order at least 14 days in advance.</div>`;
insertNoticeRegex(
    'public/meeting-meals.html',
    '<p style="color: #ddd; font-size: 1\\.1rem; line-height: 1\\.6; margin: 0;">Authentic Thai flavours for every occasion\\. Bespoke catering solutions tailored to your event size, from intimate gatherings to large corporate functions\\.</p>',
    meetingNotice
);
