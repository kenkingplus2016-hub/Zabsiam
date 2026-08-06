const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\KENDEE\\.gemini\\antigravity\\brain\\9d10d3e1-29fa-4160-9fdc-24b2e2180579\\.user_uploaded';
const dstDir = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\images';
const ghDir = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\images';

const filesToCopy = [
    { src: 'media__1784909633795.jpg', dst: 'bua_loy_5_color.jpg' },
    { src: 'media__1784908639215.jpg', dst: 'Khanom Mo Kaeng.jpg' },
    { src: 'media__1784908281553.jpg', dst: 'Butterfly Pea Coconut Jelly with Young Coconut.jpg' },
    { src: 'media__1784907763838.jpg', dst: 'Pandan Coconut Jelly.jpg' }
];

filesToCopy.forEach(f => {
    const srcPath = path.join(srcDir, f.src);
    const dstPath = path.join(dstDir, f.dst);
    const ghPath = path.join(ghDir, f.dst);
    
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, dstPath);
        fs.copyFileSync(srcPath, ghPath);
        console.log(`Copied ${f.dst}`);
    } else {
        console.log(`Not found: ${srcPath}`);
    }
});
