// @ts-nocheck
import { useState } from "react";

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
    key:     { bg: "#F5F3FF", border: "#7C3AED", icon: "🔑" },
    real:    { bg: "#FFF7ED", border: "#F97316", icon: "🇨🇴" },
  };
  const c = map[type];
  return (
    <div style={{ ...s.callout, background: c.bg, borderLeft: `4px solid ${c.border}` }}>
      <span style={{ marginRight: 8 }}>{c.icon}</span>{children}
    </div>
  );
}

// ── event stats ───────────────────────────────────────────────────────────────
function EventStats() {
  const stats = [
    { value: "156,000+", label: "people affected", color: "#DC2626" },
    { value: "80%",      label: "of Córdoba submerged", color: "#1D4ED8" },
    { value: "157,000", label: "hectares of crops lost", color: "#D97706" },
    { value: "24",       label: "municipalities impacted", color: "#7C3AED" },
    { value: "EMSR865",  label: "Copernicus EMS activation", color: "#059669" },
    { value: "Sinú R.",  label: "main river that overflowed", color: "#0369A1" },
  ];
  return (
    <div style={s.statsGrid}>
      {stats.map((st, i) => (
        <div key={i} style={{ ...s.statCard, borderTop: `3px solid ${st.color}` }}>
          <div style={{ ...s.statValue, color: st.color }}>{st.value}</div>
          <div style={s.statLabel}>{st.label}</div>
        </div>
      ))}
    </div>
  );
}

// ── GEE concept explainer ────────────────────────────────────────────────────
function GEEConcepts() {
  const [active, setActive] = useState(0);
  const concepts = [
    { icon: "🖼️", name: "Image", desc: "A single raster layer with one or more bands. Each pixel has a value. Example: one Sentinel-1 scene from February 1, 2026 over Córdoba.", code: `# Load a single Sentinel-1 image
import ee
ee.Initialize()

img = ee.Image("COPERNICUS/S1_GRD/S1A_IW_GRDH_1SDV_20260201T104532")
print(img.bandNames().getInfo())   # ['VV', 'VH', 'angle']
print(img.projection().getInfo())  # coordinate system` },
    { icon: "📚", name: "ImageCollection", desc: "A stack of Images — like a folder of satellite scenes. You filter it by date, location, and properties to get the scenes you need.", code: `# Filter a collection to your study area and dates
cordoba = ee.Geometry.Rectangle([-76.5, 7.5, -74.5, 9.5])

s1 = (ee.ImageCollection("COPERNICUS/S1_GRD")
        .filter(ee.Filter.eq("instrumentMode", "IW"))
        .filter(ee.Filter.listContains("transmitterReceiverPolarisation", "VV"))
        .filterBounds(cordoba)
        .filterDate("2026-01-01", "2026-02-28")
        .select("VV"))

print(f"Scenes found: {s1.size().getInfo()}")` },
    { icon: "🗺️", name: "Geometry", desc: "A vector shape — point, line, or polygon — that defines your study area. Used for spatial filtering and zonal statistics.", code: `# Define Córdoba department as a geometry
# Option A: simple bounding box
cordoba_bbox = ee.Geometry.Rectangle([-76.5, 7.5, -74.5, 9.5])

# Option B: exact department boundary from GADM (recommended)
colombia = ee.FeatureCollection("FAO/GAUL/2015/level1")
cordoba = colombia.filter(ee.Filter.eq("ADM1_NAME", "Córdoba"))

# Option C: draw your own in GEE Code Editor and export as GeoJSON
print(cordoba.geometry().bounds().getInfo())` },
    { icon: "📊", name: "reduceRegion", desc: "The GEE function for zonal statistics — extract summary statistics (mean, sum, std) from an Image within a Geometry. This is the core of spatial analysis in GEE.", code: `# Extract mean backscatter over Córdoba (zonal statistic)
stats = flood_map.reduceRegion(
    reducer    = ee.Reducer.mean(),
    geometry   = cordoba.geometry(),
    scale      = 30,                 # pixel size in metres
    maxPixels  = 1e10,
    bestEffort = True
)
print("Mean flood value:", stats.getInfo())

# For multiple statistics at once
multi_stats = flood_map.reduceRegion(
    reducer    = ee.Reducer.mean().combine(
                   ee.Reducer.sum(), sharedInputs=True).combine(
                   ee.Reducer.stdDev(), sharedInputs=True),
    geometry   = cordoba.geometry(),
    scale      = 30,
    maxPixels  = 1e10
)
print(multi_stats.getInfo())` },
  ];
  return (
    <div style={s.conceptBox}>
      <div style={s.conceptNav}>
        {concepts.map((c, i) => (
          <button key={i} onClick={() => setActive(i)}
            style={{ ...s.conceptBtn, ...(active===i ? s.conceptBtnActive : {}) }}>
            {c.icon} {c.name}
          </button>
        ))}
      </div>
      <div style={s.conceptContent}>
        <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, marginBottom: 16 }}>{concepts[active].desc}</p>
        <CodeBlock id={`concept-${active}`} lang="python">{concepts[active].code}</CodeBlock>
      </div>
    </div>
  );
}

