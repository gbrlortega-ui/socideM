import React, { useState, useMemo } from 'react';
import { RiskLevel } from '../../../types';

const CardiovascularRiskTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    hasCVD: false,
    hasCKD: false,
    hasDM: false,
    age: 40,
    sex: 'Masculino',
    sbp: 120,
    isSmoker: false,
    cholesterol: 200,
    weight: 75,
    height: 175
  });

  const [knowsCholesterol, setKnowsCholesterol] = useState<boolean | null>(null);

  const analysis = useMemo(() => {
    if (formData.hasCVD) return { label: 'MUITO ALTO RISCO', level: 'EXTREME' as RiskLevel, percent: 100, color: 'bg-[#7f1d1d]' };
    if (formData.hasCKD || formData.hasDM) return { label: 'ALTO RISCO', level: 'HIGH' as RiskLevel, percent: 20, color: 'bg-orange-500' };

    let risk = 1;
    const { age, sbp, isSmoker, cholesterol, weight, height, sex } = formData;

    if (age >= 70) risk += 10;
    else if (age >= 60) risk += 6;
    else if (age >= 50) risk += 3;
    else if (age >= 40) risk += 1;

    if (sbp >= 180) risk += 15;
    else if (sbp >= 160) risk += 8;
    else if (sbp >= 140) risk += 4;
    else if (sbp >= 130) risk += 1;

    if (isSmoker) risk += 5;

    if (knowsCholesterol) {
      if (cholesterol >= 300) risk += 8;
      else if (cholesterol >= 240) risk += 4;
      else if (cholesterol >= 200) risk += 1;
    } else {
      const imc = weight / ((height / 100) ** 2);
      if (imc >= 35) risk += 6;
      else if (imc >= 30) risk += 3;
      else if (imc >= 25) risk += 1;
    }

    if (sex === 'Masculino') risk += 2;

    let category: RiskLevel = 'LOW';
    let label = 'BAIXO RISCO (<5%)';
    let color = 'bg-emerald-500';

    if (risk >= 30) { category = 'EXTREME'; label = 'CRÍTICO (≥30%)'; color = 'bg-[#7f1d1d]'; }
    else if (risk >= 20) { category = 'VERY_HIGH'; label = 'MUITO ALTO (20-29%)'; color = 'bg-red-600'; }
    else if (risk >= 10) { category = 'HIGH'; label = 'ALTO RISCO (10-19%)'; color = 'bg-orange-500'; }
    else if (risk >= 5) { category = 'MODERATE'; label = 'MODERADO (5-9%)'; color = 'bg-yellow-400'; }

    return { percent: risk, level: category, label, color };
  }, [formData, knowsCholesterol]);

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
                ADULTO • CARDIOLOGIA
              </span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Risco Cardiovascular</h2>
          </div>
        </div>
      </header>

      <div id="printable-card" className="bg-white border-2 border-slate-200 p-8 rounded-[2.5rem] shadow-strong flex flex-col gap-8">
        <div className="no-print space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
             {[
               { id: 'hasCVD', label: 'Doença Cardiovascular Prévia' },
               { id: 'hasCKD', label: 'Doença Renal Crônica' },
               { id: 'hasDM', label: 'Diabetes Mellitus' }
             ].map(item => (
               <label key={item.id} className="flex items-center gap-3 p-4 border-2 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all">
                 <input type="checkbox" checked={(formData as any)[item.id]} onChange={e => setFormData({...formData, [item.id]: e.target.checked})} className="size-5 text-blue-600 rounded" />
                 <span className="font-bold text-slate-700 text-xs">{item.label}</span>
               </label>
             ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <button onClick={() => setKnowsCholesterol(true)} className={`p-4 border-2 rounded-2xl font-black text-xs transition-all ${knowsCholesterol === true ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>Laboratorial (Com Colesterol)</button>
             <button onClick={() => setKnowsCholesterol(false)} className={`p-4 border-2 rounded-2xl font-black text-xs transition-all ${knowsCholesterol === false ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>Clínico (Com IMC)</button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div>
               <label className={labelClass}>Idade</label>
               <input type="number" value={formData.age} onChange={e => setFormData({...formData, age: parseInt(e.target.value)})} className={inputClass} />
             </div>
             <div>
               <label className={labelClass}>PA Sistólica</label>
               <input type="number" value={formData.sbp} onChange={e => setFormData({...formData, sbp: parseInt(e.target.value)})} className={inputClass} />
             </div>
             {knowsCholesterol ? (
               <div className="col-span-2">
                 <label className={labelClass}>Colesterol Total (mg/dL)</label>
                 <input type="number" value={formData.cholesterol} onChange={e => setFormData({...formData, cholesterol: parseInt(e.target.value)})} className={inputClass} />
               </div>
             ) : (
               <>
                 <div>
                   <label className={labelClass}>Peso (kg)</label>
                   <input type="number" value={formData.weight} onChange={e => setFormData({...formData, weight: parseInt(e.target.value)})} className={inputClass} />
                 </div>
                 <div>
                   <label className={labelClass}>Altura (cm)</label>
                   <input type="number" value={formData.height} onChange={e => setFormData({...formData, height: parseInt(e.target.value)})} className={inputClass} />
                 </div>
               </>
             )}
          </div>
          <label className="flex items-center gap-3 p-4 border-2 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all border-slate-100">
             <input type="checkbox" checked={formData.isSmoker} onChange={e => setFormData({...formData, isSmoker: e.target.checked})} className="size-5 text-blue-600 rounded" />
             <span className="font-bold text-slate-700 text-sm">Fumante Atual</span>
          </label>
        </div>

        <div className="flex flex-col md:flex-row gap-8 p-8 rounded-[2.5rem] border-2 border-blue-100 bg-blue-50/20 animate-fade-in">
           <div className="w-20 h-48 bg-slate-200 rounded-full relative overflow-hidden flex flex-col shrink-0 border-2 border-white shadow-inner">
              <div className="h-[20%] bg-[#7f1d1d]"></div>
              <div className="h-[20%] bg-red-600"></div>
              <div className="h-[20%] bg-orange-500"></div>
              <div className="h-[20%] bg-yellow-400"></div>
              <div className="h-[20%] bg-emerald-500"></div>
              <div className="absolute left-0 right-0 h-1.5 bg-white shadow-lg transition-all duration-700" style={{ bottom: `${Math.min(95, Math.max(5, analysis.percent * 3))}%` }}></div>
           </div>
           
           <div className="flex-1 space-y-6">
              <div className="space-y-1">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Risco Global Estimado</p>
                 <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">{analysis.label}</h2>
              </div>
              <div className="p-5 bg-white rounded-2xl border border-blue-100 space-y-4">
                 <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-50 pb-2">Conduta</h4>
                 <p className="text-sm font-bold text-slate-600 leading-relaxed">
                   {analysis.level === 'EXTREME' || analysis.level === 'VERY_HIGH' 
                     ? "Prioridade máxima: Iniciar ou otimizar estatinas, controle rigoroso de PA ({'<'}130/80) e cessação de tabagismo. Avaliar doença em órgãos-alvo." 
                     : "Manter acompanhamento periódico e incentivar mudanças no estilo de vida. Reavaliar score em 1 ano ou conforme mudança de status clínico."}
                 </p>
              </div>
           </div>
        </div>

        <div className="pt-6 border-t border-slate-100">
           <p className="text-[10px] text-slate-400 font-bold leading-relaxed">
             <span className="text-slate-900 font-black">Nota Técnica:</span> Calculadora baseada no modelo WHO/ISH para a região das Américas (PAHO). Pacientes com DCV prévia, DRC estágios 4-5 ou DM com lesão de órgão-alvo são estratificados automaticamente como alto risco.
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

export default CardiovascularRiskTool;