import React, { useState } from 'react';

const PTSTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    diagnostico: '', metas: '', responsaveis: '', reavaliacao: ''
  });

  const STEPS = [
    { label: "1. Diagnóstico Multidimensional", placeholder: "Descreva a complexidade (fatores clínicos, sociais, familiares, psicológicos)...", key: "diagnostico" },
    { label: "2. Definição de Metas", placeholder: "O que se pretende alcançar em curto e médio prazo? (Ex: estabilizar humor, regular diabetes, rede apoio)...", key: "metas" },
    { label: "3. Divisão de Responsabilidades", placeholder: "Quem fará o quê? (Médico, ACS, Assistente Social, Família, CAPS)...", key: "responsaveis" },
    { label: "4. Reavaliação", placeholder: "Data e critérios para ajuste do plano...", key: "reavaliacao" }
  ];

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10 bg-light-glow min-h-full">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-600 shadow-sm">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-[9px] font-black uppercase tracking-[0.2em]">APS • CASOS COMPLEXOS</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Plano Terapêutico Singular (PTS)</h2>
        </div>
      </header>

      <div className="bg-white border-2 border-slate-200 p-8 rounded-[3rem] shadow-strong space-y-10">
        <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100 flex gap-4 items-start">
           <span className="material-symbols-outlined text-emerald-600 text-4xl">psychology</span>
           <div className="space-y-1">
              <h3 className="text-lg font-black text-emerald-900 uppercase">Quando aplicar?</h3>
              <p className="text-xs font-bold text-emerald-700 leading-relaxed">
                Indicado para casos de alta vulnerabilidade biopsicossocial, doenças crônicas descompensadas, saúde mental grave ou famílias com conflitos intensos que não respondem à abordagem comum.
              </p>
           </div>
        </div>

        <div className="space-y-10">
           {STEPS.map(step => (
             <div key={step.key} className="space-y-3">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{step.label}</label>
                <textarea 
                   className="w-full h-32 px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-[2rem] outline-none text-sm font-bold text-slate-900 focus:border-emerald-500/50 resize-none transition-all"
                   placeholder={step.placeholder}
                   value={(formData as any)[step.key]}
                   onChange={e => setFormData({...formData, [step.key]: e.target.value})}
                />
             </div>
           ))}
        </div>

        <div className="flex gap-4 no-print">
           <button onClick={() => window.print()} className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-emerald-600 transition-all flex items-center justify-center gap-3">
              <span className="material-symbols-outlined">print</span> Imprimir Guia do Plano
           </button>
           <button className="flex-1 py-4 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">Limpar</button>
        </div>
      </div>
    </div>
  );
};

export default PTSTool;