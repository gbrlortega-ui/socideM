import React, { useState, useMemo } from 'react';

const NeonatologyTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'apgar' | 'ballard'>('apgar');
  
  // States
  const [apgar, setApgar] = useState<number[]>([2,2,2,2,2]);
  const [silverman, setSilverman] = useState<number[]>([0,0,0,0,0]);
  const [ballardNeuromusc, setBallardNeuromusc] = useState<number[]>([0,0,0,0,0,0]);
  const [ballardPhysical, setBallardPhysical] = useState<number[]>([0,0,0,0,0,0]);

  // Calculations
  const apgarScore = useMemo(() => apgar.reduce((a, b) => a + b, 0), [apgar]);
  const silvermanScore = useMemo(() => silverman.reduce((a, b) => a + b, 0), [silverman]);
  const ballardScore = useMemo(() => 
    ballardNeuromusc.reduce((a,b)=>a+b,0) + ballardPhysical.reduce((a,b)=>a+b,0), 
  [ballardNeuromusc, ballardPhysical]);

  const getBallardAge = (score: number) => {
    if (score <= -10) return "20 semanas";
    if (score <= -5) return "22 semanas";
    if (score <= 0) return "24 semanas";
    if (score <= 5) return "26 semanas";
    if (score <= 10) return "28 semanas";
    if (score <= 15) return "30 semanas";
    if (score <= 20) return "32 semanas";
    if (score <= 25) return "34 semanas";
    if (score <= 30) return "36 semanas";
    if (score <= 35) return "38 semanas";
    if (score <= 40) return "40 semanas";
    if (score <= 45) return "42 semanas";
    return "44 semanas";
  };

  const OptionRow = ({ label, options, current, onChange }: any) => (
    <div className="space-y-2">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{label}</p>
      <div className="flex gap-1.5 flex-wrap">
        {options.map((opt: any, i: number) => (
          <button 
            key={i} 
            onClick={() => onChange(i)}
            className={`flex-1 min-w-[60px] py-2 rounded-xl border-2 text-[9px] font-black uppercase transition-all ${current === i ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-slate-200'}`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10 bg-light-glow min-h-full">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 transition-all shadow-sm">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-[9px] font-black uppercase tracking-[0.2em]">PEDIATRIA • SALA DE PARTO</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">Scores Neonatais</h2>
        </div>
      </header>

      <div className="flex gap-2 no-print">
        <button onClick={() => setActiveTab('apgar')} className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase border-2 transition-all ${activeTab === 'apgar' ? 'bg-white border-emerald-600 text-emerald-600 shadow-lg' : 'bg-white border-slate-100 text-slate-400'}`}>Apgar {'&'} Silverman</button>
        <button onClick={() => setActiveTab('ballard')} className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase border-2 transition-all ${activeTab === 'ballard' ? 'bg-white border-emerald-600 text-emerald-600 shadow-lg' : 'bg-white border-slate-100 text-slate-400'}`}>New Ballard (IG)</button>
      </div>

      {activeTab === 'apgar' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
          {/* APGAR */}
          <section className="bg-white border-2 border-slate-200 p-8 rounded-[2.5rem] shadow-strong space-y-6">
             <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <h3 className="font-black text-slate-900 uppercase tracking-tighter">Escore de APGAR</h3>
                <div className={`text-center px-6 py-2 rounded-2xl text-white shadow-lg ${apgarScore >= 7 ? 'bg-emerald-600' : 'bg-rose-600'}`}>
                   <p className="text-2xl font-black">{apgarScore}</p>
                   <p className="text-[7px] font-black uppercase">Pontos</p>
                </div>
             </div>
             
             <div className="space-y-4">
                <OptionRow label="FC (Frequência Cardíaca)" options={['Ausente', '< 100', '> 100']} current={apgar[0]} onChange={(v:any) => { const n=[...apgar]; n[0]=v; setApgar(n); }} />
                <OptionRow label="Respiração" options={['Ausente', 'Irregular', 'Choro']} current={apgar[1]} onChange={(v:any) => { const n=[...apgar]; n[1]=v; setApgar(n); }} />
                <OptionRow label="Tônus" options={['Flácido', 'Flexão', 'Ativo']} current={apgar[2]} onChange={(v:any) => { const n=[...apgar]; n[2]=v; setApgar(n); }} />
                <OptionRow label="Reflexos" options={['Sem resp.', 'Caretas', 'Espirro']} current={apgar[3]} onChange={(v:any) => { const n=[...apgar]; n[3]=v; setApgar(n); }} />
                <OptionRow label="Cor" options={['Cianose', 'Corpo Rosa', 'Todo Rosa']} current={apgar[4]} onChange={(v:any) => { const n=[...apgar]; n[4]=v; setApgar(n); }} />
             </div>
          </section>

          {/* Silverman */}
          <section className="bg-white border-2 border-slate-200 p-8 rounded-[2.5rem] shadow-strong space-y-6">
             <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <h3 className="font-black text-slate-900 uppercase tracking-tighter">Silverman-Andersen</h3>
                <div className={`text-center px-6 py-2 rounded-2xl text-white shadow-lg ${silvermanScore === 0 ? 'bg-emerald-600' : 'bg-rose-600'}`}>
                   <p className="text-2xl font-black">{silvermanScore}</p>
                   <p className="text-[7px] font-black uppercase">Pontos</p>
                </div>
             </div>
             <div className="space-y-4">
                <OptionRow label="Toraco-Abdominal" options={['Síncrono', 'Atraso', 'Balanço']} current={silverman[0]} onChange={(v:any) => { const n=[...silverman]; n[0]=v; setSilverman(n); }} />
                <OptionRow label="Tiragem Intercostal" options={['Ausente', 'Leve', 'Forte']} current={silverman[1]} onChange={(v:any) => { const n=[...silverman]; n[1]=v; setSilverman(n); }} />
                <OptionRow label="Retração Xifoide" options={['Ausente', 'Leve', 'Forte']} current={silverman[2]} onChange={(v:any) => { const n=[...silverman]; n[2]=v; setSilverman(n); }} />
                <OptionRow label="Asa de Nariz" options={['Ausente', 'Leve', 'Forte']} current={silverman[3]} onChange={(v:any) => { const n=[...silverman]; n[3]=v; setSilverman(n); }} />
                <OptionRow label="Gemido Expiratório" options={['Ausente', 'Esteto', 'Audível']} current={silverman[4]} onChange={(v:any) => { const n=[...silverman]; n[4]=v; setSilverman(n); }} />
             </div>
          </section>
        </div>
      )}

      {activeTab === 'ballard' && (
        <div className="bg-white border-2 border-slate-200 p-8 rounded-[3rem] shadow-strong space-y-10 animate-fade-in">
           <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-black text-slate-900 uppercase tracking-tighter">New Ballard Score</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Estimativa de Maturidade Gestacional</p>
              </div>
              <div className="text-center px-10 py-4 bg-emerald-600 text-white rounded-[2rem] shadow-xl">
                 <p className="text-xs font-black uppercase opacity-60 mb-1">IG Estimada</p>
                 <p className="text-3xl font-black">{getBallardAge(ballardScore)}</p>
                 <p className="text-[9px] font-bold uppercase mt-1">Escore Total: {ballardScore}</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="space-y-4">
                 <h4 className="text-[11px] font-black text-emerald-600 uppercase tracking-widest border-b pb-2">Maturidade Neuromuscular</h4>
                 <OptionRow label="Postura" options={['0', '1', '2', '3', '4']} current={ballardNeuromusc[0]} onChange={(v:any)=> {const n=[...ballardNeuromusc]; n[0]=v; setBallardNeuromusc(n);}} />
                 <OptionRow label="Janela Punho" options={['-1','0', '1', '2', '3', '4']} current={ballardNeuromusc[1]} onChange={(v:any)=> {const n=[...ballardNeuromusc]; n[1]=v; setBallardNeuromusc(n);}} />
                 <OptionRow label="Recuo Braço" options={['0', '1', '2', '3', '4']} current={ballardNeuromusc[2]} onChange={(v:any)=> {const n=[...ballardNeuromusc]; n[2]=v; setBallardNeuromusc(n);}} />
                 <OptionRow label="Ângulo Poplíteo" options={['-1','0', '1', '2', '3', '4', '5']} current={ballardNeuromusc[3]} onChange={(v:any)=> {const n=[...ballardNeuromusc]; n[3]=v; setBallardNeuromusc(n);}} />
                 <OptionRow label="Sinal de Cachecol" options={['-1','0', '1', '2', '3', '4']} current={ballardNeuromusc[4]} onChange={(v:any)=> {const n=[...ballardNeuromusc]; n[4]=v; setBallardNeuromusc(n);}} />
              </div>
              <div className="space-y-4">
                 <h4 className="text-[11px] font-black text-emerald-600 uppercase tracking-widest border-b pb-2">Maturidade Física</h4>
                 <OptionRow label="Pele" options={['-1','0', '1', '2', '3', '4', '5']} current={ballardPhysical[0]} onChange={(v:any)=> {const n=[...ballardPhysical]; n[0]=v; setBallardPhysical(n);}} />
                 <OptionRow label="Lanugo" options={['-1','0', '1', '2', '3', '4']} current={ballardPhysical[1]} onChange={(v:any)=> {const n=[...ballardPhysical]; n[1]=v; setBallardPhysical(n);}} />
                 <OptionRow label="Planta do Pé" options={['-2','-1','0', '1', '2', '3', '4']} current={ballardPhysical[2]} onChange={(v:any)=> {const n=[...ballardPhysical]; n[2]=v; setBallardPhysical(n);}} />
                 <OptionRow label="Mama" options={['-1','0', '1', '2', '3', '4']} current={ballardPhysical[3]} onChange={(v:any)=> {const n=[...ballardPhysical]; n[3]=v; setBallardPhysical(n);}} />
                 <OptionRow label="Olho / Orelha" options={['-2','-1','0', '1', '2', '3', '4']} current={ballardPhysical[4]} onChange={(v:any)=> {const n=[...ballardPhysical]; n[4]=v; setBallardPhysical(n);}} />
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default NeonatologyTool;