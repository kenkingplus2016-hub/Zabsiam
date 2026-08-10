const fs = require('fs');

const files = [
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\menu.html',
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\menu.html'
];

for (const filePath of files) {
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // We need to update the inner HTML of the card in renderGrid.
    // Let's find the current image HTML and replace it.
    
    // Current pattern:
    /*
    <div class="relative w-full aspect-square overflow-hidden bg-gray-50 rounded-t-lg">
        <img src="${imgSrc}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" onerror="this.src='logo.png';">
    */
    
    // We will replace it with a structure that supports a hover image.
    const oldImgBlock = /<div class="relative w-full aspect-square overflow-hidden bg-gray-50 rounded-t-lg">\s*<img src="\$\{imgSrc\}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" onerror="this.src='logo.png';">/g;
    
    // We also need to define hoverImgSrc in the JS before this block.
    // Let's find: const unit = item.unit || 'Portion';
    const oldUnitDef = "const unit = item.unit || 'Portion';";
    const newUnitDef = `const unit = item.unit || 'Portion';
                    // Check if there is a hover image in data, otherwise use the same image but keep the zoom effect
                    const hasHoverImg = !!item.img_hover;
                    const hoverImgSrc = hasHoverImg ? (item.img_hover.startsWith('http') ? item.img_hover : \`images/\${item.img_hover}\`) : imgSrc;`;
                    
    content = content.replace(oldUnitDef, newUnitDef);

    const newImgBlock = `<div class="relative w-full aspect-square overflow-hidden bg-gray-50 rounded-t-lg group/img">
                                <!-- Primary Image -->
                                <img src="\${imgSrc}" class="absolute inset-0 w-full h-full object-cover transition-all duration-500 \${hasHoverImg ? 'group-hover/img:opacity-0' : 'group-hover/img:scale-105'}" onerror="this.src='logo.png';">
                                <!-- Secondary Hover Image (Only visible on hover if it exists) -->
                                \${hasHoverImg ? \`<img src="\${hoverImgSrc}" class="absolute inset-0 w-full h-full object-cover transition-all duration-500 opacity-0 group-hover/img:opacity-100 group-hover/img:scale-105" onerror="this.src='logo.png';">\` : ''}`;
                                
    content = content.replace(oldImgBlock, newImgBlock);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Processed: ' + filePath);
}
