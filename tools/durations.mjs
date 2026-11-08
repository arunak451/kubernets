// Writes public/durations.js with each lesson's real audio length (seconds), shown as ~Nm in the lesson list.
import fs from "node:fs"; import path from "node:path"; import { execFileSync } from "node:child_process"; import { load } from "./load.mjs";
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const { lessons } = load();
const dur = lessons.map((l, i) => Math.round(l.s.reduce((t, _, j) => {
  const f = path.join(root, "public", "audio", `${i + 1}-${j + 1}.mp3`);
  return t + (fs.existsSync(f) ? +execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]).toString() : 0) + 0.7;
}, 0)));
fs.writeFileSync(path.join(root, "public", "durations.js"), `window.DUR=${JSON.stringify(dur)};\n`);
console.log(dur.join(" "));
