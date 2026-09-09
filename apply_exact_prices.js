const fs = require('fs');

const pricingData = [
    { title: "Option A", prices: { "20-29": 26, "30-49": 23, "50-79": 20, "80-99": 17, "100+": 15 } },
    { title: "Option A1.1", prices: { "20-29": 29, "30-49": 26, "50-79": 23, "80-99": 20, "100+": 17 } },
    { title: "Option B", prices: { "20-29": 29, "30-49": 26, "50-79": 23, "80-99": 22, "100+": 19 } },
    { title: "Option B1.1", prices: { "20-29": 36, "30-49": 33, "50-79": 29, "80-99": 26, "100+": 23 } },
    { title: "Option C", prices: { "20-29": 39, "30-49": 36, "50-79": 33, "80-99": 30, "100+": 26 } },
    { title: "Option C1.1", prices: { "20-29": 39, "30-49": 36, "50-79": 33, "80-99": 30, "100+": 26 } },
    { title: "Option D", prices: { "20-29": 39, "30-49": 36, "50-79": 33, "80-99": 30, "100+": 26 } },
    { title: "Option D1.1", prices: { "20-29": 41, "30-49": 38, "50-79": 35, "80-99": 32, "100+": 28 } } // Extrapolated since not provided
];

function updatePrices(filePath, isMeetingMeals) {
    if (!fs.existsSync(filePath)) return;
    let html = fs.readFileSync(filePath, 'utf8');

    let optionIndex = 0;

    // Replace the "From £X" text
    html = html.replace(/From &pound;(\d+) per Guest/g, () => {
        let base = pricingData[optionIndex].prices["100+"];
        if (isMeetingMeals) base += 2;
        optionIndex++;
        return `From &pound;${base} per Guest`;
    });

    // Reset index for the table
    optionIndex = 0;
    
    // Replace the table rows
    const tableRegex = /<td style="padding: 4px;">20-29<\/td><td style="padding: 4px; text-align: right;">&pound;\d+<\/td><\/tr>\s*<tr[^>]*><td style="padding: 4px;">30-49<\/td><td style="padding: 4px; text-align: right;">&pound;\d+<\/td><\/tr>\s*<tr[^>]*><td style="padding: 4px;">50-79<\/td><td style="padding: 4px; text-align: right;">&pound;\d+<\/td><\/tr>\s*<tr[^>]*><td style="padding: 4px;">80-99<\/td><td style="padding: 4px; text-align: right;">&pound;\d+<\/td><\/tr>\s*<tr[^>]*><td style="padding: 4px;">100\+<\/td><td style="padding: 4px; text-align: right;">&pound;\d+<\/td><\/tr>/g;
    
    html = html.replace(tableRegex, () => {
        const pd = pricingData[optionIndex];
        let p20 = pd.prices["20-29"];
        let p30 = pd.prices["30-49"];
        let p50 = pd.prices["50-79"];
        let p80 = pd.prices["80-99"];
        let p100 = pd.prices["100+"];

        if (isMeetingMeals) {
            p20 += 2; p30 += 2; p50 += 2; p80 += 2; p100 += 2;
        }

        optionIndex++;

        return `<td style="padding: 4px;">20-29</td><td style="padding: 4px; text-align: right;">&pound;${p20}</td></tr>
<tr style="border-bottom: 1px solid rgba(255, 215, 0, 0.1);"><td style="padding: 4px;">30-49</td><td style="padding: 4px; text-align: right;">&pound;${p30}</td></tr>
<tr style="border-bottom: 1px solid rgba(255, 215, 0, 0.1);"><td style="padding: 4px;">50-79</td><td style="padding: 4px; text-align: right;">&pound;${p50}</td></tr>
<tr style="border-bottom: 1px solid rgba(255, 215, 0, 0.1);"><td style="padding: 4px;">80-99</td><td style="padding: 4px; text-align: right;">&pound;${p80}</td></tr>
<tr style="border-bottom: 1px solid rgba(255, 215, 0, 0.1);"><td style="padding: 4px;">100+</td><td style="padding: 4px; text-align: right;">&pound;${p100}</td></tr>`;
    });

    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Updated pricing in ${filePath}`);
}

updatePrices('public/event-catering.html', false);
updatePrices('public/meeting-meals.html', true);

// Update chatbot text
let jsHtml = fs.readFileSync('public/zabsiam_chatbot/zabsiam-chatbot.js', 'utf8');
// Min is Option A 100+ (£15), Max is Option D1.1 20-29 (£41)
jsHtml = jsHtml.replace(/Event Catering: From £\d+ to £\d+/g, 'Event Catering: From £15 to £41');
jsHtml = jsHtml.replace(/Meeting Meals: From £\d+ to £\d+/g, 'Meeting Meals: From £17 to £43');

fs.writeFileSync('public/zabsiam_chatbot/zabsiam-chatbot.js', jsHtml, 'utf8');
console.log('Updated chatbot pricing limits');
