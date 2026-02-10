
import React from 'react';
import { ContentType } from '../types';

interface DashboardProps {
  onModuleSelect: (type: ContentType) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onModuleSelect }) => {
  const modules = [
    { id: 'pdf' as ContentType, title: 'Interactive PDF', desc: 'Design docs with AI', color: 'bg-blue-500', icon: '📄' },
    { id: 'story' as ContentType, title: 'Story Book', desc: 'Narrative generation', color: 'bg-purple-500', icon: '📖' },
    { id: 'ugc' as ContentType, title: 'UGC Ads', desc: 'Viral social media ads', color: 'bg-rose-500', icon: '🤳' },
    { id: 'campaign' as ContentType, title: 'Campaign Bot', desc: 'Full-funnel strategies', color: 'bg-indigo-500', icon: '🚀' },
    { id: 'ebook' as ContentType, title: 'E-Book Creator', desc: 'Long-form professional', color: 'bg-emerald-500', icon: '📚' },
    { id: 'social' as ContentType, title: 'Social Suite', desc: '30-day content plans', color: 'bg-orange-500', icon: '📱' },
  ];

  return (
    <div className="px-5 pt-8 pb-24 overflow-y-auto h-screen custom-scrollbar">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">DiGi Creative</h1>
        <p className="text-slate-500 mt-1">What would you like to build today?</p>
      </header>

      <section className="mb-8">
        <div className="glass rounded-2xl p-6 flex items-center justify-between border-indigo-100 shadow-sm">
          <div>
            <span className="text-indigo-600 font-bold text-lg">PRO TIER</span>
            <p className="text-slate-600 text-sm">Unlimited generations active</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
            99+
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-4">
        {modules.map((mod) => (
          <button
            key={mod.id}
            onClick={() => onModuleSelect(mod.id)}
            className="flex flex-col items-start p-4 bg-white rounded-2xl shadow-sm border border-slate-100 active:scale-95 transition-all text-left group"
          >
            <div className={`w-10 h-10 ${mod.color} rounded-xl flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform`}>
              {mod.icon}
            </div>
            <h3 className="font-semibold text-slate-900">{mod.title}</h3>
            <p className="text-xs text-slate-500 mt-1">{mod.desc}</p>
          </button>
        ))}
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Projects</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center p-3 bg-white rounded-xl border border-slate-100">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mr-3">
                🖼️
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm text-slate-900">Project {i} - Draft</h4>
                <p className="text-xs text-slate-400">Modified 2 hours ago</p>
              </div>
              <button className="text-slate-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
