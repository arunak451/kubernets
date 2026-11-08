// Tanglish subtitle -> TTS narration: Tamil words in Tamil script, English tech words kept in English,
// short forms spelled the way people say them (K 8 S, kube control, Y A M L ...).
// Usage: import { ta } from "./ta.mjs";  or  node tools/ta.mjs "Vanakkam kutty! kubectl get pods"

const TA = Object.fromEntries(`
aa ஆ|aagaadhe ஆகாதே|aagala ஆகல|aagalaam ஆகலாம்|aaganum ஆகணும்|aagiduchu ஆகிடுச்சு|aagidum ஆகிடும்|aagirukkaa ஆகிருக்கா
aagudha ஆகுதா|aagudhaa ஆகுதா|aagudhu ஆகுது|aagum ஆகும்|aagura ஆகுற|aaguradhukku ஆகுறதுக்கு|aaiduchu ஆயிடுச்சு|aalunga ஆளுங்க
aana ஆனா|aanaalum ஆனாலும்|aanadhum ஆனதும்|aayiram ஆயிரம்|adhiga அதிக|adhigam அதிகம்|adhigama அதிகமா|adutha அடுத்த|ah ஆ
ainthu ஐந்து|aiyo ஐயோ|aiyum ஐயும்|akka அக்கா|ange அங்கே|anju அஞ்சு|antha அந்த|anuppaadhu அனுப்பாது|anuppum அனுப்பும்
anuppuvaanga அனுப்புவாங்க|apdiye அப்படியே|appadi அப்படி|appo அப்போ|apram அப்புறம்|artham அர்த்தம்|athaavathu அதாவது
athanaala அதனால|athu அது|athukku அதுக்கு|athula அதுல|athuvum அதுவும்|avanga அவங்க|azhagaana அழகான|bathil பதில்
bayapadaadhe பயப்படாதே|chinna சின்ன|dooram தூரம்|edhu எது|edukka எடுக்க|edukkalaam எடுக்கலாம்|eduthuduvaanga எடுத்துடுவாங்க
eduthutu எடுத்துட்டு|ella எல்லா|ellaa எல்லா|ellaam எல்லாம்|ellaame எல்லாமே|ellaarukkum எல்லாருக்கும்|ellaarum எல்லாரும்
enga எங்க|enna என்ன|ennaku எனக்கு|entha எந்த|epavum எப்பவும்|epdi எப்படி|eppavum எப்பவும்|ethana எத்தனை|ettu எட்டு|evlo எவ்ளோ
ezhudhaadhe எழுதாதே|ezhudhanum எழுதணும்|ezhudhanumaa எழுதணுமா|ezhuthanum எழுதணும்|ezhuthi எழுதி|ezhuthirukkom எழுதிருக்கோம்
gavanam கவனம்|hai ஹாய்|idam இடம்|idathula இடத்துல|idhu இது|illa இல்ல|illaama இல்லாம|illana இல்லனா|inga இங்க|inniki இன்னிக்கு
innoru இன்னொரு|innum இன்னும்|intha இந்த|ipdi இப்படி|ippo இப்போ|irakkum இறக்கும்|irukka இருக்க|irukkaanga இருக்காங்க
irukkalaam இருக்கலாம்|irukkanum இருக்கணும்|irukkiya இருக்கியா|irukku இருக்கு|irukkum இருக்கும்|irukkura இருக்குற|irundha இருந்தா
irunthu இருந்து|ithai இதை|ithu இது|ithukku இதுக்கு|ithuvarai இதுவரை|ivanga இவங்க|ivlo இவ்ளோ|jeyippa ஜெயிப்ப|jodi ஜோடி
kaal கால்|kaanaama காணாம|kaappaathu காப்பாத்து|kaappaathum காப்பாத்தும்|kaasu காசு|kaattu காட்டு|kaattum காட்டும்|kadaisi கடைசி
kai கை|kammi கம்மி|kanakku கணக்கு|kandippa கண்டிப்பா|kandupidikkum கண்டுபிடிக்கும்|kandupidippen கண்டுபிடிப்பேன்|karanam காரணம்
kashtam கஷ்டம்|kathukittadha கத்துக்கிட்டத|kattalaam கட்டலாம்|kavanam கவனம்|keela கீழ|kekkudhu கேக்குது|kekkum கேக்கும்
kekkuvaanga கேப்பாங்க|kelvi கேள்வி|kettaa கேட்டா|kettu கேட்டு|kidaicha கிடைச்சா|kidaichuduchu கிடைச்சுடுச்சு|kidaikkaadhu கிடைக்காது
kidaikkala கிடைக்கல|kidaikkum கிடைக்கும்|kitta கிட்ட|kondu கொண்டு|konjam கொஞ்சம்|koodaadhu கூடாது|koopidanum கூப்பிடணும்
koopidradhu கூப்பிடறது|koopiduvom கூப்பிடுவோம்|kootam கூட்டம்|ku க்கு|kudu குடு|kudukka குடுக்க|kudukkalaam குடுக்கலாம்
kudukkanum குடுக்கணும்|kudukkum குடுக்கும்|kudukkura குடுக்குற|kudutha குடுத்தா|kuduthu குடுத்து|kulla குள்ள|kullaye குள்ளயே|kum க்கும்
kutty குட்டி|la ல|laye லயே|layum லயும்|maaraadhu மாறாது|maarikitte மாறிக்கிட்டே|maarum மாறும்|maatha மாத்த|maathalaam மாத்தலாம்
maathi மாத்தி|maathidum மாத்திடும்|maathina மாத்தினா|maathiri மாதிரி|maathuradhu மாத்துறது|maathuva மாத்துவா|maattom மாட்டோம்
malli மல்லி|manikku மணிக்கு|marakkaadhe மறக்காதே|matha மத்த|mattum மட்டும்|mela மேல|moonaavathu மூணாவது|moonu மூணு|motha மொத்த
mudhal முதல்|mudhalla முதல்ல|mudichitta முடிச்சிட்ட|mudinjaa முடிஞ்சா|mudinjadhum முடிஞ்சதும்|mudiyaadhu முடியாது|mudiyala முடியல
mudiyumaa முடியுமா|mudiyura முடியுற|mukkiyam முக்கியம்|mukkiyamaana முக்கியமான|munnaadiye முன்னாடியே|na னா|naala நால
naalaavathu நாலாவது|naalu நாலு|naama நாம|naame நாமே|naan நான்|nadakka நடக்க|nadakkudhu நடக்குது|nadakkum நடக்கும்
nadandhudhu நடந்துச்சு|nadathum நடத்தும்|naduvula நடுவுல|nalla நல்ல|nalladhu நல்லது|namma நம்ம|nee நீ|nenachu நெனச்சு
neraya நிறைய|nikkudhu நிக்குது|nikkum நிக்கும்|niruthunaa நிறுத்துனா|nooru நூறு|nu னு|nyabagam ஞாபகம்|oda ஓட
odavaikkaadhe ஓடவைக்காதே|odavekkum ஓடவைக்கும்|odudha ஓடுதா|odudhu ஓடுது|odum ஓடும்|odura ஓடுற|onnu ஒண்ணு|orey ஒரே|oru ஒரு
ovvonnaiyum ஒவ்வொண்ணையும்|ovvoru ஒவ்வொரு|ovvoruthar ஒவ்வொருத்தர்|paaka பாக்க|paakalaam பாக்கலாம்|paakanum பாக்கணும்
paakum பாக்கும்|paaru பாரு|paathu பாத்து|paathukka பாத்துக்க|paathukkalaam பாத்துக்கலாம்|paathukkaradhu பாத்துக்கறது
paathukkum பாத்துக்கும்|padichu படிச்சு|padikka படிக்க|padikkalaam படிக்கலாம்|panna பண்ண|pannaa பண்ணா|pannaadhe பண்ணாதே
pannaalum பண்ணாலும்|pannadhu பண்ணது|pannalaam பண்ணலாம்|pannanum பண்ணணும்|pannanumaa பண்ணணுமா|panni பண்ணி
pannidichu பண்ணிடுச்சு|pannikitte பண்ணிக்கிட்டே|panninen பண்ணினேன்|pannittu பண்ணிட்டு|pannu பண்ணு|pannudhaa பண்ணுதா
pannudhu பண்ணுது|pannum பண்ணும்|pannuva பண்ணுவ|pannuvaanga பண்ணுவாங்க|pannuvom பண்ணுவோம்|panra பண்ற|panradhu பண்றது
pathala பத்தல|pathu பத்து|payanam பயணம்|pazhaya பழைய|per பேர்|peraiyum பேரையும்|periya பெரிய|periyadhu பெரியது|pesalaam பேசலாம்
pesanum பேசணும்|pesura பேசுற|pesuvom பேசுவோம்|poda போட|podaadhe போடாதே|podalaam போடலாம்|podhaadhu போதாது|podu போடு|podum போடும்
poduvaanga போடுவாங்க|poga போக|pogaadhe போகாதே|pogaadhu போகாது|pogakoodaadhu போகக்கூடாது|pogala போகல|pogalaam போகலாம்
poganum போகணும்|pogave போகவே|pogudhu போகுது|pogum போகும்|pogura போகுற|poguthu போகுது|poi போய்|polaam போலாம்|pona போனா
ponaalum போனாலும்|pothaadhu போதாது|pothum போதும்|potta போட்டா|pottaa போட்டா|pottadhum போட்டதும்|pottu போட்டு|potu போட்டு
poyikitte போயிக்கிட்டே|pudhu புது|pudhusa புதுசா|raathiri ராத்திரி|rendaavathu ரெண்டாவது|rendaiyum ரெண்டையும்|rendu ரெண்டு
rendum ரெண்டும்|romba ரொம்ப|saamaan சாமான்|saapida சாப்பிட|sariyaa சரியா|sendhu சேர்ந்து|sethaa செத்தா|sethu செத்து|seyya செய்ய
seyyalaam செய்யலாம்|seyyum செய்யும்|sila சில|sollaadhe சொல்லாதே|sollalaam சொல்லலாம்|sollanum சொல்லணும்|sollu சொல்லு
solludhu சொல்லுது|sollum சொல்லும்|sollurom சொல்றோம்|solluvom சொல்லுவோம்|solradhu சொல்றது|sonna சொன்ன|sonnaa சொன்னா
sonnaalum சொன்னாலும்|sonnatha சொன்னத|sontha சொந்த|suthi சுத்தி|thaan தான்|thaandiduchu தாண்டிடுச்சு|thaandina தாண்டினா
thaandiruchaa தாண்டிருச்சா|thaane தானே|thadava தடவ|thaniya தனியா|thappa தப்பா|thappu தப்பு|thavira தவிர|thedura தேடுற
theriya தெரிய|theriyaadha தெரியாத|theriyala தெரியல|theriyanum தெரியணும்|theriyum தெரியும்|thevaiyaana தேவையான|thirumba திரும்ப
thirumbi திரும்பி|udane உடனே|udhavum உதவும்|ulla உள்ள|um உம்|un உன்|unmaiyaana உண்மையான|unna உன்ன|utkaarura உட்காருற
uyir உயிர்|uyiroda உயிரோட|va வ|vaa வா|vaangalaam வாங்கலாம்|vanakkam வணக்கம்|vandha வந்தா|vandhaa வந்தா|vandhu வந்து
vandhuduchu வந்துடுச்சு|vandhudum வந்துடும்|vandhutta வந்துட்ட|varaadhu வராது|varaikkum வரைக்கும்|varalaam வரலாம்|varudhu வருது
varum வரும்|varuva வருவா|vayasu வயசு|vazhi வழி|vazhiya வழியா|vechaa வெச்சா|vechirukkum வெச்சிருக்கும்|vechu வெச்சு|vechuko வெச்சுக்கோ
vechum வெச்சும்|vekka வெக்க|vekkaadhe வெக்காதே|vekkalaam வெக்கலாம்|vekkanum வெக்கணும்|vekkum வெக்கும்|velai வேலை|veliya வெளிய
venaalum வேணாலும்|venaam வேணாம்|vendaam வேண்டாம்|venum வேணும்|vera வேற|vidaadhu விடாது|vidham விதம்|vishayam விஷயம்
vithiyaasam வித்தியாசம்|yaar யார்|yaaravadhu யாராவது|yen ஏன்|yeridum ஏறிடும்|yerikitte ஏறிக்கிட்டே|yethu ஏத்து|yethum ஏத்தும்
`.trim().split(/[|\n]/).map(p => p.trim().split(" ")));

