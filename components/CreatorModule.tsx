
import React, { useState } from 'react';
import { ContentType } from '../types';
import * as gemini from '../services/geminiService';

interface CreatorModuleProps {
  type: ContentType;
  onClose: () => void;
}

const CreatorModule: React.FC<CreatorModuleProps> = ({ type, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      let data;
      switch (type) {
        case 'story':
          data = await gemini.generateStoryContent(prompt, 'fantasy');
          // Automatically generate an image for the first chapter
          if (data.chapters[0]?.imagePrompt) {
            const img = await gemini.generateImage(data.chapters[0].imagePrompt);
            if (img) setPreviewImages([img]);
          }
          break;
        case 'campaign':
          data = await gemini.generateCampaign('DiGi Brand', prompt);
          break;
        case 'pdf':
          data = await gemini.generatePdfTemplate(prompt);
          break;
        default:
          data = { title: "Draft", content: "AI generation simulation" };
      }
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    const titles: Record<ContentType, string> = {
      pdf: 'Interactive PDF Designer',
      story: 'Story Book Creator',
      ugc: 'UGC Ad Generator',
      campaign: 'Campaign Strategist',
      ebook: 'E-Book Research Lab',
      social: 'Social Content Engine',
      presentation: 'Presentation deck',
      podcast: 'Podcast Scripting'
    };
    return titles[type];
  };

  return (
    <div className="fixed inset-0 bg-white z-[60] flex flex-col">
      <header className="p-4 border-b flex items-center justify-between sticky top-0 bg-white z-10">
        <button onClick={onClose} className="p-2 -ml-2 text-slate-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="font-bold text-slate-900">{getTitle()}</h2>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-24">
        {!result ? (
          <div className="space-y-6">
            <div className="bg-indigo-50 p-4 rounded-2xl text-indigo-700 text-sm leading-relaxed">
              👋 Describe what you want to create in detail. Our AI will handle the layout, content, and visuals.
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. A space adventure about a lonely robot finding a friend..."
                className="w-full h-32 p-4 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 focus:outline-none transition-colors text-slate-800 placeholder:text-slate-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 bg-slate-50 rounded-xl text-xs font-semibold text-slate-600 border border-slate-100">Professional Tone</button>
              <button className="p-3 bg-slate-50 rounded-xl text-xs font-semibold text-slate-600 border border-slate-100">Include Images</button>
              <button className="p-3 bg-slate-50 rounded-xl text-xs font-semibold text-slate-600 border border-slate-100">Multi-language</button>
              <button className="p-3 bg-slate-50 rounded-xl text-xs font-semibold text-slate-600 border border-slate-100">Layout Optimized</button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">{result.title || result.strategyName || "Generation Complete"}</h3>
              <button 
                onClick={() => {setResult(null); setPreviewImages([]);}} 
                className="text-xs text-indigo-600 font-semibold"
              >
                Start Over
              </button>
            </div>

            {previewImages.length > 0 && (
              <div className="rounded-2xl overflow-hidden aspect-square relative bg-slate-100">
                <img src={previewImages[0]} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute bottom-4 right-4 glass px-3 py-1 rounded-full text-[10px] font-bold">AI GENERATED</div>
              </div>
            )}

            <div className="space-y-4">
              {result.chapters ? (
                result.chapters.map((ch: any, i: number) => (
                  <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <h4 className="font-bold text-slate-800 mb-2">{ch.chapterTitle}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{ch.content}</p>
                  </div>
                ))
              ) : result.adVariations ? (
                result.adVariations.map((ad: any, i: number) => (
                  <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="text-[10px] font-bold text-indigo-600 mb-1 uppercase tracking-wider">AD COPY {i+1}</div>
                    <h4 className="font-bold text-slate-800 mb-2">{ad.headline}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{ad.body}</p>
                    <button className="w-full py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold uppercase tracking-widest">{ad.cta}</button>
                  </div>
                ))
              ) : (
                <pre className="text-xs bg-slate-50 p-4 rounded-xl overflow-auto border border-slate-100">
                  {JSON.stringify(result, null, 2)}
                </pre>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="p-4 border-t glass safe-bottom sticky bottom-0 z-20">
        {!result ? (
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt}
            className={`w-full py-4 rounded-2xl font-bold text-white transition-all transform active:scale-95 flex items-center justify-center ${
              loading || !prompt ? 'bg-slate-300' : 'bg-indigo-600 shadow-lg shadow-indigo-200'
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                AI Thinking...
              </>
            ) : (
              'Generate Content'
            )}
          </button>
        ) : (
          <div className="flex gap-3">
            <button className="flex-1 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold active:scale-95 transition-transform">
              Save Draft
            </button>
            <button className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold active:scale-95 transition-transform shadow-lg shadow-indigo-200">
              Export All
            </button>
          </div>
        )}
      </footer>
    </div>
  );
};

export default CreatorModule;
