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

Coordinates are crucial for spatial data. They define how your data aligns with the real world. But why do we have so many different systems? First reason: Earth is not completely spherical, and its form is actually called geoid. To represent this complex shape,
we can imagine the earth as a balloon and then we can "unwrap" that balloon onto a flat surface. This process is called projection, and it inevitably introduces distortions. Different projections minimize different types of distortions (area, shape, distance, direction), which is why we have so many CRS.
The most popular projection is the mercator, which is used by Google Maps and other web mapping services. However, it distorts areas near the poles, making them appear larger than they are in reality. For accurate spatial analysis, it's crucial to choose the right CRS for your project and to ensure that all your data layers are in the same CRS to avoid misalignment issues.
By instance, on the Mercator projection, Greenland appears larger than Africa, when in reality Africa is about 14 times larger than Greenland. This distortion can lead to misinterpretations of spatial data if not properly accounted for.

There's not a single "best" CRS — it depends on your location, scale, and analysis needs. Always check the CRS of your data and reproject if necessary. Best practice: use a local projected CRS for analysis and a global geographic CRS for visualization.

There are three main types of CRS:
- Geographic (latitude/longitude, e.g., EPSG:4326): unprojected, global, used for raw data and web mapping and based on latitude and longitude coordinates measured in degrees.
- Projected (e.g., UTM zones): optimized for specific regions, used for analysis, based on Cartesian coordinates measured in meters.
- Spherical (used for global datasets, e.g., EPSG:3857): a compromise for web mapping, distorts areas but preserves shapes.

COMMON CRS:
- EPSG:4326 (WGS84)
- UTM zones

Incorrect CRS causes:
- Misalignment
- Distance errors
- Area distortion
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
Flood susceptibility analysis often begins with DEM classification.

Key Concepts:
- Raster grids
- Elevation thresholding
- Binary classification
`,
    codeSnippet: `
import rasterio
import numpy as np

with rasterio.open('elevation.tif') as src:
    dem = src.read(1)

flood_risk = np.where(dem < 5, 1, 0)
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
The Normalized Burn Ratio (NBR):

NBR = (NIR - SWIR) / (NIR + SWIR)

Higher differences indicate greater burn severity.
`,
    codeSnippet: `
library(terra)

nir <- rast("sentinel_b8.tif")
swir <- rast("sentinel_b12.tif")

nbr <- (nir - swir) / (nir + swir)
`
  }

];