// Whole-phrase fixes (checked before word conversion)
const PHRASE = [[/\bpoi sollaadhe\b/gi, "பொய் சொல்லாதே"]];

// Spoken forms for short forms / tech words (case-sensitive first, then lower-case)
const SPOKEN = {
  K8s: "K 8 S", k8s: "K 8 S", kubectl: "kube control", eksctl: "E K S control", crictl: "C R I control", kubelet: "kube let",
  kubeconfig: "kube config", etcd: "E T C D", YAML: "Y A M L", yaml: "Y A M L", HPA: "H P A", RBAC: "R B A C", PVC: "P V C",
  PV: "P V", EKS: "E K S", AKS: "A K S", GKE: "G K E", AWS: "A W S", aws: "A W S", API: "A P I", CPU: "C P U", DNS: "D N S",
  IP: "I P", CI: "C I", CD: "C D", CNI: "C N I", ELB: "E L B", NAT: "N A T", TLS: "T L S", tls: "T L S", URL: "U R L",
  HTTPS: "H T T P S", SHA: "S H A", LB: "L B", OOM: "O O M", GB: "G B", MB: "M B", Mi: "M I", Gi: "G I", ns: "N S",
  svc: "S V C", rs: "R S", db: "D B", sh: "S H", ssd: "S S D", gp3: "G P 3", v1: "V 1", v2: "V 2", CSI: "C S I",
  ID: "I D", SQL: "S Q L", MySQL: "My S Q L", PromQL: "Prom Q L", CronJob: "Cron Job", minikube: "mini kube",
  web1: "web 1", vs: "versus", hpa: "H P A", eks: "E K S", ci: "C I", rbac: "R B A C", pvc: "P V C", env: "env", base64: "base 64", Bitnami: "Bitnami", GitOps: "Git Ops", DevOps: "Dev Ops",
  containerd: "container D", httpGet: "HTTP Get", tcpSocket: "TCP Socket", envFrom: "env From", emptyDir: "empty Dir",
};
const ACR = new Set(["API", "IP", "HTTP", "TCP", "PVC", "OOM", "CPU", "DNS", "SHA"]);

function word(w) {
  const lw = w.toLowerCase();
  if (TA[lw]) return TA[lw];
  if (SPOKEN[w]) return SPOKEN[w];
  if (SPOKEN[lw]) return SPOKEN[lw];
  let m = w.match(/^(\d+)m$/); if (m) return `${m[1]} milli`;
  // split camelCase / PascalCase: apiVersion -> api Version, ImagePullBackOff -> Image Pull Back Off, OOMKilled -> OOM Killed
  const parts = w.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2").split(" ");
  if (parts.length > 1) return parts.map(p => SPOKEN[p] || (ACR.has(p.toUpperCase()) ? p.toUpperCase().split("").join(" ") : p)).join(" ");
  return w;
}

export function ta(text) {
  let t = text;
  for (const [re, s] of PHRASE) t = t.replace(re, s);
  return t.replace(/[A-Za-z][A-Za-z0-9]*/g, word);
}
export const known = w => !!TA[w.toLowerCase()];

if (process.argv[1] && process.argv[1].endsWith("ta.mjs") && process.argv[2]) console.log(ta(process.argv.slice(2).join(" ")));
