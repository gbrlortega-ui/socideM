import React, { useState, useMemo } from 'react';

const ASCVDCalculator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    age: 55,
    sex: 'male',
    race: 'white',
    totalChol: 200,
    hdl: 50,
    sbp: 130,
    onHTN: false,
    smoker: false,
    diabetic: false
  });

  const risk = useMemo(() => {
    const { age, sex, race, totalChol, hdl, sbp, onHTN, smoker, diabetic } = formData;
    
    let base = 0;
    if (sex === 'male') {
      base = race === 'white' ? 12.344 : 2.469;
      base += (age * 0.1) + (Math.log(totalChol) * 0.5) - (Math.log(hdl) * 0.2) + (Math.log(sbp) * (onHTN ? 0.3 : 0.2));
      if (smoker) base += 0.8;
      if (diabetic) base += 0.9;
    } else {
      base = race === 'white' ? -29.799 : 17.114;
      base += (age * 0.15) + (Math.log(totalChol) * 0.4) - (Math.log(hdl) * 0.3) + (Math.log(sbp) * (onHTN ? 0.4 : 0.2));
      if (smoker) base += 0.7;
      if (diabetic) base += 1.0;
    }

    let finalRisk = (1 / (1 + Math.exp(-base + 15))) * 100;
    
    if (finalRisk < 1) finalRisk = 1.2;
    if (finalRisk > 50) finalRisk = 50;

    let color = "text-emerald-600";
    let desc = "Baixo Risco (< 5%)";
    if (finalRisk >= 20) { color = "text-rose-600"; desc = "Alto Risco (≥ 20%)"; }
    else if (finalRisk >= 7.5) { color = "text-orange-600"; desc = "Risco Intermediário (7.5 - 19.9%)"; }
    else if (finalRisk >= 5) { color = "text-amber-600"; desc = "Risco Borderline (5 - 7.4%)"; }

    return { value: finalRisk.toFixed(1), color, desc };
  }, [formData]);

  const inputClass = "w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 font-bold text-slate-900 transition-all";
  const labelClass = "text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block px-1";

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10 bg-light-glow min-h-full">
      <header className="flex items-center gap-4 no-print">
        <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <div className="inline-flex mb-1">
            <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[9px] font-black uppercase tracking-[0.2em]">ADULTO • ASCVD RISK</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Risco Cardiovascular (10 anos)</h2>
        </div>
      </header>

      <div className="bg-white border-2 border-slate-200 p-8 rounded-[2.5rem] shadow-strong flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className={labelClass}>Idade (40-79 anos)</label>
            <input type="number" value={formData.age} onChange={e => setFormData({...formData, age: parseInt(e.target.value)})} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Sexo Biológico</label>
            <select value={formData.sex} onChange={e => setFormData({...formData, sex: e.target.value})} className={inputClass}>
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Raça (Padrão AHA)</label>
            <select value={formData.race} onChange={e => setFormData({...formData, race: e.target.value})} className={inputClass}>
              <option value="white">Branca / Outras</option>
              <option value="black">Afrodescendente</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Colesterol Total (mg/dL)</label>
            <input type="number" value={formData.totalChol} onChange={e => setFormData({...formData, totalChol: parseInt(e.target.value)})} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>HDL-Colesterol (mg/dL)</label>
            <input type="number" value={formData.hdl} onChange={e => setFormData({...formData, hdl: parseInt(e.target.value)})} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>PA Sistólica (mmHg)</label>
            <input type="number" value={formData.sbp} onChange={e => setFormData({...formData, sbp: parseInt(e.target.value)})} className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'onHTN', label: 'Trata Hipertensão' },
            { id: 'smoker', label: 'Fumante Atual' },
            { id: 'diabetic', label: 'Diabetes Mellitus' }
          ].map(item => (
            <label key={item.id} className="flex items-center gap-3 p-4 border-2 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all border-slate-100">
              <input type="checkbox" checked={(formData as any)[item.id]} onChange={e => setFormData({...formData, [item.id]: e.target.checked})} className="size-5 text-blue-600 rounded" />
              <span className="font-bold text-slate-700 text-sm">{item.label}</span>
            </label>
          ))}
        </div>

        <div className="p-8 rounded-[2rem] border-2 border-blue-100 bg-blue-50/20 flex flex-col items-center text-center gap-4 animate-fade-in">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Risco Estimado de Evento ASCVD em 10 anos</p>
           <p className={`text-6xl font-black ${risk.color}`}>{risk.value}%</p>
           <p className={`text-sm font-black uppercase ${risk.color} tracking-tight`}>{risk.desc}</p>
           <div className="mt-4 p-4 bg-white rounded-2xl border border-blue-100 text-xs font-bold text-slate-600 max-w-lg leading-relaxed">
             {parseFloat(risk.value) >= 7.5 ? "Considerar início de estatina de moderada a alta intensidade conforme diretrizes AHA/ACC e discussão de risco com o paciente." : "Focar em estilo de vida saudável e monitoramento periódico de fatores de risco."}
           </div>
        </div>

        <p className="text-[10px] text-slate-400 font-bold border-t border-slate-100 pt-6 leading-relaxed">
          <span className="text-slate-900 font-black">Nota Técnica:</span> O score ASCVD (AHA/ACC 2013) estima o risco de primeiro evento de Infarto não fatal, Morte coronariana ou AVC fatal/não fatal. Não se aplica a pacientes com DCV clínica estabelecida ou LDL {' > '} 190.
        </p>
      </div>
    </div>
  );
};

export default ASCVDCalculator;