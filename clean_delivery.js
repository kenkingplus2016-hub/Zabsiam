const fs = require('fs');

let html = fs.readFileSync('public/delivery.html', 'utf8');

// The new delivery grid has exactly 5 items. The last one is Panang Chicken Curry.
// Let's find the closing </div> of that 5th item.
const panangItem = html.indexOf('Panang Chicken Curry (4000ml)');
if (panangItem !== -1) {
    // Find the 'Add to Order' button for Panang
    const addToOrder = html.indexOf('Add to Order</a>', panangItem);
    // Find the closing div of the button
    const firstDivClose = html.indexOf('</div>', addToOrder);
    // Find the closing div of the item card
    const secondDivClose = html.indexOf('</div>', firstDivClose + 6);
    // Close the grid container
    const gridCloseIndex = secondDivClose + 6;
    
    // Now find the end of the section
    const sectionEnd = html.indexOf('</section>', gridCloseIndex);
    
    if (sectionEnd !== -1) {
        const cleanedHtml = html.substring(0, gridCloseIndex) + '\n        </div>\n    </section>' + html.substring(sectionEnd + 10);
        fs.writeFileSync('public/delivery.html', cleanedHtml, 'utf8');
        console.log('Cleaned up remaining Canapes from delivery.html');
    }
}
