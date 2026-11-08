"""Copy TOP_QUESTIONS + DOMAIN_TITLES from ai-interview-prep-bot/bot.py into public/aibot/questions.js.

    python3 tools/extract-questions.py ../ai-interview-prep-bot/bot.py
"""
import ast, json, sys
from pathlib import Path

src = Path(sys.argv[1] if len(sys.argv) > 1 else "../ai-interview-prep-bot/bot.py").read_text(encoding="utf-8")
g = {}
for n in ast.parse(src).body:
    if isinstance(n, ast.Assign) and isinstance(n.targets[0], ast.Name) and n.targets[0].id in ("TOP_QUESTIONS", "DOMAIN_TITLES"):
        g[n.targets[0].id] = ast.literal_eval(n.value)
out = Path(__file__).resolve().parent.parent / "public" / "aibot" / "questions.js"
out.write_text("// Generated from ai-interview-prep-bot/bot.py (TOP_QUESTIONS, DOMAIN_TITLES) by tools/extract-questions.py. Do not edit by hand.\n"
               "window.QLIST = " + json.dumps({"titles": g["DOMAIN_TITLES"], "questions": g["TOP_QUESTIONS"]}, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")
print({k: len(v) for k, v in g["TOP_QUESTIONS"].items()})
