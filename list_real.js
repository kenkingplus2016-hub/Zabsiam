const fs = require('fs');
const files = fs.readdirSync('public/images').filter(f => f !== 'desktop.ini');
// List all real images (not placeholders) with their sizes
const real = [];
files.forEach(f => {
    const size = fs.statSync(`public/images/${f}`).size;
    if (size !== 156898) {
        real.push({name: f, size: size});
    }
});
// Sort by name
real.sort((a,b) => a.name.localeCompare(b.name));
real.forEach(r => console.log(`${r.name} (${r.size})`));
console.log(`\nTotal real images: ${real.length}`);
