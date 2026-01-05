
import React, { useState, useMemo } from 'react';

const CHA2DS2VAScTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [items, setItems] = useState({
    chf: false, htn: false, age75: false, age65: false, dm: false, stroke: false, vascular: false, female: false
  });

  const analysis = useMemo(() => {
    let score = 0;
    if (items.chf) score += 1;
    if (items.htn) score += 1;
    if (items.age75) score += 2; else if (items.age65) score += 1;
    if (items.dm) score += 1;
    if (items.stroke) score += 2;
    if (items.vascular) score += 1;
    if (items.female) score += 1;

    let risk = "0.0%";
    let conduta = "Não anticoagular.";
    let color = "text-emerald-600";

    if (score >= 2) { risk = "2.2% - 15.2%"; conduta = "Anticoagulação recomendada (DOACs preferencialmente)."; color = "text-rose-600"; }
    else if (score === 1) { risk = "1.3%"; conduta = "Considerar anticoagulação conforme risco/benefício."; color = "text-amber-600"; }

    return { score, risk, conduta, color };
  }, [items]);

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10 bg-light-glow min-h-full">
      <header className="flex items-center gap-4 no-print">
        <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all shadow-sm">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[9px] font-black uppercase tracking-[0.2em]">FA • TROMBOEMBOLISMO</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">Escore CHA₂DS₂-VASc</h2>
        </div>
      </header>

      <div className="bg-white border-2 border-slate-200 p-8 rounded-[2.5rem] shadow-strong flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: 'chf', label: 'Insuficiência Cardíaca (ou FEVE ≤ 40%)', pts: 1 },
            { id: 'htn', label: 'Hipertensão Arterial', pts: 1 },
            { id: 'age75', label: 'Idade ≥ 75 anos', pts: 2 },
            { id: 'age65', label: 'Idade entre 65-74 anos', pts: 1, disabled: items.age75 },
            { id: 'dm', label: 'Diabetes Mellitus', pts: 1 },
            { id: 'stroke', label: 'AVC / AIT / Tromboembolismo prévio', pts: 2 },
            { id: 'vascular', label: 'Doença Vascular (IAM, DAOP, Placa Aorta)', pts: 1 },
            { id: 'female', label: 'Sexo Feminino', pts: 1 }
          ].map(item => (
            <button
              key={item.id}
              disabled={item.disabled}
              onClick={() => setItems({...items, [item.id]: !(items as any)[item.id]})}
              className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                (items as any)[item.id] ? 'bg-blue-50 border-blue-600/30' : 'bg-slate-50 border-slate-100 opacity-60'
              } ${item.disabled ? 'hidden' : ''}`}
            >
              <span className="font-bold text-slate-800 text-sm">{item.label}</span>
              <span className="font-black text-blue-600">+{item.pts}</span>
            </button>
          ))}
        </div>

        <div className="p-8 rounded-[2rem] border-2 border-blue-100 bg-blue-50/20 flex flex-col md:flex-row items-center gap-10 animate-fade-in">
           <div className="flex flex-col items-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Escore Total</p>
              <p className={`text-7xl font-black ${analysis.color}`}>{analysis.score}</p>
           </div>
           <div className="flex-1 space-y-3">
              <div className="space-y-1">
                 <p className="text-[10px] font-black text-slate-400 uppercase">Risco de AVC / Ano</p>
                 <p className="text-xl font-black text-slate-900">{analysis.risk}</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-blue-100 text-sm font-black text-slate-700 leading-tight">
                {analysis.conduta}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CHA2DS2VAScTool;
