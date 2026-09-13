const fs = require('fs');

function insertNotice(file, targetRegex, noticeHtml) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        // Let's replace the first match of the target paragraph to include the notice right after it.
        if (content.match(targetRegex)) {
            content = content.replace(targetRegex, `$& ${noticeHtml}`);
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Updated ${file}`);
        } else {
            console.log(`Could not find target in ${file}`);
        }
    }
}

// 1. Signature Thai Banquets (index.html) - 14 days
const indexNotice = `<div style="margin-top: 15px; padding: 10px; background: rgba(255, 215, 0, 0.1); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 5px; color: #ffaa00; font-weight: bold; text-align: center; display: inline-block;">⚠️ Please order at least 14 days in advance.</div>`;
insertNotice(
    'public/index.html',
    /<p>Curated culinary journeys featuring our most premium dishes.*?<\/p>/,
    indexNotice
);

// 2. Event Catering (event-catering.html) - 14 days
const eventNotice = `<div style="margin-top: 15px; padding: 10px; background: rgba(255, 215, 0, 0.1); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 5px; color: #ffaa00; font-weight: bold; text-align: center; display: inline-block;">⚠️ Please book at least 14 days in advance.</div>`;
// For event catering, let's find the section header paragraph
insertNotice(
    'public/event-catering.html',
    /<p>Bespoke catering solutions for weddings, large corporate events, and private celebrations.*?<\/p>/,
    eventNotice
);

// 3. Canapes (canapes.html) - 3 days + delivery fee
const canapeNotice = `<div style="margin-top: 15px; padding: 10px; background: rgba(255, 215, 0, 0.1); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 5px; color: #ffaa00; text-align: center; display: inline-block;">
    <strong>⚠️ Please order at least 3 days in advance.</strong><br/>
    <span style="color:#fff; font-size:0.9rem;">Delivery Fees: Up to 2 kg: &pound;4.65 | 2 kg - 10 kg: &pound;8.55</span>
</div>`;
insertNotice(
    'public/canapes.html',
    /<p>Premium bite-sized Thai delicacies perfect for drink receptions, corporate events, and elegant parties.*?<\/p>/,
    canapeNotice
);

// 4. Meeting Meals (meeting-meals.html) - 14 days
const meetingNotice = `<div style="margin-top: 15px; padding: 10px; background: rgba(255, 215, 0, 0.1); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 5px; color: #ffaa00; font-weight: bold; text-align: center; display: inline-block;">⚠️ Please order at least 14 days in advance.</div>`;
insertNotice(
    'public/meeting-meals.html',
    /<p>Elevate your corporate meetings and working lunches with our premium Thai lunch boxes.*?<\/p>/,
    meetingNotice
);

