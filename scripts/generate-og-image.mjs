/**
 * Generador de imagen Open Graph — Obsidian Couture
 * Branding editorial Aima Legacy
 *
 * Output: public/og-image.jpg (1200x630, calidad 92)
 *
 * Uso: node scripts/generate-og-image.mjs
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const outputPath = path.join(projectRoot, 'public', 'og-image.jpg');

// ────────────────────────────────────────────────────────────
// PALETA OBSIDIAN COUTURE
// ────────────────────────────────────────────────────────────
const OBSIDIAN = '#08070B';        // warm obsidian (tinte cálido)
const IVORY = '#F5EFE0';           // ivory para tipografía principal
const GOLD = '#C9A86A';            // champagne gold para tagline y hairline
const GOLD_LEAK = 'rgba(232,213,168,0.16)'; // light leak dorado
const MUTED = '#7F7869';           // bronce desaturado para mini-pill

// ────────────────────────────────────────────────────────────
// SVG — 1200x630, composición editorial centrada
// ────────────────────────────────────────────────────────────
// Espaciado vertical:
//   mini-pill (top)          → y=70  (small, tracking amplio, mute)
//   AIMA LEGACY (wordmark)   → y=290 (serif, 72px, tracking 0.15em)
//   hairline dorada          → y=340 (80px ancho, gradient)
//   tagline italic           → y=395 (28px, champagne gold)
//   mini-pill (bottom)       → y=560 (small, muted, tracking)
//
// Light leak dorado: círculo difuso grande en esquina top-right,
// con filter blur → se lee como halo ambiental, no como círculo.
// ────────────────────────────────────────────────────────────

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <!-- Fondo obsidian puro -->
    <rect id="bg" width="1200" height="630" fill="${OBSIDIAN}"/>

    <!-- Light leak dorado difuso (radial gradient en esquina top-right) -->
    <radialGradient id="lightLeak" cx="0.88" cy="0.12" r="0.65">
      <stop offset="0%" stop-color="rgba(232,213,168,0.22)"/>
      <stop offset="35%" stop-color="rgba(232,213,168,0.10)"/>
      <stop offset="70%" stop-color="rgba(232,213,168,0.03)"/>
      <stop offset="100%" stop-color="rgba(232,213,168,0)"/>
    </radialGradient>

    <!-- Hairline dorada: gradient transparent → gold → transparent -->
    <linearGradient id="hairline" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0"/>
      <stop offset="50%" stop-color="${GOLD}" stop-opacity="1"/>
      <stop offset="100%" stop-color="${GOLD}" stop-opacity="0"/>
    </linearGradient>

    <!-- Vignette muy sutil para profundidad editorial -->
    <radialGradient id="vignette" cx="0.5" cy="0.5" r="0.9">
      <stop offset="60%" stop-color="rgba(0,0,0,0)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0.35)"/>
    </radialGradient>

    <!-- Filter para suavizar el light leak (doble capa de blur ambiental) -->
    <filter id="softLeak" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="30"/>
    </filter>
  </defs>

  <!-- Fondo obsidian -->
  <rect width="1200" height="630" fill="${OBSIDIAN}"/>

  <!-- Light leak dorado (top-right) con blur suave -->
  <rect width="1200" height="630" fill="url(#lightLeak)"/>

  <!-- Vignette editorial (bordes ligeramente más oscuros) -->
  <rect width="1200" height="630" fill="url(#vignette)"/>

  <!-- Mini-pill superior (eyebrow) — pequeñito, tracking amplio, bronce desaturado -->
  <text x="600" y="90"
        font-family="'Courier New', 'Courier', monospace"
        font-size="11"
        fill="${MUTED}"
        text-anchor="middle"
        letter-spacing="4.5">
    OBSIDIAN COUTURE · EST. 2026
  </text>

  <!-- AIMA LEGACY — wordmark principal -->
  <!-- Cormorant Garamond si está en el sistema; fallback serif elegante -->
  <text x="600" y="310"
        font-family="'Cormorant Garamond', 'Playfair Display', 'Didot', 'Bodoni 72', Georgia, serif"
        font-size="88"
        font-weight="300"
        fill="${IVORY}"
        text-anchor="middle"
        letter-spacing="13.2">
    AIMA LEGACY
  </text>

  <!-- Hairline dorada de 1px, 80px ancho, centrada bajo el wordmark -->
  <rect x="560" y="352" width="80" height="1" fill="url(#hairline)"/>

  <!-- Tagline italic serif en champagne gold -->
  <text x="600" y="408"
        font-family="'Cormorant Garamond', 'Playfair Display', 'Didot', Georgia, serif"
        font-size="30"
        font-style="italic"
        font-weight="400"
        fill="${GOLD}"
        text-anchor="middle"
        letter-spacing="1.2">
    Estudio de sistemas de IA
  </text>

  <!-- Mini-pill inferior — rango de clientes -->
  <text x="600" y="555"
        font-family="'Courier New', 'Courier', monospace"
        font-size="12"
        fill="${MUTED}"
        text-anchor="middle"
        letter-spacing="2.9">
    — EMPRESAS Y PYMES EN ESPAÑA —
  </text>

  <!-- Marca URL muy sutil en esquina inferior derecha -->
  <text x="1140" y="595"
        font-family="'Courier New', 'Courier', monospace"
        font-size="10"
        fill="${MUTED}"
        text-anchor="end"
        letter-spacing="2">
    AIMALEGACY.ES
  </text>

  <!-- Marca copyright/año esquina inferior izquierda (simétrica) -->
  <text x="60" y="595"
        font-family="'Courier New', 'Courier', monospace"
        font-size="10"
        fill="${MUTED}"
        text-anchor="start"
        letter-spacing="2">
    MMXXVI
  </text>
</svg>`;

// ────────────────────────────────────────────────────────────
// Conversión SVG → JPG usando sharp (si está instalado)
// Fallback: escribir SVG y pedir conversión manual.
// ────────────────────────────────────────────────────────────

async function main() {
  const publicDir = path.join(projectRoot, 'public');
  if (!existsSync(publicDir)) {
    await mkdir(publicDir, { recursive: true });
  }

  // Guardar SVG como backup (siempre útil)
  const svgPath = path.join(projectRoot, 'scripts', 'og-image.svg');
  await writeFile(svgPath, svg, 'utf8');
  console.log('✓ SVG fuente guardado:', svgPath);

  // Intentar convertir con sharp
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch (err) {
    console.warn('\n⚠ sharp no está instalado en este proyecto.');
    console.warn('  Instala con: npm install --save-dev sharp');
    console.warn('  O ejecuta desde un proyecto que lo tenga.\n');
    console.warn('  El SVG se ha guardado en:', svgPath);
    console.warn('  Puedes convertirlo manualmente con cualquier herramienta.\n');
    process.exit(1);
  }

  try {
    const outputBuffer = await sharp(Buffer.from(svg))
      .jpeg({
        quality: 92,
        progressive: true,
        mozjpeg: true,
        chromaSubsampling: '4:4:4' // mejor calidad en texto y bordes finos
      })
      .toBuffer();

    await writeFile(outputPath, outputBuffer);

    const sizeKB = (outputBuffer.length / 1024).toFixed(1);
    console.log('');
    console.log('━'.repeat(60));
    console.log('✓ OG IMAGE generada con éxito');
    console.log('━'.repeat(60));
    console.log('  Ruta:        ', outputPath);
    console.log('  Dimensiones: 1200x630 (Open Graph estándar)');
    console.log('  Peso:        ', sizeKB, 'KB');
    console.log('  Calidad JPEG: 92% (mozjpeg + progressive)');
    console.log('  Chroma:       4:4:4 (sin pérdida en texto)');
    console.log('━'.repeat(60));
  } catch (err) {
    console.error('✗ Error al convertir SVG → JPG:', err.message);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('✗ Error fatal:', err);
  process.exit(1);
});
