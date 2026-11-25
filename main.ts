// One-Liner Marathon: one deadpan line about a silent retreat.
// The joke pays for silence, then breaks it with the last thing a quiet
// room should hold: a heckler who lives in the speaker's own head.
// The program drops that line into /output/entry.txt, where the sealed
// scorer checks it is 1 to 280 characters of real text.

import { mkdirSync, writeFileSync } from "node:fs";

const JOKE =
  "I paid $400 for a silent retreat and left after an hour — the voice in my head kept doing crowd work.";

const DESTINATION = "/output/entry.txt";
const LIMIT = 280;

// The gate counts code points (not UTF-16 units) and requires one line of
// real text, 1-280 characters. Count with the spread operator so the
// em-dash in the joke counts as one character, exactly as the gate counts
// it. Keep every rule in one place so the line cannot reach the file
// unchecked.
function validateLine(text: string, limit: number): string {
  const length = [...text].length;
  if (text.trim() === "") {
    throw new Error("joke is blank");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("joke must be a single line");
  }
  if (length > limit) {
    throw new Error(`joke is ${length} characters; the gate allows 1-${limit}`);
  }
  return text;
}

const joke = validateLine(JOKE, LIMIT);
const length = [...joke].length;

mkdirSync("/output", { recursive: true });
writeFileSync(DESTINATION, joke, "utf8");
console.log(`joke (${length} chars) written to ${DESTINATION}`);
console.log(joke);
