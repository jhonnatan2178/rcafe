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
  <li>Go to <a href="https://docs.conda.io/en/latest/miniconda.html" target="_blank">Miniconda official site</a></li>
  <li>Download the installer for your OS</li>
  <li>Install with default settings</li>
  <li>Restart your terminal</li>
</ul>

<h4>Step 2 — Create a GIS environment</h4>

<pre><code>
<div>&nbsp;</div>
conda create -n gis python=3.11
conda activate gis
</code></pre>

<p>
Python 3.11 is modern, stable, and compatible with most geospatial libraries.
</p>

<h3>Installing core GIS libraries (Python)</h3>

<p>
For geospatial libraries, <strong>conda-forge</strong> is strongly recommended
because it provides precompiled binaries for GDAL-based packages.
</p>

<pre><code>
conda install -c conda-forge \
  geopandas rasterio shapely \
  matplotlib pandas numpy
</code></pre>

<h3>Core libraries explained</h3>

<h4>NumPy</h4>

<img
  src="/images/tutorials/spatial.jpg"
  class="mx-auto w-3/5 rounded-xl my-10"
/>

<p>
NumPy is the foundation of numerical computing in Python.
It is used for raster math, array operations, and scientific calculations.
</p>

<pre><code>
import numpy as np

arr = np.array([1, 2, 3])
print(arr.mean())
</code></pre>

<h4>GeoPandas</h4>

<p>
GeoPandas extends pandas to handle spatial vector data such as
Shapefiles and GeoJSON, enabling spatial joins and geometric operations.
</p>

<pre><code>
import geopandas as gpd

gdf = gpd.read_file("boundary.shp")
gdf.plot()
</code></pre>
----------------------------------------
R → renv
----------------------------------------

Step 1 — Install R:
Download from https://cran.r-project.org/

Step 2 — Install RStudio (recommended):
Download from https://posit.co/

Step 3 — Initialize a project environment:

Inside R:

install.packages("renv")  
renv::init()  

The renv package locks your project’s package versions, ensuring full reproducibility.

====================================================
2. INSTALLING CORE GIS LIBRARIES
====================================================

----------------------------------------
PYTHON LIBRARIES
----------------------------------------

Install using conda (recommended for geospatial):

conda install -c conda-forge geopandas rasterio shapely matplotlib pandas numpy

Why conda-forge?

Geospatial libraries depend on complex system-level tools like GDAL. Conda-forge provides precompiled binaries, preventing installation errors.

Now let’s understand what each library does.

1. numpy  
<img src="/images/tutorials/spatial.jpg"
     class="mx-auto w-3/5 rounded-xl my-10" />
     
The foundation of numerical computing in Python.  
Used for array operations, raster math, and scientific calculations.

Example:
<div style="background-color:#1e1e1e; color:#d4d4d4; padding:15px; border-radius:8px; font-family:monospace;">
<pre><code>
import numpy as np

# Crear un arreglo simple
arr = np.array([1, 2, 3, 4, 5])

# Calcular la media
print(np.mean(arr))
</code></pre>
</div>


2. pandas  
Used for tabular data manipulation — CSV files, time series, satellite statistics.

<h2>1. Why environments matter</h2>

<p>Reproducibility is critical in GIS and scientific computing.</p>

<img src="/images/tutorials/wildfire.jpg"
     class="mx-auto w-3/5 rounded-xl my-10" />

<p>Different projects require different library versions...</p>

Example:
import pandas as pd
df = pd.read_csv("data.csv")
print(df.head())

3. geopandas  
Extends pandas to handle spatial vector data (Shapefiles, GeoJSON, spatial joins, buffers).

Example:
import geopandas as gpd
gdf = gpd.read_file("boundary.shp")
gdf.plot()

4. shapely  
Handles geometric operations like buffering, intersection, and distance calculations.

Example:
from shapely.geometry import Point
p = Point(10, 5)
buffered = p.buffer(100)

5. rasterio  
Used for reading and processing raster data (GeoTIFF, satellite imagery).

Example:
import rasterio
with rasterio.open("image.tif") as src:
    band1 = src.read(1)
    print(band1.shape)

----------------------------------------
R LIBRARIES
----------------------------------------

Install in R:

install.packages(c("sf", "terra", "tidyverse"))

1. sf  
Modern package for handling vector spatial data.

Example:
library(sf)
gdf <- st_read("boundary.shp")
plot(gdf)

2. terra  
Modern raster analysis package (successor of raster).

Example:
library(terra)
r <- rast("image.tif")
plot(r)

3. tidyverse  
Data manipulation and visualization ecosystem (dplyr, ggplot2, readr).

Example:
library(dplyr)
data <- read.csv("data.csv")
data %>% summarise(mean_value = mean(value))

====================================================
3. PYTHON vs R IN GIS
====================================================

Python excels in:
- Automation
- Large-scale raster processing
- Integration with machine learning

R excels in:
- Statistical analysis
- Ecological modeling
- Publication-ready graphics

Both are powerful. Most advanced professionals use both depending on the problem.

====================================================
4. BEYOND PROGRAMMING
====================================================

We won’t limit ourselves to programming.

Throughout this portal, we will also explore:

• QGIS  
• Google Earth Engine  

Because GIS is not about choosing a single tool —
it’s about building a complete ecosystem.

====================================================
FINAL NOTE
====================================================

Before performing spatial analysis, your environment must be stable.

A professional GIS workflow does not begin with maps.

It begins with reproducibility.
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

CRS defines how spatial data maps to Earth.

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