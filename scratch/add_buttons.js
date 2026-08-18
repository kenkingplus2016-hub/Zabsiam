const fs = require('fs');

function addButtonToCards(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log("File not found:", filePath);
        return;
    }
    
    let html = fs.readFileSync(filePath, 'utf8');

    // The button HTML to inject at the bottom of each card
    const buttonHtml = `
                    <div style="margin-top: 20px;">
                        <a href="mailto:info@zabsiam.co.uk?subject=Event%20Catering%20Inquiry" class="add-to-cart-btn" style="padding: 10px 20px; font-size: 0.95rem; width: 100%; display: inline-block; box-sizing: border-box;">Contact Us for Your Event</a>
                    </div>`;

    // Inject after the closing </ul></div> of the menu list
    const searchMenuEnd = `</ul>\n                    </div>`;
    
    if (html.includes(searchMenuEnd) && !html.includes('Contact Us for Your Event</a>\n                    </div>\n                </div>\n                \n                <!-- Card 2')) {
        html = html.split(searchMenuEnd).join(searchMenuEnd + buttonHtml);
        
        // Remove the old global button at the bottom of the section
        const oldButtonHtml = `            <div style="text-align: center; margin-top: 3rem;">\n                <a href="mailto:info@zabsiam.co.uk?subject=Event%20Catering%20Inquiry" class="add-to-cart-btn" style="padding: 12px 30px; font-size: 1.1rem;">Contact Us for Your Event</a>\n            </div>`;
        html = html.replace(oldButtonHtml, '');
        
        fs.writeFileSync(filePath, html, 'utf8');
        console.log("Updated", filePath);
    } else {
        console.log("Already updated or could not find insertion point.");
    }
}

addButtonToCards('C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/index.html');
addButtonToCards('C:/Users/KENDEE/Desktop/เว็บ/public/index.html');
