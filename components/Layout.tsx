
import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-emerald-900 text-white py-4 px-6 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-xl font-bold tracking-tight">EcoGeo <span className="text-emerald-400">Tutor</span></h1>
          </div>
          <nav className="hidden md:flex gap-6 font-medium">
            <a href="#tutorials" className="hover:text-emerald-400 transition-colors">Tutorials</a>
            <a href="#tutor" className="hover:text-emerald-400 transition-colors">AI Assistant</a>
            <a href="#resources" className="hover:text-emerald-400 transition-colors">Resources</a>
          </nav>
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-slate-900 text-slate-400 py-10 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">EcoGeo Tutor</h3>
            <p>Advancing environmental stewardship through geospatial intelligence and open-source coding.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Specializations</h3>
            <ul className="space-y-2">
              <li>Flood Risk Modeling</li>
              <li>Wildfire Severity Mapping</li>
              <li>Deforestation Analysis</li>
              <li>Coastal Erosion Prediction</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Contact</h3>
            <p>Ready to master GIS? Join our community or ask our AI tutor for guidance.</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-slate-800 text-center">
          <p>© {new Date().getFullYear()} EcoGeo Tutor. Built for Environmental Analysts.</p>
        </div>
      </footer>
    </div>
  );
};
