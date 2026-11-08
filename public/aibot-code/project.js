window.PROJECT = {
title: "Build & run your AI Interview Prep Bot",
intro: "Step by step setup checklist kutty. Ovvoru step mudinjadhum ✔ tick pannu, progress save aagum. Lesson 14 la Malli Akka ithe steps explain pannuvaanga.",
steps: [
{t:"1. Telegram bot create pannu", d:"Telegram la @BotFather open panni /newbot anuppu. Bot per kudu. Token kidaikkum, adhai yaarukkum kaattaadhe.",
 c:`/newbot
➜ name: Kutty Interview Bot
➜ username: kutty_interview_bot
✔ Token: 123456789:AA...   (copy, keep secret)`},
{t:"2. Chat ID edu", d:"Un bot ku 'hi' nu message anuppu. Apram getUpdates URL open panni chat.id copy pannu.",
 c:`curl https://api.telegram.org/bot<TOKEN>/getUpdates
# "chat":{"id":123456789,...}  ➜ TELEGRAM_CHAT_ID`},
{t:"3. Groq API key", d:"console.groq.com la sign in ➜ API Keys ➜ Create API Key. Free tier, card venaam.",
 c:`GROQ_API_KEY=gsk_...   (copy, keep secret)`},
{t:"4. Repo fork / clone", d:"GitHub la repo fork pannu (illa un repo ah use pannu). Local ah clone pannu.",
 c:`git clone https://github.com/<un-username>/ai-interview-prep-bot
cd ai-interview-prep-bot`},
{t:"5. Local Python setup", d:"Virtual env vechu dependencies install pannu.",
 c:`python -m venv .venv
source .venv/bin/activate      # Windows: .venv\\Scripts\\activate
pip install -r requirements.txt`},
{t:"6. Local test run", d:"Keys ah terminal la mattum export pannu (code la illa, .env gitignore la irukku). Generate apram send.",
 c:`export GROQ_API_KEY=gsk_... TELEGRAM_BOT_TOKEN=... TELEGRAM_CHAT_ID=...
python bot.py generate
FORCE_SEND=1 python bot.py send`},
{t:"7. GitHub Secrets add pannu", d:"Repo ➜ Settings ➜ Secrets and variables ➜ Actions ➜ New repository secret. Moonu secrets.",
 c:`GROQ_API_KEY
TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID
# optional variable: GROQ_MODEL = openai/gpt-oss-120b`},
{t:"8. Fresh start", d:"Un sontha bot ku history.json delete panni fresh ah start pannu.",
 c:`git rm history.json
git commit -m "Start fresh"
git push`},
{t:"9. Workflows manual ah run pannu", d:"Actions tab ➜ 'Generate tomorrow's questions' ➜ Run workflow. Apram 'Send daily questions' ➜ Run workflow. Phone la messages varudhaa paaru.",
 c:`gh workflow run generate.yml
gh workflow run send.yml
gh run list --limit 3`},
{t:"10. On-time 7 AM trigger (optional)", d:"cron-job.org la free account. Fine-grained GitHub token (Actions: write) vechu daily 06:57 IST ku intha request schedule pannu.",
 c:`POST https://api.github.com/repos/<un-username>/ai-interview-prep-bot/actions/workflows/send.yml/dispatches
Authorization: Bearer <fine-grained token>
Body: {"ref":"main"}`},
{t:"11. Customize pannu", d:"Kubernetes domain add pannu, count maathu, prompt style maathu.",
 c:`# bot.py
DOMAINS["kubernetes"] = "Kubernetes (pods, deployments, services, ingress, RBAC, troubleshooting)"
DOMAIN_TITLES["kubernetes"] = "☸️ Kubernetes"
TOP_QUESTIONS["kubernetes"] = ["What is a Pod?", "Deployment vs StatefulSet?", ...]`},
{t:"12. Improvement: unit tests", d:"build_messages, format_question ku pytest ezhudhu. Interview la 'tests ezhudhinen' nu sollalaam.",
 c:`# tests/test_messages.py
from bot import build_messages
def test_messages_under_limit():
    qs = [{"question": "Q"*300, "question_tanglish": "t", "difficulty": "Easy",
           "answer_english": "a"*500, "answer_tanglish": "b", "keywords": ["k"]}] * 10
    assert all(len(m) <= 4096 for m in build_messages("devops", qs))`},
{t:"13. README & pitch ready", d:"README la architecture diagram, sample output, engineering highlights irukku. Lesson 15 pitch ah 2 nimisham la sathama practice pannu.",
 c:`Pitch:
1. Problem + one-liner
2. Architecture (Actions ➜ bot.py ➜ Groq ➜ Telegram, history.json)
3. Highlights: structured outputs, rate limits, idempotency, fault isolation
4. Challenges ➜ fixes
5. Next steps`}
]};
