
import React, { useState, useMemo } from 'react';

const FraminghamScoreTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    age: 45,
    sex: 'M',
    totalChol: 200,
    hdl: 45,
    sbp: 130,
    isTreated: false,
    isSmoker: false
  });

  const analysis = useMemo(() => {
    const { age, sex, totalChol, hdl, sbp, isTreated, isSmoker } = formData;
    let points = 0;

    if (sex === 'M') {
      // Idade M
      if (age >= 75) points += 13; else if (age >= 70) points += 12; else if (age >= 65) points += 11;
      else if (age >= 60) points += 10; else if (age >= 55) points += 8; else if (age >= 50) points += 6;
      else if (age >= 45) points += 3; else if (age >= 40) points += 0; else if (age >= 35) points -= 3;
      else points -= 9;

      // Colesterol M
      if (totalChol >= 280) points += 5; else if (totalChol >= 240) points += 4;
      else if (totalChol >= 200) points += 2; else if (totalChol >= 160) points += 1;

      // Tabagismo M
      if (isSmoker) points += 4;

      // HDL M
      if (hdl < 35) points += 2; else if (hdl < 45) points += 1;
      else if (hdl < 60) points += 0; else points -= 1;

      // PA M
      if (isTreated) {
        if (sbp >= 160) points += 3; else if (sbp >= 140) points += 2;
        else if (sbp >= 130) points += 2; else if (sbp >= 120) points += 0;
      } else {
        if (sbp >= 160) points += 3; else if (sbp >= 140) points += 1;
        else if (sbp >= 130) points += 1; else if (sbp >= 120) points += 0;
      }
    } else {
      // Idade F
      if (age >= 75) points += 12; else if (age >= 70) points += 11; else if (age >= 65) points += 10;
      else if (age >= 60) points += 9; else if (age >= 55) points += 7; else if (age >= 50) points += 4;
      else if (age >= 45) points += 2; else if (age >= 40) points += 0; else if (age >= 35) points -= 3;
      else points -= 7;

      // Colesterol F
      if (totalChol >= 280) points += 4; else if (totalChol >= 240) points += 3;
      else if (totalChol >= 200) points += 1; else if (totalChol >= 160) points += 1;

      // Tabagismo F
      if (isSmoker) points += 3;

      // HDL F
      if (hdl < 35) points += 5; else if (hdl < 45) points += 2;
      else if (hdl < 50) points += 1; else if (hdl < 60) points += 0; else points -= 2;

      // PA F
      if (isTreated) {
        if (sbp >= 160) points += 4; else if (sbp >= 140) points += 3;
        else if (sbp >= 130) points += 2; else if (sbp >= 120) points += 1;
      } else {
        if (sbp >= 160) points += 4; else if (sbp >= 140) points += 2;
        else if (sbp >= 130) points += 1; else if (sbp >= 120) points += 1;
      }
    }

    // Mapeamento aproximado de pontos -> % de risco
    let riskPercent = "< 1%";
    if (sex === 'M') {
      if (points >= 14) riskPercent = "> 30%"; else if (points >= 11) riskPercent = "15-20%";
      else if (points >= 5) riskPercent = "5-10%"; else riskPercent = "< 5%";
    } else {
      if (points >= 17) riskPercent = "> 30%"; else if (points >= 13) riskPercent = "15-20%";
      else if (points >= 9) riskPercent = "5-10%"; else riskPercent = "< 5%";
    }

    let color = "text-emerald-600";
    let category = "BAIXO RISCO";
    if (points >= 13) { color = "text-rose-600"; category = "ALTO RISCO"; }
    else if (points >= 8) { color = "text-amber-600"; category = "RISCO INTERMEDIÁRIO"; }

    return { points, riskPercent, color, category };
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
            <span className="px-3 py-1 rounded-full bg-blue-100 border-blue-200 border text-blue-700 text-[9px] font-black uppercase tracking-[0.2em]">ADULTO • NCEP-ATP III</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Framingham Risk Score</h2>
        </div>
      </header>

      <div className="bg-white border-2 border-slate-200 p-8 rounded-[2.5rem] shadow-strong grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Sexo</label>
              <div className="flex gap-2">
                <button onClick={() => setFormData({...formData, sex: 'M'})} className={`flex-1 py-3 rounded-xl font-black text-xs border-2 ${formData.sex === 'M' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>MASC</button>
                <button onClick={() => setFormData({...formData, sex: 'F'})} className={`flex-1 py-3 rounded-xl font-black text-xs border-2 ${formData.sex === 'F' ? 'bg-pink-500 border-pink-500 text-white' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>FEM</button>
              </div>
            </div>
            <div>
              <label className={labelClass}>Idade (30-79)</label>
              <input type="number" value={formData.age} onChange={e => setFormData({...formData, age: parseInt(e.target.value)})} className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Colest. Total</label>
              <input type="number" value={formData.totalChol} onChange={e => setFormData({...formData, totalChol: parseInt(e.target.value)})} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>HDL-C</label>
              <input type="number" value={formData.hdl} onChange={e => setFormData({...formData, hdl: parseInt(e.target.value)})} className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>PA Sistólica</label>
            <input type="number" value={formData.sbp} onChange={e => setFormData({...formData, sbp: parseInt(e.target.value)})} className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-3">
             <label className="flex items-center gap-3 p-4 border-2 rounded-2xl cursor-pointer hover:bg-slate-50 border-slate-100">
               <input type="checkbox" checked={formData.isTreated} onChange={e => setFormData({...formData, isTreated: e.target.checked})} className="size-5 text-blue-600 rounded" />
               <span className="font-bold text-slate-700 text-[10px] uppercase">Sob Tratamento</span>
             </label>
             <label className="flex items-center gap-3 p-4 border-2 rounded-2xl cursor-pointer hover:bg-slate-50 border-slate-100">
               <input type="checkbox" checked={formData.isSmoker} onChange={e => setFormData({...formData, isSmoker: e.target.checked})} className="size-5 text-blue-600 rounded" />
               <span className="font-bold text-slate-700 text-[10px] uppercase">Fumante</span>
             </label>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 rounded-[2rem] bg-slate-50 border-2 border-slate-100 animate-fade-in gap-4 text-center">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pontos Totais</p>
           <p className={`text-6xl font-black ${analysis.color}`}>{analysis.points}</p>
           <div className="space-y-1">
             <p className="text-[10px] font-black text-slate-400 uppercase">Risco de Doença Coronariana em 10 anos</p>
             <p className="text-3xl font-black text-slate-900">{analysis.riskPercent}</p>
           </div>
           <div className={`px-4 py-2 rounded-full font-black text-[10px] uppercase border-2 ${analysis.color} border-current`}>
             {analysis.category}
           </div>
        </div>
      </div>
    </div>
  );
};

export default FraminghamScoreTool;
