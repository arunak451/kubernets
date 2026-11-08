// Loads lesson data from public/*.js the same way the browser does.
import fs from "node:fs"; import vm from "node:vm"; import path from "node:path";
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "public");
export function load() {
  const ctx = { window: {} }; vm.createContext(ctx);
  for (const f of ["lessons.js", "advanced.js", "extras.js"]) vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx, { filename: f });
  const B=(a,b)=>({k:"big",a,b}),T=(...l)=>({k:"term",l}),Li=(a,...r)=>({k:"list",a,r}),Y=(f,...r)=>({k:"yaml",f,r});
  const X = ctx.window.EXTRAS({ B, T, Li, Y }), A = ctx.window.ADV({ B, T, Li, Y }), core = ctx.window.CORE({ B, T, Li, Y });
  X.practice.splice(core.length, 0, ...A.practice); X.quiz.splice(core.length, 0, ...A.quiz);
  return { lessons: [...core, ...A.lessons, ...X.interview], X };
}
