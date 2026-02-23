
import React from 'react';
import { Layout } from './components/Layout';
import { AITutor } from './components/AITutor';
import { TutorialCard } from './components/TutorialContent';
import { TUTORIALS } from './constants';

function App() {
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
              <a href="#tutorials" className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/20">
                Explore Tutorials
              </a>
              <a href="#tutor" className="bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 rounded-xl transition-all font-bold">
                Chat with AI Tutor
              </a>
            </div>
            <div className="mt-12 flex gap-8 items-center">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} className="w-10 h-10 rounded-full border-2 border-emerald-900" src={`https://picsum.photos/100/100?random=${i}`} alt="Student" />
                ))}
              </div>
              <p className="text-emerald-200 text-sm">Join 2,000+ environmental analysts</p>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="bg-slate-900 p-2 rounded-2xl shadow-2xl border border-white/10 transform rotate-1">
              <div className="bg-slate-800 rounded-xl overflow-hidden">
                <div className="flex gap-2 p-3 bg-slate-900/50">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="p-6">
                  <code className="text-emerald-400 text-sm">
                    <span className="text-purple-400">import</span> geopandas <span className="text-purple-400">as</span> gpd<br/>
                    <span className="text-purple-400">import</span> rasterio<br/>
                    <br/>
                    <span className="text-slate-500"># Analyze flood risk zones</span><br/>
                    rivers = gpd.read_file(<span className="text-orange-300">"hydrology.shp"</span>)<br/>
                    buffer = rivers.buffer(<span className="text-orange-300">500</span>)<br/>
                    print(<span className="text-orange-300">"Risk Area Calculated!"</span>)
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto py-20 px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12" id="tutorials">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Featured Tutorials</h2>
              <p className="text-slate-500 mt-2">Focused on practical environmental applications</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-semibold">All</button>
              <button className="px-4 py-2 hover:bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold">Python</button>
              <button className="px-4 py-2 hover:bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold">R</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TUTORIALS.map((tutorial) => (
              <TutorialCard key={tutorial.id} tutorial={tutorial} />
            ))}
          </div>

          <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-emerald-900 mb-2">Need a Custom Curriculum?</h3>
              <p className="text-emerald-700">Tell our AI Tutor about your specific project needs (e.g., Landslide Susceptibility or Urban Heat Islands), and it will generate a learning path just for you.</p>
            </div>
            <a href="#tutor" className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors whitespace-nowrap shadow-md">
              Start Project Session
            </a>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">Why GIS for Risk?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Predictive Analysis", desc: "Forecast future events based on historical patterns and spatial correlations.", icon: "🎯" },
                { title: "Damage Assessment", desc: "Quantify environmental impact immediately after disasters using satellite data.", icon: "📉" },
                { title: "Vulnerability Mapping", desc: "Identify which communities or ecosystems are most at risk and need help first.", icon: "🗺️" }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: AI Tutor */}
        <div className="lg:sticky lg:top-24 h-fit space-y-8">
          <AITutor />
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-4">Recommended Software</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded flex items-center justify-center font-bold text-xs italic">Py</div>
                <div>
                  <p className="text-sm font-semibold">Anaconda / Miniconda</p>
                  <p className="text-[10px] text-slate-400">Environment Management</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 text-blue-800 rounded flex items-center justify-center font-bold text-xs italic">R</div>
                <div>
                  <p className="text-sm font-semibold">RStudio (Posit)</p>
                  <p className="text-[10px] text-slate-400">Best IDE for Spatial R</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded flex items-center justify-center font-bold text-xs italic">Q</div>
                <div>
                  <p className="text-sm font-semibold">QGIS</p>
                  <p className="text-[10px] text-slate-400">Visualizing Data & Python Integration</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default App;
