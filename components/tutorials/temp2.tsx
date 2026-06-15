// @ts-nocheck
import { useState } from "react";

// ── helpers ───────────────────────────────────────────────────────────────────
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
  };
  const c = map[type];
  return (
    <div style={{ ...s.callout, background: c.bg, borderLeft: `4px solid ${c.border}` }}>
      <span style={{ marginRight: 8 }}>{c.icon}</span>{children}
    </div>
  );
}

// ── SAR backscatter explainer ─────────────────────────────────────────────────
function SARExplainer() {
  const surfaces = [
    { name: "Open water", db: "< −20 dB", color: "#1D4ED8", bar: 8,  desc: "Smooth surface — signal bounces away from sensor. Very dark in SAR image." },
    { name: "Flooded veg.", db: "−18 to −14 dB", color: "#0369A1", bar: 22, desc: "Double-bounce between water and stems brightens signal slightly." },
    { name: "Bare soil", db: "−15 to −10 dB", color: "#92400E", bar: 38, desc: "Moderate roughness, medium backscatter." },
    { name: "Urban", db: "−5 to +5 dB",  color: "#374151", bar: 68, desc: "Strong double-bounce from buildings — very bright in SAR." },
    { name: "Dense forest", db: "−10 to −6 dB", color: "#166534", bar: 52, desc: "Volume scattering from canopy — medium-high return." },
  ];
  return (
    <div style={s.sarBox}>
      <div style={s.sarTitle}>SAR backscatter by surface type (Sentinel-1 VV, C-band)</div>
      <div style={s.sarSubtitle}>Lower backscatter = darker pixel = more likely water</div>
      {surfaces.map((sur, i) => (
        <div key={i} style={s.sarRow}>
          <div style={s.sarLabel}>{sur.name}</div>
          <div style={s.sarBarTrack}>
            <div style={{ ...s.sarBarFill, width: `${sur.bar}%`, background: sur.color }} />
          </div>
          <div style={{ ...s.sarDb, color: sur.color }}>{sur.db}</div>
        </div>
      ))}
      <div style={s.sarNote}>⚠️ Threshold −17 dB used in this tutorial captures open water while excluding most dry surfaces</div>
    </div>
  );
}

