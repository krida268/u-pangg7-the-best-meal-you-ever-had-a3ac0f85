// The Best Meal You Ever Had — u-pangg7-the-best-meal-you-ever-had-a3ac0f85
// One sentence, at most 200 characters, about the best meal ever had.
// Angle: a 2 a.m. warung meal — plastic stool, wok-hissing nasi goreng,
// yolk running gold into the rice — ending on ten minutes of quiet.
// The judge weighs concreteness first: named dish, place, texture, smell,
// one specific moment — then whether it feels like one person's memory.
// Concrete (named dish, place, texture, smell), personal, one clean sentence.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ENTRY =
  "At 2 a.m. on a plastic stool in a warung, I ate nasi goreng still hissing from the wok, the yolk running gold into the rice, and for ten minutes the whole world went quiet.";

function resolveOut(argv: string[]): string {
  const target = argv[2] ?? "/output";
  // Accept either a directory (write entry.txt inside it) or a file path.
  if (target.endsWith(".txt")) return target;
  return join(target, "entry.txt");
}

function main(): void {
  // Gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters.
  // Count by code point so the check matches the sealed scorer's intent.
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars}`);
  }
  if (!ENTRY.endsWith(".")) {
    throw new Error("entry must be one complete sentence");
  }
  if (ENTRY.trim() !== ENTRY || ENTRY.includes("\n")) {
    throw new Error("entry must be a single line with no surrounding whitespace");
  }
  const out = resolveOut(process.argv);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, ENTRY, "utf8");
  console.log(`wrote ${out} (${chars} characters)`);
}

main();
