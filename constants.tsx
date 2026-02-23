
import React from 'react';
import { Language, TutorialSection } from './types';

export const TUTORIALS: TutorialSection[] = [
  {
    id: 'python-basics',
    title: 'Python: Raster Analysis for Flood Risk',
    description: 'Learn how to handle satellite imagery using Geopandas and Rasterio to identify flood zones.',
    language: Language.PYTHON,
    content: `In environmental risk analysis, identifying flood-prone areas often starts with Digital Elevation Models (DEMs). We use Python to process these large raster datasets efficiently. 

Key Libraries:
- **Rasterio**: For reading and writing raster formats.
- **Geopandas**: For vector operations (watershed boundaries).
- **Xarray**: For multi-dimensional environmental data.`,
    codeSnippet: `import rasterio
import matplotlib.pyplot as plt
import numpy as np

# Load Digital Elevation Model (DEM)
with rasterio.open('elevation.tif') as src:
    dem = src.read(1)
    # Filter for low-lying areas (potential flood zones)
    flood_risk = np.where(dem < 5, 1, 0) # Below 5m altitude

plt.imshow(flood_risk, cmap='Blues')
plt.title("High Flood Risk Zones (<5m elevation)")
plt.show()`,
    mapData: {
      center: [29.9511, -90.0715],
      zoom: 12,
      overlayLabel: "Projected Flood Zones",
      geoJson: {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": { "risk": "high" },
            "geometry": {
              "type": "Polygon",
              "coordinates": [[
                [-90.1, 29.96], [-90.05, 29.96], [-90.05, 29.94], [-90.1, 29.94], [-90.1, 29.96]
              ]]
            }
          }
        ]
      }
    }
  },
  {
    id: 'r-basics',
    title: 'R: Spectral Indices for Wildfire Damage',
    description: 'Calculate NBR (Normalized Burn Ratio) to assess environmental damage post-fire using the terra package.',
    language: Language.R,
    content: `R is exceptional for statistical GIS. To analyze environmental risks like wildfires, we often use the terra package to calculate spectral indices that highlight changes in vegetation health.

The Normalized Burn Ratio (NBR) is standard:
NBR = (NIR - SWIR) / (NIR + SWIR)`,
    codeSnippet: `library(terra)

# Load multi-spectral bands
nir <- rast("sentinel_b8.tif")
swir <- rast("sentinel_b12.tif")

# Calculate Normalized Burn Ratio (NBR)
nbr <- (nir - swir) / (nir + swir)

# Classify fire severity
m <- c(-1, 0.1, 0,  # Unburned
       0.1, 0.4, 1, # Low Severity
       0.4, 1.0, 2) # High Severity
rcl <- matrix(m, ncol=3, byrow=TRUE)
severity <- classify(nbr, rcl)

plot(severity, main="Wildfire Severity Assessment")`,
    mapData: {
      center: [39.7596, -121.6219],
      zoom: 11,
      overlayLabel: "Burn Severity Areas",
      geoJson: {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": { "severity": "high" },
            "geometry": {
              "type": "Polygon",
              "coordinates": [[
                [-121.65, 39.78], [-121.58, 39.78], [-121.58, 39.74], [-121.65, 39.74], [-121.65, 39.78]
              ]]
            }
          }
        ]
      }
    }
  }
];

export const SYSTEM_INSTRUCTION = `You are a world-class GIS and Remote Sensing expert specializing in R and Python for environmental and risk analysis. 
Your goal is to help students understand complex spatial concepts, debug their scripts, and suggest appropriate workflows for hazards like floods, wildfires, and landslides.
Keep your explanations concise, scientific, and practical. Use LaTeX for formulas where appropriate.`;
