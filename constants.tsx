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

  {
    id: 'pyqgis-ai',
    title: 'PyQGIS: From the Basics to a Natural-Language Front End',
    description: 'Learn core PyQGIS scripting — layers, attributes, geometry, Processing algorithms — then wire an LLM into the console for natural-language geoprocessing.',
    language: Language.PYTHON,
    category: "Automation & Scripting",
    level: "Beginner to Advanced",
    createdAt: "2026-07-10",
    image: "/images/tutorials/spatial.jpg",
    content: `
<p>
PyQGIS already gives you full programmatic access to layers, geoprocessing
algorithms, and the map canvas. Part one of this tutorial covers the fundamentals —
loading layers, reading attributes, geometry operations, and running Processing
algorithms from code. Part two builds on that to wire an LLM into the QGIS Python
console, so a description like "buffer the wells by 500 m and clip to the
watershed" becomes reviewable PyQGIS code instead of a memorized API call.
</p>

<hr>

<h2>Part 1 — PyQGIS fundamentals</h2>

<ul>
  <li><strong>Loading & inspecting layers</strong> — QgsVectorLayer / QgsRasterLayer, always check isValid() first.</li>
  <li><strong>Reading features & attributes</strong> — getFeatures() streams as a generator; filter with QgsFeatureRequest.</li>
  <li><strong>Basic geometry operations</strong> — area(), length(), buffer(), distance() on QgsGeometry.</li>
  <li><strong>Running Processing algorithms</strong> — processing.run() returns a dict keyed by output parameter names.</li>
  <li><strong>Styling layers programmatically</strong> — QgsSymbol and QgsSingleSymbolRenderer for consistent map output.</li>
</ul>

<h2>Part 2 — Adding a natural-language front end</h2>

<p>
None of this replaces knowledge of the PyQGIS API — it removes the friction of
recalling exact syntax mid-analysis. An ask_ai() helper sends a prompt to an LLM and
returns PyQGIS code; a QgsTask version keeps it non-blocking since the console runs
on QGIS's main UI thread. The pattern that holds up in practice: describe intent,
get code back, read it, test it in a scratch project, then promote it.
</p>

<h2>Where it breaks down</h2>

<p>
An LLM generates plausible-looking geoprocessing code — that's a different thing
from correct code. It will confidently get CRS units, field names, and
version-specific method names wrong. Always verify units explicitly and check any
unfamiliar method against the PyQGIS Developer Cookbook for your installed version.
</p>
`,
    codeSnippet: `
from qgis.core import QgsVectorLayer, QgsTask, QgsApplication
import os, requests, processing

def ask_ai(prompt: str) -> str:
    resp = requests.post(
        "https://api.anthropic.com/v1/messages",
        headers={
            "x-api-key": os.environ["ANTHROPIC_API_KEY"],
            "anthropic-version": "2023-06-01",
        },
        json={
            "model": "claude-sonnet-4-6",
            "max_tokens": 800,
            "messages": [{"role": "user", "content": prompt}],
        },
    )
    return resp.json()["content"][0]["text"]

def run_ai_task(prompt, on_done):
    task = QgsTask.fromFunction("Ask AI", lambda t: ask_ai(prompt))
    task.taskCompleted.connect(lambda: on_done(task.returned_values))
    QgsApplication.taskManager().addTask(task)

# Example: reproject + buffer, generated from a natural-language prompt
stations = QgsProject.instance().mapLayersByName("stations")[0]
reproj = processing.run("native:reprojectlayer", {
    "INPUT": stations, "TARGET_CRS": "EPSG:32618", "OUTPUT": "memory:"
})["OUTPUT"]
buffered = processing.run("native:buffer", {
    "INPUT": reproj, "DISTANCE": 200, "OUTPUT": "memory:"
})["OUTPUT"]
QgsProject.instance().addMapLayer(buffered)
`
  },

  {
    id: 'sql-basics-to-expert',
    title: 'SQL: From SELECT to Query Optimization',
    description: 'A three-part progression through SQL — core querying, intermediate analysis tools like window functions and CTEs, then indexing, transactions, and query optimization.',
    language: Language.PYTHON,
    category: "Databases",
    level: "Beginner to Expert",
    createdAt: "2026-07-10",
    image: "/images/tutorials/coords.jpg",
    content: `
<p>
Three parts, each building on the last: core querying, then the intermediate tools
that make real analysis possible, then the expert-level habits — indexing,
transactions, optimization — that separate a query that works from one that scales.
</p>

<hr>

<h2>Part 1 — Core querying</h2>
<ul>
  <li><strong>SELECT, FROM, WHERE</strong> — the basic shape of every query; WHERE filters rows before any grouping.</li>
  <li><strong>Sorting, limiting, de-duplicating</strong> — ORDER BY, LIMIT, DISTINCT.</li>
  <li><strong>Aggregates & GROUP BY</strong> — COUNT, SUM, AVG, and HAVING for filtering groups after aggregation.</li>
  <li><strong>Joins</strong> — INNER JOIN for matches only, LEFT JOIN to keep every row from one side.</li>
  <li><strong>Subqueries</strong> — scalar and correlated, plus EXISTS as an often-faster alternative to IN.</li>
</ul>

<h2>Part 2 — Real analysis</h2>
<ul>
  <li><strong>CTEs</strong> — the WITH clause, including a recursive example.</li>
  <li><strong>Window functions</strong> — ROW_NUMBER, LAG, rolling averages, without collapsing rows the way GROUP BY does.</li>
  <li><strong>CASE expressions, NULL handling, set operations, string/date functions.</strong></li>
</ul>

<h2>Part 3 — Making it scale and last</h2>
<ul>
  <li><strong>Indexes & EXPLAIN ANALYZE</strong> — reading a query plan, spotting a sequential scan that should be an index scan.</li>
  <li><strong>Transactions & isolation levels</strong> — ACID basics, BEGIN/COMMIT/ROLLBACK.</li>
  <li><strong>Views vs materialized views, functions & triggers.</strong></li>
  <li><strong>Query optimization patterns</strong> — sargability, avoiding functions on indexed columns.</li>
  <li><strong>Spatial SQL with PostGIS</strong> — ST_DWithin, ST_Intersects, and GIST spatial indexes.</li>
</ul>
`,
    codeSnippet: `
-- A taste of each part, on a stations/samples schema

-- Part 1: join + aggregate
SELECT s.name, COUNT(m.sample_id) AS n_samples, AVG(m.tss_mgl) AS avg_tss
FROM stations s
LEFT JOIN samples m ON m.station_id = s.station_id
GROUP BY s.name
HAVING COUNT(m.sample_id) > 0
ORDER BY avg_tss DESC;

-- Part 2: window function — rolling average per station
SELECT
  station_id, sample_date, tss_mgl,
  AVG(tss_mgl) OVER (PARTITION BY station_id ORDER BY sample_date
                      ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS rolling_avg_3
FROM samples;

-- Part 3: sargable filter + spatial index
CREATE INDEX idx_samples_station_date ON samples (station_id, sample_date);
CREATE INDEX idx_stations_geom ON stations USING GIST (geom);

SELECT * FROM samples
WHERE sample_date >= '2026-01-01' AND sample_date < '2026-02-01';
`
  },


  // =====================================================
  // 2️⃣ RISK & DECISION ANALYSIS
  // Based on Haimes, "Risk Modeling, Assessment, and
  // Management" — modernized. Series runs 01 through 11,
  // each tutorial builds on the ones before it.
  // =====================================================

{
  id: 'systems-risk-analysis',
  title: '01 - The Art and Science of Systems & Risk Analysis',
  description: 'The classical risk triplet, systems thinking, and how Bayesian networks, calibrated ML, and digital twins modernize it.',
  language: Language.PYTHON,
  category: "Risk & Decision Analysis",
  level: "Intermediate",
  createdAt: "2026-07-16",
  image: "/images/tutorials/risk-analysis.jpg",
  content: `
<p>
Every monitoring pipeline on this site — a flood extent map, a burn severity index,
a coastal contamination flag — is, underneath, a risk model. This tutorial opens a
new track: instead of a sensor or algorithm, we look at the discipline that decides
<em>which</em> risks matter, how to quantify them, and how to act on them. Systems
engineering calls this risk analysis, and its modern form is a direct descendant of
a framework formalized in the 1980s that is still the backbone of how risk is
defined today.
</p>

<hr>

<h2>What actually is a "system"?</h2>

<p>
A system is a purposeful set of interrelated components — physical, human,
institutional — whose collective behavior cannot be predicted by studying each
part in isolation. Systems engineering is the discipline of designing and managing
that whole across its entire life cycle, not just optimizing its components.
</p>

<p>
A coastal water-quality monitoring program is a good example. It is not just a
satellite and an algorithm. It is satellites, in-situ sampling, a predictive model,
a health agency's decision process, and beach-goers' behavior, all coupled
together. Missing any one of those parts means missing part of the actual risk.
</p>

<hr>

<h2>The risk triplet: how risk got a rigorous definition</h2>

<p>
In 1981, Kaplan and Garrick proposed that quantitative risk could be reduced to
the answers to three questions, later adopted as the foundation of the entire
field of risk analysis:
</p>

<ol>
  <li><strong>What can happen?</strong> — the scenario.</li>
  <li><strong>How likely is it?</strong> — the probability.</li>
  <li><strong>If it does happen, what are the consequences?</strong></li>
</ol>

<p>
That's <em>risk assessment</em>. Haimes' framework adds a second triplet on top of
it, turning assessment into <em>management</em>:
</p>

<ol>
  <li><strong>What can be done about it?</strong> — the available options.</li>
  <li><strong>What are the trade-offs</strong> among cost, benefit, and risk across
  those options?</li>
  <li><strong>What does today's decision cost in future options?</strong></li>
</ol>

<p>
Six questions, in two groups. Almost every risk methodology you'll meet — HHM,
decision trees, Bayesian networks, ISO 31000 — is a way of answering one of these
six more rigorously.
</p>

<hr>

<h2>From the Farmer's Dilemma to the Coastal Manager's Dilemma</h2>

<p>
Haimes' book teaches this framework through a running example: a farmer choosing
a crop mix under uncertain rainfall, trading expected yield against the risk of a
bad season. The tension between maximizing what you expect on average and
minimizing your exposure to the worst case is the seed of multiobjective trade-off
analysis — later formalized as noninferior (Pareto-optimal) solutions.
</p>

<p>
The environmental-monitoring analog is a coastal manager deciding whether to close
a beach, delay dredging, or authorize an outfall discharge, weighing expected
recreational or economic value against the probability and severity of a
contamination event. Same six questions, different scenario — and the same
underlying tension between the expected outcome and the tail risk.
</p>

<hr>

<h2>How this is done today</h2>

<p>
The classical triplet assumed scenarios and probabilities came largely from expert
judgment — which is exactly what Hierarchical Holographic Modeling (HHM, covered
in the book's next chapter) was built for: systematically decomposing a system
into topics and sub-topics so no source of risk is overlooked. HHM is a direct
ancestor of the structured risk registers and multi-hazard frameworks used in
disaster-risk reduction today.
</p>

<p>
Three things have changed since 1998:
</p>

<ul>
  <li>
    <strong>Bayesian networks</strong> encode the same what-can-happen /
    how-likely structure, but let evidence — sensor readings, remote-sensing
    indices — update probabilities as it arrives, propagating uncertainty across
    dependent risk factors instead of relying on one static number.
  </li>
  <li>
    <strong>Calibrated ML classifiers</strong> (random forests, gradient boosting,
    increasingly transformer-based models on satellite time series) estimate
    P(hazard) directly from covariates instead of hand-built probability tables —
    this is the machinery behind most modern contamination and hazard prediction
    work, including on this site.
  </li>
  <li>
    <strong>Digital twins</strong> — a continuously updated virtual replica of the
    monitored system, fed by IoT and remote sensing — run the risk triplet
    operationally, and let managers simulate a treatment option before committing
    to it, turning question 4 (what can be done) into a live simulation instead of
    a static table.
  </li>
</ul>

<p>
At the management-standard level, ISO 31000 generalized this same triplet
structure (establish context → identify → analyze → evaluate → treat → monitor)
into a process used across industries — playing today the role Haimes' framework
originally played specifically for engineering systems.
</p>

<hr>

<h2>A minimal, quantitative version of the triplet</h2>

<p>
The snippet below turns the qualitative triplet into a small geospatial pipeline:
a probability layer (question 2, e.g. the output of a calibrated classifier
estimating P(contamination) per pixel) multiplied by a consequence layer
(question 3, e.g. beach usage or population exposure), classified into a
three-tier risk matrix. It's the same <code>risk = P(hazard) × consequence</code>
definition Kaplan and Garrick proposed in 1981, implemented as an actual raster
workflow.
</p>

<hr>

<h2>Limitations to keep in mind</h2>

<ul>
  <li><strong>Cascading risk</strong> — the static triplet treats scenarios as
  independent. A flood that knocks out a treatment plant and <em>then</em> causes
  a contamination event is a chain, not a single scenario. This is precisely what
  HHM and "systems of systems" thinking exist to catch.</li>
  <li><strong>Calibration</strong> — a raw classifier score is not automatically a
  probability. Before treating a model's output as "how likely," calibrate it
  (Platt scaling, isotonic regression) or the second question in the triplet goes
  unanswered even though a number is displayed.</li>
  <li><strong>The consequence layer is usually the weakest link</strong> — teams
  invest heavily in the hazard model and treat exposure/consequence as an
  afterthought, when it deserves the same rigor.</li>
</ul>

<hr>

<h2>Where this track is headed</h2>

<ul>
  <li>Hierarchical Holographic Modeling — structured scenario identification for
  complex, interdependent systems.</li>
  <li>Decision trees and multiobjective trade-off analysis — formalizing the
  Coastal Manager's Dilemma quantitatively, option by option.</li>
</ul>

<p>
<strong>Key principle:</strong> before reaching for a bigger model, make sure you
can answer the three original questions for your system — what can happen, how
likely, and what if it does. Everything else in this track is refinement.
</p>
`,
  codeSnippet: `
import numpy as np
import rasterio

def load_raster(path):
    with rasterio.open(path) as src:
        return src.read(1).astype(float), src.profile

# "How likely" — probability layer from a CALIBRATED classifier
# e.g. output of a Random Forest / logistic regression estimating
# P(fecal contamination) per pixel from Sentinel-2 + in-situ training data
prob_hazard, profile = load_raster("p_contamination.tif")

# "What if it does happen" — consequence layer
# e.g. normalized beach-usage, population density, or economic-value index
consequence, _ = load_raster("consequence_index.tif")

# Kaplan & Garrick's triplet, quantified:
# risk(x) = P(hazard at x) * consequence(x)
risk = prob_hazard * consequence

# Classify into a 3-tier risk matrix (Low / Medium / High)
risk_class = np.select(
    [risk < 0.15, risk < 0.4],
    [1, 2],
    default=3
)

profile.update(dtype=rasterio.uint8, count=1, nodata=0)
with rasterio.open("risk_map.tif", "w", **profile) as dst:
    dst.write(risk_class.astype(np.uint8), 1)

print("Risk map exported — pixel values: 1=Low, 2=Medium, 3=High")
`
},

