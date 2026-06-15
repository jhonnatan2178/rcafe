// @ts-nocheck
import { useState } from "react";

// ── helpers ──────────────────────────────────────────────────────────────────
function CopyButton({ targetId }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    const el = document.getElementById(targetId);
    navigator.clipboard.writeText(el.innerText || el.textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return <button onClick={copy} style={s.copyBtn}>{copied ? "✓ Copied" : "Copy"}</button>;
}

function CodeBlock({ id, lang, children }) {
  return (
    <div style={s.codeWrap}>
      <div style={s.codeHeader}>
        <span style={s.codeLang}>{lang}</span>
        <CopyButton targetId={id} />
      </div>
      <pre style={s.pre}><code id={id}>{children}</code></pre>
    </div>
  );
}

function Callout({ type = "info", children }) {
  const map = {
    info:    { bg: "#EFF6FF", border: "#3B82F6", icon: "ℹ️" },
    tip:     { bg: "#F0FDF4", border: "#22C55E", icon: "💡" },
    warning: { bg: "#FFFBEB", border: "#F59E0B", icon: "⚠️" },
    danger:  { bg: "#FEF2F2", border: "#EF4444", icon: "🚨" },
  };
  const c = map[type];
  return (
    <div style={{ ...s.callout, background: c.bg, borderLeft: `4px solid ${c.border}` }}>
      <span style={{ marginRight: 8 }}>{c.icon}</span>{children}
    </div>
  );
}

// ── distortion type cards ────────────────────────────────────────────────────
function DistortionCards() {
  const types = [
    { icon: "📐", name: "Area", desc: "Preserves the correct size of features. Essential for comparing regions, computing land use, or any area-based analysis.", example: "Equal-area: Albers, Mollweide, Goode's Homolosine", color: "#7C3AED", bg: "#F5F3FF" },
    { icon: "🔷", name: "Shape", desc: "Preserves angles and local shapes (conformal). Streets meet at correct angles, useful for navigation.", example: "Conformal: Mercator, Lambert Conformal Conic", color: "#2563EB", bg: "#EFF6FF" },
    { icon: "📏", name: "Distance", desc: "Preserves true distances from one or two reference points. Useful for radial analyses.", example: "Equidistant: Azimuthal Equidistant, Equirectangular", color: "#059669", bg: "#F0FDF4" },
    { icon: "🧭", name: "Direction", desc: "Preserves correct compass bearings. Critical for aviation routes and navigation systems.", example: "Azimuthal: Gnomonic projection", color: "#D97706", bg: "#FFFBEB" },
  ];
  return (
    <div style={s.fourGrid}>
      {types.map((t, i) => (
        <div key={i} style={{ ...s.distCard, background: t.bg, borderColor: t.color + "40" }}>
          <div style={s.distIcon}>{t.icon}</div>
          <div style={{ ...s.distName, color: t.color }}>{t.name}</div>
          <div style={s.distDesc}>{t.desc}</div>
          <div style={{ ...s.distExample, color: t.color }}>e.g. {t.example}</div>
        </div>
      ))}
    </div>
  );
}

// ── Africa vs Greenland visual ────────────────────────────────────────────────
function AreaComparison() {
  const [showReal, setShowReal] = useState(false);
  return (
    <div style={s.compareBox}>
      <div style={s.compareTitle}>The Mercator distortion — visualised</div>
      <div style={s.compareToggle}>
        <button onClick={() => setShowReal(false)}
          style={{ ...s.toggleBtn, ...(showReal ? {} : s.toggleBtnActive) }}>
          🗺️ Mercator (perceived)
        </button>
        <button onClick={() => setShowReal(true)}
          style={{ ...s.toggleBtn, ...(showReal ? s.toggleBtnActive : {}) }}>
          🌍 Reality (equal-area)
        </button>
      </div>
      <div style={s.compareGrid}>
        {/* Africa */}
        <div style={s.compareItem}>
          <svg viewBox="0 0 120 140" style={{ width: showReal ? 180 : 130, transition: "width 0.4s ease", display: "block", margin: "0 auto" }}>
            <path d="M40,5 L80,5 L95,20 L100,45 L90,70 L100,90 L85,120 L60,135 L40,120 L25,95 L30,70 L20,45 L25,20 Z"
              fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
            <text x="60" y="75" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7C2D12">Africa</text>
            <text x="60" y="90" textAnchor="middle" fontSize="9" fill="#7C2D12">30.4M km²</text>
          </svg>
          <div style={s.compareLabel}>Africa</div>
          <div style={s.compareReal}>{showReal ? "30.4 million km²" : "Appears smaller"}</div>
        </div>
        {/* Greenland */}
        <div style={s.compareItem}>
          <svg viewBox="0 0 120 140" style={{ width: showReal ? 60 : 130, transition: "width 0.4s ease", display: "block", margin: "0 auto" }}>
            <path d="M20,20 L55,10 L90,20 L100,50 L85,80 L70,100 L55,110 L40,95 L25,75 L15,50 Z"
              fill="#BAE6FD" stroke="#0369A1" strokeWidth="1.5" />
            <text x="57" y="60" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0C4A6E">Greenland</text>
            <text x="57" y="74" textAnchor="middle" fontSize="9" fill="#0C4A6E">2.1M km²</text>
          </svg>
          <div style={s.compareLabel}>Greenland</div>
          <div style={s.compareReal}>{showReal ? "2.1 million km²" : "Appears similar size"}</div>
        </div>
      </div>
      <div style={s.compareFact}>
        {showReal
          ? "✓ In reality, Africa is ~14× larger than Greenland"
          : "⚠️ On Mercator maps they look similar in size — a classic distortion"}
      </div>
    </div>
  );
}

// ── CRS type explorer ────────────────────────────────────────────────────────
function CRSExplorer() {
  const [active, setActive] = useState(0);
  const types = [
    {
      name: "Geographic CRS",
      epsg: "EPSG:4326 — WGS84",
      icon: "🌐",
      color: "#2563EB",
      bg: "#EFF6FF",
      coords: "Degrees (latitude / longitude)",
      unit: "Degrees",
      use: "Raw data storage, web mapping, GPS, global datasets",
      pros: ["Works anywhere on Earth", "Universally understood", "No projection distortion of position"],
      cons: ["Cannot calculate distances or areas directly in metres", "Degrees ≠ equal distances at different latitudes"],
      example: "lon=-74.0, lat=4.7 → Bogotá, Colombia",
      python: `import geopandas as gpd

gdf = gpd.read_file("colombia.shp")
print(gdf.crs)          # CRS: EPSG:4326
print(gdf.crs.axis_info)

# Inspect coordinates — returns degrees
print(gdf.geometry.iloc[0].centroid)
# POINT (-74.297 4.570)

# DO NOT calculate area in geographic CRS!
# gdf.geometry.area  ← returns degrees², meaningless`,
    },
    {
      name: "Projected CRS",
      epsg: "EPSG:32618 — UTM Zone 18N",
      icon: "📐",
      color: "#059669",
      bg: "#F0FDF4",
      coords: "Metres (Easting / Northing)",
      unit: "Metres",
      use: "Spatial analysis, accurate area/distance calculation, regional mapping",
      pros: ["Metres — easy to measure distances", "Accurate area calculation", "Optimised for a specific region"],
      cons: ["Only accurate within its zone/region", "Distortion increases away from the central meridian"],
      example: "Easting=630000, Northing=512000 → Somewhere in Colombia (UTM 18N)",
      python: `import geopandas as gpd

gdf = gpd.read_file("colombia.shp")

# Reproject to UTM Zone 18N (covers most of Colombia)
gdf_utm = gdf.to_crs("EPSG:32618")
print(gdf_utm.crs)      # CRS: EPSG:32618

# Now area calculations are meaningful
gdf_utm["area_km2"] = gdf_utm.geometry.area / 1e6
print(gdf_utm[["name", "area_km2"]].head())

# Distances are also in metres
from shapely.geometry import Point
bogota = Point(-74.0, 4.7)
bogota_utm = gpd.GeoSeries([bogota], crs="EPSG:4326").to_crs("EPSG:32618")
medellin = Point(-75.6, 6.2)
medellin_utm = gpd.GeoSeries([medellin], crs="EPSG:4326").to_crs("EPSG:32618")
dist_km = bogota_utm.distance(medellin_utm).iloc[0] / 1000
print(f"Bogotá → Medellín: {dist_km:.1f} km")`,
    },
    {
      name: "Web Mercator",
      epsg: "EPSG:3857 — Pseudo-Mercator",
      icon: "🗺️",
      color: "#D97706",
      bg: "#FFFBEB",
      coords: "Metres (projected, but not equal-area)",
      unit: "Metres (distorted at poles)",
      use: "Web mapping tiles (Google Maps, OpenStreetMap, Leaflet)",
      pros: ["Standard for web map tiles", "Shapes preserved locally", "Fast tile rendering"],
      cons: ["Severe area distortion at high latitudes", "Not suitable for area/distance analysis", "Greenland appears same size as Africa"],
      example: "Coordinates in metres from the equator — only for display tiles",
      python: `import geopandas as gpd

# Web Mercator is for DISPLAY only, not analysis
gdf = gpd.read_file("world.shp")

# For a Leaflet/Folium web map — tiles expect EPSG:4326 or EPSG:3857
gdf_webmercator = gdf.to_crs("EPSG:3857")

# ⚠️ DO NOT calculate area in EPSG:3857
# gdf_webmercator.geometry.area  ← heavily distorted

# CORRECT workflow:
# 1. Store/analyse in EPSG:4326 or local UTM
# 2. Convert to EPSG:3857 only for rendering
import folium
m = folium.Map(location=[4.7, -74.1], zoom_start=6)
folium.GeoJson(gdf.to_crs("EPSG:4326")).add_to(m)
m.save("colombia_map.html")`,
    },
  ];

  const active_crs = types[active];

  return (
    <div style={s.explorerBox}>
      <div style={s.explorerNav}>
        {types.map((t, i) => (
          <button key={i} onClick={() => setActive(i)}
            style={{ ...s.explorerBtn, ...(active === i ? { background: t.color, color: "#fff", borderColor: t.color } : {}) }}>
            {t.icon} {t.name}
          </button>
        ))}
      </div>
      <div style={{ ...s.explorerContent, background: active_crs.bg, borderColor: active_crs.color + "30" }}>
        <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
          <div style={{ ...s.explorerBadge, background: active_crs.color }}>{active_crs.epsg}</div>
          <div style={s.explorerMeta}>📍 Units: <strong>{active_crs.unit}</strong></div>
          <div style={s.explorerMeta}>🎯 Best for: <strong>{active_crs.use}</strong></div>
        </div>
        <div style={s.proConGrid}>
          <div>
            <div style={s.proConTitle}>✅ Advantages</div>
            {active_crs.pros.map((p, i) => <div key={i} style={s.proItem}>• {p}</div>)}
          </div>
          <div>
            <div style={s.proConTitle}>❌ Watch out for</div>
            {active_crs.cons.map((c, i) => <div key={i} style={s.conItem}>• {c}</div>)}
          </div>
        </div>
        <div style={s.explorerExample}>📌 {active_crs.example}</div>
        <CodeBlock id={`crs-${active}`} lang="python">{active_crs.python}</CodeBlock>
      </div>
    </div>
  );
}

// ── common EPSG table ────────────────────────────────────────────────────────
function EPSGTable() {
  const rows = [
    ["EPSG:4326", "WGS 84", "Geographic", "Global", "GPS, raw data, data exchange"],
    ["EPSG:3857", "Web Mercator", "Projected (spherical)", "Global (web)", "Web map tiles only"],
    ["EPSG:32618", "UTM Zone 18N", "Projected (UTM)", "Colombia / Caribbean", "Analysis in N Colombia"],
    ["EPSG:32633", "UTM Zone 33N", "Projected (UTM)", "Italy (centre)", "Analysis in Italy"],
    ["EPSG:23032", "ED50 / UTM 32N", "Projected (UTM)", "Europe", "Legacy EU data"],
    ["EPSG:3035", "LAEA Europe", "Projected (Equal-area)", "Europe", "EU statistical analysis"],
    ["EPSG:9377", "MAGNA-SIRGAS / CTM-12", "Projected", "Colombia", "Official Colombian CRS"],
  ];
  return (
    <div style={{ overflowX: "auto", marginBottom: 24 }}>
      <table style={s.table}>
        <thead>
          <tr>
            {["EPSG Code", "Name", "Type", "Coverage", "Best use"].map(h => (
              <th key={h} style={s.th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "#FAFAFA" : "#fff" }}>
              <td style={{ ...s.td, fontFamily: "monospace", color: "#2563EB", fontWeight: 600 }}>{row[0]}</td>
              {row.slice(1).map((cell, j) => <td key={j} style={s.td}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── common errors visual ─────────────────────────────────────────────────────
function CommonErrors() {
  const errors = [
    {
      icon: "🔀",
      title: "Layer misalignment",
      bad: `# ❌ Mixing CRS without checking
roads = gpd.read_file("roads.shp")     # EPSG:4326
basins = gpd.read_file("basins.shp")   # EPSG:32618
overlay = gpd.overlay(roads, basins)   # WRONG — layers don't align`,
      good: `# ✅ Always align CRS before overlay
roads = gpd.read_file("roads.shp")
basins = gpd.read_file("basins.shp")
basins = basins.to_crs(roads.crs)      # reproject to match
overlay = gpd.overlay(roads, basins)   # correct`,
      color: "#EF4444",
    },
    {
      icon: "📐",
      title: "Area calculated in degrees",
      bad: `# ❌ Area in geographic CRS (wrong!)
gdf = gpd.read_file("parks.shp")       # EPSG:4326
gdf["area"] = gdf.geometry.area        # returns degrees² — meaningless`,
      good: `# ✅ Always project before area/distance
gdf = gpd.read_file("parks.shp")       # EPSG:4326
gdf_m = gdf.to_crs("EPSG:32618")       # reproject to metres
gdf_m["area_km2"] = gdf_m.geometry.area / 1e6   # correct km²`,
      color: "#F59E0B",
    },
    {
      icon: "❓",
      title: "Unknown or missing CRS",
      bad: `# ❌ Shapefile with no .prj file
gdf = gpd.read_file("old_data.shp")
print(gdf.crs)   # None — CRS is unknown`,
      good: `# ✅ Assign CRS if you know it from metadata
gdf = gpd.read_file("old_data.shp")
gdf = gdf.set_crs("EPSG:4326")         # assign (not reproject!)
# Then reproject if needed
gdf = gdf.to_crs("EPSG:32618")`,
      color: "#7C3AED",
    },
  ];
  const [open, setOpen] = useState(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {errors.map((e, i) => (
        <div key={i} style={{ border: `1.5px solid ${open===i ? e.color : "#E5E7EB"}`, borderRadius: 10, overflow: "hidden" }}>
          <button onClick={() => setOpen(open === i ? null : i)}
            style={{ width: "100%", textAlign: "left", padding: "13px 16px", background: open===i ? e.color+"10" : "#F9FAFB",
              border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18 }}>{e.icon}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{e.title}</span>
            <span style={{ marginLeft: "auto", color: "#6B7280", fontSize: 12 }}>{open===i ? "▲" : "▼"}</span>
          </button>
          {open === i && (
            <div style={{ padding: "0 16px 16px" }}>
              <CodeBlock id={`bad-${i}`} lang="python">{e.bad}</CodeBlock>
              <CodeBlock id={`good-${i}`} lang="python">{e.good}</CodeBlock>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── decision flowchart ────────────────────────────────────────────────────────
function DecisionGuide() {
  const [answers, setAnswers] = useState({});
  const questions = [
    { id: "scope", q: "What's your geographic scope?", opts: ["Global / multi-continent", "Single country or region"] },
    { id: "purpose", q: "What's your main purpose?", opts: ["Area / distance calculation", "Web map display", "Data exchange / GPS"] },
    { id: "country", q: "Which region are you working in?", opts: ["Colombia", "Italy / Europe", "Other"] },
  ];
  const recommendation = () => {
    if (!answers.scope) return null;
    if (answers.scope === "Global / multi-continent") {
      if (answers.purpose === "Web map display") return { crs: "EPSG:3857", note: "Web Mercator — standard for web tile layers" };
      return { crs: "EPSG:4326", note: "WGS84 — global standard for raw data and exchange" };
    }
    if (answers.purpose === "Web map display") return { crs: "EPSG:3857 / EPSG:4326", note: "Use 4326 for data, 3857 for tile rendering" };
    if (answers.purpose === "Data exchange / GPS") return { crs: "EPSG:4326", note: "WGS84 is the standard for GPS and data sharing" };
    if (answers.country === "Colombia") return { crs: "EPSG:9377", note: "CTM-12 — official Colombian CRS since 2020, or UTM Zone 18N (EPSG:32618) for N Colombia" };
    if (answers.country === "Italy / Europe") return { crs: "EPSG:32633", note: "UTM Zone 33N for central Italy, or EPSG:3035 (LAEA) for EU-wide equal-area analysis" };
    return { crs: "Local UTM zone", note: "Find your UTM zone at epsg.io — search your country name" };
  };
  const rec = recommendation();
  return (
    <div style={s.decisionBox}>
      <div style={s.decisionTitle}>Which CRS should I use?</div>
      {questions.map((q, i) => {
        const prev = i === 0 || answers[questions[i-1].id];
        if (!prev) return null;
        return (
          <div key={q.id} style={{ marginBottom: 16 }}>
            <div style={s.decisionQ}>{q.q}</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {q.opts.map(opt => (
                <button key={opt} onClick={() => {
                  const newA = { ...answers, [q.id]: opt };
                  // Clear later answers
                  questions.slice(i+1).forEach(qq => delete newA[qq.id]);
                  setAnswers(newA);
                }} style={{ ...s.decisionOpt, ...(answers[q.id]===opt ? s.decisionOptActive : {}) }}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );
      })}
      {rec && (
        <div style={s.decisionResult}>
          <div style={s.decisionResultLabel}>Recommended CRS</div>
          <div style={s.decisionResultCRS}>{rec.crs}</div>
          <div style={s.decisionResultNote}>{rec.note}</div>
          <a href="https://epsg.io" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 12, color: "#2563EB", marginTop: 8, display: "inline-block" }}>
            Look up any EPSG code at epsg.io →
          </a>
        </div>
      )}
    </div>
  );
}

// ── quiz ─────────────────────────────────────────────────────────────────────
function Quiz() {
  const qs = [
    { q: "You need to calculate the area of river basins in Colombia in km². Which CRS should you use?", opts: ["EPSG:4326 (WGS84)", "EPSG:32618 (UTM Zone 18N)", "EPSG:3857 (Web Mercator)"], ans: 1, exp: "Always reproject to a local UTM zone before calculating area. EPSG:4326 gives degrees², and EPSG:3857 has severe area distortion. UTM 18N gives accurate areas in metres." },
    { q: "What's the difference between set_crs() and to_crs() in GeoPandas?", opts: ["They do the same thing", "set_crs() assigns a CRS without moving data; to_crs() reprojects coordinates", "to_crs() is for rasters only"], ans: 1, exp: "set_crs() just labels the CRS — use when the file has no .prj and you know what it should be. to_crs() actually transforms the coordinates. Using to_crs() on data with no CRS will fail." },
    { q: "Why is EPSG:3857 (Web Mercator) bad for area analysis?", opts: ["It only works in Europe", "It distorts areas — especially near the poles", "It uses degrees instead of metres"], ans: 1, exp: "Web Mercator preserves shapes locally but severely distorts areas away from the equator. Greenland appears similar in size to Africa. Never use it for area calculations." },
    { q: "You receive a shapefile with no .prj file and crs=None. What should you do first?", opts: ["Run to_crs('EPSG:4326') to fix it", "Use set_crs() to assign the correct CRS based on the data's metadata", "Delete the file — it's unusable"], ans: 1, exp: "set_crs() assigns a CRS without moving coordinates. Check the data's documentation or metadata to find the intended CRS, then assign it. Only then reproject with to_crs() if needed." },
  ];
  const [chosen, setChosen] = useState({});
  const [revealed, setRevealed] = useState({});
  const choose = (qi, oi) => { if (!revealed[qi]) setChosen(c => ({ ...c, [qi]: oi })); };
  const reveal = (qi) => { if (chosen[qi] !== undefined) setRevealed(r => ({ ...r, [qi]: true })); };
  return (
    <div>
      {qs.map((q, qi) => (
        <div key={qi} style={s.quizCard}>
          <p style={s.quizQ}><strong>Q{qi+1}.</strong> {q.q}</p>
          <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
            {q.opts.map((opt, oi) => {
              let bg="#fff", border="1.5px solid #E5E7EB";
              if (revealed[qi]) {
                if (oi===q.ans) { bg="#F0FDF4"; border="1.5px solid #22C55E"; }
                else if (chosen[qi]===oi) { bg="#FEF2F2"; border="1.5px solid #EF4444"; }
              } else if (chosen[qi]===oi) { bg="#EFF6FF"; border="1.5px solid #3B82F6"; }
              return <button key={oi} onClick={() => choose(qi,oi)}
                style={{ ...s.quizOpt, background:bg, border, cursor:revealed[qi]?"default":"pointer" }}>
                {opt}{revealed[qi]&&oi===q.ans&&" ✓"}{revealed[qi]&&chosen[qi]===oi&&oi!==q.ans&&" ✗"}
              </button>;
            })}
          </div>
          {!revealed[qi] && <button onClick={()=>reveal(qi)} disabled={chosen[qi]===undefined} style={s.revealBtn}>Check answer</button>}
          {revealed[qi] && <div style={s.explanation}><strong>{chosen[qi]===q.ans?"Correct! ":"Not quite. "}</strong>{q.exp}</div>}
        </div>
      ))}
    </div>
  );
}

// ── main ─────────────────────────────────────────────────────────────────────
export default function CRSExplained() {
  return (
    <div style={s.page}>
      <div style={s.breadcrumb}>
        <span>GIS Applications</span><span style={s.sep}>›</span>
        <span>Basic Stuff</span><span style={s.sep}>›</span>
        <span style={{color:"#111"}}>Coordinate Reference Systems</span>
      </div>

      <div style={s.tags}>
        {["Beginner","~25 min","Python + R","Essential"].map(t => (
          <span key={t} style={s.tag}>{t}</span>
        ))}
      </div>

      <h1 style={s.h1}>Coordinate Reference Systems (CRS)</h1>
      <p style={s.lead}>
        CRS is the single most common source of errors in GIS — misaligned layers,
        wrong area calculations, and datasets that refuse to overlay correctly. Understanding
        why so many CRS exist, and how to choose the right one, will save you hours of
        debugging and prevent silent analytical errors.
      </p>
      <a href="https://colab.research.google.com/github/jhonnatan2178/rcafe/blob/main/notebooks/crs-explained.ipynb"
        target="_blank" rel="noopener noreferrer" style={s.colabBtn}>
        🚀 Open in Google Colab
      </a>

      {/* What you'll learn */}
      <div style={s.section}>
        <h2 style={s.h2}>What you'll learn</h2>
        <ul style={s.ul}>
          <li>Why so many CRS exist — and why there's no single "best" one</li>
          <li>The difference between geographic, projected, and web CRS</li>
          <li>How to inspect, assign, and reproject CRS in Python and R</li>
          <li>The three most common CRS mistakes — and how to avoid them</li>
          <li>How to choose the right CRS for your specific analysis</li>
        </ul>
      </div>

      {/* Why so many CRS */}
      <div style={s.section}>
        <h2 style={s.h2}>Why so many CRS exist</h2>
        <p style={s.p}>
          The Earth is not a perfect sphere. Its true shape — called a <strong>geoid</strong> —
          is irregular, flattened at the poles and bulging at the equator. Representing this
          on a flat surface requires a map projection, and projections always introduce distortion.
        </p>
        <Callout type="info">
          Think of the Earth as a balloon. Flattening it onto a table requires stretching or
          compressing parts of it. Every projection makes a different trade-off about
          <em> which distortion to accept</em>.
        </Callout>
        <p style={s.p}>Every projection preserves some properties and distorts others. The four types of distortion:</p>
        <DistortionCards />
        <p style={s.p}>
          This is why multiple CRS exist — different regions, scales, and analytical purposes
          demand different trade-offs. There is no universally correct projection.
        </p>
        <Callout type="tip">
          <strong>Best practice rule:</strong> use a <strong>geographic CRS</strong> (EPSG:4326)
          for data storage and exchange; use a <strong>local projected CRS</strong> (UTM zone)
          for spatial analysis; use <strong>Web Mercator</strong> (EPSG:3857) only for rendering map tiles.
        </Callout>
      </div>

      {/* Mercator distortion */}
      <div style={s.section}>
        <h2 style={s.h2}>The Mercator distortion — a famous example</h2>
        <p style={s.p}>
          The Mercator projection — used by Google Maps and most web platforms — preserves
          shape and direction but severely distorts area, especially near the poles.
          The most cited example: Greenland appears similar in size to Africa, even though
          Africa is approximately 14× larger in reality.
        </p>
        <AreaComparison />
        <p style={s.p}>
          This kind of distortion can cause real errors if you use Mercator data for
          area-based analysis — comparing country sizes, estimating deforestation, or
          calculating flood extents will all be wrong.
        </p>
      </div>

      {/* CRS types */}
      <div style={s.section}>
        <h2 style={s.h2}>The three main CRS types — with code</h2>
        <p style={s.p}>Click each type to explore its properties and see real Python examples.</p>
        <CRSExplorer />
      </div>

      {/* EPSG table */}
      <div style={s.section}>
        <h2 style={s.h2}>Common EPSG codes you'll actually use</h2>
        <EPSGTable />
        <Callout type="tip">
          Look up any CRS at <a href="https://epsg.io" target="_blank" rel="noopener noreferrer" style={{color:"#2563EB"}}>epsg.io</a> — search by country name, EPSG code, or projection type.
        </Callout>
      </div>

      {/* R code */}
      <div style={s.section}>
        <h2 style={s.h2}>CRS in R</h2>
        <p style={s.p}>The <code style={s.inlineCode}>sf</code> package handles CRS the same way as GeoPandas:</p>
        <CodeBlock id="r-crs" lang="r">{`library(sf)
library(tidyverse)

# Load and inspect
colombia <- st_read("colombia.shp")
cat("CRS:", st_crs(colombia)$input, "\\n")
cat("Units:", st_crs(colombia)$units_gdal, "\\n")

# Reproject to UTM Zone 18N
colombia_utm <- st_transform(colombia, 32618)

# Calculate area in km²
colombia_utm <- colombia_utm |>
  mutate(area_km2 = as.numeric(st_area(geometry)) / 1e6)

print(select(colombia_utm, name, area_km2))

# Distance between two cities
bogota   <- st_sfc(st_point(c(-74.0, 4.7)),  crs = 4326) |> st_transform(32618)
medellin <- st_sfc(st_point(c(-75.6, 6.2)),  crs = 4326) |> st_transform(32618)
dist_km  <- as.numeric(st_distance(bogota, medellin)) / 1000
cat("Bogotá → Medellín:", round(dist_km, 1), "km\\n")

# Assign CRS to a file that has none
no_crs <- st_read("old_file.shp")   # crs = NA
fixed  <- st_set_crs(no_crs, 4326) # assign
fixed  <- st_transform(fixed, 32618) # then reproject`}</CodeBlock>
      </div>

      {/* Common errors */}
      <div style={s.section}>
        <h2 style={s.h2}>The three most common CRS mistakes</h2>
        <p style={s.p}>Click each error to see the wrong code and how to fix it.</p>
        <CommonErrors />
      </div>

      {/* Decision guide */}
      <div style={s.section}>
        <h2 style={s.h2}>Which CRS should I use?</h2>
        <p style={s.p}>Answer two questions and get a recommendation:</p>
        <DecisionGuide />
      </div>

      {/* Quiz */}
      <div style={s.section}>
        <h2 style={s.h2}>Test your understanding</h2>
        <Quiz />
      </div>

      {/* Next */}
      <div style={s.section}>
        <h2 style={s.h2}>What's next?</h2>
        <div style={s.nextGrid}>
          {[
            ["04 — Your First Spatial Analysis","Load, visualise, and analyse real spatial data end-to-end.","/tutorial/first-spatial-analysis"],
            ["Vector vs Raster","Core data models — understanding the two dominant spatial structures.","/tutorial/vector-vs-raster"],
            ["Flood Risk Modelling","Apply raster analysis to identify flood-prone zones from a DEM.","/tutorial/python-flood-risk"],
          ].map(([title,desc,href],i) => (
            <a key={i} href={href} style={s.nextCard}>
              <div style={s.nextTitle}>{title}</div>
              <div style={s.nextDesc}>{desc}</div>
              <span style={{color:"#2563EB",fontSize:13,fontWeight:500}}>Read →</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── styles ───────────────────────────────────────────────────────────────────
const s = {
  page: { maxWidth:820, margin:"0 auto", padding:"28px 20px", fontFamily:"'Inter',system-ui,sans-serif", color:"#111827", lineHeight:1.65 },
  breadcrumb: { display:"flex", gap:6, alignItems:"center", fontSize:12, color:"#6B7280", marginBottom:20 },
  sep: { color:"#D1D5DB" },
  tags: { display:"flex", gap:8, marginBottom:12, flexWrap:"wrap" },
  tag: { fontSize:11, padding:"3px 10px", borderRadius:20, background:"#F3F4F6", color:"#374151", border:"1px solid #E5E7EB" },
  h1: { fontSize:"clamp(22px,4vw,32px)", fontWeight:700, lineHeight:1.2, margin:"0 0 14px" },
  h2: { fontSize:19, fontWeight:600, margin:"0 0 14px", color:"#111827", borderBottom:"2px solid #F3F4F6", paddingBottom:8 },
  lead: { fontSize:15, color:"#374151", margin:"0 0 20px", lineHeight:1.7 },
  colabBtn: { display:"inline-flex", alignItems:"center", gap:8, padding:"9px 18px", background:"#2563EB", color:"#fff", borderRadius:8, textDecoration:"none", fontWeight:600, fontSize:13, marginBottom:36 },
  section: { marginBottom:44 },
  p: { fontSize:14, color:"#374151", margin:"0 0 14px", lineHeight:1.7 },
  ul: { paddingLeft:22, margin:"0 0 14px", fontSize:14, color:"#374151", lineHeight:1.9 },
  inlineCode: { background:"#F3F4F6", padding:"2px 5px", borderRadius:4, fontFamily:"monospace", fontSize:12 },
  callout: { padding:"12px 16px", borderRadius:8, margin:"0 0 20px", fontSize:13, lineHeight:1.65 },
  // distortion cards
  fourGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))", gap:12, marginBottom:24 },
  distCard: { border:"1.5px solid", borderRadius:10, padding:"14px 16px" },
  distIcon: { fontSize:22, marginBottom:6 },
  distName: { fontWeight:700, fontSize:14, marginBottom:6 },
  distDesc: { fontSize:12, color:"#374151", lineHeight:1.55, marginBottom:8 },
  distExample: { fontSize:11, fontStyle:"italic" },
  // compare
  compareBox: { background:"#F9FAFB", border:"1.5px solid #E5E7EB", borderRadius:12, padding:"20px 24px", marginBottom:24 },
  compareTitle: { fontWeight:600, fontSize:15, color:"#111827", marginBottom:16 },
  compareToggle: { display:"flex", gap:8, marginBottom:20 },
  toggleBtn: { padding:"7px 16px", borderRadius:8, border:"1.5px solid #E5E7EB", background:"#fff", fontSize:13, cursor:"pointer", fontWeight:500, color:"#374151" },
  toggleBtnActive: { background:"#111827", color:"#fff", borderColor:"#111827" },
  compareGrid: { display:"flex", gap:40, justifyContent:"center", alignItems:"flex-end", marginBottom:16, flexWrap:"wrap" },
  compareItem: { textAlign:"center" },
  compareLabel: { fontWeight:600, fontSize:14, color:"#111827", marginTop:8 },
  compareReal: { fontSize:12, color:"#6B7280", marginTop:2 },
  compareFact: { textAlign:"center", fontSize:13, color:"#374151", fontStyle:"italic", padding:"10px", background:"#fff", borderRadius:8, border:"1px solid #E5E7EB" },
  // CRS explorer
  explorerBox: { border:"1.5px solid #E5E7EB", borderRadius:12, overflow:"hidden", marginBottom:24 },
  explorerNav: { display:"flex", flexWrap:"wrap", background:"#F9FAFB", borderBottom:"1px solid #E5E7EB", padding:8, gap:8 },
  explorerBtn: { padding:"8px 16px", borderRadius:8, border:"1.5px solid #E5E7EB", background:"#fff", fontSize:13, cursor:"pointer", fontWeight:500, color:"#374151" },
  explorerContent: { padding:"20px", border:"none" },
  explorerBadge: { display:"inline-block", padding:"4px 12px", borderRadius:20, fontSize:12, fontWeight:600, color:"#fff" },
  explorerMeta: { fontSize:12, color:"#374151", display:"flex", alignItems:"center", gap:4 },
  proConGrid: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 },
  proConTitle: { fontWeight:600, fontSize:13, marginBottom:8, color:"#111827" },
  proItem: { fontSize:13, color:"#166534", marginBottom:4 },
  conItem: { fontSize:13, color:"#991B1B", marginBottom:4 },
  explorerExample: { fontSize:13, color:"#374151", fontFamily:"monospace", background:"#F3F4F6", padding:"8px 12px", borderRadius:6, marginBottom:14 },
  // EPSG table
  table: { width:"100%", borderCollapse:"collapse", fontSize:13, border:"1px solid #E5E7EB", borderRadius:8, overflow:"hidden" },
  th: { padding:"10px 14px", textAlign:"left", background:"#F3F4F6", fontWeight:600, fontSize:12, borderBottom:"2px solid #E5E7EB" },
  td: { padding:"9px 14px", borderTop:"1px solid #F3F4F6", fontSize:12, color:"#374151" },
  // common errors
  // decision guide
  decisionBox: { background:"#F0FDF4", border:"1.5px solid #BBF7D0", borderRadius:12, padding:"20px 24px", marginBottom:24 },
  decisionTitle: { fontWeight:700, fontSize:15, color:"#166534", marginBottom:16 },
  decisionQ: { fontSize:13, fontWeight:500, color:"#111827", marginBottom:8 },
  decisionOpt: { padding:"7px 16px", borderRadius:8, border:"1.5px solid #E5E7EB", background:"#fff", fontSize:13, cursor:"pointer", color:"#374151" },
  decisionOptActive: { background:"#166534", color:"#fff", borderColor:"#166534" },
  decisionResult: { marginTop:16, padding:"14px 16px", background:"#fff", borderRadius:10, border:"1.5px solid #22C55E" },
  decisionResultLabel: { fontSize:11, fontWeight:600, color:"#22C55E", textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:4 },
  decisionResultCRS: { fontSize:20, fontWeight:700, color:"#111827", fontFamily:"monospace", marginBottom:4 },
  decisionResultNote: { fontSize:13, color:"#374151" },
  // code
  codeWrap: { background:"#1E293B", borderRadius:10, overflow:"hidden", marginBottom:16 },
  codeHeader: { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"7px 14px", background:"#0F172A" },
  codeLang: { fontSize:11, color:"#94A3B8", fontFamily:"monospace", textTransform:"uppercase", letterSpacing:"0.05em" },
  copyBtn: { fontSize:11, padding:"3px 10px", background:"#334155", color:"#CBD5E1", border:"none", borderRadius:5, cursor:"pointer" },
  pre: { margin:0, padding:"16px 20px", overflowX:"auto", fontSize:12, lineHeight:1.7, color:"#E2E8F0", fontFamily:"'Fira Code',monospace" },
  // quiz
  quizCard: { background:"#F9FAFB", border:"1.5px solid #E5E7EB", borderRadius:10, padding:"18px", marginBottom:14 },
  quizQ: { fontSize:13, fontWeight:500, marginBottom:10, color:"#111" },
  quizOpt: { width:"100%", textAlign:"left", padding:"9px 13px", borderRadius:7, fontSize:12, transition:"all 0.15s" },
  revealBtn: { marginTop:10, padding:"6px 14px", background:"#2563EB", color:"#fff", border:"none", borderRadius:6, fontSize:12, cursor:"pointer", fontWeight:500 },
  explanation: { marginTop:10, padding:"9px 13px", background:"#F0FDF4", border:"1px solid #86EFAC", borderRadius:7, fontSize:12, color:"#166534", lineHeight:1.6 },
  // next
  nextGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:12 },
  nextCard: { display:"block", padding:"14px", background:"#F9FAFB", border:"1.5px solid #E5E7EB", borderRadius:10, textDecoration:"none" },
  nextTitle: { fontWeight:600, fontSize:13, color:"#111827", marginBottom:4 },
  nextDesc: { fontSize:12, color:"#6B7280", lineHeight:1.5, marginBottom:8 },
};