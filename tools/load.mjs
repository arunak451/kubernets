// Loads lesson data from public/*.js the same way the browser does.
// COURSE=aibot (env) loads the AI Interview Q&A course (public/aibot/), COURSE=aibotcode the bot code walkthrough (public/aibot-code/).
import fs from "node:fs"; import vm from "node:vm"; import path from "node:path";
export const COURSE = process.env.COURSE || "k8s";
const pub = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "public");
export const courseDir = COURSE === "aibot" ? path.join(pub, "aibot") : COURSE === "aibotcode" ? path.join(pub, "aibot-code") : pub;
export function load() {
  const ctx = { window: {} }; vm.createContext(ctx);
  const qa = ["questions.js", ...["genai", "agentic_ai", "ai_agents", "aws", "devops"].map(d => `qa-${d}.js`).filter(f => fs.existsSync(path.join(courseDir, f))), "qa-course.js"];
  const files = COURSE === "aibot" ? qa : COURSE === "aibotcode" ? ["course.js", "extras.js"] : ["lessons.js", "advanced.js", "extras.js", "levelup.js", "mock.js"];
  for (const f of files) vm.runInContext(fs.readFileSync(path.join(courseDir, f), "utf8"), ctx, { filename: f });
  const B=(a,b)=>({k:"big",a,b}),T=(...l)=>({k:"term",l}),Li=(a,...r)=>({k:"list",a,r}),Y=(f,...r)=>({k:"yaml",f,r});
  const X = ctx.window.EXTRAS({ B, T, Li, Y }), core = ctx.window.CORE({ B, T, Li, Y });
  if (COURSE === "aibot") return { lessons: core, X, mock: ctx.window.MOCK };
  if (COURSE === "aibotcode") return { lessons: [...core, ...X.interview], X, mock: [] };
  const A = ctx.window.ADV({ B, T, Li, Y });
  X.practice.splice(core.length, 0, ...A.practice); X.quiz.splice(core.length, 0, ...A.quiz);
  const LV = ctx.window.LVL({ B, T, Li, Y }); X.practice.push(...LV.practice); X.quiz.push(...LV.quiz);
  return { lessons: [...core, ...A.lessons, ...X.interview, ...LV.lessons], X, mock: ctx.window.MOCK };
}