{
  id: 'decision-analysis',
  title: '02 - Decision Analysis: Choosing Under Uncertainty',
  description: 'Decision rules, decision trees, the fractile/triangular methods, and influence diagrams — from expert elicitation to Bayesian decision networks.',
  language: Language.PYTHON,
  category: "Risk & Decision Analysis",
  level: "Intermediate",
  createdAt: "2026-07-17",
  image: "/images/tutorials/decision-analysis.jpg",
  content: `
<p>
Tutorial 01 gave us a way to <em>score</em> risk: probability times consequence,
mapped as low / medium / high. But a score alone doesn't tell the Coastal Manager
whether to close the beach. Turning a risk score into a choice among real options
is the job of decision analysis — the toolkit built to answer the second half of
Haimes' six questions: what can be done, and what are the trade-offs.
</p>

<hr>

<h2>Deciding when you don't even have probabilities</h2>

<p>
Sometimes you can't honestly assign a probability to a scenario at all — a novel
contaminant, a first-of-its-kind infrastructure failure. Classical decision theory
still gives you rules for choosing an alternative under that kind of uncertainty:
</p>

<ul>
  <li><strong>Maximin (Wald)</strong> — look only at each option's worst-case
  outcome, and pick the option whose worst case is least bad. Risk-averse by
  construction.</li>
  <li><strong>Maximax</strong> — the mirror image: pick the option with the best
  best-case outcome. Risk-seeking.</li>
  <li><strong>Laplace</strong> — with no reason to favor one scenario over
  another, treat them as equally likely and pick the option with the best
  average.</li>
  <li><strong>Minimax regret (Savage)</strong> — for each option, compute how much
  worse it does than the best choice would have done <em>had you known the true
  scenario</em>; pick the option minimizing that worst regret.</li>
  <li><strong>Expected value (Bayes)</strong> — once you do have probabilities
  (from a model, from data, from expert elicitation), weight each outcome by its
  probability. This is the rule decision trees are built on.</li>
</ul>

<p>
None of these is "correct" — they encode different attitudes toward uncertainty.
Which one a manager reaches for often says more about their risk tolerance than
about the data.
</p>

<hr>

<h2>Decision trees: folding uncertainty back into a choice</h2>

<p>
A decision tree alternates decision nodes (choices you control) with chance nodes
(outcomes you don't), ending in a payoff at each leaf. Solving it — the "rollback"
or "fold-back" method — works from the leaves inward: at every chance node,
replace the branch with its expected value (Bayes' rule above); at every decision
node, keep only the branch with the best expected value and discard the rest.
</p>

<p>
For the Coastal Manager's Dilemma: close the beach (a fixed, certain cost) versus
keep it open (a small gain if nothing happens, a large loss if a contamination
event occurs, weighted by the probability from the Tutorial 01 hazard model). Fold
the tree back, and the better decision falls out — an EMV comparison, made
explicit.
</p>

<p>
One caveat carried straight from Haimes: raw expected monetary value treats a 10%
chance of losing 100 the same as a certain loss of 10. Real decision-makers are
rarely that indifferent to variance — which is why expected <em>utility</em>
(a risk-adjusted version of EMV) often replaces raw EMV once the stakes involve
public health rather than just cost.
</p>

<hr>

<h2>Decision matrices and multiple criteria</h2>

<p>
A decision matrix lays out every alternative against every scenario (or every
criterion) in a table, then applies one of the rules above. The moment more than
one criterion matters at once — cost <em>and</em> ecological impact <em>and</em>
public-health risk — this generalizes into multi-criteria decision analysis
(MCDA): weighted-sum scoring, AHP, or TOPSIS, all descendants of the same matrix,
built to handle the multiobjective trade-offs Haimes flagged back in the
Farmer's Dilemma.
</p>

<hr>

<h2>The fractile method and the triangular distribution</h2>

<p>
Both were built for the same problem: putting a number on uncertainty when no
hard dataset exists yet.
</p>

<ul>
  <li>
    <strong>The fractile method</strong> elicits a probability distribution from
    an expert by asking for percentiles directly — "give me the value you're 50%
    sure won't be exceeded, then the value you're 5% sure won't be exceeded" —
    building a CDF point by point instead of asking for a shape up front.
  </li>
  <li>
    <strong>The triangular distribution</strong> is the cheaper cousin: ask only
    for a minimum, most-likely, and maximum value, and interpolate a distribution
    from those three points. It's still the default behind three-point cost and
    schedule estimates (PERT) and countless Monte Carlo risk simulations today.
  </li>
</ul>

<p>
The modern shift: wherever a historical or sensor record exists — a contamination
time series, a satellite archive — fit an empirical or Bayesian-updated
distribution instead of eliciting one from an expert. The triangular distribution
remains the honest default only when the data genuinely isn't there yet, e.g. an
emerging contaminant or a newly deployed sensor with no track record.
</p>

<hr>

<h2>Influence diagrams — the compact alternative to a full tree</h2>

<p>
A decision tree branches out combinatorially as more decisions and events stack
up. An influence diagram compresses the same information into a directed graph:
decision nodes, chance nodes, and a value node, connected by arcs that show what
influences what — without enumerating every path explicitly.
</p>

<p>
This is exactly the structure a Bayesian network gains when you add decision and
utility nodes to it. Today, tools like <code>pgmpy</code> in Python (or dedicated
software like GeNIe and Hugin) build and solve these directly — an influence
diagram isn't a historical curiosity, it's the diagram most modern Bayesian
decision-support systems are drawing under the hood.
</p>

<hr>

<h2>A worked version: the Coastal Manager's Dilemma, quantified</h2>

<p>
The snippet below folds a two-option decision tree (close the beach vs. keep it
open), using the hazard probability from Tutorial 01's risk model, then layers on
a fractile-style Monte Carlo simulation — a triangular distribution on the
outbreak cost, and a Beta distribution capturing uncertainty in the hazard
probability itself — to ask a sharper question than EMV alone: <em>how often
would the EMV-optimal decision actually turn out to be wrong?</em>
</p>

<hr>

<h2>Where the classical framework runs out</h2>

<ul>
  <li><strong>Static payoffs</strong> — real consequences shift with the season,
  with cumulative exposure, with who else is exposed at the same time. A single
  payoff table hides that.</li>
  <li><strong>Independent decisions</strong> — this tutorial treats one decision
  in isolation. Chapter 4's later material on population dynamics and phantom
  system models exists precisely because real infrastructure decisions are
  coupled to each other and to how affected populations respond over time — the
  subject of a future tutorial in this track.</li>
  <li><strong>Elicited numbers age badly</strong> — a triangular distribution from
  an expert interview in year one should be replaced by data as soon as data
  exists. Treat elicitation as a placeholder, not a permanent input.</li>
</ul>

<p>
<strong>Key principle:</strong> a decision rule doesn't remove judgment from a
decision — it makes the judgment explicit and inspectable. Choosing maximin
instead of expected value is itself a decision worth being able to defend.
</p>
`,
  codeSnippet: `
import numpy as np

# --- Decision tree / EMV for the Coastal Manager's Dilemma ---
# Hazard probability carried over from Tutorial 01's risk model
p_event = 0.18
p_no_event = 1 - p_event

# Payoffs in relative cost units (negative = loss)
payoff = {
    "close_beach": {"event": -8,  "no_event": -8},   # lost tourism, either way
    "keep_open":   {"event": -60, "no_event": 2},     # outbreak cost vs. normal revenue
}

def expected_value(option):
    return (payoff[option]["event"] * p_event +
            payoff[option]["no_event"] * p_no_event)

for option in payoff:
    print(f"{option}: EMV = {expected_value(option):.2f}")

best = max(payoff, key=expected_value)
print(f"\\nDecision-rule recommendation (max EMV): {best}")

# --- Fractile/triangular-style uncertainty layered on top ---
# Three-point (min, most-likely, max) elicitation of the outbreak cost
outbreak_cost = np.random.triangular(left=30, mode=60, right=120, size=10_000)

# Uncertainty in the hazard probability itself (Beta, mean ≈ 0.18)
p_event_samples = np.random.beta(a=3, b=14, size=10_000)

emv_keep_open = (-outbreak_cost * p_event_samples
                 + 2 * (1 - p_event_samples))

p_wrong_call = np.mean(emv_keep_open < expected_value("close_beach"))
print(f"P(keep_open turns out to be the wrong call) = {p_wrong_call:.1%}")
`
},

