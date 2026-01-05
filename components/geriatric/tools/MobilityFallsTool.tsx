import React, { useState, useMemo, useEffect } from 'react';
import Stopwatch from '../../Stopwatch';

interface Props {
  onBack: () => void;
  initialTab?: 'tug' | 'sit-stand' | 'gait-speed' | 'falls';
}

const MobilityFallsTool: React.FC<Props> = ({ onBack, initialTab = 'tug' }) => {
  const [activeTab, setActiveTab] = useState<'tug' | 'sit-stand' | 'gait-speed' | 'falls'>(initialTab);
  
  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  const [tugTime, setTugTime] = useState<number | null>(null);
  const [sitStandTime, setSitStandTime] = useState<number | null>(null);
  const [gaitSpeedTime, setGaitSpeedTime] = useState<number | null>(null);
  const [fallRiskAnswers, setFallRiskAnswers] = useState<boolean[]>(new Array(7).fill(false));

  const tugResult = useMemo(() => {
    if (tugTime === null) return null;
    if (tugTime < 10) return { label: "Baixo Risco", color: "bg-emerald-600" };
    if (tugTime <= 20) return { label: "Risco Moderado", color: "bg-amber-600" };
    return { label: "Alto Risco", color: "bg-rose-600" };
  }, [tugTime]);

  const sitStandResult = useMemo(() => {
    if (sitStandTime === null) return null;
    if (sitStandTime <= 12) return { label: "Normal", color: "bg-emerald-600" };
    if (sitStandTime <= 15) return { label: "Alerta", color: "bg-amber-600" };
    return { label: "Risco Quedas", color: "bg-rose-600" };
  }, [sitStandTime]);

  const gaitSpeedResult = useMemo(() => {
    if (!gaitSpeedTime) return null;
    const speed = 4 / gaitSpeedTime;
    if (speed >= 1.0) return { speed, label: "Normal", color: "bg-emerald-600" };
    if (speed >= 0.8) return { speed, label: "Limítrofe", color: "bg-amber-600" };
    return { speed, label: "Lenta (Risco)", color: "bg-rose-600" };
  }, [gaitSpeedTime]);

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10 bg-light-glow min-h-full">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-purple-600 shadow-sm">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-[9px] font-black uppercase tracking-[0.2em]">AGA • MOBILIDADE</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1 uppercase">Mobilidade e Quedas</h2>
        </div>
      </header>

      <div className="flex gap-2 no-print overflow-x-auto pb-2 custom-scrollbar">
        {[
          { id: 'tug', label: 'TUG Test' },
          { id: 'sit-stand', label: 'Sentar/Levantar 5x' },
          { id: 'gait-speed', label: 'Vel. Marcha' },
          { id: 'falls', label: 'Risco de Quedas' }
        ].map(t => (
          <button 
            key={t.id} 
            onClick={() => setActiveTab(t.id as any)}
            className={`flex-1 min-w-[150px] py-4 rounded-2xl font-black text-xs uppercase border-2 transition-all ${activeTab === t.id ? 'bg-white border-purple-600 text-purple-600 shadow-lg' : 'bg-white border-slate-100 text-slate-400'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white border-2 border-slate-200 p-8 rounded-[3rem] shadow-strong space-y-8 animate-fade-in">
        {activeTab === 'tug' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
               <h3 className="text-xl font-black text-slate-900">Timed Up and Go</h3>
               <p className="text-sm font-bold text-slate-500 leading-relaxed">Instrua o paciente a levantar-se da cadeira, caminhar 3 metros, girar, voltar e sentar-se.</p>
               <Stopwatch label="Cronometrar Percurso" color="purple" onStop={setTugTime} />
            </div>
            {tugResult && (
              <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-200 flex flex-col items-center justify-center text-center gap-4">
                 <span className={`px-4 py-1.5 rounded-full text-white text-[10px] font-black uppercase ${tugResult.color}`}>{tugResult.label}</span>
                 <p className="text-5xl font-black text-slate-900">{tugTime?.toFixed(2)}s</p>
                 <p className="text-xs font-bold text-slate-400 italic">Scores {'>'} 20s indicam alto risco de dependência e quedas.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'sit-stand' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div className="space-y-4">
                <h3 className="text-xl font-black text-slate-900">Sentar e Levantar 5x</h3>
                <p className="text-sm font-bold text-slate-500 leading-relaxed">Braços cruzados no peito. Levantar e sentar 5 vezes o mais rápido possível.</p>
                <Stopwatch label="Tempo total 5 repetições" color="rose" onStop={setSitStandTime} />
             </div>
             {sitStandResult && (
               <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-200 flex flex-col items-center justify-center text-center gap-4">
                  <span className={`px-4 py-1.5 rounded-full text-white text-[10px] font-black uppercase ${sitStandResult.color}`}>{sitStandResult.label}</span>
                  <p className="text-5xl font-black text-slate-900">{sitStandTime?.toFixed(2)}s</p>
               </div>
             )}
          </div>
        )}

        {activeTab === 'gait-speed' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div className="space-y-4">
                <h3 className="text-xl font-black text-slate-900">Velocidade de Marcha</h3>
                <p className="text-sm font-bold text-slate-500 leading-relaxed">Cronometre o tempo para percorrer 4 metros em passo habitual.</p>
                <Stopwatch label="Tempo em 4 metros" color="blue" onStop={setGaitSpeedTime} />
             </div>
             {gaitSpeedResult && (
               <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-200 flex flex-col items-center justify-center text-center gap-4">
                  <span className={`px-4 py-1.5 rounded-full text-white text-[10px] font-black uppercase ${gaitSpeedResult.color}`}>{gaitSpeedResult.label}</span>
                  <p className="text-5xl font-black text-slate-900">{gaitSpeedResult.speed.toFixed(2)} m/s</p>
               </div>
             )}
          </div>
        )}

        {activeTab === 'falls' && (
          <div className="space-y-6">
             <h3 className="text-xl font-black text-slate-900 border-b pb-2">Checklist Risco de Quedas</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "História de quedas no último ano?",
                  "Dificuldade de equilíbrio ou marcha?",
                  "Uso de psicotrópicos (BZD, Neurolépticos)?",
                  "Polifarmácia (> 5 medicamentos)?",
                  "Déficit visual grave?",
                  "Hipotensão ortostática presente?",
                  "Riscos ambientais identificados?"
                ].map((q, i) => (
                  <button 
                    key={i} 
                    onClick={() => {
                      const n = [...fallRiskAnswers];
                      n[i] = !n[i];
                      setFallRiskAnswers(n);
                    }}
                    className={`p-4 rounded-xl border-2 text-left flex justify-between items-center transition-all ${fallRiskAnswers[i] ? 'bg-purple-50 border-purple-600 text-purple-900' : 'bg-slate-50 border-slate-100 text-slate-400'}`}
                  >
                    <span className="text-sm font-bold">{q}</span>
                    <span className="material-symbols-outlined">{fallRiskAnswers[i] ? 'check_box' : 'check_box_outline_blank'}</span>
                  </button>
                ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobilityFallsTool;