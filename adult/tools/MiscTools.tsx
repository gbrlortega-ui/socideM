
import React, { useState, useMemo } from 'react';

const MiscTools: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  // PAM State
  const [pas, setPas] = useState('');
  const [pad, setPad] = useState('');

  // RCQ State
  const [cintura, setCintura] = useState('');
  const [quadril, setQuadril] = useState('');
  const [sexo, setSexo] = useState<'M' | 'F'>('M');

  const pam = useMemo(() => {
    const s = parseFloat(pas);
    const d = parseFloat(pad);
    if (isNaN(s) || isNaN(d)) return null;
    return ((2 * d + s) / 3).toFixed(0);
  }, [pas, pad]);

  const rcq = useMemo(() => {
    const c = parseFloat(cintura);
    const q = parseFloat(quadril);
    if (isNaN(c) || isNaN(q) || q === 0) return null;
    const ratio = c / q;
    let risk = "Baixo";
    let color = "text-emerald-600";
    
    if (sexo === 'M') {
      if (ratio >= 1.0) { risk = "Muito Alto"; color = "text-rose-600"; }
      else if (ratio >= 0.95) { risk = "Alto"; color = "text-orange-600"; }
    } else {
      if (ratio >= 0.85) { risk = "Muito Alto"; color = "text-rose-600"; }
      else if (ratio >= 0.80) { risk = "Alto"; color = "text-orange-600"; }
    }

    return { ratio: ratio.toFixed(2), risk, color };
  }, [cintura, quadril, sexo]);

  const inputClass = "w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 font-bold text-slate-900 outline-none";
  const labelClass = "text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 px-1 block";

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-12 bg-light-glow min-h-full">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all shadow-sm">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Ferramentas de Beira de Leito</h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* PAM */}
        <section className="bg-white border-2 border-slate-200 p-8 rounded-[2.5rem] shadow-card flex flex-col gap-6">
           <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="size-10 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center">
                 <span className="material-symbols-outlined">pulse_alert</span>
              </div>
              <h3 className="font-black text-slate-900 uppercase tracking-tight">Pressão Arterial Média</h3>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <div>
                 <label className={labelClass}>PAS (mmHg)</label>
                 <input type="number" value={pas} onChange={e => setPas(e.target.value)} className={inputClass} placeholder="120" />
              </div>
              <div>
                 <label className={labelClass}>PAD (mmHg)</label>
                 <input type="number" value={pad} onChange={e => setPad(e.target.value)} className={inputClass} placeholder="80" />
              </div>
           </div>
           <div className="mt-2 p-6 rounded-2xl bg-slate-50 flex items-center justify-between border border-slate-100 shadow-inner">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resultado PAM</span>
              <span className="text-4xl font-black text-rose-600">{pam || '--'} <span className="text-xs">mmHg</span></span>
           </div>
        </section>

        {/* RCQ */}
        <section className="bg-white border-2 border-slate-200 p-8 rounded-[2.5rem] shadow-card flex flex-col gap-6">
           <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="size-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                 <span className="material-symbols-outlined">accessibility</span>
              </div>
              <h3 className="font-black text-slate-900 uppercase tracking-tight">Razão Cintura-Quadril</h3>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <div>
                 <label className={labelClass}>Cintura (cm)</label>
                 <input type="number" value={cintura} onChange={e => setCintura(e.target.value)} className={inputClass} />
              </div>
              <div>
                 <label className={labelClass}>Quadril (cm)</label>
                 <input type="number" value={quadril} onChange={e => setQuadril(e.target.value)} className={inputClass} />
              </div>
              <div className="col-span-2 flex gap-2">
                 <button onClick={() => setSexo('M')} className={`flex-1 py-2 rounded-xl border-2 text-[10px] font-black transition-all ${sexo === 'M' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>HOMEM</button>
                 <button onClick={() => setSexo('F')} className={`flex-1 py-2 rounded-xl border-2 text-[10px] font-black transition-all ${sexo === 'F' ? 'bg-pink-500 border-pink-500 text-white' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>MULHER</button>
              </div>
           </div>
           {rcq && (
             <div className="mt-2 p-6 rounded-2xl bg-slate-50 flex flex-col items-center border border-slate-100 animate-fade-in shadow-inner">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Índice RCQ</span>
                <span className={`text-4xl font-black ${rcq.color}`}>{rcq.ratio}</span>
                <span className={`text-[10px] font-black uppercase mt-1 ${rcq.color}`}>Risco: {rcq.risk}</span>
             </div>
           )}
        </section>
      </div>
    </div>
  );
};

export default MiscTools;
