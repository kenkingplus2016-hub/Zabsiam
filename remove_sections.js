const fs = require('fs');

const files = [
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\menu.html',
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\menu.html'
];

for (const filePath of files) {
    if (!fs.existsSync(filePath)) {
        console.log('SKIP (not found): ' + filePath);
        continue;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    // Find the line that starts with "    <!-- Buffet Set Packages"
    let startRemove = -1;
    let endRemove = -1;
    
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim().startsWith('<!-- Buffet Set Packages')) {
            startRemove = i;
        }
        if (startRemove >= 0 && lines[i].trim().startsWith('<!-- Terms and Conditions Box -->')) {
            endRemove = i - 1; // Stop right before Terms section
            break;
        }
    }
    
    if (startRemove === -1 || endRemove === -1) {
        console.log('Could not find markers in: ' + filePath);
        console.log('startRemove:', startRemove, 'endRemove:', endRemove);
        continue;
    }
    
    // Also need to remove the section opening tag and description before Buffet Set Packages
    // Line before startRemove should be: <section class=...>
    // Check if line startRemove-1 is the <section> tag
    let actualStart = startRemove;
    if (startRemove > 0 && lines[startRemove - 1].trim().startsWith('<section')) {
        actualStart = startRemove - 1;
    }
    
    console.log('File: ' + filePath);
    console.log('Removing lines ' + (actualStart + 1) + ' to ' + (endRemove + 1) + ' (1-indexed)');
    console.log('First removed line: ' + lines[actualStart].trim().substring(0, 80));
    console.log('Last removed line: ' + lines[endRemove].trim().substring(0, 80));
    console.log('Kept line after: ' + lines[endRemove + 1].trim().substring(0, 80));
    
    // Remove those lines and replace the section comment
    const newLines = [
        ...lines.slice(0, actualStart),
        '    <!-- Catering Terms Section -->',
        '    <section class="max-w-[1200px] mx-auto px-5 pt-12 pb-4">',
        ...lines.slice(endRemove + 1)
    ];
    
    fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
    console.log('SUCCESS: Removed ' + (endRemove - actualStart + 1) + ' lines');
    console.log('');
}
