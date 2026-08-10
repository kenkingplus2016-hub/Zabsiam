const Jimp = require('jimp');
const path = require('path');

async function removeWhiteBackground() {
    const inputPath = path.join(__dirname, 'public', 'images', 'chor_malee_official_logo.jpg');
    const outputPath = path.join(__dirname, 'public', 'images', 'chor_malee_official_logo.png');
    
    const image = await Jimp.read(inputPath);
    const threshold = 240; // pixels whiter than this become transparent
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
        const red = this.bitmap.data[idx];
        const green = this.bitmap.data[idx + 1];
        const blue = this.bitmap.data[idx + 2];
        
        // If pixel is near-white, make it transparent
        if (red > threshold && green > threshold && blue > threshold) {
            this.bitmap.data[idx + 3] = 0; // alpha = 0 (transparent)
        }
    });
    
    await image.writeAsync(outputPath);
    console.log('Done! Saved transparent logo to:', outputPath);
}

removeWhiteBackground().catch(console.error);
