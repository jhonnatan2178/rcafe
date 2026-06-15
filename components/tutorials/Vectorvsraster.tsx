// @ts-nocheck
import { useState } from "react";

// ─── tiny helpers ────────────────────────────────────────────────────────────
function CopyButton({ code }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} style={styles.copyBtn}>
      {copied ? "✓ Copied" : "Copy"}
    </button>
  );
}

function CodeBlock({ code, lang = "python" }) {
  return (
    <div style={styles.codeWrap}>
      <div style={styles.codeHeader}>
        <span style={styles.codeLang}>{lang}</span>
        <CopyButton code={code} />
      </div>
      <pre style={styles.pre}><code>{code}</code></pre>
    </div>
  );
}

function Callout({ type = "info", children }) {
  const map = {
    info:    { bg: "#EFF6FF", border: "#3B82F6", icon: "ℹ️" },
    tip:     { bg: "#F0FDF4", border: "#22C55E", icon: "💡" },
    warning: { bg: "#FFFBEB", border: "#F59E0B", icon: "⚠️" },
  };
  const c = map[type];
  return (
    <div style={{ ...styles.callout, background: c.bg, borderLeft: `4px solid ${c.border}` }}>
      <span style={{ marginRight: 8 }}>{c.icon}</span>{children}
    </div>
  );
}

