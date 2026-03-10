import { useState } from "react";

/* ─────────────────────────────────────────────────────────
   TOKENS — Noir & Blanc strict, Neue Haas Grotesk
───────────────────────────────────────────────────────── */
const F = "'Neue Haas Grotesk Display Pro', 'Neue Haas Grotesk Text Pro', 'Neue Haas Grotesk', Helvetica, Arial, sans-serif";

const C = {
  black:    "#000000",
  white:    "#FFFFFF",
  grey100:  "#F2F2F2",  // fond général
  grey200:  "#E5E5E5",  // cellule vide / bordures légères
  grey300:  "#CCCCCC",  // bordures
  grey500:  "#888888",  // textes secondaires
  grey700:  "#444444",  // textes medium
  pub:      "#555555",  // indicateur publication (gris foncé)
  pubLight: "#BBBBBB",  // indicateur préparation
};

const MONTHS = ["Jan","Fév","Mar","Avr","Mai","Juin","Juil","Août","Sep","Oct","Nov","Déc"];
const CURRENT_MONTH = new Date().getMonth();
const ADMIN_PASSWORD = "FFPAPF";

/* ─────────────────────────────────────────────────────────
   DATA  (0 = indisponible · 1 = possible · 2 = période forte)
───────────────────────────────────────────────────────── */
const INITIAL_DATA = {
  CRÉA: {
    fullLabel: "Profils Création",
    tagline:   "Stylisme · Modélisme · Design textile · Studio · Direction artistique",
    context:   "Les profils création sont principalement disponibles en stage de juin à septembre pour les niveaux bachelor. Les contrats d'alternance démarrent quasi-exclusivement en septembre–octobre sur les cycles mastère.",
    schools: {
      MODART: {
        level: "Bac+3 à Bac+5",
        stageDuration: "2 à 10 mois",
        contact: "contact@modart-paris.com",
        url: "modart-paris.com",
        stage:      [0,0,0,0,0,2,2,2,2,0,0,1],
        alternance: [0,0,0,0,0,0,0,0,2,2,0,0],
        stageNote: "Fenêtres principales : juin → septembre (bachelors). Stage long de 6 à 10 mois possible sur certains cursus (COSTAL). Décembre est un créneau secondaire pour certains mastères.",
        altNote:   "Mastères uniquement (cycle 2 ans). Rythme 1 jour école / 4 jours entreprise. Démarrage impératif septembre–octobre. Contrat d'apprentissage ou de professionnalisation.",
      },
      LISAA: {
        level: "Bac+3 à Bac+5",
        stageDuration: "2 à 6 mois",
        contact: "entreprises@lisaa.com",
        url: "lisaa.com",
        stage:      [0,0,0,0,0,2,2,2,2,0,0,0],
        alternance: [0,0,0,0,0,0,0,0,1,1,0,0],
        stageNote: "Bachelors mode Paris : disponibilité annoncée juin → septembre. Plusieurs stages obligatoires sur le cursus (fin de 2e et 3e année).",
        altNote:   "Mastères mode et luxe : repère automne. Rythme variable selon le programme. À confirmer selon le parcours choisi.",
      },
      ESMOD: {
        level: "Bac à Bac+5",
        stageDuration: "2 à 6 mois selon l'année",
        contact: "À contacter par campus",
        url: "esmod.com",
        stage:      [0,0,0,0,0,1,2,2,1,0,0,0],
        alternance: [0,0,0,0,0,0,0,0,1,1,0,0],
        stageNote: "Repère été. 2e année : 2 à 3 mois. 3e année : 3 à 6 mois. Le calendrier varie selon les campus (Paris, Rennes, Lyon, Bordeaux). Toujours valider avec le campus ciblé.",
        altNote:   "L'alternance en création n'est pas disponible sur tous les programmes. À confirmer avec le campus. Quelques ouvertures en 3e cycle.",
      },
      "MOD'SPE": {
        level: "Bac+4 à Bac+5 (5e année uniquement)",
        stageDuration: "Non applicable",
        contact: "entreprises@ifmparis.fr",
        url: "ifmparis.fr",
        stage:      [0,0,0,0,0,0,0,0,0,0,0,0],
        alternance: [0,0,0,0,0,0,0,0,2,2,0,0],
        stageNote: "Pas de stage création dédié en bachelor. Les profils sont disponibles exclusivement en alternance de 5e année.",
        altNote:   "Alternance création disponible en 5e année uniquement. Programme sélectif, profils hautement qualifiés. Démarrage septembre–octobre impératif.",
      },
    },
  },
  RETAIL: {
    fullLabel: "Profils Retail",
    tagline:   "Vente · Wholesale · Visual Merchandising · Commerce en ligne · Réseau boutiques · Expérience client",
    context:   "Les profils retail sont les plus disponibles en stage sur l'ensemble de l'année, notamment via MODART qui ouvre des créneaux dès janvier. La rentrée d'alternance reste concentrée sur septembre–octobre.",
    schools: {
      MODART: {
        level: "Bac+2 à Bac+5",
        stageDuration: "2 à 6 mois",
        contact: "contact@modart-paris.com",
        url: "modart-paris.com",
        stage:      [2,2,2,1,1,2,2,2,2,0,0,1],
        alternance: [0,0,0,0,0,0,0,0,2,2,0,0],
        stageNote: "Profil le plus disponible parmi les écoles partenaires. Fenêtres : décembre (secondaire), janvier → mars, puis juin → septembre. Bachelor Retail & Management. Adapté aux renforts de collection et ouvertures de boutique.",
        altNote:   "Mastère Management Retail et Digital. Démarrage octobre. Rythme 1 jour école / 4 jours entreprise. Excellents profils omnicanal et Visual Merchandising.",
      },
      LISAA: {
        level: "Bac+3 à Bac+5",
        stageDuration: "2 à 4 mois",
        contact: "entreprises@lisaa.com",
        url: "lisaa.com",
        stage:      [0,0,0,0,0,1,1,1,1,0,0,0],
        alternance: [0,0,0,0,0,0,0,0,1,1,0,0],
        stageNote: "Parcours Fashion Business avec spécialisation retail et wholesale. Disponibilité juin → septembre.",
        altNote:   "Alternance Fashion Business : à confirmer selon le niveau et le parcours. Rentrée automne.",
      },
      "MOD'SPE": {
        level: "Bac+3 à Bac+5",
        stageDuration: "2 à 6 mois",
        contact: "entreprises@ifmparis.fr",
        url: "ifmparis.fr",
        stage:      [0,0,0,0,0,1,1,1,1,0,0,0],
        alternance: [0,0,0,0,0,0,0,0,1,1,0,0],
        stageNote: "Retail et business bien couverts dans les programmes bachelor. Repère : été.",
        altNote:   "Alternance possible selon le niveau. À confirmer avec le service entreprises.",
      },
    },
  },
  BUSINESS: {
    fullLabel: "Profils Business",
    tagline:   "Communication · Marketing · Gestion de marque · Achats · Influence · Développement commercial · Merchandising",
    context:   "Profils les plus demandés par les marques membres. LISAA se distingue par une disponibilité en alternance quasi-annuelle sur ses mastères. MODART propose deux larges fenêtres de stage en début et milieu d'année.",
    schools: {
      MODART: {
        level: "Bac+2 à Bac+5",
        stageDuration: "3 à 6 mois",
        contact: "contact@modart-paris.com",
        url: "modart-paris.com",
        stage:      [2,2,2,0,0,2,2,2,2,0,0,1],
        alternance: [0,0,0,0,0,0,0,0,2,2,0,0],
        stageNote: "Deux fenêtres distinctes : janvier → mars (communication, management) et juin → septembre (marketing, gestion de marque). Stage long possible. Profils très adaptés aux marques membres.",
        altNote:   "Mastères Communication Internationale et Management Mode. Démarrage octobre. Excellents profils marketing digital et développement de marque.",
      },
      LISAA: {
        level: "Bac+3 à Bac+5",
        stageDuration: "3 à 6 mois",
        contact: "entreprises@lisaa.com",
        url: "lisaa.com",
        stage:      [0,0,0,0,0,2,2,2,2,0,0,0],
        alternance: [2,2,2,2,2,2,2,2,2,2,2,2],
        stageNote: "Bachelors mode Paris : repère juin → septembre. Mastère e-learning : rentrée possible également en janvier.",
        altNote:   "Disponibilité quasi-annuelle en alternance sur les mastères (dont e-learning). Très flexible pour les marques souhaitant recruter en dehors des périodes habituelles.",
      },
      ESMOD: {
        level: "Bac à Bac+5",
        stageDuration: "2 à 6 mois",
        contact: "À contacter par campus",
        url: "esmod.com",
        stage:      [0,0,0,0,0,1,2,2,1,0,0,0],
        alternance: [0,0,0,0,0,0,0,0,1,1,0,0],
        stageNote: "ESMOD Fashion Business : stages obligatoires en 2e et 3e année. Repère : été. Multi-campus, disponibilité à vérifier par ville.",
        altNote:   "L'alternance n'est pas disponible sur le programme Fashion Business strictement. Quelques ouvertures sur d'autres programmes (Manager International). Repère : automne.",
      },
      "MOD'SPE": {
        level: "Bac+3 à Bac+5",
        stageDuration: "3 à 6 mois",
        contact: "entreprises@ifmparis.fr",
        url: "ifmparis.fr",
        stage:      [0,0,0,0,0,1,1,1,1,0,0,0],
        alternance: [0,0,0,0,0,0,0,0,1,1,0,0],
        stageNote: "Profils business disponibles en stage l'été. À confirmer selon le parcours (bachelor ou mastère).",
        altNote:   "Alternance possible selon le niveau et le programme. À confirmer avec le service entreprises.",
      },
    },
  },
};

