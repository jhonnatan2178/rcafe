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
<h2><em>Why don’t we just choose one?</em></h2>
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
<strong>The good news???</strong> You don’t have to choose.
<div>&nbsp;</div>
</p>

Professional GIS analysts often use both.

In this tutorial, we’ll establish the professional baseline required for spatial analysis.  
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
conda install -c conda-forge \
  geopandas rasterio shapely \
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
    description: 'Understand the two dominant spatial data structures.',
    language: Language.PYTHON,
    category: "Basic Stuff",
    level: "Beginner",
    createdAt: "2026-02-21",
    image: "/images/tutorials/vector.jpg",
    content: `
# Vector vs Raster

All GIS data belongs to one of two models.

VECTOR:
- Points
- Lines
- Polygons

RASTER:
- Grid-based
- Used for elevation, temperature, satellite imagery

Understanding this difference is fundamental.
`,
    codeSnippet: `
import geopandas as gpd
import rasterio

vector = gpd.read_file("shapefile.shp")

with rasterio.open("raster.tif") as src:
    raster = src.read(1)
`
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
commonly used by <strong>:contentReference[oaicite:0]{index=0}</strong>
and other web mapping platforms. While it preserves shapes and directions, it
significantly distorts areas near the poles.
</p>

<p>
A classic example of this distortion is that <strong>:contentReference[oaicite:1]{index=1}</strong>
appears larger than <strong>:contentReference[oaicite:2]{index=2}</strong> on Mercator maps,
even though Africa is approximately fourteen times larger in reality.
</p>

