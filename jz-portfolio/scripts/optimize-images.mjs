import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

const imagesDir = './src/assets/images';
const techStackDir = './src/assets/images/tech-stack';

async function convertToWebP(filePath, outputPath) {
  try {
    const info = await sharp(filePath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);
    
    const original = (await stat(filePath)).size;
    const optimized = info.size;
    const saved = ((1 - optimized / original) * 100).toFixed(1);
    
    console.log(`✓ ${filePath} → ${outputPath} (${saved}% smaller)`);
  } catch (error) {
    console.error(`✗ Failed to convert ${filePath}:`, error.message);
  }
}

async function processDirectory(dir) {
  const files = await readdir(dir);
  
  for (const file of files) {
    const filePath = join(dir, file);
    const fileStat = await stat(filePath);
    
    if (fileStat.isDirectory()) {
      await processDirectory(filePath);
      continue;
    }
    
    // Only process image files, not SVGs
    if (file.match(/\.(png|jpg|jpeg)$/i)) {
      const outputPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      await convertToWebP(filePath, outputPath);
    }
  }
}

console.log('🖼️  Starting image optimization...\n');

await processDirectory(imagesDir);

console.log('\n✅ Image optimization complete!');
