import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import { Layout } from "./components/Layout";
import { TutorialCard } from "./components/TutorialCard";
import TutorialsPage from "./components/TutorialsPage";
import TutorialPage from "./components/TutorialPage";

import { TUTORIALS } from "./constants";

function HomePage() {

  const latestTutorials = [...TUTORIALS]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 2);

  return (
    <>
      {/* ================= HERO CON VIDEO ================= */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden">

        {/* VIDEO DE FONDO */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/nature.mp4" type="video/mp4" />
        </video>
        {/* IMAGEN FALLBACK (MÓVIL + SI FALLA VIDEO) */}
        <div
          className="absolute inset-0 bg-cover bg-center md:hidden"
          style={{ backgroundImage: "url(/images/tutorials/spatial.jpg)" }}
        />
        {/* OVERLAY OSCURO */}
        <div className="absolute inset-0 bg-emerald-950/70" />

        {/* CONTENIDO */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-xl">

            <h2 className="text-5xl font-extrabold mb-6 leading-tight text-white">
              Master GIS for{" "}
              <span className="text-emerald-400">
                Environment & Risk
              </span>
            </h2>

            <p className="text-xl text-emerald-100 mb-8">
              Hello and welcome to EcoGeo! Have you ever questioned how to start your journey in GIS? Or maybe you’re wondering which tools are best for environmental analysis? 
              well. You’re in the right place! Here, we provide clear, practical tutorials to help you master GIS for environmental and risk applications. Whether you’re a beginner or looking to expand your skills, we’ve got you covered. Let’s dive in and explore the world of geospatial analysis together!
            </p>

            <Link
              to="/tutorials"
              className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-8 py-4 rounded-xl transition-all shadow-lg inline-block"
            >
              Explore Tutorials
            </Link>

          </div>
        </div>
      </section>

      {/* ================= LATEST TUTORIALS ================= */}
      <section className="max-w-7xl mx-auto py-20 px-6">

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900">
            Latest Tutorials
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {latestTutorials.map((tutorial) => (
            <TutorialCard
              key={tutorial.id}
              tutorial={tutorial}
            />
          ))}
        </div>

      </section>
    </>
  );
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tutorials" element={<TutorialsPage />} />
        <Route path="/tutorial/:id" element={<TutorialPage />} />
      </Routes>
    </Layout>
  );
}

export default App;