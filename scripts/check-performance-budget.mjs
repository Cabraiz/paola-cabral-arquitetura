import { readdir, stat } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const publicDirectory = fileURLToPath(new URL("../public", import.meta.url));
const imageExtensions = new Set([
  ".avif",
  ".gif",
  ".jpeg",
  ".jpg",
  ".png",
  ".svg",
  ".webp",
]);
const maximumImageBytes = 600 * 1024;
const maximumCoreBytes = 3 * 1024 * 1024;
const maximumTotalBytes = 4.1 * 1024 * 1024;
const excludedFromPagePayload = new Set(["og.jpg"]);

async function collectImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const images = [];

  for (const entry of entries) {
    const absolutePath = join(directory, entry.name);

    if (entry.isDirectory()) {
      images.push(...(await collectImages(absolutePath)));
      continue;
    }

    if (imageExtensions.has(extname(entry.name).toLowerCase())) {
      const metadata = await stat(absolutePath);
      const imagePath = relative(publicDirectory, absolutePath);

      if (excludedFromPagePayload.has(imagePath)) {
        continue;
      }

      images.push({
        bytes: metadata.size,
        path: imagePath,
      });
    }
  }

  return images;
}

const images = await collectImages(publicDirectory);
const totalBytes = images.reduce((total, image) => total + image.bytes, 0);
const coreBytes = images
  .filter(
    (image) =>
      !(image.path.includes("-desktop-") && image.path.includes("-hq.")),
  )
  .reduce((total, image) => total + image.bytes, 0);
const oversizedImages = images.filter(
  (image) => image.bytes > maximumImageBytes,
);

if (
  oversizedImages.length > 0 ||
  coreBytes > maximumCoreBytes ||
  totalBytes > maximumTotalBytes
) {
  for (const image of oversizedImages) {
    console.error(
      `${image.path} ultrapassa o limite: ${(image.bytes / 1024).toFixed(1)} KB`,
    );
  }

  if (coreBytes > maximumCoreBytes) {
    console.error(
      `As imagens principais somam ${(coreBytes / 1024 / 1024).toFixed(2)} MB; o limite é 3 MB.`,
    );
  }

  if (totalBytes > maximumTotalBytes) {
    console.error(
      `As imagens com variantes HQ de desktop somam ${(totalBytes / 1024 / 1024).toFixed(2)} MB; o limite é 4 MB.`,
    );
  }

  process.exitCode = 1;
} else {
  console.log(
    `Orçamento aprovado: ${images.length} imagens, ${(coreBytes / 1024 / 1024).toFixed(2)} MB principais e ${(totalBytes / 1024 / 1024).toFixed(2)} MB com HQ de desktop.`,
  );
}