{
  id: 'hierarchical-holographic-modeling',
  title: '03 - Identifying Risk Through Hierarchical Holographic Modeling',
  description: 'How to find the risks nobody thought to list — from Haimes\' HHM method to modern bowtie analysis, STPA, and LLM-assisted hazard elicitation.',
  language: Language.PYTHON,
  category: "Risk & Decision Analysis",
  level: "Intermediate",
  createdAt: "2026-07-18",
  image: "/images/tutorials/hhm.jpg",
  content: `
<p>
Tutorials 01 and 02 assumed the scenario list already existed: a hazard
probability, a set of options, a payoff table. But the very first question in
the risk triplet — <em>what can happen</em> — is the one most likely to be
answered badly, because it's the one where you don't yet know what you're
missing. Hierarchical Holographic Modeling (HHM) is Haimes' method for finding
those blind spots before they become the scenario nobody planned for.
</p>

<hr>

<h2>Why "holographic"?</h2>

<p>
The name is a deliberate metaphor. A hologram encodes the same scene from many
overlapping angles, and — unlike a normal photograph — any fragment of it still
contains information about the whole picture. HHM applies that idea to risk
identification: model the same system from several different, overlapping
viewpoints (technical, organizational, economic, environmental, temporal...)
instead of a single hierarchy, because any one lens will systematically miss an
entire category of risk that a different lens would have caught immediately.
</p>

<hr>

<h2>Hierarchical aspects: build a tree, not a list</h2>

<p>
The first move is structural: break the system down into a tree of topics and
sub-topics, the same way a book's table of contents forces a subject to be
covered exhaustively rather than as a loose bag of items. Each level of the tree
is a checkpoint — "have I covered every branch here?" — that a flat brainstorm
never forces you to ask.
</p>

<hr>

<h2>Hierarchical overlapping coordination: the overlap is the point</h2>

<p>
Because HHM insists on multiple overlapping viewpoints, the same underlying risk
often shows up in more than one branch. A wastewater treatment plant bypass is
simultaneously an infrastructure-failure risk, a public-health risk, and a
regulatory-compliance risk. Haimes treats that repetition as a feature, not
noise: an item that only ever appears once is easy to lose track of, but an item
that keeps resurfacing under different lenses is exactly the kind of
cross-cutting risk worth prioritizing first.
</p>

<hr>

<h2>HHM and the theory of scenario structuring</h2>

<p>
HHM isn't the only way to structure a scenario list, and a later refinement —
by Kaplan, Haimes, and Garrick — makes an important admission: different
structuring methods applied to the same system can produce genuinely different
scenario sets. That means the scenario list in the risk triplet from Tutorial 01
was never a "true," complete enumeration — it's an approximation, shaped by
whichever structuring method produced it. HHM doesn't solve that problem; it
just tends to produce a more complete approximation than an unstructured
brainstorm would.
</p>

<hr>

<h2>The AMP-HHM game: structuring risk as a group, not a solo exercise</h2>

<p>
The Adaptive Multiplayer HHM game turns the hierarchy-building process into a
structured, participatory exercise: multiple stakeholders contribute and revise
branches together, rather than one analyst imposing a structure and hoping it's
complete. The underlying insight — that scenario identification improves when
multiple independent perspectives are elicited and reconciled systematically —
is the same one behind the Delphi method, and it shows up again, in a very
current form, further down this page.
</p>

<hr>

<h2>Domain-agnostic by design</h2>

<p>
Haimes applies the same method across strikingly different systems — a water
resource system, a software acquisition program, hardening a water supply
network, an automated highway system, food-poisoning outbreak scenarios. The
method doesn't care what the system is; it only cares that the system is
decomposed from more than one angle before anyone starts assigning
probabilities to it.
</p>

<hr>

<h2>How this is done today</h2>

<ul>
  <li>
    <strong>Bowtie analysis</strong> and <strong>FMEA</strong> (Failure Modes and
    Effects Analysis) are the industrial-safety descendants of the same
    hierarchical-decomposition instinct — structured templates that force a
    team through every failure pathway before consequences are estimated.
  </li>
  <li>
    <strong>STPA</strong> (Systems-Theoretic Process Analysis) extends this
    further to modern software-heavy systems, treating unsafe control actions
    between components — not just component failures — as first-class risk
    scenarios, closer in spirit to HHM's "system," not "component," framing.
  </li>
  <li>
    <strong>National and enterprise risk registers</strong> (disaster-risk
    catalogs built on frameworks like Sendai, or corporate GRC platforms) are,
    in effect, standing HHM hierarchies — built once, refreshed periodically,
    rather than rebuilt per project.
  </li>
  <li>
    <strong>LLM-assisted hazard elicitation</strong> is the newest addition:
    recent work uses large language models as an additional "viewpoint" in the
    same spirit as AMP-HHM's group exercise — surfacing candidate hazards or
    failure causes for a human analyst to review, or running structured,
    Delphi-style elicitation rounds with an LLM standing in for an additional
    reviewer. Current evidence suggests these tools are a genuinely useful
    complement for surfacing candidates, not yet a substitute for the human
    review step.
  </li>
</ul>

<hr>

<h2>A worked HHM tree: coastal contamination risk</h2>

<p>
The snippet below builds a small HHM-style hierarchy for the running Coastal
Manager's Dilemma, then flattens it into a checklist — exactly the kind of
"risk register" a monitoring program would maintain. Note which items appear
under more than one branch: those are the cross-cutting risks Haimes' overlap
concept is built to surface.
</p>

<hr>

<h2>Limitations to keep in mind</h2>

<ul>
  <li><strong>Coverage isn't provable</strong> — HHM makes omissions less likely,
  it doesn't guarantee completeness. There is no method that certifies a
  scenario list as exhaustive.</li>
  <li><strong>The hierarchy itself is a choice</strong> — per the theory of
  scenario structuring, a different set of viewpoints yields a different tree,
  and therefore a different scenario list. Document which viewpoints you used
  and why.</li>
  <li><strong>Structure without follow-through is just a diagram</strong> — an
  HHM tree only pays off once each leaf gets carried into an actual probability
  and consequence estimate (Tutorial 01) and a real decision (Tutorial 02).</li>
</ul>

<p>
<strong>Key principle:</strong> most risk-analysis failures on record aren't
probability errors — they're scenarios that were never on the list in the
first place. HHM's entire value is spent before a single number gets
calculated.
</p>
`,
  codeSnippet: `
# A minimal HHM tree for coastal contamination risk —
# five overlapping viewpoints on the same system
hhm = {
    "Point-source pollution": [
        "Wastewater treatment plant bypass",
        "Industrial discharge",
        "Marina / vessel waste",
    ],
    "Non-point-source pollution": [
        "Agricultural runoff",
        "Urban stormwater",
        "Wastewater treatment plant bypass",  # <- overlaps with the branch above
    ],
    "Hydrodynamic & climatic": [
        "Low flushing / tidal exchange",
        "Heavy rainfall events",
        "Sea-level rise altering circulation",
    ],
    "Monitoring gaps": [
        "Sparse in-situ sampling network",
        "Satellite revisit / cloud-cover gaps",
        "Sensor drift / calibration lag",
    ],
    "Institutional & regulatory": [
        "Delayed inter-agency data sharing",
        "Enforcement gaps on discharge permits",
        "Industrial discharge",  # <- overlaps with point-source branch
    ],
}

def flatten_hhm(tree):
    """Turn the hierarchy into a flat risk-register checklist, keeping
    track of every branch each item appears under."""
    register = {}
    for branch, items in tree.items():
        for item in items:
            register.setdefault(item, []).append(branch)
    return register

register = flatten_hhm(hhm)

# Items under more than one branch are the "hierarchical overlapping
# coordination" Haimes describes — cross-cutting risks worth prioritizing.
for item, branches in sorted(register.items(), key=lambda kv: -len(kv[1])):
    tag = "  <- cross-cutting" if len(branches) > 1 else ""
    print(f"{item:40s} {branches}{tag}")
`
},

{
  id: 'multiobjective-tradeoff',
  title: '04 - Multiobjective Trade-off Analysis: The Surrogate Worth Method',
  description: 'Why "minimize risk" and "minimize cost" can\'t both be optimized at once, and how the Surrogate Worth Trade-off method finds the best compromise on the Pareto frontier.',
  language: Language.PYTHON,
  category: "Risk & Decision Analysis",
  level: "Advanced",
  createdAt: "2026-07-19",
  image: "/images/tutorials/multiobjective-tradeoff.jpg",
  content: `
<p>
Tutorial 02 folded a decision tree down to a single expected value — which
quietly assumed cost and risk had already been converted into one comparable
number. In practice they usually can't be. Lower a treatment plant's discharge
limit and you cut contamination risk, but cost rises; relax it and cost falls,
but risk rises. There is no treatment level that is best on both counts at
once. Multiobjective trade-off analysis is what you reach for the moment "best"
stops meaning a single number.
</p>

<hr>

<h2>What multiple environmental objectives actually look like</h2>

<p>
Haimes and Hall developed this method on exactly this kind of problem: river
basin management with objectives like minimizing treatment cost, maximizing
dissolved oxygen, and minimizing regional economic disruption — objectives that
pull in different directions by physical necessity, not by poor planning. Coastal
water-quality management inherits the same structure: minimize public-health
risk, minimize cost, and (often) minimize ecological disruption from whatever
engineering fix reduces the first two.
</p>

<hr>

<h2>The noninferior (Pareto-optimal) set</h2>

<p>
When objectives genuinely conflict, there's no single optimum — there's a set of
<strong>noninferior solutions</strong>: points where you cannot improve one
objective without making at least one other objective worse. Every solution
outside that set is simply dominated and can be discarded outright; every
solution inside it is a legitimate candidate, and choosing among them is a
question of judgment, not arithmetic.
</p>

<hr>

<h2>Properly noninferior: ruling out the pathological cases</h2>

<p>
Not every point on the mathematical frontier is a sensible candidate. A solution
is only <strong>properly</strong> noninferior if the trade-off ratios near it stay
bounded — improving one objective by a tiny amount shouldn't cost an unbounded
amount of another. Points where that ratio blows up are technically noninferior
but practically meaningless, and the method is built to exclude them before a
decision-maker ever sees the frontier.
</p>

<hr>

<h2>The Surrogate Worth Trade-off (SWT) method</h2>

<p>
Eliciting a full multi-attribute utility function from a decision-maker up front
is hard — people are far better at judging a specific trade-off than at
specifying their entire preference structure in advance. SWT works with that
limitation instead of against it:
</p>

<ol>
  <li><strong>Trace the frontier.</strong> Optimize one objective while
  constraining the others to fixed levels (the ε-constraint method), sweeping
  those levels to generate the full noninferior set point by point.</li>
  <li><strong>Compute trade-off ratios.</strong> At each point on the frontier,
  the shadow price of each constraint gives the local exchange rate between
  objectives — how much of objective A you'd gain per unit of objective B given
  up, right at that point.</li>
  <li><strong>Ask for a surrogate worth.</strong> Instead of a full utility
  function, the decision-maker rates each trade-off on a simple scale (e.g. −10
  to +10): is giving up this much of B for that much of A clearly worthwhile,
  clearly not, or somewhere in between?</li>
  <li><strong>Find where worth crosses zero.</strong> The point where the
  surrogate worth function changes sign is where the decision-maker is
  indifferent to the trade-off — neither clearly for nor against it. That point
  is the best compromise solution.</li>
</ol>

<hr>

<h2>How SWT relates to the utility-function approach</h2>

<p>
SWT isn't a rejection of utility theory — it's a practical shortcut through it.
Under reasonable conditions, the surrogate worth function behaves like the
derivative of an implicit utility function that was never fully specified.
Instead of asking a decision-maker to hand over their entire utility function,
SWT only asks for its local slope at a handful of points on the frontier — enough
to locate the zero-crossing without ever writing the function down.
</p>

<hr>

<h2>How this is done today</h2>

<ul>
  <li>
    <strong>Generating the frontier</strong> — sweeping ε-constraints by hand
    works for smooth, convex, low-dimensional problems, which is what SWT was
    built for in the 1970s. Today, evolutionary multiobjective algorithms
    (NSGA-II, NSGA-III, MOEA/D) approximate the whole Pareto front directly, even
    for nonlinear, non-convex, or black-box objectives — including one modeled
    by a machine-learning classifier instead of a closed-form equation.
  </li>
  <li>
    <strong>Selecting the compromise point</strong> — modern interactive
    multiobjective optimization tools often replace scalar surrogate-worth
    ratings with direct visual exploration: parallel-coordinate plots or 3D
    Pareto-surface views the decision-maker can inspect and click on, rather than
    scoring individual trade-off ratios in the abstract.
  </li>
  <li>
    <strong>Proper noninferiority still matters</strong> — raw NSGA-II output
    isn't automatically filtered for pathological, unbounded trade-offs the way
    the analytic SWT derivation was; it's worth checking generated fronts for
    exactly the degenerate points Haimes' "proper" criterion was designed to
    exclude.
  </li>
</ul>

<hr>

<h2>A worked frontier: cost vs. risk in the Coastal Manager's Dilemma</h2>

<p>
The snippet below builds a small two-objective version of the treatment-level
decision: cost rises steeply as treatment approaches its maximum, while residual
risk falls toward an irreducible floor. It sweeps ε (an allowed risk ceiling) to
trace the frontier, computes the local trade-off ratio at each point, and
simulates a surrogate-worth judgment to locate the zero-crossing — the same
mechanics as SWT, without requiring an actual decision-maker interview to follow
along.
</p>

<hr>

<h2>Limitations to keep in mind</h2>

<ul>
  <li><strong>Surrogate worth is still elicited, not measured</strong> — it
  inherits the same aging-badly problem as the fractile method from Tutorial 02.
  Revisit it as preferences or evidence change.</li>
  <li><strong>Two or three objectives is the sweet spot</strong> — the classical
  ε-constraint sweep and surrogate-worth elicitation get unwieldy past three
  objectives; that's exactly the gap evolutionary algorithms were built to
  close.</li>
  <li><strong>A frontier isn't a decision</strong> — it narrows the field from
  infinite alternatives to a handful of legitimate ones. Something (a
  decision-maker, a policy, a vote) still has to pick a point on it.</li>
</ul>

<p>
<strong>Key principle:</strong> when two objectives genuinely conflict, arguing
about which single number is "best" is the wrong debate. The right debate is
about where on the frontier to stand — and SWT exists to make that debate
explicit instead of buried inside someone's unstated utility function.
</p>
`,
  codeSnippet: `
import numpy as np

# Toy treatment-level problem: x in [0, 1], 0 = no treatment, 1 = full treatment
def cost(x):
    return 100 * x**1.5          # treatment cost rises steeply near full treatment

def risk(x):
    return 0.9 * (1 - x)**2 + 0.02   # residual contamination risk floor at 0.02

# --- Trace the noninferior frontier via epsilon-constraint ---
# For this monotone toy problem the risk constraint binds exactly,
# so x*(eps) can be solved for directly rather than via a numeric optimizer.
epsilons = np.linspace(risk(1.0), risk(0.0), 40)
xs = np.clip(1 - np.sqrt(np.maximum(epsilons - 0.02, 0) / 0.9), 0, 1)
costs = cost(xs)
risks = risk(xs)

# --- Trade-off ratio (shadow price): d(cost) / d(risk) along the frontier ---
trade_off = np.gradient(costs, risks)

# --- Simulated surrogate worth: a decision-maker's judgment of each
# trade-off ratio, on a -10..+10 scale (illustrative approximation) ---
surrogate_worth = 5 - 2 * np.log10(np.abs(trade_off) + 1e-6)

# Best compromise: where surrogate worth crosses from positive to negative
sign_change = np.where(np.diff(np.sign(surrogate_worth)))[0]
if len(sign_change):
    i = sign_change[0]
    print(f"Best-compromise treatment level x = {xs[i]:.2f}  "
          f"(cost={costs[i]:.1f}, risk={risks[i]:.3f})")
else:
    print("No zero-crossing in this range — widen the epsilon sweep.")
`
},