// ── workflow stepper ──────────────────────────────────────────────────────────
function WorkflowStepper() {
  const [active, setActive] = useState(0);
  const steps = [
    {
      icon: "⚙️", title: "Setup GEE",
      desc: "Google Earth Engine requires a Google account and project registration. Once approved (usually instant for educational use), authenticate in Python using the ee library. This is a one-time setup.",
      code: `# 1. Register at https://code.earthengine.google.com
# 2. Install the Python client
# pip install earthengine-api geemap

import ee
import geemap
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.dates as mdates

# Authenticate (first time only — opens browser)
ee.Authenticate()

# Initialize with your GEE project
ee.Initialize(project="your-gee-project-id")

print("GEE initialized successfully")
print("Python EE version:", ee.__version__)`
    },
    {
      icon: "🗺️", title: "Define study area",
      desc: "Define Córdoba department as a GEE Feature. We use the FAO GAUL dataset for official administrative boundaries, then extract the Sinú River basin as our primary analysis unit — this is the river whose overflow caused the 2026 disaster.",
      code: `# Load Colombia administrative boundaries (FAO GAUL Level 1)
colombia_depts = ee.FeatureCollection("FAO/GAUL/2015/level1")

# Filter to Córdoba department
cordoba = colombia_depts.filter(
    ee.Filter.And(
        ee.Filter.eq("ADM0_NAME", "Colombia"),
        ee.Filter.eq("ADM1_NAME", "Córdoba")
    )
)

cordoba_geom = cordoba.geometry()
print("Córdoba area (km²):", round(cordoba_geom.area().divide(1e6).getInfo(), 1))

# Also define Montería (capital city) for urban focus analysis
municipios = ee.FeatureCollection("FAO/GAUL/2015/level2")
monteria = municipios.filter(
    ee.Filter.And(
        ee.Filter.eq("ADM1_NAME", "Córdoba"),
        ee.Filter.eq("ADM2_NAME", "Montería")
    )
)

# Sinú River basin bounding box (main flood driver)
sinu_basin = ee.Geometry.Rectangle([-76.2, 7.8, -75.0, 9.3])
print("Study area defined")`
    },
    {
      icon: "🛰️", title: "Load Sentinel-1 SAR",
      desc: "Load Sentinel-1 GRD VV polarisation for pre-flood (December 2025) and post-flood (February 2026) periods. Average multiple scenes to reduce speckle noise — this is more robust than using a single image.",
      code: `# PRE-FLOOD: December 2025 (dry season baseline)
s1_pre = (ee.ImageCollection("COPERNICUS/S1_GRD")
            .filter(ee.Filter.eq("instrumentMode", "IW"))
            .filter(ee.Filter.listContains("transmitterReceiverPolarisation", "VV"))
            .filter(ee.Filter.eq("orbitProperties_pass", "DESCENDING"))
            .filterBounds(cordoba_geom)
            .filterDate("2025-12-01", "2025-12-31")
            .select("VV")
            .mean()  # average to reduce speckle
            .clip(cordoba_geom))

# POST-FLOOD: February 2026 (peak inundation)
s1_post = (ee.ImageCollection("COPERNICUS/S1_GRD")
             .filter(ee.Filter.eq("instrumentMode", "IW"))
             .filter(ee.Filter.listContains("transmitterReceiverPolarisation", "VV"))
             .filter(ee.Filter.eq("orbitProperties_pass", "DESCENDING"))
             .filterBounds(cordoba_geom)
             .filterDate("2026-02-01", "2026-02-20")
             .select("VV")
             .mean()
             .clip(cordoba_geom))

# Check statistics
pre_stats  = s1_pre.reduceRegion(ee.Reducer.mean(), cordoba_geom, 30, maxPixels=1e10)
post_stats = s1_post.reduceRegion(ee.Reducer.mean(), cordoba_geom, 30, maxPixels=1e10)
print("Pre-flood mean VV (dB):",  round(pre_stats.getInfo()["VV"], 2))
print("Post-flood mean VV (dB):", round(post_stats.getInfo()["VV"], 2))
# Post should be LOWER — more water = lower backscatter`
    },
    {
      icon: "💧", title: "Detect flood extent",
      desc: "Use change detection (pre minus post backscatter) combined with a threshold to isolate newly flooded areas. Apply terrain and permanent water masks to remove false positives. Calculate flood extent statistics by municipality.",
      code: `# Change detection: pre - post (positive = decrease = new water)
difference = s1_pre.subtract(s1_post)

# Threshold: pixels where backscatter dropped > 3 dB
CHANGE_THRESHOLD = 3.0
flood_raw = difference.gt(CHANGE_THRESHOLD)

# Load DEM for terrain masking
dem = ee.Image("USGS/SRTMGL1_003").clip(cordoba_geom)
slope = ee.Terrain.slope(dem)

# Load JRC permanent water mask (exclude rivers/lakes that are always water)
jrc_water = (ee.Image("JRC/GSW1_4/GlobalSurfaceWater")
               .select("seasonality")
               .clip(cordoba_geom))
permanent_water = jrc_water.gt(10)  # > 10 months/year = permanent

# Final flood mask: changed + flat + NOT permanent water
flood_mask = (flood_raw
              .And(slope.lt(5))           # slope < 5°
              .And(permanent_water.Not()) # exclude permanent water
              .rename("flood"))

# ── Zonal statistics: flood area per municipality ─────────────────────────────
def get_flood_stats(feature):
    stats = flood_mask.reduceRegion(
        reducer   = ee.Reducer.sum().combine(ee.Reducer.count(), sharedInputs=True),
        geometry  = feature.geometry(),
        scale     = 30,
        maxPixels = 1e9
    )
    flood_px    = ee.Number(stats.get("flood_sum"))
    total_px    = ee.Number(stats.get("flood_count"))
    flood_pct   = flood_px.divide(total_px).multiply(100)
    flood_km2   = flood_px.multiply(30*30).divide(1e6)
    return feature.set({
        "flood_pixels":  flood_px,
        "flood_km2":     flood_km2,
        "flood_pct":     flood_pct,
        "municipio":     feature.get("ADM2_NAME"),
    })

municipios_cordoba = municipios.filter(
    ee.Filter.eq("ADM1_NAME", "Córdoba"))
flood_by_municipio = municipios_cordoba.map(get_flood_stats)

# Export to DataFrame
fc_list   = flood_by_municipio.toList(100)
results   = []
for i in range(fc_list.size().getInfo()):
    feat = ee.Feature(fc_list.get(i))
    props = feat.toDictionary(["municipio","flood_km2","flood_pct"]).getInfo()
    results.append(props)

df = pd.DataFrame(results).sort_values("flood_km2", ascending=False)
print(df.head(10).to_string(index=False))
print(f"\\nTotal flood extent: {df['flood_km2'].sum():.0f} km²")`
    },
    {
      icon: "📈", title: "NDVI time series",
      desc: "Analyse vegetation health before and after the flood using Sentinel-2 NDVI time series. This reveals which agricultural areas were damaged and tracks recovery. Use cloud-masked Sentinel-2 composites for each month from 2025 to 2026.",
      code: `# Cloud-masked Sentinel-2 NDVI function
def mask_s2_clouds(image):
    qa   = image.select("QA60")
    cloud_mask = (qa.bitwiseAnd(1 << 10).eq(0)
                  .And(qa.bitwiseAnd(1 << 11).eq(0)))
    return image.updateMask(cloud_mask).divide(10000)

def get_monthly_ndvi(year, month):
    start = ee.Date.fromYMD(year, month, 1)
    end   = start.advance(1, "month")
    s2    = (ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
               .filterBounds(cordoba_geom)
               .filterDate(start, end)
               .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 20))
               .map(mask_s2_clouds)
               .median()
               .clip(cordoba_geom))
    ndvi = s2.normalizedDifference(["B8", "B4"]).rename("NDVI")
    mean = ndvi.reduceRegion(
        ee.Reducer.mean(), cordoba_geom, 30, maxPixels=1e10
    ).get("NDVI")
    return {"date": f"{year}-{month:02d}", "ndvi_mean": mean.getInfo()}

# Build monthly NDVI from Jan 2025 to Jun 2026
records = []
for year, month in [(2025,m) for m in range(1,13)] + [(2026,m) for m in range(1,7)]:
    try:
        records.append(get_monthly_ndvi(year, month))
    except:
        pass

ndvi_df = pd.DataFrame(records)
ndvi_df["date"] = pd.to_datetime(ndvi_df["date"])
ndvi_df = ndvi_df.dropna()

# Plot with flood event marker
fig, ax = plt.subplots(figsize=(13, 5))
ax.plot(ndvi_df.date, ndvi_df.ndvi_mean, "o-",
        color="#22C55E", linewidth=2.5, markersize=7, label="Mean NDVI — Córdoba")
ax.fill_between(ndvi_df.date, ndvi_df.ndvi_mean, alpha=0.12, color="#22C55E")
ax.axvspan(pd.Timestamp("2026-01-31"), pd.Timestamp("2026-02-20"),
           alpha=0.15, color="#EF4444", label="Flood event (Feb 2026)")
ax.axvline(pd.Timestamp("2026-01-31"), color="#EF4444", linestyle="--", linewidth=1.5)
ax.set_ylabel("Mean NDVI", fontsize=12)
ax.set_title("Vegetation Health (NDVI) — Córdoba Department, Colombia\\n"
             "Seasonal pattern + flood impact detection", fontsize=13, fontweight="bold")
ax.xaxis.set_major_formatter(mdates.DateFormatter("%b %Y"))
ax.xaxis.set_major_locator(mdates.MonthLocator(interval=2))
plt.xticks(rotation=30)
ax.legend(fontsize=11); ax.grid(alpha=0.3)
plt.tight_layout()
plt.savefig("cordoba_ndvi_timeseries.png", dpi=150)
plt.show()`
    },
    {
      icon: "📊", title: "Statistics + visualisation",
      desc: "Combine all results into publication-ready charts and maps: flood extent bar chart by municipality, NDVI recovery curve, and change detection map. Export everything as GeoTIFF and CSV for use in QGIS or reports.",
      code: `import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

# ── 1. Bar chart: flood area by municipality ──────────────────────────────────
top10 = df.head(10)
colors = ["#1D4ED8" if v > 100 else "#93C5FD" for v in top10.flood_km2]

fig, axes = plt.subplots(1, 2, figsize=(16, 7))

axes[0].barh(top10.municipio[::-1], top10.flood_km2[::-1], color=colors[::-1])
axes[0].set_xlabel("Flooded area (km²)", fontsize=12)
axes[0].set_title("Top 10 Most Affected Municipalities\\nCórdoba Floods — February 2026",
                  fontsize=13, fontweight="bold")
axes[0].axvline(100, color="#EF4444", linestyle="--", linewidth=1, alpha=0.7)
for i, (v, n) in enumerate(zip(top10.flood_km2[::-1], top10.municipio[::-1])):
    axes[0].text(v + 2, i, f"{v:.0f} km²", va="center", fontsize=10)

# ── 2. Pie chart: flood severity classes ─────────────────────────────────────
labels   = ["High (>200 km²)", "Medium (50–200 km²)", "Low (<50 km²)"]
sizes    = [
    (df.flood_km2 > 200).sum(),
    ((df.flood_km2 >= 50) & (df.flood_km2 <= 200)).sum(),
    (df.flood_km2 < 50).sum()
]
colors_p = ["#1D4ED8", "#93C5FD", "#BFDBFE"]
axes[1].pie(sizes, labels=labels, colors=colors_p, autopct="%1.0f%%",
            startangle=90, textprops={"fontsize": 11})
axes[1].set_title("Municipalities by Flood Severity Class\\nCórdoba — February 2026",
                  fontsize=13, fontweight="bold")

plt.suptitle("Córdoba Flood Analysis — Google Earth Engine + Sentinel-1",
             fontsize=14, fontweight="bold", y=1.02)
plt.tight_layout()
plt.savefig("cordoba_flood_stats.png", dpi=150, bbox_inches="tight")
plt.show()

# ── 3. Export results ─────────────────────────────────────────────────────────
df.to_csv("cordoba_flood_by_municipio.csv", index=False)
print("Saved: cordoba_flood_by_municipio.csv")
print(f"\\n{'='*50}")
print(f"SUMMARY — Córdoba Floods February 2026")
print(f"{'='*50}")
print(f"Total flooded area:        {df.flood_km2.sum():.0f} km²")
print(f"Most affected municipality: {df.iloc[0].municipio} ({df.iloc[0].flood_km2:.0f} km²)")
print(f"Municipalities affected:    {(df.flood_km2 > 5).sum()} of {len(df)}")

# Export flood raster to Google Drive
task = ee.batch.Export.image.toDrive(
    image       = flood_mask.toFloat(),
    description = "Cordoba_Flood_Feb2026_SAR",
    folder      = "GEE_Exports",
    fileNamePrefix = "cordoba_flood_2026",
    region      = cordoba_geom,
    scale       = 30,
    crs         = "EPSG:4326",
    maxPixels   = 1e10
)
task.start()
print("Export to Google Drive started — check Tasks in GEE Code Editor")`
    },
  ];

  return (
    <div style={s.stepperBox}>
      <div style={s.stepperNav}>
        {steps.map((st, i) => (
          <button key={i} onClick={() => setActive(i)}
            style={{ ...s.stepperBtn, ...(active===i ? s.stepperBtnActive : {}) }}>
            <span>{st.icon}</span>
            <span style={{ fontSize: 11 }}>{i+1}. {st.title}</span>
          </button>
        ))}
      </div>
      <div style={s.stepperContent}>
        <div style={s.stepperNum}>Step {active+1} of {steps.length}</div>
        <div style={s.stepperTitle}>{steps[active].icon} {steps[active].title}</div>
        <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: "0 0 16px" }}>{steps[active].desc}</p>
        <CodeBlock id={`step-${active}`} lang="python">{steps[active].code}</CodeBlock>
        <div style={s.stepperControls}>
          <button onClick={() => setActive(Math.max(0, active-1))} disabled={active===0} style={s.stepperArrow}>← Previous</button>
          <button onClick={() => setActive(Math.min(steps.length-1, active+1))} disabled={active===steps.length-1} style={s.stepperArrow}>Next →</button>
        </div>
      </div>
    </div>
  );
}

