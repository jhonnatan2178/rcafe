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
    fire:    { bg: "#FFF7ED", border: "#F97316", icon: "🔥" },
  };
  const c = map[type];
  return (
    <div style={{ ...s.callout, background: c.bg, borderLeft: `4px solid ${c.border}` }}>
      <span style={{ marginRight: 8 }}>{c.icon}</span>{children}
    </div>
  );
}

// ── NBR visual explainer ─────────────────────────────────────────────────────
function NBRFormula() {
  return (
    <div style={s.formulaBox}>
      <div style={s.formulaTitle}>Normalized Burn Ratio (NBR)</div>
      <div style={s.formula}>
        <span style={s.formulaFrac}>
          <span style={s.formulaNum}>NIR − SWIR</span>
          <span style={s.formulaBar}></span>
          <span style={s.formulaDen}>NIR + SWIR</span>
        </span>
      </div>
      <div style={s.formulaRange}>Range: −1 → +1</div>
      <div style={s.formulaGrid}>
        {[
          { range: "+0.4 → +1.0", label: "Healthy vegetation", color: "#16A34A", bg: "#F0FDF4" },
          { range: "+0.1 → +0.4", label: "Sparse / stressed veg.", color: "#65A30D", bg: "#F7FEE7" },
          { range: "−0.1 → +0.1", label: "Bare soil / recently burned", color: "#B45309", bg: "#FFFBEB" },
          { range: "< −0.1",       label: "Severely burned / water", color: "#991B1B", bg: "#FEF2F2" },
        ].map((r, i) => (
          <div key={i} style={{ ...s.rangeRow, background: r.bg }}>
            <span style={{ ...s.rangeVal, color: r.color }}>{r.range}</span>
            <span style={s.rangeLabel}>{r.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── band diagram ─────────────────────────────────────────────────────────────
function BandDiagram() {
  const bands = [
    { name: "Blue", wl: "490 nm", s2: "B2",  color: "#3B82F6", used: false },
    { name: "Green", wl: "560 nm", s2: "B3",  color: "#22C55E", used: false },
    { name: "Red",  wl: "665 nm", s2: "B4",  color: "#EF4444", used: false },
    { name: "NIR",  wl: "842 nm", s2: "B8",  color: "#7C3AED", used: true,  role: "NBR numerator" },
    { name: "SWIR1", wl: "1610 nm", s2: "B11", color: "#F97316", used: true,  role: "NBR denominator" },
    { name: "SWIR2", wl: "2190 nm", s2: "B12", color: "#DC2626", used: true,  role: "dNBR alternative" },
  ];
  return (
    <div style={s.bandBox}>
      <div style={s.bandTitle}>Sentinel-2 bands used in this tutorial</div>
      <div style={s.bandGrid}>
        {bands.map((b, i) => (
          <div key={i} style={{ ...s.bandCard, opacity: b.used ? 1 : 0.35, border: `2px solid ${b.used ? b.color : "#E5E7EB"}` }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: b.color, margin: "0 auto 6px" }}></div>
            <div style={s.bandName}>{b.name}</div>
            <div style={s.bandS2}>{b.s2}</div>
            <div style={s.bandWl}>{b.wl}</div>
            {b.used && <div style={{ ...s.bandRole, color: b.color }}>{b.role}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── severity scale ────────────────────────────────────────────────────────────
function SeverityScale() {
  const levels = [
    { label: "Enhanced regrowth", dNBR: "< −0.25", color: "#15803D", bg: "#DCFCE7" },
    { label: "Unburned",          dNBR: "−0.25 – 0.10", color: "#65A30D", bg: "#F7FEE7" },
    { label: "Low severity",      dNBR: "0.10 – 0.27", color: "#CA8A04", bg: "#FEF9C3" },
    { label: "Moderate-low",      dNBR: "0.27 – 0.44", color: "#EA580C", bg: "#FFF7ED" },
    { label: "Moderate-high",     dNBR: "0.44 – 0.66", color: "#DC2626", bg: "#FEF2F2" },
    { label: "High severity",     dNBR: "> 0.66",      color: "#7F1D1D", bg: "#FEE2E2" },
  ];
  return (
    <div style={s.severityBox}>
      <div style={s.bandTitle}>USGS dNBR Burn Severity Classification</div>
      {levels.map((l, i) => (
        <div key={i} style={{ ...s.severityRow, background: l.bg }}>
          <div style={{ ...s.severityDot, background: l.color }}></div>
          <div style={{ ...s.severityLabel, color: l.color }}>{l.label}</div>
          <div style={s.severityDnbr}>{l.dNBR}</div>
        </div>
      ))}
      <div style={{ fontSize: 11, color: "#6B7280", marginTop: 8 }}>Source: Key & Benson (2006), USGS FIREMON</div>
    </div>
  );
}

// ── workflow stepper ──────────────────────────────────────────────────────────
function WorkflowStepper() {
  const [active, setActive] = useState(0);
  const steps = [
    { icon: "🛰️", title: "Acquire imagery", desc: "Download cloud-free Sentinel-2 L2A scenes for pre- and post-fire dates from Copernicus Open Access Hub or Google Earth Engine. L2A = surface reflectance (already atmospherically corrected)." },
    { icon: "🎭", title: "Mask clouds & water", desc: "Use the Sentinel-2 Scene Classification Layer (SCL band) to mask clouds, cloud shadows, and water bodies. These confuse spectral indices and produce false positives." },
    { icon: "🧮", title: "Compute NBR", desc: "NBR = (NIR - SWIR) / (NIR + SWIR). In Sentinel-2: NIR = Band 8 (842nm), SWIR = Band 12 (2190nm). Values range from -1 to +1. Healthy vegetation is high; burned areas are low." },
    { icon: "📉", title: "Compute dNBR", desc: "dNBR = NBR_pre − NBR_post. Positive values indicate burned area. The higher the dNBR, the more severe the burn. This is more robust than single-date NBR." },
    { icon: "🗺️", title: "Classify severity", desc: "Apply USGS thresholds to classify dNBR into burn severity levels (unburned, low, moderate, high). Export as a GeoTIFF for visualisation or further analysis." },
  ];
  return (
    <div style={s.stepperBox}>
      <div style={s.stepperNav}>
        {steps.map((st, i) => (
          <button key={i} onClick={() => setActive(i)}
            style={{ ...s.stepperBtn, ...(active === i ? s.stepperBtnActive : {}) }}>
            <span style={s.stepperIcon}>{st.icon}</span>
            <span style={{ fontSize: 11 }}>{i + 1}. {st.title}</span>
          </button>
        ))}
      </div>
      <div style={s.stepperContent}>
        <div style={s.stepperNum}>Step {active + 1} of {steps.length}</div>
        <div style={s.stepperTitle}>{steps[active].icon} {steps[active].title}</div>
        <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: 0 }}>{steps[active].desc}</p>
        <div style={s.stepperControls}>
          <button onClick={() => setActive(Math.max(0, active-1))} disabled={active===0} style={s.stepperArrow}>← Previous</button>
          <button onClick={() => setActive(Math.min(steps.length-1, active+1))} disabled={active===steps.length-1} style={s.stepperArrow}>Next →</button>
        </div>
      </div>
    </div>
  );
}

// ── quiz ─────────────────────────────────────────────────────────────────────
function Quiz() {
  const qs = [
    { q: "Why does a burned surface show low NBR values?", opts: ["Fire increases NIR reflectance", "Fire destroys vegetation — reducing NIR and increasing SWIR", "SWIR cannot detect burned surfaces"], ans: 1, exp: "Healthy vegetation strongly absorbs SWIR and reflects NIR. After burning, vegetation disappears — NIR drops and SWIR increases, driving NBR down." },
    { q: "What does dNBR measure?", opts: ["A single-date burn index", "The change in NBR between pre- and post-fire images", "The temperature of the fire front"], ans: 1, exp: "dNBR = NBR_pre − NBR_post. It captures the magnitude of change caused by the fire, making it more robust than a single-date index." },
    { q: "Which Sentinel-2 bands are used to compute NBR?", opts: ["B4 (Red) and B8 (NIR)", "B8 (NIR) and B12 (SWIR2)", "B2 (Blue) and B11 (SWIR1)"], ans: 1, exp: "NBR uses Band 8 (NIR, 842nm) and Band 12 (SWIR2, 2190nm). These bands show the most contrast between healthy and burned vegetation." },
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
                style={{ ...s.quizOpt, background:bg, border, cursor: revealed[qi]?"default":"pointer" }}>
                {opt}{revealed[qi] && oi===q.ans && " ✓"}{revealed[qi] && chosen[qi]===oi && oi!==q.ans && " ✗"}
              </button>;
            })}
          </div>
          {!revealed[qi] && <button onClick={() => reveal(qi)} disabled={chosen[qi]===undefined} style={s.revealBtn}>Check answer</button>}
          {revealed[qi] && <div style={s.explanation}><strong>{chosen[qi]===q.ans?"Correct! ":"Not quite. "}</strong>{q.exp}</div>}
        </div>
      ))}
    </div>
  );
}

// ── main ─────────────────────────────────────────────────────────────────────
export default function WildfireNBR() {
  const [tab, setTab] = useState("python");

  const pyCode = `import numpy as np
import rasterio
import rasterio.plot
from rasterio.mask import mask as rio_mask
import matplotlib.pyplot as plt
import matplotlib.colors as mcolors
import geopandas as gpd

# ── Step 1: Load Sentinel-2 bands ─────────────────────────────────────────────
# Download L2A product from Copernicus Open Access Hub
# B8 = NIR (10m), B12 = SWIR2 (20m — resample to 10m)
# We work with pre- and post-fire scenes

def load_band(path):
    with rasterio.open(path) as src:
        return src.read(1).astype("float32"), src.profile, src.crs

nir_pre,  profile, crs = load_band("pre_fire_B08.tif")
swir_pre, *_           = load_band("pre_fire_B12_10m.tif")   # resampled to 10m
nir_post, *_           = load_band("post_fire_B08.tif")
swir_post, *_          = load_band("post_fire_B12_10m.tif")

# ── Step 2: Mask clouds using SCL band ────────────────────────────────────────
# SCL values: 4=vegetation, 5=bare soil, 6=water, 8-10=clouds/shadows
def valid_mask(scl_path, valid_classes=(4, 5)):
    scl, *_ = load_band(scl_path)
    return np.isin(scl, valid_classes)

valid_pre  = valid_mask("pre_fire_SCL.tif")
valid_post = valid_mask("post_fire_SCL.tif")
valid      = valid_pre & valid_post           # only pixels clear in BOTH dates

# ── Step 3: Compute NBR ───────────────────────────────────────────────────────
def nbr(nir, swir, mask=None):
    with np.errstate(divide="ignore", invalid="ignore"):
        result = (nir - swir) / (nir + swir)
    result = np.where(nir + swir == 0, 0, result)
    if mask is not None:
        result[~mask] = np.nan
    return result

nbr_pre  = nbr(nir_pre,  swir_pre,  valid)
nbr_post = nbr(nir_post, swir_post, valid)

print(f"Pre-fire  NBR range: {np.nanmin(nbr_pre):.3f} – {np.nanmax(nbr_pre):.3f}")
print(f"Post-fire NBR range: {np.nanmin(nbr_post):.3f} – {np.nanmax(nbr_post):.3f}")

# ── Step 4: Compute dNBR and classify severity ────────────────────────────────
dnbr = nbr_pre - nbr_post

# USGS burn severity thresholds (Key & Benson 2006)
def classify_severity(dnbr):
    classes = np.zeros_like(dnbr, dtype="uint8")
    classes[dnbr < -0.25]                      = 1  # enhanced regrowth
    classes[(dnbr >= -0.25) & (dnbr < 0.10)]   = 2  # unburned
    classes[(dnbr >= 0.10)  & (dnbr < 0.27)]   = 3  # low severity
    classes[(dnbr >= 0.27)  & (dnbr < 0.44)]   = 4  # moderate-low
    classes[(dnbr >= 0.44)  & (dnbr < 0.66)]   = 5  # moderate-high
    classes[dnbr >= 0.66]                       = 6  # high severity
    classes[np.isnan(dnbr)]                     = 0  # masked
    return classes

severity = classify_severity(dnbr)

# Burned area = classes 3-6 (low to high severity)
burned_area_km2 = np.sum(severity >= 3) * (10 * 10) / 1e6   # 10m pixels
print(f"Total burned area: {burned_area_km2:.1f} km²")

# ── Step 5: Visualise ─────────────────────────────────────────────────────────
fig, axes = plt.subplots(1, 3, figsize=(16, 5))

# NBR pre-fire
im1 = axes[0].imshow(nbr_pre,  cmap="RdYlGn", vmin=-1, vmax=1)
axes[0].set_title("NBR — Pre-fire", fontweight="bold")
axes[0].axis("off")
plt.colorbar(im1, ax=axes[0], fraction=0.046, pad=0.04)

# NBR post-fire
im2 = axes[1].imshow(nbr_post, cmap="RdYlGn", vmin=-1, vmax=1)
axes[1].set_title("NBR — Post-fire", fontweight="bold")
axes[1].axis("off")
plt.colorbar(im2, ax=axes[1], fraction=0.046, pad=0.04)

# Severity map
cmap_sev = mcolors.ListedColormap(
    ["white", "#15803D", "#A3E635", "#FDE047", "#F97316", "#DC2626", "#7F1D1D"])
bounds = [0, 1, 2, 3, 4, 5, 6, 7]
norm   = mcolors.BoundaryNorm(bounds, cmap_sev.N)
im3 = axes[2].imshow(severity, cmap=cmap_sev, norm=norm)
axes[2].set_title("Burn Severity (dNBR)", fontweight="bold")
axes[2].axis("off")
cbar = plt.colorbar(im3, ax=axes[2], fraction=0.046, pad=0.04, ticks=[0.5,1.5,2.5,3.5,4.5,5.5,6.5])
cbar.ax.set_yticklabels(["Masked","Regrowth","Unburned","Low","Mod-Low","Mod-High","High"], fontsize=8)

plt.suptitle("Wildfire Burn Severity — Sentinel-2 dNBR Analysis", fontsize=13, fontweight="bold")
plt.tight_layout()
plt.savefig("wildfire_severity_map.png", dpi=150, bbox_inches="tight")
plt.show()

# ── Step 6: Export severity raster ───────────────────────────────────────────
out_profile = profile.copy()
out_profile.update(dtype=rasterio.uint8, count=1, nodata=0)

with rasterio.open("burn_severity.tif", "w", **out_profile) as dst:
    dst.write(severity, 1)

print("Saved: burn_severity.tif")`;

  const rCode = `library(terra)
library(tidyverse)
library(sf)

# ── Step 1: Load Sentinel-2 bands ─────────────────────────────────────────────
load_band <- function(path) rast(path)

nir_pre   <- load_band("pre_fire_B08.tif")
swir_pre  <- load_band("pre_fire_B12_10m.tif")
nir_post  <- load_band("post_fire_B08.tif")
swir_post <- load_band("post_fire_B12_10m.tif")

# ── Step 2: Cloud mask from SCL ───────────────────────────────────────────────
valid_mask <- function(scl_path, valid_classes = c(4, 5)) {
  scl <- rast(scl_path)
  ifel(scl %in% valid_classes, 1, NA)
}

mask_pre  <- valid_mask("pre_fire_SCL.tif")
mask_post <- valid_mask("post_fire_SCL.tif")
combined_mask <- mask_pre * mask_post

# ── Step 3: Compute NBR ───────────────────────────────────────────────────────
compute_nbr <- function(nir, swir, msk = NULL) {
  result <- (nir - swir) / (nir + swir)
  if (!is.null(msk)) result <- mask(result, msk)
  result
}

nbr_pre  <- compute_nbr(nir_pre,  swir_pre,  combined_mask)
nbr_post <- compute_nbr(nir_post, swir_post, combined_mask)

cat("Pre-fire  NBR range:", minmax(nbr_pre),  "\\n")
cat("Post-fire NBR range:", minmax(nbr_post), "\\n")

# ── Step 4: dNBR and severity classification ──────────────────────────────────
dnbr <- nbr_pre - nbr_post

# USGS thresholds
severity <- classify(dnbr, matrix(c(
  -Inf,  -0.25, 1,   # enhanced regrowth
  -0.25,  0.10, 2,   # unburned
   0.10,  0.27, 3,   # low severity
   0.27,  0.44, 4,   # moderate-low
   0.44,  0.66, 5,   # moderate-high
   0.66,  Inf,  6    # high severity
), ncol = 3, byrow = TRUE))

# Area calculation (10m pixels → km²)
burned_pixels <- sum(values(severity) >= 3, na.rm = TRUE)
cat("Burned area:", round(burned_pixels * 100 / 1e6, 1), "km²\\n")

# ── Step 5: Visualise ─────────────────────────────────────────────────────────
severity_cols <- c("#15803D","#A3E635","#FDE047","#F97316","#DC2626","#7F1D1D")

plot(severity,
     col   = severity_cols,
     main  = "Burn Severity (dNBR) — Sentinel-2",
     legend = TRUE,
     mar   = c(2, 2, 2, 4))

# ── Step 6: Export ────────────────────────────────────────────────────────────
writeRaster(severity, "burn_severity.tif",
            datatype = "INT1U", overwrite = TRUE)
cat("Saved: burn_severity.tif\\n")`;

  return (
    <div style={s.page}>
      <div style={s.breadcrumb}>
        <span>GIS Applications</span><span style={s.sep}>›</span>
        <span>Land Cover Analysis</span><span style={s.sep}>›</span>
        <span style={{color:"#111"}}>Wildfire Burn Severity</span>
      </div>

      <div style={s.tags}>
        {["Intermediate","~30 min","Python + R","Sentinel-2"].map(t => (
          <span key={t} style={s.tag}>{t}</span>
        ))}
      </div>

      <h1 style={s.h1}>Wildfire Burn Severity Mapping with Spectral Indices</h1>
      <p style={s.lead}>
        Wildfires alter vegetation structure, soil moisture, and surface reflectance in ways
        that are clearly visible from space. In this tutorial you'll implement a complete
        burned area workflow using Sentinel-2 imagery — from raw bands to a classified
        burn severity map — using the Normalized Burn Ratio (NBR) and its difference (dNBR).
      </p>
      <a href="https://colab.research.google.com/github/jhonnatan2178/rcafe/blob/main/notebooks/wildfire-nbr.ipynb"
        target="_blank" rel="noopener noreferrer" style={s.colabBtn}>
        🚀 Open in Google Colab
      </a>

      {/* What you'll build */}
      <div style={s.section}>
        <h2 style={s.h2}>What you'll build</h2>
        <ul style={s.ul}>
          <li>Load and cloud-mask pre- and post-fire Sentinel-2 imagery</li>
          <li>Compute NBR and dNBR using NIR and SWIR bands</li>
          <li>Classify burn severity using USGS thresholds</li>
          <li>Calculate total burned area in km²</li>
          <li>Export a GeoTIFF severity map and a 3-panel visualisation</li>
        </ul>
      </div>

      {/* Why optical */}
      <div style={s.section}>
        <h2 style={s.h2}>Why optical data for fire mapping?</h2>
        <p style={s.p}>
          Wildfires cause abrupt changes in vegetation and surface properties that optical
          sensors detect through variations in reflectance. Burned surfaces show a consistent
          spectral signature:
        </p>
        <div style={s.threeCol}>
          {[
            { icon:"📉", title:"NIR drops", desc:"Healthy vegetation strongly reflects NIR. After fire, the canopy disappears and NIR reflectance falls sharply." },
            { icon:"📈", title:"SWIR rises", desc:"Charcoal and exposed mineral soil absorb NIR but reflect SWIR, increasing SWIR reflectance." },
            { icon:"🍃", title:"Chlorophyll lost", desc:"Green vegetation spectral features vanish — visible bands show darker, browner surfaces." },
          ].map((c,i) => (
            <div key={i} style={s.threeCard}>
              <div style={s.threeIcon}>{c.icon}</div>
              <div style={s.threeTitle}>{c.title}</div>
              <div style={s.threeDesc}>{c.desc}</div>
            </div>
          ))}
        </div>
        <BandDiagram />
      </div>

      {/* NBR explained */}
      <div style={s.section}>
        <h2 style={s.h2}>The NBR index — explained</h2>
        <NBRFormula />
        <Callout type="fire">
          <strong>dNBR is almost always better than single-date NBR.</strong> A single
          post-fire NBR image can confuse burned areas with dry bare soil or shadow.
          dNBR removes that ambiguity by measuring the <em>change</em> caused by the fire.
        </Callout>
        <SeverityScale />
      </div>

      {/* Workflow */}
      <div style={s.section}>
        <h2 style={s.h2}>The workflow — step by step</h2>
        <WorkflowStepper />
      </div>

      {/* Code */}
      <div style={s.section}>
        <h2 style={s.h2}>Full code walkthrough</h2>
        <div style={s.tabRow}>
          {["python","r"].map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ ...s.tabBtn, ...(tab===t ? s.tabBtnActive : {}) }}>
              {t==="python" ? "🐍 Python" : "📊 R"}
            </button>
          ))}
        </div>

        {tab==="python" && (
          <>
            <p style={s.p}>Install dependencies:</p>
            <CodeBlock id="py-install" lang="bash">pip install numpy rasterio matplotlib geopandas</CodeBlock>
            <CodeBlock id="py-main" lang="python">{pyCode}</CodeBlock>
          </>
        )}
        {tab==="r" && (
          <>
            <p style={s.p}>Install dependencies:</p>
            <CodeBlock id="r-install" lang="r">install.packages(c("terra", "tidyverse", "sf"))</CodeBlock>
            <CodeBlock id="r-main" lang="r">{rCode}</CodeBlock>
          </>
        )}
      </div>

      {/* Data sources */}
      <div style={s.section}>
        <h2 style={s.h2}>Data sources</h2>
        <div style={s.dataGrid}>
          {[
            { icon:"🛰️", name:"Copernicus Open Access Hub", url:"https://scihub.copernicus.eu", desc:"Free Sentinel-2 L2A scenes (surface reflectance, already corrected)" },
            { icon:"🌍", name:"Google Earth Engine", url:"https://code.earthengine.google.com", desc:"Python API: ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')" },
            { icon:"🔥", name:"Copernicus EMS", url:"https://emergency.copernicus.eu", desc:"Free reference fire perimeters for validation" },
            { icon:"🏔️", name:"USGS EarthExplorer", url:"https://earthexplorer.usgs.gov", desc:"Landsat Collection 2 alternative — free, global" },
          ].map((d,i) => (
            <a key={i} href={d.url} target="_blank" rel="noopener noreferrer" style={s.dataCard}>
              <div style={s.dataIcon}>{d.icon}</div>
              <div style={s.dataName}>{d.name}</div>
              <div style={s.dataDesc}>{d.desc}</div>
            </a>
          ))}
        </div>
      </div>

      {/* Limitations */}
      <div style={s.section}>
        <h2 style={s.h2}>Limitations to keep in mind</h2>
        <div style={s.limitGrid}>
          {[
            ["Dark surface confusion","Shadows, deep water, and dark soil can have similar NBR values to burned areas. Always validate against known reference areas."],
            ["Cloud contamination","Even small cloud fractions corrupt results. Use SCL masking rigorously, and check cloud cover before downloading."],
            ["No temporal persistence","A single post-fire image doesn't capture recovery. Time-series dNBR tracks how the landscape recovers over months and years."],
            ["SAR needed for smoke","During active fires, smoke blocks optical sensors. Integrate Sentinel-1 SAR for near-real-time fire monitoring."],
          ].map(([title, desc],i) => (
            <div key={i} style={s.limitCard}>
              <div style={s.limitTitle}>⚠️ {title}</div>
              <div style={s.limitDesc}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Extensions */}
      <div style={s.section}>
        <h2 style={s.h2}>How to extend this analysis</h2>
        <Callout type="tip">
          This tutorial gives you a solid baseline. Here's where to go next:
        </Callout>
        <ul style={s.ul}>
          <li><strong>Multi-temporal recovery:</strong> compute dNBR at 1, 6, 12, and 24 months post-fire to map vegetation recovery trajectories</li>
          <li><strong>SAR integration:</strong> combine Sentinel-1 C-band backscatter with dNBR to map fire through smoke and clouds</li>
          <li><strong>Machine learning:</strong> train a Random Forest on spectral indices + terrain variables for multi-class severity mapping</li>
          <li><strong>Large-scale GEE:</strong> scale the workflow to entire countries using Google Earth Engine's parallel processing</li>
          <li><strong>Fire risk modelling:</strong> combine burn severity with DEM slope and fuel load maps for predictive risk assessment</li>
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
            ["Flood Mapping with SAR","Detect floods using Sentinel-1 radar — works through clouds and at night.","/tutorial/python-flood-risk"],
            ["Land Cover Classification","Supervised classification with Random Forest on Sentinel-2 multispectral data.","/tutorial/land-cover-classification"],
            ["Water Quality Monitoring","Map coastal water quality indices from Sentinel-2/3 optical bands.","/tutorial/water-quality"],
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

// ── styles ────────────────────────────────────────────────────────────────────
const s = {
  page: { maxWidth:820, margin:"0 auto", padding:"28px 20px", fontFamily:"'Inter',system-ui,sans-serif", color:"#111827", lineHeight:1.65 },
  breadcrumb: { display:"flex", gap:6, alignItems:"center", fontSize:12, color:"#6B7280", marginBottom:20 },
  sep: { color:"#D1D5DB" },
  tags: { display:"flex", gap:8, marginBottom:12, flexWrap:"wrap" },
  tag: { fontSize:11, padding:"3px 10px", borderRadius:20, background:"#F3F4F6", color:"#374151", border:"1px solid #E5E7EB" },
  h1: { fontSize:"clamp(22px,4vw,32px)", fontWeight:700, lineHeight:1.2, margin:"0 0 14px" },
  h2: { fontSize:19, fontWeight:600, margin:"0 0 14px", color:"#111827", borderBottom:"2px solid #F3F4F6", paddingBottom:8 },
  lead: { fontSize:15, color:"#374151", margin:"0 0 20px", lineHeight:1.7 },
  colabBtn: { display:"inline-flex", alignItems:"center", gap:8, padding:"9px 18px", background:"#F97316", color:"#fff", borderRadius:8, textDecoration:"none", fontWeight:600, fontSize:13, marginBottom:36 },
  section: { marginBottom:44 },
  p: { fontSize:14, color:"#374151", margin:"0 0 14px", lineHeight:1.7 },
  ul: { paddingLeft:22, margin:"0 0 14px", fontSize:14, color:"#374151", lineHeight:1.9 },
  // formula
  formulaBox: { background:"#FFF7ED", border:"2px solid #F97316", borderRadius:12, padding:"20px 24px", marginBottom:24 },
  formulaTitle: { fontWeight:700, fontSize:15, color:"#C2410C", marginBottom:14 },
  formula: { display:"flex", justifyContent:"center", marginBottom:16 },
  formulaFrac: { display:"inline-flex", flexDirection:"column", alignItems:"center", fontSize:18, fontFamily:"Georgia,serif" },
  formulaNum: { padding:"0 20px 6px", color:"#7C3AED", fontWeight:700 },
  formulaBar: { width:"100%", height:2, background:"#374151", marginBottom:6 },
  formulaDen: { padding:"6px 20px 0", color:"#F97316", fontWeight:700 },
  formulaRange: { textAlign:"center", fontSize:13, color:"#6B7280", marginBottom:14 },
  formulaGrid: { display:"flex", flexDirection:"column", gap:6 },
  rangeRow: { display:"flex", alignItems:"center", gap:12, padding:"8px 14px", borderRadius:8 },
  rangeVal: { fontFamily:"monospace", fontSize:13, fontWeight:700, minWidth:110 },
  rangeLabel: { fontSize:13, color:"#374151" },
  // bands
  bandBox: { background:"#F9FAFB", border:"1px solid #E5E7EB", borderRadius:10, padding:"16px 20px", marginBottom:24 },
  bandTitle: { fontWeight:600, fontSize:14, marginBottom:14, color:"#111827" },
  bandGrid: { display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:8 },
  bandCard: { borderRadius:8, padding:"10px 6px", textAlign:"center", background:"#fff" },
  bandName: { fontSize:12, fontWeight:600, color:"#111", marginBottom:2 },
  bandS2: { fontSize:11, color:"#6B7280", marginBottom:2 },
  bandWl: { fontSize:10, color:"#9CA3AF", marginBottom:4 },
  bandRole: { fontSize:10, fontWeight:600 },
  // severity
  severityBox: { background:"#F9FAFB", border:"1px solid #E5E7EB", borderRadius:10, padding:"16px 20px", marginBottom:24 },
  severityRow: { display:"flex", alignItems:"center", gap:12, padding:"7px 12px", borderRadius:7, marginBottom:4 },
  severityDot: { width:12, height:12, borderRadius:"50%", flexShrink:0 },
  severityLabel: { fontSize:13, fontWeight:500, minWidth:140 },
  severityDnbr: { fontSize:12, color:"#6B7280", fontFamily:"monospace" },
  // stepper
  stepperBox: { border:"1px solid #E5E7EB", borderRadius:12, overflow:"hidden", marginBottom:24 },
  stepperNav: { display:"flex", flexWrap:"wrap", background:"#F9FAFB", borderBottom:"1px solid #E5E7EB" },
  stepperBtn: { flex:"1 1 auto", padding:"10px 8px", border:"none", background:"transparent", fontSize:12, color:"#374151", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3, borderRight:"1px solid #E5E7EB" },
  stepperBtnActive: { background:"#FFF7ED", color:"#C2410C", fontWeight:600 },
  stepperIcon: { fontSize:18 },
  stepperContent: { padding:"20px 24px" },
  stepperNum: { fontSize:11, color:"#F97316", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:6 },
  stepperTitle: { fontSize:16, fontWeight:600, color:"#111827", marginBottom:10 },
  stepperControls: { display:"flex", gap:10, marginTop:16 },
  stepperArrow: { padding:"6px 14px", borderRadius:7, border:"1.5px solid #E5E7EB", background:"#fff", fontSize:13, cursor:"pointer", color:"#374151" },
  // three col
  threeCol: { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:24 },
  threeCard: { background:"#FFF7ED", border:"1px solid #FED7AA", borderRadius:10, padding:"14px 16px" },
  threeIcon: { fontSize:22, marginBottom:6 },
  threeTitle: { fontWeight:600, fontSize:13, color:"#C2410C", marginBottom:4 },
  threeDesc: { fontSize:12, color:"#374151", lineHeight:1.55 },
  // code
  tabRow: { display:"flex", gap:8, marginBottom:16 },
  tabBtn: { padding:"7px 18px", borderRadius:8, border:"1.5px solid #E5E7EB", background:"#F9FAFB", fontSize:13, cursor:"pointer", fontWeight:500, color:"#374151" },
  tabBtnActive: { background:"#1E293B", color:"#fff", borderColor:"#1E293B" },
  codeWrap: { background:"#1E293B", borderRadius:10, overflow:"hidden", marginBottom:20 },
  codeHeader: { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"7px 14px", background:"#0F172A" },
  codeLang: { fontSize:11, color:"#94A3B8", fontFamily:"monospace", textTransform:"uppercase", letterSpacing:"0.05em" },
  copyBtn: { fontSize:11, padding:"3px 10px", background:"#334155", color:"#CBD5E1", border:"none", borderRadius:5, cursor:"pointer" },
  pre: { margin:0, padding:"16px 20px", overflowX:"auto", fontSize:12, lineHeight:1.7, color:"#E2E8F0", fontFamily:"'Fira Code',monospace" },
  // callout
  callout: { padding:"12px 16px", borderRadius:8, margin:"0 0 20px", fontSize:13, lineHeight:1.65 },
  // data sources
  dataGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:12 },
  dataCard: { display:"block", padding:"14px", background:"#F9FAFB", border:"1.5px solid #E5E7EB", borderRadius:10, textDecoration:"none" },
  dataIcon: { fontSize:20, marginBottom:6 },
  dataName: { fontWeight:600, fontSize:13, color:"#111827", marginBottom:4 },
  dataDesc: { fontSize:12, color:"#6B7280", lineHeight:1.5 },
  // limitations
  limitGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:12 },
  limitCard: { background:"#FFFBEB", border:"1px solid #FDE68A", borderRadius:10, padding:"14px 16px" },
  limitTitle: { fontWeight:600, fontSize:13, color:"#B45309", marginBottom:6 },
  limitDesc: { fontSize:12, color:"#374151", lineHeight:1.55 },
  // quiz
  quizCard: { background:"#F9FAFB", border:"1.5px solid #E5E7EB", borderRadius:10, padding:"18px", marginBottom:14 },
  quizQ: { fontSize:13, fontWeight:500, marginBottom:10, color:"#111" },
  quizOpt: { width:"100%", textAlign:"left", padding:"9px 13px", borderRadius:7, fontSize:12, transition:"all 0.15s" },
  revealBtn: { marginTop:10, padding:"6px 14px", background:"#F97316", color:"#fff", border:"none", borderRadius:6, fontSize:12, cursor:"pointer", fontWeight:500 },
  explanation: { marginTop:10, padding:"9px 13px", background:"#F0FDF4", border:"1px solid #86EFAC", borderRadius:7, fontSize:12, color:"#166534", lineHeight:1.6 },
  // next
  nextGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:12 },
  nextCard: { display:"block", padding:"14px", background:"#F9FAFB", border:"1.5px solid #E5E7EB", borderRadius:10, textDecoration:"none" },
  nextTitle: { fontWeight:600, fontSize:13, color:"#111827", marginBottom:4 },
  nextDesc: { fontSize:12, color:"#6B7280", lineHeight:1.5, marginBottom:8 },
};