import React, { useState, useMemo } from 'react';

const HASBLEDTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [items, setItems] = useState({
    htn: false, renal: false, liver: false, stroke: false, bleeding: false, inr: false, age65: false, drugs: false, alcohol: false
  });

  const analysis = useMemo(() => {
    let score = 0;
    Object.values(items).forEach(v => { if(v) score += 1; });

    let risk = "Baixo";
    let color = "text-emerald-600";
    if (score >= 3) { risk = "Alto Risco de Sangramento"; color = "text-rose-600"; }

    return { score, risk, color };
  }, [items]);

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10 bg-light-glow min-h-full">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 transition-all shadow-sm">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <span className="px-3 py-1 rounded-full bg-rose-600 text-white text-[9px] font-black uppercase tracking-[0.2em]">FA • RISCO HEMORRÁGICO</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">Escore HAS-BLED</h2>
        </div>
      </header>

      <div className="bg-white border-2 border-slate-200 p-8 rounded-[2.5rem] shadow-strong flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { id: 'htn', label: 'Hipertensão (PAS &gt; 160)' },
            { id: 'renal', label: 'Disfunção Renal (Creat &gt; 2.3)' },
            { id: 'liver', label: 'Disfunção Hepática (Cirrose/Bili &gt; 2x)' },
            { id: 'stroke', label: 'AVC prévio' },
            { id: 'bleeding', label: 'Hemorragia prévia ou predisposição' },
            { id: 'inr', label: 'INR lábil' },
            { id: 'age65', label: 'Idade &gt; 65 anos' },
            { id: 'drugs', label: 'Drogas (Aspirina/AINEs)' },
            { id: 'alcohol', label: 'Álcool (≥ 8 doses/semana)' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setItems({...items, [item.id]: !(items as any)[item.id]})}
              className={`p-4 rounded-2xl border-2 transition-all font-bold text-sm text-left ${
                (items as any)[item.id] ? 'bg-rose-50 border-rose-600/30 text-rose-900' : 'bg-slate-50 border-slate-100 text-slate-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="p-8 rounded-[2rem] border-2 border-rose-100 bg-rose-50/20 flex flex-col items-center text-center gap-4">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Escore HAS-BLED</p>
           <p className={`text-7xl font-black ${analysis.color}`}>{analysis.score}</p>
           <p className={`text-xl font-black uppercase ${analysis.color}`}>{analysis.risk}</p>
           <p className="text-xs font-bold text-slate-500 max-w-md">
             {analysis.score >= 3 ? "Atenção: Escore ≥ 3 sugere cautela e acompanhamento mais frequente, mas não contraindica anticoagulação se CHA₂DS₂-VASc indicar benefício." : "Risco hemorrágico gerenciável."}
           </p>
        </div>
      </div>
    </div>
  );
};

export default HASBLEDTool;