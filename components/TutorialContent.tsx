
import React from 'react';
import { TutorialSection } from '../types';
import { MapPreview } from './MapPreview';

interface Props {
  tutorial: TutorialSection;
}

export const TutorialCard: React.FC<Props> = ({ tutorial }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <div className={`h-2 ${tutorial.language === 'Python' ? 'bg-blue-500' : 'bg-indigo-600'}`}></div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
            tutorial.language === 'Python' ? 'bg-blue-100 text-blue-700' : 'bg-indigo-100 text-indigo-700'
          }`}>
            {tutorial.language}
          </span>
          <span className="text-slate-400 text-xs">• Environmental Risk</span>
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 mb-3">{tutorial.title}</h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{tutorial.description}</p>
        
        <div className="flex-grow space-y-4">
          <div className="prose prose-sm text-slate-700 max-w-none">
            {tutorial.content.split('\n').map((line, i) => (
              <p key={i} className="mb-2">{line}</p>
            ))}
          </div>

          {tutorial.mapData && <MapPreview data={tutorial.mapData} />}
          
          <div className="relative group mt-4">
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button 
                onClick={() => navigator.clipboard.writeText(tutorial.codeSnippet)}
                className="bg-slate-700 text-white text-[10px] px-2 py-1 rounded hover:bg-slate-600"
              >
                Copy
              </button>
            </div>
            <div className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Example Script:</div>
            <pre className="bg-slate-900 text-slate-300 p-4 rounded-xl text-xs overflow-x-auto border border-slate-800 font-mono">
              <code>{tutorial.codeSnippet}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