{
  id: 'uncertainty-sensitivity-analysis',
  title: '05 - Defining Uncertainty and Sensitivity Analysis',
  description: 'Sensitivity, stability, and irreversibility as distinct properties of a model — and the Uncertainty Sensitivity Index Method for deciding which assumptions actually matter.',
  language: Language.PYTHON,
  category: "Risk & Decision Analysis",
  level: "Advanced",
  createdAt: "2026-07-20",
  image: "/images/tutorials/uncertainty-sensitivity.jpg",
  content: `
<p>
Every tutorial in this series so far has rested on a model: a hazard
probability, a payoff table, a cost-vs-risk curve. None of that machinery is
worth much if you don't know how much the model's output actually depends on
its shakiest assumptions — or whether getting one of those assumptions wrong is
something you can still walk back from. That's the question this chapter is
built around.
</p>

<hr>

<h2>Four properties worth telling apart</h2>

<p>
Haimes and Hall's 1977 paper on civil systems named four distinct properties of
how a system responds to change, and it's worth keeping them separate rather
than lumping them all under "sensitivity":
</p>

<ul>
  <li><strong>Sensitivity</strong> — how much the output moves for a given
  change in an input or parameter.</li>
  <li><strong>Responsivity</strong> — how quickly that movement actually
  happens; a system can be highly sensitive but slow to respond, or mildly
  sensitive but react almost instantly.</li>
  <li><strong>Stability</strong> — whether the system settles back to
  equilibrium after a perturbation, or drifts away from it.</li>
  <li><strong>Irreversibility</strong> — whether a change, once it happens, can
  be undone at all, even if the original cause is removed.</li>
</ul>

<p>
The last one is the one classical sensitivity analysis is least equipped to
catch. A coastal lagoon can absorb nutrient loading for years, staying visibly
stable — until a threshold is crossed and it flips to a persistently turbid,
low-oxygen state that doesn't reverse just because the loading stops. Ecologists
call this a regime shift; economists studying similar problems call the
corresponding caution a preference for keeping options open. Sensitivity
analysis alone will not warn you about it — you need a model capable of
representing a threshold in the first place.
</p>

<hr>

<h2>Where modeling error actually comes from</h2>

<p>
Every model in this series carries error from more than one source, and they
don't respond to the same fix:
</p>

<ul>
  <li><strong>Structural error</strong> — the functional form itself is wrong or
  incomplete (a missing interaction term, an assumed linear relationship that
  isn't). No amount of better data fixes this; only a better model does.</li>
  <li><strong>Parameter error</strong> — the structure is right, but the values
  plugged into it aren't well known. More data, or better estimation, narrows
  this.</li>
  <li><strong>Data error</strong> — measurement noise, sampling gaps, sensor
  drift — the raw inputs feeding both the structure and the parameters.</li>
</ul>

<hr>

<h2>A taxonomy that survives contact with practice</h2>

<p>
The distinction that has proven most durable, in this book and in the field
since, is between <strong>aleatory</strong> and <strong>epistemic</strong>
uncertainty. Aleatory uncertainty is irreducible natural variability — this
year's rainfall being wetter or drier than average isn't a knowledge gap, it's
the system being genuinely stochastic. Epistemic uncertainty is a knowledge
gap — the true decay rate of a pollutant, the correct model structure — and
unlike aleatory uncertainty, it shrinks as better data or better models become
available. Confusing the two leads to the wrong response every time: no amount
of additional monitoring will narrow uncertainty that is genuinely aleatory, and
no amount of statistical averaging fixes uncertainty that is really about not
yet knowing the right model.
</p>

<hr>

<h2>The Uncertainty Sensitivity Index Method (USIM)</h2>

<p>
Not every uncertain parameter deserves equal attention. USIM's proposal: rank
parameters by how much their own plausible range of uncertainty propagates into
output uncertainty, then spend data-collection and model-refinement effort on
the parameters that actually move the answer — not the ones that happen to be
easiest to study. Haimes and colleagues then folded this directly into design:
once you know which parameters a design is most sensitive to, that ranking
becomes part of the optimization problem itself, so the resulting design stays
acceptable across the plausible parameter range rather than being optimal for
one nominal guess and fragile everywhere else.
</p>

<hr>

<h2>How this is done today</h2>

<ul>
  <li>
    <strong>Global sensitivity analysis (GSA)</strong> — variance-based methods
    (Sobol indices, the Morris screening method, FAST) are the direct,
    computationally rigorous descendant of USIM-style ranking: instead of
    varying one parameter at a time, they vary all of them jointly and
    decompose the output variance into each parameter's contribution, including
    interaction effects a one-at-a-time sweep can miss entirely.
  </li>
  <li>
    <strong>Surrogate models</strong> — a full Sobol analysis can need tens of
    thousands of model evaluations, which is a problem when the model is an
    expensive hydrodynamic simulation or a large ML model. Fitting a cheap
    surrogate (commonly a Gaussian process emulator) to a modest sample of
    real runs, then running the sensitivity analysis on the surrogate, is now
    standard practice for exactly this reason.
  </li>
  <li>
    <strong>Robust optimization and info-gap decision theory</strong> — modern,
    more formal versions of USIM's integration with design: rather than
    optimizing for one nominal parameter set, these frameworks explicitly
    optimize for acceptable performance across an entire uncertainty envelope,
    which is precisely what sections 6.7–6.9 were reaching for with the tools
    available in the 1990s.
  </li>
  <li>
    <strong>Irreversibility</strong> gets handled separately, and still mostly
    outside sensitivity analysis proper — regime-shift and tipping-point theory
    in ecology, and real-options theory in economics (which puts a quantifiable
    value on the option to wait before taking an action you can't undo), are
    today's formal treatments of a property Haimes flagged as distinct back in
    1977.
  </li>
</ul>

<hr>

<h2>A worked comparison: one-at-a-time vs. variance-based</h2>

<p>
The snippet below runs both approaches on the same small model — a proxy for
contamination risk as a function of discharge rate, flushing time, and decay
rate. USIM-style, it first sweeps each parameter across its own range with the
others held at nominal, ranking parameters by output swing. Then it samples all
three jointly and estimates each parameter's share of output variance via its
correlation with the output — a simplified stand-in for a proper Sobol index,
useful for seeing how the two rankings can disagree once interactions are
allowed to show up.
</p>

<hr>

<h2>Limitations to keep in mind</h2>

<ul>
  <li><strong>One-at-a-time misses interactions</strong> — if two parameters
  only matter in combination, holding one at nominal while varying the other
  hides that entirely. That's the main reason variance-based GSA replaced it.</li>
  <li><strong>The correlation-based proxy below is a simplification</strong> —
  it's useful for building intuition, not a substitute for a properly computed
  Sobol index (via a library such as SALib) in real work.</li>
  <li><strong>No sensitivity analysis detects irreversibility on its own</strong>
  — it tells you how much output moves, not whether the system can move back.
  That needs an explicit dynamical or threshold model.</li>
</ul>

<p>
<strong>Key principle:</strong> a precise-looking model output is worth nothing
if you can't say which assumptions it actually depends on, and whether being
wrong about one of them is a mistake you could still undo.
</p>
`,
  codeSnippet: `
import numpy as np

# Toy model: a proxy for contamination risk as a function of three
# uncertain parameters (illustrative, not calibrated to real data)
def contamination_risk(discharge, flushing_days, decay_rate):
    return discharge * flushing_days * np.exp(-decay_rate * flushing_days)

# Nominal values and plausible ranges for each parameter
params = {
    "discharge":     {"nominal": 50,  "range": (20, 80)},    # kg/day
    "flushing_days": {"nominal": 5,   "range": (2, 12)},     # days
    "decay_rate":    {"nominal": 0.3, "range": (0.1, 0.6)},  # 1/day
}

# --- One-at-a-time (USIM-style) sensitivity ---
print("One-at-a-time sensitivity (output range when only this parameter varies):")
oat_ranges = {}
for name, spec in params.items():
    outputs = []
    for val in np.linspace(*spec["range"], 50):
        kwargs = {k: v["nominal"] for k, v in params.items()}
        kwargs[name] = val
        outputs.append(contamination_risk(**kwargs))
    oat_ranges[name] = max(outputs) - min(outputs)
    print(f"  {name:15s} output range = {oat_ranges[name]:8.1f}")

print(f"\\nOAT priority for uncertainty reduction (highest impact first): "
      f"{sorted(oat_ranges, key=oat_ranges.get, reverse=True)}")

# --- Modern complement: Monte Carlo variance-based sensitivity ---
# Samples all parameters jointly; each parameter's correlation with the
# output is used here as a simplified proxy for a first-order Sobol index.
n = 20_000
samples = {name: np.random.uniform(*spec["range"], n) for name, spec in params.items()}
outputs = contamination_risk(**samples)

print("\\nMonte Carlo variance-based sensitivity (approx. first-order share):")
for name in params:
    corr = np.corrcoef(samples[name], outputs)[0, 1]
    print(f"  {name:15s} approx. variance share = {corr**2:.1%}")
`
},

