import React, { useState, useMemo, useEffect } from 'react';

const DoseHydrationTool: React.FC<{ onBack: () => void, initialTab?: 'doses' | 'hydration' }> = ({ onBack, initialTab = 'doses' }) => {
  const [activeTab, setActiveTab] = useState<'doses' | 'hydration'>(initialTab as any);
  const [weight, setWeight] = useState('');
  const [losePercent, setLosePercent] = useState('');
  
  // Dose States
  const [targetDose, setTargetDose] = useState('');
  const [concentration, setConcentration] = useState('');
  const [frequency, setFrequency] = useState('8');

  const doseResult = useMemo(() => {
    const w = parseFloat(weight);
    const d = parseFloat(targetDose);
    const c = parseFloat(concentration);
    if (isNaN(w) || isNaN(d) || w <= 0 || d <= 0) return null;
    
    const totalMgPerDose = (w * d) / (24 / parseInt(frequency));
    const totalMgPerDay = w * d;
    const volPerDose = c > 0 ? totalMgPerDose / c : null;

    return { totalMgPerDay, totalMgPerDose, volPerDose };
  }, [weight, targetDose, concentration, frequency]);

  const hydration = useMemo(() => {
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0) return null;

    let volume = 0;
    if (w <= 10) volume = w * 100;
    else if (w <= 20) volume = 1000 + (w - 10) * 50;
    else volume = 1500 + (w - 20) * 20;
    
    // Sugestão de Eletrólitos (Regra básica: Na 3mEq/100mL, K 2mEq/100mL)
    const nacl3 = (volume / 100) * 3; // mEq aproximados
    const kcl = (volume / 100) * 2;

    return { volume, rate: volume / 24, nacl3, kcl };
  }, [weight]);

  const deficit = useMemo(() => {
    const w = parseFloat(weight);
    const p = parseFloat(losePercent);
    if (isNaN(w) || isNaN(p)) return null;
    const vol = w * (p/100) * 1000; // mL
    return { vol, expansion: w * 20 }; // Expansão 20ml/kg
  }, [weight, losePercent]);

  const inputClass = "w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl outline-none focus:border-rose-500 font-bold text-slate-900 transition-all";
  const labelClass = "text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block px-1";

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10 bg-light-glow min-h-full">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 transition-all shadow-sm">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[9px] font-black uppercase tracking-[0.2em]">PEDIATRIA • MANEJO TERAPÊUTICO</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Prescrição e Hidratação</h2>
        </div>
      </header>

      <div className="flex gap-2 no-print">
        <button onClick={() => setActiveTab('doses')} className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase border-2 transition-all ${activeTab === 'doses' ? 'bg-white border-rose-600 text-rose-600 shadow-lg' : 'bg-white border-slate-100 text-slate-400'}`}>Cálculo de Doses</button>
        <button onClick={() => setActiveTab('hydration')} className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase border-2 transition-all ${activeTab === 'hydration' ? 'bg-white border-rose-600 text-rose-600 shadow-lg' : 'bg-white border-slate-100 text-slate-400'}`}>Hidratação Pediátrica</button>
      </div>

      <div className="bg-white border-2 border-slate-200 p-8 rounded-[3rem] shadow-strong space-y-10">
        
        {activeTab === 'doses' && (
          <div className="space-y-8 animate-fade-in">
             <div className="border-b pb-4">
                <h3 className="text-xl font-black text-slate-900 uppercase">Calculadora de Dose (mg/kg)</h3>
                <p className="text-xs font-bold text-slate-400">Determine a dose total e o volume administrativo com precisão.</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className={labelClass}>Peso do Paciente (kg)</label>
                  <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="Ex: 10" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Dose Alvo (mg/kg/dia)</label>
                  <input type="number" value={targetDose} onChange={e => setTargetDose(e.target.value)} placeholder="Ex: 50" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Intervalo (Horas)</label>
                  <select value={frequency} onChange={e => setFrequency(e.target.value)} className={inputClass}>
                     <option value="24">24/24h (Dose única)</option>
                     <option value="12">12/12h</option>
                     <option value="8">8/8h</option>
                     <option value="6">6/6h</option>
                     <option value="4">4/4h</option>
                  </select>
                </div>
                <div className="md:col-span-3">
                  <label className={labelClass}>Concentração do Frasco (mg/mL)</label>
                  <input type="number" value={concentration} onChange={e => setConcentration(e.target.value)} placeholder="Ex: 50 (se 250mg/5mL)" className={inputClass} />
                </div>
             </div>

             {doseResult ? (
               <div className="p-8 rounded-[2.5rem] bg-rose-50 border-2 border-rose-100 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <div>
                        <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest">Dose por Horário</span>
                        <p className="text-4xl font-black text-rose-700">{doseResult.totalMgPerDose.toFixed(1)} <span className="text-lg">mg</span></p>
                     </div>
                     {doseResult.volPerDose && (
                       <div className="p-4 bg-white rounded-2xl border border-rose-200">
                          <span className="text-[9px] font-black text-rose-600 uppercase tracking-widest block mb-1">Volume a administrar</span>
                          <p className="text-2xl font-black text-slate-900">{doseResult.volPerDose.toFixed(2)} mL</p>
                       </div>
                     )}
                  </div>
                  <div className="space-y-4 border-l border-rose-200 pl-8">
                     <div>
                        <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest">Dose Total Diária</span>
                        <p className="text-2xl font-black text-slate-700">{doseResult.totalMgPerDay.toFixed(1)} mg/dia</p>
                     </div>
                     <div className="p-4 bg-rose-600 text-white rounded-2xl shadow-lg">
                        <p className="text-[10px] font-black uppercase mb-1 opacity-70">Nota de Segurança</p>
                        <p className="text-xs font-bold leading-tight">Sempre verifique a dose máxima permitida na bula antes de prescrever.</p>
                     </div>
                  </div>
               </div>
             ) : (
               <div className="py-12 border-2 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-300">
                  <span className="material-symbols-outlined text-5xl mb-3 opacity-20">medication</span>
                  <p className="font-black uppercase tracking-widest text-[10px]">Preencha peso e dose alvo para calcular</p>
               </div>
             )}
          </div>
        )}

        {activeTab === 'hydration' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
             <div className="space-y-6">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 border-b pb-2"><span className="material-symbols-outlined text-blue-600">opacity</span> Manutenção (Holliday)</h3>
                <div>
                  <label className={labelClass}>Peso Atual (kg)</label>
                  <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className={inputClass} />
                </div>
                {hydration && (
                  <div className="p-6 rounded-[2rem] bg-blue-50 border border-blue-100 space-y-4">
                    <div>
                       <p className="text-[10px] font-black text-blue-800 uppercase mb-1">Cota Hídrica (24h)</p>
                       <p className="text-3xl font-black text-slate-900">{hydration.volume} mL</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-blue-100">
                       <div className="text-center">
                          <p className="text-[8px] font-black text-blue-400 uppercase">Vazão</p>
                          <p className="text-sm font-black text-blue-700">{hydration.rate.toFixed(1)} mL/h</p>
                       </div>
                       <div className="text-center">
                          <p className="text-[8px] font-black text-blue-400 uppercase">Gotejamento</p>
                          <p className="text-sm font-black text-blue-700">{Math.round(hydration.rate / 3)} gts/min</p>
                       </div>
                    </div>
                  </div>
                )}
             </div>

             <div className="space-y-6">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 border-b pb-2"><span className="material-symbols-outlined text-rose-600">emergency</span> Desidratação / Expansão</h3>
                <div>
                  <label className={labelClass}>Perda Estimada (%)</label>
                  <select value={losePercent} onChange={e => setLosePercent(e.target.value)} className={inputClass}>
                     <option value="">Selecione a gravidade...</option>
                     <option value="5">5% (Desidratação Leve)</option>
                     <option value="10">10% (Desidratação Moderada)</option>
                     <option value="15">15% (Desidratação Grave)</option>
                  </select>
                </div>
                {deficit && (
                   <div className="p-6 rounded-[2rem] bg-rose-50 border border-rose-100 space-y-4">
                      <div>
                         <p className="text-[10px] font-black text-rose-800 uppercase mb-1">Déficit Hídrico Estimado</p>
                         <p className="text-3xl font-black text-slate-900">{deficit.vol.toFixed(0)} mL</p>
                      </div>
                      <div className="p-4 bg-white rounded-2xl border border-rose-200">
                         <p className="text-[9px] font-black text-rose-600 uppercase tracking-widest mb-1">Expansão Imediata (SF 0.9%)</p>
                         <p className="text-lg font-black text-slate-900">{deficit.expansion.toFixed(0)} mL (20mL/kg)</p>
                      </div>
                   </div>
                )}
             </div>
          </div>
        )}
      </div>
      
      <p className="text-[10px] text-slate-400 font-bold border-t border-slate-100 pt-6 leading-relaxed">
        <span className="text-slate-900 font-black">Nota Técnica:</span> Holliday-Segar: 100mL/kg (até 10kg), +50mL/kg (11-20kg), +20mL/kg ({' > '} 20kg). Expansão inicial recomendada 20mL/kg em 20-30 min.
      </p>
    </div>
  );
};

export default DoseHydrationTool;