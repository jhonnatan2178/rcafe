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
    content: `
# Foundations of GIS

This tutorial establishes the professional baseline required for spatial analysis.

----------------------------------------
WHY ENVIRONMENTS MATTER
----------------------------------------

Reproducibility is critical in GIS.
Use isolated environments:
- Conda (Python)
- renv (R)

----------------------------------------
CORE LIBRARIES
----------------------------------------

Python:
- numpy
- pandas
- geopandas
- rasterio
- shapely

R:
- sf
- terra
- tidyverse
`,
    codeSnippet: `
# Create Python GIS environment
conda create -n gis python=3.11
conda activate gis
conda install geopandas rasterio shapely matplotlib
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