{
  id: 'risk-filtering-ranking-management',
  title: '06 - Risk Filtering, Ranking, and Management (RFRM)',
  description: 'An eight-phase funnel — developed by Haimes, Kaplan, and Lambert — for going from hundreds of HHM-identified scenarios to the handful worth full quantitative treatment.',
  language: Language.PYTHON,
  category: "Risk & Decision Analysis",
  level: "Advanced",
  createdAt: "2026-07-21",
  image: "/images/tutorials/risk-filtering-ranking.jpg",
  content: `
<p>
Tutorial 03's HHM tree does its job well — often too well. Decompose a real
system from several overlapping viewpoints and you don't get a tidy handful of
scenarios, you get hundreds. Running a full quantitative risk assessment (the
kind built in Tutorials 01 and 02) on every single one isn't just impractical,
it's the wrong use of scarce analytical effort. Risk Filtering, Ranking, and
Management (RFRM) — developed by Haimes, Kaplan, and Lambert — is the funnel
that decides which few scenarios actually earn that effort.
</p>

<hr>

<h2>What came before RFRM</h2>

<p>
Comparative risk assessment in the 1990s (the tradition behind the EPA-era
"Comparing Risks" studies) had already established that risks could be ranked
against each other using simplified, often qualitative criteria rather than
full quantification of each one individually. RFRM's contribution was to make
that ranking process itself systematic and repeatable, and to wire it directly
into HHM's scenario tree rather than treating scenario identification and
scenario ranking as separate exercises.
</p>

<hr>

<h2>The eight phases</h2>

<ol>
  <li><strong>Scenario identification.</strong> Build the HHM tree describing
  the system's intended, "as planned" success scenario — this is Tutorial 03,
  reused directly as the starting point.</li>
  <li><strong>Scenario filtering.</strong> Narrow the tree to the scenarios
  that actually fall within the current decision-maker's responsibility and
  authority. A coastal water-quality manager can act on a discharge permit
  violation; they usually can't act on an upstream nation's agricultural
  policy, however real that risk is.</li>
  <li><strong>Bi-criteria filtering and ranking.</strong> Score what's left on
  two criteria at once — typically likelihood and consequence — using a simple
  ordinal scale, and cut anything that doesn't clear a minimum bar on both.</li>
  <li><strong>Multi-criteria evaluation.</strong> Add further criteria beyond
  the first two — detectability, manageability, cost of mitigation, public
  visibility — to refine the surviving list further.</li>
  <li><strong>Quantitative ranking.</strong> Where the scenario justifies it,
  move from ordinal scores toward genuinely quantitative likelihood and
  consequence estimates, incorporating how resilient, robust, and redundant
  the system already is against that scenario.</li>
  <li><strong>Risk management.</strong> For the scenarios that made it this
  far, identify concrete management options and estimate each one's cost,
  performance benefit, and risk reduction — this is exactly the decision-tree
  and trade-off machinery from Tutorials 02 and 04, now pointed at a
  short, prioritized list instead of one scenario picked in advance.</li>
  <li><strong>Safeguarding against missing critical items.</strong> Go back and
  check the options chosen in Phase VI against everything filtered <em>out</em>
  in Phases II–V. Filtering is meant to defer attention, not permanently
  discard it — this phase exists specifically to catch a scenario that was cut
  too early.</li>
  <li><strong>Operational feedback.</strong> Feed real operating experience
  back into the filtering and ranking criteria — and back into the HHM tree
  itself — so the whole funnel improves the next time it's used.</li>
</ol>

<p>
Haimes, Kaplan, and Lambert were explicit that these eight phases describe a
philosophy, not a mechanical algorithm to run once and forget: filtering is a
precursor to considering the full set of risk scenarios, never a substitute for
it. Their own case study applied the framework to operations other than
war — a deliberately different domain from anything earlier in this series, to
show the funnel doesn't care what kind of system it's filtering.
</p>

<hr>

<h2>How this is done today</h2>

<ul>
  <li>
    <strong>Risk matrices</strong> — the 5×5 likelihood-consequence heat map
    used across almost every industry's risk register today is Phase III's
    bi-criteria filtering, essentially unchanged, just given a standard visual
    form.
  </li>
  <li>
    <strong>MCDA software</strong> — Phase IV's multi-criteria evaluation is
    formalized today with the same weighted-scoring and AHP-style tools already
    covered in Tutorial 02's decision-matrix section, replacing ad hoc scoring
    with an auditable weighting scheme.
  </li>
  <li>
    <strong>GRC platforms</strong> — enterprise risk-management software turns
    Phases I–VI into a living database rather than a one-time study, and treats
    Phase VIII's feedback loop as a standing review cycle instead of an
    afterthought.
  </li>
  <li>
    <strong>Automated first-pass triage</strong> — when the candidate list runs
    into the hundreds or thousands (pulled from incident logs, anomaly
    detection on monitoring data, or an LLM-assisted HHM brainstorm per
    Tutorial 03), clustering or anomaly-scoring models increasingly do a first
    filtering pass before a human analyst applies Phase IV's multi-criteria
    judgment — the same funnel, with a faster first stage.
  </li>
  <li>
    <strong>Phase VII has a direct modern analog</strong> in independent review
    or red-teaming processes built specifically to re-examine what an automated
    or preliminary filter discarded, rather than trusting the first pass by
    default.
  </li>
</ul>

<hr>

<h2>A worked filter: from thirteen scenarios to a short list</h2>

<p>
The snippet below runs Phases III–V on the risk register built in Tutorial 03.
It scores every item on likelihood and consequence (Phase III), cuts anything
below a threshold, then layers on manageability and detectability (Phase IV) to
produce a final priority ranking (Phase V) — the short list that would move on
to the full quantitative treatment from Tutorials 01 and 02.
</p>

<hr>

<h2>Limitations to keep in mind</h2>

<ul>
  <li><strong>Ordinal scores hide real disagreement</strong> — two reviewers
  rarely agree on whether something is a "3" or a "4"; without a shared rubric,
  bi-criteria filtering just moves subjectivity earlier in the process instead
  of removing it.</li>
  <li><strong>Filtering can systematically underweight low-likelihood, high
  consequence scenarios</strong> — a naive multiplicative score treats a 1%
  chance of catastrophe the same as a 50% chance of a minor issue whenever the
  product happens to match, which is precisely the failure mode Tutorial 07
  in this series (extreme events and the fallacy of expected value) exists to
  correct.</li>
  <li><strong>Phase VII is easy to skip and expensive to skip</strong> — under
  time pressure, the "go back and check what you filtered out" step is the one
  most likely to be dropped, and the one whose absence is hardest to notice
  until something filtered out early turns out to matter.</li>
</ul>

<p>
<strong>Key principle:</strong> filtering exists to allocate scarce analytical
attention, not to make a risk disappear. Everything cut in Phases II–V is still
real — it's just been deferred, and Phase VII exists to make sure "deferred"
doesn't quietly become "forgotten."
</p>
`,
  codeSnippet: `
# Risk register carried over from Tutorial 03's HHM tree
register = [
    "Wastewater treatment plant bypass", "Industrial discharge",
    "Marina / vessel waste", "Agricultural runoff", "Urban stormwater",
    "Low flushing / tidal exchange", "Heavy rainfall events",
    "Sea-level rise altering circulation", "Sparse in-situ sampling network",
    "Satellite revisit / cloud-cover gaps", "Sensor drift / calibration lag",
    "Delayed inter-agency data sharing", "Enforcement gaps on discharge permits",
]

# --- Phase III: Bi-criteria filtering (likelihood x consequence, 1-5 ordinal) ---
# Illustrative scores a manager might assign during a filtering workshop
likelihood = {
    "Wastewater treatment plant bypass": 3, "Industrial discharge": 2,
    "Marina / vessel waste": 2, "Agricultural runoff": 4, "Urban stormwater": 4,
    "Low flushing / tidal exchange": 3, "Heavy rainfall events": 4,
    "Sea-level rise altering circulation": 2, "Sparse in-situ sampling network": 3,
    "Satellite revisit / cloud-cover gaps": 3, "Sensor drift / calibration lag": 2,
    "Delayed inter-agency data sharing": 3, "Enforcement gaps on discharge permits": 2,
}
consequence = {
    "Wastewater treatment plant bypass": 5, "Industrial discharge": 4,
    "Marina / vessel waste": 2, "Agricultural runoff": 3, "Urban stormwater": 3,
    "Low flushing / tidal exchange": 3, "Heavy rainfall events": 3,
    "Sea-level rise altering circulation": 4, "Sparse in-situ sampling network": 3,
    "Satellite revisit / cloud-cover gaps": 2, "Sensor drift / calibration lag": 2,
    "Delayed inter-agency data sharing": 3, "Enforcement gaps on discharge permits": 3,
}

bi_criteria_score = {item: likelihood[item] * consequence[item] for item in register}

THRESHOLD = 10
survivors = {item: s for item, s in bi_criteria_score.items() if s >= THRESHOLD}

print(f"Phase III filtered {len(register)} scenarios down to {len(survivors)}:")
for item, s in sorted(survivors.items(), key=lambda kv: -kv[1]):
    print(f"  {item:38s} bi-criteria score = {s}")

# --- Phase IV: Multi-criteria evaluation on the survivors ---
# manageability / detectability, 1 (hard) to 5 (easy); default to neutral (3)
manageability = {"Wastewater treatment plant bypass": 4, "Industrial discharge": 3,
                  "Agricultural runoff": 2, "Urban stormwater": 2,
                  "Heavy rainfall events": 1, "Sea-level rise altering circulation": 1}
detectability = {"Wastewater treatment plant bypass": 4, "Industrial discharge": 3,
                  "Agricultural runoff": 2, "Urban stormwater": 3,
                  "Heavy rainfall events": 5, "Sea-level rise altering circulation": 2}

# Phase V priority favors high likelihood x consequence that is ALSO
# hard to manage and hard to detect — those need attention first
priority = {
    item: bi_criteria_score[item]
          * (6 - manageability.get(item, 3))
          * (6 - detectability.get(item, 3))
    for item in survivors
}

print("\\nPhase V priority ranking (candidates for full quantitative treatment):")
for item, p in sorted(priority.items(), key=lambda kv: -kv[1]):
    print(f"  {item:38s} priority = {p}")
`
},

