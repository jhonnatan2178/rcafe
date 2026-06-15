import { Language, TutorialSection } from './types';

export const TUTORIALS: TutorialSection[] = [

  // =====================================================
  // 1️⃣ BASIC STUFF
  // =====================================================

  {
    id: 'gis-foundations',
    title: '01 - Foundations of GIS in Python & R',
    description: 'Professional setup, environments, and core spatial libraries.',
    language: Language.PYTHON,
    category: "Basic Stuff",
    level: "Beginner",
    createdAt: "2026-02-20",
    image: "/images/tutorials/foundations.jpg",
    content: `
<p>
If you're new to the world of GIS, you're probably wondering:
</p>
<div>&nbsp;</div>
<ul>
  <li style="text-align:center;">Where do I start?</li>
  <li style="text-align:center;">What tools should I learn?</li>
  <li style="text-align:center;">Which language is better?</li>
</ul>
<div>&nbsp;</div>
<p>
There are extremely powerful tools that allow high-level geographic analysis —
from satellite image processing to spatial statistics and environmental modeling.
</p>

<p>
In this portal, we focus on <strong>open-source software</strong> and the two main
programming languages that dominate modern GIS workflows:
<strong>Python</strong> and <strong>R</strong>.
</p>

<div>&nbsp;</div>
<h2><em>Why don't we just choose one?</em></h2>
<div>&nbsp;</div>

<p>
Python is arguably the most well-known programming language in the world.
Its versatility and massive ecosystem of libraries allow you to build automation
pipelines, process satellite imagery, perform spatial analysis, and even integrate
machine learning models.
</p>
<img 
  src="/images/tutorials/rvspython.jpg" 
  class="img-right" 
  style="width:300px; height:auto; float:right; margin:10px;" 
/>
<div>&nbsp;</div>
<p>
R, however, stands out for its deeply integrated statistical modeling capabilities.
It was built by statisticians, and that foundation makes it exceptionally strong
for ecological modeling, environmental analysis, and advanced data exploration.
</p>

<p>
So the choice depends on your mindset:
</p>

<ul>
  <li>
    <strong>Python</strong> — If you want automation workflows, scalable systems,
    and powerful machine learning tools — welcome to
    <strong>Team Slytherin 🐍</strong>.
  </li>
  <li>
    <strong>R</strong> — If you enjoy statistics, elegant visualizations, and
    structured analytical thinking — welcome to
    <strong>Team Geek 🤓</strong>.
  </li>
</ul>

<p>
<div>&nbsp;</div>
<strong>The good news???</strong> You don't have to choose.
<div>&nbsp;</div>
</p>

Professional GIS analysts often use both.

In this tutorial, we'll establish the professional baseline required for spatial analysis.  
A correct setup is not optional — it determines reproducibility, stability, and performance.

<h2><strong>1. Why environments matter?</strong></h2>

<p>
<div>&nbsp;</div>
Reproducibility is critical in GIS and scientific computing.
Different projects require different library versions, and installing
everything globally almost always leads to problems.
<div>&nbsp;</div>
</p>

<ul>
  <li>Version conflicts</li>
  <li>Broken dependencies</li>
  <li>Unreproducible workflows</li>
  <li>"Works on my machine" issues</li>
</ul>

<p>
<div>&nbsp;</div>
The solution is simple and professional: <strong>isolated environments.</strong>
<div>&nbsp;</div>
</p>

<h3><strong>Python environments with Conda</strong></h3>

<p>
<div>&nbsp;</div>
Conda allows you to create isolated environments with specific Python
and library versions, which is essential for geospatial work. It allows you to manage dependencies and avoid conflicts, especially with complex libraries like GDAL. In some cases, using pip can lead to installation errors due to missing system-level dependencies. Conda-forge provides precompiled binaries that prevent these issues, making it the recommended choice for geospatial libraries.
<div>&nbsp;</div>
</p>

<h4><div>&nbsp;</div>Step 1 — Install Miniconda<div>&nbsp;</div></h4>

<ul>
  <li>Go to <a href="https://docs.conda.io/en/latest/miniconda.html" target="_blank"><strong>Miniconda official site</strong></a></li>
  <li>Download the installer for your OS</li>
  <li>Install with default settings</li>
  <li>Restart your terminal</li>
  <div>&nbsp;</div>
</ul>

<h4>Step 2 — Create a GIS environment</h4>

<pre><code>

conda create -n gis python=3.11
conda activate gis
</code></pre>

<p>
Python 3.11 is modern, stable, and compatible with most geospatial libraries. Using a specific version ensures that you have a consistent environment for your GIS projects. In some cases, newer versions may have compatibility issues with certain libraries, so sticking to a well-supported version like 3.11 is a good practice.
<div>&nbsp;</div>
</p>

<h3><strong>Installing core GIS libraries (Python)</strong></h3>

<p>
For geospatial libraries, <strong>conda-forge</strong> is strongly recommended
because it provides precompiled binaries for GDAL-based packages. The following command installs the essential libraries for spatial analysis, there are other useful libraries that we will use in other tutorials but these are the core ones to start with.
</p>

<pre><code>
conda install -c conda-forge \\
  geopandas rasterio shapely \\
  matplotlib pandas numpy
</code></pre>

<section class="mt-16">

  <h2>Core GIS Libraries: Python vs R</h2>

  <p>
    Modern GIS workflows rely on a small set of well-established libraries.
    While Python and R approach spatial analysis differently, their core tools
    solve equivalent problems.
  </p>

  <!-- PYTHON -->
  <h3>Python GIS Libraries</h3>

  <ul>
    <li><strong>NumPy</strong> — Fundamental numerical library for raster and numerical computation.</li>
    <li><strong>Pandas</strong> — Tabular data handling for attributes and statistics.</li>
    <li><strong>GeoPandas</strong> — Vector spatial data analysis.</li>
    <li><strong>Shapely</strong> — Geometry operations.</li>
    <li><strong>Rasterio</strong> — Raster data processing.</li>
  </ul>

</section>

`,
    codeSnippet: `
# Create Python GIS environment
conda create -n gis python=3.11
conda activate gis

# Install core GIS libraries
conda install -c conda-forge geopandas rasterio shapely matplotlib pandas numpy

# Verify installation
python -c "import geopandas; print(geopandas.__version__)"
`
  },

  {
    id: 'vector-vs-raster',
    title: '02 - Vector vs Raster: Core Data Models',
    description: 'Understand the two dominant spatial data structures used in every GIS workflow.',
    language: Language.PYTHON,
    category: "Basic Stuff",
    level: "Beginner",
    createdAt: "2026-02-21",
    image: "/images/tutorials/vector.jpg",
    content: `
<!-- BREADCRUMB -->
<nav style="display:flex;gap:6px;align-items:center;font-size:13px;color:#6B7280;margin-bottom:24px;">
  <span>GIS Applications</span>
  <span style="color:#D1D5DB;">›</span>
  <span>Basic Stuff</span>
  <span style="color:#D1D5DB;">›</span>
  <span style="color:#111;">Vector vs Raster</span>
</nav>
 
<!-- TAGS -->
<div style="display:flex;gap:8px;margin-bottom:16px;">
  <span style="font-size:12px;padding:3px 10px;border-radius:20px;background:#F3F4F6;color:#374151;border:1px solid #E5E7EB;">Beginner</span>
  <span style="font-size:12px;padding:3px 10px;border-radius:20px;background:#F3F4F6;color:#374151;border:1px solid #E5E7EB;">~20 min</span>
  <span style="font-size:12px;padding:3px 10px;border-radius:20px;background:#F3F4F6;color:#374151;border:1px solid #E5E7EB;">Python + R</span>
</div>
 
<!-- LEAD -->
<p style="font-size:17px;color:#374151;line-height:1.7;margin-bottom:24px;">
  Every piece of geographic data lives in one of two worlds. Understanding this
  distinction is the single most important foundation in GIS — it shapes which
  tools you use, how you store data, and what analyses are even possible.
</p>
 
<!-- COLAB BUTTON -->
<a href="https://colab.research.google.com/github/jhonnatan2178/rcafe/blob/main/notebooks/vector-vs-raster.ipynb"
   target="_blank" rel="noopener noreferrer"
   style="display:inline-flex;align-items:center;gap:8px;padding:10px 20px;background:#F97316;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;margin-bottom:40px;">
  🚀 Open in Google Colab
</a>
 
<!-- WHAT YOU'LL BUILD -->
<h2>What you'll build</h2>
<p>By the end of this tutorial you will be able to:</p>
<ul>
  <li>Load and inspect both vector and raster datasets in Python and R</li>
  <li>Visualise them on a map with a single command</li>
  <li>Combine both data models using zonal statistics</li>
  <li>Confidently choose the right format for any new GIS task</li>
</ul>
 
<!-- CONCEPT -->
<h2>The two models — at a glance</h2>
 
<!-- VISUAL DIAGRAM (SVG inline) -->
<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:32px;">
 
  <!-- Vector box -->
  <div style="border:2px solid #3B82F6;border-radius:12px;padding:20px 16px;text-align:center;background:#FAFAFA;">
    <div style="font-size:16px;font-weight:700;color:#1D4ED8;margin-bottom:12px;">🔵 Vector</div>
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:200px;display:block;margin:0 auto;">
      <polygon points="30,120 80,40 140,50 160,110 100,130" fill="#BFDBFE" stroke="#3B82F6" stroke-width="2"/>
      <polyline points="20,30 60,70 110,55 170,80" fill="none" stroke="#10B981" stroke-width="2.5"/>
      <circle cx="40" cy="90" r="5" fill="#F59E0B"/>
      <circle cx="120" cy="100" r="5" fill="#F59E0B"/>
      <circle cx="155" cy="45" r="5" fill="#F59E0B"/>
      <text x="75" y="95" font-size="11" fill="#1D4ED8" text-anchor="middle">polygon</text>
      <text x="100" y="48" font-size="11" fill="#059669">line</text>
      <text x="165" y="45" font-size="11" fill="#B45309">points</text>
    </svg>
    <p style="font-size:12px;color:#6B7280;margin-top:8px;line-height:1.5;">Stores exact coordinates.<br/>Scales without losing quality.</p>
  </div>
 
  <!-- Raster box -->
  <div style="border:2px solid #F97316;border-radius:12px;padding:20px 16px;text-align:center;background:#FAFAFA;">
    <div style="font-size:16px;font-weight:700;color:#C2410C;margin-bottom:12px;">🟠 Raster</div>
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:200px;display:block;margin:0 auto;">
      <!-- row 0 -->
      <rect x="20" y="20" width="30" height="22" fill="#A3E635" stroke="#fff" stroke-width="1"/>
      <rect x="52" y="20" width="30" height="22" fill="#65A30D" stroke="#fff" stroke-width="1"/>
      <rect x="84" y="20" width="30" height="22" fill="#16A34A" stroke="#fff" stroke-width="1"/>
      <rect x="116" y="20" width="30" height="22" fill="#15803D" stroke="#fff" stroke-width="1"/>
      <rect x="148" y="20" width="30" height="22" fill="#166534" stroke="#fff" stroke-width="1"/>
      <!-- row 1 -->
      <rect x="20" y="44" width="30" height="22" fill="#BEF264" stroke="#fff" stroke-width="1"/>
      <rect x="52" y="44" width="30" height="22" fill="#A3E635" stroke="#fff" stroke-width="1"/>
      <rect x="84" y="44" width="30" height="22" fill="#4ADE80" stroke="#fff" stroke-width="1"/>
      <rect x="116" y="44" width="30" height="22" fill="#22C55E" stroke="#fff" stroke-width="1"/>
      <rect x="148" y="44" width="30" height="22" fill="#16A34A" stroke="#fff" stroke-width="1"/>
      <!-- row 2 -->
      <rect x="20" y="68" width="30" height="22" fill="#D9F99D" stroke="#fff" stroke-width="1"/>
      <rect x="52" y="68" width="30" height="22" fill="#BEF264" stroke="#fff" stroke-width="1"/>
      <rect x="84" y="68" width="30" height="22" fill="#86EFAC" stroke="#fff" stroke-width="1"/>
      <rect x="116" y="68" width="30" height="22" fill="#4ADE80" stroke="#fff" stroke-width="1"/>
      <rect x="148" y="68" width="30" height="22" fill="#22C55E" stroke="#fff" stroke-width="1"/>
      <!-- row 3 -->
      <rect x="20" y="92" width="30" height="22" fill="#ECFCCB" stroke="#fff" stroke-width="1"/>
      <rect x="52" y="92" width="30" height="22" fill="#D9F99D" stroke="#fff" stroke-width="1"/>
      <rect x="84" y="92" width="30" height="22" fill="#BBF7D0" stroke="#fff" stroke-width="1"/>
      <rect x="116" y="92" width="30" height="22" fill="#86EFAC" stroke="#fff" stroke-width="1"/>
      <rect x="148" y="92" width="30" height="22" fill="#4ADE80" stroke="#fff" stroke-width="1"/>
      <!-- row 4 -->
      <rect x="20" y="116" width="30" height="22" fill="#F7FEE7" stroke="#fff" stroke-width="1"/>
      <rect x="52" y="116" width="30" height="22" fill="#ECFCCB" stroke="#fff" stroke-width="1"/>
      <rect x="84" y="116" width="30" height="22" fill="#DCFCE7" stroke="#fff" stroke-width="1"/>
      <rect x="116" y="116" width="30" height="22" fill="#BBF7D0" stroke="#fff" stroke-width="1"/>
      <rect x="148" y="116" width="30" height="22" fill="#86EFAC" stroke="#fff" stroke-width="1"/>
      <text x="100" y="152" font-size="11" fill="#666" text-anchor="middle">each cell = one value</text>
    </svg>
    <p style="font-size:12px;color:#6B7280;margin-top:8px;line-height:1.5;">Stores values per pixel.<br/>Resolution fixed at capture time.</p>
  </div>
</div>
 
<!-- COMPARISON TABLE -->
<div style="overflow-x:auto;margin-bottom:32px;">
  <table style="width:100%;border-collapse:collapse;font-size:14px;">
    <thead>
      <tr>
        <th style="padding:12px 16px;text-align:left;background:#F9FAFB;font-weight:600;border-bottom:2px solid #E5E7EB;font-size:13px;">Aspect</th>
        <th style="padding:12px 16px;text-align:left;background:#EFF6FF;color:#1D4ED8;font-weight:600;border-bottom:2px solid #E5E7EB;font-size:13px;">🔵 Vector</th>
        <th style="padding:12px 16px;text-align:left;background:#FFF7ED;color:#C2410C;font-weight:600;border-bottom:2px solid #E5E7EB;font-size:13px;">🟠 Raster</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#FAFAFA;">
        <td style="padding:11px 16px;font-weight:500;color:#374151;border-bottom:1px solid #F3F4F6;">Data structure</td>
        <td style="padding:11px 16px;color:#1E40AF;border-bottom:1px solid #F3F4F6;">Points, lines, polygons</td>
        <td style="padding:11px 16px;color:#9A3412;border-bottom:1px solid #F3F4F6;">Grid of equally-sized cells (pixels)</td>
      </tr>
      <tr style="background:#FFFFFF;">
        <td style="padding:11px 16px;font-weight:500;color:#374151;border-bottom:1px solid #F3F4F6;">Best for</td>
        <td style="padding:11px 16px;color:#1E40AF;border-bottom:1px solid #F3F4F6;">Discrete features with clear boundaries</td>
        <td style="padding:11px 16px;color:#9A3412;border-bottom:1px solid #F3F4F6;">Continuous phenomena (temperature, elevation, imagery)</td>
      </tr>
      <tr style="background:#FAFAFA;">
        <td style="padding:11px 16px;font-weight:500;color:#374151;border-bottom:1px solid #F3F4F6;">File formats</td>
        <td style="padding:11px 16px;color:#1E40AF;border-bottom:1px solid #F3F4F6;">.shp, .gpkg, .geojson, .kml</td>
        <td style="padding:11px 16px;color:#9A3412;border-bottom:1px solid #F3F4F6;">.tif, .img, .nc, .hdf</td>
      </tr>
      <tr style="background:#FFFFFF;">
        <td style="padding:11px 16px;font-weight:500;color:#374151;border-bottom:1px solid #F3F4F6;">Python library</td>
        <td style="padding:11px 16px;color:#1E40AF;border-bottom:1px solid #F3F4F6;">geopandas</td>
        <td style="padding:11px 16px;color:#9A3412;border-bottom:1px solid #F3F4F6;">rasterio / xarray</td>
      </tr>
      <tr style="background:#FAFAFA;">
        <td style="padding:11px 16px;font-weight:500;color:#374151;border-bottom:1px solid #F3F4F6;">Resolution concept</td>
        <td style="padding:11px 16px;color:#1E40AF;border-bottom:1px solid #F3F4F6;">Coordinate precision</td>
        <td style="padding:11px 16px;color:#9A3412;border-bottom:1px solid #F3F4F6;">Pixel size (e.g. 10 m, 30 m, 1 km)</td>
      </tr>
      <tr style="background:#FFFFFF;">
        <td style="padding:11px 16px;font-weight:500;color:#374151;border-bottom:1px solid #F3F4F6;">Typical use</td>
        <td style="padding:11px 16px;color:#1E40AF;border-bottom:1px solid #F3F4F6;">Roads, buildings, river basins, admin boundaries</td>
        <td style="padding:11px 16px;color:#9A3412;border-bottom:1px solid #F3F4F6;">Satellite images, DEMs, land cover, climate data</td>
      </tr>
      <tr style="background:#FAFAFA;">
        <td style="padding:11px 16px;font-weight:500;color:#374151;border-bottom:1px solid #F3F4F6;">Storage size</td>
        <td style="padding:11px 16px;color:#1E40AF;border-bottom:1px solid #F3F4F6;">Small for simple features</td>
        <td style="padding:11px 16px;color:#9A3412;border-bottom:1px solid #F3F4F6;">Can be very large (high resolution × large area)</td>
      </tr>
      <tr style="background:#FFFFFF;">
        <td style="padding:11px 16px;font-weight:500;color:#374151;border-bottom:1px solid #F3F4F6;">Overlay analysis</td>
        <td style="padding:11px 16px;color:#1E40AF;border-bottom:1px solid #F3F4F6;">Intersect, union, buffer</td>
        <td style="padding:11px 16px;color:#9A3412;border-bottom:1px solid #F3F4F6;">Map algebra, zonal statistics</td>
      </tr>
    </tbody>
  </table>
</div>
 
<!-- TIP CALLOUT -->
<div style="padding:14px 18px;border-radius:8px;margin:0 0 32px;font-size:14px;line-height:1.65;color:#374151;background:#F0FDF4;border-left:4px solid #22C55E;">
  <span style="margin-right:8px;">💡</span>
  <strong>The mental shortcut:</strong> if the feature has a clear, precise boundary
  (a road, a building, a watershed), use <strong>vector</strong>. If the phenomenon
  varies continuously across space with no sharp edges (temperature, elevation,
  satellite reflectance), use <strong>raster</strong>.
</div>
 
<!-- CODE WALKTHROUGH -->
<h2>Code walkthrough</h2>
<p>
  We use <code>geopandas</code> for vectors, <code>rasterio</code> for rasters,
  and <code>rasterstats</code> to combine them. Install everything with:
</p>
 
<pre><code>pip install geopandas rasterio rasterstats matplotlib</code></pre>
 
<p>Full workflow — loading, inspecting, visualising, and combining both models:</p>
 
<!-- EXPECTED OUTPUTS -->
<h2>Expected outputs</h2>
<p>Running this code produces three results:</p>
<ol>
  <li><strong>vector_basins.png</strong> — a choropleth map of river basins coloured by area</li>
  <li><strong>raster_dem.png</strong> — a terrain-coloured elevation raster</li>
  <li><strong>A table</strong> printed in your console showing mean and max elevation per basin — this is zonal statistics: raster values summarised by vector zones</li>
</ol>
 
<!-- INFO CALLOUT -->
<div style="padding:14px 18px;border-radius:8px;margin:0 0 32px;font-size:14px;line-height:1.65;color:#374151;background:#EFF6FF;border-left:4px solid #3B82F6;">
  <span style="margin-right:8px;">ℹ️</span>
  Don't have the files yet? Download a free DEM from
  <a href="https://earthexplorer.usgs.gov" target="_blank" rel="noopener noreferrer" style="color:#2563EB;">USGS EarthExplorer</a>
  and river basins from
  <a href="https://www.naturalearthdata.com" target="_blank" rel="noopener noreferrer" style="color:#2563EB;">Natural Earth</a>.
  Both are free.
</div>
 
<!-- COMMON MISTAKES -->
<h2>Common mistakes to avoid</h2>
 
<div style="display:flex;flex-direction:column;gap:12px;margin-bottom:32px;">
  <div style="display:flex;gap:12px;align-items:flex-start;padding:12px 16px;background:#FFFBEB;border-radius:8px;border:1px solid #FDE68A;font-size:14px;">
    <span style="flex-shrink:0;">⚠️</span>
    <div><strong style="color:#111;">CRS mismatch:</strong> Always check that your vector and raster share the same coordinate reference system before combining them. Reproject with <code>.to_crs()</code> (Python) or <code>st_transform()</code> (R).</div>
  </div>
  <div style="display:flex;gap:12px;align-items:flex-start;padding:12px 16px;background:#FFFBEB;border-radius:8px;border:1px solid #FDE68A;font-size:14px;">
    <span style="flex-shrink:0;">⚠️</span>
    <div><strong style="color:#111;">Forgetting NoData:</strong> Raster files often contain a NoData value (e.g. -9999 or -32768) for areas with no data. Always set <code>nodata=</code> when reading, or your statistics will be wildly wrong.</div>
  </div>
  <div style="display:flex;gap:12px;align-items:flex-start;padding:12px 16px;background:#FFFBEB;border-radius:8px;border:1px solid #FDE68A;font-size:14px;">
    <span style="flex-shrink:0;">⚠️</span>
    <div><strong style="color:#111;">Wrong geometry type:</strong> A GeoDataFrame can contain mixed geometry types. Check <code>.geom_type.unique()</code> before analysis — many tools expect a single type.</div>
  </div>
  <div style="display:flex;gap:12px;align-items:flex-start;padding:12px 16px;background:#FFFBEB;border-radius:8px;border:1px solid #FDE68A;font-size:14px;">
    <span style="flex-shrink:0;">⚠️</span>
    <div><strong style="color:#111;">Resolution confusion:</strong> A 10m raster and a 30m raster of the same area contain very different amounts of detail. Always print <code>res(raster)</code> before analysis.</div>
  </div>
</div>
`,
    codeSnippet: `import geopandas as gpd
import rasterio
import rasterio.plot
import matplotlib.pyplot as plt
 
# ── 1. VECTOR: load a river basin polygon ────────────────────────────────────
basins = gpd.read_file("river_basins.shp")
 
print(f"CRS: {basins.crs}")
print(f"Geometry type: {basins.geometry.geom_type.unique()}")
print(f"Number of features: {len(basins)}")
 
basins = basins.to_crs(epsg=3857)
basins["area_km2"] = basins.geometry.area / 1e6
print(basins[["name", "area_km2"]].head())
 
basins.plot(column="area_km2", cmap="Blues", legend=True, figsize=(10, 6))
plt.title("River Basins — coloured by area (km²)")
plt.axis("off")
plt.tight_layout()
plt.savefig("vector_basins.png", dpi=150)
plt.show()
 
# ── 2. RASTER: load a DEM ────────────────────────────────────────────────────
with rasterio.open("dem_30m.tif") as src:
    dem = src.read(1)
    profile = src.profile
 
print(f"Raster shape: {dem.shape}")
print(f"Resolution: {profile['transform'][0]:.1f} m")
print(f"Elevation range: {dem.min():.0f} – {dem.max():.0f} m")
 
fig, ax = plt.subplots(figsize=(10, 6))
rasterio.plot.show(src, ax=ax, cmap="terrain", title="Digital Elevation Model (30m)")
plt.tight_layout()
plt.savefig("raster_dem.png", dpi=150)
plt.show()
 
# ── 3. COMBINING BOTH: zonal statistics ──────────────────────────────────────
from rasterstats import zonal_stats
 
with rasterio.open("dem_30m.tif") as src:
    stats = zonal_stats(
        basins.to_crs(src.crs),
        "dem_30m.tif",
        stats=["mean", "min", "max", "std"],
        nodata=src.nodata
    )
 
basins["elev_mean"] = [s["mean"] for s in stats]
basins["elev_max"]  = [s["max"]  for s in stats]
 
print(basins[["name", "area_km2", "elev_mean", "elev_max"]].head(10))`
  },

  {
    id: 'crs-explained',
    title: '03 - Coordinate Reference Systems (CRS)',
    description: 'Why projections matter and how to reproject data.',
    language: Language.PYTHON,
    category: "Basic Stuff",
    level: "Beginner",
    createdAt: "2026-02-22",
    image: "/images/tutorials/coords.jpg",
    content: `
# Coordinate Reference Systems

<p>
Coordinates are fundamental in spatial data because they define how your data
aligns with the real world. However, this raises an important question:
<strong>why do we have so many different coordinate reference systems?</strong>
</p>

<p>
The first reason is that the Earth is not a perfect sphere. Its true shape is
better described as a <em>geoid</em>. Representing this complex shape on a flat
surface is not straightforward.
</p>

<p>
To understand this, imagine the Earth as a balloon. If you try to flatten that
balloon onto a plane, you must stretch or compress parts of it. This process is
called <strong>map projection</strong>, and it inevitably introduces distortions.
</p>

<p>
Different projections are designed to minimize different types of distortion:
</p>

<ul>
  <li>Area</li>
  <li>Shape</li>
  <li>Distance</li>
  <li>Direction</li>
</ul>

<p>
This is the main reason why multiple Coordinate Reference Systems (CRS) exist.
</p>

<p>
One of the most widely used projections is the <strong>Mercator projection</strong>,
commonly used by web mapping platforms. While it preserves shapes and directions, it
significantly distorts areas near the poles.
</p>

<p>
There is no single <em>"best"</em> CRS. The appropriate choice depends on:
</p>

<ul>
  <li>Your geographic location</li>
  <li>The spatial scale of the analysis</li>
  <li>The purpose of the study</li>
</ul>

<p>
<strong>Best practice:</strong> use a local projected CRS for spatial analysis
and a global geographic CRS for visualization and data exchange.
</p>

<h3>Main Types of Coordinate Reference Systems</h3>

<ul>
  <li>
    <strong>Geographic CRS</strong> (latitude/longitude, e.g. EPSG:4326) — Unprojected,
    global systems based on angular coordinates measured in degrees. Commonly
    used for raw data and web mapping.
  </li>

  <li>
    <strong>Projected CRS</strong> (e.g. UTM zones) — Optimized for specific regions,
    based on Cartesian coordinates measured in meters. Preferred for accurate
    spatial analysis.
  </li>

  <li>
    <strong>Spherical CRS</strong> (e.g. EPSG:3857) — A compromise model widely used
    in web mapping. Preserves shapes but distorts areas.
  </li>
</ul>

<h3>Common CRS Examples</h3>

<ul>
  <li>EPSG:4326 — WGS84</li>
  <li>UTM Zones</li>
</ul>

<h3>Problems Caused by an Incorrect CRS</h3>

<ul>
  <li>Layer misalignment</li>
  <li>Incorrect distance measurements</li>
  <li>Area distortion</li>
</ul>
`,
    codeSnippet: `
import geopandas as gpd

gdf = gpd.read_file("data.shp")
gdf = gdf.to_crs("EPSG:4326")
`
  },

  {
    id: 'first-spatial-analysis',
    title: '04 - Your First Spatial Analysis in Python',
    description: 'Load, visualize, and analyze spatial data.',
    language: Language.PYTHON,
    category: "Basic Stuff",
    level: "Beginner",
    createdAt: "2026-02-23",
    image: "/images/tutorials/spatial.jpg",
    content: `
# First Spatial Analysis

Workflow:
1. Load shapefile
2. Inspect attributes
3. Plot
4. Filter by condition
`,
    codeSnippet: `
import geopandas as gpd
import matplotlib.pyplot as plt

gdf = gpd.read_file("data.shp")

filtered = gdf[gdf["population"] > 100000]

filtered.plot()
plt.show()
`
  },

  // =====================================================
  // 2️⃣ FLOOD MODELING
  // =====================================================

  {
    id: 'python-flood-risk',
    title: 'Python: Raster Analysis for Flood Risk',
    description: 'Process SAR imagery and DEMs to detect and map flood extent.',
    language: Language.PYTHON,
    category: "Flood Modeling",
    level: "Intermediate",
    createdAt: "2026-02-22",
    image: "/images/tutorials/flood.jpg",
    content: `
<p>
Flood mapping is a spatial problem that combines radar remote sensing with terrain
analysis. In this tutorial you'll build a complete, reproducible flood detection
workflow using freely available Sentinel-1 SAR imagery and a SRTM DEM — from raw
data to a classified flood extent GeoTIFF — with no hydrodynamic model required.
</p>

<hr>

<h2>Why SAR for flood mapping?</h2>

<p>
Optical sensors like Sentinel-2 and Landsat cannot see through clouds — exactly
when floods happen. Synthetic Aperture Radar (SAR) solves this: it actively emits
microwave signals and measures what bounces back, making it:
</p>

<ul>
  <li><strong>Day and night capable</strong> — SAR illuminates its own target, no sunlight needed.</li>
  <li><strong>Cloud-penetrating</strong> — Microwaves pass through clouds and rain. Works during the storm.</li>
  <li><strong>Water-sensitive</strong> — Smooth water surfaces reflect signal away from the sensor, appearing very dark and distinctive in SAR images.</li>
</ul>

<p>
Open water returns very low SAR backscatter (typically below −17 dB for Sentinel-1 VV).
Urban areas, forests, and rough soil scatter energy back much more strongly and appear brighter.
This contrast is the foundation of SAR-based flood detection.
</p>

<hr>

<h2>Why combine with a DEM?</h2>

<p>
SAR alone produces false positives. Smooth roads, airport runways, and radar shadow on
steep slopes can all produce low backscatter that looks like water. A Digital Elevation
Model (DEM) adds physical constraints: floodwater follows gravity and cannot exist on
steep terrain or at high elevations relative to the surrounding landscape.
</p>

<p>
Two terrain masks are applied:
</p>

<ul>
  <li><strong>Slope masking</strong> — pixels on slopes greater than 5° are excluded. Water cannot pool on steep terrain under gravity.</li>
  <li><strong>Elevation masking</strong> — only low-lying pixels (bottom 10–15% of elevation in the scene) are considered flood-plausible.</li>
</ul>

<p>
The combination of SAR water detection plus DEM terrain constraints is the standard approach
used by the Copernicus Emergency Management Service for rapid operational flood mapping.
</p>

<hr>

<h2>Choosing the right threshold</h2>

<p>
The most critical and subjective step is choosing the backscatter threshold. A value around
−17 dB works for many Sentinel-1 scenes, but you should always inspect the histogram of your
specific image first. The distribution typically shows two peaks: a low-backscatter peak
corresponding to water and a higher-backscatter peak corresponding to land. The optimal
threshold sits in the valley between these peaks.
</p>

<p>
If the threshold is set too high, dry surfaces begin to be misclassified as water. If it
is set too low, flooded vegetation and shallow water are missed. When in doubt, add
morphological cleaning to remove isolated noise pixels from the result.
</p>

<hr>

<h2>Workflow overview</h2>

<ol>
  <li>Acquire a Sentinel-1 GRD product in IW swath mode for your area, ideally within 24–72 hours of the peak flood event.</li>
  <li>Apply a Lee speckle filter to reduce radar noise while preserving flood boundaries.</li>
  <li>Inspect the backscatter histogram and choose a dB threshold for water detection.</li>
  <li>Load a SRTM DEM, derive slope, and create flat and low-elevation masks.</li>
  <li>Combine SAR water mask with terrain masks into a cleaned binary flood extent.</li>
  <li>Calculate flood area in km², visualise as a 3-panel map, and export a GeoTIFF.</li>
</ol>

<hr>

<h2>Limitations of this approach</h2>

<ul>
  <li><strong>No hydrodynamic flow</strong> — this model detects where water is, not how it got there or where it will go. For predictive modelling, integrate HEC-RAS or LISFLOOD-FP.</li>
  <li><strong>Threshold sensitivity</strong> — the optimal dB threshold varies by scene, sensor mode, and surface conditions. No single value works everywhere.</li>
  <li><strong>Flooded vegetation</strong> — dense canopy double-bounce can raise backscatter above the threshold, causing flooded forests to be missed.</li>
  <li><strong>No time evolution</strong> — a single post-event image captures one moment. Multi-temporal analysis reveals flood onset, peak, and recession.</li>
</ul>

<hr>

<h2>How this can be extended</h2>

<ul>
  <li><strong>Change detection</strong> — compare pre- and post-flood SAR scenes for more robust water identification.</li>
  <li><strong>Otsu automatic thresholding</strong> — remove the subjective threshold choice using histogram-based optimization.</li>
  <li><strong>Multi-temporal flood frequency</strong> — stack annual results to build a flood probability map.</li>
  <li><strong>Machine learning</strong> — train a Random Forest on SAR + DEM + NDWI features using the Global Flood Database as reference.</li>
  <li><strong>Hydrodynamic modelling</strong> — integrate HEC-RAS 2D or LISFLOOD-FP for predictive inundation mapping.</li>
</ul>

<p>
<strong>Key principle:</strong> always understand your assumptions before increasing model
complexity. This baseline workflow is transparent, fast, and extendable.
</p>
`,
    codeSnippet: `
import numpy as np
import rasterio
import matplotlib.pyplot as plt
from scipy.ndimage import uniform_filter

def load_raster(path):
    with rasterio.open(path) as src:
        return src.read(1).astype(float), src.profile, src.transform

sar, sar_profile, sar_transform = load_raster("sentinel1_vv_db.tif")
dem, dem_profile, _             = load_raster("srtm_30m.tif")

# Speckle filter (Lee filter)
def lee_filter(img, size=7):
    img_mean    = uniform_filter(img, size)
    img_sq_mean = uniform_filter(img**2, size)
    variance    = img_sq_mean - img_mean**2
    weight      = variance / (variance + np.var(img) + 1e-10)
    return img_mean + weight * (img - img_mean)

sar_filtered = lee_filter(sar, size=7)

# Water mask from SAR threshold
THRESHOLD_DB = -17.0
water_sar    = sar_filtered < THRESHOLD_DB

# Terrain masks from DEM
pixel_size_m = abs(sar_profile["transform"][0]) * 111000
dz_dy, dz_dx = np.gradient(dem, pixel_size_m, pixel_size_m)
slope_deg    = np.degrees(np.arctan(np.sqrt(dz_dx**2 + dz_dy**2)))
flat_mask    = slope_deg < 5.0
low_mask     = dem < np.percentile(dem[dem > 0], 15)

# Combined flood mask
flood_mask   = water_sar & flat_mask & low_mask
flood_area   = flood_mask.sum() * (30 * 30) / 1e6
print(f"Estimated flood extent: {flood_area:.1f} km²")

# Export
out_profile = sar_profile.copy()
out_profile.update(dtype=rasterio.uint8, count=1, nodata=255)
with rasterio.open("flood_extent.tif", "w", **out_profile) as dst:
    dst.write(flood_mask.astype(np.uint8), 1)
`
  },

  {
    id: 'cordoba-gee',
    title: 'Python: 2026 Córdoba Floods — Google Earth Engine Analysis',
    description: 'Reproduce a real flood disaster analysis using GEE, Sentinel-1 SAR, and NDVI time series.',
    language: Language.PYTHON,
    category: "Flood Modeling",
    level: "Intermediate",
    createdAt: "2026-02-25",
    image: "/images/tutorials/cordoba.jpg",
    content: `
<p>
In February 2026, the department of Córdoba, Colombia experienced one of its worst
flood disasters on record — with 80% of the territory submerged after the Sinú River
overflowed. In this tutorial you'll reproduce a full flood analysis using Google Earth
Engine and free satellite data: change detection, zonal statistics by municipality,
NDVI time series, and agricultural impact assessment.
</p>

<div style="padding:12px 16px;border-radius:8px;margin:0 0 20px;font-size:13px;line-height:1.65;background:#FFF7ED;border-left:4px solid #F97316;">
  <span style="margin-right:8px;">🇨🇴</span>
  <strong>Real event, real data:</strong> this tutorial uses the actual February 2026
  Córdoba flood. Copernicus Emergency Management Service activated rapid mapping
  (EMSR865) for this event — you can validate your results against their official
  products at emergency.copernicus.eu.
</div>

<hr>

<h2>The event — what happened</h2>

<p>
A cold front hitting Colombia's Caribbean coast on January 31, 2026 triggered
catastrophic flooding across Córdoba. In a single day, Montería received a month's
worth of rain. The Sinú River — already high from weeks of rainfall — overflowed,
inundating residential areas, destroying agricultural land, and isolating 24
municipalities. Over 156,000 people were affected, around 80% of the department
submerged, and 157,000 hectares of crops were lost.
</p>

<p>
The disaster was exacerbated by the Urrá hydroelectric dam on the Sinú River, whose
management became a point of political and scientific controversy. Some experts
attributed part of the flood severity to upstream water releases from the dam
coinciding with the peak rainfall event.
</p>

<hr>

<h2>Google Earth Engine — four concepts you need</h2>

<p>
GEE has its own data model built around four building blocks:
</p>

<ul>
  <li><strong>Image</strong> — a single raster layer with one or more bands. Example: one Sentinel-1 scene from February 1, 2026 over Córdoba.</li>
  <li><strong>ImageCollection</strong> — a stack of Images, like a folder of satellite scenes. You filter it by date, location, and properties to get the scenes you need.</li>
  <li><strong>Geometry</strong> — a vector shape (point, line, or polygon) that defines your study area, used for spatial filtering and zonal statistics.</li>
  <li><strong>reduceRegion</strong> — the GEE function for zonal statistics, extracting summary values (mean, sum, std) from an Image within a Geometry.</li>
</ul>

<hr>

<h2>Workflow overview</h2>

<ol>
  <li><strong>Setup GEE</strong> — register a Google Cloud project and authenticate the Python client with <code>ee.Authenticate()</code>.</li>
  <li><strong>Define study area</strong> — load Córdoba department from the FAO GAUL administrative boundary dataset and extract the Sinú River basin bounding box.</li>
  <li><strong>Load Sentinel-1 SAR</strong> — filter IW mode VV polarisation scenes for pre-flood (December 2025) and post-flood (February 2026), averaging multiple scenes to reduce speckle.</li>
  <li><strong>Detect flood extent</strong> — compute pre-minus-post backscatter difference, threshold at 3 dB, then mask steep slopes and permanent water bodies using JRC Global Surface Water.</li>
  <li><strong>Zonal statistics</strong> — calculate flooded area in km² per municipality using <code>reduceRegion</code> mapped over the municipal boundary collection.</li>
  <li><strong>NDVI time series</strong> — build monthly Sentinel-2 NDVI composites from January 2025 to June 2026 to quantify vegetation damage and track recovery.</li>
  <li><strong>Export</strong> — save the flood raster to Google Drive and a per-municipality CSV with flooded area statistics.</li>
</ol>

<hr>

<h2>Why average multiple SAR scenes?</h2>

<p>
SAR images contain speckle — random pixel-to-pixel noise inherent to radar. Averaging
multiple scenes taken over the same area reduces this noise through temporal filtering,
giving a more stable and accurate backscatter baseline for change detection. A single
scene baseline produces noisier results and increases false positive rates.
</p>

<hr>

<h2>Why mask permanent water bodies?</h2>

<p>
Rivers like the Sinú are always present in SAR images as dark features. Without masking
them, they appear in the "new flood" layer even though they haven't changed. The JRC
Global Surface Water dataset identifies pixels with water present more than 10 months
per year as permanent water, which are excluded from the flood extent map.
</p>

<hr>

<h2>Limitations and validation</h2>

<ul>
  <li><strong>Threshold sensitivity</strong> — the 3 dB change threshold should be tuned per scene. High-wind events can lower backscatter over land and create false positives.</li>
  <li><strong>Flooded under vegetation</strong> — dense canopy double-bounce partially masks inundation signal beneath forest cover.</li>
  <li><strong>NDVI and clouds</strong> — cloud cover during the flood period limits the number of valid Sentinel-2 pixels. Apply strict cloud masking using the SCL band.</li>
</ul>

<p>
Validate your results against the Copernicus EMS EMSR865 official product and the UNGRD
Colombia affected municipality list. A good result for this type of analysis typically
achieves overall accuracy above 85% against reference flood perimeters.
</p>

<hr>

<h2>How to extend this analysis</h2>

<ul>
  <li><strong>Flood frequency</strong> — repeat for multiple historical events (2010 La Niña, 2017, 2022) to identify which areas flood every year.</li>
  <li><strong>Agricultural loss</strong> — overlay the flood mask with IDEAM land use data to calculate affected hectares by crop type.</li>
  <li><strong>Population exposure</strong> — intersect the flood extent with WorldPop population density to estimate people in affected areas.</li>
  <li><strong>Recovery monitoring</strong> — extend the NDVI time series to 2027 to measure how long vegetation takes to recover.</li>
  <li><strong>Risk mapping</strong> — combine flood frequency, slope, and population density into a composite risk index per municipality.</li>
</ul>
`,
    codeSnippet: `
import ee
import geemap
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# Authenticate and initialize
ee.Authenticate()
ee.Initialize(project="your-gee-project-id")

# Define study area — Córdoba department
colombia_depts = ee.FeatureCollection("FAO/GAUL/2015/level1")
cordoba = colombia_depts.filter(
    ee.Filter.And(
        ee.Filter.eq("ADM0_NAME", "Colombia"),
        ee.Filter.eq("ADM1_NAME", "Córdoba")
    )
)
cordoba_geom = cordoba.geometry()

# PRE-FLOOD baseline (December 2025)
s1_pre = (ee.ImageCollection("COPERNICUS/S1_GRD")
            .filter(ee.Filter.eq("instrumentMode", "IW"))
            .filter(ee.Filter.listContains("transmitterReceiverPolarisation", "VV"))
            .filter(ee.Filter.eq("orbitProperties_pass", "DESCENDING"))
            .filterBounds(cordoba_geom)
            .filterDate("2025-12-01", "2025-12-31")
            .select("VV").mean().clip(cordoba_geom))

# POST-FLOOD (February 2026)
s1_post = (ee.ImageCollection("COPERNICUS/S1_GRD")
             .filter(ee.Filter.eq("instrumentMode", "IW"))
             .filter(ee.Filter.listContains("transmitterReceiverPolarisation", "VV"))
             .filter(ee.Filter.eq("orbitProperties_pass", "DESCENDING"))
             .filterBounds(cordoba_geom)
             .filterDate("2026-02-01", "2026-02-20")
             .select("VV").mean().clip(cordoba_geom))

# Change detection — backscatter decrease = new water
difference  = s1_pre.subtract(s1_post)
flood_raw   = difference.gt(3.0)  # > 3 dB drop

# Terrain and permanent water masks
dem            = ee.Image("USGS/SRTMGL1_003").clip(cordoba_geom)
slope          = ee.Terrain.slope(dem)
jrc_water      = ee.Image("JRC/GSW1_4/GlobalSurfaceWater").select("seasonality")
permanent_water = jrc_water.gt(10)

flood_mask = (flood_raw
              .And(slope.lt(5))
              .And(permanent_water.Not())
              .rename("flood"))

# Export to Google Drive
task = ee.batch.Export.image.toDrive(
    image          = flood_mask.toFloat(),
    description    = "Cordoba_Flood_Feb2026_SAR",
    folder         = "GEE_Exports",
    fileNamePrefix = "cordoba_flood_2026",
    region         = cordoba_geom,
    scale          = 30,
    crs            = "EPSG:4326",
    maxPixels      = 1e10
)
task.start()
print("Export started — check Tasks in GEE Code Editor")
`
  },

  // =====================================================
  // 3️⃣ LAND COVER ANALYSIS
  // =====================================================

  {
    id: 'r-wildfire-nbr',
    title: 'Python: Wildfire Burn Severity Mapping with Spectral Indices',
    description: 'Map fire damage using Sentinel-2 NBR and dNBR — with full Python and R code.',
    language: Language.PYTHON,
    category: "Land Cover Analysis",
    level: "Intermediate",
    createdAt: "2026-02-23",
    image: "/images/tutorials/wildfire.jpg",
    content: `
<p>
Wildfires alter vegetation structure, soil moisture, and surface reflectance in ways
that are clearly visible from space. In this tutorial you'll implement a complete
burned area workflow using Sentinel-2 imagery — from raw bands to a classified
burn severity map — using the Normalized Burn Ratio (NBR) and its difference (dNBR).
</p>

<hr>

<h2>Why optical data for fire mapping?</h2>

<p>
Wildfires cause abrupt changes in vegetation and surface properties that optical
sensors detect through variations in reflectance. Burned surfaces show a consistent
spectral signature:
</p>

<ul>
  <li><strong>NIR drops</strong> — healthy vegetation strongly reflects near-infrared. After fire, the canopy disappears and NIR reflectance falls sharply.</li>
  <li><strong>SWIR rises</strong> — charcoal and exposed mineral soil absorb NIR but reflect shortwave infrared, increasing SWIR reflectance after burning.</li>
  <li><strong>Chlorophyll lost</strong> — green vegetation spectral features vanish; visible bands show darker, browner surfaces.</li>
</ul>

<p>
Sentinel-2 is well suited for fire mapping because it provides Band 8 (NIR, 842 nm) and
Band 12 (SWIR2, 2190 nm) — the two bands required to compute the Normalized Burn Ratio —
at 10 m and 20 m spatial resolution respectively.
</p>

<hr>

<h2>The NBR index — explained</h2>

<p>
The Normalized Burn Ratio is defined as:
</p>

<p style="background:#F4F4F4;padding:14px;border-radius:8px;font-family:monospace;font-size:16px;text-align:center;">
  NBR = (NIR − SWIR) / (NIR + SWIR)
</p>

<p>
Values range from −1 to +1. Healthy vegetation produces high NBR values because NIR
reflectance is high and SWIR reflectance is low. Burned areas produce lower — often
negative — NBR values because vegetation damage reduces NIR while exposed soil and
charcoal increase SWIR.
</p>

<p>
<strong>dNBR is almost always better than single-date NBR.</strong> A single post-fire
NBR image can confuse burned areas with dry bare soil or shadow. dNBR removes that
ambiguity by measuring the change caused by the fire:
</p>

<p style="background:#F4F4F4;padding:14px;border-radius:8px;font-family:monospace;font-size:16px;text-align:center;">
  dNBR = NBR_pre − NBR_post
</p>

<h3>USGS dNBR burn severity classification</h3>

<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;font-size:14px;">
  <thead>
    <tr style="background:#F9FAFB;">
      <th style="text-align:left;padding:10px 14px;">dNBR Range</th>
      <th style="text-align:left;padding:10px 14px;">Severity Class</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="padding:9px 14px;">&lt; −0.25</td><td style="padding:9px 14px;">Enhanced regrowth</td></tr>
    <tr style="background:#FAFAFA;"><td style="padding:9px 14px;">−0.25 – 0.10</td><td style="padding:9px 14px;">Unburned</td></tr>
    <tr><td style="padding:9px 14px;">0.10 – 0.27</td><td style="padding:9px 14px;">Low severity</td></tr>
    <tr style="background:#FAFAFA;"><td style="padding:9px 14px;">0.27 – 0.44</td><td style="padding:9px 14px;">Moderate-low severity</td></tr>
    <tr><td style="padding:9px 14px;">0.44 – 0.66</td><td style="padding:9px 14px;">Moderate-high severity</td></tr>
    <tr style="background:#FAFAFA;"><td style="padding:9px 14px;">&gt; 0.66</td><td style="padding:9px 14px;">High severity</td></tr>
  </tbody>
</table>

<p style="font-size:12px;color:#6B7280;margin-top:6px;">Source: Key &amp; Benson (2006), USGS FIREMON</p>

<hr>

<h2>Workflow overview</h2>

<ol>
  <li><strong>Acquire imagery</strong> — download cloud-free Sentinel-2 L2A scenes for pre- and post-fire dates from Copernicus Open Access Hub or Google Earth Engine. L2A = surface reflectance, already atmospherically corrected.</li>
  <li><strong>Mask clouds</strong> — use the Sentinel-2 Scene Classification Layer (SCL) to remove clouds, cloud shadows, and water bodies.</li>
  <li><strong>Compute NBR</strong> — load Band 8 (NIR) and Band 12 (SWIR2), scale reflectance values, and apply the NBR formula for both dates.</li>
  <li><strong>Compute dNBR</strong> — subtract post-fire NBR from pre-fire NBR. Positive values indicate burned area.</li>
  <li><strong>Classify severity</strong> — apply USGS thresholds to categorise dNBR into six burn severity levels.</li>
  <li><strong>Calculate area and export</strong> — sum burned pixels by class, visualise a 3-panel map, and export a GeoTIFF.</li>
</ol>

<hr>

<h2>Limitations to keep in mind</h2>

<ul>
  <li><strong>Dark surface confusion</strong> — shadows, deep water, and dark soil can have similar NBR values to burned areas. Always validate against known reference areas.</li>
  <li><strong>Cloud contamination</strong> — even small cloud fractions corrupt results. Use SCL masking rigorously, and check cloud cover before downloading.</li>
  <li><strong>No temporal persistence</strong> — a single post-fire image doesn't capture recovery. Time-series dNBR tracks how the landscape recovers over months and years.</li>
  <li><strong>SAR needed for smoke</strong> — during active fires, smoke blocks optical sensors. Integrate Sentinel-1 SAR for near-real-time monitoring.</li>
</ul>

<hr>

<h2>How to extend this analysis</h2>

<ul>
  <li><strong>Multi-temporal recovery</strong> — compute dNBR at 1, 6, 12, and 24 months post-fire to map vegetation recovery trajectories.</li>
  <li><strong>SAR integration</strong> — combine Sentinel-1 C-band backscatter with dNBR to map fire through smoke and clouds.</li>
  <li><strong>Machine learning</strong> — train a Random Forest on spectral indices plus terrain variables for multi-class severity mapping.</li>
  <li><strong>Large-scale GEE</strong> — scale the workflow to entire countries using Google Earth Engine's parallel processing.</li>
  <li><strong>Fire risk modelling</strong> — combine burn severity with DEM slope and fuel load maps for predictive risk assessment.</li>
</ul>
`,
    codeSnippet: `
import numpy as np
import rasterio
import matplotlib.pyplot as plt
import matplotlib.colors as mcolors

def load_band(path):
    with rasterio.open(path) as src:
        return src.read(1).astype("float32"), src.profile

nir_pre,  profile = load_band("pre_fire_B08.tif")
swir_pre, _       = load_band("pre_fire_B12_10m.tif")
nir_post, _       = load_band("post_fire_B08.tif")
swir_post, _      = load_band("post_fire_B12_10m.tif")

# Cloud mask from SCL
def valid_mask(scl_path, valid_classes=(4, 5)):
    scl, *_ = load_band(scl_path)
    return np.isin(scl, valid_classes)

valid = valid_mask("pre_fire_SCL.tif") & valid_mask("post_fire_SCL.tif")

# NBR calculation
def nbr(nir, swir, mask=None):
    with np.errstate(divide="ignore", invalid="ignore"):
        result = (nir - swir) / (nir + swir)
    result = np.where(nir + swir == 0, 0, result)
    if mask is not None:
        result[~mask] = np.nan
    return result

nbr_pre  = nbr(nir_pre,  swir_pre,  valid)
nbr_post = nbr(nir_post, swir_post, valid)
dnbr     = nbr_pre - nbr_post

# USGS severity classification
def classify_severity(dnbr):
    classes = np.zeros_like(dnbr, dtype="uint8")
    classes[dnbr < -0.25]                     = 1  # enhanced regrowth
    classes[(dnbr >= -0.25) & (dnbr < 0.10)] = 2  # unburned
    classes[(dnbr >= 0.10)  & (dnbr < 0.27)] = 3  # low severity
    classes[(dnbr >= 0.27)  & (dnbr < 0.44)] = 4  # moderate-low
    classes[(dnbr >= 0.44)  & (dnbr < 0.66)] = 5  # moderate-high
    classes[dnbr >= 0.66]                     = 6  # high severity
    classes[np.isnan(dnbr)]                   = 0  # masked
    return classes

severity       = classify_severity(dnbr)
burned_area_km2 = np.sum(severity >= 3) * (10 * 10) / 1e6
print(f"Total burned area: {burned_area_km2:.1f} km²")

# Export
out_profile = profile.copy()
out_profile.update(dtype=rasterio.uint8, count=1, nodata=0)
with rasterio.open("burn_severity.tif", "w", **out_profile) as dst:
    dst.write(severity, 1)
print("Saved: burn_severity.tif")
`
  },

  {
    id: 'water-quality',
    title: 'Python: Coastal Water Quality Monitoring with Sentinel-2',
    description: 'Map chlorophyll-a, turbidity, and CDOM from satellite optical data.',
    language: Language.PYTHON,
    category: "Flood Modeling",
    level: "Intermediate",
    createdAt: "2026-02-26",
    image: "/images/tutorials/waterquality.jpg",
    content: `
<p>
Satellites can measure water quality parameters — chlorophyll-a, turbidity, and
dissolved organic matter — continuously, at no cost, and over areas too large for
field sampling alone. In this tutorial you'll build a complete water quality
monitoring workflow using Sentinel-2 L2A imagery, from download to validated,
publication-ready maps.
</p>

<div style="padding:12px 16px;border-radius:8px;margin:0 0 20px;font-size:13px;line-height:1.65;background:#FFF7ED;border-left:4px solid #F97316;">
  <span style="margin-right:8px;">🔬</span>
  <strong>From real research:</strong> this workflow is based on methods applied at ISPRA
  (Italian National Institute for Environmental Protection and Research) for monitoring
  coastal water quality in the northern Adriatic Sea, including the Chioggia lagoon
  near Venice.
</div>

<hr>

<h2>Why Sentinel-2 for water quality?</h2>

<p>
Sentinel-2 was designed primarily for land monitoring, but its red-edge bands
(B5, B6, B7) make it surprisingly capable for inland and coastal water quality —
especially chlorophyll-a detection in optically complex waters where standard ocean
colour algorithms fail. Its 10 m spatial resolution resolves features that Sentinel-3
(300 m) or MODIS (250–500 m) cannot.
</p>

<ul>
  <li><strong>10 m resolution</strong> — resolves lagoons, estuaries, and small water bodies invisible to coarser sensors.</li>
  <li><strong>Red-edge bands</strong> — Band 5 at 705 nm captures chlorophyll fluorescence, the most sensitive band for Chl-a in turbid coastal waters.</li>
  <li><strong>Free and 5-day revisit</strong> — global coverage every 5 days at no cost, ideal for temporal monitoring and event detection.</li>
</ul>

<hr>

<h2>Key Sentinel-2 bands for water quality</h2>

<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;font-size:14px;">
  <thead>
    <tr style="background:#F9FAFB;">
      <th style="padding:10px 14px;">Band</th>
      <th style="padding:10px 14px;">Wavelength</th>
      <th style="padding:10px 14px;">Water quality use</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="padding:9px 14px;">B2</td><td style="padding:9px 14px;">490 nm (Blue)</td><td style="padding:9px 14px;">CDOM absorption, water penetration</td></tr>
    <tr style="background:#FAFAFA;"><td style="padding:9px 14px;">B3</td><td style="padding:9px 14px;">560 nm (Green)</td><td style="padding:9px 14px;">Turbidity, TSM scattering, chlorophyll reflectance peak</td></tr>
    <tr><td style="padding:9px 14px;">B4</td><td style="padding:9px 14px;">665 nm (Red)</td><td style="padding:9px 14px;">Chlorophyll absorption trough, TSM</td></tr>
    <tr style="background:#FAFAFA;"><td style="padding:9px 14px;">B5 ⭐</td><td style="padding:9px 14px;">705 nm (Red-Edge 1)</td><td style="padding:9px 14px;">Chl-a fluorescence peak — most sensitive band for Chl-a in turbid water</td></tr>
    <tr><td style="padding:9px 14px;">B8</td><td style="padding:9px 14px;">842 nm (NIR)</td><td style="padding:9px 14px;">Water/land separation, NDWI denominator</td></tr>
  </tbody>
</table>

<hr>

<h2>Water quality indices</h2>

<h3>NDWI — water extent mask</h3>
<p>
NDWI = (B3 − B8) / (B3 + B8). Essential first step — mask land pixels before any
water quality analysis. Use NDWI &gt; 0.1 as the water mask threshold.
</p>

<h3>Chlorophyll-a (2-Band Algorithm)</h3>
<p>
The 2-Band Difference Algorithm uses Band 5 (705 nm) where chlorophyll fluorescence
peaks, divided by Band 4 (665 nm) where chlorophyll absorbs strongly:
<code>Chl-a index = B5 / B4</code>. Empirical calibration coefficients must be
derived from local in-situ measurements.
</p>

<h3>Turbidity / TSM</h3>
<p>
Turbidity and Total Suspended Matter (TSM) scatter light, increasing red reflectance
and reducing water transparency. A simple red-to-green ratio provides a fast turbidity
proxy: <code>turbidity = B4 / B3</code>. For quantitative TSM in mg/L, use the Nechad
et al. 2010 empirical approach calibrated with field data.
</p>

<h3>CDOM</h3>
<p>
Coloured Dissolved Organic Matter (CDOM) absorbs strongly in the blue range. The log
ratio of B2 to B3 provides a CDOM proxy: <code>CDOM = ln(B2 / B3)</code>. High CDOM
indicates terrestrial runoff, river inflow, or organic decomposition.
</p>

<hr>

<h2>Workflow overview</h2>

<ol>
  <li><strong>Download Sentinel-2 L2A</strong> — use Copernicus Open Access Hub or Google Earth Engine. L2A (surface reflectance) is required — L1C (TOA) is not suitable without further correction.</li>
  <li><strong>Mask clouds and land</strong> — use the Scene Classification Layer (SCL) to keep only water pixels (class 6). Also apply an NDWI mask as backup.</li>
  <li><strong>Compute water quality indices</strong> — calculate NDWI, Chl-a 2BDA, turbidity/TSM, and CDOM. Apply the water mask to all outputs.</li>
  <li><strong>Validate against in-situ data</strong> — extract satellite-derived values at the coordinates and dates of field measurements. Calculate RMSE, MAE, and R².</li>
  <li><strong>Visualise and export</strong> — generate a 4-panel map and export each parameter as a GeoTIFF.</li>
</ol>

<hr>

<h2>Limitations and best practices</h2>

<ul>
  <li><strong>Atmospheric correction is critical</strong> — L1C data is not suitable. Always use L2A. For very turbid or shallow water, consider ACOLITE or C2RCC for improved correction.</li>
  <li><strong>Empirical algorithms are site-specific</strong> — calibration coefficients must come from local in-situ data. Never apply literature coefficients without local validation.</li>
  <li><strong>Bottom reflectance in shallow water</strong> — in water shallower than about 3 m, the seabed reflects light and contaminates the water quality signal. Apply a depth or bathymetry mask where possible.</li>
  <li><strong>Mixed pixels at boundaries</strong> — pixels at the water–land boundary mix signals from both surfaces. Buffer the coastline inward by 1–2 pixels to remove these.</li>
</ul>

<hr>

<h2>How to extend this analysis</h2>

<ul>
  <li><strong>Seasonal time series</strong> — stack monthly composites to detect algal bloom events and long-term trends.</li>
  <li><strong>E. coli prediction</strong> — use Chl-a, turbidity, and CDOM as machine learning features to predict microbial contamination.</li>
  <li><strong>ACOLITE / C2RCC</strong> — replace simple L2A bands with dedicated water-leaving reflectance from specialist atmospheric correction processors.</li>
  <li><strong>Sentinel-3 OLCI</strong> — for open ocean or very large water bodies, Sentinel-3 provides better-calibrated ocean colour at 300 m resolution.</li>
  <li><strong>Automated monitoring</strong> — script the workflow to download and process new Sentinel-2 scenes automatically using the Copernicus API.</li>
</ul>
`,
    codeSnippet: `
import numpy as np
import rasterio

def load_band(path, scale=10000.0):
    with rasterio.open(path) as src:
        data = src.read(1).astype(float) / scale
        return data, src.profile

# Load Sentinel-2 L2A bands (10m)
B2, profile = load_band("B02_10m.tif")   # Blue  490nm
B3, _       = load_band("B03_10m.tif")   # Green 560nm
B4, _       = load_band("B04_10m.tif")   # Red   665nm
B5, _       = load_band("B05_10m.tif")   # RE1   705nm (resampled from 20m)
B8, _       = load_band("B08_10m.tif")   # NIR   842nm

# Load SCL and build water mask
with rasterio.open("SCL_20m.tif") as src:
    scl = src.read(1)

ndwi       = (B3 - B8) / (B3 + B8 + 1e-10)
water_mask = (scl == 6) & (ndwi > 0.1)
print(f"Valid water pixels: {water_mask.sum():,}")

# Chlorophyll-a (2-Band Algorithm — calibrate A, B with local in-situ data)
chla_index = B5 / (B4 + 1e-10)
A_chl, B_chl = 61.32, -37.94  # example regional coefficients
chla_ugL   = A_chl * chla_index + B_chl
chla_ugL   = np.where(water_mask & (chla_ugL > 0), chla_ugL, np.nan)

# Turbidity / TSM (Nechad et al. 2010)
Rrs_B4     = B4 / np.pi
A_tsm, C_tsm = 355.85, 0.1728
tsm_mgL    = (A_tsm * Rrs_B4) / (1 - Rrs_B4 / (C_tsm + 1e-10))
tsm_mgL    = np.where(water_mask & (tsm_mgL > 0) & (tsm_mgL < 500), tsm_mgL, np.nan)

# CDOM proxy
cdom       = np.log((B2 + 1e-10) / (B3 + 1e-10))
cdom       = np.where(water_mask, cdom, np.nan)

# Summary statistics
for name, arr in [("Chl-a (μg/L)", chla_ugL), ("TSM (mg/L)", tsm_mgL), ("CDOM index", cdom)]:
    valid = arr[~np.isnan(arr)]
    if len(valid):
        print(f"{name}: mean={valid.mean():.2f}, min={valid.min():.2f}, max={valid.max():.2f}")

# Export Chl-a as GeoTIFF
out_profile = profile.copy()
out_profile.update(dtype="float32", count=1, nodata=np.nan)
with rasterio.open("chla_ugL.tif", "w", **out_profile) as dst:
    dst.write(chla_ugL.astype("float32"), 1)
print("Saved: chla_ugL.tif")
`
  },

];