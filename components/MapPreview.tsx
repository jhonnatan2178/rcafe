
import React, { useEffect, useRef } from 'react';
import { MapData } from '../types';

interface Props {
  data: MapData;
}

export const MapPreview: React.FC<Props> = ({ data }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Fix: Access Leaflet global 'L' through (window as any) to resolve TypeScript errors where L is not defined on Window
    const L = (window as any).L;
    if (!mapContainerRef.current || !L) return;

    // Initialize map if it doesn't exist
    if (!mapInstanceRef.current) {
      // Fix: Use the local L reference to call map constructor
      const map = L.map(mapContainerRef.current).setView(data.center, data.zoom);
      
      // Fix: Use the local L reference to call tileLayer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setView(data.center, data.zoom);
    }

    // Add GeoJSON layer
    // Fix: Use the local L reference to call geoJSON
    const geoJsonLayer = L.geoJSON(data.geoJson, {
      style: (feature: any) => ({
        fillColor: data.overlayLabel.includes("Flood") ? '#3b82f6' : '#ef4444',
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.5
      })
    }).addTo(mapInstanceRef.current);

    // Clean up on unmount
    return () => {
      if (geoJsonLayer) {
        geoJsonLayer.remove();
      }
    };
  }, [data]);

  return (
    <div className="relative h-48 w-full rounded-xl overflow-hidden border border-slate-200 mt-4 shadow-inner">
      <div className="absolute top-2 left-2 z-10 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-slate-700 shadow-sm border border-slate-200">
        INTERACTIVE PREVIEW: {data.overlayLabel}
      </div>
      <div ref={mapContainerRef} className="h-full w-full" />
    </div>
  );
};