{
  id: 'extreme-events-pmrm',
  title: '07 - Risk of Extreme Events and the Fallacy of Expected Value',
  description: 'Why two policies with nearly identical expected damage can hide wildly different catastrophic-tail risk — and the Partitioned Multiobjective Risk Method (PMRM) built to expose it.',
  language: Language.PYTHON,
  category: "Risk & Decision Analysis",
  level: "Advanced",
  createdAt: "2026-07-22",
  image: "/images/tutorials/extreme-events-pmrm.jpg",
  content: `
<p>
Tutorial 04's Surrogate Worth Trade-off method quietly assumed each objective
could be summarized by a single number before trading it off against another.
For a damage or loss distribution, the obvious single number is its expected
value — and this chapter's entire argument is that this obvious choice is a
trap. Two designs can share almost identical expected damage while one of them
hides a catastrophic tail the other doesn't have. Averaging is exactly the
operation that erases that difference.
</p>

<hr>

<h2>The fallacy, stated plainly</h2>

<p>
Expected value is a probability-weighted average across an entire outcome
distribution. That's precisely the problem: a design with a small chance of
routine, moderate damage and a design with a much smaller chance of
catastrophic damage can be engineered to produce the <em>same</em> expected
value, because averaging doesn't care how the probability mass is arranged
across the outcome range — only where its center of mass ends up. No
decision-maker actually treats those two designs as equivalent, yet a
comparison based on expected value alone reports them as identical.
</p>

<hr>

<h2>The Partitioned Multiobjective Risk Method (PMRM)</h2>

<p>
Haimes' fix is direct: stop collapsing the whole damage distribution into one
number. Instead, partition the probability axis into regimes and compute a
separate conditional expected value within each one. The standard version uses
three regimes:
</p>

<ul>
  <li><strong>High-exceedance, low-consequence</strong> — the routine,
  everyday range of outcomes.</li>
  <li><strong>Intermediate-exceedance, intermediate-consequence</strong> — the
  middle ground.</li>
  <li><strong>Low-exceedance, high-consequence (LE/HC)</strong> — the extreme
  tail: rare, but severe when it happens.</li>
</ul>

<p>
Each regime gets its own conditional expected-value function, conventionally
labeled:
</p>

<ul>
  <li><code>f2</code> — conditional expected damage in the high-probability,
  low-consequence regime.</li>
  <li><code>f3</code> — conditional expected damage in the intermediate regime.</li>
  <li><code>f4</code> — conditional expected damage in the low-probability,
  high-consequence (extreme-event) regime — the number ordinary expected value
  quietly buries.</li>
  <li><code>f5</code> — the ordinary, unconditional expected value, kept
  explicitly for comparison against <code>f2</code>–<code>f4</code>, not as a
  replacement for them.</li>
</ul>

<p>
Because these are now several distinct numbers instead of one, they become
several distinct objectives — Tutorial 04's trade-off machinery applies
directly. A decision-maker can trade "minimize routine cost" against "minimize
extreme-event exposure" explicitly, instead of trusting a single blended figure
to represent both at once.
</p>

<hr>

<h2>A deliberately unresolved question: where does "extreme" begin?</h2>

<p>
The boundary between the intermediate and extreme regimes is a modeling choice,
not a fact of nature — and <code>f4</code> turns out to be genuinely sensitive
both to where that boundary is drawn and to which distribution is assumed for
the tail. Haimes and later researchers studied this sensitivity directly,
looking for distribution-free bounds on <code>f4</code> so the result wouldn't
depend too heavily on an arbitrary distributional assumption about a region of
the data where, by definition, observations are scarce.
</p>

<hr>

<h2>The dam-failure illustration</h2>

<p>
Haimes' own worked example applies PMRM to dam-failure and extreme-flood risk,
comparing engineering or operating policies not just on expected annual
damage, but explicitly on <code>f4</code> — their conditional exposure to the
extreme-event tail. Two designs with nearly identical expected annual damage
can differ sharply in that tail exposure, which is exactly the distinction an
expected-value-only comparison would have missed entirely.
</p>

<hr>

<h2>How this is done today</h2>

<ul>
  <li>
    <strong>Conditional Value at Risk (CVaR) / Expected Shortfall</strong> —
    today's standard financial risk metric is <code>f4</code>, formalized and
    standardized: the expected loss conditional on being beyond a given
    quantile threshold. It's now embedded directly in banking regulation
    precisely because regulators learned the same lesson Haimes was making
    here — an institution's average expected loss says nothing about how bad
    its worst case actually is.
  </li>
  <li>
    <strong>Extreme Value Theory (EVT)</strong> — rather than assuming one
    distribution shape across the whole outcome range and computing a
    conditional tail expectation from it, EVT (the Generalized Pareto
    Distribution, peaks-over-threshold methods) fits a distribution
    specifically to the tail observations beyond a threshold — a direct answer
    to the "f4 is sensitive to the assumed distribution" problem flagged
    above.
  </li>
  <li>
    <strong>Dam and floodplain engineering</strong> now routinely reports an
    expected annual damage figure <em>and</em> a separate "100-year" or
    "500-year event" tail metric side by side — <code>f5</code> next to
    <code>f4</code>, standard practice today rather than a novel proposal.
  </li>
  <li>
    <strong>PMRM itself has traveled well beyond water resources</strong> —
    it's been applied to portfolio selection in finance, where researchers
    found its <code>f4</code> measure a more informative risk signal than
    ordinary volatility specifically under extreme market conditions. The
    average-versus-tail distinction keeps reappearing outside engineering
    entirely, under different names.
  </li>
</ul>

<hr>

<h2>A worked comparison: two policies, similar average, different tail</h2>

<p>
The snippet below simulates two synthetic flood-protection policies with
nearly identical ordinary expected damage (<code>f5</code>), then partitions
each into a routine regime and a 5%-probability extreme-event tail to compute
<code>f4</code>. Watch how close the two policies' <code>f5</code> values stay
compared to how far apart their <code>f4</code> values end up — that gap is
exactly what expected value alone would have hidden.
</p>

<hr>

<h2>Limitations to keep in mind</h2>

<ul>
  <li><strong>The tail is where you have the least data</strong> — by
  construction, the LE/HC regime is defined by scarcity of observations, which
  is exactly why <code>f4</code> is so sensitive to distributional assumptions
  in the first place.</li>
  <li><strong>Choosing the partition boundary is itself a decision</strong> —
  moving the threshold that defines "extreme" changes <code>f4</code>,
  sometimes substantially. Report the sensitivity, not just the point
  estimate.</li>
  <li><strong>More objectives means SWT-style trade-off work isn't optional</strong>
  — once <code>f2</code>, <code>f3</code>, and <code>f4</code> are separate
  objectives, someone still has to decide how much extreme-event exposure is
  worth trading off against routine cost. PMRM surfaces that decision; it
  doesn't make it for you.</li>
</ul>

<p>
<strong>Key principle:</strong> whenever a single expected value is used to
compare two risky alternatives, ask what it's averaging over — and specifically,
what it's averaging away.
</p>
`,
  codeSnippet: `
import numpy as np

rng = np.random.default_rng(42)

# Two flood-protection design policies, simulated as annual damage
# distributions (illustrative, not calibrated to a real site).
# Built to have nearly identical ORDINARY expected damage (f5)...
n = 200_000
damage_A = rng.lognormal(mean=1.95, sigma=0.6, size=n)
damage_B = np.where(rng.random(n) < 0.995,
                     rng.lognormal(mean=1.85, sigma=0.4, size=n),   # ...but B trades
                     rng.lognormal(mean=5.5, sigma=0.5, size=n))    # a fatter, rarer tail

def pmrm_partition(damage, tail_prob=0.05):
    """Partition into a routine regime and an extreme (LE/HC) tail regime.
    Returns f5 (ordinary expected value) and f4 (conditional expected
    value within the extreme-event tail)."""
    threshold = np.quantile(damage, 1 - tail_prob)
    tail_mask = damage >= threshold
    f5 = damage.mean()                     # ordinary, unconditional expected value
    f4 = damage[tail_mask].mean()          # conditional expectation, extreme regime
    f23 = damage[~tail_mask].mean()        # conditional expectation, everything else
    return f5, f4, f23

for name, damage in [("Policy A", damage_A), ("Policy B", damage_B)]:
    f5, f4, f23 = pmrm_partition(damage, tail_prob=0.05)
    print(f"{name}: f5 (ordinary E) = {f5:6.2f}   "
          f"f4 (extreme-event conditional E) = {f4:7.2f}   "
          f"routine-regime E = {f23:6.2f}")
`
},

{
  id: 'multiobjective-decision-trees',
  title: '08 - Multiobjective Decision-Tree Analysis',
  description: 'Why gathering more information before deciding can reshape the entire noninferior set — a phenomenon with no equivalent in an ordinary, single-objective decision tree.',
  language: Language.PYTHON,
  category: "Risk & Decision Analysis",
  level: "Advanced",
  createdAt: "2026-07-23",
  image: "/images/tutorials/multiobjective-decision-trees.jpg",
  content: `
<p>
This tutorial is where three earlier ones converge. Tutorial 02 built a
decision tree that folds back to a single expected value. Tutorial 04 showed
that when objectives genuinely conflict, there's no single best point — only a
noninferior frontier. Tutorial 07 showed that even one objective, like damage,
often needs two numbers instead of one: an ordinary expected value and a
conditional expectation of its extreme-event tail. Multiobjective
decision-tree analysis — introduced by Haimes, Li, and Tulsiani, extending
Howard Raiffa's classical single-objective tree — is what happens when you
stop pretending any of that collapses to one number at each node.
</p>

<hr>

<h2>Why the rollback itself has to change</h2>

<p>
An ordinary decision tree folds back through simple backward induction: at a
chance node, replace the branch with its expected value; at a decision node,
keep only the branch with the best expected value and discard the rest. That
works because at every node, there's a single scalar to compare.
</p>

<p>
Once a leaf carries a <em>vector</em> of objectives instead of one number, the
chance-node step still works — you take a probability-weighted, component-wise
expectation across each objective separately. But the decision-node step
breaks: you generally can't say which branch's vector "wins" unless one branch
strictly dominates every other branch in every objective simultaneously. Most
of the time, none does.
</p>

<hr>

<h2>The structural difference, stated precisely</h2>

<p>
A single-objective tree collapses to one optimal path, because dominated
branches can be discarded immediately at every node. A multiobjective tree
cannot do that — it has to carry forward the entire set of noninferior vector
outcomes at each node, because discarding a branch too early might throw away
a point that would have been noninferior once combined with what happens
further up the tree. The output of the whole exercise isn't a single decision
path — it's a noninferior frontier of feasible strategies, and picking a point
on it is deferred to the decision-maker, exactly as in Tutorial 04.
</p>

<hr>

<h2>The flood-warning example, and an unexpected finding</h2>

<p>
Haimes, Li, and Tulsiani's original worked example is a flood-warning system,
tracking two noncommensurate objectives — loss of life and loss of property,
including the monitoring system's own cost — with each objective further split
into its ordinary expected value and, per Tutorial 07, its conditional
expected value under extreme and catastrophic flooding.
</p>

<p>
Their most interesting result has no equivalent in the single-objective case:
a decision about whether to gather more information before acting — install
the monitoring system or not — doesn't just refine an existing expected-value
number. It can change the entire shape of the noninferior solution set,
introducing genuinely new noninferior alternatives that weren't reachable
without that information. In a single-objective tree, the classical
value-of-information result says more information can only help, or leave the
expected value unchanged, never hurt. In the multiobjective case, "helping"
isn't a single number moving — it's the frontier itself gaining a new point.
</p>

<hr>

<h2>How this is done today</h2>

<ul>
  <li>
    <strong>Multi-objective decision trees (MODT) paired with MCDA weighting</strong>
    — recent applications (for instance, in climate-driven resettlement
    planning) still build directly on Chankong and Haimes' original
    noninferior-set theory, generating the Pareto frontier through the tree and
    then applying a weighting method such as fuzzy TOPSIS to help a
    decision-maker select a final point — a modern, more systematic version of
    Tutorial 04's surrogate-worth elicitation.
  </li>
  <li>
    <strong>Multi-objective reinforcement learning and vector-valued MDPs</strong>
    — for sequential decisions too large to enumerate as an explicit tree,
    today's computational descendant tracks a Pareto set of value vectors
    through a Markov decision process instead of a hand-drawn tree, but the
    underlying idea — carry the noninferior set forward, don't collapse to one
    number early — is unchanged.
  </li>
</ul>

<hr>

<h2>A worked tree: does monitoring earn its cost?</h2>

<p>
The snippet below builds a small two-stage version of the Coastal Manager's
Dilemma: first, decide whether to invest in an early-warning monitoring system;
then, either commit to a fixed action in advance, or — if monitoring was
installed — respond contingently once it reports whether an event is
occurring. Two objectives are tracked throughout: economic cost and public-health
risk. Notice that all three resulting strategies turn out to be noninferior —
monitoring doesn't just improve an existing option, it adds a genuinely new one
to the frontier.
</p>

<hr>

<h2>Limitations to keep in mind</h2>

<ul>
  <li><strong>The noninferior set can grow combinatorially</strong> — every
  additional decision or chance node multiplies the surviving set of vector
  outcomes, unlike scalar backward induction, which stays a fixed size at every
  node.</li>
  <li><strong>Perfect monitoring is a simplification</strong> — the example
  below assumes the warning is never wrong. A real early-warning system has
  false positives and false negatives, which would need their own probability
  model layered on top before the numbers could be trusted.</li>
  <li><strong>A frontier still isn't a decision</strong> — as in Tutorial 04,
  something still has to choose a point on it once the tree is folded back.</li>
</ul>

<p>
<strong>Key principle:</strong> "should we gather more information before
deciding" is itself a genuinely multiobjective question. Its value doesn't
show up as one number getting better — it can show up as an entirely new,
previously unreachable option appearing on the frontier.
</p>
`,
  codeSnippet: `
# Same hazard probability used throughout this series
p_event = 0.18

# Two noncommensurate objectives per leaf: economic cost, public-health risk
leaf = {
    ("closed",):          {"cost": 8.0,  "risk": 0.5},
    ("open", "event"):    {"cost": 15.0, "risk": 20.0},
    ("open", "no_event"): {"cost": -2.0, "risk": 1.0},
}

def strategy_always(action):
    """A fixed, non-contingent strategy applied regardless of the outcome."""
    if action == "closed":
        return leaf[("closed",)]
    ev_cost = (p_event * leaf[("open", "event")]["cost"]
               + (1 - p_event) * leaf[("open", "no_event")]["cost"])
    ev_risk = (p_event * leaf[("open", "event")]["risk"]
               + (1 - p_event) * leaf[("open", "no_event")]["risk"])
    return {"cost": ev_cost, "risk": ev_risk}

def strategy_monitored(monitor_cost=3.0):
    """An 'experimentation' decision: pay for monitoring, then act
    contingently on the (here, assumed perfect) warning it provides."""
    warned_outcome   = leaf[("closed",)]                 # close when warned
    unwarned_outcome = leaf[("open", "no_event")]        # stay open otherwise
    ev_cost = (monitor_cost + p_event * warned_outcome["cost"]
               + (1 - p_event) * unwarned_outcome["cost"])
    ev_risk = (p_event * warned_outcome["risk"]
               + (1 - p_event) * unwarned_outcome["risk"])
    return {"cost": ev_cost, "risk": ev_risk}

candidates = {
    "Always closed":         strategy_always("closed"),
    "Always open":           strategy_always("open"),
    "Monitor, then respond": strategy_monitored(),
}

def is_dominated(a, b):
    """True if point b dominates point a on both objectives (minimize both)."""
    return (b["cost"] <= a["cost"] and b["risk"] <= a["risk"]
            and (b["cost"] < a["cost"] or b["risk"] < a["risk"]))

print("Noninferior (Pareto) set over {cost, health risk}:")
for name, point in candidates.items():
    dominated = any(is_dominated(point, other)
                     for other_name, other in candidates.items() if other_name != name)
    tag = "  <- dominated, drop it" if dominated else "  <- noninferior"
    print(f"  {name:24s} cost={point['cost']:6.2f}  risk={point['risk']:6.2f}{tag}")
`
},

