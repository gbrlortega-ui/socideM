import React, { useState, useMemo } from 'react';

const ClinicalScoresTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'pews' | 'asma' | 'faringite' | 'alvarado'>('pews');

  // PRAM (Asma) State
  const [pram, setPram] = useState<number[]>([0,0,0,0,0]);
  const pramTotal = pram.reduce((a,b)=>a+b,0);
  const pramLabel = pramTotal >= 8 ? "Grave" : pramTotal >= 4 ? "Moderada" : "Leve";

  // Alvarado State
  const [alvarado, setAlvarado] = useState<Record<string, boolean>>({
    mig: false, anor: false, nau: false, tend: false, reb: false, temp: false, leu: false, shift: false
  });
  const alvaradoScore = useMemo(() => {
    let s = 0;
    if(alvarado.mig) s+=1; if(alvarado.anor) s+=1; if(alvarado.nau) s+=1;
    if(alvarado.tend) s+=2; if(alvarado.reb) s+=1; if(alvarado.temp) s+=1;
    if(alvarado.leu) s+=2; if(alvarado.shift) s+=1;
    return s;
  }, [alvarado]);

  // McIsaac State
  const [mcisaac, setMcisaac] = useState<Record<string, any>>({ age: 0, fever: false, cough: false, lymph: false, tonsil: false });
  const mcScore = useMemo(() => {
    let s = 0;
    if(mcisaac.fever) s+=1; if(!mcisaac.cough) s+=1; if(mcisaac.lymph) s+=1; if(mcisaac.tonsil) s+=1;
    if(mcisaac.age === 0) s+=1; // 3-14 anos
    if(mcisaac.age === 2) s-=1; // > 45 anos
    return s;
  }, [mcisaac]);

  const [pews, setPews] = useState<number[]>([0,0,0]);
  const pewsTotal = pews.reduce((a,b)=>a+b,0);

  const OptionBtn = ({ label, options, current, idx, state, setState }: any) => (
    <div className="space-y-2">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <div className="flex gap-2">
        {options.map((opt: string, i: number) => (
          <button key={i} onClick={() => { const n=[...state]; n[idx]=i; setState(n); }} className={`flex-1 py-2 px-1 rounded-xl border-2 text-[9px] font-black uppercase transition-all ${current === i ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
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
          <span className="px-3 py-1 rounded-full bg-rose-600 text-white text-[9px] font-black uppercase tracking-[0.2em]">PEDIATRIA • APOIO DIAGNÓSTICO</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">Scores Clínicos</h2>
        </div>
      </header>

      <div className="flex gap-2 no-print overflow-x-auto pb-2 custom-scrollbar">
        {[
          { id: 'pews', label: 'PEWS', icon: 'notifications' },
          { id: 'asma', label: 'PRAM', icon: 'air' },
          { id: 'alvarado', label: 'Alvarado', icon: 'medical_information' },
          { id: 'faringite', label: 'McIsaac', icon: 'emergency_home' }
        ].map(t => (
          <button 
            key={t.id} 
            onClick={() => setActiveTab(t.id as any)}
            className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-4 rounded-[1.5rem] border-2 font-black text-[10px] uppercase transition-all ${activeTab === t.id ? 'bg-white border-rose-600 text-rose-600 shadow-lg' : 'bg-white border-slate-200 text-slate-400'}`}
          >
            <span className="material-symbols-outlined text-sm">{t.icon}</span> {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white border-2 border-slate-200 p-8 rounded-[3rem] shadow-strong min-h-[400px]">
         {activeTab === 'alvarado' && (
           <div className="space-y-8 animate-fade-in">
              <div className="flex justify-between items-center border-b pb-4">
                 <h3 className="font-black text-slate-900 uppercase">Score de Alvarado (Apendicite)</h3>
                 <div className="text-center px-6 py-2 bg-rose-600 text-white rounded-2xl shadow-lg">
                    <p className="text-2xl font-black">{alvaradoScore}</p>
                    <p className="text-[8px] font-black uppercase">Pontos</p>
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {[
                   {id:'mig', label:'Migração da dor para FID'}, {id:'anor', label:'Anorexia'}, {id:'nau', label:'Náusea ou Vômito'},
                   {id:'tend', label:'Defesa/Dor FID (2 pts)', pts:2}, {id:'reb', label:'Descompressão brusca'}, {id:'temp', label:'Febre (≥ 37.3ºC)'},
                   {id:'leu', label:'Leucocitose (2 pts)', pts:2}, {id:'shift', label:'Desvio à esquerda'}
                 ].map(item => (
                   <button key={item.id} onClick={()=>setAlvarado({...alvarado, [item.id]: !alvarado[item.id]})} className={`p-4 rounded-xl border-2 text-left text-xs font-bold transition-all ${alvarado[item.id] ? 'bg-rose-50 border-rose-600 text-rose-900' : 'bg-slate-50 border-slate-100 text-slate-500'}`}>
                      {item.label}
                   </button>
                 ))}
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl text-xs font-bold text-slate-600">
                {alvaradoScore >= 7 ? "Alta probabilidade. Considerar cirurgia." : alvaradoScore >= 5 ? "Equívoco. Reavaliar ou exames de imagem." : "Baixa probabilidade."}
              </div>
           </div>
         )}

         {activeTab === 'faringite' && (
           <div className="space-y-8 animate-fade-in">
              <div className="flex justify-between items-center border-b pb-4">
                 <h3 className="font-black text-slate-900 uppercase">Score de McIsaac (Centor Mod.)</h3>
                 <div className="text-center px-6 py-2 bg-slate-900 text-white rounded-2xl shadow-lg">
                    <p className="text-2xl font-black">{mcScore}</p>
                    <p className="text-[8px] font-black uppercase">Pontos</p>
                 </div>
              </div>
              <div className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <button onClick={()=>setMcisaac({...mcisaac, fever: !mcisaac.fever})} className={`p-4 rounded-xl border-2 font-bold ${mcisaac.fever ? 'bg-blue-50 border-blue-600' : 'bg-slate-50 border-slate-100'}`}>Febre {' > '} 38ºC</button>
                   <button onClick={()=>setMcisaac({...mcisaac, cough: !mcisaac.cough})} className={`p-4 rounded-xl border-2 font-bold ${!mcisaac.cough ? 'bg-blue-50 border-blue-600' : 'bg-slate-50 border-slate-100'}`}>Ausência de Tosse</button>
                   <button onClick={()=>setMcisaac({...mcisaac, tonsil: !mcisaac.tonsil})} className={`p-4 rounded-xl border-2 font-bold ${mcisaac.tonsil ? 'bg-blue-50 border-blue-600' : 'bg-slate-50 border-slate-100'}`}>Exsudato Amigdaliano</button>
                   <button onClick={()=>setMcisaac({...mcisaac, lymph: !mcisaac.lymph})} className={`p-4 rounded-xl border-2 font-bold ${mcisaac.lymph ? 'bg-blue-50 border-blue-600' : 'bg-slate-50 border-slate-100'}`}>Linfonodomegalia Cervical</button>
                 </div>
                 <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase px-1">Faixa Etária</p>
                    <div className="flex gap-2">
                       <button onClick={()=>setMcisaac({...mcisaac, age:0})} className={`flex-1 py-3 rounded-xl border-2 text-[10px] font-black ${mcisaac.age===0 ? 'bg-slate-900 text-white' : 'bg-slate-50 border-slate-100'}`}>3-14 (+1)</button>
                       <button onClick={()=>setMcisaac({...mcisaac, age:1})} className={`flex-1 py-3 rounded-xl border-2 text-[10px] font-black ${mcisaac.age===1 ? 'bg-slate-900 text-white' : 'bg-slate-50 border-slate-100'}`}>15-44 (0)</button>
                       <button onClick={()=>setMcisaac({...mcisaac, age:2})} className={`flex-1 py-3 rounded-xl border-2 text-[10px] font-black ${mcisaac.age===2 ? 'bg-slate-900 text-white' : 'bg-slate-50 border-slate-100'}`}>{' ≥ '} 45 (-1)</button>
                    </div>
                 </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-2xl text-xs font-black text-blue-900 text-center uppercase">
                {mcScore >= 4 ? "Indicação formal de teste rápido ou tratamento." : mcScore >= 2 ? "Realizar teste rápido se disponível." : "Sintomáticos apenas."}
              </div>
           </div>
         )}

         {activeTab === 'pews' && (
           <div className="space-y-8 animate-fade-in">
              <div className="flex justify-between items-center border-b pb-4">
                 <h3 className="font-black text-slate-900 uppercase">Pediatric Early Warning Score</h3>
                 <div className="text-center px-6 py-2 bg-slate-900 text-white rounded-2xl shadow-lg">
                    <p className="text-2xl font-black">{pewsTotal}</p>
                    <p className="text-[8px] font-black uppercase">Pontos</p>
                 </div>
              </div>
              <div className="space-y-6">
                 <OptionBtn label="Comportamento" options={['Normal', 'Sonolento', 'Irritado', 'Letárgico']} current={pews[0]} idx={0} state={pews} setState={setPews} />
                 <OptionBtn label="Cardiovascular" options={['Rosado', 'Pálido', 'Moteado', 'Cianótico']} current={pews[1]} idx={1} state={pews} setState={setPews} />
                 <OptionBtn label="Respiratório" options={['Normal', 'Esforço Leve', 'Esforço Mod', 'Esforço Grave']} current={pews[2]} idx={2} state={pews} setState={setPews} />
              </div>
           </div>
         )}
      </div>
    </div>
  );
};

export default ClinicalScoresTool;