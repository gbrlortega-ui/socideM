import React, { useState, useMemo } from 'react';

const RenalFunctionTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [creatinine, setCreatinine] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [sex, setSex] = useState<'M' | 'F'>('M');
  const [weight, setWeight] = useState<string>('');

  const analysis = useMemo(() => {
    const cr = parseFloat(creatinine);
    const a = parseInt(age);
    const w = parseFloat(weight);

    if (isNaN(cr) || isNaN(a) || cr <= 0) return null;

    // CKD-EPI 2021 (Ref: NKF, sem fator de raça)
    const k = sex === 'F' ? 0.7 : 0.9;
    const alpha = sex === 'F' ? -0.241 : -0.302;
    const sexConstant = sex === 'F' ? 1.012 : 1.0;
    
    const minCrK = Math.min(cr / k, 1);
    const maxCrK = Math.max(cr / k, 1);
    
    const gfr = 142 * Math.pow(minCrK, alpha) * Math.pow(maxCrK, -1.200) * Math.pow(0.9938, a) * sexConstant;

    // Cockcroft-Gault (para ajuste de dose)
    let cg = null;
    if (!isNaN(w)) {
      cg = ((140 - a) * w) / (72 * cr);
      if (sex === 'F') cg *= 0.85;
    }

    // KDIGO Stratification
    let stage = "G1";
    let desc = "Normal ou elevada";
    let color = "bg-emerald-100 text-emerald-700 border-emerald-200";

    if (gfr < 15) { stage = "G5"; desc = "Falência Renal"; color = "bg-rose-600 text-white border-rose-700"; }
    else if (gfr < 30) { stage = "G4"; desc = "Diminuição severa"; color = "bg-rose-100 text-rose-700 border-rose-200"; }
    else if (gfr < 45) { stage = "G3b"; desc = "Diminuição moderada a severa"; color = "bg-orange-100 text-orange-700 border-orange-200"; }
    else if (gfr < 60) { stage = "G3a"; desc = "Diminuição leve a moderada"; color = "bg-amber-100 text-amber-700 border-amber-200"; }
    else if (gfr < 90) { stage = "G2"; desc = "Diminuição leve"; color = "bg-emerald-50 text-emerald-600 border-emerald-100"; }

    return { gfr, cg, stage, desc, color };
  }, [creatinine, age, sex, weight]);

  const inputClass = "w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl outline-none focus:border-blue-500 font-bold text-slate-900 transition-all";
  const labelClass = "text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block px-1";

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10 bg-light-glow min-h-full">
      <header className="flex flex-col gap-5 no-print">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm group">
            <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
          </button>
          <div>
            <div className="inline-flex mb-1">
              <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-sm">
                ADULTO • NEFROLOGIA
              </span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Função Renal</h2>
          </div>
        </div>
      </header>

      <div className="bg-white border-2 border-slate-200 p-8 rounded-[2.5rem] shadow-strong flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 no-print">
          <div>
            <label className={labelClass}>Creatinina Sérica (mg/dL)</label>
            <input type="number" step="0.01" value={creatinine} onChange={e => setCreatinine(e.target.value)} placeholder="1.0" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Idade (anos)</label>
            <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="60" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Sexo Biológico</label>
            <div className="flex gap-2">
              <button onClick={() => setSex('M')} className={`flex-1 py-4 rounded-2xl font-black text-xs border-2 transition-all ${sex === 'M' ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>M</button>
              <button onClick={() => setSex('F')} className={`flex-1 py-4 rounded-2xl font-black text-xs border-2 transition-all ${sex === 'F' ? 'bg-pink-500 text-white border-pink-500 shadow-md' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>F</button>
            </div>
          </div>
          <div>
            <label className={labelClass}>Peso (kg) - opcional para CG</label>
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="70" className={inputClass} />
          </div>
        </div>

        {analysis ? (
          <div className="flex flex-col gap-8 p-8 rounded-[2rem] border-2 border-blue-100 bg-blue-50/30 animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm text-center">
                   <p className="text-[10px] font-black text-slate-400 uppercase mb-1">TFG Estimada</p>
                   <p className="text-4xl font-black text-slate-900 leading-none">{analysis.gfr.toFixed(0)}</p>
                   <p className="text-[9px] font-black text-blue-600 uppercase mt-2">mL/min/1.73m² (CKD-EPI 2021)</p>
                </div>
                <div className={`p-6 rounded-2xl border shadow-sm text-center flex flex-col justify-center ${analysis.color}`}>
                   <p className="text-[10px] font-black uppercase mb-1 opacity-70">Estadiamento KDIGO</p>
                   <p className="text-3xl font-black leading-none">{analysis.stage}</p>
                   <p className="text-[9px] font-black uppercase mt-2">{analysis.desc}</p>
                </div>
                {analysis.cg && (
                  <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Clearance Creatinina</p>
                    <p className="text-4xl font-black text-slate-900 leading-none">{analysis.cg.toFixed(0)}</p>
                    <p className="text-[9px] font-black text-blue-600 uppercase mt-2">mL/min (Cockcroft-Gault)</p>
                  </div>
                )}
             </div>

             <div className="p-5 bg-white rounded-2xl border border-blue-100 space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-50 pb-2">Conduta Recomendada</h4>
                <p className="text-sm font-bold text-slate-600 leading-relaxed">
                   {analysis.gfr < 60 ? (
                     <span>Atenção: TFG {' < '} 60 configura Doença Renal Crônica se persistente por {' > '} 3 meses. Avaliar albuminúria, ajustar doses de medicamentos nefrotóxicos e considerar encaminhamento à nefrologia conforme ACR.</span>
                   ) : (
                     "Função renal dentro da normalidade ou com alteração leve. Monitorar se houver fatores de risco (DM/HAS)."
                   )}
                </p>
             </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400 bg-slate-50 rounded-[2rem] border-2 border-slate-100 border-dashed">
            <span className="material-symbols-outlined text-6xl mb-4 opacity-20">biotech</span>
            <p className="font-black uppercase tracking-widest text-[11px]">Insira Creatinina e Idade para calcular</p>
          </div>
        )}

        <div className="pt-6 border-t border-slate-100">
           <p className="text-[10px] text-slate-400 font-bold leading-relaxed">
             <span className="text-slate-900 font-black">Nota Metodológica:</span> CKD-EPI 2021 é a fórmula recomendada atualmente por não incluir ajuste de raça. Cockcroft-Gault é preferível para ajuste de dose de antibióticos e quimioterápicos conforme bulas.
           </p>
        </div>
      </div>
    </div>
  );
};

export default RenalFunctionTool;