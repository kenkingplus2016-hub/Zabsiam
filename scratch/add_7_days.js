const fs = require('fs');

function add7DaysCondition(htmlPath, jsPath) {
    // 1. Update index.html
    if (fs.existsSync(htmlPath)) {
        let html = fs.readFileSync(htmlPath, 'utf8');
        
        // Add text to the catering section subtitle
        const oldSubtitle = '<p style="color: #FFD700; font-size: 1.2rem; margin-top: 10px;">Event Catering for a minimum of 80 guests</p>';
        const newSubtitle = '<p style="color: #FFD700; font-size: 1.2rem; margin-top: 10px;">Event Catering for a minimum of 80 guests<br/><span style="font-size: 0.95rem; color: #ddd; font-weight: normal;">*Please note: Minimum 7 days advance booking is required.</span></p>';
        
        if (html.includes(oldSubtitle)) {
            html = html.replace(oldSubtitle, newSubtitle);
            fs.writeFileSync(htmlPath, html, 'utf8');
            console.log("Updated subtitle in HTML:", htmlPath);
        }
    }

    // 2. Update cart.js to set minimum date
    if (fs.existsSync(jsPath)) {
        let js = fs.readFileSync(jsPath, 'utf8');
        
        // Find where dateInput is defined in toggleCateringMode()
        const targetStr = `const dateInput = document.getElementById('eventDate');`;
        const insertStr = `const dateInput = document.getElementById('eventDate');\n    \n    // Set minimum date to 7 days from now\n    const minDate = new Date();\n    minDate.setDate(minDate.getDate() + 7);\n    if (dateInput) dateInput.min = minDate.toISOString().split('T')[0];`;
        
        if (js.includes(targetStr) && !js.includes('minDate.setDate')) {
            js = js.replace(targetStr, insertStr);
            fs.writeFileSync(jsPath, js, 'utf8');
            console.log("Updated JS min date:", jsPath);
        }
    }
}

add7DaysCondition('C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/index.html', 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/cart.js');
add7DaysCondition('C:/Users/KENDEE/Desktop/เว็บ/public/index.html', 'C:/Users/KENDEE/Desktop/เว็บ/public/cart.js');
