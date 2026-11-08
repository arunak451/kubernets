// Level Up lessons (mid-level topics), shown after interview prep, with their practice tasks and quizzes.
window.LVL = ({ B, T, Li, Y }) => {
const K = "(kubectl|k)";
const r = s => new RegExp("^" + s.replace(/KC/g, K) + "$", "i");

const lessons = [
{g:"Level Up",t:"Kustomize: base & overlays",k:"kustomize -k",s:[
["Vanakkam kutty! Level up section ku welcome. Orey app ah dev, staging, prod la podanum. Moonu thadava YAML copy paste pannaa, oru change ku moonu idathula maathanum. Athukku Kustomize!",B("Kustomize 🧩","Base + overlays, copy paste illa")],
["School uniform maathiri. Base na ellaarukkum common uniform. Overlay na ovvoru section ku chinna maatram, badge colour maathiri. Base ah thodaama overlay mattum maathuvom.",Li("Idea",["base/","common YAML"],["overlays/dev","dev maatram"],["overlays/prod","prod maatram"])],
["Base folder la kustomization dot yaml. Entha files nu list pannu.",Y("base/kustomization.yaml",["resources:",""],["- deployment.yaml","common"],["- service.yaml","common"])],
["Prod overlay la base ah refer pannu, apram maatrangal. Replicas anju, image tag pudhusa, namespace prod.",Y("overlays/prod/kustomization.yaml",["resources: [../../base]","base edu"],["namespace: prod",""],["replicas: [{name: web, count: 5}]","5 pods"],["images: [{name: web, newTag: \"1.4.2\"}]","tag maathu"])],
["Konjam periya maatram venum na patch. Prod la memory limit mattum yethuradhu maathiri.",Y("overlays/prod/kustomization.yaml",["patches:",""],["- target: {kind: Deployment, name: web}",""],["  patch: |-",""],["    - op: replace",""],["      path: /spec/template/spec/containers/0/resources/limits/memory",""],["      value: 512Mi","prod ku adhigam"])],
["Final YAML enna varum nu paaka kubectl kustomize. Apply panna minus k. f illa, k!",T(["kubectl kustomize overlays/prod | grep -E 'replicas|image:'","  replicas: 5\n        image: web:1.4.2"],["kubectl apply -k overlays/prod","deployment.apps/web configured"])],
["Helm vs Kustomize? Helm templates um package um. Kustomize plain YAML ku patch. Argo CD rendaiyum support pannum. Sila teams rendaiyum sethu use pannuvaanga.",Li("Helm vs Kustomize",["Helm","templates + values + package"],["Kustomize","plain YAML + patches"],["kubectl","-k built in"],["Argo CD","rendum support"])],
["Recap kutty: base common, overlays per environment, patches, kubectl kustomize preview, apply minus k. Copy paste YAML ku bye bye!",Li("Recap",["base","common"],["overlay","env maatram"],["patches","fine changes"],["apply -k","deploy"])]]},

{t:"Terraform la EKS create pannu",k:"terraform init plan apply",s:[
["Hai kutty! eksctl quick ah cluster kudukkum. Aana company la infrastructure um code ah Git la irukkanum. Review pannalaam, thirumba same ah create pannalaam. Athu Terraform.",B("Terraform 🏗","Infrastructure as Code")],
["Terraform workflow naalu step. init, plan, apply, destroy. Plan thaan mukkiyam. Enna create aagum, enna delete aagum nu munnaadiye sollum.",Li("Workflow",["terraform init","providers download"],["terraform plan","enna maarum (preview)"],["terraform apply","create"],["terraform destroy","ellaam delete"])],
["EKS ku ready made module irukku. terraform aws modules eks. Cluster per, version, VPC, node group kuduthaa pothum.",Y("main.tf",["module \"eks\" {",""],["  source  = \"terraform-aws-modules/eks/aws\"","ready module"],["  cluster_name    = \"demo\"",""],["  cluster_version = \"1.31\"",""],["  vpc_id     = module.vpc.vpc_id","network"],["  subnet_ids = module.vpc.private_subnets","private subnets"],["  eks_managed_node_groups = { ng1 = { instance_types = [\"t3.medium\"], min_size = 2, max_size = 4 } }","nodes"],["}",""])],
["Mudhalla init. Providers um modules um download aagum.",T(["terraform init","Initializing modules...\nInitializing provider plugins...\nTerraform has been successfully initialized!"])],
["Apram plan. Ethana resources create aagum nu sollum. Pull request la ithai post panni team review pannuvaanga.",T(["terraform plan -out=tfplan","Plan: 57 to add, 0 to change, 0 to destroy."])],
["Apply pannaa cluster ready. Apram kubeconfig update panni kubectl use pannu.",T(["terraform apply tfplan","Apply complete! Resources: 57 added, 0 changed, 0 destroyed."],["aws eks update-kubeconfig --name demo --region ap-south-1","Added new context arn:aws:eks:ap-south-1:1234:cluster/demo"])],
["State file romba mukkiyam kutty. Terraform enna create pannuchu nu athula irukkum. Laptop la vekkaadhe, Git la podaadhe. S3 backend la vechu lock pannu.",Y("backend.tf",["terraform {",""],["  backend \"s3\" {",""],["    bucket       = \"kutty-tf-state\"","state enga"],["    key          = \"eks/terraform.tfstate\"",""],["    region       = \"ap-south-1\"",""],["    use_lockfile = true","orey time la oruthar"],["  }",""],["}",""])],
["Recap kutty: init, plan, apply, remote state, module use pannu. CI la pull request ku plan, merge aana apply. Interview la Terraform plus Kubernetes combo romba demand!",Li("Recap",["module","ready EKS"],["plan","preview + review"],["state","S3 + lock"],["CI","PR ➜ plan, merge ➜ apply"])]]},

{t:"Logging: Loki & Grafana",k:"loki logql",s:[
["Vanakkam kutty! kubectl logs odura pod ku mattum thaan. Pod delete aana logs um pogum. Nooru pods la error thedanum na? Central logging venum.",B("Central logging 📚","Ellaa logs um orey idathula")],
["Rendu famous options. EFK na Elasticsearch, Fluent Bit, Kibana. Loki na Grafana oda light weight option. Inniki Loki paakalaam.",Li("Options",["EFK","Elasticsearch + Fluent Bit + Kibana"],["Loki","light, labels index mattum"],["Cloud","CloudWatch Logs"])],
["Flow: ovvoru node layum oru agent, DaemonSet ah. Athu container logs ah eduthu Loki ku anuppum. Grafana la query pannuvom.",Li("Flow",["App","stdout ku log"],["Agent (Alloy / Promtail)","DaemonSet, logs collect"],["Loki","store"],["Grafana","search + dashboard"])],
["Helm la install. Loki um agent um.",T(["helm repo add grafana https://grafana.github.io/helm-charts",""],["helm install loki grafana/loki -n logging --create-namespace -f loki-values.yaml","STATUS: deployed"],["helm install alloy grafana/alloy -n logging","STATUS: deployed"])],
["Query language per LogQL. Curly brackets la labels, apram pipe equals la word thedu. todo namespace la error lines.",Li("LogQL",["{namespace=\"todo\"}","antha namespace logs"],["|= \"error\"","error irukkura lines"],["!= \"healthz\"","noise remove"],["| json","JSON fields edu"])],
["Count kooda pannalaam. Anju nimishathula app wise ethana errors nu. Ithai vechu alert podalaam.",T(["logcli query 'sum by (app) (count_over_time({namespace=\"todo\"} |= \"error\" [5m]))'","{app=\"todo-api\"}  42"])],
["Best practices: logs ah stdout ku ezhudhu, file ku illa. JSON format la ezhudhu. Passwords log la varakoodaadhu. Retention set pannu, illana storage bill yerum.",Li("Best practices",["stdout","file illa"],["JSON","structured"],["Secrets","log la podaadhe"],["Retention","eg: 15 days"])],
["Recap kutty: agent DaemonSet, Loki store, Grafana search, LogQL. Metrics ku Prometheus, logs ku Loki, rendum Grafana la. Super combo!",Li("Recap",["Alloy / Promtail","collect"],["Loki","store"],["LogQL","{labels} |= text"],["Grafana","search"])]]},

{t:"cert-manager: auto HTTPS",k:"cert-manager letsencrypt",s:[
["Hai kutty! Website la HTTPS lock venum. Certificate kai la vaangi, 90 naal ku oru thadava renew panna marandhaa, site down! cert-manager ithai automatic ah pannum.",B("cert-manager 🔒","Free HTTPS, auto renew")],
["cert-manager oru controller. Let's Encrypt kitta irunthu free certificate vaangi, Secret la vechu, expire aagura munnaadi renew pannum.",Li("Flow",["Ingress","tls venum"],["cert-manager","Let's Encrypt kitta kekkum"],["Challenge","domain un dhaa nu prove"],["Secret","certificate ready"])],
["Helm la install. CRDs um sethu enable pannu.",T(["helm install cert-manager jetstack/cert-manager -n cert-manager --create-namespace --set crds.enabled=true","STATUS: deployed"])],
["ClusterIssuer create pannu. Let's Encrypt server, un email, HTTP challenge nginx ingress vazhiya.",Y("issuer.yaml",["kind: ClusterIssuer",""],["metadata: {name: letsencrypt-prod}",""],["spec:",""],["  acme:",""],["    server: https://acme-v02.api.letsencrypt.org/directory","Let's Encrypt"],["    email: kutty@example.com","expiry alerts"],["    privateKeySecretRef: {name: le-account}",""],["    solvers: [{http01: {ingress: {ingressClassName: nginx}}}]","HTTP challenge"])],
["Ingress la oru annotation, tls section. Avlo thaan! cert-manager meedhi ellaam paathukkum.",Y("ingress.yaml",["metadata:",""],["  annotations:",""],["    cert-manager.io/cluster-issuer: letsencrypt-prod","magic line"],["spec:",""],["  tls:",""],["  - hosts: [todo.kutty.dev]",""],["    secretName: todo-tls","cert inga varum"])],
["Certificate ready ah nu paaru. READY True na HTTPS ready!",T(["kubectl get certificate -n todo","NAME      READY  SECRET    AGE\ntodo-tls  True   todo-tls  2m"])],
["Ready aagala na describe certificate, apram challenges paaru. DNS un cluster IP ku point pannanum, port 80 open ah irukkanum. Test ku staging issuer use pannu, rate limit varaadhu.",T(["kubectl describe challenge -n todo","Reason: Waiting for HTTP-01 challenge propagation: connection refused"])],
["Recap kutty: cert-manager install, ClusterIssuer, Ingress annotation, get certificate, debug challenges. HTTPS ku ini kavalai illa!",Li("Recap",["ClusterIssuer","Let's Encrypt setup"],["annotation","cluster-issuer"],["get certificate","READY?"],["challenge","debug"])]]},

{t:"CRDs & Operators",k:"crd operator",s:[
["Vanakkam kutty! Kubernetes ku Pod, Service maathiri words theriyum. Aana namma sontha pudhu words um kathukudukkalaam. Athu thaan CRD.",B("CRD 🧠","Kubernetes ku pudhu words")],
["CRD na Custom Resource Definition. Pudhu object type. Certificate, Argo CD Application ellaam CRDs thaan. Already nee use panni irukka!",T(["kubectl get crd","NAME                              CREATED AT\napplications.argoproj.io          2026-11-01\ncertificates.cert-manager.io      2026-11-01\nclusters.postgresql.cnpg.io       2026-11-02"])],
["Ithu oru custom resource. Moonu instances oda Postgres cluster venum nu sollurom. Pod, StatefulSet ezhudha vendaam!",Y("pg.yaml",["apiVersion: postgresql.cnpg.io/v1","CRD group"],["kind: Cluster","pudhu kind"],["metadata: {name: todo-db}",""],["spec:",""],["  instances: 3","3 replicas"],["  storage: {size: 10Gi}",""])],
["Aana yaar ithai seyvaanga? Operator! Operator oru controller. Expert DBA maathiri. Create, backup, failover ellaam automatic ah pannum.",B("Operator = expert robot 🤖","CRD + controller")],
["Operator reconcile loop la odum. Desired state paakum, actual state paakum, vithiyaasam irundha fix pannum. Kubernetes ellaa controllers um ipdi thaan!",Li("Reconcile loop",["1","desired (YAML) paaru"],["2","actual (cluster) paaru"],["3","vithiyaasam? fix pannu"],["4","repeat 🔁"])],
["Operator Helm la install, apram namma custom resource apply. get clusters pottaa status theriyum.",T(["helm install cnpg cnpg/cloudnative-pg -n cnpg-system --create-namespace","STATUS: deployed"],["kubectl apply -f pg.yaml","cluster.postgresql.cnpg.io/todo-db created"],["kubectl get clusters.postgresql.cnpg.io","NAME     INSTANCES  READY  STATUS\ntodo-db  3          3      Cluster in healthy state"])],
["Famous operators: Prometheus operator, cert-manager, Argo CD, CloudNativePG, Strimzi Kafka ku. OperatorHub la neraya irukku.",Li("Examples",["Prometheus Operator","monitoring"],["cert-manager","certificates"],["CloudNativePG","Postgres"],["Strimzi","Kafka"])],
["Recap kutty: CRD pudhu object type, custom resource athoda YAML, operator controller reconcile loop. Interview la reconcile loop nu sonnaa extra marks!",Li("Recap",["CRD","pudhu kind"],["CR","antha kind oda YAML"],["Operator","controller + knowledge"],["Reconcile","desired = actual"])]]},

{t:"Service mesh: Istio basics",k:"istio mtls canary",s:[
["Hai kutty! Periya company la aimbadhu microservices. Retry, timeout, encryption, traffic split ellaam ovvoru app code layum ezhudhanumaa? Venaam! Service mesh pannum.",B("Service mesh 🕸","Network features, code maathaama")],
["Istio la ovvoru pod kulla oru sidecar proxy, Envoy. Ellaa traffic um athu vazhiya thaan pogum. istiod control plane, rules kudukkum.",Li("Istio parts",["Envoy sidecar","ovvoru pod la proxy"],["istiod","control plane"],["Features","mTLS, retries, canary, metrics"])],
["Install panni namespace ku label podu. Ini anga varra pods ku sidecar automatic ah serum.",T(["istioctl install --set profile=default -y","✔ Istio core installed\n✔ Istiod installed\n✔ Installation complete"],["kubectl label namespace todo istio-injection=enabled","namespace/todo labeled"])],
["Pods restart pannaa READY rendu by rendu. App container um Envoy um.",T(["kubectl rollout restart deploy -n todo","deployment.apps/todo-api restarted"],["kubectl get pods -n todo","NAME              READY  STATUS\ntodo-api-7f9c-a   2/2    Running"])],
["mTLS na services kulla pesura ellaame encrypt aagum, identity check um. STRICT mode podu.",Y("mtls.yaml",["apiVersion: security.istio.io/v1",""],["kind: PeerAuthentication",""],["metadata: {name: default, namespace: todo}",""],["spec:",""],["  mtls: {mode: STRICT}","encrypt kandippa"])],
["Canary release: pudhu version ku pathu percent traffic mattum. Nalla irundha konjam konjam yethu.",Y("canary.yaml",["kind: VirtualService",""],["spec:",""],["  hosts: [todo-api]",""],["  http: [{route: [",""],["    {destination: {host: todo-api, subset: v1}, weight: 90},","pazhasu 90%"],["    {destination: {host: todo-api, subset: v2}, weight: 10}]}]","pudhusu 10%"])],
["Kavanam kutty! Sidecar ku extra CPU, memory venum. Chinna setup ku mesh thevai illa. Ambient mode sidecar illaama varudhu. Linkerd innum light.",Li("Trade-offs",["Cost","extra CPU / memory"],["Complexity","learn + debug"],["Ambient mode","sidecar illa"],["Linkerd","lighter option"])],
["Recap kutty: Envoy sidecar, istiod, injection label, mTLS STRICT, VirtualService canary. Thevai irundha mattum mesh podu!",Li("Recap",["sidecar","Envoy proxy"],["mTLS","encrypt + identity"],["VirtualService","traffic split"],["Kiali","mesh graph"])]]},

{t:"Networking internals: packet payanam",k:"cni kube-proxy iptables",s:[
["Vanakkam kutty! Oru request pod la irunthu innoru pod ku epdi pogudhu? Inniki oru packet oda payanam paakalaam. Senior interview la ithu kekkuvaanga.",B("📦 Packet journey","Pod ➜ Service ➜ Pod")],
["Kubernetes network rules moonu. Ovvoru pod kum sontha IP. Ellaa pods um NAT illaama pesalaam. Ithai implement panradhu CNI plugin.",Li("Network model",["1","pod ku sontha IP"],["2","pod ➜ pod, NAT illa"],["3","node ➜ pod direct"],["Yaar?","CNI plugin"])],
["CNI pod create aagum bodhu, veth pair create panni, node oda pod CIDR la irunthu IP kudukkum. Vera node ku route illa VXLAN tunnel podum.",T(["kubectl get nodes -o custom-columns=NAME:.metadata.name,CIDR:.spec.podCIDR","NAME      CIDR\nworker-1  10.244.1.0/24\nworker-2  10.244.2.0/24"])],
["Service ClusterIP oru fake IP. Entha interface layum illa! kube proxy ovvoru node layum iptables illa IPVS rules ezhudhum. Antha IP ku vara traffic ah pod IP ku maathum.",T(["sudo iptables -t nat -L KUBE-SERVICES -n | grep todo-api","KUBE-SVC-XYZ  tcp  --  0.0.0.0/0  10.96.120.15  /* todo/todo-api */ tcp dpt:80"])],
["Full payanam: app DNS kekkum, CoreDNS ClusterIP kudukkum, iptables DNAT pod IP ku maathum, CNI route vechu antha node ku, antha pod ku.",Li("Journey",["1","DNS ➜ CoreDNS ➜ ClusterIP"],["2","iptables DNAT ➜ pod IP"],["3","CNI route / tunnel ➜ node"],["4","veth ➜ pod ✔"])],
["Veliya irunthu varum bodhu, LoadBalancer, NodePort, apram same iptables. externalTrafficPolicy Local pottaa client IP maaraadhu, extra hop um illa.",Li("External",["LoadBalancer","node port ku"],["NodePort","kube-proxy rules"],["Local policy","client IP preserve"])],
["Pudhu trend eBPF. Cilium kube proxy ae illaama fast ah pannum. AWS VPC CNI la pods ku nera VPC IP kidaikkum, aana instance type ku IP limit irukku.",Li("Modern",["Cilium","eBPF, kube-proxy replace"],["AWS VPC CNI","pod = VPC IP"],["IP limit","max pods per node"])],
["Recap kutty: CNI pod IP um routing um, kube proxy service rules, CoreDNS names, iptables DNAT. Ithai diagram ah varanju explain pannaa interviewer wow nu solluvaanga!",B("🌐 Network ✔","CNI + kube-proxy + CoreDNS")]]},

{t:"Cost optimization: Karpenter & spot",k:"karpenter spot rightsizing",s:[
["Hai kutty! Cloud bill paathu manager shock aagura moment varum. DevOps engineer ku cost kuraikkaradhu um velai thaan. Vaa, kaasu save pannalaam!",B("💰 Cost","Bill kuraikkalaam")],
["Mudhal step rightsizing. Request romba adhigam vechaa, use pannaama node idam waste. kubectl top vs requests compare pannu. VPA recommendation um kudukkum.",T(["kubectl top pods -n todo","NAME            CPU(cores)  MEMORY(bytes)\ntodo-api-7f9c   35m         90Mi"],["kubectl get deploy todo-api -n todo -o jsonpath='{.spec.template.spec.containers[0].resources.requests}'","{\"cpu\":\"1\",\"memory\":\"1Gi\"}  ← romba adhigam!"])],
["Nodes ah automatic ah add remove panna rendu tools. Cluster Autoscaler node groups vechu. Karpenter pod ku sariyaana instance ah direct ah, fast ah kondu varum.",Li("Node autoscaling",["Cluster Autoscaler","node group size maathum"],["Karpenter","sariyaana instance, fast"],["Consolidation","kaali nodes remove"])],
["Karpenter NodePool la spot um on demand um allow pannu. Consolidation on pannaa, kaali aana nodes ah eduthudum.",Y("nodepool.yaml",["apiVersion: karpenter.sh/v1",""],["kind: NodePool",""],["spec:",""],["  template: {spec: {requirements: [",""],["    {key: karpenter.sh/capacity-type, operator: In, values: [spot, on-demand]}]}}","spot first"],["  disruption: {consolidationPolicy: WhenEmptyOrUnderutilized}","waste remove"],["  limits: {cpu: \"200\"}","max limit"])],
["Spot instances seventy, ninety percent cheap. Aana AWS rendu nimisha notice la thirumba edukkum. Stateless apps ku use pannu, replicas um PDB um vechuko. Database ku venaam.",Li("Spot",["Saving","70–90% 💸"],["Risk","2 min notice"],["Use","stateless + replicas"],["Avoid","databases"])],
["Raathiri dev environment yaarum use pannala na zero ku scale pannu. CronJob illa KEDA vechu automatic ah pannalaam.",T(["kubectl scale deploy --all --replicas=0 -n dev","deployment.apps/api scaled\ndeployment.apps/web scaled"])],
["Yaar evlo selavu pannuraanga nu theriyanum. Kubecost illa OpenCost namespace wise, team wise cost kaattum. Labels la team podu!",T(["kubectl cost namespace --window 7d","NAMESPACE   CPU COST  MEM COST  TOTAL\nprod        $412      $188      $600\ndev         $120      $64       $184"])],
["Recap kutty: rightsizing, Karpenter, spot, consolidation, raathiri scale down, cost visibility. Interview la naan bill ah thirty percent kuraichen nu sonnaa job confirm!",Li("Recap",["Rightsize","requests correct"],["Karpenter","smart nodes"],["Spot","stateless ku"],["OpenCost","visibility"])]]}
];

const practice = [
[["prod overlay final YAML preview","kubectl kustomize overlays/prod",r("KC kustomize overlays/prod/?"),"kind: Deployment\n  replicas: 5\n        image: web:1.4.2","build preview"],
 ["prod overlay apply pannu","kubectl apply -k overlays/prod",r("KC apply -k overlays/prod/?"),"deployment.apps/web configured","apply -k"],
 ["dev overlay delete pannu","kubectl delete -k overlays/dev",r("KC delete -k overlays/dev/?"),"deployment.apps \"web\" deleted","delete -k"],
 ["Apply panna munnaadi prod diff paaru","kubectl diff -k overlays/prod",r("KC diff -k overlays/prod/?"),"-  replicas: 3\n+  replicas: 5","diff -k"]],
[["Terraform init pannu","terraform init",/^terraform init( -upgrade)?$/i,"Terraform has been successfully initialized!","init"],
 ["Plan ah tfplan file ku save","terraform plan -out=tfplan",/^terraform plan -out[= ]tfplan$/i,"Plan: 57 to add, 0 to change, 0 to destroy.","plan"],
 ["tfplan apply pannu","terraform apply tfplan",/^terraform apply tfplan$/i,"Apply complete! Resources: 57 added","apply"],
 ["Code format check pannu","terraform fmt -check",/^terraform fmt( -check| -recursive)*$/i,"","fmt"]],
[["grafana helm repo add","helm repo add grafana https://grafana.github.io/helm-charts",/^helm repo add grafana https:\/\/grafana\.github\.io\/helm-charts\/?$/i,"\"grafana\" has been added to your repositories","repo add"],
 ["loki ah logging ns la install (values: loki-values.yaml)","helm install loki grafana/loki -n logging --create-namespace -f loki-values.yaml",/^helm install loki grafana\/loki (?=.*(-n|--namespace)[ =]logging)(?=.*(-f|--values)[ =]loki-values\.yaml).*$/i,"STATUS: deployed","Loki install"],
 ["todo namespace la error logs (logcli)","logcli query '{namespace=\"todo\"} |= \"error\"'",/^logcli query ['"]\{namespace=\\?"todo\\?"\} ?\|= ?\\?"error\\?"['"]$/i,"2026-11-08T10:42:17 todo-api ERROR db timeout","LogQL search"],
 ["Logging agent DaemonSet paaru","kubectl get ds -n logging",r("KC get (ds|daemonsets?) (-n|--namespace)[ =]logging"),"NAME   DESIRED  READY\nalloy  3        3","agent per node"]],
[["cert-manager install (crds enabled)","helm install cert-manager jetstack/cert-manager -n cert-manager --create-namespace --set crds.enabled=true",/^helm install cert-manager jetstack\/cert-manager (?=.*(-n|--namespace)[ =]cert-manager)(?=.*--set crds\.enabled=true).*$/i,"STATUS: deployed","install"],
 ["ClusterIssuers paaru","kubectl get clusterissuer",r("KC get clusterissuers?"),"NAME              READY\nletsencrypt-prod  True","issuers"],
 ["todo ns certificates paaru","kubectl get certificate -n todo",r("KC get (certificates?|cert) (-n|--namespace)[ =]todo"),"NAME      READY  SECRET\ntodo-tls  True   todo-tls","cert status"],
 ["todo ns challenges debug","kubectl describe challenge -n todo",r("KC describe challenges? (-n|--namespace)[ =]todo"),"Reason: Waiting for HTTP-01 challenge propagation","challenge debug"]],
[["CRDs list pannu","kubectl get crd",r("KC get (crd|crds|customresourcedefinitions?)"),"applications.argoproj.io\ncertificates.cert-manager.io\nclusters.postgresql.cnpg.io","CRDs"],
 ["Cluster CRD fields explain","kubectl explain clusters.postgresql.cnpg.io.spec",r("KC explain clusters\\.postgresql\\.cnpg\\.io\\.spec"),"FIELD: spec <Object>\n  instances <integer>","CR docs"],
 ["pg.yaml custom resource apply","kubectl apply -f pg.yaml",r("KC apply -f pg\\.yaml"),"cluster.postgresql.cnpg.io/todo-db created","CR create"],
 ["Postgres clusters status","kubectl get clusters.postgresql.cnpg.io",r("KC get clusters\\.postgresql\\.cnpg\\.io"),"NAME     INSTANCES  READY  STATUS\ntodo-db  3          3      Cluster in healthy state","operator status"]],
[["Istio default profile install","istioctl install --set profile=default -y",/^istioctl install (?=.*--set profile=default)(?=.*-y).*$/i,"✔ Installation complete","install"],
 ["todo ns ku sidecar injection label","kubectl label namespace todo istio-injection=enabled",r("KC label (ns|namespaces?) todo istio-injection=enabled"),"namespace/todo labeled","injection"],
 ["todo ns deployments restart","kubectl rollout restart deploy -n todo",r("KC rollout restart (deploy|deployments?) (-n|--namespace)[ =]todo"),"deployment.apps/todo-api restarted","sidecar add"],
 ["Mesh config problems analyze","istioctl analyze -n todo",/^istioctl analyze( (-n|--namespace)[ =]todo| -A)?$/i,"✔ No validation issues found when analyzing namespace: todo.","config check"]],
[["Nodes pod CIDR paaru","kubectl get nodes -o custom-columns=NAME:.metadata.name,CIDR:.spec.podCIDR",r("KC get (nodes?|no) -o custom-columns[= ]NAME:\\.metadata\\.name,CIDR:\\.spec\\.podCIDR"),"NAME      CIDR\nworker-1  10.244.1.0/24","pod CIDR"],
 ["kube-proxy pods paaru","kubectl get pods -n kube-system -l k8s-app=kube-proxy",r("KC get (pods|pod|po) (?=.*(-n|--namespace)[ =]kube-system)(?=.*(-l|--selector)[ =]k8s-app=kube-proxy).*"),"kube-proxy-x7k2p  1/1  Running","kube-proxy"],
 ["NAT table la KUBE-SERVICES paaru","sudo iptables -t nat -L KUBE-SERVICES -n",/^(sudo )?iptables -t nat -L KUBE-SERVICES( -n)?$/,"KUBE-SVC-XYZ  tcp  10.96.120.15  /* todo/todo-api */ tcp dpt:80","service rules"],
 ["todo-api endpoints (pod IPs)","kubectl get endpoints todo-api -n todo",r("KC get (ep|endpoints?) todo-api (-n|--namespace)[ =]todo"),"NAME      ENDPOINTS\ntodo-api  10.244.1.7:3000,10.244.2.9:3000","DNAT targets"]],
[["todo ns pods usage paaru","kubectl top pods -n todo",r("KC top (pods?|po) (-n|--namespace)[ =]todo"),"todo-api-7f9c   35m   90Mi","real usage"],
 ["Karpenter nodepools paaru","kubectl get nodepools",r("KC get nodepools?"),"NAME     NODECLASS  NODES  READY\ndefault  default    4      True","Karpenter"],
 ["dev ns la ellaa deployments 0 ku","kubectl scale deploy --all --replicas=0 -n dev",r("KC scale (deploy|deployments?) (?=.*--all)(?=.*--replicas[= ]0)(?=.*(-n|--namespace)[ =]dev).*"),"deployment.apps/api scaled","night scale down"],
 ["Nodes capacity-type label oda","kubectl get nodes -L karpenter.sh/capacity-type",r("KC get (nodes?|no) (-L|--label-columns)[ =]karpenter\\.sh/capacity-type"),"NAME        CAPACITY-TYPE\nip-10-0-1-5  spot\nip-10-0-2-8  on-demand","spot vs on-demand"]]
];

const quiz = [
[["Kustomize la common YAML?","base","overlay","patch"],
 ["Kustomize apply flag?","-k","-f","-p"],
 ["Environment wise changes?","overlays","templates","charts"],
 ["Final YAML preview?","kubectl kustomize dir","kubectl preview","kustomize run"],
 ["Helm vs Kustomize?","Helm templates, Kustomize patches","Rendum same","Kustomize ku server venum"]],
[["Terraform preview command?","terraform plan","terraform show-me","terraform dry"],
 ["State file enga?","Remote S3 backend + lock","Git repo","Laptop mattum"],
 ["EKS ku ready module?","terraform-aws-modules/eks","kubeadm","helm eks"],
 ["Ellaam delete?","terraform destroy","terraform rm","terraform kill"],
 ["CI la PR open aana?","terraform plan","terraform apply","Onnum illa"]],
[["kubectl logs limitation?","Pod delete aana logs pogum","Fast illa","Colour illa"],
 ["Log agent enna type?","DaemonSet","Job","StatefulSet"],
 ["Loki query language?","LogQL","PromQL","SQL"],
 ["App logs enga ezhudhanum?","stdout (JSON)","Local file","Database"],
 ["EFK la E?","Elasticsearch","Envoy","etcd"]],
[["cert-manager free certificate source?","Let's Encrypt","AWS ACM mattum","Self type"],
 ["Cluster wide issuer?","ClusterIssuer","Issuer","CertIssuer"],
 ["Ingress la enna podanum?","cluster-issuer annotation + tls","Port 443 mattum","Nothing"],
 ["Cert ready check?","kubectl get certificate","kubectl get tls","kubectl cert status"],
 ["Test ku rate limit avoid?","Staging issuer","Prod issuer","Restart"]],
[["CRD na?","Pudhu object type","Container runtime","CPU request"],
 ["Operator = ?","CRD + controller","Helm chart mattum","Node type"],
 ["Reconcile loop?","Desired vs actual compare + fix","Backup loop","Restart loop"],
 ["Argo CD Application oru?","Custom resource","Pod","Service"],
 ["Postgres operator example?","CloudNativePG","Trivy","Kiali"]],
[["Istio sidecar proxy?","Envoy","NGINX","HAProxy"],
 ["Sidecar inject label?","istio-injection=enabled","mesh=on","sidecar=true"],
 ["Pods READY 2/2 yen?","App + Envoy","2 replicas","2 nodes"],
 ["Service kulla encryption?","mTLS","Base64","TLS Ingress"],
 ["Canary 10% traffic?","VirtualService weights","HPA","PDB"]],
[["Pod IP kudukkuradhu?","CNI plugin","kube-proxy","CoreDNS"],
 ["ClusterIP ku traffic ah pod ku maathuradhu?","kube-proxy rules (iptables/IPVS)","etcd","kubelet"],
 ["Pod ➜ pod la NAT?","Illa","Eppavum","Weekend mattum"],
 ["Client IP preserve?","externalTrafficPolicy: Local","NodePort","ClusterIP"],
 ["kube-proxy ah replace panra eBPF CNI?","Cilium","Flannel","CoreDNS"]],
[["Mudhal cost step?","Rightsizing requests","Cluster delete","Bigger nodes"],
 ["Fast smart node provisioning?","Karpenter","kube-proxy","Helm"],
 ["Spot risk?","2 min notice la pogum","Slow CPU","No network"],
 ["Spot ku sariyaana workload?","Stateless + replicas","Database","Single pod"],
 ["Namespace wise cost paaka?","Kubecost / OpenCost","kubectl top","Grafana Loki"]]
];

return { lessons, practice, quiz };
};
