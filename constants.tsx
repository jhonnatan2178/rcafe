import { Language, TutorialSection } from './types';

export const TUTORIALS: TutorialSection[] = [

  // =====================================================
  // 1️⃣ BASIC SETUP TUTORIAL
  // =====================================================
  {
    id: 'gis-foundations',
    title: 'Foundations of GIS in Python & R',
    description: 'Complete beginner guide: installation, environments, and dominant GIS libraries in Python and R.',
    language: Language.PYTHON,
    content: `
This tutorial introduces the foundational setup required for professional GIS workflows in Python and R.

------------------------------------------------
PYTHON FOR GIS
------------------------------------------------

Recommended Installation:
- Install Miniconda or Anaconda.
- Create an isolated environment for geospatial analysis.

Core Python GIS Stack:
- numpy → numerical computation
- pandas → structured data manipulation
- geopandas → vector GIS operations
- rasterio → raster processing
- shapely → geometric operations
- matplotlib → visualization

Why use environments?
They prevent dependency conflicts and ensure reproducibility.

------------------------------------------------
R FOR GIS
------------------------------------------------

Recommended Installation:
- Install R
- Install RStudio (Posit IDE)

Core R GIS Stack:
- tidyverse → data manipulation framework
- sf → vector spatial data
- terra → raster analysis
- tmap / ggplot2 → cartographic visualization

R is particularly strong for statistical spatial modeling and reproducible research workflows.
`,
    codeSnippet: `# -------------------------------
# PYTHON ENVIRONMENT SETUP
# -------------------------------
conda create -n gis python=3.11
conda activate gis
conda install numpy pandas matplotlib geopandas rasterio shapely

# Example: Load Vector Data
import geopandas as gpd
gdf = gpd.read_file("rivers.shp")
gdf.plot()

# -------------------------------
# R PACKAGE INSTALLATION
# -------------------------------
install.packages("tidyverse")
install.packages("sf")
install.packages("terra")
install.packages("tmap")

# Example: Load Vector Data in R
library(sf)
rivers <- st_read("rivers.shp")
plot(rivers)
`,
  },

  // =====================================================
  // 2️⃣ PYTHON ADVANCED TUTORIAL
  // =====================================================
  {
    id: 'python-flood-risk',
    title: 'Python: Raster Analysis for Flood Risk',
    description: 'Process Digital Elevation Models (DEMs) to identify flood-prone zones using raster analysis.',
    language: Language.PYTHON,
    content: `
In environmental risk analysis, flood susceptibility often begins with Digital Elevation Models (DEMs).

We use raster analysis to classify low-elevation zones that may accumulate water.

Key Concepts:
- Raster grids
- Elevation thresholding
- Binary classification
- Spatial visualization
`,
    codeSnippet: `import rasterio
import matplotlib.pyplot as plt
import numpy as np

# Load DEM
with rasterio.open('elevation.tif') as src:
    dem = src.read(1)

# Classify flood-prone areas (<5m elevation)
flood_risk = np.where(dem < 5, 1, 0)

plt.imshow(flood_risk, cmap='Blues')
plt.title("High Flood Risk Zones (<5m)")
plt.colorbar()
plt.show()`,
    mapData: {
      center: [29.9511, -90.0715],
      zoom: 12,
      overlayLabel: "Projected Flood Zones",
      geoJson: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: { risk: "high" },
            geometry: {
              type: "Polygon",
              coordinates: [[
                [-90.1, 29.96],
                [-90.05, 29.96],
                [-90.05, 29.94],
                [-90.1, 29.94],
                [-90.1, 29.96]
              ]]
            }
          }
        ]
      }
    }
  },

  // =====================================================
  // 3️⃣ R ADVANCED TUTORIAL
  // =====================================================
  {
    id: 'r-wildfire-nbr',
    title: 'R: Spectral Indices for Wildfire Damage',
    description: 'Calculate the Normalized Burn Ratio (NBR) to classify wildfire severity using terra.',
    language: Language.R,
    content: `
R is highly efficient for statistical GIS workflows.

The Normalized Burn Ratio (NBR) highlights burned vegetation areas:

NBR = (NIR - SWIR) / (NIR + SWIR)

Higher differences indicate greater burn severity.
`,
    codeSnippet: `library(terra)

nir <- rast("sentinel_b8.tif")
swir <- rast("sentinel_b12.tif")

nbr <- (nir - swir) / (nir + swir)

# Reclassify severity
m <- c(-1, 0.1, 0,
       0.1, 0.4, 1,
       0.4, 1.0, 2)

rcl <- matrix(m, ncol=3, byrow=TRUE)
severity <- classify(nbr, rcl)

plot(severity, main="Wildfire Severity Assessment")`,
    mapData: {
      center: [39.7596, -121.6219],
      zoom: 11,
      overlayLabel: "Burn Severity Areas",
      geoJson: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: { severity: "high" },
            geometry: {
              type: "Polygon",
              coordinates: [[
                [-121.65, 39.78],
                [-121.58, 39.78],
                [-121.58, 39.74],
                [-121.65, 39.74],
                [-121.65, 39.78]
              ]]
            }
          }
        ]
      }
    }
  }

];