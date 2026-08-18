const fs = require('fs');

function updateDateTimeLocation(htmlPath, jsPath) {
    // 1. Update index.html
    if (fs.existsSync(htmlPath)) {
        let html = fs.readFileSync(htmlPath, 'utf8');
        
        // Update Address placeholder
        html = html.replace('placeholder="Full Postal Address"', 'placeholder="Event Location / Full Postal Address"');

        // Update Date to include Time
        const oldDateHtml = `<div id="catering-date-container" style="display: none; margin-top: 15px;">
                        <label for="eventDate" style="display: block; margin-bottom: 5px; color: #fff;">Event / Delivery Date (Min. 7 days advance):</label>
                        <input type="date" id="eventDate" class="checkout-input">
                    </div>`;
        const newDateHtml = `<div id="catering-date-container" style="display: none; margin-top: 15px;">
                        <div style="display: flex; gap: 10px;">
                            <div style="flex: 1;">
                                <label for="eventDate" style="display: block; margin-bottom: 5px; color: #fff;">Event Date:</label>
                                <input type="date" id="eventDate" class="checkout-input">
                            </div>
                            <div style="flex: 1;">
                                <label for="eventTime" style="display: block; margin-bottom: 5px; color: #fff;">Event Time:</label>
                                <input type="time" id="eventTime" class="checkout-input">
                            </div>
                        </div>
                    </div>`;
        
        if (html.includes(oldDateHtml)) {
            html = html.replace(oldDateHtml, newDateHtml);
            fs.writeFileSync(htmlPath, html, 'utf8');
            console.log("Updated HTML:", htmlPath);
        } else if (!html.includes('id="eventTime"')) {
            // Backup replacement if exactly formatting didn't match
            const backupOld = `<input type="date" id="eventDate" class="checkout-input">`;
            const backupNew = `<input type="date" id="eventDate" class="checkout-input">\n<label for="eventTime" style="display: block; margin-bottom: 5px; margin-top: 10px; color: #fff;">Event Time:</label>\n<input type="time" id="eventTime" class="checkout-input">`;
            html = html.replace(backupOld, backupNew);
            fs.writeFileSync(htmlPath, html, 'utf8');
            console.log("Updated HTML via backup regex:", htmlPath);
        }
    }

    // 2. Update cart.js
    if (fs.existsSync(jsPath)) {
        let js = fs.readFileSync(jsPath, 'utf8');
        
        const oldJsVar = `const eventDateInput = document.getElementById('eventDate')?.value;`;
        const newJsVar = `const eventDateInput = document.getElementById('eventDate')?.value;\n    const eventTimeInput = document.getElementById('eventTime')?.value || 'Not specified';\n    const dateTimeCombo = (eventDateInput || new Date().toISOString().split('T')[0]) + ' @ ' + eventTimeInput;`;
        
        if (js.includes(oldJsVar) && !js.includes('dateTimeCombo')) {
            js = js.replace(oldJsVar, newJsVar);
            
            const oldPayload = `eventDate: eventDateInput || new Date().toISOString().split('T')[0],`;
            const newPayload = `eventDate: dateTimeCombo,`;
            js = js.replace(oldPayload, newPayload);
            
            fs.writeFileSync(jsPath, js, 'utf8');
            console.log("Updated JS:", jsPath);
        }
    }
}

updateDateTimeLocation('C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/index.html', 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/cart.js');
updateDateTimeLocation('C:/Users/KENDEE/Desktop/เว็บ/public/index.html', 'C:/Users/KENDEE/Desktop/เว็บ/public/cart.js');
