import React, { useState, useMemo } from 'react';

const ChildPughTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [data, setData] = useState({
    encep: 1, ascites: 1, bili: 1, albumin: 1, inr: 1
  });

  const analysis = useMemo(() => {
    const score = data.encep + data.ascites + data.bili + data.albumin + data.inr;
    let classe = 'A';
    let survival = '100% / 85%';
    let color = 'text-emerald-600';

    if (score >= 10) { classe = 'C'; survival = '45% / 35%'; color = 'text-rose-600'; }
    else if (score >= 7) { classe = 'B'; survival = '80% / 60%'; color = 'text-amber-600'; }

    return { score, classe, survival, color };
  }, [data]);

  const OptionBtn = ({ field, val, label }: { field: keyof typeof data, val: number, label: string }) => (
    <button
      onClick={() => setData({...data, [field]: val})}
      className={`flex-1 p-3 rounded-xl border-2 text-[10px] font-black uppercase transition-all ${
        data[field] === val ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-blue-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10 bg-light-glow min-h-full">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all shadow-sm">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <span className="px-3 py-1 rounded-full bg-blue-800 text-white text-[9px] font-black uppercase tracking-[0.2em]">HEPATOLOGIA • CIRROSE</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">Escore Child-Pugh</h2>
        </div>
      </header>

      <div className="bg-white border-2 border-slate-200 p-8 rounded-[2.5rem] shadow-strong flex flex-col gap-6">
        <div className="space-y-6">
           <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Encefalopatia Hepática</label>
              <div className="flex gap-2">
                 <OptionBtn field="encep" val={1} label="Ausente (1)" />
                 <OptionBtn field="encep" val={2} label="Grau 1-2 (2)" />
                 <OptionBtn field="encep" val={3} label="Grau 3-4 (3)" />
              </div>
           </div>
           <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Ascite</label>
              <div className="flex gap-2">
                 <OptionBtn field="ascites" val={1} label="Ausente (1)" />
                 <OptionBtn field="ascites" val={2} label="Leve / Controlada (2)" />
                 <OptionBtn field="ascites" val={3} label="Moderada / Tensa (3)" />
              </div>
           </div>
           <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Bilirrubina Total (mg/dL)</label>
              <div className="flex gap-2">
                 <OptionBtn field="bili" val={1} label="&lt; 2.0 (1)" />
                 <OptionBtn field="bili" val={2} label="2.0 - 3.0 (2)" />
                 <OptionBtn field="bili" val={3} label="&gt; 3.0 (3)" />
              </div>
           </div>
           <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Albumina Sérica (g/dL)</label>
              <div className="flex gap-2">
                 <OptionBtn field="albumin" val={1} label="&gt; 3.5 (1)" />
                 <OptionBtn field="albumin" val={2} label="2.8 - 3.5 (2)" />
                 <OptionBtn field="albumin" val={3} label="&lt; 2.8 (3)" />
              </div>
           </div>
           <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">RNI (INR)</label>
              <div className="flex gap-2">
                 <OptionBtn field="inr" val={1} label="&lt; 1.7 (1)" />
                 <OptionBtn field="inr" val={2} label="1.7 - 2.3 (2)" />
                 <OptionBtn field="inr" val={3} label="&gt; 2.3 (3)" />
              </div>
           </div>
        </div>

        <div className="p-10 rounded-[2.5rem] border-2 border-blue-100 bg-blue-50/20 flex flex-col md:flex-row items-center gap-12 animate-fade-in mt-4">
           <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pontos Totais</p>
              <p className={`text-7xl font-black ${analysis.color}`}>{analysis.score}</p>
           </div>
           <div className="flex-1 grid grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm text-center">
                 <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Classe Child</p>
                 <p className={`text-5xl font-black ${analysis.color}`}>{analysis.classe}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm text-center">
                 <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Sobrevida (1a/2a)</p>
                 <p className="text-3xl font-black text-slate-800">{analysis.survival}</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ChildPughTool;