// Project guide: step-by-step checklist (rendered in the "🛠 Project" view). Each step: {t: title, d: Tanglish explanation, c: commands / files}
window.PROJECT = {
title: "todo-api on Kubernetes: end-to-end DevOps project",
intro: "Ithu un portfolio project kutty. Ovvoru step mudinjadhum ✔ tick pannu, progress save aagum. Mudinjadhum GitHub la podu, resume la link kudu. Lessons 34 & 35 la ithe project ah Malli Akka explain pannuvaanga.",
steps: [
{t:"1. Repo & tools ready pannu", d:"GitHub la 'todo-k8s' nu pudhu repo create pannu. Laptop la Docker, kubectl, kind, helm install pannu.",
 c:`git clone https://github.com/<un-username>/todo-k8s && cd todo-k8s
kind create cluster --name dev
kubectl get nodes`},
{t:"2. Simple API ezhudhu", d:"Node.js (illa un favourite language) la oru chinna API: GET /todos, POST /todos, GET /healthz. Postgres la save pannanum. DB_HOST, DB_PASS env la irunthu edukkanum.",
 c:`app/
  server.js      # express API (/todos, /healthz)
  package.json
  Dockerfile`},
{t:"3. Dockerfile (multi-stage, non-root)", d:"Chinna image, root illaama odanum. Fixed version tag use pannu.",
 c:`FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app /app
USER node
EXPOSE 3000
CMD ["node", "server.js"]`},
{t:"4. Build & kind ku load", d:"Registry illaama local cluster la test pannalaam.",
 c:`docker build -t todo-api:1.0 ./app
kind load docker-image todo-api:1.0 --name dev`},
{t:"5. Namespace, ConfigMap, Secret", d:"Settings ConfigMap la, password Secret la. Secret YAML ah Git la podaadhe, command la create pannu.",
 c:`kubectl create namespace todo
kubectl create configmap todo-config -n todo --from-literal=DB_HOST=postgres --from-literal=PORT=3000
kubectl create secret generic todo-secret -n todo --from-literal=DB_PASS='change-me'`},
{t:"6. Postgres StatefulSet + PVC", d:"Database ku StatefulSet, volumeClaimTemplates vechu ovvoru pod kum thaniya storage. Headless service venum.",
 c:`# k8s/20-postgres.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata: {name: postgres, namespace: todo}
spec:
  serviceName: postgres
  replicas: 1
  selector: {matchLabels: {app: postgres}}
  template:
    metadata: {labels: {app: postgres}}
    spec:
      containers:
      - name: postgres
        image: postgres:16
        env:
        - {name: POSTGRES_PASSWORD, valueFrom: {secretKeyRef: {name: todo-secret, key: DB_PASS}}}
        ports: [{containerPort: 5432}]
        volumeMounts: [{name: data, mountPath: /var/lib/postgresql/data}]
  volumeClaimTemplates:
  - metadata: {name: data}
    spec: {accessModes: [ReadWriteOnce], resources: {requests: {storage: 1Gi}}}
---
apiVersion: v1
kind: Service
metadata: {name: postgres, namespace: todo}
spec: {clusterIP: None, selector: {app: postgres}, ports: [{port: 5432}]}`},
{t:"7. API Deployment + Service (best practices)", d:"2 replicas, requests/limits, readiness + liveness probes, envFrom, non-root.",
 c:`# k8s/30-api.yaml
apiVersion: apps/v1
kind: Deployment
metadata: {name: todo-api, namespace: todo}
spec:
  replicas: 2
  selector: {matchLabels: {app: todo-api}}
  template:
    metadata: {labels: {app: todo-api}}
    spec:
      securityContext: {runAsNonRoot: true}
      containers:
      - name: api
        image: todo-api:1.0
        ports: [{containerPort: 3000}]
        envFrom: [{configMapRef: {name: todo-config}}, {secretRef: {name: todo-secret}}]
        resources: {requests: {cpu: 100m, memory: 128Mi}, limits: {memory: 256Mi}}
        readinessProbe: {httpGet: {path: /healthz, port: 3000}, periodSeconds: 5}
        livenessProbe: {httpGet: {path: /healthz, port: 3000}, initialDelaySeconds: 10}
---
apiVersion: v1
kind: Service
metadata: {name: todo-api, namespace: todo}
spec: {selector: {app: todo-api}, ports: [{port: 80, targetPort: 3000}]}`},
{t:"8. Ingress", d:"NGINX ingress controller install pannu, todo.local host vechu route pannu. /etc/hosts la todo.local ah 127.0.0.1 ku point pannu.",
 c:`kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
# k8s/40-ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata: {name: todo, namespace: todo}
spec:
  ingressClassName: nginx
  rules:
  - host: todo.local
    http: {paths: [{path: /, pathType: Prefix, backend: {service: {name: todo-api, port: {number: 80}}}}]}`},
{t:"9. Apply & test", d:"Ellaam apply panni test pannu. Edhaavathu fail aana, interview lessons la kathukitta debug steps use pannu, adhai README la ezhudhu!",
 c:`kubectl apply -f k8s/
kubectl get all -n todo
curl -X POST http://todo.local/todos -H 'Content-Type: application/json' -d '{"title":"Kubernetes padikkanum"}'
curl http://todo.local/todos`},
{t:"10. Helm chart", d:"k8s/ files ah Helm templates ah maathu. image.tag, replicas, resources ellaam values.yaml la.",
 c:`helm create todo
# templates/ la namma YAMLs podu, {{ .Values.image.tag }} maathiri values use pannu
helm upgrade --install todo ./todo -n todo`},
{t:"11. GitHub Actions CI", d:"Push pannaa: test ➜ build ➜ Trivy scan ➜ ghcr.io push ➜ values.yaml la tag update ➜ commit.",
 c:`# .github/workflows/ci.yml
on: {push: {branches: [main]}}
permissions: {contents: write, packages: write}
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - run: cd app && npm ci && npm test
    - uses: docker/login-action@v3
      with: {registry: ghcr.io, username: \${{ github.actor }}, password: \${{ secrets.GITHUB_TOKEN }}}
    - run: docker build -t ghcr.io/\${{ github.repository_owner }}/todo-api:\${{ github.sha }} ./app
    - uses: aquasecurity/trivy-action@0.28.0
      with: {image-ref: "ghcr.io/\${{ github.repository_owner }}/todo-api:\${{ github.sha }}", exit-code: "1", severity: CRITICAL}
    - run: docker push ghcr.io/\${{ github.repository_owner }}/todo-api:\${{ github.sha }}
    - run: |
        yq -i '.image.tag = "\${{ github.sha }}"' todo/values.yaml
        git config user.name ci-bot && git config user.email ci-bot@users.noreply.github.com
        git commit -am "deploy \${{ github.sha }}" && git push`},
{t:"12. Argo CD (GitOps)", d:"Argo CD install pannu, Git repo la irukkura todo chart ah watch panna sollu. Ippo push pannaa automatic deploy!",
 c:`kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl port-forward svc/argocd-server -n argocd 8080:443
argocd app create todo --repo https://github.com/<un-username>/todo-k8s --path todo \\
  --dest-server https://kubernetes.default.svc --dest-namespace todo --sync-policy automated --self-heal`},
{t:"13. HPA + monitoring", d:"metrics-server, HPA, kube-prometheus-stack. Load test kuduthu scaling ah Grafana la paaru, screenshot edu.",
 c:`kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
kubectl autoscale deploy todo-api -n todo --cpu-percent=60 --min=2 --max=6
helm install mon prometheus-community/kube-prometheus-stack -n monitoring --create-namespace
hey -z 60s http://todo.local/todos
kubectl get hpa -n todo -w`},
{t:"14. Security extras (bonus points)", d:"NetworkPolicy (DB ku API mattum), Pod Security restricted label, RBAC read-only ServiceAccount for CI.",
 c:`kubectl label ns todo pod-security.kubernetes.io/enforce=restricted
# k8s/50-netpol.yaml: default deny + allow app=todo-api ➜ app=postgres:5432 + DNS port 53`},
{t:"15. README & interview story", d:"README la: architecture diagram, setup commands, CI/CD flow, Grafana screenshot, 'Problems I faced & fixed' section. Interview la 2 nimisham la project ah explain panna practice pannu.",
 c:`README.md
  ## Architecture (diagram)
  ## Run locally (kind)
  ## CI/CD & GitOps flow
  ## Monitoring & autoscaling (screenshots)
  ## Problems I faced & how I fixed them
  ## Next: deploy on EKS (eksctl + IRSA)`}
]};