// ── quiz ──────────────────────────────────────────────────────────────────────
function Quiz() {
  const qs = [
    { q: "Why do we average multiple Sentinel-1 scenes instead of using a single image?", opts: ["GEE cannot process single images", "Averaging reduces speckle noise — producing a cleaner, more reliable baseline", "Single images are too expensive to download"], ans: 1, exp: "SAR images contain speckle — random pixel-to-pixel noise inherent to radar. Averaging multiple scenes taken over the same area reduces this noise through temporal filtering, giving a more stable and accurate backscatter baseline for change detection." },
    { q: "What does a positive value in the pre-minus-post SAR difference image mean?", opts: ["The area got drier (more vegetation)", "Backscatter decreased after the flood — consistent with new open water", "The sensor malfunctioned"], ans: 1, exp: "Pre − Post: if pre=−8 dB and post=−20 dB, the difference is +12 dB (positive). This large positive change means backscatter dropped sharply after the event — exactly what happens when dry land becomes inundated with smooth water." },
    { q: "Why do we mask permanent water bodies using the JRC Global Surface Water dataset?", opts: ["JRC data is more accurate than Sentinel-1", "Rivers and lakes are always water — they are not newly flooded areas and would inflate the flood extent estimate", "GEE requires this step for all SAR analysis"], ans: 1, exp: "Rivers like the Sinú are always present in SAR images as dark features. Without masking them, they would appear in our 'new flood' layer even though they haven't changed. The JRC dataset identifies pixels with water > 10 months/year as permanent water." },
    { q: "What does a sharp NDVI drop in February 2026 in the Córdoba time series tell us?", opts: ["Cloud cover prevented NDVI measurement", "Vegetation was damaged or submerged by flooding, reducing photosynthetic activity", "The Sentinel-2 satellite was offline"], ans: 1, exp: "NDVI measures photosynthetic activity (NIR − Red / NIR + Red). Flooded or damaged vegetation cannot photosynthesize — NDVI drops sharply. The February 2026 dip in the Córdoba time series directly corresponds to the peak flood inundation period." },
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
export default function CordobaFloodGEE() {
  return (
    <div style={s.page}>
      <div style={s.breadcrumb}>
        <span>GIS Applications</span><span style={s.sep}>›</span>
        <span>Flood Modeling</span><span style={s.sep}>›</span>
        <span style={{color:"#111"}}>Córdoba Floods — GEE Analysis</span>
      </div>

      <div style={s.tags}>
        {["Intermediate","~40 min","Python","Google Earth Engine","Colombia","Sentinel-1","Sentinel-2"].map(t => (
          <span key={t} style={s.tag}>{t}</span>
        ))}
      </div>

      <h1 style={s.h1}>Analysing the 2026 Córdoba Floods with Google Earth Engine</h1>
      <p style={s.lead}>
        In February 2026, the department of Córdoba, Colombia experienced one of its worst
        flood disasters on record — with 80% of the territory submerged after the Sinú River
        overflowed. In this tutorial you'll reproduce a full flood analysis using Google Earth
        Engine and free satellite data: change detection, zonal statistics by municipality,
        NDVI time series, and agricultural impact assessment.
      </p>

      <Callout type="real">
        <strong>Real event, real data:</strong> this tutorial uses the actual February 2026
        Córdoba flood. Copernicus Emergency Management Service activated rapid mapping
        (EMSR865) for this event — you can validate your results against their official
        products at emergency.copernicus.eu.
      </Callout>

      <a href="https://colab.research.google.com/github/jhonnatan2178/rcafe/blob/main/notebooks/cordoba-floods-gee.ipynb"
        target="_blank" rel="noopener noreferrer" style={s.colabBtn}>
        🚀 Open in Google Colab
      </a>

      {/* Event context */}
      <div style={s.section}>
        <h2 style={s.h2}>The event — what happened</h2>
        <p style={s.p}>
          A cold front hitting Colombia's Caribbean coast on January 31, 2026 triggered
          catastrophic flooding across Córdoba. In a single day, Montería received a
          month's worth of rain. The Sinú River — already high from weeks of rainfall —
          overflowed, inundating residential areas, destroying agricultural land, and
          isolating 24 municipalities.
        </p>
        <EventStats />
        <p style={s.p} style={{ marginTop: 16 }}>
          The disaster was exacerbated by the Urrá hydroelectric dam on the Sinú River,
          whose management became a point of political and scientific controversy during the
          crisis. Some experts attributed part of the flood severity to upstream water
          releases from the dam coinciding with the peak rainfall event.
        </p>
        <Callout type="key">
          <strong>Why this matters for GEE analysis:</strong> the Sinú River basin is the
          primary spatial unit of interest. The river's overflow created a connected
          inundation pattern extending far into agricultural lowlands — exactly the kind
          of event that SAR change detection captures clearly even under cloud cover.
        </Callout>
      </div>

      {/* GEE concepts */}
      <div style={s.section}>
        <h2 style={s.h2}>Google Earth Engine — four concepts you need</h2>
        <p style={s.p}>
          GEE has its own data model. Before writing analysis code, understand these
          four building blocks — click each to see an example:
        </p>
        <GEEConcepts />
      </div>

      {/* What you'll build */}
      <div style={s.section}>
        <h2 style={s.h2}>What you'll build</h2>
        <ul style={s.ul}>
          <li><strong>Change detection:</strong> compare pre- vs post-flood Sentinel-1 SAR to map flood extent</li>
          <li><strong>Zonal statistics:</strong> calculate flooded area (km²) per municipality using GEE reduceRegion</li>
          <li><strong>NDVI time series:</strong> track vegetation health from Jan 2025 to Jun 2026 to quantify agricultural damage</li>
          <li><strong>Statistical charts:</strong> bar chart, pie chart, and time series showing flood impact by municipality</li>
          <li><strong>Export:</strong> GeoTIFF flood map to Google Drive + CSV by municipality</li>
        </ul>
      </div>

      {/* Workflow */}
      <div style={s.section}>
        <h2 style={s.h2}>Step-by-step analysis</h2>
        <WorkflowStepper />
      </div>

      {/* Validation */}
      <div style={s.section}>
        <h2 style={s.h2}>Validating your results</h2>
        <p style={s.p}>
          Once you have your flood map, compare it against official reference data:
        </p>
        <div style={s.dataGrid}>
          {[
            { icon:"🇪🇺", name:"Copernicus EMS EMSR865", url:"https://mapping.emergency.copernicus.eu", desc:"Official rapid mapping product for this exact event. Download the reference flood extent shapefile and overlay with your SAR-derived map.", tag:"Primary validation" },
            { icon:"🌊", name:"JRC Global Surface Water", url:"https://global-surface-water.appspot.com", desc:"Baseline permanent water extent — useful for identifying how much of the 'flood' is actually permanent river and lake area.", tag:"Baseline" },
            { icon:"🏛️", name:"UNGRD Colombia", url:"https://portal.gestiondelriesgo.gov.co", desc:"Colombia's disaster risk agency — publishes affected municipality lists that can be compared to your zonal statistics.", tag:"Ground truth" },
            { icon:"🛰️", name:"NASA FIRMS", url:"https://firms.modaps.eosdis.nasa.gov", desc:"Not for floods, but useful for checking if agricultural burning preceded the event and affected the NDVI baseline.", tag:"Context" },
          ].map((d, i) => (
            <a key={i} href={d.url} target="_blank" rel="noopener noreferrer" style={s.dataCard}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{d.icon}</div>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4, flexWrap:"wrap" }}>
                <span style={{ fontWeight:600, fontSize:13, color:"#111" }}>{d.name}</span>
                <span style={s.dataTag}>{d.tag}</span>
              </div>
              <div style={{ fontSize:12, color:"#6B7280", lineHeight:1.5 }}>{d.desc}</div>
            </a>
          ))}
        </div>
        <Callout type="tip">
          A good validation result for this type of SAR flood detection is R² &gt; 0.7
          against reference perimeters and overall accuracy &gt; 85%. The Copernicus EMS
          product is your best reference — it was produced by expert analysts using
          multiple data sources within 48 hours of the event.
        </Callout>
      </div>

      {/* Extensions */}
      <div style={s.section}>
        <h2 style={s.h2}>How to extend this analysis</h2>
        <ul style={s.ul}>
          <li><strong>Flood frequency:</strong> repeat for multiple historical events (2010 La Niña, 2017, 2022) to build a flood frequency map — which areas flood every year?</li>
          <li><strong>Agricultural loss:</strong> overlay the flood mask with land use data (IDEAM) to calculate hectares of crops affected by type</li>
          <li><strong>Population exposure:</strong> intersect the flood extent with WorldPop population density to estimate number of people in affected areas</li>
          <li><strong>Recovery monitoring:</strong> extend the NDVI time series to 2027 to measure how long vegetation takes to recover</li>
          <li><strong>Risk mapping:</strong> combine flood frequency + slope + population density into a composite risk index per municipality</li>
          <li><strong>Spanish version:</strong> translate this tutorial to Spanish for IDEAM, UNGRD, and Colombian university audiences</li>
        </ul>
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
            ["Flood Mapping with SAR — Full Tutorial","Deep dive into the SAR backscatter threshold approach used as the core of this analysis.","/tutorial/python-flood-risk"],
            ["Water Quality Monitoring","Apply GEE to map coastal and river water quality — relevant for the Sinú River post-flood contamination.","/tutorial/water-quality"],
            ["Land Cover Classification","Use GEE + Random Forest to map land cover change in Córdoba before and after the flood.","/tutorial/land-cover-classification"],
          ].map(([title,desc,href],i) => (
            <a key={i} href={href} style={s.nextCard}>
              <div style={s.nextTitle}>{title}</div>
              <div style={s.nextDesc}>{desc}</div>
              <span style={{color:"#1D4ED8",fontSize:13,fontWeight:500}}>Read →</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

const s = {
  page: { maxWidth:820, margin:"0 auto", padding:"28px 20px", fontFamily:"'Inter',system-ui,sans-serif", color:"#111827", lineHeight:1.65 },
  breadcrumb: { display:"flex", gap:6, alignItems:"center", fontSize:12, color:"#6B7280", marginBottom:20 },
  sep: { color:"#D1D5DB" },
  tags: { display:"flex", gap:8, marginBottom:12, flexWrap:"wrap" },
  tag: { fontSize:11, padding:"3px 10px", borderRadius:20, background:"#F3F4F6", color:"#374151", border:"1px solid #E5E7EB" },
  h1: { fontSize:"clamp(22px,4vw,32px)", fontWeight:700, lineHeight:1.2, margin:"0 0 14px" },
  h2: { fontSize:19, fontWeight:600, margin:"0 0 14px", color:"#111827", borderBottom:"2px solid #F3F4F6", paddingBottom:8 },
  lead: { fontSize:15, color:"#374151", margin:"0 0 16px", lineHeight:1.7 },
  colabBtn: { display:"inline-flex", alignItems:"center", gap:8, padding:"9px 18px", background:"#1D4ED8", color:"#fff", borderRadius:8, textDecoration:"none", fontWeight:600, fontSize:13, marginBottom:36 },
  callout: { padding:"12px 16px", borderRadius:8, margin:"0 0 20px", fontSize:13, lineHeight:1.65 },
  section: { marginBottom:44 },
  p: { fontSize:14, color:"#374151", margin:"0 0 14px", lineHeight:1.7 },
  ul: { paddingLeft:22, margin:"0 0 14px", fontSize:14, color:"#374151", lineHeight:1.9 },
  statsGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))", gap:10, marginBottom:20 },
  statCard: { background:"var(--color-background-primary, #fff)", border:"0.5px solid #E5E7EB", borderRadius:10, padding:"14px 16px" },
  statValue: { fontSize:22, fontWeight:700, marginBottom:4 },
  statLabel: { fontSize:12, color:"#6B7280", lineHeight:1.4 },
  conceptBox: { border:"1.5px solid #E5E7EB", borderRadius:12, overflow:"hidden", marginBottom:24 },
  conceptNav: { display:"flex", flexWrap:"wrap", gap:8, padding:"12px 16px", background:"#F9FAFB", borderBottom:"1px solid #E5E7EB" },
  conceptBtn: { padding:"7px 16px", borderRadius:8, border:"1.5px solid #E5E7EB", background:"#fff", fontSize:13, cursor:"pointer", fontWeight:500, color:"#374151" },
  conceptBtnActive: { background:"#1D4ED8", color:"#fff", borderColor:"#1D4ED8" },
  conceptContent: { padding:"20px 22px" },
  stepperBox: { border:"1.5px solid #E5E7EB", borderRadius:12, overflow:"hidden", marginBottom:24 },
  stepperNav: { display:"flex", flexWrap:"wrap", background:"#F9FAFB", borderBottom:"1px solid #E5E7EB", padding:8, gap:6 },
  stepperBtn: { flex:"1 1 auto", padding:"9px 8px", border:"none", background:"transparent", fontSize:11, color:"#374151", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3, borderRadius:7, minWidth:80 },
  stepperBtnActive: { background:"#1D4ED8", color:"#fff", fontWeight:600 },
  stepperContent: { padding:"20px 24px" },
  stepperNum: { fontSize:11, color:"#1D4ED8", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:6 },
  stepperTitle: { fontSize:16, fontWeight:600, color:"#111827", marginBottom:10 },
  stepperControls: { display:"flex", gap:10, marginTop:8 },
  stepperArrow: { padding:"6px 14px", borderRadius:7, border:"1.5px solid #E5E7EB", background:"#fff", fontSize:13, cursor:"pointer", color:"#374151" },
  codeWrap: { background:"#1E293B", borderRadius:10, overflow:"hidden", marginBottom:16 },
  codeHeader: { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"7px 14px", background:"#0F172A" },
  codeLang: { fontSize:11, color:"#94A3B8", fontFamily:"monospace", textTransform:"uppercase", letterSpacing:"0.05em" },
  copyBtn: { fontSize:11, padding:"3px 10px", background:"#334155", color:"#CBD5E1", border:"none", borderRadius:5, cursor:"pointer" },
  pre: { margin:0, padding:"16px 20px", overflowX:"auto", fontSize:12, lineHeight:1.7, color:"#E2E8F0", fontFamily:"'Fira Code',monospace" },
  dataGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:12, marginBottom:16 },
  dataCard: { display:"block", padding:"14px", background:"#F9FAFB", border:"1.5px solid #E5E7EB", borderRadius:10, textDecoration:"none" },
  dataTag: { fontSize:11, padding:"2px 8px", borderRadius:20, background:"#EFF6FF", color:"#1D4ED8", border:"1px solid #BFDBFE", fontWeight:500 },
  quizCard: { background:"#F9FAFB", border:"1.5px solid #E5E7EB", borderRadius:10, padding:"18px", marginBottom:14 },
  quizQ: { fontSize:13, fontWeight:500, marginBottom:10, color:"#111" },
  quizOpt: { width:"100%", textAlign:"left", padding:"9px 13px", borderRadius:7, fontSize:12, transition:"all 0.15s" },
  revealBtn: { marginTop:10, padding:"6px 14px", background:"#1D4ED8", color:"#fff", border:"none", borderRadius:6, fontSize:12, cursor:"pointer", fontWeight:500 },
  explanation: { marginTop:10, padding:"9px 13px", background:"#F0FDF4", border:"1px solid #86EFAC", borderRadius:7, fontSize:12, color:"#166534", lineHeight:1.6 },
  nextGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:12 },
  nextCard: { display:"block", padding:"14px", background:"#F9FAFB", border:"1.5px solid #E5E7EB", borderRadius:10, textDecoration:"none" },
  nextTitle: { fontWeight:600, fontSize:13, color:"#111827", marginBottom:4 },
  nextDesc: { fontSize:12, color:"#6B7280", lineHeight:1.5, marginBottom:8 },
};