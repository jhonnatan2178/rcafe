import { Language, TutorialSection } from './types';

export const TUTORIALS: TutorialSection[] = [

  // =====================================================
  // 1️⃣ BASIC SETUP
  // =====================================================
  {
    id: 'gis-foundations',
    title: 'Foundations of GIS in Python & R',
    description: 'Complete beginner guide: installation, environments, and dominant GIS libraries.',
    language: Language.PYTHON,
    category: "Basic Stuff",
    level: "Beginner",
    createdAt: "2026-02-20",

    content: `
This tutorial introduces the foundational setup required for professional GIS workflows in Python and R.

------------------------------------------------
PYTHON FOR GIS
------------------------------------------------

Recommended Installation:
- Install Miniconda or Anaconda.
- Create an isolated environment.

Core Python GIS Stack:
- numpy
- pandas
- geopandas
- rasterio
- shapely
- matplotlib

------------------------------------------------
R FOR GIS
------------------------------------------------

Core R GIS Stack:
- tidyverse
- sf
- terra
- tmap
`,

    codeSnippet: `
# PYTHON ENVIRONMENT
conda create -n gis python=3.11
conda activate gis
conda install numpy pandas matplotlib geopandas rasterio shapely

# R PACKAGES
install.packages("tidyverse")
install.packages("sf")
install.packages("terra")
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
  // 3️⃣ LAND COVER / FIRE ANALYSIS
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