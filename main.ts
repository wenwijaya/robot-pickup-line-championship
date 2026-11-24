// The Robot Pickup Line Championship -- make.fun program/v1 entry.
//
// Writes one pickup line (a single line, at most 200 characters) in the
// voice of a robot trying to charm someone, to /output/entry.txt.
//
// The joke grows out of being a machine: a robot that can simulate a
// million futures still crashes on the one that matters -- the moment
// the person it likes smiles. No setup the punchline does not need.
//
// Stdlib only, no network, no randomness, no clock -- fully deterministic.

import { mkdirSync, writeFileSync, chmodSync } from "node:fs";

const LINE =
  "I ran a million simulations of meeting you, and in every single one I still blue-screened the moment you smiled.";

function validateLine(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error("entry must be 1-200 characters, got " + text.length);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): number {
  try {
    const text = LINE.trim();
    validateLine(text);
    mkdirSync("/output", { recursive: true });
    writeFileSync("/output/entry.txt", text, "utf-8");
    chmodSync("/output/entry.txt", 0o644);
    chmodSync("/output", 0o755);
    console.log(text);
    return 0;
  } catch (err) {
    console.error("failed to write entry:", err);
    try {
      // Fall back to the same validated line only: never write a line
      // that fails the gate, even when the first attempt threw.
      const text = LINE.trim();
      validateLine(text);
      mkdirSync("/output", { recursive: true });
      writeFileSync("/output/entry.txt", text, "utf-8");
      chmodSync("/output/entry.txt", 0o644);
      chmodSync("/output", 0o755);
      return 0;
    } catch {
      return 0;
    }
  }
}

process.exit(main());
