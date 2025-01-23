import fs from "fs";
import { Buffer } from "buffer";
import { createCanvas, Image } from "canvas";
import { generateSVG } from "./AppIconTemplate.js";

const sizes = [
  { name: "favicon", size: 32 },
  { name: "pwa-64x64", size: 64 },
  { name: "pwa-192x192", size: 192 },
  { name: "pwa-512x512", size: 512 },
  { name: "apple-touch-icon", size: 180 },
  { name: "maskable-icon-512x512", size: 512, padding: 64 }, // Add padding for maskable icon
];

async function generateIcons() {
  // Ensure public directory exists
  if (!fs.existsSync("public")) {
    fs.mkdirSync("public");
  }

  // Generate PNG icons
  for (const { name, size, padding = 0 } of sizes) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext("2d");

    // For maskable icon, fill the entire canvas with the background color
    if (padding > 0) {
      ctx.fillStyle = "#0ea5e9";
      ctx.fillRect(0, 0, size, size);
    }

    // Generate SVG string
    const svgString = generateSVG(
      size - padding * 2,
      padding > 0 ? "#ffffff" : "#0ea5e9"
    );

    // Create Image from SVG
    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = `data:image/svg+xml;base64,${Buffer.from(svgString).toString(
        "base64"
      )}`;
    });

    // Draw the image centered with padding if specified
    ctx.drawImage(
      img,
      padding,
      padding,
      size - padding * 2,
      size - padding * 2
    );

    // Save the PNG
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(`public/${name}.png`, buffer);
    console.log(`Generated ${name}.png`);
  }

  // Generate SVG mask icon
  const maskIconSvg = generateSVG(512, "#000000");
  fs.writeFileSync("public/mask-icon.svg", maskIconSvg);
  console.log("Generated mask-icon.svg");

  // Generate favicon.ico (32x32)
  const faviconCanvas = createCanvas(32, 32);
  const faviconCtx = faviconCanvas.getContext("2d");
  const faviconSvg = generateSVG(32);
  const faviconImg = new Image();
  await new Promise((resolve, reject) => {
    faviconImg.onload = resolve;
    faviconImg.onerror = reject;
    faviconImg.src = `data:image/svg+xml;base64,${Buffer.from(
      faviconSvg
    ).toString("base64")}`;
  });
  faviconCtx.drawImage(faviconImg, 0, 0, 32, 32);
  const buffer = faviconCanvas.toBuffer("image/x-icon");
  fs.writeFileSync("public/favicon.ico", buffer);
  console.log("Generated favicon.ico");
}

generateIcons().catch(console.error);
