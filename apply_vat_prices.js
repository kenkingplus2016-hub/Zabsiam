const fs = require('fs');

const pricingData = [
    { title: "Option A", prices: { "20-29": "38.40", "30-49": "33.60", "50-79": "30.00", "80-99": "26.40", "100+": "24.00" }, from: "24" },
    { title: "Option A1.1", prices: { "20-29": "40.80", "30-49": "36.00", "50-79": "32.40", "80-99": "28.80", "100+": "26.40" }, from: "26.40" },
    { title: "Option B", prices: { "20-29": "42.00", "30-49": "37.20", "50-79": "33.60", "80-99": "30.00", "100+": "27.60" }, from: "27.60" },
    { title: "Option B1.1", prices: { "20-29": "46.80", "30-49": "42.00", "50-79": "38.40", "80-99": "34.80", "100+": "31.20" }, from: "31.20" },
    { title: "Option C", prices: { "20-29": "50.40", "30-49": "45.60", "50-79": "42.00", "80-99": "38.40", "100+": "34.80" }, from: "34.80" },
    { title: "Option C1.1", prices: { "20-29": "52.80", "30-49": "48.00", "50-79": "44.40", "80-99": "40.80", "100+": "37.20" }, from: "37.20" },
    { title: "Option D", prices: { "20-29": "55.20", "30-49": "50.40", "50-79": "46.80", "80-99": "43.20", "100+": "39.60" }, from: "39.60" },
    { title: "Option D1.1", prices: { "20-29": "57.60", "30-49": "52.80", "50-79": "49.20", "80-99": "45.60", "100+": "42.00" }, from: "42.00" } 
];

function formatPrice(num) {
    // If it's a whole number (e.g. 24) or ends in .00, don't show decimals?
    // User requested specifically £38.40, £30.00 etc. We will keep exact formatting.
    // Ensure 2 decimal places.
    return parseFloat(num).toFixed(2);
}

function updatePrices(filePath, isMeetingMeals) {
    if (!fs.existsSync(filePath)) return;
    let html = fs.readFileSync(filePath, 'utf8');

    let optionIndex = 0;

    // We have previously set things to <p ...>From &pound;15 per Guest</p> etc.
    // But since the prices now have decimals, regex matching \d+ might fail if it previously had decimals,
    // but it currently only has integers (e.g. 15, 17, 19).
    // Let's use a robust regex that catches decimals too.
    html = html.replace(/From &pound;([0-9.]+) per Guest/g, () => {
        let base = parseFloat(pricingData[optionIndex].from);
        if (isMeetingMeals) base += 2.40; // £2 * 1.2 VAT
        optionIndex++;
        // The user formatted "From £24" without .00 if it was whole, but .40 if it wasn't.
        // Let's just always use 2 decimals if it has cents, or 0 if it's whole.
        let displayBase = base % 1 === 0 ? base.toString() : base.toFixed(2);
        return `From &pound;${displayBase} per Guest`;
    });

    optionIndex = 0;
    
    // Replace the table rows. The prices in the table might be &pound;26 or &pound;26.00
    const tableRegex = /<td style="padding: 4px;">20-29<\/td><td style="padding: 4px; text-align: right;">&pound;[0-9.]+<\/td><\/tr>\s*<tr[^>]*><td style="padding: 4px;">30-49<\/td><td style="padding: 4px; text-align: right;">&pound;[0-9.]+<\/td><\/tr>\s*<tr[^>]*><td style="padding: 4px;">50-79<\/td><td style="padding: 4px; text-align: right;">&pound;[0-9.]+<\/td><\/tr>\s*<tr[^>]*><td style="padding: 4px;">80-99<\/td><td style="padding: 4px; text-align: right;">&pound;[0-9.]+<\/td><\/tr>\s*<tr[^>]*><td style="padding: 4px;">100\+<\/td><td style="padding: 4px; text-align: right;">&pound;[0-9.]+<\/td><\/tr>/g;
    
    html = html.replace(tableRegex, () => {
        const pd = pricingData[optionIndex];
        let p20 = parseFloat(pd.prices["20-29"]);
        let p30 = parseFloat(pd.prices["30-49"]);
        let p50 = parseFloat(pd.prices["50-79"]);
        let p80 = parseFloat(pd.prices["80-99"]);
        let p100 = parseFloat(pd.prices["100+"]);

        if (isMeetingMeals) {
            p20 += 2.40; p30 += 2.40; p50 += 2.40; p80 += 2.40; p100 += 2.40;
        }

        optionIndex++;

        return `<td style="padding: 4px;">20-29</td><td style="padding: 4px; text-align: right;">&pound;${p20.toFixed(2)}</td></tr>
<tr style="border-bottom: 1px solid rgba(255, 215, 0, 0.1);"><td style="padding: 4px;">30-49</td><td style="padding: 4px; text-align: right;">&pound;${p30.toFixed(2)}</td></tr>
<tr style="border-bottom: 1px solid rgba(255, 215, 0, 0.1);"><td style="padding: 4px;">50-79</td><td style="padding: 4px; text-align: right;">&pound;${p50.toFixed(2)}</td></tr>
<tr style="border-bottom: 1px solid rgba(255, 215, 0, 0.1);"><td style="padding: 4px;">80-99</td><td style="padding: 4px; text-align: right;">&pound;${p80.toFixed(2)}</td></tr>
<tr style="border-bottom: 1px solid rgba(255, 215, 0, 0.1);"><td style="padding: 4px;">100+</td><td style="padding: 4px; text-align: right;">&pound;${p100.toFixed(2)}</td></tr>`;
    });

    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Updated pricing in ${filePath}`);
}

updatePrices('public/event-catering.html', false);
updatePrices('public/meeting-meals.html', true);

// Update chatbot text
let jsHtml = fs.readFileSync('public/zabsiam_chatbot/zabsiam-chatbot.js', 'utf8');
// Min is Option A 100+ (£24), Max is Option D1.1 20-29 (£57.60)
// For Meeting meals, Min is £26.40, Max is £60.00
jsHtml = jsHtml.replace(/Event Catering: From £[0-9.]+ to £[0-9.]+/g, 'Event Catering: From £24 to £57.60');
jsHtml = jsHtml.replace(/Meeting Meals: From £[0-9.]+ to £[0-9.]+/g, 'Meeting Meals: From £26.40 to £60');

fs.writeFileSync('public/zabsiam_chatbot/zabsiam-chatbot.js', jsHtml, 'utf8');
console.log('Updated chatbot pricing limits');