<p>
Such distortions can lead to serious misinterpretations if the CRS is not
carefully considered during spatial analysis.
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
    description: 'Process DEMs to identify flood-prone zones.',
    language: Language.PYTHON,
    category: "Flood Modeling",
    level: "Intermediate",
    createdAt: "2026-02-22",
    image: "/images/tutorials/flood.jpg",
    content: `
<p>
Flood modeling aims to identify areas that are temporarily or permanently
inundated due to extreme precipitation, river overflow, or coastal processes.
At its core, flood mapping is a spatial problem that combines terrain,
hydrology, and surface water detection.
</p>

<p>
In this introductory tutorial, we build a <strong>simple flood model</strong>
using two fundamental data sources:
</p>

<ul>
  <li><strong>SAR imagery</strong> to detect water presence</li>
  <li><strong>Digital Elevation Models (DEM)</strong> to understand terrain controls</li>
</ul>

<p>
The goal is not to build a perfect hydrodynamic model, but to establish a
<strong>reproducible baseline workflow</strong> that can later be extended with
more advanced techniques.
</p>

<hr>

<h2>1. Why SAR for Flood Mapping?</h2>

<p>
Synthetic Aperture Radar (SAR) sensors actively emit microwave signals and
measure the backscatter returned from the surface. This makes SAR especially
useful for flood detection because:
</p>

<ul>
  <li>It works day and night</li>
  <li>It penetrates clouds and rain</li>
  <li>Open water surfaces typically return very low backscatter values</li>
</ul>

<p>
During flood events, newly inundated areas appear as dark regions in SAR images,
allowing water extent to be mapped even under extreme weather conditions.
</p>

<hr>

<h2>2. Why DEM Matters?</h2>

<p>
A Digital Elevation Model provides information about terrain height and shape.
Floodwaters follow gravity, so elevation strongly constrains where water can
accumulate.
</p>

<p>
By combining SAR-derived water masks with a DEM, we can:
</p>

<ul>
  <li>Remove false positives on steep slopes</li>
  <li>Identify low-lying flood-prone areas</li>
  <li>Improve spatial consistency of flood maps</li>
</ul>

<hr>

<h2>3. Simplified Flood Modeling Workflow</h2>

<ol>
  <li>Acquire pre- or post-event SAR imagery</li>
  <li>Apply basic preprocessing (calibration and noise reduction)</li>
  <li>Detect water using a backscatter threshold</li>
  <li>Load a DEM covering the same area</li>
  <li>Mask flooded pixels below a given elevation threshold</li>
</ol>

<p>
This approach assumes that flooded areas are both:
</p>

<ul>
  <li>Radar-dark (low backscatter)</li>
  <li>Topographically plausible (low elevation)</li>
</ul>

<hr>

<h2>4. Data Sources (Typical)</h2>

<ul>
  <li><strong>SAR:</strong> Sentinel-1 (C-band)</li>
  <li><strong>DEM:</strong> SRTM or other global elevation products</li>
</ul>

<p>
These datasets are freely available and widely used in operational flood
monitoring.
</p>

<hr>

<h2>5. Limitations of This Simple Model</h2>

<p>
This simplified approach has important limitations:
</p>

<ul>
  <li>No hydrodynamic flow modeling</li>
  <li>No time evolution of flood extent</li>
  <li>Sensitivity to threshold selection</li>
  <li>Potential confusion with smooth non-water surfaces</li>
</ul>

<p>
Despite these limitations, this baseline model is extremely valuable for
rapid mapping, early warning, and educational purposes.
</p>

<hr>

<h2>6. How This Can Be Extended (Next Levels)</h2>

<ul>
  <li>Multi-temporal SAR change detection</li>
  <li>Slope-based masking from DEM derivatives</li>
  <li>Integration with precipitation data</li>
  <li>Hydrodynamic flood models (HEC-RAS, LISFLOOD)</li>
  <li>Machine learning–based water classification</li>
</ul>

<p>
A professional flood modeling workflow often starts simple and becomes more
complex as data availability and project goals increase.
</p>

<p>
<strong>Key principle:</strong> always understand your assumptions before
increasing model complexity.
</p>
`,
    codeSnippet: `
import rasterio
import numpy as np

# Load SAR backscatter image
with rasterio.open("sar_vv.tif") as sar_src:
    sar = sar_src.read(1)
    profile = sar_src.profile

# Load DEM
with rasterio.open("dem.tif") as dem_src:
    dem = dem_src.read(1)

# Simple water detection (low backscatter)
water_mask = sar < -17  # threshold in dB (example)

# Elevation constraint
flood_mask = (water_mask) & (dem < 50)

# Save flood extent
profile.update(dtype=rasterio.uint8, count=1)

with rasterio.open("flood_extent.tif", "w", **profile) as dst:
    dst.write(flood_mask.astype(np.uint8), 1)
`
  },

  // =====================================================
  // 3️⃣ LAND COVER ANALYSIS
  // =====================================================

  {
    id: 'r-wildfire-nbr',
    title: 'R: Spectral Indices for Wildfire Damage',
    description: 'Calculate NBR to classify wildfire severity.',
    language: Language.R,
    category: "Land Cover Analysis",
    level: "Intermediate",
    createdAt: "2026-02-23",
    image: "/images/tutorials/landcover.jpg",
    content: `
<p>
Burned area mapping focuses on identifying regions affected by wildfires by
analyzing changes in surface reflectance after a fire event. Fire alters
vegetation structure, soil exposure, and moisture, producing distinctive
spectral signatures observable from satellite imagery.
</p>

<p>
In this tutorial, we implement a <strong>simple burned area classification</strong>
using optical satellite data and spectral indices. The objective is to create a
clear and interpretable baseline workflow suitable for rapid post-fire
assessment.
</p>

<hr>

<h2>1. Why Optical Data for Burned Area Mapping?</h2>

<p>
Wildfires cause abrupt changes in vegetation and surface properties. Optical
sensors capture these changes through variations in reflectance across visible,
near-infrared, and shortwave infrared bands.
</p>

<p>
Burned surfaces typically exhibit:
</p>

<ul>
  <li>Strong reduction in near-infrared reflectance</li>
  <li>Increased reflectance in shortwave infrared</li>
  <li>Loss of chlorophyll-related spectral features</li>
</ul>

<p>
Commonly used missions for burned area analysis include
<strong>:contentReference[oaicite:0]{index=0}</strong>
and
<strong>:contentReference[oaicite:1]{index=1}</strong>,
both offering appropriate spectral bands and global coverage.
</p>

<hr>

<h2>2. Burn-Sensitive Spectral Indices</h2>

<p>
Spectral indices enhance fire-related changes by combining bands sensitive to
vegetation moisture and structure.
</p>

<p>
One of the most widely used indices is the <strong>Normalized Burn Ratio (NBR)</strong>:
</p>

<ul>
  <li>Uses near-infrared (NIR) and shortwave infrared (SWIR)</li>
  <li>Highlights burned vegetation and exposed soil</li>
</ul>

<p>
Burn severity is often assessed using the difference between pre- and
post-fire NBR values (dNBR), but even single-date NBR can support basic burned
area detection.
</p>

<hr>

<h2>3. Simplified Burned Area Workflow</h2>

<ol>
  <li>Acquire cloud-free optical imagery after the fire event</li>
  <li>Apply basic preprocessing and masking</li>
  <li>Compute burn-sensitive spectral indices</li>
  <li>Apply threshold-based classification</li>
  <li>Generate a burned area mask</li>
</ol>

<p>
This rule-based approach emphasizes transparency and rapid deployment,
particularly useful for emergency response and first-order damage assessment.
</p>

<hr>

<h2>4. Typical Data Sources</h2>

<ul>
  <li><strong>Optical imagery:</strong> Sentinel-2 or Landsat</li>
  <li><strong>Optional:</strong> Pre-fire imagery for change detection</li>
  <li><strong>Optional:</strong> DEM for terrain-related filtering</li>
</ul>

<p>
These datasets provide sufficient information for introductory burned area
mapping at local to regional scales.
</p>

<hr>

<h2>5. Limitations of This Simple Model</h2>

<p>
This simplified burned area classification has several limitations:
</p>

<ul>
  <li>Confusion with dark surfaces (shadows, water)</li>
  <li>Sensitivity to cloud contamination</li>
  <li>No burn severity stratification</li>
  <li>No temporal persistence modeling</li>
</ul>

<p>
Despite these limitations, this approach provides a solid baseline for more
advanced fire analysis.
</p>

<hr>

<h2>6. How This Can Be Extended (Next Levels)</h2>

<ul>
  <li>Pre- and post-fire dNBR analysis</li>
  <li>Burn severity classification</li>
  <li>Integration with SAR for smoke-affected regions</li>
  <li>Time-series fire recovery analysis</li>
  <li>Large-scale processing with
    <strong>:contentReference[oaicite:2]{index=2}</strong>
  </li>
</ul>

<p>
Operational wildfire monitoring systems typically evolve from simple index-based
methods into multi-temporal and multi-sensor frameworks.
</p>

<p>
<strong>Key principle:</strong> fire detection is fundamentally a change-detection
problem — context matters as much as thresholds.
</p>
`,
    codeSnippet: `
library(terra)

import rasterio
import numpy as np

# Load bands
with rasterio.open("nir.tif") as n:
    nir = n.read(1)
    profile = n.profile

with rasterio.open("swir.tif") as s:
    swir = s.read(1)

# Compute Normalized Burn Ratio (NBR)
nbr = (nir - swir) / (nir + swir + 1e-6)

# Simple burned area threshold
burned = nbr < 0.1

profile.update(dtype=rasterio.uint8, count=1)

with rasterio.open("burned_area.tif", "w", **profile) as dst:
    dst.write(burned.astype(np.uint8), 1)
`
  }

];