/* ─────────────────────────────────────────────────────────
   PUBLISH TIMING
   Stage      : publier 1 mois avant, préparer 2 mois avant
   Alternance : publier 4 mois avant, préparer 5 mois avant
───────────────────────────────────────────────────────── */
function computePublish(avail, type) {
  const result = Array(12).fill(0);
  const leadPub  = type === "alternance" ? 4 : 1;
  const leadPrep = type === "alternance" ? 5 : 2;
  for (let i = 0; i < 12; i++) {
    if (avail[i] > 0 && (i === 0 || avail[i - 1] === 0)) {
      const pub  = i - leadPub;
      const prep = i - leadPrep;
      if (pub  >= 0 && result[pub]  === 0) result[pub]  = 2;
      if (prep >= 0 && result[prep] === 0) result[prep] = 1;
    }
  }
  return result;
}

function deepClone(o) { return JSON.parse(JSON.stringify(o)); }

/* ─────────────────────────────────────────────────────────
   CALENDAR CELL
───────────────────────────────────────────────────────── */
function CalCell({ avail, publish, showPublish, isCurrent, type }) {
  const isAvail   = avail > 0;
  const isPubNow  = showPublish && !isAvail && publish === 2;
  const isPubPrep = showPublish && !isAvail && publish === 1;

  const cellBg =
    avail === 2 ? C.black :
    avail === 1 ? C.grey300 :
    C.grey100;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <div style={{
        height: 24, borderRadius: 2,
        background: cellBg,
        border: avail === 0 ? `1px solid ${C.grey200}` : "none",
        outline: isCurrent && avail > 0 ? `2px solid ${C.black}` : "none",
        outlineOffset: 1,
        position: "relative",
      }}>
        {avail === 2 && (
          <div style={{
            position: "absolute", inset: 0, display: "flex",
            alignItems: "center", justifyContent: "center",
            fontSize: 8, fontWeight: 700, color: C.white,
            letterSpacing: "0.06em",
          }}>
            {type === "stage" ? "S" : "A"}
          </div>
        )}
        {avail === 1 && (
          <div style={{
            position: "absolute", inset: 0, display: "flex",
            alignItems: "center", justifyContent: "center",
            fontSize: 8, color: C.grey700, fontWeight: 600,
          }}>
            {type === "stage" ? "s" : "a"}
          </div>
        )}
        {isCurrent && avail === 0 && (
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: 4, height: 4, borderRadius: "50%",
            background: C.grey500,
          }} />
        )}
      </div>
      {/* Publish bar */}
      {showPublish && (
        <div style={{
          height: 5, borderRadius: 1,
          background:
            isPubNow  ? C.pub :
            isPubPrep ? C.pubLight :
            "transparent",
          border: isPubPrep ? `1px dashed ${C.pubLight}` : "none",
        }} />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   ADMIN CELL
───────────────────────────────────────────────────────── */
function AdminCell({ value, onClick }) {
  return (
    <div
      onClick={onClick}
      title={["Indisponible","Possible","Période forte"][value]}
      style={{
        width: "100%", height: 28, borderRadius: 2, cursor: "pointer",
        background: value === 2 ? C.black : value === 1 ? C.grey300 : C.grey100,
        border: `1px solid ${value === 0 ? C.grey200 : C.grey500}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 9, fontWeight: 700,
        color: value === 2 ? C.white : C.grey700,
        userSelect: "none",
      }}
    >
      {value === 2 ? "●" : value === 1 ? "◐" : "○"}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   PILL BUTTON
───────────────────────────────────────────────────────── */
function Pill({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "5px 14px",
      fontFamily: F, fontSize: 10, fontWeight: active ? 700 : 400,
      letterSpacing: "0.07em", textTransform: "uppercase",
      border: `1px solid ${active ? C.black : C.grey300}`,
      background: active ? C.black : C.white,
      color: active ? C.white : C.grey500,
      cursor: "pointer", borderRadius: 20, transition: "all 0.12s",
      whiteSpace: "nowrap",
    }}>{label}</button>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────── */
export default function App() {
  const [data, setData]             = useState(deepClone(INITIAL_DATA));
  const [activeProfile, setProfile] = useState("CRÉA");
  const [activeType, setType]       = useState("both");
  const [showPublish, setShowPub]   = useState(false);
  const [expanded, setExpanded]     = useState(null);

  // Admin
  const [showLock, setShowLock]     = useState(false);
  const [pwModal, setPwModal]       = useState(false);
  const [pwInput, setPwInput]       = useState("");
  const [pwError, setPwError]       = useState(false);
  const [adminOpen, setAdminOpen]   = useState(false);
  const [adminTab, setAdminTab]     = useState("CRÉA");
  const [adminSchool, setAdminSch]  = useState(null);
  const [draft, setDraft]           = useState(null);

  const handleUnlock = () => {
    if (pwInput === ADMIN_PASSWORD) {
      setPwModal(false); setPwInput(""); setPwError(false);
      setDraft(deepClone(data)); setAdminOpen(true);
    } else { setPwError(true); setPwInput(""); }
  };

  const toggleCell = (profile, school, type, i) => {
    setDraft(prev => {
      const n = deepClone(prev);
      n[profile].schools[school][type][i] = (n[profile].schools[school][type][i] + 1) % 3;
      return n;
    });
  };

  const updateText = (profile, school, field, val) => {
    setDraft(prev => { const n = deepClone(prev); n[profile].schools[school][field] = val; return n; });
  };

  const updateProfileText = (profile, field, val) => {
    setDraft(prev => { const n = deepClone(prev); n[profile][field] = val; return n; });
  };

  const saveAdmin = () => { setData(deepClone(draft)); setAdminOpen(false); setDraft(null); setAdminSch(null); };
  const cancelAdmin = () => { setAdminOpen(false); setDraft(null); setAdminSch(null); };

  const profile   = data[activeProfile];
  const showStage = activeType !== "alternance";
  const showAlt   = activeType !== "stage";

  /* ── RENDER ── */
  return (
    <div style={{ fontFamily: F, background: C.white, minHeight: "100vh", color: C.black }}>

      {/* ── TABS ── */}
      <div style={{ borderBottom: `1px solid ${C.grey200}` }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 32px", display: "flex" }}>
          {Object.keys(data).map(key => {
            const active = activeProfile === key;
            return (
              <button key={key} onClick={() => { setProfile(key); setExpanded(null); }} style={{
                padding: "16px 28px",
                fontFamily: F, fontSize: 11,
                fontWeight: active ? 700 : 400,
                letterSpacing: "0.08em", textTransform: "uppercase",
                border: "none", background: "transparent", cursor: "pointer",
                color: active ? C.black : C.grey500,
                borderBottom: `2px solid ${active ? C.black : "transparent"}`,
                marginBottom: -1, transition: "all 0.12s",
              }}>
                {data[key].fullLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── CONTROLS ── */}
      <div style={{ borderBottom: `1px solid ${C.grey200}`, padding: "12px 32px", background: C.white }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ margin: 0, fontSize: 11, color: C.grey500, fontStyle: "italic" }}>{profile.tagline}</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
            <Pill label="Stages & Alternance" active={activeType === "both"}       onClick={() => setType("both")} />
            <Pill label="Stages uniquement"   active={activeType === "stage"}      onClick={() => setType("stage")} />
            <Pill label="Alternance uniquement" active={activeType === "alternance"} onClick={() => setType("alternance")} />
            <div style={{ width: 1, height: 20, background: C.grey200 }} />
            <button onClick={() => setShowPub(v => !v)} style={{
              padding: "5px 14px",
              fontFamily: F, fontSize: 10,
              fontWeight: showPublish ? 700 : 400,
              letterSpacing: "0.07em", textTransform: "uppercase",
              border: `1px solid ${showPublish ? C.black : C.grey300}`,
              background: showPublish ? C.grey100 : C.white,
              color: showPublish ? C.black : C.grey500,
              cursor: "pointer", borderRadius: 20, transition: "all 0.12s",
              display: "flex", alignItems: "center", gap: 5,
            }}>
              <span>⏱</span> Quand publier mes offres ?
            </button>
          </div>
        </div>
      </div>

      {/* ── PUBLISH EXPLAINER ── */}
      {showPublish && (
        <div style={{ borderBottom: `1px solid ${C.grey200}`, padding: "10px 32px", background: C.grey100 }}>
          <div style={{ maxWidth: 1060, margin: "0 auto", display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: C.black, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              ⏱ Délais conseillés pour publier vos offres
            </span>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {[
                { bg: C.pub,      bd: "none",                  label: "Publier maintenant — 1 mois avant (stage) · 4 mois avant (alternance)" },
                { bg: C.pubLight, bd: `1px dashed ${C.pubLight}`, label: "Commencer à préparer — 2 mois avant (stage) · 5 mois avant (alternance)" },
              ].map((l, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div style={{ width: 18, height: 5, borderRadius: 1, background: l.bg, border: l.bd, flexShrink: 0 }} />
                  <span style={{ fontSize: 10, color: C.grey700 }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── CALENDAR ── */}
      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "28px 32px" }}>

        <p style={{ margin: "0 0 24px", fontSize: 12, color: C.grey700, lineHeight: 1.7, maxWidth: 680 }}>
          {profile.context}
        </p>

        {/* Month header */}
        <div style={{ display: "grid", gridTemplateColumns: "172px repeat(12, 1fr)", gap: 4, marginBottom: 4 }}>
          <div />
          {MONTHS.map((m, i) => (
            <div key={i} style={{
              fontSize: 9, textAlign: "center",
              color: i === CURRENT_MONTH ? C.black : C.grey500,
              fontWeight: i === CURRENT_MONTH ? 700 : 400,
              letterSpacing: "0.07em", textTransform: "uppercase",
              paddingBottom: 5,
              borderBottom: i === CURRENT_MONTH
                ? `2px solid ${C.black}`
                : `1px solid ${C.grey200}`,
            }}>{m}</div>
          ))}
        </div>

        {/* School rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {Object.entries(profile.schools).map(([school, info]) => {
            const isOpen  = expanded === school;
            const stageP  = computePublish(info.stage,      "stage");
            const altP    = computePublish(info.alternance,  "alternance");
            const rows    = [];
            if (showStage) rows.push({ key: "stage",      label: "Stage",      data: info.stage,      publish: stageP });
            if (showAlt)   rows.push({ key: "alternance", label: "Alternance", data: info.alternance, publish: altP   });

            return (
              <div key={school} style={{
                background: C.white,
                border: `1px solid ${isOpen ? C.black : C.grey200}`,
                borderRadius: 4, overflow: "hidden",
                transition: "border-color 0.12s",
              }}>
                {/* Row header */}
                <div
                  onClick={() => setExpanded(isOpen ? null : school)}
                  style={{
                    display: "grid", gridTemplateColumns: "172px 1fr",
                    cursor: "pointer",
                    background: isOpen ? C.grey100 : C.white,
                  }}
                >
                  {/* School label */}
                  <div style={{
                    padding: "14px 16px", borderRight: `1px solid ${C.grey200}`,
                    display: "flex", flexDirection: "column", justifyContent: "center", gap: 4,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 7, height: 7, background: C.black, borderRadius: 1, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.black }}>{school}</span>
                      <span style={{ marginLeft: "auto", fontSize: 10, color: C.grey500 }}>
                        {isOpen ? "▲" : "▼"}
                      </span>
                    </div>
                    <div style={{ fontSize: 9, color: C.grey500, marginLeft: 15, letterSpacing: "0.05em" }}>
                      {info.level}
                    </div>
                    <div style={{ display: "flex", gap: 4, marginLeft: 15 }}>
                      {showStage && info.stage.some(v => v > 0) && (
                        <span style={{
                          fontSize: 8, padding: "1px 6px", borderRadius: 2,
                          background: C.black, color: C.white,
                          fontWeight: 700, letterSpacing: "0.06em",
                        }}>STAGE</span>
                      )}
                      {showAlt && info.alternance.some(v => v > 0) && (
                        <span style={{
                          fontSize: 8, padding: "1px 6px", borderRadius: 2,
                          background: C.white, color: C.black,
                          border: `1px solid ${C.black}`,
                          fontWeight: 700, letterSpacing: "0.06em",
                        }}>ALTERNANCE</span>
                      )}
                    </div>
                  </div>

                  {/* Bars */}
                  <div style={{ padding: "10px 8px 8px", display: "flex", flexDirection: "column", gap: 8 }}>
                    {rows.map(row => (
                      <div key={row.key}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 4 }}>
                          {MONTHS.map((_, mi) => (
                            <CalCell
                              key={mi}
                              avail={row.data[mi]}
                              publish={row.publish[mi]}
                              showPublish={showPublish}
                              isCurrent={mi === CURRENT_MONTH}
                              type={row.key}
                            />
                          ))}
                        </div>
                        <div style={{
                          fontSize: 8, color: C.grey500, marginTop: 3,
                          letterSpacing: "0.09em", textTransform: "uppercase",
                          display: "flex", alignItems: "center", gap: 6,
                        }}>
                          {row.label}
                          {showPublish && row.publish.some(p => p > 0) && (
                            <span style={{ color: C.grey500 }}>· ⏱ publication</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expanded */}
                {isOpen && (
                  <div style={{
                    borderTop: `1px solid ${C.grey200}`,
                    display: "grid", gridTemplateColumns: "172px 1fr",
                  }}>
                    {/* Meta */}
                    <div style={{
                      padding: "18px 16px", borderRight: `1px solid ${C.grey200}`,
                      background: C.grey100,
                    }}>
                      <div style={{
                        fontSize: 9, fontWeight: 700, letterSpacing: "0.1em",
                        textTransform: "uppercase", color: C.grey700, marginBottom: 12,
                      }}>Informations</div>
                      {[
                        { label: "Niveau",       value: info.level },
                        { label: "Durée stage",  value: info.stageDuration },
                        { label: "Contact",      value: info.contact },
                        { label: "Site web",     value: info.url },
                      ].map((row, i) => (
                        <div key={i} style={{ marginBottom: 10 }}>
                          <div style={{ fontSize: 9, color: C.grey500, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                            {row.label}
                          </div>
                          <div style={{ fontSize: 11, color: C.black, marginTop: 2, lineHeight: 1.4 }}>
                            {row.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Notes */}
                    <div style={{
                      padding: "18px 22px",
                      display: "grid",
                      gridTemplateColumns: showStage && showAlt ? "1fr 1fr" : "1fr",
                      gap: 24,
                    }}>
                      {showStage && (
                        <div>
                          <div style={{
                            fontSize: 9, fontWeight: 700, letterSpacing: "0.12em",
                            textTransform: "uppercase", marginBottom: 8,
                            display: "flex", alignItems: "center", gap: 6,
                          }}>
                            <div style={{ width: 7, height: 7, background: C.black, borderRadius: 1 }} />
                            Stage
                          </div>
                          <p style={{ margin: 0, fontSize: 12, color: C.grey700, lineHeight: 1.75 }}>
                            {info.stageNote}
                          </p>
                          {showPublish && stageP.some(p => p > 0) && (
                            <div style={{
                              marginTop: 12, padding: "8px 12px",
                              background: C.grey100, border: `1px solid ${C.grey300}`, borderRadius: 3,
                            }}>
                              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
                                ⏱ Publication
                              </div>
                              <div style={{ fontSize: 11, color: C.grey700, lineHeight: 1.6 }}>
                                Publiez vos offres de stage <strong>4 à 6 semaines avant</strong> la période de disponibilité.
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      {showAlt && (
                        <div>
                          <div style={{
                            fontSize: 9, fontWeight: 700, letterSpacing: "0.12em",
                            textTransform: "uppercase", marginBottom: 8,
                            display: "flex", alignItems: "center", gap: 6,
                          }}>
                            <div style={{ width: 7, height: 7, border: `2px solid ${C.black}`, borderRadius: 1 }} />
                            Alternance
                          </div>
                          <p style={{ margin: 0, fontSize: 12, color: C.grey700, lineHeight: 1.75 }}>
                            {info.altNote}
                          </p>
                          {showPublish && altP.some(p => p > 0) && (
                            <div style={{
                              marginTop: 12, padding: "8px 12px",
                              background: C.grey100, border: `1px solid ${C.grey300}`, borderRadius: 3,
                            }}>
                              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
                                ⏱ Publication
                              </div>
                              <div style={{ fontSize: 11, color: C.grey700, lineHeight: 1.6 }}>
                                Pour une rentrée <strong>septembre–octobre</strong>, publiez vos offres d'alternance <strong>dès avril–mai</strong>. Les meilleurs profils sont souvent engagés avant l'été.
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{
          marginTop: 20, padding: "12px 16px",
          border: `1px solid ${C.grey200}`,
          borderRadius: 4,
          display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center",
        }}>
          <span style={{ fontSize: 9, fontWeight: 700, color: C.grey700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Légende
          </span>
          {[
            { bg: C.black,    bd: "none",                      label: "Période forte" },
            { bg: C.grey300,  bd: "none",                      label: "Période possible" },
            ...(showPublish ? [
              { bg: C.pub,      bd: "none",                    label: "⏱ Publier maintenant" },
              { bg: C.pubLight, bd: `1px dashed ${C.pubLight}`, label: "⏱ Commencer à préparer" },
            ] : []),
          ].map((l, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 18, height: 9, borderRadius: 2, background: l.bg, border: l.bd, flexShrink: 0 }} />
              <span style={{ fontSize: 10, color: C.grey700 }}>{l.label}</span>
            </div>
          ))}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 2, height: 14, background: C.black, borderRadius: 1 }} />
            <span style={{ fontSize: 9, color: C.grey500 }}>Mois en cours</span>
          </div>
        </div>

        <p style={{ marginTop: 12, fontSize: 10, color: C.grey500, lineHeight: 1.7, marginBottom: 40 }}>
          * Calendriers indicatifs. Les dates exactes varient selon le campus, l'année d'étude et le parcours de l'étudiant.
          En cas de doute, toujours valider avec le service Relations Entreprises de l'école concernée.
          Cliquer sur une école pour afficher la fiche détaillée.
        </p>
      </div>

      {/* ── HIDDEN ADMIN TRIGGER ── */}
      <div
        onMouseEnter={() => setShowLock(true)}
        onMouseLeave={() => setShowLock(false)}
        onClick={() => setPwModal(true)}
        style={{
          position: "fixed", bottom: 14, right: 14,
          width: 22, height: 22, cursor: "pointer", zIndex: 200,
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: showLock ? 0.35 : 0,
          transition: "opacity 0.2s",
          fontSize: 13,
        }}
      >🔒</div>

      {/* ── PASSWORD MODAL ── */}
      {pwModal && (
        <div
          onClick={() => { setPwModal(false); setPwInput(""); setPwError(false); }}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: C.white, borderRadius: 6, padding: "32px 36px",
              width: 320, border: `1px solid ${C.grey200}`,
              boxShadow: "0 8px 40px rgba(0,0,0,0.14)",
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>
              Accès administration
            </div>
            <p style={{ margin: "0 0 20px", fontSize: 12, color: C.grey500 }}>
              Entrez le mot de passe pour accéder au backoffice.
            </p>
            <input
              type="password" value={pwInput}
              onChange={e => { setPwInput(e.target.value); setPwError(false); }}
              onKeyDown={e => e.key === "Enter" && handleUnlock()}
              placeholder="Mot de passe"
              autoFocus
              style={{
                width: "100%", padding: "10px 12px", fontFamily: F,
                fontSize: 13, border: `1px solid ${pwError ? "#000" : C.grey300}`,
                borderRadius: 3, outline: "none", boxSizing: "border-box",
                marginBottom: pwError ? 6 : 14,
              }}
            />
            {pwError && (
              <div style={{ fontSize: 11, marginBottom: 10 }}>Mot de passe incorrect.</div>
            )}
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={handleUnlock} style={{
                flex: 1, padding: "9px 0", fontFamily: F,
                fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                background: C.black, color: C.white, border: "none", borderRadius: 3, cursor: "pointer",
              }}>Accéder</button>
              <button onClick={() => { setPwModal(false); setPwInput(""); setPwError(false); }} style={{
                padding: "9px 16px", fontFamily: F,
                fontSize: 11, color: C.grey700, background: C.grey100,
                border: `1px solid ${C.grey200}`, borderRadius: 3, cursor: "pointer",
              }}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      {/* ── ADMIN OVERLAY ── */}
      {adminOpen && draft && (
        <div style={{
          position: "fixed", inset: 0, background: C.white,
          zIndex: 400, overflowY: "auto", fontFamily: F,
        }}>
          {/* Admin topbar */}
          <div style={{
            position: "sticky", top: 0, zIndex: 10,
            background: C.black, padding: "0 32px",
            display: "flex", alignItems: "center", justifyContent: "space-between", height: 52,
          }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.white, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Administration — Calendrier Académie
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={saveAdmin} style={{
                padding: "7px 18px", fontFamily: F,
                fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
                background: C.white, color: C.black, border: "none", borderRadius: 3, cursor: "pointer",
              }}>✓ Sauvegarder</button>
              <button onClick={cancelAdmin} style={{
                padding: "7px 14px", fontFamily: F,
                fontSize: 11, color: "rgba(255,255,255,0.6)",
                background: "transparent", border: `1px solid rgba(255,255,255,0.2)`,
                borderRadius: 3, cursor: "pointer",
              }}>Annuler</button>
            </div>
          </div>

          <div style={{ maxWidth: 1060, margin: "0 auto", padding: "28px 32px" }}>
            {/* Profile tabs */}
            <div style={{ display: "flex", borderBottom: `2px solid ${C.grey200}`, marginBottom: 24 }}>
              {Object.keys(draft).map(key => (
                <button key={key} onClick={() => { setAdminTab(key); setAdminSch(null); }} style={{
                  padding: "10px 24px", fontFamily: F,
                  fontSize: 11, fontWeight: adminTab === key ? 700 : 400,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  border: "none", background: "transparent", cursor: "pointer",
                  color: adminTab === key ? C.black : C.grey500,
                  borderBottom: `2px solid ${adminTab === key ? C.black : "transparent"}`,
                  marginBottom: -2, transition: "all 0.1s",
                }}>{draft[key].fullLabel}</button>
              ))}
            </div>

            {/* Profile-level texts */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
              {[
                { key: "tagline", label: "Tagline (métiers)" },
                { key: "context", label: "Texte de contexte" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: 9, color: C.grey500, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 4 }}>
                    {f.label}
                  </label>
                  <textarea
                    value={draft[adminTab][f.key]}
                    onChange={e => updateProfileText(adminTab, f.key, e.target.value)}
                    style={{
                      width: "100%", padding: "8px 10px", fontFamily: F, fontSize: 11,
                      border: `1px solid ${C.grey200}`, borderRadius: 3,
                      boxSizing: "border-box", resize: "vertical", minHeight: 60,
                      lineHeight: 1.6,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* School editors */}
            {Object.entries(draft[adminTab].schools).map(([school, info]) => {
              const isOpen = adminSchool === school;
              return (
                <div key={school} style={{
                  border: `1px solid ${isOpen ? C.black : C.grey200}`,
                  borderRadius: 4, marginBottom: 6, overflow: "hidden",
                }}>
                  <div
                    onClick={() => setAdminSch(isOpen ? null : school)}
                    style={{
                      padding: "14px 18px", cursor: "pointer",
                      display: "flex", alignItems: "center", gap: 10,
                      background: isOpen ? C.grey100 : C.white,
                    }}
                  >
                    <div style={{ width: 7, height: 7, background: C.black, borderRadius: 1 }} />
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{school}</span>
                    <span style={{ fontSize: 11, color: C.grey500 }}>{info.level}</span>
                    <span style={{ marginLeft: "auto", fontSize: 10, color: C.grey500 }}>{isOpen ? "▲" : "▼"}</span>
                  </div>

                  {isOpen && (
                    <div style={{ padding: "0 18px 20px", borderTop: `1px solid ${C.grey200}` }}>
                      {[
                        { key: "stage",      label: "Stage" },
                        { key: "alternance", label: "Alternance" },
                      ].map(row => (
                        <div key={row.key} style={{ marginTop: 18 }}>
                          <div style={{
                            fontSize: 9, fontWeight: 700, textTransform: "uppercase",
                            letterSpacing: "0.1em", marginBottom: 8, color: C.grey700,
                          }}>
                            {row.label}
                            <span style={{ color: C.grey500, fontWeight: 400, marginLeft: 10 }}>
                              Cliquer pour modifier · ○ indisponible · ◐ possible · ● forte
                            </span>
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 4 }}>
                            {MONTHS.map((m, mi) => (
                              <div key={mi}>
                                <div style={{ fontSize: 8, textAlign: "center", color: C.grey500, marginBottom: 3 }}>{m}</div>
                                <AdminCell
                                  value={draft[adminTab].schools[school][row.key][mi]}
                                  onClick={() => toggleCell(adminTab, school, row.key, mi)}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}

                      {/* Text fields */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 20 }}>
                        {[
                          { key: "stageNote",     label: "Note stage" },
                          { key: "altNote",       label: "Note alternance" },
                        ].map(f => (
                          <div key={f.key}>
                            <label style={{ fontSize: 9, color: C.grey500, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 4 }}>
                              {f.label}
                            </label>
                            <textarea
                              value={info[f.key]}
                              onChange={e => updateText(adminTab, school, f.key, e.target.value)}
                              style={{
                                width: "100%", padding: "8px 10px", fontFamily: F, fontSize: 11,
                                border: `1px solid ${C.grey200}`, borderRadius: 3,
                                boxSizing: "border-box", resize: "vertical", minHeight: 80,
                                lineHeight: 1.6,
                              }}
                            />
                          </div>
                        ))}
                        {[
                          { key: "level",         label: "Niveaux d'étude" },
                          { key: "stageDuration", label: "Durée de stage" },
                          { key: "contact",       label: "Contact entreprises" },
                          { key: "url",           label: "Site web" },
                        ].map(f => (
                          <div key={f.key}>
                            <label style={{ fontSize: 9, color: C.grey500, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 4 }}>
                              {f.label}
                            </label>
                            <input
                              value={info[f.key]}
                              onChange={e => updateText(adminTab, school, f.key, e.target.value)}
                              style={{
                                width: "100%", padding: "8px 10px", fontFamily: F, fontSize: 11,
                                border: `1px solid ${C.grey200}`, borderRadius: 3,
                                boxSizing: "border-box",
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
