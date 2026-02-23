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
FOUNDATIONS OF GIS IN PYTHON & R

If you're new to the world of GIS, you're probably wondering:

Where do I start?
What tools should I learn?
Which language is better?

There are extremely powerful tools that allow high-level geographic analysis — from satellite image processing to spatial statistics and environmental modeling.

In this portal, we focus on open-source software and the two main programming languages that dominate modern GIS workflows: Python and R.

----------------------------------------------------
Why don’t we just choose one?
----------------------------------------------------

Python is arguably the most well-known programming language in the world. Its versatility and massive ecosystem of libraries allow you to build automation pipelines, process satellite imagery, perform spatial analysis, and even integrate machine learning models.

R, however, stands out for its deeply integrated statistical modeling capabilities. It was built by statisticians, and that foundation makes it exceptionally strong for ecological modeling, environmental analysis, and advanced data exploration.

So the choice depends on your mindset:

• If you want automation workflows, scalable systems, and powerful machine learning tools — welcome to Team Slytherin (the snake 🐍).  
• If you enjoy statistics, elegant visualizations, and structured analytical thinking — welcome to Team Geek 🤓.

The good news? You don’t have to choose.

Professional GIS analysts often use both.

In this tutorial, we’ll establish the professional baseline required for spatial analysis.  
A correct setup is not optional — it determines reproducibility, stability, and performance.

====================================================
1. WHY ENVIRONMENTS MATTER
====================================================

Reproducibility is critical in GIS and scientific computing.

Different projects require different library versions. Installing everything globally leads to:

- Version conflicts  
- Broken dependencies  
- Unreproducible workflows  
- “Works on my machine” problems  

The solution is isolated environments.

----------------------------------------
Python → Conda
----------------------------------------

Conda allows you to create isolated environments with specific Python and library versions.

Step 1 — Install Miniconda:
1. Go to: https://docs.conda.io/en/latest/miniconda.html  
2. Download the version for your operating system  
3. Install with default settings  
4. Restart your terminal  

Step 2 — Create a GIS environment:

conda create -n gis python=3.11  
conda activate gis  

Why Python 3.11?

It is stable, modern, and compatible with most geospatial libraries.

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
<img src="/images/tutorials/spatial.jpg" style="width:100%; margin:20px 0;" />
The foundation of numerical computing in Python.  
Used for array operations, raster math, and scientific calculations.

Example:
import numpy as np
arr = np.array([1, 2, 3])
print(arr.mean())

2. pandas  
Used for tabular data manipulation — CSV files, time series, satellite statistics.

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
    image: "images/tutorials/vector.jpg",
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
    image: "/PUBLIC/images/tutorials/spatial.jpg",
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