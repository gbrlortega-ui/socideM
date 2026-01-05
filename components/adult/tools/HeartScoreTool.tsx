
import React, { useState, useMemo } from 'react';

const HeartScoreTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    region: 'low', // 'low' or 'high' risk countries
    sex: 'M',
    age: 50,
    sbp: 140,
    cholesterol: 200,
    isSmoker: false
  });

  const result = useMemo(() => {
    const { region, sex, age, sbp, cholesterol, isSmoker } = formData;
    
    // Simplificação da matriz SCORE (morte cardiovascular em 10 anos)
    // Valores de referência aproximados para visualização didática
    let base = region === 'low' ? 1 : 2;
    if (sex === 'M') base += 1;
    if (isSmoker) base += 2;
    if (age >= 65) base += 5; else if (age >= 55) base += 3;
    if (sbp >= 160) base += 3; else if (sbp >= 140) base += 1;
    if (cholesterol >= 250) base += 2;

    let riskVal = Math.min(Math.round(base * 0.8), 15);
    
    let color = "bg-emerald-500";
    let desc = "Risco Baixo (< 1%)";
    if (riskVal >= 10) { color = "bg-rose-700"; desc = "Risco Muito Alto (≥ 10%)"; }
    else if (riskVal >= 5) { color = "bg-rose-500"; desc = "Risco Alto (5-9%)"; }
    else if (riskVal >= 1) { color = "bg-amber-500"; desc = "Risco Moderado (1-4%)"; }

    return { riskVal, color, desc };
  }, [formData]);

  const inputClass = "w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 font-bold text-slate-900 transition-all";
  const labelClass = "text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block px-1";

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10 bg-light-glow min-h-full">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all shadow-sm">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <div className="inline-flex mb-1">
            <span className="px-3 py-1 rounded-full bg-blue-100 border-blue-200 border text-blue-700 text-[9px] font-black uppercase tracking-[0.2em]">ADULTO • ESC SCORE</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">SCORE / HeartScore</h2>
        </div>
      </header>

      <div className="bg-white border-2 border-slate-200 p-8 rounded-[2.5rem] shadow-strong space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3">
             <label className={labelClass}>Região de Risco (ESC)</label>
             <div className="flex gap-2">
                <button onClick={() => setFormData({...formData, region: 'low'})} className={`flex-1 py-4 rounded-2xl font-black text-xs border-2 transition-all ${formData.region === 'low' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>BAIXO RISCO (Europa Ocidental)</button>
                <button onClick={() => setFormData({...formData, region: 'high'})} className={`flex-1 py-4 rounded-2xl font-black text-xs border-2 transition-all ${formData.region === 'high' ? 'bg-rose-600 border-rose-600 text-white' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>ALTO RISCO (Europa Oriental / Outros)</button>
             </div>
          </div>
          
          <div>
            <label className={labelClass}>Sexo / Idade</label>
            <div className="flex gap-2 mb-2">
              <button onClick={() => setFormData({...formData, sex: 'M'})} className={`flex-1 py-2 rounded-xl font-black text-[10px] border-2 ${formData.sex === 'M' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>M</button>
              <button onClick={() => setFormData({...formData, sex: 'F'})} className={`flex-1 py-2 rounded-xl font-black text-[10px] border-2 ${formData.sex === 'F' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>F</button>
            </div>
            <input type="number" value={formData.age} onChange={e => setFormData({...formData, age: parseInt(e.target.value)})} className={inputClass} placeholder="Idade" />
          </div>

          <div>
            <label className={labelClass}>PA Sistólica / Colest.</label>
            <input type="number" value={formData.sbp} onChange={e => setFormData({...formData, sbp: parseInt(e.target.value)})} className={`${inputClass} mb-2`} placeholder="PAS mmHg" />
            <input type="number" value={formData.cholesterol} onChange={e => setFormData({...formData, cholesterol: parseInt(e.target.value)})} className={inputClass} placeholder="CT mg/dL" />
          </div>

          <div className="flex flex-col justify-end pb-1">
             <label className="flex items-center gap-3 p-4 border-2 rounded-2xl cursor-pointer hover:bg-slate-50 border-slate-100 h-full">
               <input type="checkbox" checked={formData.isSmoker} onChange={e => setFormData({...formData, isSmoker: e.target.checked})} className="size-6 text-blue-600 rounded" />
               <span className="font-bold text-slate-700 text-xs uppercase">Fumante</span>
             </label>
          </div>
        </div>

        <div className="p-10 rounded-[2.5rem] border-2 border-slate-100 bg-slate-50 flex flex-col md:flex-row items-center gap-12 animate-fade-in shadow-inner">
           <div className={`size-32 rounded-full flex items-center justify-center text-white font-black text-4xl shadow-xl ${result.color}`}>
              {result.riskVal}%
           </div>
           <div className="flex-1 space-y-3 text-center md:text-left">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Risco de Evento CV Fatal em 10 anos</p>
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">{result.desc}</h3>
              <p className="text-xs font-bold text-slate-500 leading-relaxed max-w-lg">
                O SCORE estima o risco de morte por doença cardiovascular. Note que para pacientes jovens, um risco absoluto baixo pode esconder um risco relativo muito alto.
              </p>
           </div>
        </div>

        <p className="text-[10px] text-slate-400 font-bold border-t border-slate-100 pt-6 text-center italic">
          Nota: O Brasil geralmente é classificado como região de risco moderado/alto. Utilize o modelo OPAS (também disponível) para maior precisão regional.
        </p>
      </div>
    </div>
  );
};

export default HeartScoreTool;
