
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AITutor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await geminiService.chat(input, history);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden" id="tutor">
      <div className="bg-emerald-800 p-4 text-white flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center text-emerald-900 font-bold">AI</div>
        <div>
          <h3 className="font-bold leading-none">Geo-Intelligence Tutor</h3>
          <p className="text-xs text-emerald-200 mt-1">Specialized in GIS, R, and Python</p>
        </div>
      </div>
      
      <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-4 bg-slate-50">
        {messages.length === 0 && (
          <div className="text-center py-10 text-slate-400">
            <p className="mb-2">Ask me anything about GIS workflows or environmental risks.</p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <button onClick={() => setInput("How do I calculate NDVI in Python?")} className="text-xs px-3 py-1 bg-white border border-slate-200 rounded-full hover:bg-emerald-50 hover:border-emerald-200 transition-all">NDVI in Python</button>
              <button onClick={() => setInput("Explain Kriging interpolation for rainfall data.")} className="text-xs px-3 py-1 bg-white border border-slate-200 rounded-full hover:bg-emerald-50 hover:border-emerald-200 transition-all">Rainfall Kriging</button>
              <button onClick={() => setInput("Help me debug my R sf package error.")} className="text-xs px-3 py-1 bg-white border border-slate-200 rounded-full hover:bg-emerald-50 hover:border-emerald-200 transition-all">Debug R</button>
            </div>
          </div>
        )}
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl ${
              m.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-br-none' 
                : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
            }`}>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{m.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question..."
            className="flex-grow px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-md"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
