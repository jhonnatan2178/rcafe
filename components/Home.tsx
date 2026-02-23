import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden">

      {/* VIDEO DE FONDO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY OSCURO */}
      <div className="absolute inset-0 bg-black/60" />

      {/* CONTENIDO */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center px-6">

          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            GIS & Remote Sensing
          </h1>

          <p className="text-emerald-300 max-w-xl mx-auto mb-10">
            Professional tutorials in Python & R for environmental analysis
          </p>

          <Link
            to="/tutorials"
            className="inline-block bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-8 py-4 rounded-xl transition-all shadow-lg"
          >
            Explore Tutorials
          </Link>

        </div>
      </div>

    </div>
  );
}