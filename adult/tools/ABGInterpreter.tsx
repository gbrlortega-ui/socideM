
import React, { useState, useMemo } from 'react';

const ABGInterpreter: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [ph, setPh] = useState('');
  const [pco2, setPco2] = useState('');
  const [hco3, setHco3] = useState('');

  const result = useMemo(() => {
    const PH = parseFloat(ph);
    const PCO2 = parseFloat(pco2);
    const HCO3 = parseFloat(hco3);

    if (isNaN(PH) || isNaN(PCO2) || isNaN(HCO3)) return null;

    let primary = "Normal";
    let type = "Acido-base equilibrado";
    let compensation = "";
    let color = "text-emerald-600";

    // Lógica Básica
    if (PH < 7.35) {
      color = "text-rose-600";
      if (PCO2 > 45) {
        primary = "Acidose Respiratória";
        const expHCO3 = 24 + (0.1 * (PCO2 - 40)); // Aguda
        compensation = `HCO3 esperado (agudo): ${expHCO3.toFixed(1)}. Se maior, compensação crônica em curso.`;
      } else {
        primary = "Acidose Metabólica";
        const winter = (1.5 * HCO3) + 8;
        compensation = `PCO2 esperada (Winter): ${(winter - 2).toFixed(1)} a ${(winter + 2).toFixed(1)}.`;
      }
    } else if (PH > 7.45) {
      color = "text-rose-600";
      if (PCO2 < 35) {
        primary = "Alcalose Respiratória";
        const expHCO3 = 24 - (0.2 * (40 - PCO2));
        compensation = `HCO3 esperado: ${expHCO3.toFixed(1)}.`;
      } else {
        primary = "Alcalose Metabólica";
        const expPCO2 = (0.7 * HCO3) + 21;
        compensation = `PCO2 esperada: ${(expPCO2 - 2).toFixed(1)} a ${(expPCO2 + 2).toFixed(1)}.`;
      }
    }

    return { primary, compensation, color };
  }, [ph, pco2, hco3]);

  const inputClass = "w-full px-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-blue-500 font-black text-slate-900 outline-none transition-all text-center";

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10 bg-light-glow min-h-full">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all shadow-sm">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-[9px] font-black uppercase tracking-[0.2em]">UTI • EQUILÍBRIO ÁCIDO-BASE</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">Interpretador de Gasometria</h2>
        </div>
      </header>

      <div className="bg-white border-2 border-slate-200 p-10 rounded-[3rem] shadow-strong flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block text-center">pH Arterial</label>
              <input type="number" step="0.01" value={ph} onChange={e => setPh(e.target.value)} placeholder="7.40" className={inputClass} />
           </div>
           <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block text-center">pCO₂ (mmHg)</label>
              <input type="number" value={pco2} onChange={e => setPco2(e.target.value)} placeholder="40" className={inputClass} />
           </div>
           <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block text-center">HCO₃⁻ (mEq/L)</label>
              <input type="number" value={hco3} onChange={e => setHco3(e.target.value)} placeholder="24" className={inputClass} />
           </div>
        </div>

        {result ? (
          <div className="p-10 rounded-[2.5rem] border-2 border-blue-100 bg-blue-50/20 animate-fade-in space-y-6">
             <div className="text-center">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Distúrbio Primário</p>
                <h3 className={`text-4xl font-black ${result.color} uppercase tracking-tighter`}>{result.primary}</h3>
             </div>
             {result.compensation && (
                <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm flex flex-col items-center gap-3">
                   <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Compensação Esperada</p>
                   <p className="text-sm font-bold text-slate-700">{result.compensation}</p>
                </div>
             )}
          </div>
        ) : (
          <div className="py-20 text-center text-slate-300 border-2 border-dashed border-slate-100 rounded-[2.5rem]">
             <span className="material-symbols-outlined text-6xl mb-4 opacity-20">science</span>
             <p className="font-black uppercase tracking-widest text-xs">Insira os valores arteriais para interpretar</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ABGInterpreter;
