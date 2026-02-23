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
          <source src="/videos/hero.mp4" type="video/mp4" />
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
              Step-by-step tutoring in R and Python for environmental modeling.
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