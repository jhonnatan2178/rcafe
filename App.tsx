import React from 'react';
import { Layout } from './components/Layout';
// import { AITutor } from './components/AITutor';
import { TutorialCard } from './components/TutorialContent';
import { TUTORIALS } from './constants';

function App() {

  const tutorials = Array.isArray(TUTORIALS) ? TUTORIALS : [];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-emerald-950 text-white py-24 px-6 relative overflow-hidden min-h-[600px] flex items-center">
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div>
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Master GIS for <span className="text-emerald-400">Environment & Risk</span>
            </h2>

            <p className="text-xl text-emerald-100 mb-8 max-w-xl leading-relaxed">
              Step-by-step tutoring in R and Python. Analyze floods, map wildfires, and predict environmental impact with expert geospatial workflows.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#tutorials" className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-8 py-4 rounded-xl transition-all shadow-lg">
                Explore Tutorials
              </a>
              <a href="#tutor" className="bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 rounded-xl transition-all font-bold">
                Chat with AI Tutor
              </a>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-slate-900 p-2 rounded-2xl shadow-2xl border border-white/10">
              <div className="bg-slate-800 rounded-xl overflow-hidden">
                <div className="p-6">
                  <code className="text-emerald-400 text-sm">
                    import geopandas as gpd<br/>
                    import rasterio<br/><br/>
                    rivers = gpd.read_file("hydrology.shp")<br/>
                    buffer = rivers.buffer(500)<br/>
                    print("Risk Area Calculated!")
                  </code>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto py-20 px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">

        <div className="lg:col-span-2 space-y-12" id="tutorials">

          <div>
            <h2 className="text-3xl font-bold text-slate-900">Featured Tutorials</h2>
            <p className="text-slate-500 mt-2">Focused on practical environmental applications</p>
          </div>

          {/* SAFE MAP */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tutorials.length > 0 ? (
              tutorials.map((tutorial: any) => (
                <TutorialCard
                  key={tutorial?.id ?? Math.random()}
                  tutorial={tutorial}
                />
              ))
            ) : (
              <div className="text-slate-500">
                No tutorials available.
              </div>
            )}
          </div>

          <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100">
            <h3 className="text-2xl font-bold text-emerald-900 mb-2">
              Need a Custom Curriculum?
            </h3>
            <p className="text-emerald-700">
              Tell our AI Tutor about your project and generate a custom learning path.
            </p>
          </div>

        </div>

        {/* Sidebar */}
        <div className="lg:sticky lg:top-24 h-fit space-y-8">

          {/* SAFE RENDER */}
          {/*<AITutor /> */}

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-4">
              Recommended Software
            </h4>
            <p className="text-sm text-slate-500">
              QGIS · Anaconda · RStudio
            </p>
          </div>

        </div>

      </section>
    </Layout>
  );
}

export default App;