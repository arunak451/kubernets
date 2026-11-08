// Builds the Q&A course from questions.js (exact bot questions) + qa-<domain>.js (answers).
// Lesson = 4 questions; each question = 2 scenes (Malli asks + explains, then the interview answer).
(() => {
const NAMES = { genai: "Generative AI", agentic_ai: "Agentic AI", ai_agents: "AI Agents", aws: "AWS", devops: "DevOps" };
const PER = 4;
const ql = window.QLIST, qa = window.QA || {};
const domains = Object.keys(ql.questions).filter(d => qa[d] && qa[d].length);
const items = domains.flatMap(d => ql.questions[d].map((q, i) => {
  const r = qa[d][i]; if (!r) return null;
  return { d, i, n: ql.questions[d].length, q, t: r[0], a: r[1], s: r[2], k: r[3] };
}).filter(Boolean));
const byDomain = d => items.filter(x => x.d === d);
const chunks = domains.flatMap(d => { const xs = byDomain(d), out = []; for (let i = 0; i < xs.length; i += PER) out.push(xs.slice(i, i + PER)); return out; });
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const pick = (xs, i, step) => { let j = (i + step) % xs.length; if (j === i) j = (j + 1) % xs.length; return xs[j]; };

window.CORE = () => chunks.map((c, ci) => {
  const d = c[0].d, set = chunks.slice(0, ci + 1).filter(x => x[0].d === d).length;
  const scenes = c.flatMap(x => {
    const intro = x.i === 0 ? `Vanakkam kutty! Ippo ${NAMES[d]} interview kelvigal start pannalaam. ` : "";
    const outro = x.i === x.n - 1 ? ` Super kutty, ${NAMES[d]} kelvigal ellaam mudinjuthu!` : "";
    return [
      [`${intro}Kelvi: ${x.q} ${x.t}`, { k: "q", d: ql.titles[d], q: x.q, no: `Q${x.i + 1} / ${x.n}` }],
      [`Interview la ipdi sollu. ${x.a}${outro}`, { k: "qa", q: x.q, a: x.a, kw: x.k }],
    ];
  });
  return { g: set === 1 ? ql.titles[d] : undefined, t: `${NAMES[d]} · Set ${set}`, k: c.map(x => x.k[0]).join(" · "), s: scenes };
});

window.EXTRAS = () => ({
  interview: [],
  practice: chunks.map(c => c.map(x => [
    `"${x.q}" ➜ interviewer ethirpaakura oru keyword type pannu`,
    x.k.join(", "),
    new RegExp("(" + x.k.map(esc).join("|") + ")", "i"),
    "✔ " + x.s,
    x.s,
  ])),
  quiz: chunks.map(c => {
    const pool = byDomain(c[0].d), qs = c.map(x => [x.q, x.s, pick(pool, x.i, 7).s, pick(pool, x.i, 19).s]);
    for (let j = 0; qs.length < 5; j++) { const x = c[j % c.length]; qs.push([`"${x.s}" ➜ idhu entha kelvi ku answer?`, x.q, pick(pool, x.i, 11).q, pick(pool, x.i, 23).q]); }
    return qs;
  }),
});

window.QCHUNKS = chunks;
window.MOCK = items.map(x => ({ q: x.q, a: x.a.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(Boolean), t: NAMES[x.d], l: x.d }));
})();
