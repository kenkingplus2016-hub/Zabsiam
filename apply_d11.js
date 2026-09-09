const fs = require('fs');

const d11VAT = {
    "20-29": "54.00",
    "30-49": "43.20",
    "50-79": "40.80",
    "80-99": "36.00",
    "100+": "33.60"
};

function updateD11(filePath, isMeetingMeals) {
    if (!fs.existsSync(filePath)) return;
    let html = fs.readFileSync(filePath, 'utf8');

    // Safe string replacement within D1.1 block
    const parts = html.split('Option D1.1: ZAB SIAM SIGNATURE');
    if (parts.length > 2) { 
        let block = parts[1];
        
        let base = parseFloat(d11VAT["100+"]);
        let p20 = parseFloat(d11VAT["20-29"]);
        let p30 = parseFloat(d11VAT["30-49"]);
        let p50 = parseFloat(d11VAT["50-79"]);
        let p80 = parseFloat(d11VAT["80-99"]);
        let p100 = parseFloat(d11VAT["100+"]);
        
        if (isMeetingMeals) {
            p20 += 2.40; p30 += 2.40; p50 += 2.40; p80 += 2.40; p100 += 2.40; base += 2.40;
        }

        block = block.replace(/From &pound;[0-9.]+ per Guest/, `From &pound;${base.toFixed(2)} per Guest`);
        block = block.replace(/<td style="padding: 4px;">20-29<\/td><td style="padding: 4px; text-align: right;">&pound;[0-9.]+<\/td><\/tr>/, `<td style="padding: 4px;">20-29</td><td style="padding: 4px; text-align: right;">&pound;${p20.toFixed(2)}</td></tr>`);
        block = block.replace(/<td style="padding: 4px;">30-49<\/td><td style="padding: 4px; text-align: right;">&pound;[0-9.]+<\/td><\/tr>/, `<td style="padding: 4px;">30-49</td><td style="padding: 4px; text-align: right;">&pound;${p30.toFixed(2)}</td></tr>`);
        block = block.replace(/<td style="padding: 4px;">50-79<\/td><td style="padding: 4px; text-align: right;">&pound;[0-9.]+<\/td><\/tr>/, `<td style="padding: 4px;">50-79</td><td style="padding: 4px; text-align: right;">&pound;${p50.toFixed(2)}</td></tr>`);
        block = block.replace(/<td style="padding: 4px;">80-99<\/td><td style="padding: 4px; text-align: right;">&pound;[0-9.]+<\/td><\/tr>/, `<td style="padding: 4px;">80-99</td><td style="padding: 4px; text-align: right;">&pound;${p80.toFixed(2)}</td></tr>`);
        block = block.replace(/<td style="padding: 4px;">100\+<\/td><td style="padding: 4px; text-align: right;">&pound;[0-9.]+<\/td><\/tr>/, `<td style="padding: 4px;">100+</td><td style="padding: 4px; text-align: right;">&pound;${p100.toFixed(2)}</td></tr>`);
        
        parts[1] = block;
        html = parts.join('Option D1.1: ZAB SIAM SIGNATURE');
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Updated D1.1 pricing in ${filePath}`);
    }
}

updateD11('public/event-catering.html', false);
updateD11('public/meeting-meals.html', true);

// Update chatbot text (Max limits)
let jsHtml = fs.readFileSync('public/zabsiam_chatbot/zabsiam-chatbot.js', 'utf8');
jsHtml = jsHtml.replace(/Event Catering: From £24 to £[0-9.]+/g, 'Event Catering: From £24 to £55.20');
jsHtml = jsHtml.replace(/Meeting Meals: From £26.40 to £[0-9.]+/g, 'Meeting Meals: From £26.40 to £57.60');

fs.writeFileSync('public/zabsiam_chatbot/zabsiam-chatbot.js', jsHtml, 'utf8');
console.log('Updated chatbot max limits to reflect D1.1 correction');
