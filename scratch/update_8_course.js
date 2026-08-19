const fs = require('fs');
const path = require('path');

const targetPath = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/index.html';

if (fs.existsSync(targetPath)) {
    let html = fs.readFileSync(targetPath, 'utf8');
    
    // Replace the 8-Course Banquet image in the HTML display
    html = html.replace(
        '<img src="images/new_deep_fried_fish.jpg" alt="10-Course Banquet" onerror="this.src=\'images/beef_pad_cha.jpg\'">',
        '<img src="images/8_course_banquet.jpg" alt="8-Course Ultimate Banquet">'
    );
    // Also, there might be a case where someone fixed the alt tag earlier, let's catch just the img src line if it didn't match.
    // We will do a more robust regex just in case:
    const regexImg = /<img src="[^"]+" alt="(10-Course Banquet|8-Course Ultimate Banquet)"[^>]*>/;
    // Actually, looking at the grep output, it is exactly: <img src="images/new_deep_fried_fish.jpg" alt="10-Course Banquet" \n    onerror="this.src='images/beef_pad_cha.jpg'">
    // Let's just use string replace without newlines first. The cat output wraps lines for display, but in file they are likely one line or split differently.
    
    // Replace the addToCart image references for the 8-Course
    html = html.replace(/'images\/the-ultimate-feast\.jpg'/g, "'images/8_course_banquet.jpg'");

    fs.writeFileSync(targetPath, html, 'utf8');
    fs.copyFileSync(targetPath, 'C:/Users/KENDEE/Desktop/เว็บ/public/index.html');
    console.log("Updated index.html with 8-course banquet image (part 1).");
}
