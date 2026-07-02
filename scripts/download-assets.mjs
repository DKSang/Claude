import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ASSETS = [
  // Fonts
  { url: 'https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/69971989be3c6573c3128fd9_AnthropicSans-Roman-Web.woff2', dest: 'public/fonts/AnthropicSans-Roman-Web.woff2' },
  { url: 'https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6997198997e7c1d1fb995bd0_AnthropicSans-Italic-Web.woff2', dest: 'public/fonts/AnthropicSans-Italic-Web.woff2' },
  { url: 'https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6997199fab1923a705f0042d_AnthropicSerif-Roman-Web.woff2', dest: 'public/fonts/AnthropicSerif-Roman-Web.woff2' },
  { url: 'https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/699719a0cb5e870a441e0b92_AnthropicSerif-Italic-Web.woff2', dest: 'public/fonts/AnthropicSerif-Italic-Web.woff2' },
  { url: 'https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/699719b721a24ad1b6ce2c47_AnthropicMono-Roman-Web.woff2', dest: 'public/fonts/AnthropicMono-Roman-Web.woff2' },
  { url: 'https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/699719b7bb5a31fc129a7ee7_AnthropicMono-Italic-Web.woff2', dest: 'public/fonts/AnthropicMono-Italic-Web.woff2' },
  // Images
  { url: 'https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/69e130b671817eddec5f2ec8_opus-4-7.webp', dest: 'public/images/opus-4-7.webp' },
  // Favicons
  { url: 'https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/689f4a9aff1f63fde75cf733_favicon.png', dest: 'public/seo/favicon.png' },
  { url: 'https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/68c33859cc6cd903686c66a2_apple-touch-icon.png', dest: 'public/seo/apple-touch-icon.png' },
  { url: 'https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/68c469d23594abeb9ab6ee48_70ed020ecf8fa028b9bc95fa819720b6_og_claude-generic.jpg', dest: 'public/seo/og-image.jpg' },
];

async function downloadOne(url, dest) {
  if (existsSync(dest)) {
    console.log(`SKIP (exists): ${dest}`);
    return;
  }
  try {
    const dir = path.dirname(dest);
    if (!existsSync(dir)) await mkdir(dir, { recursive: true });
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(dest, buf);
    console.log(`OK: ${dest} (${buf.length} bytes)`);
  } catch (e) {
    console.error(`FAIL: ${url} -> ${e.message}`);
  }
}

async function main() {
  const batchSize = 4;
  for (let i = 0; i < ASSETS.length; i += batchSize) {
    const batch = ASSETS.slice(i, i + batchSize);
    await Promise.all(batch.map(a => downloadOne(a.url, a.dest)));
  }
  console.log('Done.');
}

main();
