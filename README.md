# Malli Akka Kubernetes Class ☸

A Kubernetes course for absolute beginners on the DevOps path. Malli Akka, an animated teacher avatar, explains each concept in Tanglish with kid-style analogies and speaks the narration in natural Tamil.

Live: https://kubernets.vercel.app

- 26 core lessons (container recap ➜ architecture ➜ pods ➜ deployments ➜ services ➜ storage ➜ ingress ➜ probes ➜ HPA ➜ RBAC ➜ Helm ➜ EKS ➜ monitoring ➜ CI/CD & GitOps ➜ best practices)
- 7 advanced lessons (taints & affinity, kubeadm, etcd backup/restore, cluster upgrade, EKS IAM, Node NotReady lab, DNS/network lab)
- 2 project lessons + a 15-step **Project guide** checklist (todo-api ➜ Docker ➜ K8s ➜ Helm ➜ GitHub Actions ➜ Argo CD ➜ HPA + monitoring)
- 8 interview-prep lessons (CrashLoopBackOff, ImagePullBackOff, Pending, no traffic, OOMKilled, …)
- Each lesson: 8 scenes, a board (big text, lists, a fake `kubectl` terminal, YAML explained line by line), Tamil audio with lip sync
- Practice terminal (4 simulated `kubectl`/`helm` tasks per lesson, hint/skip/restart, praise audio), a 5-question shuffled quiz, and a searchable cheat sheet
- Progress is saved in localStorage, and the layout works on mobile

## Layout

```
public/            ← the only folder Vercel serves (vercel.json → outputDirectory)
  index.html       player, practice, quiz, cheat sheet (same structure as the Linux course)
  lessons.js       26 core lessons  [subtitle, board]
  advanced.js      advanced + project lessons with their practice & quiz
  project.js       Project guide steps
  extras.js        interview lessons, practice tasks, quizzes
  durations.js     lesson lengths (generated)
  audio/           {lesson}-{scene}.mp3 + fx-*.mp3 (generated)
tools/             NOT deployed
  ta.mjs           Tanglish subtitle ➜ Tamil-script narration (tech words stay English, K 8 S, kube control, Y A M L …)
  gen-audio.mjs    Sarvam AI TTS (bulbul:v3, kavitha, ta-IN, mp3)
  durations.mjs    measures audio ➜ public/durations.js
  check.mjs        validates lessons / practice regexes / quizzes
.env               SARVAM_API_KEY=…  (git-ignored, never deployed)
```

## Regenerating audio

```bash
cp .env.example .env    # put your Sarvam key in it
node tools/gen-audio.mjs --print 5          # preview the Tamil narration of lesson 5
node tools/gen-audio.mjs --only 5-3 --force # regenerate one scene
node tools/gen-audio.mjs --all              # everything missing
node tools/durations.mjs
node tools/check.mjs
```

## Deploy

Import this repo in Vercel (no build step; `vercel.json` serves `public/`), or run `vercel --prod`.
