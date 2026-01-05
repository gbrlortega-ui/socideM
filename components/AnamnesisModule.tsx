
import React, { useState } from 'react';
import { AnamnesisCategory } from '../types';
import PediatricAnamnesis from './anamnesis/PediatricAnamnesis';
import AdultAnamnesis from './anamnesis/AdultAnamnesis';
import GeriatricAnamnesis from './anamnesis/GeriatricAnamnesis';
import SoapAnamnesis from './anamnesis/SoapAnamnesis';

const CATEGORIES = [
  { id: 'pediatrico' as AnamnesisCategory, label: 'Pediatria', icon: 'child_care', badge: 'Protocolo Infantil', color: 'text-rose-600', border: 'border-rose-200', imgGradient: 'from-rose-50 to-pink-50' },
  { id: 'adulto' as AnamnesisCategory, label: 'Adulta', icon: 'person', badge: 'Clínica Geral', color: 'text-blue-600', border: 'border-blue-200', imgGradient: 'from-blue-50 to-indigo-50' },
  { id: 'geriatrico' as AnamnesisCategory, label: 'Geriatria', icon: 'elderly', badge: 'Saúde do Idoso', color: 'text-purple-600', border: 'border-purple-200', imgGradient: 'from-purple-50 to-indigo-50' },
  { id: 'soap' as AnamnesisCategory, label: 'SOAP', icon: 'clinical_notes', badge: 'APS / Ambulatório', color: 'text-amber-700', border: 'border-amber-200', imgGradient: 'from-amber-50 to-orange-50' }
];

export default function AnamnesisModule() {
  const [selectedCategory, setSelectedCategory] = useState<AnamnesisCategory | null>(null);

  const renderContent = () => {
    switch (selectedCategory) {
      case 'pediatrico': return <PediatricAnamnesis onBack={() => setSelectedCategory(null)} />;
      case 'adulto': return <AdultAnamnesis onBack={() => setSelectedCategory(null)} />;
      case 'geriatrico': return <GeriatricAnamnesis onBack={() => setSelectedCategory(null)} />;
      case 'soap': return <SoapAnamnesis onBack={() => setSelectedCategory(null)} />;
      default:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 animate-fade-in pb-16">
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className={`group flex flex-col bg-white border-2 ${cat.border} rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-card hover:shadow-strong transition-all duration-500 hover:-translate-y-2`}>
                <div className={`h-36 sm:h-44 w-full bg-gradient-to-br ${cat.imgGradient} relative flex items-center justify-center border-b-2 ${cat.border}`}>
                  <span className={`material-symbols-outlined text-[60px] sm:text-[80px] opacity-40 ${cat.color} transition-transform duration-700 group-hover:scale-110`}>{cat.icon}</span>
                  <div className="absolute top-4 left-4 px-2 sm:px-3 py-1 rounded-full border-2 bg-white font-black text-[8px] sm:text-[9px] uppercase tracking-widest text-slate-800 shadow-sm">
                    {cat.badge}
                  </div>
                </div>
                <div className="p-6 sm:p-8 flex flex-col items-center text-center flex-1">
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 sm:mb-6">{cat.label}</h4>
                  <button 
                    onClick={() => setSelectedCategory(cat.id)} 
                    className={`w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-slate-900 text-white font-black text-[10px] sm:text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 hover:bg-primary shadow-lg shadow-slate-900/10`}
                  >
                    Iniciar Roteiro <span className="material-symbols-outlined text-sm">play_arrow</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-8 sm:py-12 flex flex-col gap-10 sm:gap-14 bg-light-glow min-h-full">
      {!selectedCategory && (
        <header className="flex flex-col gap-4 sm:gap-5 no-print">
          <div className="inline-flex">
            <span className="px-4 sm:px-5 py-2 rounded-full bg-primary text-white text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-[18px]">clinical_notes</span>
              Módulos de Anamnese Estruturada
            </span>
          </div>
          <div className="space-y-2 sm:space-y-3">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">Roteiros Acadêmicos <span className="text-primary">Premium</span></h2>
            <p className="text-slate-600 text-lg sm:text-xl max-w-3xl font-bold leading-relaxed">
              Prontuários técnicos guiados por ciclos de vida, garantindo o rigor semiológico necessário no internato e residência.
            </p>
          </div>
        </header>
      )}

      {renderContent()}

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; overflow: visible !important; height: auto !important; }
        }
      `}</style>
    </div>
  );
}
