const fs = require('fs');

const files = [
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\menu.html',
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\menu.html'
];

for (const filePath of files) {
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Remove Catering Terms Section
    // The section starts with <!-- Catering Terms Section --> and ends just before <!-- Divider before a la carte --> or the <main> tag.
    // Let's use a regex to match from <!-- Catering Terms Section --> to the closing </section> tag of that section.
    const termsRegex = /<!-- Catering Terms Section -->[\s\S]*?<\/section>/g;
    content = content.replace(termsRegex, '');
    
    // Also remove the hero banner to make it cleaner like Waitrose/COOK
    const heroRegex = /<section class="hero-banner"[\s\S]*?<\/section>/g;
    content = content.replace(heroRegex, '');

    // 2. Update Header Navigation Style
    // Replace the pill shape styling of nav-link
    const oldNavLinkCSS = /@apply text-gold no-underline px-5 py-1\.5 border-\[1\.5px\] border-gold rounded-full text-sm font-semibold transition-colors duration-300 hover:bg-gold hover:text-dark-green;/g;
    const newNavLinkCSS = "@apply text-gray-700 no-underline px-4 py-2 text-sm font-bold transition-colors duration-300 hover:text-[#5c8b54] hover:bg-gray-50 rounded-md;";
    content = content.replace(oldNavLinkCSS, newNavLinkCSS);
    
    const oldNavLinkActiveCSS = /@apply bg-gold text-dark-green;/g;
    const newNavLinkActiveCSS = "@apply text-[#5c8b54] bg-[#f0f8ed];";
    content = content.replace(oldNavLinkActiveCSS, newNavLinkActiveCSS);
    
    // Update header border and padding
    content = content.replace('border-b-4 border-gold', 'border-b border-gray-200');
    content = content.replace('h-[100px] md:h-[220px]', 'h-[60px] md:h-[80px]'); // Make logo smaller, cleaner
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Processed: ' + filePath);
}
