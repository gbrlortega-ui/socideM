import React, { useState, useMemo } from 'react';

const BilirubinTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [hours, setHours] = useState('');
  const [bilirubin, setBilirubin] = useState('');
  const [isPreterm, setIsPreterm] = useState(false);

  const analysis = useMemo(() => {
    const h = parseFloat(hours);
    const b = parseFloat(bilirubin);
    if (isNaN(h) || isNaN(b) || h < 12) return null;

    let zone = "Baixo Risco";
    let color = "text-emerald-600";
    let conduta = "Alta segura com retorno em 48-72h.";

    // Bhutani simplified thresholds (approximate for UI display)
    if (h >= 72) {
      if (b >= 17) { zone = "Alto Risco"; color = "text-rose-600"; conduta = "Internar para fototerapia intensiva."; }
      else if (b >= 14) { zone = "Risco Médio-Alto"; color = "text-orange-600"; conduta = "Repetir BT em 12-24h."; }
    } else if (h >= 48) {
      if (b >= 15) { zone = "Alto Risco"; color = "text-rose-600"; conduta = "Fototerapia indicada."; }
      else if (b >= 12) { zone = "Risco Médio-Alto"; color = "text-orange-600"; conduta = "Reavaliar precocemente."; }
    } else if (h >= 24) {
      if (b >= 12) { zone = "Alto Risco"; color = "text-rose-600"; conduta = "Investigar hemólise e iniciar fototerapia."; }
      else if (b >= 8) { zone = "Risco Médio-Alto"; color = "text-orange-600"; conduta = "Controle seriado."; }
    }

    return { zone, color, conduta };
  }, [hours, bilirubin]);

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10 bg-light-glow min-h-full">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 transition-all shadow-sm">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-[9px] font-black uppercase tracking-[0.2em]">PEDIATRIA • ICTERÍCIA</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">Bilirrubina e Fototerapia</h2>
        </div>
      </header>

      <div className="bg-white border-2 border-slate-200 p-10 rounded-[3rem] shadow-strong space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Horas de Vida</label>
              <input type="number" value={hours} onChange={e => setHours(e.target.value)} placeholder="Ex: 48" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl outline-none focus:border-amber-500 font-black text-xl" />
           </div>
           <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">BT Total (mg/dL)</label>
              <input type="number" step="0.1" value={bilirubin} onChange={e => setBilirubin(e.target.value)} placeholder="Ex: 12.5" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl outline-none focus:border-amber-500 font-black text-xl" />
           </div>
           <div className="flex flex-col justify-end">
              <label className="flex items-center gap-3 p-4 border-2 rounded-2xl cursor-pointer hover:bg-slate-50 border-slate-100 h-full">
                 <input type="checkbox" checked={isPreterm} onChange={e => setIsPreterm(e.target.checked)} className="size-6 text-amber-600 rounded" />
                 <span className="font-bold text-slate-700 text-xs uppercase">Prematuro / Fatores Risco</span>
              </label>
           </div>
        </div>

        {analysis ? (
          <div className="p-10 rounded-[2.5rem] border-2 border-amber-100 bg-amber-50/20 animate-fade-in flex flex-col md:flex-row items-center gap-12">
             <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Zona de Risco</p>
                <h3 className={`text-4xl font-black ${analysis.color} uppercase tracking-tighter`}>{analysis.zone}</h3>
             </div>
             <div className="flex-1 space-y-4">
                <div className="p-6 bg-white rounded-3xl border border-amber-100 shadow-sm">
                   <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2">Conduta Acadêmica</p>
                   <p className="text-sm font-bold text-slate-700 leading-relaxed">{analysis.conduta}</p>
                </div>
             </div>
          </div>
        ) : (
          <div className="py-20 text-center text-slate-300 border-2 border-dashed border-slate-100 rounded-[2.5rem]">
             <span className="material-symbols-outlined text-6xl mb-4 opacity-20">lightbulb</span>
             <p className="font-black uppercase tracking-widest text-xs">Insira horas de vida e bilirrubina total</p>
          </div>
        )}
      </div>

      <p className="text-[10px] text-slate-400 font-bold leading-relaxed border-t pt-4">
        Nota Técnica: Baseado no Nomograma de Bhutani. BT {' ≥ '} 17mg/dL com {' > '} 72h em RN a termo hígido geralmente indica fototerapia.
      </p>
    </div>
  );
};

export default BilirubinTool;