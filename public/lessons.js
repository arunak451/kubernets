// Core Kubernetes lessons. Each scene: [subtitle (Tanglish), board view].
// Board views: B(big, small) · T([cmd, output], ...) · Li(title, [left, right], ...) · Y(file, [yaml line, meaning], ...)
// Subtitles are split into caption parts on . ! ? so avoid dots inside words (write "values dot yaml").
window.CORE = ({ B, T, Li, Y }) => [
{t:"Container recap & yen Kubernetes venum?",k:"docker run",s:[
["Vanakkam kutty! Naan un Malli Akka. Linux mudichitta, super! Inniki namma Kubernetes payanam start pannalaam. Mudhalla oru chinna container recap.",B("☸ Kubernetes","Malli Akka oda pudhu class")],
["Container na enna? Un app, athukku thevaiyaana ellaa saamaan um, oru tiffin box la pack panna maathiri. Enga eduthutu ponaalum same ah velai seyyum.",Li("Container = tiffin box 🍱",["App","saapadu"],["Libraries","side dish"],["Image","recipe card"],["Container","ready tiffin"])],
["Image na recipe card. Athula irunthu odura copy thaan container. docker run potta oru container start aagum.",T(["docker run -d -p 8080:80 nginx","3f9a1c2b7d4e"],["docker ps","CONTAINER ID  IMAGE  STATUS\n3f9a1c2b7d4e  nginx  Up 5 seconds"])],
["Oru container ok. Aana periya company la nooru, aayiram containers odum. Ovvonnaiyum kai la paathukka mudiyumaa? Mudiyaadhu kutty!",B("1000 containers 😵","Kai la manage panna mudiyaadhu")],
["Oru container crash aana yaar restart pannuva? Kootam vandha yaar extra containers poduvaanga? Server sethu pona yaar vera server ku maathuva?",Li("Problems",["Crash","yaar restart?"],["Kootam","yaar scale?"],["Server down","yaar move?"],["Update","downtime illaama?"])],
["Ithukku ellaam bathil Kubernetes. Ithu oru periya school principal maathiri. Ellaa students um correct ah irukkaanga la nu eppavum paathukkum.",B("Kubernetes = Principal 👩‍🏫","Containers ah automatic ah manage pannum")],
["Kubernetes ah chinna ah K8s nu solluvom. K, apram naduvula ettu letters, apram s. Google create pannadhu, ippo ellaa cloud layum irukku.",Li("K8s facts",["K8s","K + 8 letters + s"],["Create","Google"],["Ippo","CNCF open source"],["Cloud","EKS, AKS, GKE"])],
["Recap kutty: container tiffin box, image recipe, Kubernetes principal. Auto restart, auto scale, zero downtime update. Adutha class la school ah suthi paakalaam!",Li("Recap",["Container","pack panna app"],["Image","recipe"],["K8s","container principal"],["Benefit","heal, scale, update"])]]},

{t:"Kubernetes architecture",k:"control plane · nodes",s:[
["Hai kutty! Inniki Kubernetes school ah suthi paakalaam. Cluster na oru periya school. Athula rendu part irukku. Principal office, apram classrooms.",B("Cluster = periya school 🏫","Control plane + worker nodes")],
["Principal office per control plane. Ithu thaan brain. Classrooms per worker nodes. Ange thaan namma apps, athaavathu containers, odum.",Li("Cluster",["Control plane","principal office (brain)"],["Worker node","classroom"],["Pod","oru bench"],["Container","bench la student"])],
["Control plane la naalu mukkiyamaana aalunga. Mudhal API server. Ithu office reception. Nee kubectl la enna sonnaalum, mudhalla ivanga kitta thaan pogum.",B("API server","Office reception 🛎")],
["Rendaavathu etcd. Ithu school register book. Cluster la enna irukku, enna irukkanum nu ellaame inga ezhuthi vechirukkum. Ithu kaanaama pona periya problem!",B("etcd","School register book 📒")],
["Moonaavathu scheduler. Pudhu student vandha, entha classroom la idam irukku nu paathu anuppum. Naalaavathu controller manager. Count correct ah irukka nu eppavum check pannum.",Li("Control plane team",["API server","reception"],["etcd","register book"],["Scheduler","seat allot pannum"],["Controller mgr","count check pannum"])],
["Ippo classroom, athaavathu worker node. Ovvoru classroom layum moonu per. kubelet na class leader. Principal sonnatha classroom la nadakka vekkum.",B("kubelet","Class leader 🙋")],
["kube proxy na classroom oda phone line. Network traffic correct pod ku poga udhavum. Container runtime, containerd maathiri, athu thaan unmaiyaana container ah odavekkum.",Li("Worker node team",["kubelet","class leader"],["kube-proxy","phone line / network"],["containerd","container odavekkum"])],
["Recap kutty: control plane la API server, etcd, scheduler, controller manager. Node la kubelet, kube proxy, runtime. Interview la ithu kandippa kekkuvaanga!",T(["kubectl get pods -n kube-system","NAME                          READY  STATUS\netcd-minikube                 1/1    Running\nkube-apiserver-minikube       1/1    Running\nkube-scheduler-minikube       1/1    Running\nkube-controller-manager-...   1/1    Running\nkube-proxy-x7k2p              1/1    Running"])]]},

{t:"Local setup: minikube, kind, kubectl",k:"minikube kind kubectl",s:[
["Vaa kutty, ippo un laptop laye oru chinna Kubernetes school kattalaam. Practice ku periya cloud venaam. minikube illa kind pothum.",B("🏠 Local cluster","minikube / kind")],
["Mudhalla kubectl install pannanum. Ithu thaan Kubernetes kitta pesura remote control. Naama ithai kube control nu solluvom.",T(["curl -LO https://dl.k8s.io/release/v1.31.0/bin/linux/amd64/kubectl",""],["sudo install kubectl /usr/local/bin/",""],["kubectl version --client","Client Version: v1.31.0"])],
["Apram minikube. Ithu un laptop la oru single node cluster create pannum. Docker irundha pothum.",T(["minikube start --driver=docker","😄  minikube v1.34.0\n🏄  Done! kubectl is now configured to use \"minikube\""])],
["Innoru option kind. Kubernetes in Docker. Docker container kullaye nodes odum. CI pipelines la romba use pannuvaanga.",T(["kind create cluster --name dev","Creating cluster \"dev\" ...\n ✓ Ensuring node image\nSet kubectl context to \"kind-dev\""])],
["Ippo mudhal command! kubectl get nodes. School la evlo classrooms irukku nu kaattum. Ready nu vandha ellaam ok.",T(["kubectl get nodes","NAME       STATUS   ROLES           AGE   VERSION\nminikube   Ready    control-plane   2m    v1.31.0"])],
["Cluster details paaka kubectl cluster info. API server enga odudhu nu sollum.",T(["kubectl cluster-info","Kubernetes control plane is running at https://192.168.49.2:8443\nCoreDNS is running at ..."])],
["kubectl command structure simple kutty. kubectl, verb, resource, per. get, describe, create, delete ellaam verbs.",Li("kubectl grammar",["kubectl","remote control"],["get / describe","verb (enna pannanum)"],["pods / nodes","resource (yaaru)"],["nginx","per"])],
["Oru time saving tip! alias k equals kubectl vechuko. Recap: kubectl install, minikube start, get nodes. Un school ready!",T(["alias k=kubectl",""],["k get nodes","NAME       STATUS   ROLES\nminikube   Ready    control-plane"])]]},

{t:"YAML basics for Kubernetes",k:"apiVersion kind metadata spec",s:[
["Hai kutty! Kubernetes kitta enna venum nu sollanum na, oru letter ezhuthanum. Antha letter format per YAML. Simple ah padikka mudiyura format.",B("YAML 📝","Kubernetes ku letter ezhutha")],
["YAML la key colon value. Per colon Malli. Vayasu colon 25. Colon apram oru space kandippa venum.",Y("basics.yaml",["name: malli","key: value"],["age: 25","number"],["teacher: true","yes / no"])],
["Indentation thaan YAML oda uyir. Ulla irukkura items ku rendu space. Tab epavum use pannaadhe! Oru space thappu na, motha file um error.",Y("indent.yaml",["school:","parent key"],["  name: KV","2 space ulla"],["  city: Chennai","same level"])],
["List venum na minus symbol. Shopping list maathiri. Ovvoru item um minus la start aagum.",Y("list.yaml",["fruits:","list per"],["  - apple","item 1"],["  - mango","item 2"],["  - banana","item 3"])],
["Ippo Kubernetes YAML. Ellaa file layum naalu mukkiyamaana part irukkum. apiVersion, kind, metadata, spec.",Li("Big 4",["apiVersion","entha API version"],["kind","enna object"],["metadata","per, labels"],["spec","enna venum"])],
["Ithu oru pod YAML. apiVersion v1. kind Pod. metadata la per. spec la entha container, entha image nu sollurom.",Y("pod.yaml",["apiVersion: v1","API version"],["kind: Pod","object type"],["metadata:","details"],["  name: web","pod per"],["spec:","enna venum"],["  containers:","container list"],["  - name: nginx","container per"],["    image: nginx:1.27","entha image"])],
["Ithai apply panna kubectl apply minus f. f na file. Kubernetes letter padichu, sonna maathiri create pannum.",T(["kubectl apply -f pod.yaml","pod/web created"])],
["Recap kutty: key colon value, rendu space indent, list ku minus, naalu big parts. Tip: kubectl explain pod spec pottaa ellaa fields um sollum!",T(["kubectl explain pod.spec.containers","FIELD: containers <[]Container>\nDESCRIPTION: List of containers..."])]]},

{t:"Pods: create, get, describe, logs, exec",k:"kubectl run get describe logs exec",s:[
["Vanakkam kutty! Kubernetes la chinna unit pod. Pod na oru bench. Bench la utkaarura student thaan container. Usually oru bench la oru student.",B("Pod = bench 🪑","Container = bench la student")],
["Pod create panna fastest vazhi kubectl run. Per nginx, image nginx.",T(["kubectl run nginx --image=nginx","pod/nginx created"])],
["Pod odudha nu paaka kubectl get pods. Running nu vandha super. minus o wide pottaa entha node, enna IP nu um kaattum.",T(["kubectl get pods -o wide","NAME   READY  STATUS   IP          NODE\nnginx  1/1    Running  10.244.0.5  minikube"])],
["Full details venum na describe. Keela Events section irukkum. Problem vandha mudhalla ithai thaan paakanum.",T(["kubectl describe pod nginx","Name:   nginx\nStatus: Running\nEvents:\n  Scheduled  Successfully assigned default/nginx\n  Pulled     image nginx\n  Started    Started container nginx"])],
["App enna solludhu nu paaka logs. minus f pottaa live ah varum. Linux la tail minus f maathiri!",T(["kubectl logs nginx","/docker-entrypoint.sh: Configuration complete\n10.244.0.1 - GET / 200"])],
["Pod kulla poi paakanum na exec. minus it, apram rendu minus, apram sh. Container kulla oru shell kidaikkum.",T(["kubectl exec -it nginx -- sh",""],["# ls /usr/share/nginx/html","50x.html  index.html"])],
["Velai mudinjaa delete. Aana kavanam kutty! Thaniya create panna pod delete aana, thirumba varaadhu. Athukku thaan Deployment venum, adutha classes la paakalaam.",T(["kubectl delete pod nginx","pod \"nginx\" deleted"])],
["Recap: run create, get list, describe details, logs output, exec ulla po, delete. Ithu daily DevOps kit kutty!",Li("Pod commands",["run","create"],["get","list"],["describe","details + events"],["logs","app output"],["exec -it","ulla po"],["delete","eduthudu"])]]},

{t:"Labels & selectors",k:"labels -l selector",s:[
["Kutty, school la neraya students. Cricket team students ah mattum koopidanum na? Ovvoruthar kum oru badge kudukkalaam. Kubernetes la athu per label.",B("Label = badge 🏷","Key = value")],
["Label oru key value jodi. app equals web, env equals prod. Ethana labels venaalum podalaam.",Y("labels",["metadata:",""],["  name: web-1","pod per"],["  labels:","badges"],["    app: web","entha app"],["    env: prod","entha environment"])],
["Already odura pod ku label podalaam. kubectl label pod, per, apram key equals value.",T(["kubectl label pod web-1 tier=frontend","pod/web-1 labeled"])],
["Ellaa labels um paaka show labels.",T(["kubectl get pods --show-labels","NAME   STATUS   LABELS\nweb-1  Running  app=web,env=prod,tier=frontend\ndb-1   Running  app=db,env=prod"])],
["Ippo selector. Ithu badge vechu koopidradhu. minus l app equals web pottaa web pods mattum varum.",T(["kubectl get pods -l app=web","NAME   READY  STATUS\nweb-1  1/1    Running"])],
["Rendu condition um podalaam. Comma pottu. env prod um, app db um irukkura pods mattum.",T(["kubectl get pods -l env=prod,app=db","NAME  READY  STATUS\ndb-1  1/1    Running"])],
["Ithu yen mukkiyam? Service, Deployment ellaam labels vechu thaan pods ah kandupidikkum. Label thappu na, traffic pogaadhu! Interview la idhu famous.",B("Selector ↔ Label","Match aagalaa na connect aagaadhu ⚠")],
["Recap kutty: label badge, selector badge vechu thedura vazhi, minus l filter. Labels thaan Kubernetes oda glue!",Li("Recap",["label","key=value badge"],["--show-labels","ellaam kaattu"],["-l app=web","filter"],["selector","objects connect pannum"])]]},

{t:"ReplicaSets",k:"replicaset replicas",s:[
["Hai kutty! Oru pod sethu pona, yaar thirumba kondu varuva? Athukku ReplicaSet. Ithu eppavum correct count la pods irukkanum nu paathukkum.",B("ReplicaSet","Count keeper 🔢")],
["Nee moonu pods venum nu sonnaa, ReplicaSet moonu pods vechirukkum. Onnu sethaa udane pudhusa onnu create pannum. Ithu per self healing.",Li("Self healing",["Venum","3 pods"],["Onnu crash","2 thaan irukku"],["ReplicaSet","pudhusa 1 create"],["Result","thirumba 3 ✔"])],
["YAML la replicas moonu. selector la app equals web. template la pod design. Label um selector um match aaganum!",Y("rs.yaml",["kind: ReplicaSet",""],["spec:",""],["  replicas: 3","3 pods venum"],["  selector:","yaarai count pannanum"],["    matchLabels: {app: web}","indha label"],["  template:","pod design"],["    metadata: {labels: {app: web}}","match aaganum!"])],
["Apply pannittu get rs paaru. Desired moonu, current moonu, ready moonu.",T(["kubectl apply -f rs.yaml","replicaset.apps/web created"],["kubectl get rs","NAME  DESIRED  CURRENT  READY\nweb   3        3        3"])],
["Ippo test pannalaam. Oru pod ah delete pannu. Udane pudhu pod vandhudum. Magic illa kutty, ReplicaSet oda velai!",T(["kubectl delete pod web-x7k2p","pod \"web-x7k2p\" deleted"],["kubectl get pods","NAME       STATUS             AGE\nweb-a1b2c  Running            5m\nweb-d3e4f  Running            5m\nweb-q9z8y  ContainerCreating  2s"])],
["Count maatha scale command. Moonu la irunthu anju.",T(["kubectl scale rs web --replicas=5","replicaset.apps/web scaled"])],
["Aana real life la ReplicaSet ah thaniya use panna maattom. Deployment use pannuvom. Deployment ulla ReplicaSet ah thaane create pannum.",B("Deployment ➜ ReplicaSet ➜ Pods","Usually Deployment thaan use pannuvom")],
["Recap kutty: ReplicaSet count keeper, self healing, labels vechu pods ah count pannum. Adutha class Deployment, romba mukkiyam!",Li("Recap",["replicas","evlo pods"],["selector","yaarai count"],["self healing","auto replace"],["Real life","Deployment use pannu"])]]},

{t:"Deployments: create & scale",k:"create deployment scale",s:[
["Vanakkam kutty! Deployment na class teacher. Eppavum correct count la students irukkanum. Pudhu book vandha, ellaarukkum smooth ah maathi kudukkum.",B("Deployment = class teacher 👩‍🏫","Count + update rendum")],
["Deployment create panna kubectl create deployment. Per web, image nginx, replicas moonu.",T(["kubectl create deployment web --image=nginx:1.26 --replicas=3","deployment.apps/web created"])],
["Get deploy paaru. Ready moonu by moonu. Ulla ReplicaSet um, moonu pods um automatic ah create aagiduchu.",T(["kubectl get deploy,rs,pods","NAME                 READY  UP-TO-DATE  AVAILABLE\ndeployment.apps/web  3/3    3           3\nNAME                       DESIRED  READY\nreplicaset.apps/web-7c5d   3        3"])],
["Real project la YAML file thaan use pannuvom. kind Deployment, apiVersion apps slash v1.",Y("deploy.yaml",["apiVersion: apps/v1","apps group"],["kind: Deployment",""],["spec:",""],["  replicas: 3","3 copies"],["  selector: {matchLabels: {app: web}}",""],["  template:","pod design"],["    spec: {containers: [{name: web, image: nginx:1.26}]}",""])],
["Kootam adhigam aaiduchu na scale up. Ainthu pods.",T(["kubectl scale deployment web --replicas=5","deployment.apps/web scaled"],["kubectl get deploy web","NAME  READY  UP-TO-DATE  AVAILABLE\nweb   5/5    5           5"])],
["Raathiri kootam illa na scale down. Rendu pods pothum. Cloud la kammi pods na kammi bill!",T(["kubectl scale deployment web --replicas=2","deployment.apps/web scaled"])],
["YAML la replicas maathi apply pannaalum same. Ithu thaan nalla vazhi, yen na Git la record irukkum. Ithu per declarative.",Li("Rendu style",["Imperative","kubectl scale (command)"],["Declarative","YAML + apply ✔"],["DevOps choice","declarative + Git"])],
["Recap kutty: Deployment class teacher, create, get deploy, scale up, scale down. Adutha class la update um rollback um!",Li("Recap",["create deployment","pudhusa"],["get deploy","status"],["scale","count maathu"],["apply -f","declarative ✔"])]]},

{t:"Rolling updates & rollback",k:"set image · rollout status/undo",s:[
["Hai kutty! App ku pudhu version vandhuduchu. Ellaa pods aiyum orey time la niruthunaa, website down aagidum. Athukku rolling update!",B("Rolling update 🔄","Downtime illaama update")],
["Rolling update na, oru oru pod ah maathuradhu. Pudhu pod ready aanadhum thaan pazhaya pod pogum. Class la oru oru student ku pudhu book kudukkura maathiri.",Li("Step by step",["1","pudhu v2 pod start"],["2","v2 ready ✔"],["3","pazhaya v1 pod stop"],["4","repeat, ellaam v2"])],
["Image update panna kubectl set image. Deployment web, container web, pudhu image nginx 1 point 27.",T(["kubectl set image deployment/web web=nginx:1.27","deployment.apps/web image updated"])],
["Update epdi poguthu nu paaka rollout status. Live ah progress kaattum.",T(["kubectl rollout status deployment/web","Waiting for rollout: 2 of 3 updated replicas are available...\ndeployment \"web\" successfully rolled out"])],
["Ovvoru update um oru revision ah save aagum. rollout history la paakalaam.",T(["kubectl rollout history deployment/web","REVISION  CHANGE-CAUSE\n1         <none>\n2         <none>"])],
["Aiyo! Pudhu version la bug. Bayapadaadhe kutty. rollout undo. Pazhaya version ku udane thirumbi pogum.",T(["kubectl rollout undo deployment/web","deployment.apps/web rolled back"])],
["Specific revision ku poganum na minus minus to revision. YAML la maxSurge um maxUnavailable um vechu speed control pannalaam.",Y("strategy",["strategy:",""],["  type: RollingUpdate","default"],["  rollingUpdate:",""],["    maxSurge: 1","extra 1 pod podalaam"],["    maxUnavailable: 0","yaarum kuraiyakoodaadhu"])],
["Recap kutty: set image update, rollout status paaru, history revisions, undo rollback. Production la ithu un safety net!",Li("Recap",["set image","update"],["rollout status","progress"],["rollout history","revisions"],["rollout undo","rollback ⏪"])]]},

{t:"Services: ClusterIP, NodePort, LoadBalancer",k:"expose svc",s:[
["Vanakkam kutty! Pods vandhu pogum, avanga IP maarikitte irukkum. Appo epdi pesuvom? Service! Ithu school reception phone number maathiri. Number maaraadhu.",B("Service = reception ☎","Fixed per + fixed IP")],
["Service labels vechu pods ah kandupidikkum. Traffic ah ellaa pods kum share pannum. Ithu per load balancing.",Li("Service velai",["Fixed IP / DNS","maaraadhu"],["Selector","labels vechu pods"],["Load balance","traffic share"])],
["Mudhal type ClusterIP. Default type. Cluster kulla mattum pesalaam. Backend, database ku ithu thaan.",T(["kubectl expose deployment web --port=80 --target-port=8080","service/web exposed"],["kubectl get svc web","NAME  TYPE       CLUSTER-IP     PORT(S)\nweb   ClusterIP  10.96.120.15   80/TCP"])],
["port na service oda port. targetPort na pod kulla app odura port. Ithu rendum confuse aagaadhe kutty!",Y("svc.yaml",["kind: Service",""],["spec:",""],["  type: ClusterIP","default"],["  selector: {app: web}","entha pods"],["  ports:",""],["  - port: 80","service port"],["    targetPort: 8080","app port (pod)"])],
["Rendaavathu NodePort. Ovvoru node layum oru port open aagum, 30000 la irunthu 32767 kulla. Veliya irunthu node IP colon port la access pannalaam.",T(["kubectl expose deployment web --type=NodePort --port=80","service/web exposed"],["kubectl get svc web","NAME  TYPE      PORT(S)\nweb   NodePort  80:31080/TCP"])],
["Moonaavathu LoadBalancer. Cloud la oru unmaiyaana load balancer create aagum. AWS la ELB. Public IP kidaikkum.",T(["kubectl get svc web","NAME  TYPE          EXTERNAL-IP\nweb   LoadBalancer  a1b2c3.elb.amazonaws.com"])],
["Cluster kulla service per vechu thaan koopiduvom. web dot default dot svc. Ithu DNS magic. IP nyabagam vekka vendaam.",T(["kubectl exec -it client -- curl http://web","<h1>Welcome to nginx!</h1>"])],
["Recap kutty: ClusterIP ulla mattum, NodePort node port la, LoadBalancer cloud LB. port, targetPort gavanam. Endpoints la pods theriyanum!",Li("Service types",["ClusterIP","cluster ulla"],["NodePort","node IP:30000+"],["LoadBalancer","cloud LB"],["get endpoints","pods connect ah?"])]]},

{t:"Namespaces",k:"ns -n",s:[
["Hai kutty! Periya school la vera vera sections irukkum. A section, B section. Ovvoru section um thaniya. Kubernetes la athu per namespace.",B("Namespace = section 🏫","Orey cluster, thaniya idam")],
["Namespaces ah teams ku illa environments ku use pannuvom. dev, test, prod. Orey per la rendu pods vera vera namespace la irukkalaam.",Li("Use cases",["dev / test / prod","environment"],["team-a / team-b","teams"],["monitoring","tools"])],
["Default ah sila namespaces irukkum. kube system la Kubernetes oda sontha pods.",T(["kubectl get ns","NAME              STATUS  AGE\ndefault           Active  1d\nkube-node-lease   Active  1d\nkube-public       Active  1d\nkube-system       Active  1d"])],
["Pudhu namespace create panna kubectl create ns dev. ns na namespace oda short form.",T(["kubectl create namespace dev","namespace/dev created"])],
["Antha namespace la velai seyya minus n dev. Illana default namespace la thaan pogum.",T(["kubectl create deployment api --image=nginx -n dev","deployment.apps/api created"],["kubectl get pods -n dev","NAME              READY  STATUS\napi-6d4cf56db6-x  1/1    Running"])],
["Ellaa namespace layum paaka minus A. A na all namespaces.",T(["kubectl get pods -A","NAMESPACE    NAME                 STATUS\ndev          api-6d4cf56db6-x     Running\nkube-system  coredns-5dd5756b68   Running"])],
["Daily minus n poda bore aa? Default namespace ah maathalaam. set context minus minus current minus minus namespace equals dev.",T(["kubectl config set-context --current --namespace=dev","Context \"minikube\" modified."])],
["Recap kutty: namespace section, create ns, minus n, minus A. Namespace delete panna ulla irukkura ellaame pogum, kavanam!",Li("Recap",["get ns","list"],["create ns dev","pudhusa"],["-n dev","antha section la"],["-A","ellaa sections"])]]},

{t:"ConfigMaps",k:"configmap envFrom",s:[
["Vanakkam kutty! School la notice board irukkum. Ellaarum padikkalaam. Kubernetes la settings ah ipdi oru notice board la vekkalaam. Athu per ConfigMap.",B("ConfigMap = notice board 📋","Settings ah image la irunthu pirikkum")],
["Yen venum? Image la settings hardcode panna, ovvoru environment kum pudhu image build pannanum. ConfigMap la vechaa, orey image, vera vera settings.",Li("Without vs with",["Hardcode","ovvoru env ku pudhu image ✘"],["ConfigMap","orey image, settings thaniya ✔"])],
["Literal values vechu create pannalaam. from literal.",T(["kubectl create configmap app-config --from-literal=APP_ENV=prod --from-literal=LOG_LEVEL=info","configmap/app-config created"])],
["File la irunthu um create pannalaam. from file. Nginx config maathiri full file ah vekkalaam.",T(["kubectl create configmap nginx-conf --from-file=nginx.conf","configmap/nginx-conf created"],["kubectl get cm","NAME        DATA  AGE\napp-config  2     1m\nnginx-conf  1     5s"])],
["Pod la environment variables ah use panna envFrom. ConfigMap la irukkura ellaa keys um env variables aagidum.",Y("pod spec",["containers:",""],["- name: app",""],["  image: myapp:1.0",""],["  envFrom:","ellaa keys um"],["  - configMapRef:",""],["      name: app-config","antha notice board"])],
["File ah venum na volume ah mount pannalaam. ConfigMap oru folder la files ah varum.",Y("volume mount",["volumes:",""],["- name: conf",""],["  configMap: {name: nginx-conf}","source"],["containers: [{volumeMounts:",""],["  [{name: conf, mountPath: /etc/nginx/conf.d}]}]","inga files varum"])],
["Pod kulla check pannalaam. printenv pottaa namma values varum.",T(["kubectl exec app -- printenv APP_ENV","prod"])],
["Recap kutty: ConfigMap notice board, literal illa file la create, envFrom illa volume. Aana password ah inga vekkaadhe! Athukku adutha class.",Li("Recap",["--from-literal","key=value"],["--from-file","full file"],["envFrom","env variables"],["volume","files ah"])]]},

{t:"Secrets",k:"secret generic base64",s:[
["Hai kutty! Principal kitta oru locked drawer irukkum. Mukkiyamaana papers ange thaan. Kubernetes la passwords, API keys vekka Secret.",B("Secret = locked drawer 🔐","Passwords, tokens, keys")],
["Secret um ConfigMap maathiri thaan use pannuvom. Aana sensitive data ku thaniya. RBAC vechu yaar paakalaam nu control pannalaam.",Li("ConfigMap vs Secret",["ConfigMap","normal settings"],["Secret","password, keys"],["Rendum","env illa volume"])],
["Create panna kubectl create secret generic. Per db secret, password kuduthu.",T(["kubectl create secret generic db-secret --from-literal=DB_PASS=Malli@123","secret/db-secret created"])],
["Get secret yaml pannaa, value base64 la theriyum. Kavanam kutty! base64 na encryption illa. Yaar venaalum decode pannalaam.",T(["kubectl get secret db-secret -o yaml","data:\n  DB_PASS: TWFsbGlAMTIz"],["echo TWFsbGlAMTIz | base64 -d","Malli@123"])],
["Pod la secretKeyRef vechu oru key ah env variable ah edukkalaam.",Y("pod spec",["env:",""],["- name: DB_PASS","env per"],["  valueFrom:",""],["    secretKeyRef:","drawer la irunthu"],["      name: db-secret","entha secret"],["      key: DB_PASS","entha key"])],
["Docker private registry ku login venum na docker registry type secret. Ithai imagePullSecrets la kudukkanum.",T(["kubectl create secret docker-registry regcred --docker-server=ghcr.io --docker-username=kutty --docker-password=TOKEN","secret/regcred created"])],
["Production tips: Secret YAML ah Git la podaadhe. etcd encryption on pannu. AWS Secrets Manager, Vault maathiri tools use pannu.",Li("Safety tips",["Git","secret push pannaadhe ✘"],["etcd","encryption at rest"],["RBAC","yaar padikkalaam"],["Tools","Vault / Secrets Manager"])],
["Recap kutty: Secret locked drawer, generic create, base64 encryption illa, secretKeyRef, regcred. Password ah YAML la open ah ezhudhaadhe!",B("🔐 Lesson 13 ✔","base64 ≠ encryption")]]},

{t:"Volumes, PV, PVC, StorageClass",k:"pv pvc storageclass",s:[
["Vanakkam kutty! Pod sethaa ulla irukkura data um pogum. Database ku ithu periya problem. Athukku storage venum. School locker room maathiri.",B("Storage = locker room 🗄","Pod pona, data irukkanum")],
["Simple volume emptyDir. Pod irukkura varaikkum mattum. Rendu containers share panna use aagum. Pod pona athuvum pogum.",Y("emptyDir",["volumes:",""],["- name: cache",""],["  emptyDir: {}","pod oda temporary folder"])],
["Permanent storage ku PersistentVolume, PV. Ithu admin create panna oru locker. Size, access mode ellaam irukkum.",Y("pv.yaml",["kind: PersistentVolume",""],["spec:",""],["  capacity: {storage: 5Gi}","locker size"],["  accessModes: [ReadWriteOnce]","oru node mattum"],["  hostPath: {path: /data}","enga storage"])],
["App ku locker venum na PVC ezhudhanum. PersistentVolumeClaim. Ithu locker request form. Ennaku anju GB venum nu kekkum.",Y("pvc.yaml",["kind: PersistentVolumeClaim",""],["spec:",""],["  accessModes: [ReadWriteOnce]",""],["  resources:",""],["    requests: {storage: 5Gi}","5 GB venum"])],
["PVC ku match aana PV kidaicha Bound nu varum. Locker kidaichuduchu!",T(["kubectl get pv,pvc","NAME            CAPACITY  STATUS  CLAIM\npv/pv-data      5Gi       Bound   default/data\nNAME            STATUS  VOLUME   CAPACITY\npvc/data        Bound   pv-data  5Gi"])],
["Pod la PVC ah mount pannu. Pod restart aanaalum data apdiye irukkum.",Y("pod spec",["volumes:",""],["- name: data",""],["  persistentVolumeClaim:",""],["    claimName: data","PVC per"],["containers: [{volumeMounts: [{name: data, mountPath: /var/lib/mysql}]}]",""])],
["Ovvoru thadava PV kai la create pannanumaa? Illa kutty! StorageClass irundha, PVC pottadhum PV automatic ah create aagum. AWS la EBS gp3.",T(["kubectl get storageclass","NAME            PROVISIONER            RECLAIMPOLICY\ngp3 (default)   ebs.csi.aws.com        Delete\nstandard        k8s.io/minikube-hostpath  Delete"])],
["Recap kutty: emptyDir temporary, PV locker, PVC request form, StorageClass auto locker maker. Database ku ithu kandippa venum!",Li("Recap",["emptyDir","temporary"],["PV","storage piece"],["PVC","request"],["StorageClass","auto create"])]]},

{t:"Ingress & ingress controller",k:"ingress nginx",s:[
["Hai kutty! School ku oru main gate irukkum. Gate la watchman, nee entha class ku pogura nu kettu correct ah anuppuvaanga. Kubernetes la athu Ingress.",B("Ingress = main gate 🚪","Orey entry, neraya services")],
["Ovvoru service kum LoadBalancer pottaa, neraya LB, neraya bill. Ingress la orey LB, path illa domain vechu routing.",Li("Routing",["shop.com/","frontend service"],["shop.com/api","api service"],["admin.shop.com","admin service"])],
["Ingress rules mattum pothaadhu. Antha rules ah implement panna oru ingress controller venum. Popular onnu NGINX ingress controller.",T(["minikube addons enable ingress","🌟 The 'ingress' addon is enabled"],["kubectl get pods -n ingress-nginx","NAME                                       STATUS\ningress-nginx-controller-7c6974c4d8-xk2p  Running"])],
["Ithu oru Ingress YAML. ingressClassName nginx. host shop dot com. path slash api pona api service ku.",Y("ingress.yaml",["kind: Ingress",""],["spec:",""],["  ingressClassName: nginx","entha controller"],["  rules:",""],["  - host: shop.com","domain"],["    http: {paths: [{path: /api, pathType: Prefix,",""],["      backend: {service: {name: api, port: {number: 80}}}}]}","inga anuppu"])],
["Apply pannittu get ingress paaru. Address vandha ready.",T(["kubectl apply -f ingress.yaml","ingress.networking.k8s.io/shop created"],["kubectl get ingress","NAME  CLASS  HOSTS     ADDRESS        PORTS\nshop  nginx  shop.com  192.168.49.2   80"])],
["Test panna curl la Host header kudu.",T(["curl -H \"Host: shop.com\" http://192.168.49.2/api","{\"status\":\"ok\"}"])],
["HTTPS ku tls section la secret kudukkalaam. cert manager vechaa free certificate automatic ah varum.",Y("tls",["tls:",""],["- hosts: [shop.com]",""],["  secretName: shop-tls","certificate secret"])],
["Recap kutty: Ingress main gate, controller venum, host um path um vechu routing, TLS ku secret. Orey LB, neraya apps!",Li("Recap",["Ingress","routing rules"],["Controller","NGINX / ALB"],["host / path","entha service"],["tls","HTTPS"])]]},

{t:"Resource requests & limits",k:"requests limits",s:[
["Vanakkam kutty! Classroom la ovvoru student kum evlo idam venum nu theriyanum la? Kubernetes la ovvoru container kum CPU um memory um evlo venum nu sollanum.",B("Resources 📏","CPU + Memory")],
["Request na minimum guarantee. Ennaku ivlo kandippa venum. Scheduler ithai paathu thaan entha node la idam irukku nu decide pannum.",Li("Request vs Limit",["requests","minimum (guarantee)"],["limits","maximum (thaanda koodaadhu)"])],
["Limit na maximum. Ithukku mela use panna koodaadhu. Oru greedy container motha node aiyum saapida koodaadhu la!",B("Limit = maximum 🚧","Greedy container ah thadukkum")],
["CPU millicores la. 1000m na oru full CPU. 250m na kaal CPU. Memory Mi illa Gi la.",Y("resources",["resources:",""],["  requests:",""],["    cpu: 250m","kaal CPU"],["    memory: 128Mi","128 MB"],["  limits:",""],["    cpu: 500m","arai CPU max"],["    memory: 256Mi","256 MB max"])],
["CPU limit thaandina slow aagum, throttle. Aana memory limit thaandina, container kill aagum! Athu per OOMKilled.",Li("Limit thaandina",["CPU","throttle (slow) 🐢"],["Memory","OOMKilled 💀"])],
["Request romba adhigam pottaa, entha node layum idam kidaikkaadhu. Pod Pending la nikkum.",T(["kubectl describe pod big-app","Events:\n  Warning  FailedScheduling  0/3 nodes are available: 3 Insufficient memory."])],
["Evlo use aagudhu nu paaka kubectl top. Metrics server venum.",T(["kubectl top pods","NAME        CPU(cores)  MEMORY(bytes)\nweb-7c5d-a  12m         45Mi\nweb-7c5d-b  9m          43Mi"])],
["Recap kutty: request minimum, limit maximum, CPU throttle, memory OOMKilled. Ellaa production pod kum ithu kandippa podu!",Li("Recap",["requests","scheduling ku"],["limits","safety ku"],["250m","kaal CPU"],["kubectl top","real usage"])]]},

{t:"Liveness, readiness & startup probes",k:"probes",s:[
["Hai kutty! School nurse daily students health check pannuvaanga. Kubernetes la containers ku health check per probe. Moonu type irukku.",B("Probes = health check 🩺","liveness · readiness · startup")],
["Liveness probe kekkum: nee uyiroda irukkiya? Fail aana, kubelet container ah restart pannum. App hang aana ithu kaappaathum.",Li("Liveness",["Kelvi","uyiroda irukkiya?"],["Fail aana","restart 🔄"])],
["Readiness probe kekkum: class ku ready ah? Fail aana restart illa. Aana service traffic anuppaadhu. Ready aana apram thaan traffic.",Li("Readiness",["Kelvi","traffic ku ready ah?"],["Fail aana","endpoints la irunthu remove"])],
["Startup probe slow ah start aagura apps ku. Java app maathiri. Startup mudiyura varaikkum matha probes wait pannum.",Li("Startup",["Kelvi","start aagi mudinjudha?"],["Use","slow start apps"])],
["Probe moonu vidham. httpGet oru URL ah check pannum. tcpSocket port open ah nu paakum. exec oru command odavekkum.",Y("probes",["livenessProbe:",""],["  httpGet: {path: /healthz, port: 8080}","URL check"],["  initialDelaySeconds: 10","mudhalla wait"],["  periodSeconds: 5","ovvoru 5 sec"],["readinessProbe:",""],["  tcpSocket: {port: 8080}","port check"])],
["Liveness fail aana describe la ipdi theriyum. Restarts count yeridum.",T(["kubectl describe pod web","Warning  Unhealthy  Liveness probe failed: HTTP probe failed with statuscode: 500\nNormal   Killing    Container web failed liveness probe, will be restarted"])],
["Kavanam kutty! Liveness probe romba strict ah vechaa, nalla app aiyum restart pannikitte irukkum. initialDelay sariyaa vechuko.",B("⚠ Too strict liveness","Restart loop aagum")],
["Recap kutty: liveness restart pannum, readiness traffic control pannum, startup slow apps ku. Production la ellaa app kum readiness kandippa!",Li("Recap",["liveness","fail ➜ restart"],["readiness","fail ➜ traffic illa"],["startup","slow start"],["types","httpGet / tcp / exec"])]]},

{t:"HPA & metrics-server",k:"autoscale hpa",s:[
["Vanakkam kutty! School function la kootam adhigam aana, oru helper vandhu extra benches poduvaanga. Kootam pona, eduthuduvaanga. Ithu thaan HPA!",B("HPA = bench helper 🪑➕","Horizontal Pod Autoscaler")],
["HPA CPU illa memory usage paathu, pods count ah automatic ah yethum, irakkum. Horizontal na pods count maathuradhu.",Li("Scaling",["Horizontal","pods count maathu (HPA)"],["Vertical","pod size maathu (VPA)"],["Cluster","nodes add pannu"])],
["HPA ku usage theriyanum. Athukku metrics server venum. Ithu illana HPA unknown nu kaattum.",T(["minikube addons enable metrics-server","🌟 The 'metrics-server' addon is enabled"],["kubectl top nodes","NAME      CPU(cores)  CPU%  MEMORY(bytes)\nminikube  320m        16%   1.2Gi"])],
["Deployment la CPU request kandippa irukkanum. HPA percentage ah request vechu thaan kanakku podum.",B("⚠ requests venum","Illana HPA velai seyyaadhu")],
["Create panna kubectl autoscale. CPU fifty percent target, minimum rendu, maximum pathu.",T(["kubectl autoscale deployment web --cpu-percent=50 --min=2 --max=10","horizontalpodautoscaler.autoscaling/web autoscaled"])],
["YAML la autoscaling v2 use pannuvom.",Y("hpa.yaml",["apiVersion: autoscaling/v2",""],["kind: HorizontalPodAutoscaler",""],["spec:",""],["  scaleTargetRef: {kind: Deployment, name: web}","yaarai scale"],["  minReplicas: 2",""],["  maxReplicas: 10",""],["  metrics: [{type: Resource, resource: {name: cpu,",""],["    target: {type: Utilization, averageUtilization: 50}}}]","50% target"])],
["Load kudutha HPA pods ah yethum. get hpa la live ah paakalaam.",T(["kubectl get hpa web --watch","NAME  TARGETS   MINPODS  MAXPODS  REPLICAS\nweb   12%/50%   2        10       2\nweb   180%/50%  2        10       4\nweb   65%/50%   2        10       8"])],
["Recap kutty: HPA bench helper, metrics server venum, requests venum, min max target. Kootam vandhaa auto scale, bill um kammi!",Li("Recap",["metrics-server","usage data"],["requests","kandippa"],["autoscale","min / max / %"],["get hpa","status"])]]},

{t:"DaemonSet, StatefulSet, Job, CronJob",k:"ds sts job cronjob",s:[
["Hai kutty! Deployment thavira innum sila special teachers irukkaanga. Inniki naalu peraiyum paakalaam. DaemonSet, StatefulSet, Job, CronJob.",B("Workload types 👥","Ovvoru velaikkum oru aal")],
["DaemonSet: ovvoru classroom layum oru fan kandippa irukkanum maathiri. Ovvoru node layum oru pod. Log collector, monitoring agent ku.",T(["kubectl get ds -n kube-system","NAME        DESIRED  CURRENT  READY  NODE SELECTOR\nkube-proxy  3        3        3      <none>\nfluent-bit  3        3        3      <none>"])],
["Pudhu node add aana, DaemonSet automatic ah antha node layum oru pod podum. Node pona, antha pod um pogum.",Li("DaemonSet",["1 node","1 pod"],["Use","logs, monitoring, network"],["Examples","fluent-bit, node-exporter"])],
["StatefulSet: roll number oda students. Ovvoru pod kum fixed per, web 0, web 1, web 2. Ovvoruthar kum sontha storage. Databases ku ithu.",T(["kubectl get pods -l app=mysql","NAME     READY  STATUS\nmysql-0  1/1    Running\nmysql-1  1/1    Running\nmysql-2  1/1    Running"])],
["StatefulSet order la start aagum. Zero apram onnu apram rendu. Headless service vechu ovvoru pod kum fixed DNS per kidaikkum.",Li("StatefulSet",["Per","mysql-0, mysql-1 (fixed)"],["Storage","volumeClaimTemplates"],["Order","0 ➜ 1 ➜ 2"],["Network","headless service"])],
["Job: oru velai seyyum, mudinjadhum nikkum. Exam paper correct panra maathiri. Database backup, migration ku.",T(["kubectl create job backup --image=busybox -- echo done","job.batch/backup created"],["kubectl get jobs","NAME    COMPLETIONS  DURATION\nbackup  1/1          4s"])],
["CronJob: schedule la Job odavekkum. Linux cron maathiri thaan. Daily raathiri rendu manikku backup.",Y("cronjob.yaml",["kind: CronJob",""],["spec:",""],["  schedule: \"0 2 * * *\"","daily 2 AM"],["  jobTemplate:","enna Job"],["    spec: {template: {spec: {restartPolicy: OnFailure,",""],["      containers: [{name: bk, image: backup:1}]}}}",""])],
["Recap kutty: DaemonSet ovvoru node ku onnu, StatefulSet fixed per um storage um, Job orey thadava, CronJob schedule la. Interview la kandippa kekkuvaanga!",Li("Recap",["DaemonSet","every node"],["StatefulSet","DB, fixed ID"],["Job","run once"],["CronJob","schedule"])]]},

{t:"RBAC: ServiceAccount, Role, RoleBinding",k:"rbac sa role rolebinding",s:[
["Vanakkam kutty! School la ellaarukkum principal room key kudukka mudiyumaa? Illa! Yaar enna seyyalaam nu rules venum. Kubernetes la athu RBAC.",B("RBAC 🔑","Role Based Access Control")],
["RBAC la moonu kelvi. Yaar? Enna seyyalaam? Enga? Yaar na user illa ServiceAccount. Enna na Role. Rendaiyum connect panradhu RoleBinding.",Li("RBAC parts",["Yaar","User / ServiceAccount"],["Enna","Role (rules)"],["Connect","RoleBinding"],["Enga","namespace"])],
["ServiceAccount na pods oda ID card. Pod Kubernetes API kitta pesanum na intha ID use pannum.",T(["kubectl create serviceaccount ci-bot -n dev","serviceaccount/ci-bot created"])],
["Role la rules. Entha resource, entha verbs. Inga pods ah get, list, watch mattum pannalaam. Delete panna mudiyaadhu.",Y("role.yaml",["kind: Role",""],["metadata: {name: pod-reader, namespace: dev}","dev la mattum"],["rules:",""],["- apiGroups: [\"\"]","core group"],["  resources: [pods]","enna"],["  verbs: [get, list, watch]","read only"])],
["RoleBinding Role ah ServiceAccount oda connect pannum. Ippo ci bot pods ah padikkalaam.",T(["kubectl create rolebinding ci-read --role=pod-reader --serviceaccount=dev:ci-bot -n dev","rolebinding.rbac.authorization.k8s.io/ci-read created"])],
["Permission irukka nu test panna kubectl auth can i. Yes illa no nu sollum.",T(["kubectl auth can-i list pods -n dev --as=system:serviceaccount:dev:ci-bot","yes"],["kubectl auth can-i delete pods -n dev --as=system:serviceaccount:dev:ci-bot","no"])],
["Role um RoleBinding um orey namespace ku mattum. Motha cluster ku venum na ClusterRole, ClusterRoleBinding.",Li("Scope",["Role + RoleBinding","orey namespace"],["ClusterRole + ClusterRoleBinding","motha cluster"])],
["Recap kutty: ServiceAccount ID card, Role rules, RoleBinding connect, can i test. Golden rule: least privilege. Thevaiyaana permission mattum kudu!",B("Least privilege ✔","Thevaiyaanadhu mattum kudu")]]},

{t:"Network Policies",k:"networkpolicy",s:[
["Hai kutty! Default ah Kubernetes la ellaa pods um ellaa pods kitta um pesalaam. Ella classroom door um open! Security ku ithu nalladhu illa.",B("NetworkPolicy 🧱","Pods kulla firewall")],
["NetworkPolicy oru firewall rule. Entha pods yaar kitta irunthu traffic vaangalaam nu sollum. Ingress na ulla varudhu, egress na veliya pogudhu.",Li("Directions",["Ingress","ulla varudhu"],["Egress","veliya pogudhu"],["podSelector","yaarukku rule"])],
["Mukkiyam! NetworkPolicy velai seyya CNI plugin support pannanum. Calico, Cilium support pannum. Basic setup la rules ignore aagidum.",B("⚠ CNI venum","Calico / Cilium")],
["Mudhal step default deny. Intha namespace la ellaa ingress traffic aiyum block pannu.",Y("deny-all.yaml",["kind: NetworkPolicy",""],["metadata: {name: deny-all}",""],["spec:",""],["  podSelector: {}","ellaa pods um"],["  policyTypes: [Ingress]","ulla vara ellaam block"])],
["Ippo allow rule. db pods ku, app equals api pods la irunthu mattum, port 5432 la traffic allow.",Y("allow-api.yaml",["spec:",""],["  podSelector: {matchLabels: {app: db}}","db ku rule"],["  ingress:",""],["  - from: [{podSelector: {matchLabels: {app: api}}}]","api mattum"],["    ports: [{port: 5432}]","postgres port"])],
["Test pannalaam. api pod la irunthu work aagum. Vera pod la irunthu timeout aagum.",T(["kubectl exec api -- nc -zv db 5432","db (10.96.0.20:5432) open"],["kubectl exec hacker -- nc -zv -w 3 db 5432","nc: db (10.96.0.20:5432): Operation timed out"])],
["Namespace label vechum allow pannalaam. namespaceSelector. Monitoring namespace la irunthu metrics edukka allow pannalaam.",T(["kubectl get networkpolicy","NAME        POD-SELECTOR  AGE\ndeny-all    <none>        5m\nallow-api   app=db        2m"])],
["Recap kutty: default ah ellaam open, NetworkPolicy firewall, default deny apram allow, CNI support venum. Zero trust network!",Li("Recap",["Default","ellaam open"],["deny-all","mudhalla block"],["allow","thevaiyaanadhu mattum"],["CNI","Calico / Cilium"])]]},

{t:"Helm basics",k:"helm install upgrade values",s:[
["Vanakkam kutty! Oru app ku Deployment, Service, Ingress, ConfigMap nu pathu YAML files. Ovvoru thadava ezhudhanumaa? Venaam! Helm irukku. Kubernetes oda app store.",B("Helm ⎈","Kubernetes package manager")],
["Helm la package per chart. Linux la apt package maathiri. Chart kulla templates um values um irukkum.",Li("Helm words",["Chart","package"],["Repo","chart store"],["Release","install aana copy"],["values dot yaml","settings"])],
["Mudhalla repo add pannu. Bitnami oru famous repo.",T(["helm repo add bitnami https://charts.bitnami.com/bitnami","\"bitnami\" has been added to your repositories"],["helm repo update","Update Complete. ⎈Happy Helming!⎈"])],
["Install panna helm install, release per, chart per. Orey command la ellaa YAML um create aagum!",T(["helm install my-web bitnami/nginx","NAME: my-web\nSTATUS: deployed\nREVISION: 1"])],
["Settings maatha values dot yaml. replicaCount, image tag, service type ellaam inga.",Y("values.yaml",["replicaCount: 3","pods count"],["image:",""],["  tag: 1.27","version"],["service:",""],["  type: LoadBalancer","service type"])],
["Pudhu values vechu upgrade. minus f values file. Ovvoru upgrade um pudhu revision.",T(["helm upgrade my-web bitnami/nginx -f values.yaml","Release \"my-web\" has been upgraded.\nREVISION: 2"],["helm list","NAME    NAMESPACE  REVISION  STATUS    CHART\nmy-web  default    2         deployed  nginx-18.1.0"])],
["Thappu aana rollback. Venaam na uninstall. Un sontha chart create panna helm create.",T(["helm rollback my-web 1","Rollback was a success! Happy Helming!"],["helm create mychart","Creating mychart"])],
["Recap kutty: chart package, repo add, install, values dot yaml, upgrade, rollback. Helm vechaa deploy romba easy!",Li("Recap",["repo add","store add"],["install","pudhusa"],["upgrade -f","values maathu"],["rollback","pazhaya revision"])]]},

{t:"Managed Kubernetes: EKS basics",k:"eksctl kubeconfig",s:[
["Hai kutty! Control plane ah naame paathukkaradhu kashtam. etcd backup, upgrade ellaam. AWS EKS la control plane ah AWS paathukkum. Naama apps mattum!",B("☁ EKS","AWS managed Kubernetes")],
["Managed na, principal office ah AWS nadathum. Naama classrooms, athaavathu worker nodes, apps mattum paathukkalaam.",Li("Managed K8s",["AWS","EKS"],["Azure","AKS"],["Google","GKE"],["Control plane","cloud paathukkum"])],
["EKS cluster create panna easy tool eksctl. Orey command! Region, node type, nodes count.",T(["eksctl create cluster --name demo --region ap-south-1 --nodegroup-name ng1 --node-type t3.medium --nodes 2","[ℹ]  creating EKS cluster \"demo\" in \"ap-south-1\"\n[✔]  EKS cluster \"demo\" in \"ap-south-1\" region is ready"])],
["kubectl ku entha cluster nu theriya kubeconfig venum. aws eks update kubeconfig pottaa, home dot kube config la add aagum.",T(["aws eks update-kubeconfig --name demo --region ap-south-1","Added new context arn:aws:eks:ap-south-1:1234:cluster/demo to /home/kutty/.kube/config"])],
["Neraya clusters irundha context vechu maathalaam. get contexts, use context.",T(["kubectl config get-contexts","CURRENT  NAME                  CLUSTER\n*        arn:...:cluster/demo  demo\n         minikube              minikube"],["kubectl config use-context minikube","Switched to context \"minikube\"."])],
["EKS la Service LoadBalancer pottaa AWS load balancer varum. Ingress ku AWS Load Balancer Controller. Storage ku EBS CSI driver.",Li("EKS add-ons",["LoadBalancer svc","NLB / CLB"],["Ingress","AWS LB Controller (ALB)"],["Storage","EBS CSI driver"],["Pods ku AWS access","IRSA / Pod Identity"])],
["Bill kavanam kutty! Practice mudinjadhum cluster ah delete pannu. Illana kaasu poyikitte irukkum.",T(["eksctl delete cluster --name demo --region ap-south-1","[✔]  all cluster resources were deleted"])],
["Recap kutty: EKS managed control plane, eksctl create, update kubeconfig, context switch, delete pannu marakkaadhe!",Li("Recap",["eksctl create cluster","cluster ready"],["update-kubeconfig","kubectl connect"],["use-context","cluster maathu"],["eksctl delete","bill save 💰"])]]},

{t:"Monitoring: Prometheus & Grafana",k:"top prometheus grafana",s:[
["Vanakkam kutty! Cluster la enna nadakkudhu nu eppavum paakanum. Car la speedometer maathiri. Ithu thaan monitoring.",B("📈 Monitoring","Cluster oda speedometer")],
["Quick check ku kubectl top. Metrics server irundha, nodes um pods um evlo CPU, memory use pannudhu nu kaattum.",T(["kubectl top pods --sort-by=memory","NAME          CPU(cores)  MEMORY(bytes)\napi-6d4c-x    210m        480Mi\nweb-7c5d-a    12m         45Mi"])],
["Aana kubectl top live mattum. History illa, alert illa. Athukku Prometheus. Ithu metrics ah collect panni save pannum.",Li("Prometheus",["Velai","metrics collect + store"],["Method","pull (scrape)"],["Query","PromQL"],["Alerts","Alertmanager"])],
["Grafana na azhagaana dashboards. Prometheus data va graphs ah kaattum. Rendum sendhu thaan use pannuvom.",B("Prometheus + Grafana","Data + Dashboard 📊")],
["Easy install kube prometheus stack Helm chart. Prometheus, Grafana, Alertmanager ellaam orey thadava.",T(["helm repo add prometheus-community https://prometheus-community.github.io/helm-charts",""],["helm install mon prometheus-community/kube-prometheus-stack -n monitoring --create-namespace","NAME: mon\nSTATUS: deployed"])],
["Grafana open panna port forward. Browser la localhost 3000.",T(["kubectl port-forward svc/mon-grafana 3000:80 -n monitoring","Forwarding from 127.0.0.1:3000 -> 3000"])],
["PromQL la query pannalaam. Intha query restart aagura pods ah kaattum. Alert rule ah um ithai vekkalaam.",Li("Useful PromQL",["CPU","rate(container_cpu_usage_seconds_total[5m])"],["Restarts","kube_pod_container_status_restarts_total"],["Memory","container_memory_working_set_bytes"])],
["Recap kutty: kubectl top quick, Prometheus metrics, Grafana dashboard, Alertmanager alert. Monitoring illaama production ku pogaadhe!",Li("Recap",["kubectl top","quick view"],["Prometheus","collect"],["Grafana","dashboard"],["Alertmanager","alert 🔔"])]]},

{t:"CI/CD to Kubernetes & GitOps",k:"github actions argocd",s:[
["Hai kutty! Ovvoru thadava code maathina, kai la build panni, push panni, deploy pannaa bore aagum, mistakes um varum. CI CD automatic ah pannum!",B("🚀 CI/CD","Code push ➜ auto deploy")],
["Flow simple. Developer code push. GitHub Actions test pannum. Docker image build panni registry ku push. Apram Kubernetes ku deploy.",Li("Pipeline",["1","git push"],["2","test"],["3","docker build + push"],["4","kubectl / helm deploy"])],
["GitHub Actions workflow la steps. Checkout, build, push. Image tag ku git commit SHA use pannuvom. Unique ah irukkum.",Y(".github/workflows/deploy.yml",["on: {push: {branches: [main]}}","main push aana"],["jobs: {deploy: {runs-on: ubuntu-latest, steps: [",""],["  {uses: actions/checkout@v4},","code edu"],["  {run: docker build -t ghcr.io/kutty/app:${{ github.sha }} .},","build"],["  {run: docker push ghcr.io/kutty/app:${{ github.sha }}}]}}","push"])],
["Deploy step la kubectl set image illa helm upgrade. Kubeconfig ah GitHub Secret la vekkanum.",T(["helm upgrade --install app ./chart --set image.tag=$GITHUB_SHA --wait","Release \"app\" has been upgraded. Happy Helming!"],["kubectl rollout status deploy/app","deployment \"app\" successfully rolled out"])],
["Ippo GitOps. Git thaan single source of truth. Cluster la enna irukkanum nu Git la YAML. Oru tool Git ah paathu cluster ah sync pannum.",B("GitOps","Git = unmai 📜")],
["Argo CD oru GitOps tool. Cluster kulla odum. Git la change aana, automatic ah cluster la apply pannum. Yaaravadhu kai la maathina, thirumba Git maathiri maathidum.",Li("Argo CD",["Watch","Git repo"],["Sync","cluster = Git"],["Drift","auto fix"],["UI","app status paaru"])],
["Argo CD Application YAML. Entha repo, entha path, entha cluster namespace.",Y("app.yaml",["kind: Application",""],["spec:",""],["  source: {repoURL: https://github.com/kutty/k8s, path: apps/web}","Git enga"],["  destination: {server: https://kubernetes.default.svc, namespace: web}","enga deploy"],["  syncPolicy: {automated: {prune: true, selfHeal: true}}","auto sync"])],
["Recap kutty: CI la test, build, push. CD la helm illa kubectl. GitOps la Argo CD Git ah follow pannum. Push pannaa pothum, deploy automatic!",Li("Recap",["CI","test + build + push"],["CD","helm upgrade"],["Tag","git SHA"],["GitOps","Argo CD sync"])]]},

{t:"Best practices & security basics",k:"best practices",s:[
["Vanakkam kutty! Kadaisi core lesson. Ithuvarai kathukittadha vechu, production ku epdi nalla ah pannanum nu paakalaam.",B("✅ Best practices","Production ready K8s")],
["Image tips. latest tag use pannaadhe. Fixed version tag podu. Chinna base image, distroless illa alpine. Image scan pannu, Trivy maathiri.",Li("Images",["Tag","nginx:1.27 ✔ latest ✘"],["Base","distroless / alpine"],["Scan","trivy image"])],
["Ellaa containers kum requests, limits, readiness, liveness kandippa. Replicas rendu ku mela. Oru pod pona website pogakoodaadhu.",Li("Reliability",["resources","requests + limits"],["probes","readiness + liveness"],["replicas","≥ 2"],["PDB","PodDisruptionBudget"])],
["Security context: root ah odavaikkaadhe. runAsNonRoot true. Root filesystem read only.",Y("securityContext",["securityContext:",""],["  runAsNonRoot: true","root illa"],["  runAsUser: 1000",""],["  readOnlyRootFilesystem: true","files maatha mudiyaadhu"],["  allowPrivilegeEscalation: false",""])],
["Namespace ku Pod Security Standards. restricted level pottaa, unsafe pods ah ulla vidaadhu.",T(["kubectl label ns prod pod-security.kubernetes.io/enforce=restricted","namespace/prod labeled"])],
["RBAC least privilege, NetworkPolicy default deny, Secrets encryption. Ellaa YAML um Git la, GitOps vazhiya.",Li("Security",["RBAC","least privilege"],["NetworkPolicy","default deny"],["Secrets","encrypt + Vault"],["Git","ellaa YAML um"])],
["Labels consistent ah podu. app, env, team, version. Debug um cost tracking um easy aagum.",Y("labels",["labels:",""],["  app.kubernetes.io/name: web",""],["  app.kubernetes.io/version: \"1.4.2\"",""],["  env: prod",""],["  team: payments",""])],
["Congratulations kutty! Kubernetes core mudichitta. Adutha advanced lessons, project, apram interview prep. Naan unna nenachu romba proud!",B("🎉 Core course mudinjuthu!","Adutha: Advanced ➜ Project ➜ Interview")]]}
];
