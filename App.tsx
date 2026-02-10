
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import CreatorModule from './components/CreatorModule';
import { ContentType } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [activeModule, setActiveModule] = useState<ContentType | null>(null);

  const handleModuleSelect = (type: ContentType) => {
    setActiveModule(type);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto overflow-hidden">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-64 bg-gradient-to-b from-indigo-100/50 to-transparent -z-10"></div>
      
      {activeTab === 'home' && (
        <Dashboard onModuleSelect={handleModuleSelect} />
      )}
      
      {activeTab === 'create' && (
        <div className="p-8 text-center mt-20">
          <div className="text-5xl mb-4">✨</div>
          <h2 className="text-xl font-bold text-slate-900">Creation Studio</h2>
          <p className="text-slate-500 mt-2">Pick a tool from the home screen to start creating with AI.</p>
          <button 
            onClick={() => setActiveTab('home')}
            className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-full font-bold"
          >
            Go to Dashboard
          </button>
        </div>
      )}

      {activeTab === 'library' && (
        <div className="p-5 overflow-y-auto h-screen pb-24">
          <h2 className="text-2xl font-bold mb-6">Your Library</h2>
          <div className="grid grid-cols-1 gap-4">
             {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center shadow-sm">
                   <div className="w-16 h-16 bg-slate-50 rounded-xl mr-4 flex items-center justify-center text-2xl">
                      {i % 2 === 0 ? '📽️' : '📄'}
                   </div>
                   <div className="flex-1">
                      <h3 className="font-bold text-slate-900">Project Alpha {i}</h3>
                      <p className="text-xs text-slate-400">PDF Document • 1.2MB</p>
                   </div>
                </div>
             ))}
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="p-5 flex flex-col items-center text-center pt-20">
          <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-xl">
            JD
          </div>
          <h2 className="text-xl font-bold">Jane Designer</h2>
          <p className="text-slate-500">Free Tier User</p>
          
          <div className="w-full mt-10 space-y-3">
             <button className="w-full p-4 bg-white border border-slate-100 rounded-2xl flex items-center justify-between">
                <span className="font-medium text-slate-700">Account Settings</span>
                <span className="text-slate-300">→</span>
             </button>
             <button className="w-full p-4 bg-white border border-slate-100 rounded-2xl flex items-center justify-between">
                <span className="font-medium text-slate-700">Brand Guidelines</span>
                <span className="text-slate-300">→</span>
             </button>
             <button className="w-full p-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100">
                Upgrade to Pro
             </button>
          </div>
        </div>
      )}

      {/* Active Module Overlay */}
      {activeModule && (
        <CreatorModule 
          type={activeModule} 
          onClose={() => setActiveModule(null)} 
        />
      )}

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
