
import React, { useState } from 'react';
import NeonatoAnamnesis from './pediatric/NeonatoAnamnesis';
import LactenteAnamnesis from './pediatric/LactenteAnamnesis';
import PreEscolarAnamnesis from './pediatric/PreEscolarAnamnesis';
import EscolarAnamnesis from './pediatric/EscolarAnamnesis';
import AdolescenteAnamnesis from './pediatric/AdolescenteAnamnesis';

interface PediatricAnamnesisProps {
  onBack: () => void;
}

const PEDIATRIC_CONFIG = [
  { id: 'neonato', label: 'Recém-nascido', age: 'RN (0-28 dias)', icon: 'baby_changing_station', gradient: 'from-cyan-500/20 to-blue-500/20' },
  { id: 'lactente', label: 'Lactente', age: '1-12 meses', icon: 'child_care', gradient: 'from-rose-500/20 to-pink-500/20' },
  { id: 'pre-escolar', label: 'Pré-escolar', age: '1-5 anos', icon: 'child_friendly', gradient: 'from-amber-500/20 to-orange-500/20' },
  { id: 'escolar', label: 'Escolar', age: '6-12 anos', icon: 'school', gradient: 'from-indigo-500/20 to-purple-500/20' },
  { id: 'adolescente', label: 'Adolescente', age: '13-18 anos', icon: 'directions_run', gradient: 'from-emerald-500/20 to-teal-500/20' }
];

export default function PediatricAnamnesis({ onBack }: PediatricAnamnesisProps) {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);

  const renderContent = () => {
    switch (selectedAge) {
      case 'neonato': return <NeonatoAnamnesis onBack={() => setSelectedAge(null)} />;
      case 'lactente': return <LactenteAnamnesis onBack={() => setSelectedAge(null)} />;
      case 'pre-escolar': return <PreEscolarAnamnesis onBack={() => setSelectedAge(null)} />;
      case 'escolar': return <EscolarAnamnesis onBack={() => setSelectedAge(null)} />;
      case 'adolescente': return <AdolescenteAnamnesis onBack={() => setSelectedAge(null)} />;
      default:
        return (
          <div className="flex flex-col gap-8 animate-fade-in">
            <div className="flex items-center gap-4 border-b border-white/5 pb-4">
              <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-secondary hover:text-white border border-white/5 transition-all">
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Anamnese Pediátrica</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
              {PEDIATRIC_CONFIG.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedAge(item.id)}
                  className="group flex flex-col bg-slate-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 text-left"
                >
                  <div className={`h-40 w-full bg-gradient-to-br ${item.gradient} flex items-center justify-center border-b border-white/5 relative`}>
                    <span className="material-symbols-outlined text-[80px] opacity-10 text-white group-hover:scale-110 transition-transform duration-700">{item.icon}</span>
                    <div className="absolute bottom-4 left-4 px-3 py-1 rounded-lg border text-[10px] font-black bg-white/5 border-white/10 text-white shadow-lg uppercase tracking-widest">{item.age}</div>
                  </div>
                  <div className="p-8">
                    <h4 className="text-xl font-black text-white mb-2">{item.label}</h4>
                    <p className="text-xs text-text-secondary mb-6 leading-relaxed">Roteiro completo com foco em marcos do desenvolvimento e exame físico segmentado.</p>
                    <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest">
                      Selecionar <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
    }
  };

  return <>{renderContent()}</>;
}