function Quiz() {
  const questions = [
    {
      q: "You need to store the exact boundary of a national park. Which model fits best?",
      options: ["Raster — grid cells can approximate the boundary", "Vector — a polygon captures the exact boundary", "Both work equally well"],
      answer: 1,
      explanation: "Vector polygons store exact coordinates, making them ideal for administrative or legal boundaries.",
    },
    {
      q: "You want to analyse how temperature varies continuously across a country. Which model?",
      options: ["Vector — store temperature at point locations", "Raster — a continuous grid captures gradual variation", "Neither is suitable"],
      answer: 1,
      explanation: "Temperature is a continuous surface — raster grids represent this naturally, cell by cell.",
    },
    {
      q: "A dataset uses 30m × 30m pixels to represent land cover across Europe. What data model is this?",
      options: ["Vector", "Raster", "Tabular"],
      answer: 1,
      explanation: "Fixed pixel size, grid-based coverage — that's raster. Landsat and Sentinel are classic examples.",
    },
  ];

  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});

  const choose = (qi, oi) => {
    if (revealed[qi]) return;
    setAnswers(a => ({ ...a, [qi]: oi }));
  };

  const reveal = (qi) => {
    if (answers[qi] === undefined) return;
    setRevealed(r => ({ ...r, [qi]: true }));
  };

  return (
    <div>
      {questions.map((q, qi) => (
        <div key={qi} style={styles.quizCard}>
          <p style={styles.quizQ}><strong>Q{qi + 1}.</strong> {q.q}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {q.options.map((opt, oi) => {
              const chosen = answers[qi] === oi;
              const isCorrect = oi === q.answer;
              let bg = "#F9FAFB";
              let border = "1.5px solid #E5E7EB";
              if (revealed[qi]) {
                if (isCorrect) { bg = "#F0FDF4"; border = "1.5px solid #22C55E"; }
                else if (chosen) { bg = "#FEF2F2"; border = "1.5px solid #EF4444"; }
              } else if (chosen) {
                bg = "#EFF6FF"; border = "1.5px solid #3B82F6";
              }
              return (
                <button key={oi} onClick={() => choose(qi, oi)}
                  style={{ ...styles.quizOption, background: bg, border, cursor: revealed[qi] ? "default" : "pointer" }}>
                  {opt}
                  {revealed[qi] && isCorrect && " ✓"}
                  {revealed[qi] && chosen && !isCorrect && " ✗"}
                </button>
              );
            })}
          </div>
          {!revealed[qi] && (
            <button onClick={() => reveal(qi)} style={styles.revealBtn}
              disabled={answers[qi] === undefined}>
              Check answer
            </button>
          )}
          {revealed[qi] && (
            <div style={styles.explanation}>
              <strong>{answers[qi] === q.answer ? "Correct! " : "Not quite. "}</strong>
              {q.explanation}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── visual comparison table ──────────────────────────────────────────────────
function CompareTable() {
  const rows = [
    ["Data structure", "Points, lines, polygons", "Grid of equally-sized cells (pixels)"],
    ["Best for", "Discrete features with clear boundaries", "Continuous phenomena (temperature, elevation, imagery)"],
    ["File formats", ".shp, .gpkg, .geojson, .kml", ".tif, .img, .nc, .hdf"],
    ["Python library", "geopandas", "rasterio / xarray"],
    ["Resolution concept", "Coordinate precision", "Pixel size (e.g. 10 m, 30 m, 1 km)"],
    ["Typical use", "Roads, buildings, river basins, admin boundaries", "Satellite images, DEMs, land cover, climate data"],
    ["Storage size", "Small for simple features", "Can be very large (high resolution × large area)"],
    ["Overlay analysis", "Intersect, union, buffer", "Map algebra, zonal statistics"],
  ];
  return (
    <div style={{ overflowX: "auto", marginBottom: 32 }}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Aspect</th>
            <th style={{ ...styles.th, background: "#EFF6FF", color: "#1D4ED8" }}>🔵 Vector</th>
            <th style={{ ...styles.th, background: "#FFF7ED", color: "#C2410C" }}>🟠 Raster</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([aspect, vec, ras], i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "#FAFAFA" : "#FFFFFF" }}>
              <td style={styles.tdLabel}>{aspect}</td>
              <td style={{ ...styles.td, color: "#1E40AF" }}>{vec}</td>
              <td style={{ ...styles.td, color: "#9A3412" }}>{ras}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── visual diagram ───────────────────────────────────────────────────────────
function DataModelDiagram() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
      {/* Vector */}
      <div style={{ ...styles.diagramBox, borderColor: "#3B82F6" }}>
        <div style={{ ...styles.diagramTitle, color: "#1D4ED8" }}>🔵 Vector</div>
        <svg viewBox="0 0 200 160" style={{ width: "100%", maxWidth: 200, display: "block", margin: "0 auto" }}>
          {/* polygon */}
          <polygon points="30,120 80,40 140,50 160,110 100,130" fill="#BFDBFE" stroke="#3B82F6" strokeWidth="2"/>
          {/* line */}
          <polyline points="20,30 60,70 110,55 170,80" fill="none" stroke="#10B981" strokeWidth="2.5"/>
          {/* points */}
          <circle cx="40" cy="90" r="5" fill="#F59E0B"/>
          <circle cx="120" cy="100" r="5" fill="#F59E0B"/>
          <circle cx="155" cy="45" r="5" fill="#F59E0B"/>
          {/* labels */}
          <text x="75" y="95" fontSize="11" fill="#1D4ED8" textAnchor="middle">polygon</text>
          <text x="100" y="48" fontSize="11" fill="#059669">line</text>
          <text x="165" y="45" fontSize="11" fill="#B45309">points</text>
        </svg>
        <p style={styles.diagramNote}>Stores exact coordinates.<br/>Scales without losing quality.</p>
      </div>
      {/* Raster */}
      <div style={{ ...styles.diagramBox, borderColor: "#F97316" }}>
        <div style={{ ...styles.diagramTitle, color: "#C2410C" }}>🟠 Raster</div>
        <svg viewBox="0 0 200 160" style={{ width: "100%", maxWidth: 200, display: "block", margin: "0 auto" }}>
          {[
            ["#A3E635","#65A30D","#16A34A","#15803D","#166534"],
            ["#BEF264","#A3E635","#4ADE80","#22C55E","#16A34A"],
            ["#D9F99D","#BEF264","#86EFAC","#4ADE80","#22C55E"],
            ["#ECFCCB","#D9F99D","#BBF7D0","#86EFAC","#4ADE80"],
            ["#F7FEE7","#ECFCCB","#DCFCE7","#BBF7D0","#86EFAC"],
          ].map((row, ri) =>
            row.map((fill, ci) => (
              <rect key={`${ri}-${ci}`} x={20 + ci * 32} y={20 + ri * 24}
                width={30} height={22} fill={fill} stroke="#fff" strokeWidth="1"/>
            ))
          )}
          <text x="100" y="148" fontSize="11" fill="#666" textAnchor="middle">each cell = one value</text>
        </svg>
        <p style={styles.diagramNote}>Stores values per pixel.<br/>Resolution fixed at capture time.</p>
      </div>
    </div>
  );
}

// ─── main tutorial component ──────────────────────────────────────────────────
export default function VectorVsRaster() {
  const [tab, setTab] = useState("python");

  const pythonCode = `import geopandas as gpd
import rasterio
import rasterio.plot
import matplotlib.pyplot as plt

# ── 1. VECTOR: load a river basin polygon ─────────────────────────────────────
# Download example: https://www.naturalearthdata.com/downloads/10m-physical-vectors/
basins = gpd.read_file("river_basins.shp")

print(f"CRS: {basins.crs}")           # coordinate system
print(f"Geometry type: {basins.geometry.geom_type.unique()}")
print(f"Number of features: {len(basins)}")

# Basic spatial operation: calculate area in km²
basins = basins.to_crs(epsg=3857)    # project to metres first
basins["area_km2"] = basins.geometry.area / 1e6
print(basins[["name", "area_km2"]].head())

# Plot the vector layer
basins.plot(column="area_km2", cmap="Blues", legend=True, figsize=(10, 6))
plt.title("River Basins — coloured by area (km²)")
plt.axis("off")
plt.tight_layout()
plt.savefig("vector_basins.png", dpi=150)
plt.show()

# ── 2. RASTER: load a DEM (Digital Elevation Model) ──────────────────────────
# Download SRTM 30m DEM: https://earthexplorer.usgs.gov/
with rasterio.open("dem_30m.tif") as src:
    dem = src.read(1)                 # band 1 = elevation values
    profile = src.profile             # metadata
    bounds = src.bounds

print(f"Raster shape: {dem.shape}")   # (rows, cols)
print(f"Resolution: {profile['transform'][0]:.1f} m")
print(f"NoData value: {profile['nodata']}")
print(f"Elevation range: {dem.min():.0f} – {dem.max():.0f} m")

# Plot the raster
fig, ax = plt.subplots(figsize=(10, 6))
rasterio.plot.show(src, ax=ax, cmap="terrain", title="Digital Elevation Model (30m)")
plt.tight_layout()
plt.savefig("raster_dem.png", dpi=150)
plt.show()

# ── 3. COMBINING BOTH: zonal statistics ───────────────────────────────────────
# What is the mean elevation inside each river basin?
from rasterstats import zonal_stats
import numpy as np

# Re-open raster to match CRS of vector
with rasterio.open("dem_30m.tif") as src:
    stats = zonal_stats(
        basins.to_crs(src.crs),       # reproject vector to raster CRS
        "dem_30m.tif",
        stats=["mean", "min", "max", "std"],
        nodata=src.nodata
    )

basins["elev_mean"] = [s["mean"] for s in stats]
basins["elev_max"]  = [s["max"]  for s in stats]

print(basins[["name", "area_km2", "elev_mean", "elev_max"]].head(10))`;

  const rCode = `library(sf)          # vector data
library(terra)       # raster data
library(tidyverse)   # data wrangling + ggplot2

# ── 1. VECTOR ─────────────────────────────────────────────────────────────────
basins <- st_read("river_basins.shp")

cat("CRS:", st_crs(basins)$input, "\\n")
cat("Geometry type:", unique(st_geometry_type(basins)), "\\n")
cat("Features:", nrow(basins), "\\n")

# Project to metres and calculate area
basins_m <- st_transform(basins, 3857)
basins_m$area_km2 <- as.numeric(st_area(basins_m)) / 1e6

ggplot(basins_m) +
  geom_sf(aes(fill = area_km2), colour = "white", linewidth = 0.3) +
  scale_fill_distiller(palette = "Blues", direction = 1, name = "Area (km²)") +
  labs(title = "River Basins — coloured by area") +
  theme_void()

ggsave("vector_basins.png", dpi = 150, width = 10, height = 6)

# ── 2. RASTER ─────────────────────────────────────────────────────────────────
dem <- rast("dem_30m.tif")

cat("Resolution:", res(dem), "m\\n")
cat("Dimensions:", dim(dem), "\\n")
cat("Elevation range:", minmax(dem), "m\\n")

plot(dem, main = "Digital Elevation Model (30m)",
     col = terrain.colors(100))

# ── 3. ZONAL STATISTICS ───────────────────────────────────────────────────────
basins_reproj <- st_transform(basins_m, crs(dem))
basins_vect   <- vect(basins_reproj)

elev_stats <- extract(dem, basins_vect, fun = list(mean, min, max), na.rm = TRUE)
colnames(elev_stats)[-1] <- c("elev_mean", "elev_min", "elev_max")

basins_m <- bind_cols(basins_m, elev_stats[-1])
print(select(basins_m, name, area_km2, elev_mean, elev_max))`;

  return (
    <div style={styles.page}>
      {/* breadcrumb */}
      <div style={styles.breadcrumb}>
        <span style={styles.breadcrumbItem}>GIS Applications</span>
        <span style={styles.breadcrumbSep}>›</span>
        <span style={styles.breadcrumbItem}>Basic Stuff</span>
        <span style={styles.breadcrumbSep}>›</span>
        <span style={{ color: "#111" }}>Vector vs Raster</span>
      </div>

      {/* header */}
      <div style={styles.header}>
        <div style={styles.tagRow}>
          <span style={styles.tag}>Beginner</span>
          <span style={styles.tag}>~20 min</span>
          <span style={styles.tag}>Python + R</span>
        </div>
        <h1 style={styles.h1}>Vector vs Raster: Core Data Models</h1>
        <p style={styles.lead}>
          Every piece of geographic data lives in one of two worlds. Understanding this
          distinction is the single most important foundation in GIS — it shapes which
          tools you use, how you store data, and what analyses are even possible.
        </p>
        <a href="https://colab.research.google.com/github/jhonnatan2178/rcafe/blob/main/notebooks/vector-vs-raster.ipynb"
          target="_blank" rel="noopener noreferrer" style={styles.colabBtn}>
          🚀 Open in Google Colab
        </a>
      </div>

      {/* what you'll build */}
      <div style={styles.section}>
        <h2 style={styles.h2}>What you'll build</h2>
        <p style={styles.p}>By the end of this tutorial you will be able to:</p>
        <ul style={styles.ul}>
          <li>Load and inspect both vector and raster datasets in Python and R</li>
          <li>Visualise them on a map with a single command</li>
          <li>Combine both data models using zonal statistics</li>
          <li>Confidently choose the right format for any new GIS task</li>
        </ul>
      </div>

      {/* concept */}
      <div style={styles.section}>
        <h2 style={styles.h2}>The two models — at a glance</h2>
        <DataModelDiagram />
        <CompareTable />

        <Callout type="tip">
          <strong>The mental shortcut:</strong> if the feature has a clear, precise
          boundary (a road, a building, a watershed), use <strong>vector</strong>. If
          the phenomenon varies continuously across space with no sharp edges (temperature,
          elevation, satellite reflectance), use <strong>raster</strong>.
        </Callout>
      </div>

      {/* code */}
      <div style={styles.section}>
        <h2 style={styles.h2}>Code walkthrough</h2>

        {/* tab switcher */}
        <div style={styles.tabRow}>
          {["python", "r"].map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ ...styles.tabBtn, ...(tab === t ? styles.tabBtnActive : {}) }}>
              {t === "python" ? "🐍 Python" : "📊 R"}
            </button>
          ))}
        </div>

        {tab === "python" && (
          <>
            <p style={styles.p}>
              We use <code style={styles.code}>geopandas</code> for vectors,{" "}
              <code style={styles.code}>rasterio</code> for rasters, and{" "}
              <code style={styles.code}>rasterstats</code> to combine them.
              Install everything with:
            </p>
            <CodeBlock lang="bash" code="pip install geopandas rasterio rasterstats matplotlib" />
            <p style={styles.p}>Now the full workflow — loading, inspecting, visualising, and combining both models:</p>
            <CodeBlock lang="python" code={pythonCode} />
          </>
        )}

        {tab === "r" && (
          <>
            <p style={styles.p}>
              We use <code style={styles.code}>sf</code> for vectors,{" "}
              <code style={styles.code}>terra</code> for rasters, and{" "}
              <code style={styles.code}>tidyverse</code> for wrangling and plots.
              Install with:
            </p>
            <CodeBlock lang="r" code='install.packages(c("sf", "terra", "tidyverse"))' />
            <p style={styles.p}>Full workflow:</p>
            <CodeBlock lang="r" code={rCode} />
          </>
        )}
      </div>

      {/* expected output */}
      <div style={styles.section}>
        <h2 style={styles.h2}>Expected outputs</h2>
        <p style={styles.p}>Running this code produces three results:</p>
        <ol style={styles.ol}>
          <li><strong>vector_basins.png</strong> — a choropleth map of river basins coloured by area</li>
          <li><strong>raster_dem.png</strong> — a terrain-coloured elevation raster</li>
          <li><strong>A table</strong> printed in your console showing mean and max elevation per basin — this is zonal statistics: raster values summarised by vector zones</li>
        </ol>
        <Callout type="info">
          Don't have the files yet? Download a free DEM from{" "}
          <a href="https://earthexplorer.usgs.gov" target="_blank" rel="noopener noreferrer"
            style={{ color: "#2563EB" }}>USGS EarthExplorer</a>{" "}
          and river basins from{" "}
          <a href="https://www.naturalearthdata.com" target="_blank" rel="noopener noreferrer"
            style={{ color: "#2563EB" }}>Natural Earth</a>. Both are free.
        </Callout>
      </div>

      {/* common mistakes */}
      <div style={styles.section}>
        <h2 style={styles.h2}>Common mistakes to avoid</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            ["CRS mismatch", "Always check that your vector and raster share the same coordinate reference system before combining them. Reproject with .to_crs() (Python) or st_transform() (R)."],
            ["Forgetting NoData", "Raster files often contain a NoData value (e.g. -9999 or -32768) for areas with no data. Always set nodata= when reading, or your statistics will be wildly wrong."],
            ["Wrong geometry type", "A GeoDataFrame can contain mixed geometry types. Check .geom_type.unique() before analysis — many tools expect a single type."],
            ["Resolution confusion", "A 10m raster and a 30m raster of the same area contain very different amounts of detail. Always print res(raster) before analysis."],
          ].map(([title, desc], i) => (
            <div key={i} style={styles.mistakeRow}>
              <div style={styles.mistakeIcon}>⚠️</div>
              <div><strong style={{ color: "#111" }}>{title}:</strong>{" "}
                <span style={{ color: "#374151" }}>{desc}</span></div>
            </div>
          ))}
        </div>
      </div>

      {/* quiz */}
      <div style={styles.section}>
        <h2 style={styles.h2}>Test your understanding</h2>
        <p style={styles.p}>Choose an answer, then click <em>Check answer</em>.</p>
        <Quiz />
      </div>

      {/* next steps */}
      <div style={styles.section}>
        <h2 style={styles.h2}>What's next?</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          {[
            ["03 — Coordinate Reference Systems", "Why projections matter and how to reproject data.", "/tutorial/crs-explained"],
            ["04 — Your First Spatial Analysis", "Load, visualise, and analyse real spatial data.", "/tutorial/first-spatial-analysis"],
            ["Flood Risk Modelling", "Apply raster analysis to identify flood-prone zones.", "/tutorial/python-flood-risk"],
          ].map(([title, desc, href], i) => (
            <a key={i} href={href} style={styles.nextCard}>
              <div style={styles.nextTitle}>{title}</div>
              <div style={styles.nextDesc}>{desc}</div>
              <div style={{ color: "#2563EB", fontSize: 13, marginTop: 8 }}>Read →</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── styles ───────────────────────────────────────────────────────────────────
const styles = {
  page: { maxWidth: 820, margin: "0 auto", padding: "32px 24px", fontFamily: "'Inter', system-ui, sans-serif", color: "#111827", lineHeight: 1.65 },
  breadcrumb: { display: "flex", gap: 6, alignItems: "center", fontSize: 13, color: "#6B7280", marginBottom: 24 },
  breadcrumbItem: { cursor: "pointer" },
  breadcrumbSep: { color: "#D1D5DB" },
  header: { marginBottom: 40 },
  tagRow: { display: "flex", gap: 8, marginBottom: 12 },
  tag: { fontSize: 12, padding: "3px 10px", borderRadius: 20, background: "#F3F4F6", color: "#374151", border: "1px solid #E5E7EB" },
  h1: { fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, lineHeight: 1.2, margin: "0 0 16px", color: "#111827" },
  h2: { fontSize: 22, fontWeight: 600, margin: "0 0 16px", color: "#111827" },
  lead: { fontSize: 17, color: "#374151", margin: "0 0 24px", lineHeight: 1.7 },
  colabBtn: { display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", background: "#F97316", color: "#fff", borderRadius: 8, textDecoration: "none", fontWeight: 600, fontSize: 14 },
  section: { marginBottom: 48 },
  p: { fontSize: 15, color: "#374151", margin: "0 0 16px", lineHeight: 1.7 },
  ul: { paddingLeft: 24, margin: "0 0 16px", fontSize: 15, color: "#374151", lineHeight: 1.8 },
  ol: { paddingLeft: 24, margin: "0 0 16px", fontSize: 15, color: "#374151", lineHeight: 1.8 },
  code: { background: "#F3F4F6", padding: "2px 6px", borderRadius: 4, fontFamily: "monospace", fontSize: 13 },
  codeWrap: { background: "#1E293B", borderRadius: 10, overflow: "hidden", marginBottom: 24 },
  codeHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 16px", background: "#0F172A" },
  codeLang: { fontSize: 12, color: "#94A3B8", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.05em" },
  copyBtn: { fontSize: 12, padding: "4px 12px", background: "#334155", color: "#CBD5E1", border: "none", borderRadius: 6, cursor: "pointer" },
  pre: { margin: 0, padding: "20px 24px", overflowX: "auto", fontSize: 13, lineHeight: 1.7, color: "#E2E8F0", fontFamily: "'Fira Code', 'Cascadia Code', monospace" },
  callout: { padding: "14px 18px", borderRadius: 8, margin: "0 0 24px", fontSize: 14, lineHeight: 1.65, color: "#374151" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 14, marginBottom: 24 },
  th: { padding: "12px 16px", textAlign: "left", background: "#F9FAFB", fontWeight: 600, borderBottom: "2px solid #E5E7EB", fontSize: 13 },
  td: { padding: "11px 16px", fontSize: 13, borderBottom: "1px solid #F3F4F6" },
  tdLabel: { padding: "11px 16px", fontSize: 13, fontWeight: 500, color: "#374151", borderBottom: "1px solid #F3F4F6", background: "#FAFAFA" },
  diagramBox: { border: "2px solid", borderRadius: 12, padding: "20px 16px", textAlign: "center", background: "#FAFAFA" },
  diagramTitle: { fontSize: 16, fontWeight: 700, marginBottom: 12 },
  diagramNote: { fontSize: 12, color: "#6B7280", marginTop: 8, lineHeight: 1.5 },
  tabRow: { display: "flex", gap: 8, marginBottom: 20 },
  tabBtn: { padding: "8px 20px", borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#F9FAFB", fontSize: 14, cursor: "pointer", fontWeight: 500, color: "#374151" },
  tabBtnActive: { background: "#1E293B", color: "#fff", borderColor: "#1E293B" },
  mistakeRow: { display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 16px", background: "#FFFBEB", borderRadius: 8, border: "1px solid #FDE68A", fontSize: 14 },
  mistakeIcon: { flexShrink: 0, fontSize: 16 },
  quizCard: { background: "#F9FAFB", border: "1.5px solid #E5E7EB", borderRadius: 10, padding: "20px", marginBottom: 16 },
  quizQ: { fontSize: 14, marginBottom: 12, color: "#111827" },
  quizOption: { width: "100%", textAlign: "left", padding: "10px 14px", borderRadius: 8, fontSize: 13, fontWeight: 500, transition: "all 0.15s" },
  revealBtn: { marginTop: 12, padding: "7px 16px", background: "#2563EB", color: "#fff", border: "none", borderRadius: 7, fontSize: 13, cursor: "pointer", fontWeight: 500 },
  explanation: { marginTop: 12, padding: "10px 14px", background: "#F0FDF4", border: "1px solid #86EFAC", borderRadius: 8, fontSize: 13, color: "#166534", lineHeight: 1.6 },
  nextCard: { display: "block", padding: "16px", background: "#F9FAFB", border: "1.5px solid #E5E7EB", borderRadius: 10, textDecoration: "none", transition: "border-color 0.15s" },
  nextTitle: { fontWeight: 600, fontSize: 14, color: "#111827", marginBottom: 4 },
  nextDesc: { fontSize: 13, color: "#6B7280", lineHeight: 1.5 },
};