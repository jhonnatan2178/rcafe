
import React, { useState, useEffect } from 'react';
import { geminiService } from '../services/geminiService';

interface BackgroundVideoProps {
  defaultPrompt?: string;
}

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ 
  defaultPrompt = "Cinematic aerial view of a satellite orbiting Earth with glowing city lights below, high detail, 4k" 
}) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    checkKey();
  }, []);

  const checkKey = async () => {
    if (window.aistudio) {
      const selected = await window.aistudio.hasSelectedApiKey();
      setHasKey(selected);
    }
  };

  const handleSelectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasKey(true);
    }
  };

  const generateVideo = async (prompt: string) => {
    setIsGenerating(true);
    setError(null);
    setStatus("Initializing cinematic generation...");
    
    try {
      const statuses = [
        "Synthesizing geospatial textures...",
        "Rendering orbital mechanics...",
        "Optimizing atmospheric scattering...",
        "Finalizing environmental shaders...",
        "Almost ready..."
      ];
      
      let statusIdx = 0;
      const interval = setInterval(() => {
        if (statusIdx < statuses.length) {
          setStatus(statuses[statusIdx]);
          statusIdx++;
        }
      }, 8000);

      const url = await geminiService.generateBackgroundVideo(prompt);
      setVideoUrl(url);
      clearInterval(interval);
      setStatus("");
    } catch (err: any) {
      console.error(err);
      setError("Failed to generate video. Please ensure you have a paid API key selected.");
      if (err.message?.includes("Requested entity was not found")) {
        setHasKey(false);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  if (!hasKey) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-emerald-950/40 backdrop-blur-sm z-20">
        <div className="bg-white/10 p-6 rounded-2xl border border-white/20 text-center max-w-md mx-4">
          <h3 className="text-white font-bold mb-2">Enable Cinematic Backgrounds</h3>
          <p className="text-emerald-100 text-sm mb-6">
            Generate custom AI-powered background videos for your GIS workspace. 
            Requires a paid Gemini API key.
          </p>
          <button 
            onClick={handleSelectKey}
            className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-6 py-3 rounded-xl transition-all"
          >
            Select API Key
          </button>
          <p className="mt-4 text-[10px] text-emerald-300/60">
            Visit <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline">billing docs</a> for setup.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {videoUrl ? (
        <video 
          src={videoUrl} 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-30"
        />
      ) : (
        <div className="w-full h-full bg-emerald-900/20" />
      )}

      <div className="absolute bottom-6 left-6 pointer-events-auto flex flex-col gap-2">
        {isGenerating ? (
          <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-3">
            <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-white font-medium">{status}</span>
          </div>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={() => generateVideo("Cinematic aerial view of a satellite orbiting Earth with glowing city lights below, high detail, 4k")}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-[10px] text-white font-bold transition-all"
            >
              Generate Satellite Orbit
            </button>
            <button 
              onClick={() => generateVideo("A wide cinematic shot of a majestic river winding through a lush green valley, sunlight reflecting on water, 4k")}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-[10px] text-white font-bold transition-all"
            >
              Generate River Flow
            </button>
          </div>
        )}
        {error && <p className="text-[10px] text-red-400 font-medium bg-black/40 px-3 py-1 rounded-full">{error}</p>}
      </div>
    </div>
  );
};
