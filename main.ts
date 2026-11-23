// Warning Label for Humans: One Line, Big Laugh (golden-condor-22).
// Writes the single-line safety warning label to $OUTPUT_DIR/entry.txt
// (default /output) and reads it back to verify it is exactly what was
// written: one line, 1-160 characters, not only whitespace.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry is a fixed string: no input, no clock, no randomness, so two
// runs always write byte-identical output.
const ENTRY: string =
  "WARNING: This human will tell you it is five minutes away from a bed it has not yet left.";

const outputDir: string = process.env.OUTPUT_DIR ?? "/output";
const entryPath: string = join(outputDir, "entry.txt");

mkdirSync(outputDir, { recursive: true });
writeFileSync(entryPath, ENTRY, "utf8");

const readBack: string = readFileSync(entryPath, "utf8");
if (readBack !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt does not match the entry line");
}
if (ENTRY.length < 1 || ENTRY.length > 160 || ENTRY.trim().length === 0) {
  throw new Error("entry line fails the 1-160 character gate");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry line must be a single line");
}
console.log(`wrote ${entryPath} (${ENTRY.length} characters, ${Buffer.byteLength(ENTRY, "utf8")} bytes)`);
console.log(ENTRY);
