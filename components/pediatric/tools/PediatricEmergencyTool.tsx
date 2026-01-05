import React, { useState, useMemo } from 'react';

const PediatricEmergencyTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'glasgow' | 'gaso' | 'press'>('glasgow');
  
  // States
  const [glasgow, setGlasgow] = useState<number[]>([4,5,6]);
  const [gaso, setGaso] = useState({ ph: '', pco2: '', hco3: '' });
  const [press, setPress] = useState<number[]>([0,0,0,0]);

  // Totais
  const glasgowTotal = glasgow.reduce((a,b)=>a+b,0);
  const pressTotal = press.reduce((a,b)=>a+b,0);

  const gasoAnalysis = useMemo(() => {
    const ph = parseFloat(gaso.ph);
    const pco2 = parseFloat(gaso.pco2);
    const hco3 = parseFloat(gaso.hco3);
    if (isNaN(ph) || isNaN(pco2) || isNaN(hco3)) return null;
    let diagnosis = ph < 7.35 ? "Acidemia" : ph > 7.45 ? "Alcalemia" : "Normal";
    if (diagnosis === "Acidemia") {
       diagnosis = pco2 > 45 ? "Acidose Respiratória" : "Acidose Metabólica";
    }
    return diagnosis;
  }, [gaso]);

  const OptionBtn = ({ label, options, current, idx, state, setState, points }: any) => (
    <div className="space-y-2">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <div className="flex flex-col gap-1.5">
        {options.map((opt: string, i: number) => {
          const val = points ? points[i] : (options.length - i);
          return (
            <button key={val} onClick={() => { const n=[...state]; n[idx]=val; setState(n); }} className={`w-full py-3 px-4 rounded-xl border-2 text-left text-[10px] font-bold uppercase transition-all ${current === val ? 'bg-rose-600 text-white border-rose-600 shadow-md' : 'bg-slate-50 text-slate-500 border-slate-100'}`}>
               <span className="font-black mr-2">[{val}]</span> {opt}
            </button>
          );
        })}
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
          <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-[9px] font-black uppercase tracking-[0.2em]">PEDIATRIA • EMERGÊNCIA</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">Urgência Pediátrica</h2>
        </div>
      </header>

      <div className="flex gap-2 no-print">
        <button onClick={() => setActiveTab('glasgow')} className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase border-2 transition-all ${activeTab === 'glasgow' ? 'bg-white border-rose-600 text-rose-600 shadow-lg' : 'bg-white border-slate-100 text-slate-400'}`}>Glasgow Pediátrico</button>
        <button onClick={() => setActiveTab('press')} className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase border-2 transition-all ${activeTab === 'press' ? 'bg-white border-rose-600 text-rose-600 shadow-lg' : 'bg-white border-slate-100 text-slate-400'}`}>Score PRESS (Asma)</button>
        <button onClick={() => setActiveTab('gaso')} className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase border-2 transition-all ${activeTab === 'gaso' ? 'bg-white border-rose-600 text-rose-600 shadow-lg' : 'bg-white border-slate-100 text-slate-400'}`}>Gasometria Pediátrica</button>
      </div>

      <div className="bg-white border-2 border-slate-200 p-8 rounded-[3rem] shadow-strong space-y-8">
         {activeTab === 'glasgow' && (
           <div className="space-y-8 animate-fade-in">
              <div className="flex justify-between items-center border-b pb-4">
                 <h3 className="font-black text-slate-900 uppercase">Escala de Glasgow Pediátrica ({' < '} 4 anos)</h3>
                 <div className="text-center px-8 py-2 bg-rose-600 text-white rounded-2xl">
                    <p className="text-3xl font-black">{glasgowTotal}/15</p>
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <OptionBtn label="Abertura Ocular" options={['Espontânea', 'À voz', 'À dor', 'Ausente']} current={glasgow[0]} idx={0} state={glasgow} setState={setGlasgow} />
                 <OptionBtn label="Resp. Verbal" options={['Sorridente', 'Choro cons.', 'Choro incons.', 'Gemido', 'Ausente']} current={glasgow[1]} idx={1} state={glasgow} setState={setGlasgow} />
                 <OptionBtn label="Resp. Motora" options={['Obedece', 'Localiza', 'Retirada', 'Flexão', 'Extensão', 'Ausente']} current={glasgow[2]} idx={2} state={glasgow} setState={setGlasgow} />
              </div>
           </div>
         )}

         {activeTab === 'press' && (
           <div className="space-y-8 animate-fade-in">
              <div className="flex justify-between items-center border-b pb-4">
                 <h3 className="font-black text-slate-900 uppercase">Preschool Respiratory Assessment (PRESS)</h3>
                 <div className="text-center px-8 py-2 bg-rose-600 text-white rounded-2xl">
                    <p className="text-3xl font-black">{pressTotal}</p>
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <OptionBtn label="FR (Frequência)" options={['Normal (0)', 'Aumentada (1)']} points={[0,1]} current={press[0]} idx={0} state={press} setState={setPress} />
                 <OptionBtn label="Sibilos" options={['Ausente (0)', 'Presente (1)']} points={[0,1]} current={press[1]} idx={1} state={press} setState={setPress} />
                 <OptionBtn label="Retração" options={['Ausente (0)', 'Leve/Mod (1)', 'Grave (2)']} points={[0,1,2]} current={press[2]} idx={2} state={press} setState={setPress} />
                 <OptionBtn label="Sat O2" options={['> 94% (0)', '92-94% (1)', '< 92% (2)']} points={[0,1,2]} current={press[3]} idx={3} state={press} setState={setPress} />
              </div>
           </div>
         )}

         {activeTab === 'gaso' && (
           <div className="space-y-8 animate-fade-in">
              <h3 className="font-black text-slate-900 uppercase border-b pb-2">Interpretador de Gasometria</h3>
              <div className="grid grid-cols-3 gap-4">
                 <input type="number" placeholder="pH" value={gaso.ph} onChange={e=>setGaso({...gaso, ph: e.target.value})} className="p-4 bg-slate-50 border-2 rounded-xl text-center font-black" />
                 <input type="number" placeholder="pCO2" value={gaso.pco2} onChange={e=>setGaso({...gaso, pco2: e.target.value})} className="p-4 bg-slate-50 border-2 rounded-xl text-center font-black" />
                 <input type="number" placeholder="HCO3" value={gaso.hco3} onChange={e=>setGaso({...gaso, hco3: e.target.value})} className="p-4 bg-slate-50 border-2 rounded-xl text-center font-black" />
              </div>
              {gasoAnalysis && (
                <div className="p-6 bg-rose-50 border-2 border-rose-600 rounded-3xl text-center">
                   <p className="text-2xl font-black text-rose-900 uppercase">{gasoAnalysis}</p>
                </div>
              )}
           </div>
         )}
      </div>
    </div>
  );
};

export default PediatricEmergencyTool;