{
  id: 'multiobjective-risk-impact-analysis',
  title: '09 - Multiobjective Risk Impact Analysis: Closing the Loop',
  description: 'How Haimes and Leach combined PMRM with multistage impact analysis into MRIAM — and why every tool in this series turns out to be one stage of a single, larger picture.',
  language: Language.PYTHON,
  category: "Risk & Decision Analysis",
  level: "Advanced",
  createdAt: "2026-07-24",
  image: "/images/tutorials/multiobjective-risk-impact.jpg",
  content: `
<p>
Every tutorial in this series so far has quietly treated a decision as a
single moment: score the risk (01), fold a tree (02), find a compromise on a
frontier (04), split the extreme-event tail out from the average (07), carry a
noninferior set through a sequence of choices (08). This chapter is where
Haimes, with Leach and Gomide, asks the obvious next question: what happens
across the <em>next several</em> stages, once this decision's consequences
start propagating?
</p>

<hr>

<h2>Impact analysis: the trade-off itself can move</h2>

<p>
Gomide and Haimes' theoretical basis for this chapter introduces a concept
they call a <strong>stage trade-off</strong> — a genuinely dynamic version of
Tutorial 04's static noninferior frontier. Instead of one frontier fixed for
all time, the trade-off between objectives can shift from one stage or time
period to the next as consequences propagate through the system. The
Multiobjective, Multistage Impact Analysis Method (MMIAM) is the framework
built specifically to track that evolving trade-off, rather than freezing it
at a single snapshot the way every earlier tutorial in this series did.
</p>

<hr>

<h2>Combining PMRM and MMIAM: MRIAM</h2>

<p>
Leach and Haimes then did the obvious pairing: carry PMRM's extreme-event
partitioning (Tutorial 07's <code>f2</code>–<code>f5</code>) through every
stage of MMIAM's impact propagation, rather than computing it once. They
called the result the multiobjective risk-impact analysis method (MRIAM), and
were explicit about why it mattered: decision-makers facing genuinely extreme
risk and uncertainty are often less interested in finding the mathematically
optimal strategy than in identifying which strategies they should clearly rule
out. That's a real shift in posture — from optimizing an objective toward
eliminating the unacceptable — and it echoes the minimax-regret rule from
Tutorial 02 more than it echoes expected-value maximization.
</p>

<hr>

<h2>Relating multiobjective decision trees to MRIAM</h2>

<p>
The book's own closing move in this part is to show that MRIAM's multistage
impact propagation can be represented directly as the multiobjective decision
tree from Tutorial 08: each stage becomes another layer of chance and decision
nodes, and PMRM's extreme-event measure gets carried through the tree as one
of the tracked objective components at <em>every</em> stage — not computed
once at the end, after the fact.
</p>

<p>
Zoom out, and this chapter is really the whole series closing its own loop:
HHM (Tutorial 03) finds what can go wrong; RFRM (Tutorial 06) filters which of
those scenarios deserve full attention; PMRM (Tutorial 07) gives each
surviving scenario both an ordinary and an extreme-event risk measure;
multiobjective decision trees (Tutorial 08) structure the choices around them;
and MRIAM is what you get when you stop assuming any of that happens only
once.
</p>

<hr>

<h2>How this is done today</h2>

<ul>
  <li>
    <strong>Dynamic adaptive policy pathways</strong> — long-horizon coastal
    and water-infrastructure planning today explicitly models how risk and the
    menu of available options change stage by stage across a multi-decade
    planning horizon, revisiting the plan at pre-specified trigger points
    rather than committing once. It's a direct, now-standard descendant of
    MMIAM's stage trade-off.
  </li>
  <li>
    <strong>Multi-period CVaR</strong> — Rockafellar and Uryasev's Conditional
    Value-at-Risk portfolio framework, the same modern formalization of
    PMRM's <code>f4</code> mentioned in Tutorial 07, has itself been extended
    into dynamic, multi-period versions for exactly the reason MRIAM extended
    PMRM: a snapshot tail-risk measure isn't enough once exposure plays out
    over many periods.
  </li>
  <li>
    <strong>Robust decision-making and scenario discovery</strong> — long-term
    policy planning today often searches a large space of future scenarios
    specifically for the ones that make a candidate strategy fail badly, rather
    than searching for the single optimal strategy. That's Leach and Haimes'
    "what not to do" framing, made computational.
  </li>
</ul>

<hr>

<h2>A worked two-stage tree: when a first hit lowers resilience</h2>

<p>
The snippet below extends Tutorial 08's single-stage tree to two years. If a
contamination event occurs in year one, the ecosystem's reduced resilience
(Tutorial 05's stability property) is modeled as raising <em>both</em> year
two's hazard probability and its baseline consequences — impact propagating
forward, exactly what MMIAM is built to represent. Compare the actual
worst-case (both years hit) against what you'd have naively predicted by just
doubling year one's extreme-event number: the propagation effect makes the
real worst case meaningfully higher than that naive estimate.
</p>

<hr>

<h2>Limitations to keep in mind</h2>

<ul>
  <li><strong>Every added stage multiplies the path count</strong> — the same
  combinatorial growth flagged in Tutorial 08 applies here, now across time
  periods as well as decisions.</li>
  <li><strong>The propagation model is itself an assumption</strong> — how much
  a first hit degrades second-stage resilience is exactly the kind of
  parameter Tutorial 05's uncertainty and sensitivity analysis should be
  pointed at before it's trusted.</li>
  <li><strong>This is still a model of a model</strong> — MRIAM formalizes
  <em>how</em> to track propagating, multiobjective risk. It doesn't supply the
  actual propagation mechanism for your system; that still has to come from
  domain knowledge.</li>
</ul>

<p>
<strong>Key principle:</strong> a risk assessment done at a single point in
time is a photograph of a process that keeps moving. The moment a first bad
outcome can change the odds or the stakes of the next one, the photograph
stops being enough — you need the film.
</p>
`,
  codeSnippet: `
# Stage 1: same hazard as Tutorial 08's "always open" baseline
p_event_1 = 0.18
leaf_1 = {
    "event":    {"cost": 15.0, "risk": 20.0},
    "no_event": {"cost": -2.0, "risk": 1.0},
}

def stage_2(prior_event):
    """Stage 2's hazard AND consequences both worsen if Stage 1 had an
    event — reduced ecosystem resilience, the impact propagation MMIAM
    is built to track."""
    if prior_event:
        p_event_2 = 0.30
        leaf_2 = {"event": {"cost": 22.0, "risk": 28.0},
                  "no_event": {"cost": 0.0, "risk": 3.0}}
    else:
        p_event_2 = 0.18
        leaf_2 = {"event": {"cost": 15.0, "risk": 20.0},
                  "no_event": {"cost": -2.0, "risk": 1.0}}
    return p_event_2, leaf_2

# Enumerate all four two-stage paths with joint probability and cumulative impact
paths = []
for e1, p1 in [("event", p_event_1), ("no_event", 1 - p_event_1)]:
    p_event_2, leaf_2 = stage_2(prior_event=(e1 == "event"))
    for e2, p2 in [("event", p_event_2), ("no_event", 1 - p_event_2)]:
        joint_p = p1 * p2
        paths.append({
            "path": f"{e1} -> {e2}",
            "p": joint_p,
            "cost": leaf_1[e1]["cost"] + leaf_2[e2]["cost"],
            "risk": leaf_1[e1]["risk"] + leaf_2[e2]["risk"],
        })

ev_cost = sum(p["p"] * p["cost"] for p in paths)
ev_risk = sum(p["p"] * p["risk"] for p in paths)
print(f"Two-stage ordinary expected value: cost={ev_cost:.2f}  risk={ev_risk:.2f}")

# PMRM-style extreme-event regime: the single worst path by cumulative risk
worst = max(paths, key=lambda p: p["risk"])
print(f"Extreme-event path '{worst['path']}' (p={worst['p']:.1%}): "
      f"cost={worst['cost']:.2f}  risk={worst['risk']:.2f}")

naive_worst_risk = leaf_1["event"]["risk"] * 2
print(f"\\nNaive (no-propagation) estimate of worst-case risk: {naive_worst_risk:.2f}")
print(f"Actual worst-case risk with resilience loss propagated: {worst['risk']:.2f}")

print("\\nAll paths:")
for p in paths:
    print(f"  {p['path']:22s} p={p['p']:.3f}  cost={p['cost']:6.2f}  risk={p['risk']:6.2f}")
`
},

