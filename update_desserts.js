const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public';

// Read delivery.html
let deliveryHtml = fs.readFileSync(path.join(dir, 'delivery.html'), 'utf8');

let dessertsHtml = deliveryHtml;

// 1. Title
dessertsHtml = dessertsHtml.replace(/<title>.*?<\/title>/, '<title>Desserts Menu - Khrua Thai London</title>');

// 2. Nav Active State
dessertsHtml = dessertsHtml.replace('id="nav-delivery" class="nav-link active"', 'id="nav-delivery" class="nav-link"');
dessertsHtml = dessertsHtml.replace('id="nav-desserts" class="nav-link"', 'id="nav-desserts" class="nav-link active"');

// 3. Hero section
dessertsHtml = dessertsHtml.replace(/id="hero-title"[^>]*>.*?<\/h1>/, 'id="hero-title" class="font-manorah text-gold text-4xl md:text-6xl mb-2.5 tracking-[2px]">Thai Desserts</h1>');
dessertsHtml = dessertsHtml.replace(/id="hero-subtitle"[^>]*>.*?<\/p>/, 'id="hero-subtitle" class="text-black text-lg md:text-xl max-w-[700px] mx-auto leading-relaxed">Authentic & Premium Thai Sweets</p>');
dessertsHtml = dessertsHtml.replace(/id="hero-desc"[^>]*>.*?<\/p>/, 'id="hero-desc" class="mt-4 text-sm md:text-base opacity-90 text-black"></p>');

// 4. Remove delivery conditions banner
const startIdx = dessertsHtml.indexOf('<!-- Delivery Conditions Banner -->');
if (startIdx !== -1) {
    const endIdx = dessertsHtml.indexOf('</section>', startIdx) + 10;
    dessertsHtml = dessertsHtml.slice(0, startIdx) + dessertsHtml.slice(endIdx);
}

// 5. Replace Javascript filter logic
const oldFilter = `                // Only show Family Box Sets on Delivery page (exclude Thai Style Tray Sets and Desserts)
                classicSets = allSets.filter(s => {
                    if (s.id === 'lunch_box_mango_sticky_rice') return false;
                    return s.name.en.includes('Family') || s.name.en.includes('Lunch Box') || s.name.en.includes('Special') || s.name.en.includes('Siam Pruksa') || s.name.en.includes('Siam Authentic');
                });`;

const newFilter = `                // Only show Desserts
                classicSets = allSets.filter(s => {
                    return s.id === 'lunch_box_mango_sticky_rice' || s.id.includes('dessert');
                });`;

dessertsHtml = dessertsHtml.replace(oldFilter, newFilter);

fs.writeFileSync(path.join(dir, 'desserts.html'), dessertsHtml);

console.log('desserts.html rebuilt successfully.');