// ── workflow stepper ──────────────────────────────────────────────────────────
function WorkflowStepper() {
  const [active, setActive] = useState(0);
  const steps = [
    { icon: "🛰️", title: "Acquire Sentinel-1 SAR", desc: "Download a Sentinel-1 GRD (Ground Range Detected) product in IW (Interferometric Wide) swath mode for your area of interest. Use a post-flood image — ideally within 24–72 hours of the peak event. Download free from Copernicus Open Access Hub (scihub.copernicus.eu) or via Google Earth Engine.", code: `# GEE Python API — load Sentinel-1 over an area
import ee
ee.Initialize()

aoi = ee.Geometry.Rectangle([11.0, 44.0, 13.0, 46.0])  # N Italy example
s1 = (ee.ImageCollection("COPERNICUS/S1_GRD")
        .filter(ee.Filter.eq("instrumentMode", "IW"))
        .filter(ee.Filter.listContains("transmitterReceiverPolarisation", "VV"))
        .filterBounds(aoi)
        .filterDate("2023-05-15", "2023-05-20")  # post-flood date
        .first()
        .select("VV"))
print(s1.getInfo())` },
    { icon: "🔧", title: "Preprocess SAR", desc: "Sentinel-1 GRD data needs calibration and speckle filtering before analysis. In Python, use the SNAP engine via snappy or download pre-processed data from GEE (already in dB). Speckle is random noise inherent to SAR — filtering smooths it without losing the flood signal.", code: `import numpy as np
import rasterio
from scipy.ndimage import uniform_filter

def apply_lee_filter(image, size=7):
    """Simple Lee speckle filter"""
    img_mean = uniform_filter(image.astype(float), size)
    img_sq_mean = uniform_filter(image.astype(float)**2, size)
    variance = img_sq_mean - img_mean**2
    overall_var = np.var(image)
    weight = variance / (variance + overall_var + 1e-10)
    return img_mean + weight * (image - img_mean)

with rasterio.open("s1_vv_raw.tif") as src:
    sar_raw = src.read(1).astype(float)
    profile = src.profile

sar_filtered = apply_lee_filter(sar_raw, size=7)
print(f"SAR range after filtering: {sar_filtered.min():.1f} – {sar_filtered.max():.1f} dB")` },
    { icon: "💧", title: "Detect water", desc: "Open water returns very low SAR backscatter (< −17 dB for Sentinel-1 VV). Apply a threshold to create a binary water mask. The threshold should be tuned based on your specific scene — use a histogram to inspect the distribution first.", code: `import matplotlib.pyplot as plt

# Inspect the SAR histogram to choose threshold
fig, ax = plt.subplots(figsize=(10, 4))
ax.hist(sar_filtered.flatten(), bins=200, color="#374151", alpha=0.7)
ax.axvline(-17, color="#EF4444", linewidth=2, label="Threshold: −17 dB")
ax.set_xlabel("Backscatter (dB)")
ax.set_ylabel("Pixel count")
ax.set_title("Sentinel-1 VV Backscatter Distribution")
ax.legend(); plt.tight_layout(); plt.show()

# Apply threshold
THRESHOLD_DB = -17.0
water_mask = sar_filtered < THRESHOLD_DB
water_pixels = water_mask.sum()
print(f"Water pixels detected: {water_pixels:,} ({water_pixels/water_mask.size*100:.1f}%)")` },
    { icon: "🏔️", title: "Load DEM + slope mask", desc: "Floodwater follows gravity — it cannot exist on steep slopes. Load a DEM (SRTM 30m works well) and derive slope. Mask out pixels on slopes > 5° and at elevations above the plausible flood level. This removes false positives from radar shadow and smooth non-water surfaces.", code: `from rasterio.warp import reproject, Resampling
from scipy.ndimage import generic_gradient_magnitude, gaussian_gradient_magnitude

with rasterio.open("srtm_30m.tif") as dem_src:
    dem = dem_src.read(1).astype(float)
    dem_profile = dem_src.profile
    pixel_size = abs(dem_src.transform[0])  # degrees

# Convert DEM to metres for slope calculation
# Approximate: 1 degree lat ≈ 111,000 m
pixel_m = pixel_size * 111000

# Slope in degrees
dz_dy, dz_dx = np.gradient(dem, pixel_m, pixel_m)
slope_deg = np.degrees(np.arctan(np.sqrt(dz_dx**2 + dz_dy**2)))

# Masks
flat_mask = slope_deg < 5.0           # < 5° slope
low_mask  = dem < np.percentile(dem[dem > 0], 10)  # lowest 10% of elevation

print(f"Flat pixels (<5°): {flat_mask.sum():,}")
print(f"Low elevation pixels: {low_mask.sum():,}")` },
    { icon: "🗺️", title: "Combine + export", desc: "Combine SAR water detection with terrain constraints. Calculate flood area, visualise the result as a 3-panel map, and export as a GeoTIFF for further use in QGIS, ArcGIS, or a web map.", code: `# Final flood mask: water + flat + low elevation
flood_mask = water_mask & flat_mask & low_mask

# Area calculation (30m pixels)
pixel_area_km2 = (30 * 30) / 1e6
flood_area_km2 = flood_mask.sum() * pixel_area_km2
print(f"Estimated flood extent: {flood_area_km2:.1f} km²")

# Visualise
fig, axes = plt.subplots(1, 3, figsize=(16, 5))

axes[0].imshow(sar_filtered, cmap="gray", vmin=-25, vmax=5)
axes[0].set_title("SAR Backscatter (VV, dB)", fontweight="bold")
axes[0].axis("off")

axes[1].imshow(dem, cmap="terrain")
axes[1].set_title("DEM — Elevation (m)", fontweight="bold")
axes[1].axis("off")

cmap_flood = plt.cm.colors.ListedColormap(["#F0F9FF", "#1D4ED8"])
axes[2].imshow(flood_mask.astype(int), cmap=cmap_flood, vmin=0, vmax=1)
axes[2].set_title(f"Flood Extent — {flood_area_km2:.1f} km²", fontweight="bold")
axes[2].axis("off")

plt.suptitle("SAR + DEM Flood Mapping — Sentinel-1 + SRTM", fontsize=13, fontweight="bold")
plt.tight_layout()
plt.savefig("flood_map_panel.png", dpi=150, bbox_inches="tight")
plt.show()

# Export GeoTIFF
out_profile = profile.copy()
out_profile.update(dtype=rasterio.uint8, count=1, nodata=255)
with rasterio.open("flood_extent.tif", "w", **out_profile) as dst:
    dst.write(flood_mask.astype(np.uint8), 1)
print("Saved: flood_extent.tif")` },
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

// ── threshold explorer ────────────────────────────────────────────────────────
function ThresholdExplorer() {
  const [threshold, setThreshold] = useState(-17);
  const surfaces = [
    { name: "Open water", min: -25, max: -20, color: "#1D4ED8" },
    { name: "Flooded veg.", min: -20, max: -14, color: "#0369A1" },
    { name: "Bare soil", min: -15, max: -10, color: "#92400E" },
    { name: "Grassland", min: -12, max: -7, color: "#65A30D" },
    { name: "Urban", min: -5, max: 5, color: "#374151" },
  ];
  const scale = (v) => ((v + 25) / 30) * 100;
  const detected = surfaces.filter(s => s.min < threshold);
  return (
    <div style={s.threshBox}>
      <div style={s.threshTitle}>Interactive threshold explorer</div>
      <div style={s.threshSub}>Drag the slider to see how the dB threshold affects what gets classified as water</div>
      <div style={{ margin: "16px 0" }}>
        <input type="range" min={-25} max={-5} step={0.5} value={threshold}
          onChange={e => setThreshold(Number(e.target.value))}
          style={{ width: "100%", accentColor: "#1D4ED8" }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#6B7280", marginTop: 4 }}>
          <span>−25 dB (very dark)</span>
          <span style={{ fontWeight: 700, color: "#1D4ED8", fontSize: 14 }}>Threshold: {threshold} dB</span>
          <span>−5 dB (brighter)</span>
        </div>
      </div>
      <div style={{ position: "relative", height: 80, background: "#F9FAFB", borderRadius: 8, border: "1px solid #E5E7EB", marginBottom: 12, overflow: "hidden" }}>
        {surfaces.map((sur, i) => (
          <div key={i} style={{
            position: "absolute", top: 10, height: 26,
            left: `${scale(sur.min)}%`,
            width: `${scale(sur.max) - scale(sur.min)}%`,
            background: sur.color, borderRadius: 4, opacity: 0.85,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 9, color: "#fff", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", padding: "0 4px" }}>{sur.name}</span>
          </div>
        ))}
        <div style={{
          position: "absolute", top: 0, bottom: 0, left: `${scale(threshold)}%`,
          width: 2, background: "#EF4444",
        }} />
        <div style={{ position: "absolute", top: 44, left: 0, right: 0, height: 26,
          background: "linear-gradient(to right, #BFDBFE 0%, #BFDBFE " + scale(threshold) + "%, #F3F4F6 " + scale(threshold) + "%)",
          display: "flex", alignItems: "center", paddingLeft: 8, fontSize: 11, color: "#1D4ED8", fontWeight: 600 }}>
          ← Classified as water
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {surfaces.map((sur, i) => {
          const caught = sur.min < threshold;
          return (
            <div key={i} style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 500,
              background: caught ? sur.color : "#F3F4F6", color: caught ? "#fff" : "#6B7280",
              border: `1.5px solid ${caught ? sur.color : "#E5E7EB"}` }}>
              {caught ? "✓" : "○"} {sur.name}
            </div>
          );
        })}
      </div>
      {threshold > -14 && (
        <div style={{ marginTop: 10, padding: "8px 12px", background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 7, fontSize: 12, color: "#991B1B" }}>
          ⚠️ Threshold too high — detecting non-water surfaces. Add DEM slope masking to reduce false positives.
        </div>
      )}
      {threshold < -22 && (
        <div style={{ marginTop: 10, padding: "8px 12px", background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 7, fontSize: 12, color: "#B45309" }}>
          ⚠️ Threshold too low — missing flooded vegetation. Consider raising slightly or using a separate flooded-veg class.
        </div>
      )}
    </div>
  );
}

// ── data sources ──────────────────────────────────────────────────────────────
function DataSources() {
  const sources = [
    { icon: "🛰️", name: "Copernicus Open Access Hub", url: "https://scihub.copernicus.eu", desc: "Free Sentinel-1 GRD products. Search by area, date, and polarisation (VV+VH). Registration required.", tag: "SAR data" },
    { icon: "🌍", name: "Google Earth Engine", url: "https://code.earthengine.google.com", desc: "Python API: COPERNICUS/S1_GRD already pre-processed in dB. Fastest way to get analysis-ready Sentinel-1.", tag: "SAR + DEM" },
    { icon: "🏔️", name: "USGS EarthExplorer", url: "https://earthexplorer.usgs.gov", desc: "SRTM 30m DEM — free global elevation model. Also Copernicus GLO-30 (1 arcsec = ~30m globally).", tag: "DEM" },
    { icon: "🔥", name: "Copernicus EMS", url: "https://emergency.copernicus.eu/mapping", desc: "Free reference flood maps for real events. Use for validation — compare your output against their official product.", tag: "Validation" },
    { icon: "🌊", name: "Global Flood Database (GFD)", url: "https://global-flood-database.cloudtostreet.ai", desc: "Historical Landsat-derived flood maps for 913 events (2000–2018). Excellent for training ML models.", tag: "Reference" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {sources.map((d, i) => (
        <a key={i} href={d.url} target="_blank" rel="noopener noreferrer" style={s.dataRow}>
          <span style={{ fontSize: 22, flexShrink: 0 }}>{d.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
              <span style={s.dataName}>{d.name}</span>
              <span style={s.dataTag}>{d.tag}</span>
            </div>
            <div style={s.dataDesc}>{d.desc}</div>
          </div>
        </a>
      ))}
    </div>
  );
}

// ── extensions roadmap ────────────────────────────────────────────────────────
function ExtensionsRoadmap() {
  const levels = [
    { level: "Level 1", title: "This tutorial", items: ["Single-date SAR threshold", "DEM elevation + slope masking", "Binary flood map"], color: "#059669", bg: "#F0FDF4" },
    { level: "Level 2", title: "Change detection", items: ["Pre- vs post-flood SAR comparison", "Otsu automatic thresholding", "Multi-temporal flood frequency"], color: "#2563EB", bg: "#EFF6FF" },
    { level: "Level 3", title: "Terrain hydrology", items: ["Flow accumulation from DEM", "Catchment delineation", "Slope + curvature masking"], color: "#7C3AED", bg: "#F5F3FF" },
    { level: "Level 4", title: "Machine learning", items: ["Random Forest on SAR + DEM + NDWI", "U-Net semantic segmentation", "Training with GFD reference maps"], color: "#D97706", bg: "#FFFBEB" },
    { level: "Level 5", title: "Hydrodynamic modelling", items: ["HEC-RAS 2D integration", "LISFLOOD-FP inundation modelling", "Return period flood mapping"], color: "#DC2626", bg: "#FEF2F2" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {levels.map((l, i) => (
        <div key={i} style={{ ...s.roadmapRow, background: l.bg, borderColor: l.color + "40" }}>
          <div style={{ ...s.roadmapLevel, color: l.color }}>{l.level}</div>
          <div style={{ flex: 1 }}>
            <div style={s.roadmapTitle}>{l.title}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
              {l.items.map((item, j) => (
                <span key={j} style={{ ...s.roadmapTag, color: l.color, borderColor: l.color + "40" }}>{item}</span>
              ))}
            </div>
          </div>
          {i === 0 && <span style={{ fontSize: 20 }}>👈 You are here</span>}
        </div>
      ))}
    </div>
  );
}

// ── quiz ──────────────────────────────────────────────────────────────────────
function Quiz() {
  const qs = [
    { q: "Why does open water appear dark in Sentinel-1 SAR images?", opts: ["Water absorbs all microwave energy", "The smooth water surface reflects the signal away from the sensor", "Water has the highest backscatter of any surface"], ans: 1, exp: "Open water is specularly smooth — it acts like a mirror and reflects the radar signal away from the sensor, returning almost no energy. This is why flooded areas appear as dark patches in SAR images." },
    { q: "Why do we combine SAR water detection with a DEM slope mask?", opts: ["DEM data is always higher resolution than SAR", "Steep slopes produce similar low backscatter as water, creating false positives", "The DEM replaces the need for SAR data"], ans: 1, exp: "Radar shadow on steep slopes and smooth non-water surfaces can produce low backscatter similar to water. Masking pixels on slopes >5° removes these false positives and improves flood map accuracy." },
    { q: "What is the main limitation of a single threshold approach (e.g. SAR < −17 dB)?", opts: ["It requires expensive software", "The optimal threshold varies by scene — sensors, season, and surface conditions all affect backscatter", "You can only apply it to Landsat data"], ans: 1, exp: "A fixed threshold of −17 dB works for many scenes but isn't universal. Soil moisture, wind roughness on water, and SAR incidence angle all shift the backscatter distribution. Always inspect the histogram before choosing a threshold." },
    { q: "Which data combination gives the most robust flood map from this tutorial?", opts: ["SAR water mask only", "DEM elevation only", "SAR water mask AND DEM slope + elevation constraints"], ans: 2, exp: "Combining both data sources exploits their complementary strengths: SAR detects current water presence (even under clouds), while DEM removes topographically implausible false positives. Together they produce a more accurate and defensible flood map." },
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
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
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

// ── complete code ─────────────────────────────────────────────────────────────
const FULL_PYTHON = `import numpy as np
import rasterio
import rasterio.plot
import matplotlib.pyplot as plt
import matplotlib.colors as mcolors
from scipy.ndimage import uniform_filter

# ── 1. Load data ──────────────────────────────────────────────────────────────
def load_raster(path):
    with rasterio.open(path) as src:
        return src.read(1).astype(float), src.profile, src.transform

sar, sar_profile, sar_transform = load_raster("sentinel1_vv_db.tif")
dem, dem_profile, _             = load_raster("srtm_30m.tif")

print(f"SAR shape: {sar.shape}, range: {sar.min():.1f} – {sar.max():.1f} dB")
print(f"DEM shape: {dem.shape}, range: {dem.min():.0f} – {dem.max():.0f} m")

# ── 2. Speckle filter (Lee filter) ────────────────────────────────────────────
def lee_filter(img, size=7):
    img_mean    = uniform_filter(img, size)
    img_sq_mean = uniform_filter(img**2, size)
    variance    = img_sq_mean - img_mean**2
    weight      = variance / (variance + np.var(img) + 1e-10)
    return img_mean + weight * (img - img_mean)

sar_filtered = lee_filter(sar, size=7)

# ── 3. Histogram inspection ───────────────────────────────────────────────────
fig, ax = plt.subplots(figsize=(10, 4))
ax.hist(sar_filtered.flatten(), bins=300, color="#374151", alpha=0.7, label="VV backscatter")
ax.axvline(-17, color="#EF4444", lw=2, label="Threshold: −17 dB")
ax.set_xlabel("Backscatter (dB)"); ax.set_ylabel("Pixel count")
ax.set_title("Sentinel-1 VV Backscatter — choose threshold at valley between water and land peaks")
ax.legend(); plt.tight_layout(); plt.show()

# ── 4. Water mask from SAR ────────────────────────────────────────────────────
THRESHOLD_DB = -17.0
water_sar = sar_filtered < THRESHOLD_DB

# ── 5. DEM-derived terrain masks ──────────────────────────────────────────────
pixel_size_m = abs(sar_profile["transform"][0]) * 111000  # approx degrees→metres
dz_dy, dz_dx = np.gradient(dem, pixel_size_m, pixel_size_m)
slope_deg    = np.degrees(np.arctan(np.sqrt(dz_dx**2 + dz_dy**2)))

# Only keep pixels on flat terrain and low elevation
flat_mask      = slope_deg < 5.0
elev_threshold = np.percentile(dem[dem > 0], 15)   # lowest 15% of valid elevations
low_mask       = dem < elev_threshold

print(f"Elevation threshold: {elev_threshold:.0f} m")
print(f"Flat pixels (<5°):   {flat_mask.sum():,}")
print(f"Low-elev pixels:     {low_mask.sum():,}")

# ── 6. Combined flood mask ────────────────────────────────────────────────────
flood_mask = water_sar & flat_mask & low_mask

# Clean up small isolated pixels (morphological opening)
from scipy.ndimage import binary_opening, binary_closing
flood_clean = binary_closing(binary_opening(flood_mask, iterations=2), iterations=2)

pixel_area_km2 = (30 * 30) / 1e6
flood_area_km2 = flood_clean.sum() * pixel_area_km2
print(f"\\nEstimated flood extent: {flood_area_km2:.1f} km²")

# ── 7. Visualise ──────────────────────────────────────────────────────────────
fig, axes = plt.subplots(2, 2, figsize=(14, 11))

# SAR backscatter
axes[0,0].imshow(sar_filtered, cmap="gray", vmin=-25, vmax=0)
axes[0,0].set_title("Sentinel-1 VV Backscatter", fontweight="bold"); axes[0,0].axis("off")

# DEM
im_dem = axes[0,1].imshow(dem, cmap="terrain")
axes[0,1].set_title("SRTM 30m — Elevation (m)", fontweight="bold"); axes[0,1].axis("off")
plt.colorbar(im_dem, ax=axes[0,1], fraction=0.046, pad=0.04)

# Slope
im_slope = axes[1,0].imshow(slope_deg, cmap="hot_r", vmax=30)
axes[1,0].set_title("Slope (°) — masked >5°", fontweight="bold"); axes[1,0].axis("off")
plt.colorbar(im_slope, ax=axes[1,0], fraction=0.046, pad=0.04)

# Final flood map
flood_cmap = mcolors.ListedColormap(["#F0F9FF", "#1D4ED8"])
axes[1,1].imshow(flood_clean.astype(int), cmap=flood_cmap, vmin=0, vmax=1)
axes[1,1].set_title(f"Flood Extent — {flood_area_km2:.1f} km²", fontweight="bold")
axes[1,1].axis("off")

plt.suptitle("SAR + DEM Flood Mapping — Sentinel-1 + SRTM", fontsize=14, fontweight="bold")
plt.tight_layout()
plt.savefig("flood_analysis_panel.png", dpi=150, bbox_inches="tight")
plt.show()

# ── 8. Export ─────────────────────────────────────────────────────────────────
out_profile = sar_profile.copy()
out_profile.update(dtype=rasterio.uint8, count=1, nodata=255)

with rasterio.open("flood_extent.tif", "w", **out_profile) as dst:
    dst.write(flood_clean.astype(np.uint8), 1)

print("Saved: flood_extent.tif")`;

const FULL_R = `library(terra)
library(tidyverse)

# ── 1. Load data ──────────────────────────────────────────────────────────────
sar <- rast("sentinel1_vv_db.tif")
dem <- rast("srtm_30m.tif")

cat("SAR range:", minmax(sar), "dB\\n")
cat("DEM range:", minmax(dem), "m\\n")

# ── 2. Speckle filter (focal mean) ───────────────────────────────────────────
sar_filtered <- focal(sar, w = matrix(1/49, 7, 7))  # 7×7 mean filter

# ── 3. Water mask ─────────────────────────────────────────────────────────────
THRESHOLD <- -17.0
water_sar  <- sar_filtered < THRESHOLD

# ── 4. Terrain masks ──────────────────────────────────────────────────────────
slope_deg <- terrain(dem, v = "slope", unit = "degrees")
flat_mask  <- slope_deg < 5.0

elev_thresh <- quantile(values(dem), 0.15, na.rm = TRUE)
low_mask    <- dem < elev_thresh
cat("Elevation threshold:", round(elev_thresh, 0), "m\\n")

# ── 5. Combine + clean ────────────────────────────────────────────────────────
flood_raw   <- water_sar & flat_mask & low_mask

# Morphological cleaning
flood_clean <- focal(flood_raw, w = matrix(1, 3, 3),
                     fun = function(x) as.integer(sum(x, na.rm=TRUE) >= 5))

# Area
pixel_area  <- (30 * 30) / 1e6  # km² per pixel
flood_km2   <- sum(values(flood_clean) == 1, na.rm = TRUE) * pixel_area
cat("Flood extent:", round(flood_km2, 1), "km²\\n")

# ── 6. Visualise ──────────────────────────────────────────────────────────────
par(mfrow = c(2, 2), mar = c(2, 2, 3, 1))
plot(sar_filtered, main = "SAR Backscatter (dB)", col = gray.colors(256))
plot(dem,          main = "DEM — Elevation (m)",  col = terrain.colors(256))
plot(slope_deg,    main = "Slope (°)",             col = heat.colors(256))
plot(flood_clean,  main = paste("Flood Extent —", round(flood_km2,1), "km²"),
     col = c("#F0F9FF", "#1D4ED8"), legend = FALSE)

# ── 7. Export ─────────────────────────────────────────────────────────────────
writeRaster(flood_clean, "flood_extent.tif",
            datatype = "INT1U", overwrite = TRUE)
cat("Saved: flood_extent.tif\\n")`;

// ── main ──────────────────────────────────────────────────────────────────────
export default function FloodRisk() {
  const [tab, setTab] = useState("steps");
  const [codeTab, setCodeTab] = useState("python");

  return (
    <div style={s.page}>
      <div style={s.breadcrumb}>
        <span>GIS Applications</span><span style={s.sep}>›</span>
        <span>Flood Modeling</span><span style={s.sep}>›</span>
        <span style={{color:"#111"}}>Raster Analysis for Flood Risk</span>
      </div>
      <div style={s.tags}>
        {["Intermediate","~35 min","Python + R","Sentinel-1","SRTM"].map(t => (
          <span key={t} style={s.tag}>{t}</span>
        ))}
      </div>
      <h1 style={s.h1}>Raster Analysis for Flood Risk Mapping</h1>
      <p style={s.lead}>
        Flood mapping is a spatial problem that combines radar remote sensing with terrain
        analysis. In this tutorial you'll build a complete, reproducible flood detection
        workflow using freely available Sentinel-1 SAR imagery and a SRTM DEM — from raw
        data to a classified flood extent GeoTIFF — with no hydrodynamic model required.
      </p>
      <a href="https://colab.research.google.com/github/jhonnatan2178/rcafe/blob/main/notebooks/flood-risk-sar-dem.ipynb"
        target="_blank" rel="noopener noreferrer" style={s.colabBtn}>
        🚀 Open in Google Colab
      </a>

      {/* What you'll build */}
      <div style={s.section}>
        <h2 style={s.h2}>What you'll build</h2>
        <ul style={s.ul}>
          <li>Load and speckle-filter Sentinel-1 VV backscatter imagery</li>
          <li>Detect water using a backscatter threshold with histogram inspection</li>
          <li>Derive slope from a SRTM DEM and mask topographically implausible flood pixels</li>
          <li>Combine SAR + DEM masks into a cleaned flood extent raster</li>
          <li>Calculate total flooded area in km² and export a GeoTIFF</li>
        </ul>
        <Callout type="key">
          <strong>Key principle:</strong> always understand your assumptions before increasing
          model complexity. This baseline workflow is transparent, fast, and extendable.
        </Callout>
      </div>

      {/* Why SAR */}
      <div style={s.section}>
        <h2 style={s.h2}>Why SAR for flood mapping?</h2>
        <p style={s.p}>
          Optical sensors (Sentinel-2, Landsat) cannot see through clouds — exactly when
          floods happen. Synthetic Aperture Radar (SAR) solves this: it actively emits
          microwave signals and measures what bounces back, making it:
        </p>
        <div style={s.threeCol}>
          {[
            { icon:"🌙", title:"Day & night", desc:"SAR illuminates its own target — no sunlight needed." },
            { icon:"☁️", title:"Cloud-penetrating", desc:"Microwaves pass through clouds and rain. Works during the storm." },
            { icon:"💧", title:"Water-sensitive", desc:"Smooth water surfaces reflect signal away — appearing dark and distinctive." },
          ].map((c, i) => (
            <div key={i} style={s.threeCard}>
              <div style={s.threeIcon}>{c.icon}</div>
              <div style={s.threeTitle}>{c.title}</div>
              <div style={s.threeDesc}>{c.desc}</div>
            </div>
          ))}
        </div>
        <SARExplainer />
      </div>

      {/* Why DEM */}
      <div style={s.section}>
        <h2 style={s.h2}>Why combine with a DEM?</h2>
        <p style={s.p}>
          SAR alone produces false positives — smooth roads, airport runways, and radar
          shadow on steep slopes can all look like water. A DEM adds physical constraints:
          floodwater follows gravity and cannot exist on steep terrain or at high elevations.
        </p>
        <div style={s.twoCol}>
          <div style={s.demCard}>
            <div style={s.demIcon}>⛰️</div>
            <div style={s.demTitle}>Slope masking</div>
            <div style={s.demDesc}>Pixels on slopes &gt;5° are excluded. Water cannot pool on steep terrain under gravity.</div>
          </div>
          <div style={s.demCard}>
            <div style={s.demIcon}>📉</div>
            <div style={s.demTitle}>Elevation masking</div>
            <div style={s.demDesc}>Only low-lying pixels (bottom 10–15% of elevation in the scene) are considered flood-plausible.</div>
          </div>
        </div>
        <Callout type="tip">
          The combination of SAR water detection + DEM terrain constraints is the standard
          approach used by Copernicus Emergency Management Service for rapid flood mapping.
        </Callout>
      </div>

      {/* Threshold explorer */}
      <div style={s.section}>
        <h2 style={s.h2}>Choosing the right threshold</h2>
        <p style={s.p}>
          The most critical and subjective step is choosing the backscatter threshold.
          A value around −17 dB works for many Sentinel-1 scenes, but you should always
          inspect the histogram of your specific image first.
        </p>
        <ThresholdExplorer />
      </div>

      {/* Workflow stepper */}
      <div style={s.section}>
        <h2 style={s.h2}>Step-by-step workflow</h2>
        <WorkflowStepper />
      </div>

      {/* Full code */}
      <div style={s.section}>
        <h2 style={s.h2}>Complete code</h2>
        <div style={s.tabRow}>
          {["python","r"].map(t => (
            <button key={t} onClick={() => setCodeTab(t)}
              style={{ ...s.tabBtn, ...(codeTab===t ? s.tabBtnActive : {}) }}>
              {t==="python"?"🐍 Python":"📊 R"}
            </button>
          ))}
        </div>
        {codeTab==="python" && (
          <>
            <CodeBlock id="install-py" lang="bash">pip install numpy rasterio matplotlib scipy</CodeBlock>
            <CodeBlock id="full-python" lang="python">{FULL_PYTHON}</CodeBlock>
          </>
        )}
        {codeTab==="r" && (
          <>
            <CodeBlock id="install-r" lang="r">install.packages(c("terra", "tidyverse"))</CodeBlock>
            <CodeBlock id="full-r" lang="r">{FULL_R}</CodeBlock>
          </>
        )}
      </div>

      {/* Data sources */}
      <div style={s.section}>
        <h2 style={s.h2}>Data sources</h2>
        <DataSources />
      </div>

      {/* Limitations */}
      <div style={s.section}>
        <h2 style={s.h2}>Limitations of this approach</h2>
        <div style={s.limitGrid}>
          {[
            ["No hydrodynamic flow","This model detects where water is, not how it got there or where it will go. For predictive modelling, integrate HEC-RAS or LISFLOOD-FP."],
            ["Threshold sensitivity","The optimal dB threshold varies by scene, sensor mode, and surface conditions. No single value works everywhere."],
            ["Flooded vegetation","Dense canopy double-bounce can raise backscatter above the threshold, causing flooded forests to be missed."],
            ["No time evolution","A single post-event image captures one moment. Multi-temporal analysis reveals flood onset, peak, and recession."],
          ].map(([title, desc], i) => (
            <div key={i} style={s.limitCard}>
              <div style={s.limitTitle}>⚠️ {title}</div>
              <div style={s.limitDesc}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Extensions */}
      <div style={s.section}>
        <h2 style={s.h2}>How this can be extended</h2>
        <p style={s.p}>This tutorial is level 1 of a five-level flood analysis roadmap:</p>
        <ExtensionsRoadmap />
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
            ["Wildfire Burn Severity","Map fire damage using Sentinel-2 NBR and dNBR spectral indices.","/tutorial/r-wildfire-nbr"],
            ["Water Quality Monitoring","Detect coastal pollution from satellite optical data.","/tutorial/water-quality"],
            ["Land Cover Classification","Supervised ML classification on multispectral imagery.","/tutorial/land-cover-classification"],
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
  colabBtn: { display:"inline-flex", alignItems:"center", gap:8, padding:"9px 18px", background:"#1D4ED8", color:"#fff", borderRadius:8, textDecoration:"none", fontWeight:600, fontSize:13, marginBottom:36 },
  section: { marginBottom:44 },
  p: { fontSize:14, color:"#374151", margin:"0 0 14px", lineHeight:1.7 },
  ul: { paddingLeft:22, margin:"0 0 14px", fontSize:14, color:"#374151", lineHeight:1.9 },
  callout: { padding:"12px 16px", borderRadius:8, margin:"0 0 20px", fontSize:13, lineHeight:1.65 },
  threeCol: { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:24 },
  threeCard: { background:"#EFF6FF", border:"1px solid #BFDBFE", borderRadius:10, padding:"14px 16px" },
  threeIcon: { fontSize:22, marginBottom:6 },
  threeTitle: { fontWeight:600, fontSize:13, color:"#1D4ED8", marginBottom:4 },
  threeDesc: { fontSize:12, color:"#374151", lineHeight:1.55 },
  twoCol: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:20 },
  demCard: { background:"#F9FAFB", border:"1.5px solid #E5E7EB", borderRadius:10, padding:"16px" },
  demIcon: { fontSize:24, marginBottom:8 },
  demTitle: { fontWeight:600, fontSize:14, color:"#111827", marginBottom:4 },
  demDesc: { fontSize:13, color:"#374151", lineHeight:1.55 },
  sarBox: { background:"#F9FAFB", border:"1.5px solid #E5E7EB", borderRadius:12, padding:"18px 20px", marginBottom:24 },
  sarTitle: { fontWeight:600, fontSize:14, color:"#111827", marginBottom:4 },
  sarSubtitle: { fontSize:12, color:"#6B7280", marginBottom:14 },
  sarRow: { display:"flex", alignItems:"center", gap:12, marginBottom:10 },
  sarLabel: { fontSize:12, color:"#374151", minWidth:120, fontWeight:500 },
  sarBarTrack: { flex:1, height:10, background:"#E5E7EB", borderRadius:5, overflow:"hidden" },
  sarBarFill: { height:"100%", borderRadius:5, transition:"width 0.3s" },
  sarDb: { fontSize:12, fontFamily:"monospace", fontWeight:600, minWidth:90, textAlign:"right" },
  sarNote: { fontSize:12, color:"#374151", marginTop:12, padding:"8px 12px", background:"#EFF6FF", borderRadius:7, border:"1px solid #BFDBFE" },
  threshBox: { background:"#F9FAFB", border:"1.5px solid #E5E7EB", borderRadius:12, padding:"18px 20px", marginBottom:24 },
  threshTitle: { fontWeight:600, fontSize:14, color:"#111827", marginBottom:4 },
  threshSub: { fontSize:12, color:"#6B7280", marginBottom:8 },
  stepperBox: { border:"1.5px solid #E5E7EB", borderRadius:12, overflow:"hidden", marginBottom:24 },
  stepperNav: { display:"flex", flexWrap:"wrap", background:"#F9FAFB", borderBottom:"1px solid #E5E7EB", padding:8, gap:6 },
  stepperBtn: { flex:"1 1 auto", padding:"9px 8px", border:"none", background:"transparent", fontSize:11, color:"#374151", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3, borderRadius:7, minWidth:80 },
  stepperBtnActive: { background:"#1D4ED8", color:"#fff", fontWeight:600 },
  stepperContent: { padding:"20px 24px" },
  stepperNum: { fontSize:11, color:"#1D4ED8", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:6 },
  stepperTitle: { fontSize:16, fontWeight:600, color:"#111827", marginBottom:10 },
  stepperControls: { display:"flex", gap:10, marginTop:8 },
  stepperArrow: { padding:"6px 14px", borderRadius:7, border:"1.5px solid #E5E7EB", background:"#fff", fontSize:13, cursor:"pointer", color:"#374151" },
  tabRow: { display:"flex", gap:8, marginBottom:16 },
  tabBtn: { padding:"7px 18px", borderRadius:8, border:"1.5px solid #E5E7EB", background:"#F9FAFB", fontSize:13, cursor:"pointer", fontWeight:500, color:"#374151" },
  tabBtnActive: { background:"#1E293B", color:"#fff", borderColor:"#1E293B" },
  codeWrap: { background:"#1E293B", borderRadius:10, overflow:"hidden", marginBottom:16 },
  codeHeader: { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"7px 14px", background:"#0F172A" },
  codeLang: { fontSize:11, color:"#94A3B8", fontFamily:"monospace", textTransform:"uppercase", letterSpacing:"0.05em" },
  copyBtn: { fontSize:11, padding:"3px 10px", background:"#334155", color:"#CBD5E1", border:"none", borderRadius:5, cursor:"pointer" },
  pre: { margin:0, padding:"16px 20px", overflowX:"auto", fontSize:12, lineHeight:1.7, color:"#E2E8F0", fontFamily:"'Fira Code',monospace" },
  dataRow: { display:"flex", gap:14, alignItems:"flex-start", padding:"14px 16px", background:"#F9FAFB", border:"1.5px solid #E5E7EB", borderRadius:10, textDecoration:"none", marginBottom:8 },
  dataName: { fontWeight:600, fontSize:13, color:"#111827" },
  dataTag: { fontSize:11, padding:"2px 8px", borderRadius:20, background:"#EFF6FF", color:"#1D4ED8", border:"1px solid #BFDBFE", fontWeight:500 },
  dataDesc: { fontSize:12, color:"#6B7280", lineHeight:1.5, marginTop:2 },
  limitGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:12, marginBottom:16 },
  limitCard: { background:"#FFFBEB", border:"1px solid #FDE68A", borderRadius:10, padding:"14px 16px" },
  limitTitle: { fontWeight:600, fontSize:13, color:"#B45309", marginBottom:6 },
  limitDesc: { fontSize:12, color:"#374151", lineHeight:1.55 },
  roadmapRow: { display:"flex", alignItems:"flex-start", gap:16, padding:"14px 16px", border:"1.5px solid", borderRadius:10 },
  roadmapLevel: { fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.05em", minWidth:60, paddingTop:2 },
  roadmapTitle: { fontSize:14, fontWeight:600, color:"#111827" },
  roadmapTag: { fontSize:11, padding:"2px 10px", borderRadius:20, border:"1px solid", background:"#fff" },
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