{
  id: 'statistics-of-extremes-pmrm',
  title: '10 - Statistics of Extremes: Extending the PMRM',
  description: 'Two answers to f4\'s biggest weakness — a formal extreme-value-theory approximation, and a distribution-free bound — plus what it takes to estimate risk beyond anything you\'ve actually observed.',
  language: Language.PYTHON,
  category: "Risk & Decision Analysis",
  level: "Advanced",
  createdAt: "2026-07-25",
  image: "/images/tutorials/statistics-of-extremes.jpg",
  content: `
<p>
Tutorial 07 left <code>f4</code> — PMRM's conditional expectation of the
extreme-event tail — with an honest weakness: it's sensitive both to where the
LE/HC boundary is drawn and to which distribution gets assumed for the tail.
This chapter, and the decade of research behind it, is Haimes and colleagues'
direct answer to that weakness, worked out in two genuinely different ways.
</p>

<hr>

<h2>The statistics of extremes, briefly</h2>

<p>
Classical extreme value theory studies what happens to the maximum of a
growing sample as the sample size increases. Regardless of the underlying
distribution (under fairly mild conditions), the properly rescaled maximum
converges to one of three families — historically called Type I (Gumbel),
Type II (Fréchet), and Type III (Weibull), today unified as the single
Generalized Extreme Value (GEV) distribution. Mitsiopoulos, Haimes, and Li
used this to derive an analytic approximation for <code>f4</code> directly
from whichever extreme-value type applies — and confirmed it held up across
normal, Gumbel, Weibull, Pareto, lognormal, and uniform underlying
distributions. You don't need to know the exact parent distribution, only
which of three basins of attraction it falls into — a considerably weaker
requirement.
</p>

<hr>

<h2>Assessing the tail separately from the body</h2>

<p>
A companion line of this research made an explicit methodological case: the
tail of a distribution can, and often should, be assessed separately from its
central values, rather than fitting one global distribution and reading the
tail off the same curve used to describe everyday outcomes. The mechanisms
producing a genuinely extreme event are often different in kind from the
mechanisms producing ordinary variation, and a distribution chosen to fit the
bulk of the data has no particular reason to also be correct out in the tail.
</p>

<hr>

<h2>How sensitive is the approximation itself?</h2>

<p>
Having an analytic form for <code>f4</code> doesn't end the conversation —
Romei, Haimes, and Li's follow-up work turned Tutorial 05's sensitivity
toolkit specifically on <code>f4</code>: how much does the estimate move when
the extreme-regime boundary shifts, or when the fitted tail parameters carry
their own uncertainty? An extreme-event risk number without a sensitivity
analysis attached to it is exactly the kind of false precision Tutorial 05
warned about.
</p>

<hr>

<h2>The distribution-free alternative</h2>

<p>
Mitsiopoulos and Haimes' complementary contribution takes the opposite
philosophy: instead of committing to any parametric family — even one as
weakly specified as "which of three extreme-value types" — derive bounds on
<code>f4</code> that hold across broad classes of distributions. It's a
trade: a looser estimate, in exchange for not needing to get the distributional
family right at all. Where data is genuinely too scarce to justify a specific
tail model, that trade is often the honest one to make.
</p>

<hr>

<h2>How this is done today</h2>

<ul>
  <li>
    <strong>Peaks-over-threshold (POT) with the Generalized Pareto
    Distribution (GPD)</strong> is the standard operational form of "assess the
    tail separately" today, used across hydrology, insurance, and finance:
    declare a high threshold, fit a GPD to what exceeds it, and use that fit —
    not the whole-dataset distribution — for anything concerning the tail.
  </li>
  <li>
    <strong>Nonstationary extreme value analysis</strong> — the book's own
    research lineage explicitly raised the question of extremes under
    nonstationary conditions in the 1990s. Climate science has since made
    that the normal case rather than the exception: GEV and GPD parameters are
    now routinely allowed to vary with covariates like time or global
    temperature, because assuming a fixed, unchanging hazard distribution is
    no longer considered defensible for design purposes.
  </li>
  <li>
    <strong>Bayesian extreme value analysis</strong> is today's usual
    alternative to a purely distribution-free bound: put a genuine prior over
    the tail's shape parameter, and let the posterior widen automatically in
    exactly the data-scarce regime where a single point estimate would be
    overconfident.
  </li>
</ul>

<hr>

<h2>The real payoff: saying something beyond what you've observed</h2>

<p>
The most useful property of a fitted extreme-value model isn't a smaller
error bar at a threshold you already have data for — it's the ability to say
anything at all about a threshold you don't. The snippet below fits a GPD to
a modest sample's moderate tail, then extrapolates the fitted model out to a
threshold more extreme than anything in the sample. The naive empirical
approach has nothing to offer at that point — no observations, no answer — while
the extrapolated GPD estimate lands in the right neighborhood of a reference
value computed from a vastly larger sample.
</p>

<hr>

<h2>Limitations to keep in mind</h2>

<ul>
  <li><strong>Small tail samples make the shape parameter unstable</strong> —
  fitting a two-parameter GPD to a handful of exceedances can add more
  variance than it removes; the parametric approach's advantage shows up in
  its ability to extrapolate, not automatically in a tighter estimate at
  thresholds you already have data for.</li>
  <li><strong>Extrapolation assumes the extreme-value type doesn't change</strong>
  — nothing guarantees the same tail behavior continues past the largest value
  you've actually seen. That assumption is the whole basis for the
  extrapolation, and it deserves to be stated as an assumption, not a fact.</li>
  <li><strong>Nonstationarity breaks a fitted tail model quietly</strong> — a
  GPD fit to last decade's exceedances describes last decade's hazard. If the
  underlying process is genuinely shifting, that fit doesn't automatically
  update itself.</li>
</ul>

<p>
<strong>Key principle:</strong> the whole point of a statistically grounded
tail model is to have something honest to say about events more extreme than
any you've recorded. If a method can only describe the extremes you've already
observed, it isn't adding anything a plain average couldn't already tell you.
</p>
`,
  codeSnippet: `
import numpy as np
from scipy import stats

rng = np.random.default_rng(0)

# The "true" damage-generating process (unknown to the analyst in practice)
true_dist = stats.lognorm(s=0.6, scale=np.exp(1.95))

# Reference f4 at a genuinely extreme threshold, from an enormous sample --
# stands in for "the real answer," not something available in practice
big_sample = true_dist.rvs(20_000_000, random_state=np.random.default_rng(1))
extreme_threshold = np.quantile(big_sample, 0.999)
true_f4_extreme = big_sample[big_sample > extreme_threshold].mean()

# A realistic field sample: enough for a decent tail fit, but its own
# maximum doesn't reach anywhere near the extreme threshold above
n = 2000
sample = true_dist.rvs(n, random_state=rng)
fit_threshold = np.quantile(sample, 0.95)          # a moderate threshold, in-sample
exceed = sample[sample > fit_threshold] - fit_threshold

print(f"Field sample: n={n}, max observed value = {sample.max():.2f}")
print(f"Extreme threshold of interest: {extreme_threshold:.2f} "
      f"(never observed in this sample)")

# Naive empirical approach: can only average what it actually has
beyond_max = sample[sample > extreme_threshold]
naive = "undefined -- no observations that extreme" if len(beyond_max) == 0 else f"{beyond_max.mean():.2f}"
print(f"Naive empirical f4 at the extreme threshold: {naive}")

# GPD/EVT approach: fit once to the moderate, in-sample tail, then
# extrapolate using the GPD's threshold-stability property (scale grows
# linearly with the threshold; shape stays fixed)
xi, loc, sigma = stats.genpareto.fit(exceed, floc=0)
sigma_at_u = sigma + xi * (extreme_threshold - fit_threshold)
gpd_f4_extreme = extreme_threshold + sigma_at_u / (1 - xi) if xi < 1 else np.nan

print(f"GPD-extrapolated f4 at the extreme threshold: {gpd_f4_extreme:.2f}  "
      f"(fitted shape={xi:.3f}, scale={sigma:.2f})")
print(f"Reference 'true' f4 at that threshold: {true_f4_extreme:.2f}")
`
},

{
  id: 'systems-based-guiding-principles',
  title: '11 - Ten Systems-Based Guiding Principles: Closing the Loop',
  description: 'Haimes\' 2012 distillation of the whole discipline into ten principles, validated against the FAA\'s NextGen system of systems — and, as it turns out, a near-perfect map of everything covered in this series.',
  language: Language.PYTHON,
  category: "Risk & Decision Analysis",
  level: "Intermediate to Advanced",
  createdAt: "2026-07-26",
  image: "/images/tutorials/guiding-principles.jpg",
  content: `
<p>
In 2012, after three decades of methodology — HHM, PMRM, MMIAM, decision
trees, and everything built on top of them — Haimes distilled the whole
discipline down to ten guiding principles, and stress-tested them against one
of the most complex system-of-systems undertakings around: the FAA's Next
Generation Air Transportation System (NextGen) modernization. It's a fitting
place to close this series, because — almost without planning it — each
principle turns out to map onto one of the tutorials already written here.
</p>

<hr>

<h2>The ten principles, and where they already showed up</h2>

<ol>
  <li>
    <strong>Holism is what risk analysis and systems engineering share.</strong>
    Neither discipline means much applied to a component in isolation — both
    only make sense applied to the whole system. (Tutorial 01)
  </li>
  <li>
    <strong>The process has to be systemic and integrated</strong> — treating
    identification, filtering, modeling, deciding, and communicating as
    separate, disconnected steps defeats the purpose. RFRM's eight phases exist
    specifically to keep that chain from fragmenting. (Tutorial 06)
  </li>
  <li>
    <strong>Models and their state variables are central to any quantitative
    risk claim.</strong> Every number this series produced — a probability, a
    payoff, a frontier — came from a model with explicit assumptions behind it.
    Worth naming honestly: this series skipped the book's own chapter on
    modeling itself (Chapter 2), and this principle is a reminder that
    everything downstream inherits whatever that unexamined choice got right
    or wrong.
  </li>
  <li>
    <strong>Complex systems of systems need more than one model</strong> to
    capture more than one legitimate perspective on the same system. This is
    HHM's entire premise. (Tutorial 03)
  </li>
  <li>
    <strong>Meta-modeling and subsystem integration have to be derived from the
    system's own intrinsic states</strong> — how one subsystem's failure
    becomes part of the next subsystem's actual starting condition. This is
    exactly what the resilience-loss propagation in the two-stage tree was
    modeling. (Tutorial 09)
  </li>
  <li>
    <strong>Multiple conflicting, competing objectives are inherent</strong> to
    risk management, not an edge case to special-case around. (Tutorials 04
    and 08)
  </li>
  <li>
    <strong>Risk analysis must account for both epistemic and aleatory
    uncertainty</strong> — and treat them differently, since only one of them
    shrinks with better data. (Tutorial 05)
  </li>
  <li>
    <strong>Risk analysis must account for low-probability, high-consequence
    events</strong> specifically, not just fold them into an average. (Tutorials
    07 and 10)
  </li>
  <li>
    <strong>The time frame is central to quantitative risk analysis</strong> —
    a risk assessed at a single moment is a photograph of something that keeps
    moving. (Tutorial 09)
  </li>
  <li>
    <strong>Risk analysis must be holistic, adaptive, incremental, and
    sustained</strong> — supported by real data collection, real metrics of
    progress, and real criteria for acting on what's found, not a one-time
    report. This is RFRM's operational feedback phase, generalized into a
    standing discipline rather than a single study. (Tutorial 06, and really
    the throughline of the whole series)
  </li>
</ol>

<hr>

<h2>Why the FAA case study matters</h2>

<p>
Haimes didn't just propose these ten principles in the abstract — he
validated them against NextGen, a real, massive, genuinely complex
modernization of the entire U.S. air traffic system, spanning agencies,
contractors, decades, and interdependent technologies. The point of testing
principles against a system that large is exactly the point of this series'
running example: a coastal water-quality monitoring program is also a system
of systems — satellites, in-situ sensors, predictive models, health agencies,
and the people who act on what all of that reports. The same ten principles
apply to it without needing to be rewritten.
</p>

<hr>

<h2>How this shows up in current practice</h2>

<ul>
  <li>
    <strong>Principle-based governance for complex systems</strong> — modern
    risk frameworks for cyber-physical and AI systems increasingly codify a
    short list of guiding principles rather than a single rigid checklist,
    precisely because a system of systems changes faster than any specific
    checklist can keep up with.
  </li>
  <li>
    <strong>Digital twins</strong> (Tutorial 01) are today's most literal
    embodiment of principles 3 through 5 at once: multiple linked models, each
    representing a different subsystem or perspective, integrated around the
    real system's actual current state, continuously rather than as a one-time
    exercise.
  </li>
  <li>
    <strong>Production ML monitoring practice</strong> — model cards,
    continuous evaluation, drift detection — is principle 10 applied
    specifically to the calibrated classifiers this series leaned on
    throughout: a model deployed once and never revisited violates this
    principle just as surely as a risk assessment filed away and forgotten
    does.
  </li>
</ul>

<hr>

<h2>A closing audit, in code</h2>

<p>
Rather than another numerical simulation, this closing snippet is a literal
audit: the ten principles, mapped back to exactly where each one appeared in
this series — a study guide as much as a piece of code, in keeping with a
chapter that's fundamentally about principles rather than a new quantitative
method.
</p>

<hr>

<h2>Limitations to keep in mind</h2>

<ul>
  <li><strong>Haimes himself didn't claim completeness</strong> — the original
  paper explicitly frames these ten as a starting point for discussion, not a
  finished, closed list.</li>
  <li><strong>Principles aren't a substitute for the methods</strong> — knowing
  that "multiple conflicting objectives are inherent" doesn't trade off two
  objectives for you; Tutorial 04's actual machinery still has to do that
  work.</li>
  <li><strong>A checklist can create false confidence</strong> — ticking off
  ten principles is not the same as having correctly applied any one of them
  well. The principles say what to attend to, not that attending to it was
  done right.</li>
</ul>

<p>
<strong>Key principle</strong> (fittingly, the last one of this series): risk
analysis that stops after a single report is not holistic, adaptive, or
sustained — it's a snapshot mistaken for a discipline. Everything built across
these eleven tutorials is meant to be revisited as the system, the data, and
the stakes keep changing, not filed away as finished.
</p>
`,
  codeSnippet: `
# The ten guiding principles (Haimes, 2012), paraphrased, mapped back to
# where each one showed up earlier in this tutorial series.
principles = [
    ("Holism bridges risk analysis and systems engineering",
     "01 - Systems & Risk Analysis"),
    ("The whole risk process must be systemic and integrated, not disconnected steps",
     "06 - Risk Filtering, Ranking, and Management (RFRM)"),
    ("Models and their state variables are central to any quantitative risk claim",
     "01 - Systems & Risk Analysis (Ch.2 on modeling itself wasn't covered)"),
    ("Complex systems of systems need multiple models for multiple perspectives",
     "03 - Hierarchical Holographic Modeling"),
    ("Meta-modeling and subsystem integration must derive from the system's own intrinsic states",
     "09 - Multiobjective Risk Impact Analysis (MRIAM)"),
    ("Multiple conflicting, competing objectives are inherent to risk management",
     "04 - Multiobjective Trade-off / 08 - Multiobjective Decision Trees"),
    ("Risk analysis must account for both epistemic and aleatory uncertainty",
     "05 - Uncertainty and Sensitivity Analysis"),
    ("Risk analysis must account for low-probability, high-consequence events",
     "07 - Extreme Events & PMRM / 10 - Statistics of Extremes"),
    ("The time frame is central to quantitative risk analysis",
     "09 - Multiobjective Risk Impact Analysis (MRIAM)"),
    ("Risk analysis must be holistic, adaptive, incremental, and sustained",
     "06 - RFRM's operational feedback phase, and this series as a whole"),
]

print(f"{'#':>2}  {'Principle':<66} Covered in")
print("-" * 100)
for i, (statement, tutorial) in enumerate(principles, start=1):
    print(f"{i:2d}  {statement:<66} {tutorial}")
`
},

];
