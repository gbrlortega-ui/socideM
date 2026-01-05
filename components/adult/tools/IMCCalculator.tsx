
import React, { useState, useMemo } from 'react';

const IMCCalculator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [sex, setSex] = useState<'M' | 'F'>('M');
  const [activityFactor, setActivityFactor] = useState<number>(1.2);

  const results = useMemo(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    const a = parseInt(age);

    if (isNaN(w) || isNaN(h) || h <= 0) return null;

    const imc = w / (h * h);
    
    // Superfície Corporal (Mosteller)
    const sc = Math.sqrt((w * (h * 100)) / 3600);

    // Harris-Benedict (TMB)
    let tmb = 0;
    if (!isNaN(a)) {
      if (sex === 'M') {
        tmb = 66.5 + (13.75 * w) + (5.003 * h * 100) - (6.75 * a);
      } else {
        tmb = 655.1 + (9.563 * w) + (1.850 * h * 100) - (4.676 * a);
      }
    }

    const tdee = tmb * activityFactor;

    let classification = "Eutrofia";
    let color = "text-emerald-600";
    if (imc < 18.5) { classification = "Baixo Peso"; color = "text-amber-500"; }
    else if (imc < 25) { classification = "Eutrofia"; color = "text-emerald-600"; }
    else if (imc < 30) { classification = "Sobrepeso"; color = "text-amber-600"; }
    else { classification = "Obesidade"; color = "text-rose-600"; }

    return { imc, sc, tmb, tdee, classification, color };
  }, [weight, height, age, sex, activityFactor]);

  const inputClass = "w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl outline-none focus:border-blue-500 font-bold text-slate-900 transition-all";
  const labelClass = "text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block px-1";

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10 bg-light-glow min-h-full">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          #printable-card { border: none !important; shadow: none !important; padding: 0 !important; }
          @page { size: A5; margin: 1cm; }
        }
      `}</style>

      <header className="flex flex-col gap-5 no-print">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm group">
            <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
          </button>
          <div>
            <div className="inline-flex mb-1">
              <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-sm">
                ADULTO • ANTROPOMETRIA
              </span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">IMC e Metabolismo</h2>
          </div>
        </div>
      </header>

      <div id="printable-card" className="bg-white border-2 border-slate-200 p-8 rounded-[2.5rem] shadow-strong flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 no-print">
          <div>
            <label className={labelClass}>Peso (kg)</label>
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="70" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Altura (cm)</label>
            <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="175" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Idade (anos)</label>
            <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="30" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Sexo Biológico</label>
            <div className="flex gap-2">
              <button onClick={() => setSex('M')} className={`flex-1 py-4 rounded-2xl font-black text-xs border-2 transition-all ${sex === 'M' ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>M</button>
              <button onClick={() => setSex('F')} className={`flex-1 py-4 rounded-2xl font-black text-xs border-2 transition-all ${sex === 'F' ? 'bg-pink-500 text-white border-pink-500 shadow-md' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>F</button>
            </div>
          </div>
        </div>

        <div className="no-print">
          <label className={labelClass}>Fator de Atividade</label>
          <select value={activityFactor} onChange={e => setActivityFactor(parseFloat(e.target.value))} className={inputClass}>
            <option value={1.2}>Sedentário (pouco ou nenhum exercício)</option>
            <option value={1.375}>Levemente Ativo (exercício 1-3 dias/sem)</option>
            <option value={1.55}>Moderadamente Ativo (exercício 3-5 dias/sem)</option>
            <option value={1.725}>Altamente Ativo (exercício pesado 6-7 dias/sem)</option>
            <option value={1.9}>Extremamente Ativo (trabalho físico pesado)</option>
          </select>
        </div>

        {results ? (
          <div className="flex flex-col gap-8 p-8 rounded-[2rem] border-2 border-blue-100 bg-blue-50/30 animate-fade-in">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm text-center">
                   <p className="text-[10px] font-black text-slate-400 uppercase mb-1">IMC</p>
                   <p className="text-3xl font-black text-slate-900 leading-none">{results.imc.toFixed(1)}</p>
                   <p className={`text-[9px] font-black uppercase mt-2 ${results.color}`}>{results.classification}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm text-center">
                   <p className="text-[10px] font-black text-slate-400 uppercase mb-1">SC</p>
                   <p className="text-3xl font-black text-slate-900 leading-none">{results.sc.toFixed(2)}</p>
                   <p className="text-[9px] font-black text-blue-600 uppercase mt-2">m² (Mosteller)</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm text-center">
                   <p className="text-[10px] font-black text-slate-400 uppercase mb-1">TMB</p>
                   <p className="text-3xl font-black text-slate-900 leading-none">{Math.round(results.tmb)}</p>
                   <p className="text-[9px] font-black text-blue-600 uppercase mt-2">kcal/dia</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm text-center">
                   <p className="text-[10px] font-black text-slate-400 uppercase mb-1">GET</p>
                   <p className="text-3xl font-black text-slate-900 leading-none">{Math.round(results.tdee)}</p>
                   <p className="text-[9px] font-black text-blue-600 uppercase mt-2">Gast. Energ. Total</p>
                </div>
             </div>

             <div className="space-y-4">
                <div className="p-5 bg-white rounded-2xl border border-blue-100">
                   <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-3 border-b border-slate-50 pb-2">Interpretação Nutricional</h4>
                   <p className="text-sm font-bold text-slate-600 leading-relaxed">
                     O paciente apresenta um <span className={`font-black ${results.color}`}>IMC de {results.imc.toFixed(1)} kg/m²</span>, classificado como <span className="text-slate-900 uppercase">{results.classification}</span>. 
                     Sua taxa metabólica basal é de aproximadamente <span className="text-blue-700 font-black">{Math.round(results.tmb)} kcal</span>.
                   </p>
                </div>
             </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400 bg-slate-50 rounded-[2rem] border-2 border-slate-100 border-dashed">
            <span className="material-symbols-outlined text-6xl mb-4 opacity-20">straighten</span>
            <p className="font-black uppercase tracking-widest text-[11px]">Insira peso e altura para calcular</p>
          </div>
        )}

        <div className="pt-6 border-t border-slate-100">
           <p className="text-[10px] text-slate-400 font-bold leading-relaxed">
             <span className="text-slate-900 font-black">Nota Técnica:</span> IMC = Peso/Alt². Superfície Corporal via fórmula de Mosteller. Taxa Metabólica Basal via Harris-Benedict. O Gasto Energético Total (GET/TDEE) inclui o fator de atividade física.
           </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 no-print pb-12">
        <button onClick={() => window.print()} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-blue-600 transition-all shadow-lg">
          <span className="material-symbols-outlined">print</span> Imprimir A5
        </button>
      </div>
    </div>
  );
};

export default IMCCalculator;
