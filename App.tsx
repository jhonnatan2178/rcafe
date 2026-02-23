import React from 'react';
import { Layout } from './components/Layout';
import { TutorialCard } from './components/TutorialContent';
import { TUTORIALS } from './constants';
import { Routes, Route, Link } from "react-router-dom";
import TutorialsPage from "./components/TutorialsPage";

function HomePage() {

  const latestTutorials = [...TUTORIALS]
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())  
    .reverse()
    .slice(0, 2);

  return (
    <>
      {/* HERO */}
      <section className="bg-emerald-950 text-white py-24 px-6 min-h-[600px] flex items-center">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-5xl font-extrabold mb-6 leading-tight">
              Master GIS for <span className="text-emerald-400">Environment & Risk</span>
            </h2>

            <p className="text-xl text-emerald-100 mb-8 max-w-xl">
              Step-by-step tutoring in R and Python for environmental modeling.
            </p>

            <Link
              to="/tutorials"
              className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-8 py-4 rounded-xl transition-all shadow-lg"
            >
              Explore Tutorials
            </Link>
          </div>

        </div>
      </section>

      {/* LATEST TUTORIALS */}
      <section className="max-w-7xl mx-auto py-20 px-6">

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900">
            Latest Tutorials
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {latestTutorials.map((tutorial: any) => (
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
      </Routes>
    </Layout>
  );
}

export default App;