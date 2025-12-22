#!/usr/bin/env node

/**
 * Script d'optimisation d'images
 * - Génère des variantes WebP/AVIF
 * - Crée une version optimisée dans le format d'origine
 * - Conserve l'arborescence des fichiers
 */

const fs = require('fs');
const path = require('path');

let sharp;
try {
    sharp = require('sharp');
} catch (error) {
    console.error('[compress-images] Le module "sharp" est requis. Exécutez `npm install --save-dev sharp`');
    process.exit(1);
}

const SOURCE_DIR = path.resolve(__dirname, '../images');
const OUTPUT_DIR = path.resolve(__dirname, '../images/optimized');
const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);

const DEFAULT_OPTIONS = {
    quality: 80,
    losslessPng: false
};

async function ensureDirectory(dirPath) {
    await fs.promises.mkdir(dirPath, { recursive: true });
}

async function getImageFiles(dir) {
    const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map(async (dirent) => {
        const res = path.resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
            return getImageFiles(res);
        }
        if (SUPPORTED_EXTENSIONS.has(path.extname(dirent.name).toLowerCase())) {
            return res;
        }
        return null;
    }));
    return files.flat().filter(Boolean);
}

async function optimizeImage(filePath, options = DEFAULT_OPTIONS) {
    const relativePath = path.relative(SOURCE_DIR, filePath);
    const { dir: relativeDir, name, ext } = path.parse(relativePath);
    const outputDir = path.join(OUTPUT_DIR, relativeDir);

    await ensureDirectory(outputDir);

    const inputBuffer = await fs.promises.readFile(filePath);
    const inputSize = inputBuffer.length;

    const pipeline = sharp(inputBuffer, { failOn: 'none' });

    const optimizeTasks = [];

    // Version optimisée dans le format original
    const optimizedPath = path.join(outputDir, `${name}${ext}`);
    if (ext.toLowerCase() === '.png') {
        optimizeTasks.push(
            pipeline.clone()
                .png({
                    compressionLevel: 9,
                    adaptiveFiltering: true,
                    palette: true,
                    quality: options.losslessPng ? 100 : options.quality
                })
                .toFile(optimizedPath)
        );
    } else {
        optimizeTasks.push(
            pipeline.clone()
                .jpeg({
                    quality: options.quality,
                    mozjpeg: true,
                    chromaSubsampling: '4:4:4'
                })
                .toFile(optimizedPath)
        );
    }

    // Version WebP
    const webpPath = path.join(outputDir, `${name}.webp`);
    optimizeTasks.push(
        pipeline.clone()
            .webp({
                quality: options.quality,
                effort: 5
            })
            .toFile(webpPath)
    );

    // Version AVIF (plus agressive, mais excellente compression)
    const avifPath = path.join(outputDir, `${name}.avif`);
    optimizeTasks.push(
        pipeline.clone()
            .avif({
                quality: Math.max(40, options.quality - 10),
                speed: 5
            })
            .toFile(avifPath)
    );

    await Promise.all(optimizeTasks);

    const optimizedStats = await Promise.all([
        fs.promises.stat(optimizedPath).catch(() => null),
        fs.promises.stat(webpPath).catch(() => null),
        fs.promises.stat(avifPath).catch(() => null)
    ]);

    const [optimizedStat, webpStat, avifStat] = optimizedStats;

    const formatSize = (size) => `${(size / 1024).toFixed(1)} kB`;
    const computeGain = (size) => `${(((inputSize - size) / inputSize) * 100).toFixed(1)}%`;

    console.log(`✔ ${relativePath}`);
    if (optimizedStat) {
        console.log(`   ↳ ${path.relative(SOURCE_DIR, optimizedPath)} (${formatSize(optimizedStat.size)} | gain ${computeGain(optimizedStat.size)})`);
    }
    if (webpStat) {
        console.log(`   ↳ ${path.relative(SOURCE_DIR, webpPath)} (${formatSize(webpStat.size)} | gain ${computeGain(webpStat.size)})`);
    }
    if (avifStat) {
        console.log(`   ↳ ${path.relative(SOURCE_DIR, avifPath)} (${formatSize(avifStat.size)} | gain ${computeGain(avifStat.size)})`);
    }
}

async function run() {
    const start = Date.now();

    if (!fs.existsSync(SOURCE_DIR)) {
        console.error(`[compress-images] Le répertoire source ${SOURCE_DIR} est introuvable.`);
        process.exit(1);
    }

    await ensureDirectory(OUTPUT_DIR);

    const files = await getImageFiles(SOURCE_DIR);

    if (files.length === 0) {
        console.log('[compress-images] Aucune image PNG/JPG trouvée.');
        return;
    }

    console.log(`[compress-images] Optimisation de ${files.length} image(s)...`);

    for (const filePath of files) {
        try {
            await optimizeImage(filePath);
        } catch (error) {
            console.error(`✖ Échec pour ${path.relative(SOURCE_DIR, filePath)}:`, error.message);
        }
    }

    const duration = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`[compress-images] Terminé en ${duration}s. Fichiers optimisés dans ${OUTPUT_DIR}`);
}

run().catch((error) => {
    console.error('[compress-images] Erreur inattendue:', error);
    process.exit(1);
});





