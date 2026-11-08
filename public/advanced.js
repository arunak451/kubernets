// Advanced + project lessons (shown after the 26 core lessons, before interview prep), with their practice tasks and quizzes.
// Same formats as lessons.js / extras.js.
window.ADV = ({ B, T, Li, Y }) => {
const K = "(kubectl|k)";
const r = s => new RegExp("^" + s.replace(/KC/g, K) + "$", "i");

const lessons = [
{g:"Advanced",t:"Taints, tolerations & node affinity",k:"taint toleration affinity",s:[
["Vanakkam kutty! Advanced class start. School la science lab irukku. Science students mattum thaan ange pogalaam. Kubernetes la um entha pod entha node ku pogalaam nu control pannalaam.",B("Scheduling control 🎯","nodeSelector · affinity · taints")],
["Simple vazhi nodeSelector. Node ku label podu, pod la antha label kelu. disktype ssd node la mattum intha pod pogum.",T(["kubectl label node worker-2 disktype=ssd","node/worker-2 labeled"])],
["Node affinity innum powerful. required na kandippa venum. preferred na kidaicha nalladhu, illana paravaala.",Y("node affinity",["affinity:",""],["  nodeAffinity:",""],["    requiredDuringSchedulingIgnoredDuringExecution:","kandippa"],["      nodeSelectorTerms:",""],["      - matchExpressions:",""],["        - {key: disktype, operator: In, values: [ssd]}","ssd node mattum"])],
["Pod anti affinity: orey app oda pods ah vera vera nodes la vekka. Oru node sethaa, matha node la app odum. High availability!",Y("anti-affinity",["podAntiAffinity:",""],["  preferredDuringSchedulingIgnoredDuringExecution:",""],["  - weight: 100",""],["    podAffinityTerm:",""],["      labelSelector: {matchLabels: {app: web}}","same app pods"],["      topologyKey: kubernetes.io/hostname","vera vera node"])],
["Ippo taint. Taint na node la oru no entry board. Toleration illaatha pods ange poga mudiyaadhu. GPU node maathiri special nodes ku use pannuvom.",T(["kubectl taint nodes gpu-1 gpu=true:NoSchedule","node/gpu-1 tainted"])],
["Taint ku moonu effects. NoSchedule pudhu pods varaadhu. PreferNoSchedule mudinja varaikkum varaadhu. NoExecute already irukkura pods aiyum veliya anuppum.",Li("Taint effects",["NoSchedule","pudhu pods illa"],["PreferNoSchedule","try panni avoid"],["NoExecute","irukkura pods um veliya"])],
["Toleration pod la podanum. Ithu entry pass. Kavanam kutty! Toleration ulla poga allow pannum, aana kandippa anga anuppaadhu. Athukku affinity um serthu podu.",Y("toleration",["tolerations:",""],["- key: gpu","taint key"],["  operator: Equal",""],["  value: \"true\"",""],["  effect: NoSchedule","entry pass"])],
["Recap kutty: nodeSelector simple, affinity powerful, anti affinity HA ku, taint no entry board, toleration entry pass. Control plane node la ippadi oru taint already irukkum, athaan apps ange pogaadhu!",T(["kubectl describe node control | grep Taints","Taints: node-role.kubernetes.io/control-plane:NoSchedule"])]]},

{t:"kubeadm: real cluster setup",k:"kubeadm init join",s:[
["Hai kutty! minikube oru toy school. Real company la neraya servers vechu cluster kattuvaanga. Athukku official tool kubeadm.",B("kubeadm 🏗","Real cluster kattura tool")],
["Mudhalla ellaa servers layum prepare pannanum. Swap off, containerd install, kernel settings, ports open.",Li("Prerequisites",["swapoff -a","swap off"],["containerd","runtime"],["br_netfilter","kernel module"],["6443, 10250","ports open"])],
["Apram ellaa nodes layum kubeadm, kubelet, kubectl install pannu. Version same ah irukkanum.",T(["sudo apt install -y kubelet kubeadm kubectl",""],["sudo apt-mark hold kubelet kubeadm kubectl","kubelet set on hold."])],
["Control plane node la kubeadm init. Pod network CIDR kudu. Konja neram la control plane ready aagum.",T(["sudo kubeadm init --pod-network-cidr=192.168.0.0/16","Your Kubernetes control-plane has initialized successfully!"])],
["kubectl use panna admin config ah un home ku copy pannu.",T(["mkdir -p $HOME/.kube",""],["sudo cp /etc/kubernetes/admin.conf $HOME/.kube/config",""],["sudo chown $(id -u):$(id -g) $HOME/.kube/config",""])],
["Ippo get nodes pottaa NotReady nu varum. Bayapadaadhe! CNI plugin innum podala. Calico install pannaa Ready aagum.",T(["kubectl apply -f calico.yaml","daemonset.apps/calico-node created"],["kubectl get nodes","NAME     STATUS  ROLES\ncontrol  Ready   control-plane"])],
["Worker nodes la kubeadm join. Token marandhutta, control plane la print join command pottaa pudhusa kidaikkum.",T(["kubeadm token create --print-join-command","kubeadm join 10.0.0.10:6443 --token abc.123 --discovery-token-ca-cert-hash sha256:9f2c..."])],
["Recap kutty: prepare, install, init, kubeconfig, CNI, join. Control plane components ellaam static pods ah etc kubernetes manifests folder la irukkum. Interview la ithu kekkuvaanga!",T(["ls /etc/kubernetes/manifests","etcd.yaml  kube-apiserver.yaml  kube-controller-manager.yaml  kube-scheduler.yaml"])]]},

{t:"etcd backup & restore",k:"etcdctl snapshot",s:[
["Vanakkam kutty! etcd na school register book nu sonnen la? Athu kaanaama pona, motha cluster oda memory um pogum. Athanaala backup romba mukkiyam.",B("etcd backup 💾","Register book ku xerox")],
["etcd oru static pod ah odum. Atha thoda certificates venum. Ellaam etc kubernetes pki etcd folder la irukkum.",Li("Thevaiyaanadhu",["--endpoints","https://127.0.0.1:2379"],["--cacert","ca.crt"],["--cert","server.crt"],["--key","server.key"])],
["Backup edukka etcdctl snapshot save. ETCDCTL API moonu set pannu.",T(["ETCDCTL_API=3 etcdctl snapshot save /backup/etcd.db --endpoints=https://127.0.0.1:2379 --cacert=/etc/kubernetes/pki/etcd/ca.crt --cert=/etc/kubernetes/pki/etcd/server.crt --key=/etc/kubernetes/pki/etcd/server.key","Snapshot saved at /backup/etcd.db"])],
["Backup sariyaa nu check pannu. snapshot status, table format la.",T(["etcdutl snapshot status /backup/etcd.db -w table","+----------+----------+------------+------------+\n|   HASH   | REVISION | TOTAL KEYS | TOTAL SIZE |\n| 3e4f9a21 |   184213 |       1452 |     8.2 MB |"])],
["Disaster vandha restore. Pudhu data folder ku restore pannu. Pazhaya folder ah thodaadhe.",T(["etcdutl snapshot restore /backup/etcd.db --data-dir /var/lib/etcd-restore","restored snapshot to /var/lib/etcd-restore"])],
["Apram etcd manifest la hostPath ah pudhu folder ku maathu. kubelet etcd ah automatic ah restart pannum.",Y("/etc/kubernetes/manifests/etcd.yaml",["volumes:",""],["- name: etcd-data",""],["  hostPath:",""],["    path: /var/lib/etcd-restore","pudhu folder"])],
["Backup ah daily automatic ah edu, S3 maathiri veliya copy pannu. EKS la etcd ah AWS paathukkum. Apps backup ku Velero use pannuvom.",Li("Real life",["Self managed","cron + S3"],["EKS","AWS paathukkum"],["App backup","Velero"])],
["Recap kutty: snapshot save, status check, restore pudhu folder ku, manifest update. CKA exam la ithu kandippa varum!",Li("Recap",["snapshot save","backup"],["snapshot status","verify"],["snapshot restore","pudhu data-dir"],["etcd.yaml","hostPath maathu"])]]},

{t:"Cluster upgrade (kubeadm)",k:"kubeadm upgrade drain",s:[
["Hai kutty! Kubernetes ku moonu maasathukku oru pudhu version varum. Pazhaya version ku support pogum. Athanaala upgrade theriyanum.",B("Cluster upgrade ⬆","1.30 ➜ 1.31")],
["Golden rules. Orey thadava oru minor version mattum. Mudhalla control plane, apram workers. Upgrade ku munnaadi etcd backup!",Li("Rules",["Version","1.30 ➜ 1.31 (skip illa)"],["Order","control plane ➜ workers"],["Safety","etcd backup first"])],
["Mudhalla kubeadm package ah upgrade pannu. Apram upgrade plan, enna maarum nu sollum.",T(["sudo apt install -y kubeadm=1.31.2-1.1",""],["sudo kubeadm upgrade plan","You can now apply the upgrade by executing:\n  kubeadm upgrade apply v1.31.2"])],
["Control plane la upgrade apply.",T(["sudo kubeadm upgrade apply v1.31.2","[upgrade/successful] SUCCESS! Your cluster was upgraded to \"v1.31.2\"."])],
["Node ah upgrade panra munnaadi drain pannu. Pods ellaam matha nodes ku pogum. Class ah kaali panni repair panra maathiri.",T(["kubectl drain control --ignore-daemonsets --delete-emptydir-data","node/control cordoned\nnode/control drained"])],
["kubelet um kubectl um upgrade panni, kubelet restart. Apram uncordon, thirumba pods varalaam.",T(["sudo apt install -y kubelet=1.31.2-1.1 kubectl=1.31.2-1.1",""],["sudo systemctl restart kubelet",""],["kubectl uncordon control","node/control uncordoned"])],
["Workers la kubeadm upgrade node, apram same drain, kubelet, uncordon. Oru oru node ah pannu. PodDisruptionBudget app ah down aagaama kaappaathum.",T(["sudo kubeadm upgrade node","[upgrade] The configuration for this node was successfully updated!"],["kubectl get nodes","NAME      STATUS  VERSION\ncontrol   Ready   v1.31.2\nworker-1  Ready   v1.31.2"])],
["Recap kutty: backup, kubeadm upgrade, plan, apply, drain, kubelet, uncordon, workers oru oru ah. EKS la eksctl upgrade cluster, apram nodegroup upgrade. Easy!",Li("Recap",["upgrade plan","enna maarum"],["upgrade apply","control plane"],["drain / uncordon","node maintenance"],["EKS","eksctl upgrade cluster"])]]},

{t:"EKS IAM: access entries, IRSA, Pod Identity",k:"irsa pod-identity",s:[
["Vanakkam kutty! Un app ku S3 bucket la file padikkanum. AWS access key ah code la illa Secret la podalaamaa? Venaam! EKS la safe vazhi irukku.",B("EKS IAM 🔐","Access keys hardcode pannaadhe")],
["Rendu side irukku. Manushanga cluster ku vara access entries. Pods AWS ku pogura IRSA illa Pod Identity.",Li("Rendu side",["Humans ➜ cluster","access entries (pazhasu aws-auth)"],["Pods ➜ AWS","IRSA / Pod Identity"])],
["Pudhu team member ku cluster access kudukka access entry. IAM role ah cluster policy oda connect pannu.",T(["aws eks create-access-entry --cluster-name demo --principal-arn arn:aws:iam::1234:role/devops","accessEntry created"],["aws eks associate-access-policy --cluster-name demo --principal-arn arn:aws:iam::1234:role/devops --policy-arn arn:aws:eks::aws:cluster-access-policy/AmazonEKSViewPolicy --access-scope type=cluster","associatedAccessPolicy created"])],
["IRSA na IAM Roles for Service Accounts. Mudhalla cluster ku OIDC provider. Apram eksctl ServiceAccount um IAM role um serthu create pannum.",T(["eksctl utils associate-iam-oidc-provider --cluster demo --approve","created IAM Open ID Connect provider"],["eksctl create iamserviceaccount --cluster demo --namespace app --name s3-reader --attach-policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess --approve","created serviceaccount \"app/s3-reader\""])],
["ServiceAccount la role ARN annotation irukkum. Pod intha ServiceAccount use pannaa, AWS automatic ah temporary credentials kudukkum.",Y("serviceaccount",["kind: ServiceAccount",""],["metadata:",""],["  name: s3-reader",""],["  annotations:",""],["    eks.amazonaws.com/role-arn: arn:aws:iam::1234:role/s3-reader","IAM role"])],
["Pudhu vazhi EKS Pod Identity. OIDC venaam, simple. Agent addon podu, association create pannu.",T(["aws eks create-addon --cluster-name demo --addon-name eks-pod-identity-agent","addon created"],["aws eks create-pod-identity-association --cluster-name demo --namespace app --service-account s3-reader --role-arn arn:aws:iam::1234:role/s3-reader","association created"])],
["Test pannalaam. Pod kulla sts get caller identity pottaa, namma role thaan varum.",T(["kubectl exec -n app deploy/api -- aws sts get-caller-identity","\"Arn\": \"arn:aws:sts::1234:assumed-role/s3-reader/...\""])],
["Recap kutty: humans ku access entries, pods ku IRSA illa Pod Identity, node role la ellaa permission um kudukkaadhe, least privilege. EKS interview la ithu hot topic!",Li("Recap",["Access entry","humans ➜ cluster"],["IRSA","OIDC + SA annotation"],["Pod Identity","agent + association"],["Rule","least privilege"])]]},

{t:"Troubleshooting lab: Node NotReady",k:"kubelet journalctl",s:[
["Hai kutty! Lab time. Scenario: oru node NotReady aagiduchu, athula irundha pods ellaam problem. Vaa, detective maathiri kandupidikkalaam.",B("🔧 Lab","Node NotReady")],
["Mudhalla get nodes, apram describe node. Conditions section paaru. Kubelet stopped posting status nu vandha kubelet pesala.",T(["kubectl get nodes","NAME      STATUS    ROLES\nworker-2  NotReady  <none>"],["kubectl describe node worker-2 | grep -A3 Conditions","Ready  Unknown  NodeStatusUnknown  Kubelet stopped posting node status."])],
["Node ku ssh pannu. kubelet service status paaru. Linux course la kathukitta systemctl inga use aagudhu!",T(["sudo systemctl status kubelet","● kubelet.service\n   Active: activating (auto-restart) (Result: exit-code)"])],
["Logs la unmai. journalctl minus u kubelet. Inga swap on nu error.",T(["sudo journalctl -u kubelet --no-pager | tail -3","E1108 kubelet: failed to run Kubelet: running with swap on is not supported"])],
["Fix: swap off pannu, kubelet restart. Container runtime down na containerd um restart pannu.",T(["sudo swapoff -a",""],["sudo systemctl restart containerd kubelet",""],["kubectl get nodes","NAME      STATUS  ROLES\nworker-2  Ready   <none>"])],
["Vera reasons. DiskPressure na disk full. Unused images ah clean pannu. MemoryPressure na RAM pathala.",T(["df -h /var/lib/containerd","/dev/nvme0n1p1  20G  19G  1G  95%"],["sudo crictl rmi --prune","Deleted: docker.io/library/old-app:0.9"])],
["Innum reasons: certificates expire aagirukkalaam, CNI pods crash, node network down. kubeadm certs check expiration pottu paaru.",T(["sudo kubeadm certs check-expiration","CERTIFICATE   EXPIRES                  RESIDUAL TIME\napiserver     Nov 08, 2027 09:00 UTC   364d"])],
["Recap kutty: describe node conditions, kubelet status, journalctl, swap, runtime, disk, certs, CNI. Ithu step step ah sonnaa senior engineer maathiri irukkum!",Li("Checklist",["describe node","conditions"],["systemctl status kubelet","service"],["journalctl -u kubelet","logs"],["df / crictl","disk"],["certs / CNI","others"])]]},

{t:"Troubleshooting lab: DNS & network",k:"coredns nslookup",s:[
["Vanakkam kutty! Lab rendu. App log la could not resolve host db nu varudhu. DNS problem! Vaa, step step ah paakalaam.",B("🔧 Lab","DNS / network fail")],
["Mudhalla oru test pod la nslookup. kubernetes dot default resolve aagudha nu paaru.",T(["kubectl run tmp --rm -it --image=busybox:1.36 -- nslookup kubernetes.default","Server: 10.96.0.10\n** server can't find kubernetes.default: SERVFAIL"])],
["DNS fail. CoreDNS pods paaru. Kube system namespace la k8s app equals kube dns label.",T(["kubectl get pods -n kube-system -l k8s-app=kube-dns","NAME                      READY  STATUS\ncoredns-5dd5756b68-abcde  0/1    CrashLoopBackOff"])],
["CoreDNS logs paaru. Inga Corefile config la thappu, loop detect aagudhu.",T(["kubectl logs -n kube-system -l k8s-app=kube-dns","[FATAL] plugin/loop: Loop (127.0.0.1:53 -> :53) detected"],["kubectl edit cm coredns -n kube-system",""])],
["DNS per format nyabagam vechuko. Service per, namespace, svc, cluster local. Vera namespace service ku namespace kandippa venum.",Li("DNS names",["db","same namespace"],["db.prod","vera namespace"],["db.prod.svc.cluster.local","full per"])],
["DNS ok, aana connect aagala na pod IP ku nera try pannu. Athuvum fail na CNI pods paaru. calico node crash aagirukkalaam.",T(["kubectl get pods -n kube-system -l k8s-app=calico-node","NAME               READY  STATUS\ncalico-node-x7k2p  0/1    Running"])],
["Kavanam kutty! Egress deny NetworkPolicy pottaa DNS um block aagum. Port 53 ku allow kandippa podu.",Y("allow-dns",["policyTypes: [Egress]",""],["egress:",""],["- to: [{namespaceSelector: {matchLabels: {kubernetes.io/metadata.name: kube-system}}}]","CoreDNS ku"],["  ports: [{port: 53, protocol: UDP}, {port: 53, protocol: TCP}]","DNS port"])],
["Recap kutty: nslookup test, CoreDNS pods, logs, DNS per format, pod IP test, CNI, NetworkPolicy port 53. Ulla irunthu veliya, layer by layer!",Li("Ladder",["1","nslookup"],["2","CoreDNS pods / logs"],["3","svc / endpoints"],["4","pod IP ➜ CNI"],["5","NetworkPolicy"])]]},

{g:"Project",t:"Project part 1: App ➜ Docker ➜ Kubernetes",k:"dockerfile manifests",s:[
["Hai kutty! Ippo namma sontha project. Interview la naan real ah panninen nu kaatta ithu thaan best. Oru todo API, Postgres database oda.",B("🛠 Project","todo-api + Postgres")],
["Architecture simple. User Ingress vazhiya varuvaanga. Ingress todo api service ku. API Postgres StatefulSet kitta pesum. Settings ConfigMap la, password Secret la.",Li("Architecture",["Ingress","todo.local"],["todo-api","Deployment × 2 + HPA"],["Postgres","StatefulSet + PVC"],["Config","ConfigMap + Secret"])],
["Mudhalla Dockerfile. Multi stage build. Chinna image, non root user. Ithu best practice.",Y("Dockerfile",["FROM node:20-alpine AS build","build stage"],["WORKDIR /app",""],["COPY package*.json ./",""],["RUN npm ci --omit=dev","dependencies"],["COPY . .",""],["FROM node:20-alpine","chinna final image"],["COPY --from=build /app /app",""],["USER node","root illa"],["CMD [\"node\", \"/app/server.js\"]",""])],
["Image build panni kind cluster ku load pannu. Registry illaama local ah test pannalaam.",T(["docker build -t todo-api:1.0 .","Successfully tagged todo-api:1.0"],["kind load docker-image todo-api:1.0 --name dev","Image: \"todo-api:1.0\" loaded"])],
["Repo la k8s folder vechu ovvoru object kum oru file. Clean ah irukkum.",Li("k8s/ folder",["00-namespace.yaml","todo"],["10-config.yaml","ConfigMap + Secret"],["20-postgres.yaml","StatefulSet + Service"],["30-api.yaml","Deployment + Service"],["40-ingress.yaml","Ingress"])],
["API Deployment la ellaa best practices um: replicas rendu, resources, readiness, liveness, envFrom.",Y("30-api.yaml",["replicas: 2",""],["containers:",""],["- name: api",""],["  image: todo-api:1.0","fixed tag"],["  envFrom: [{configMapRef: {name: todo-config}}, {secretRef: {name: todo-secret}}]",""],["  resources: {requests: {cpu: 100m, memory: 128Mi}, limits: {memory: 256Mi}}",""],["  readinessProbe: {httpGet: {path: /healthz, port: 3000}}",""])],
["Ellaa files aiyum orey command la apply. Apram test.",T(["kubectl apply -f k8s/","namespace/todo created\nstatefulset.apps/postgres created\ndeployment.apps/todo-api created\ningress.networking.k8s.io/todo created"],["curl http://todo.local/todos","[{\"id\":1,\"title\":\"Kubernetes padikkanum\"}]"])],
["Recap kutty: app, Dockerfile, image, k8s folder, apply, test. GitHub la README la architecture diagram um commands um podu. Part rendu la automation!",Li("Part 1 ✔",["Dockerfile","multi-stage, non-root"],["k8s/","clean manifests"],["Best practices","probes, resources, 2 replicas"],["README","diagram + steps"])]]},

{t:"Project part 2: Helm, CI/CD, Argo CD, monitoring",k:"helm actions argocd",s:[
["Vanakkam kutty! Part rendu. Ippo project ah automatic aakkalaam. Code push pannaa, test, build, deploy ellaam thaane nadakkanum.",B("🚀 Project part 2","Automation time")],
["Mudhalla Helm chart. helm create pannu, namma YAML ah templates la podu. Maarura values ah values dot yaml ku.",T(["helm create todo","Creating todo"],["helm upgrade --install todo ./todo -n todo","Release \"todo\" has been upgraded. Happy Helming!"])],
["GitHub Actions la CI. Test, image build, Trivy scan, ghcr ku push. Tag ku git SHA.",Y(".github/workflows/ci.yml",["on: {push: {branches: [main]}}",""],["steps:",""],["- run: npm test","test"],["- run: docker build -t ghcr.io/kutty/todo-api:${{ github.sha }} .","build"],["- run: trivy image --exit-code 1 --severity CRITICAL ghcr.io/kutty/todo-api:${{ github.sha }}","scan"],["- run: docker push ghcr.io/kutty/todo-api:${{ github.sha }}","push"])],
["GitOps style la CI kadaisi step, values file la pudhu tag ah update panni Git ku commit pannum. Cluster ku nera kubectl podaadhu.",T(["yq -i '.image.tag = \"9f2c1ab\"' todo/values.yaml",""],["git commit -am \"deploy 9f2c1ab\" && git push","main -> main"])],
["Argo CD install pannu. Application create pannu. Git maaruna, Argo CD cluster ah sync pannum.",T(["kubectl create ns argocd && kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml","deployment.apps/argocd-server created"],["argocd app create todo --repo https://github.com/kutty/todo --path todo --dest-server https://kubernetes.default.svc --dest-namespace todo --sync-policy automated","application 'todo' created"])],
["HPA podu, kube prometheus stack install pannu. Load test kuduthu pods scale aagaradha Grafana la paaru. Screenshot edu!",T(["kubectl autoscale deploy todo-api -n todo --cpu-percent=60 --min=2 --max=6","horizontalpodautoscaler.autoscaling/todo-api autoscaled"],["hey -z 60s http://todo.local/todos","Requests/sec: 842.3"])],
["Interview la kaattu: README la diagram, pipeline screenshot, Grafana screenshot. Enna problem vandhuchu, epdi fix panna nu oru section. Ithu thaan unmaiyaana experience.",Li("Interview la kaattu",["Diagram","architecture"],["Pipeline","CI ✔ ➜ Argo sync"],["Grafana","HPA scaling"],["Problems","enna udanjuchu, epdi fix"])],
["Congratulations kutty! Nee ippo oru full Kubernetes project mudichitta. Project guide tab la ellaa steps um checklist ah irukku. Daily konjam konjam pannu!",B("🎉 Project ready!","Project guide tab la checklist")]]}
];

const practice = [
[["worker-2 node ku disktype=ssd label","kubectl label node worker-2 disktype=ssd",r("KC label (nodes?|no) worker-2 disktype=ssd"),"node/worker-2 labeled","node label"],
 ["gpu-1 node ku gpu=true:NoSchedule taint","kubectl taint nodes gpu-1 gpu=true:NoSchedule",r("KC taint (nodes?|no) gpu-1 gpu=true:NoSchedule"),"node/gpu-1 tainted","taint add"],
 ["gpu-1 la irunthu antha taint ah remove","kubectl taint nodes gpu-1 gpu=true:NoSchedule-",r("KC taint (nodes?|no) gpu-1 gpu(=true)?:NoSchedule-"),"node/gpu-1 untainted","taint remove (-)"],
 ["Ellaa nodes taints paaru","kubectl describe nodes | grep Taints",r("KC describe (nodes?|no) \\| grep -?i? ?taints"),"Taints: node-role.kubernetes.io/control-plane:NoSchedule\nTaints: gpu=true:NoSchedule\nTaints: <none>","taints list"]],
[["Control plane init, pod CIDR 192.168.0.0/16","sudo kubeadm init --pod-network-cidr=192.168.0.0/16",/^(sudo )?kubeadm init --pod-network-cidr[= ]192\.168\.0\.0\/16$/i,"Your Kubernetes control-plane has initialized successfully!","cluster init"],
 ["admin.conf ah ~/.kube/config ku copy","sudo cp /etc/kubernetes/admin.conf $HOME/.kube/config",/^(sudo )?cp (-i )?\/etc\/kubernetes\/admin\.conf (\$HOME|~)\/\.kube\/config$/,"","kubeconfig setup"],
 ["Worker join command print pannu","kubeadm token create --print-join-command",/^(sudo )?kubeadm token create --print-join-command$/i,"kubeadm join 10.0.0.10:6443 --token abc.123 --discovery-token-ca-cert-hash sha256:9f2c...","join command"],
 ["Static pod manifests list pannu","ls /etc/kubernetes/manifests",/^(sudo )?ls( -l)? \/etc\/kubernetes\/manifests\/?$/,"etcd.yaml  kube-apiserver.yaml  kube-controller-manager.yaml  kube-scheduler.yaml","control plane static pods"]],
[["etcd snapshot /backup/etcd.db ku save (certs /etc/kubernetes/pki/etcd)","ETCDCTL_API=3 etcdctl snapshot save /backup/etcd.db --cacert=/etc/kubernetes/pki/etcd/ca.crt --cert=/etc/kubernetes/pki/etcd/server.crt --key=/etc/kubernetes/pki/etcd/server.key",/^(sudo )?(ETCDCTL_API=3 )?etcdctl snapshot save \/backup\/etcd\.db(?=.*--cacert[= ]\S+)(?=.*--cert[= ]\S+)(?=.*--key[= ]\S+).*$/,"Snapshot saved at /backup/etcd.db","etcd backup"],
 ["Snapshot ah table ah verify","etcdutl snapshot status /backup/etcd.db -w table",/^(sudo )?(etcdutl|(ETCDCTL_API=3 )?etcdctl) snapshot status \/backup\/etcd\.db( -w table| --write-out[= ]table)?$/,"| 3e4f9a21 | 184213 | 1452 | 8.2 MB |","backup check"],
 ["/var/lib/etcd-restore ku restore","etcdutl snapshot restore /backup/etcd.db --data-dir /var/lib/etcd-restore",/^(sudo )?(etcdutl|(ETCDCTL_API=3 )?etcdctl) snapshot restore \/backup\/etcd\.db --data-dir[= ]\/var\/lib\/etcd-restore$/,"restored snapshot to /var/lib/etcd-restore","etcd restore"],
 ["etcd manifest edit pannu","sudo vi /etc/kubernetes/manifests/etcd.yaml",/^(sudo )?(vi|vim|nano) \/etc\/kubernetes\/manifests\/etcd\.yaml$/,"(hostPath path: /var/lib/etcd-restore nu maathu)","hostPath update"]],
[["Upgrade plan paaru","sudo kubeadm upgrade plan",/^(sudo )?kubeadm upgrade plan$/i,"You can now apply the upgrade by executing:\n  kubeadm upgrade apply v1.31.2","upgrade plan"],
 ["Control plane ah v1.31.2 ku upgrade","sudo kubeadm upgrade apply v1.31.2",/^(sudo )?kubeadm upgrade apply v1\.31\.2( -y)?$/i,"[upgrade/successful] SUCCESS! Your cluster was upgraded to \"v1.31.2\".","upgrade apply"],
 ["worker-1 ah drain pannu (daemonsets ignore)","kubectl drain worker-1 --ignore-daemonsets",r("KC drain worker-1 --ignore-daemonsets( --delete-emptydir-data)?"),"node/worker-1 cordoned\nnode/worker-1 drained","drain"],
 ["worker-1 ah thirumba schedulable aakku","kubectl uncordon worker-1",r("KC uncordon worker-1"),"node/worker-1 uncordoned","uncordon"]],
[["demo cluster ku OIDC provider","eksctl utils associate-iam-oidc-provider --cluster demo --approve",/^eksctl utils associate-iam-oidc-provider (?=.*--cluster[= ]demo)(?=.*--approve).*$/i,"created IAM Open ID Connect provider","IRSA step 1"],
 ["app ns la s3-reader IRSA SA (AmazonS3ReadOnlyAccess)","eksctl create iamserviceaccount --cluster demo --namespace app --name s3-reader --attach-policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess --approve",/^eksctl create iamserviceaccount (?=.*--cluster[= ]demo)(?=.*--namespace[= ]app)(?=.*--name[= ]s3-reader)(?=.*--attach-policy-arn[= ]arn:aws:iam::aws:policy\/AmazonS3ReadOnlyAccess)(?=.*--approve).*$/i,"created serviceaccount \"app/s3-reader\"","IRSA SA"],
 ["s3-reader SA annotation paaru","kubectl get sa s3-reader -n app -o yaml",r("KC get (sa|serviceaccounts?) s3-reader (-n|--namespace)[ =]app -o yaml"),"annotations:\n  eks.amazonaws.com/role-arn: arn:aws:iam::1234:role/s3-reader","role annotation"],
 ["api pod la AWS identity check","kubectl exec -n app deploy/api -- aws sts get-caller-identity",r("KC exec (-n app deploy/api|deploy/api -n app) -- aws sts get-caller-identity"),"\"Arn\": \"arn:aws:sts::1234:assumed-role/s3-reader/...\"","identity test"]],
[["Nodes status paaru","kubectl get nodes",r("KC get (nodes?|no)"),"NAME      STATUS    ROLES\nworker-2  NotReady  <none>","NotReady kandupidi"],
 ["kubelet service status","sudo systemctl status kubelet",/^(sudo )?systemctl status kubelet$/,"Active: activating (auto-restart) (Result: exit-code)","kubelet status"],
 ["kubelet logs paaru","sudo journalctl -u kubelet",/^(sudo )?journalctl -u kubelet( .*)?$/,"failed to run Kubelet: running with swap on is not supported","kubelet logs"],
 ["Swap off panni kubelet restart","sudo swapoff -a && sudo systemctl restart kubelet",/^(sudo )?swapoff -a ?(&&|;) ?(sudo )?systemctl restart kubelet$/,"","fix"]],
[["busybox:1.36 test pod la kubernetes.default resolve","kubectl run tmp --rm -it --image=busybox:1.36 -- nslookup kubernetes.default",r("KC run tmp (?=.*--rm)(?=.*--image[= ]busybox(:1\\.36)?).*-- nslookup kubernetes\\.default"),"** server can't find kubernetes.default: SERVFAIL","DNS test"],
 ["CoreDNS pods paaru","kubectl get pods -n kube-system -l k8s-app=kube-dns",r("KC get (pods|pod|po) (?=.*(-n|--namespace)[ =]kube-system)(?=.*(-l|--selector)[ =]k8s-app=kube-dns).*"),"coredns-5dd5756b68-abcde  0/1  CrashLoopBackOff","CoreDNS status"],
 ["CoreDNS logs paaru","kubectl logs -n kube-system -l k8s-app=kube-dns",r("KC logs (?=.*(-n|--namespace)[ =]kube-system)(?=.*(-l|--selector)[ =]k8s-app=kube-dns).*"),"[FATAL] plugin/loop: Loop detected","CoreDNS logs"],
 ["coredns ConfigMap edit pannu","kubectl edit cm coredns -n kube-system",r("KC edit (cm|configmaps?) coredns (-n|--namespace)[ =]kube-system"),"configmap/coredns edited","Corefile fix"]],
[["todo-api:1.0 image build","docker build -t todo-api:1.0 .",/^docker build -t todo-api:1\.0 \.$/i,"Successfully tagged todo-api:1.0","image build"],
 ["Image ah kind 'dev' cluster ku load","kind load docker-image todo-api:1.0 --name dev",/^kind load docker-image todo-api:1\.0( --name[= ]dev)?$/i,"Image: \"todo-api:1.0\" loaded","kind load"],
 ["k8s/ folder full ah apply","kubectl apply -f k8s/",r("KC apply -f k8s/?"),"namespace/todo created\ndeployment.apps/todo-api created","apply folder"],
 ["todo namespace la ellaam paaru","kubectl get all -n todo",r("KC get all (-n|--namespace)[ =]todo"),"pod/todo-api-6d4c-a  1/1  Running\npod/postgres-0  1/1  Running\nservice/todo-api  ClusterIP","namespace overview"]],
[["'todo' Helm chart create","helm create todo",/^helm create todo$/i,"Creating todo","chart create"],
 ["./todo chart ah todo ns la upgrade --install","helm upgrade --install todo ./todo -n todo",/^helm upgrade (--install todo|todo --install) \.\/todo (-n|--namespace)[ =]todo$/i,"Release \"todo\" has been upgraded. Happy Helming!","helm deploy"],
 ["Image ah Trivy la CRITICAL ku scan, fail na exit 1","trivy image --exit-code 1 --severity CRITICAL todo-api:1.0",/^trivy image (?=.*--exit-code[= ]1)(?=.*--severity[= ]CRITICAL).*todo-api:1\.0.*$/i,"Total: 0 (CRITICAL: 0)","CI scan"],
 ["Argo CD todo app status","argocd app get todo",/^argocd app get todo$/i,"Sync Status: Synced\nHealth Status: Healthy","GitOps status"]]
];

const quiz = [
[["Taint na?","Node la no-entry board","Pod label","Image tag"],
 ["Toleration enna pannum?","Tainted node ku poga allow","Pod ah kandippa anga anuppum","Node delete"],
 ["Irukkura pods aiyum veliya anuppura effect?","NoExecute","NoSchedule","PreferNoSchedule"],
 ["Same app pods vera vera nodes la vekka?","podAntiAffinity","nodeSelector","toleration"],
 ["requiredDuringScheduling na?","Kandippa match aaganum","Optional","Runtime la check"]],
[["kubeadm init enga run pannuvom?","Control plane node","Ellaa workers","Laptop mattum"],
 ["Init apram nodes NotReady, yen?","CNI plugin innum podala","etcd illa","Image illa"],
 ["Join command thirumba edukka?","kubeadm token create --print-join-command","kubeadm join --show","kubectl join"],
 ["Static pod manifests enga?","/etc/kubernetes/manifests","/var/lib/pods","/home/kube"],
 ["kubeadm ku munnaadi?","swap off","firewall delete","Docker Desktop"]],
[["etcd backup command?","etcdctl snapshot save","etcdctl backup","kubectl backup etcd"],
 ["etcd backup ku enna venum?","endpoints + cacert + cert + key","Password mattum","Root SSH"],
 ["Restore pannum bodhu?","Pudhu data-dir ku restore","Pazhaya folder delete","Cluster reinstall"],
 ["Restore apram enna maathanum?","etcd.yaml hostPath","kubelet config","CoreDNS"],
 ["Apps backup tool?","Velero","Trivy","Grafana"]],
[["Upgrade order?","Control plane ➜ workers","Workers ➜ control plane","Random"],
 ["1.29 ➜ 1.31 direct ah?","Koodaadhu, oru minor at a time","Ok","Eppavum"],
 ["Node maintenance ku munnaadi?","kubectl drain","kubectl delete node","kubectl stop"],
 ["Maintenance mudinjadhum?","kubectl uncordon","kubectl start","kubectl join"],
 ["Upgrade ku munnaadi backup?","etcd backup","Images backup","Logs delete"]],
[["Pods AWS access ku safe vazhi?","IRSA / Pod Identity","Access key in Secret","Node role la admin"],
 ["IRSA ku venum?","OIDC provider + SA annotation","Ingress","Helm"],
 ["Humans ku cluster access (pudhu vazhi)?","Access entries","kubeadm token","NodePort"],
 ["Pod Identity ku addon?","eks-pod-identity-agent","coredns","metrics-server"],
 ["Pod identity test?","aws sts get-caller-identity","aws whoami","kubectl auth whoami-aws"]],
[["Node NotReady, mudhal step?","kubectl describe node (conditions)","Node delete","Cluster upgrade"],
 ["Node la kubelet status?","systemctl status kubelet","kubectl get kubelet","ps kubelet"],
 ["kubelet logs?","journalctl -u kubelet","kubectl logs kubelet","cat kubelet.log"],
 ["'swap on is not supported' fix?","swapoff -a","Reboot only","RAM add"],
 ["DiskPressure fix?","Unused images prune / disk clean","CPU add","DNS fix"]],
[["DNS test command?","nslookup from a test pod","ping google","kubectl dns"],
 ["CoreDNS label?","k8s-app=kube-dns","app=dns","dns=core"],
 ["Vera namespace service?","db.prod","db","prod-db"],
 ["Egress deny la enna allow pannanum?","Port 53 (DNS)","Port 22","Port 3306"],
 ["Pod IP la kooda fail na?","CNI problem","DNS mattum","Ingress"]],
[["Dockerfile best practice?","Multi-stage + non-root","Root user","latest base"],
 ["kind ku local image?","kind load docker-image","kubectl push","docker send"],
 ["Folder full ah apply?","kubectl apply -f k8s/","kubectl apply k8s/*","kubectl create folder"],
 ["Postgres ku workload?","StatefulSet + PVC","Deployment no PVC","DaemonSet"],
 ["DB password enga?","Secret","ConfigMap","Image la"]],
[["GitOps la CI enna pannum?","values la tag update + Git push","kubectl apply direct","Cluster delete"],
 ["Image tag?","git SHA","latest","dev"],
 ["CRITICAL vuln vandha pipeline?","Fail aaganum (exit-code 1)","Ignore","Deploy anyway"],
 ["Git ➜ cluster sync tool?","Argo CD","Trivy","kind"],
 ["Interview la kaatta?","Diagram + screenshots + problems fixed","Code mattum","Onnum venaam"]]
];

return { lessons, practice, quiz };
};
