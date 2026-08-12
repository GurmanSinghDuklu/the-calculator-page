// Builds a proper multi-size favicon.ico (16/32/48) from the PNGs already
// rendered by render-icons.cjs, using a minimal hand-rolled ICO writer
// (no extra npm dependency needed).
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const pub = (f) => path.join(ROOT, "public", f);

const sizes = [16, 32, 48];
const pngBuffers = sizes.map((s) => fs.readFileSync(pub(`favicon-${s}.png`)));

// ICONDIR (6 bytes) + N * ICONDIRENTRY (16 bytes each) + PNG data appended.
const headerSize = 6 + sizes.length * 16;
let offset = headerSize;
const dirEntries = [];
for (let i = 0; i < sizes.length; i++) {
  const size = sizes[i];
  const buf = pngBuffers[i];
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 = 256)
  entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
  entry.writeUInt8(0, 2); // color palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(buf.length, 8); // size of image data
  entry.writeUInt32LE(offset, 12); // offset of image data
  dirEntries.push(entry);
  offset += buf.length;
}

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: 1 = icon
header.writeUInt16LE(sizes.length, 4); // number of images

const ico = Buffer.concat([header, ...dirEntries, ...pngBuffers]);
fs.writeFileSync(pub("favicon.ico"), ico);
console.log("wrote favicon.ico (" + ico.length + " bytes,", sizes.join("/"), "px)");
