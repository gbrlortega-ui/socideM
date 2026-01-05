
import React, { useState } from 'react';

interface Props {
  onBack: () => void;
}

export default function SoapAnamnesis({ onBack }: Props) {
  const [activeTab, setActiveTab] = useState('S');

  return (
    <div className="flex flex-col gap-8 animate-fade-in pb-20">
      <div className="flex items-center justify-between no-print">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5"><span className="material-symbols-outlined">arrow_back</span></button>
          <h3 className="text-3xl font-black text-white uppercase">Registro SOAP</h3>
        </div>
      </div>

      <div className="flex gap-4 no-print">
        {['S', 'O', 'A', 'P'].map(letter => (
          <button key={letter} onClick={() => setActiveTab(letter)} className={`w-16 h-16 rounded-2xl font-black text-2xl transition-all border ${activeTab === letter ? 'bg-amber-500 text-background-dark border-amber-400 shadow-lg' : 'bg-white/5 text-gray-500 border-white/10 hover:bg-white/10'}`}>
            {letter}
          </button>
        ))}
      </div>

      <div className="glass-card p-10 rounded-[3rem] border border-white/10 min-h-[400px]">
        {activeTab === 'S' && <div className="space-y-4">
          <h4 className="text-amber-500 font-bold uppercase tracking-widest text-xs">Subjetivo</h4>
          <p className="text-text-secondary text-sm">Identificação, Queixa, HMA, Antecedentes e História Social.</p>
          <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white min-h-[300px] resize-none" placeholder="Relato do paciente..." />
        </div>}
        {activeTab === 'O' && <div className="space-y-4">
          <h4 className="text-amber-500 font-bold uppercase tracking-widest text-xs">Objetivo</h4>
          <p className="text-text-secondary text-sm">Dados mensuráveis, Sinais Vitais e Exame Físico.</p>
          <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white min-h-[300px] resize-none" placeholder="Achados clínicos..." />
        </div>}
        {activeTab === 'A' && <div className="space-y-4">
          <h4 className="text-amber-500 font-bold uppercase tracking-widest text-xs">Avaliação</h4>
          <p className="text-text-secondary text-sm">Lista numerada de problemas e diagnósticos.</p>
          <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white min-h-[300px] resize-none" placeholder="1. Hipótese..." />
        </div>}
        {activeTab === 'P' && <div className="space-y-4">
          <h4 className="text-amber-500 font-bold uppercase tracking-widest text-xs">Plano</h4>
          <p className="text-text-secondary text-sm">Condutas vinculadas aos itens da avaliação.</p>
          <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white min-h-[300px] resize-none" placeholder="1. Conduta..." />
        </div>}
      </div>
    </div>
  );
}
