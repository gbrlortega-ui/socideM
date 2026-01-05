import React, { useState, useMemo } from 'react';

const RCRITool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [items, setItems] = useState({
    highRisk: false, ihd: false, chf: false, stroke: false, insulin: false, creatinine: false
  });

  const analysis = useMemo(() => {
    let score = 0;
    Object.values(items).forEach(v => { if(v) score += 1; });

    const table = [
      { score: 0, class: 'I', risk: '0.4%', desc: 'MUITO BAIXO' },
      { score: 1, class: 'II', risk: '0.9%', desc: 'BAIXO' },
      { score: 2, class: 'III', risk: '6.6%', desc: 'MODERADO' },
      { score: 3, class: 'IV', risk: '11.0%+', desc: 'ALTO' }
    ];

    const result = table[Math.min(score, 3)];
    let color = score >= 2 ? "text-rose-600" : "text-emerald-600";

    return { score, result, color };
  }, [items]);

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10 bg-light-glow min-h-full">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all shadow-sm">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <span className="px-3 py-1 rounded-full bg-slate-800 text-white text-[9px] font-black uppercase tracking-[0.2em]">CIRURGIA • RISCO CARDÍACO</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">Escore RCRI (Índice de Lee)</h2>
        </div>
      </header>

      <div className="bg-white border-2 border-slate-200 p-8 rounded-[2.5rem] shadow-strong flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: 'highRisk', label: 'Cirurgia de Alto Risco (Intraperitoneal, intratorácica ou suprainguinal)' },
            { id: 'ihd', label: 'Histórico de Isquemia Miocárdica' },
            { id: 'chf', label: 'Histórico de Insuficiência Cardíaca Congestiva' },
            { id: 'stroke', label: 'Histórico de Doença Cerebrovascular' },
            { id: 'insulin', label: 'Uso pré-operatório de Insulina' },
            { id: 'creatinine', label: 'Creatinina pré-operatória &gt; 2.0 mg/dL' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setItems({...items, [item.id]: !(items as any)[item.id]})}
              className={`p-5 rounded-2xl border-2 transition-all font-bold text-sm text-left flex justify-between items-center ${
                (items as any)[item.id] ? 'bg-blue-50 border-blue-600/30 text-blue-900' : 'bg-slate-50 border-slate-100 text-slate-500'
              }`}
            >
              <span>{item.label}</span>
              {(items as any)[item.id] && <span className="material-symbols-outlined text-blue-600">check_circle</span>}
            </button>
          ))}
        </div>

        <div className="p-10 rounded-[2.5rem] border-2 border-blue-100 bg-blue-50/20 flex flex-col md:flex-row items-center gap-10">
           <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Escore Lee</p>
              <p className={`text-7xl font-black ${analysis.color}`}>{analysis.score}</p>
           </div>
           <div className="flex-1 space-y-4">
              <div className="grid grid-cols-2 gap-6">
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Classe de Risco</p>
                    <p className="text-3xl font-black text-slate-900">{analysis.result.class}</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Eventos Cardíacos</p>
                    <p className="text-3xl font-black text-slate-900">{analysis.result.risk}</p>
                 </div>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-blue-100">
                 <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Interpretação</p>
                 <p className={`text-lg font-black ${analysis.color}`}>{analysis.result.desc}</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default RCRITool;