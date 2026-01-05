import React, { useState } from 'react';

const RiskStratificationTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [active, setActive] = useState<'has' | 'dm'>('has');

  const HAS_RISKS = [
    { level: "Baixo", color: "bg-emerald-500", desc: "Estágio 1 s/ fatores de risco.", freq: "Anual" },
    { level: "Moderado", color: "bg-amber-500", desc: "Estágio 1 ou 2 c/ 1-2 fatores.", freq: "Semestral" },
    { level: "Alto", color: "bg-orange-600", desc: "Estágio 3 ou Estágio 1-2 c/ LOA ou DCV.", freq: "Trimestral" },
    { level: "Crítico", color: "bg-rose-700", desc: "SCA, AVC, Emergência Hipertensiva.", freq: "Acompanhamento Intensivo" }
  ];

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10 bg-light-glow min-h-full">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-600 shadow-sm">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-[9px] font-black uppercase tracking-[0.2em]">APS • CLÍNICA E GESTÃO</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Estratificação de Risco</h2>
        </div>
      </header>

      <div className="bg-white border-2 border-slate-200 p-8 rounded-[3rem] shadow-strong space-y-10">
        <div className="flex gap-2">
           <button onClick={() => setActive('has')} className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase border-2 transition-all ${active === 'has' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 text-slate-400'}`}>Hipertensão (HAS)</button>
           <button onClick={() => setActive('dm')} className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase border-2 transition-all ${active === 'dm' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 text-slate-400'}`}>Diabetes (DM)</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {HAS_RISKS.map((r, i) => (
             <div key={i} className="p-6 rounded-3xl border-2 border-slate-50 bg-slate-50/50 space-y-4 flex flex-col">
                <div className="flex justify-between items-center">
                   <div className="flex items-center gap-3">
                      <div className={`size-4 rounded-full ${r.color}`}></div>
                      <span className="font-black text-slate-900 text-sm">Risco {r.level}</span>
                   </div>
                   <span className="px-3 py-1 rounded-lg bg-white border text-[9px] font-black text-emerald-600 uppercase tracking-widest">{r.freq}</span>
                </div>
                <p className="text-xs font-bold text-slate-600 leading-relaxed flex-1">{r.desc}</p>
                <button className="w-full py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors">Ver Plano de Cuidado</button>
             </div>
           ))}
        </div>

        <div className="p-6 border-t border-slate-100 flex flex-col items-center gap-4 text-center">
           <p className="text-xs font-bold text-slate-500 leading-relaxed max-w-lg">
             A estratificação define a **periodicidade das consultas** e a necessidade de **visita domiciliar** do ACS ou equipe multiprofissional.
           </p>
        </div>
      </div>
    </div>
  );
};

export default RiskStratificationTool;