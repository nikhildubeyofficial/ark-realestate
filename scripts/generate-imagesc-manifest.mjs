/**
 * Writes src/data/imagesc-manifest.json from public/ImagesC filenames.
 * Run before `next build` so the /about route does not use fs.readdir at compile time
 * (which pulls every JPG into the Vercel serverless bundle — 300MB+ limit).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const imagesDir = path.join(root, "public", "ImagesC");
const outFile = path.join(root, "src", "data", "imagesc-manifest.json");

let files = [];
try {
  const all = fs.readdirSync(imagesDir);
  files = all
    .filter((f) => /\.(png|jpe?g|webp|gif)$/i.test(f))
    .sort();
} catch {
  files = [];
}

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify({ files }, null, 2), "utf8");
process.stdout.write(`imagesc-manifest: ${files.length} image(s) → ${path.relative(root, outFile)}\n`);
