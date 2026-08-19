const fs = require('fs');
const path = require('path');

const meetingPath = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/meeting-meals.html';
const coffeePath = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/coffee-break.html';

// 1. Revert meeting-meals.html to handshake icon
if (fs.existsSync(meetingPath)) {
    let meetingHtml = fs.readFileSync(meetingPath, 'utf8');
    meetingHtml = meetingHtml.replace(
        /<img src="images\/main_meeting_meals\.jpg"[^>]*>/,
        '<i class="fas fa-handshake" style="font-size: 4rem; color: var(--color-gold); margin-bottom: 1.5rem;"></i>'
    );
    fs.writeFileSync(meetingPath, meetingHtml, 'utf8');
    fs.copyFileSync(meetingPath, 'C:/Users/KENDEE/Desktop/เว็บ/public/meeting-meals.html');
}

// 2. Set coffee-break.html to use the new image
// Assuming coffee-break.html has an icon like <i class="fas fa-coffee"... or <i class="fas fa-mug-hot"...
if (fs.existsSync(coffeePath)) {
    let coffeeHtml = fs.readFileSync(coffeePath, 'utf8');
    // Regex to match the main icon. Usually <i class="fas fa-..." style="font-size: 4rem;
    coffeeHtml = coffeeHtml.replace(
        /<i class="fas fa-[a-z-]+" style="font-size: 4rem; color: var\(--color-gold\); margin-bottom: 1\.5rem;"><\/i>/,
        '<img src="images/main_coffee_break.jpg" alt="Coffee Break" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 8px; margin-bottom: 1.5rem;">'
    );
    fs.writeFileSync(coffeePath, coffeeHtml, 'utf8');
    fs.copyFileSync(coffeePath, 'C:/Users/KENDEE/Desktop/เว็บ/public/coffee-break.html');
}
console.log("Moved image to Coffee Break and reverted Meeting Meals.");
