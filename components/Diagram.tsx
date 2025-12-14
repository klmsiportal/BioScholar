'use client';

import React, { useEffect, useState } from 'react';
import { Microscope, Dna, Activity, Droplet, Bug, Leaf, Brain, Heart, Bone, PenTool, Image as ImageIcon, Loader2 } from 'lucide-react';
import { generateDiagramConceptAction } from '@/app/actions';

interface DiagramProps {
  topic: string;
  context: string;
}

const Diagram: React.FC<DiagramProps> = ({ topic, context }) => {
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDesc = async () => {
        setLoading(true);
        // We only fetch description if it's a "deep" concept, otherwise we use static icons
        const desc = await generateDiagramConceptAction(topic);
        setDescription(desc);
        setLoading(false);
    };
    if (topic) fetchDesc();
  }, [topic]);

  // Select an icon based on keywords in the context/topic
  const getIcon = () => {
    const t = (topic + " " + context).toLowerCase();
    if (t.includes('microscope') || t.includes('lens')) return <Microscope size={64} className="text-indigo-500" />;
    if (t.includes('dna') || t.includes('genetic') || t.includes('gene')) return <Dna size={64} className="text-emerald-500" />;
    if (t.includes('blood') || t.includes('heart') || t.includes('cardiac')) return <Heart size={64} className="text-red-500" />;
    if (t.includes('cell') || t.includes('bacteria') || t.includes('virus')) return <Bug size={64} className="text-lime-600" />;
    if (t.includes('plant') || t.includes('botany')) return <Leaf size={64} className="text-green-600" />;
    if (t.includes('brain') || t.includes('nervous')) return <Brain size={64} className="text-pink-500" />;
    if (t.includes('bone') || t.includes('skeletal')) return <Bone size={64} className="text-slate-400" />;
    if (t.includes('water') || t.includes('plasma')) return <Droplet size={64} className="text-blue-500" />;
    return <Activity size={64} className="text-violet-500" />;
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mt-4 flex flex-col items-center animate-fade-in">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Visual Illustration</h3>
        
        {loading ? (
             <div className="w-full flex flex-col items-center justify-center py-8">
                <div className="relative">
                    <div className="absolute inset-0 bg-indigo-100 rounded-full animate-ping opacity-75"></div>
                    <div className="bg-white p-4 rounded-full border border-indigo-100 relative z-10">
                         <PenTool size={32} className="text-indigo-600 animate-bounce" />
                    </div>
                </div>
                <p className="mt-4 text-sm font-medium text-slate-500 animate-pulse">Sketching diagram concept...</p>
             </div>
        ) : (
            <>
                <div className="p-6 bg-slate-50 rounded-full mb-4 border border-slate-100 transition-all hover:scale-105">
                    {getIcon()}
                </div>
                <div className="text-center">
                    <h4 className="font-bold text-slate-800 mb-1">{topic}</h4>
                    <p className="text-slate-600 text-sm italic">
                        {description}
                    </p>
                </div>
                
                {/* SVG Placeholder for Cell Structure */}
                {topic.toLowerCase().includes('cell') && (
                    <div className="mt-4 w-full max-w-[200px] h-[150px] relative border border-dashed border-slate-300 rounded flex items-center justify-center bg-slate-50">
                        <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                            <circle cx="50" cy="50" r="45" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
                            <circle cx="50" cy="50" r="15" fill="#fca5a5" />
                            <text x="50" y="50" fontSize="8" textAnchor="middle" fill="#7f1d1d" dy="2">Nucleus</text>
                            <ellipse cx="70" cy="30" rx="10" ry="5" fill="#86efac" />
                            <text x="70" y="30" fontSize="6" textAnchor="middle" fill="#14532d" dy="2">Mito</text>
                        </svg>
                    </div>
                )}
            </>
        )}
    </div>
  );
};

export default Diagram;
