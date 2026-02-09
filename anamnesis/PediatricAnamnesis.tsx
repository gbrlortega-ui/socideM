
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
  { id: 'neonato', label: 'Recém-nascido', age: 'RN (0-28 dias)', icon: 'baby_changing_station', gradient: 'from-blue-50 to-cyan-50', color: 'text-cyan-600' },
  { id: 'lactente', label: 'Lactente', age: '1-12 meses', icon: 'child_care', gradient: 'from-rose-50 to-pink-50', color: 'text-rose-600' },
  { id: 'pre-escolar', label: 'Pré-escolar', age: '1-5 anos', icon: 'child_friendly', gradient: 'from-amber-50 to-orange-50', color: 'text-amber-600' },
  { id: 'escolar', label: 'Escolar', age: '6-12 anos', icon: 'school', gradient: 'from-indigo-50 to-purple-50', color: 'text-indigo-600' },
  { id: 'adolescente', label: 'Adolescente', age: '13-18 anos', icon: 'directions_run', gradient: 'from-emerald-50 to-teal-50', color: 'text-emerald-600' }
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
            <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
              <button onClick={onBack} className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm group">
                <span className="material-symbols-outlined group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
              </button>
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Anamnese Pediátrica</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
              {PEDIATRIC_CONFIG.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedAge(item.id)}
                  className="group flex flex-col bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 text-left"
                >
                  <div className={`h-40 w-full bg-gradient-to-br ${item.gradient} flex items-center justify-center border-b border-slate-50 relative`}>
                    <span className={`material-symbols-outlined text-[80px] opacity-20 ${item.color} group-hover:scale-110 transition-transform duration-700`}>{item.icon}</span>
                    <div className="absolute bottom-4 left-4 px-3 py-1 rounded-lg border text-[10px] font-black bg-white/80 backdrop-blur-sm border-slate-200 text-slate-700 shadow-sm uppercase tracking-widest">{item.age}</div>
                  </div>
                  <div className="p-8">
                    <h4 className="text-xl font-black text-slate-900 mb-2 group-hover:text-primary transition-colors">{item.label}</h4>
                    <p className="text-xs text-text-muted mb-6 leading-relaxed font-medium">Roteiro completo focado em marcos do desenvolvimento e exame físico segmentado.</p>
                    <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest">
                      Selecionar Roteiro <span className="material-symbols-outlined text-sm">arrow_forward</span>
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
