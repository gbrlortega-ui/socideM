import React, { useState, useMemo, useEffect } from 'react';

interface Props {
  onBack: () => void;
  initialTab?: 'braden' | 'charlson' | 'pps';
}

const ClinicalRiskTool: React.FC<Props> = ({ onBack, initialTab = 'braden' }) => {
  const [activeTab, setActiveTab] = useState<'braden' | 'charlson' | 'pps'>(initialTab as any);
  
  useEffect(() => {
    if (initialTab) setActiveTab(initialTab as any);
  }, [initialTab]);
  
  const [braden, setBraden] = useState<number[]>(new Array(6).fill(4));
  const bradenScore = braden.reduce((a, b) => a + b, 0);
  const [pps, setPps] = useState<number>(100);
  const [charlson, setCharlson] = useState<Set<string>>(new Set());
  const [ageCharlson, setAgeCharlson] = useState(0);

  const charlsonScore = useMemo(() => {
    let s = ageCharlson;
    charlson.forEach(id => {
      if (['aid', 'met', 'leuk', 'lym'].includes(id)) s += 6;
      else if (['mod_liv', 'renal', 'dm_comp', 'hemi', 'tumor'].includes(id)) s += 2;
      else if (id === 'liver_sev') s += 3;
      else s += 1;
    });
    return s;
  }, [charlson, ageCharlson]);

  const charlsonSurvival = useMemo(() => Math.round(Math.pow(0.983, Math.exp(charlsonScore * 0.9)) * 100), [charlsonScore]);

  const OptionRow = ({ label, options, current, onChange }: any) => (
    <div className="space-y-2">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{label}</p>
      <div className="flex gap-1.5 flex-wrap">
        {options.map((opt: any, i: number) => (
          <button key={i} onClick={() => onChange(i)} className={`flex-1 min-w-[60px] py-2.5 rounded-xl border-2 text-[10px] font-black uppercase transition-all ${current === i ? 'bg-purple-600 text-white border-purple-600 shadow-md' : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-purple-200'}`}>{opt}</button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10 bg-light-glow min-h-full">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-purple-600 shadow-sm"><span className="material-symbols-outlined">arrow_back</span></button>
        <div>
          <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-[9px] font-black uppercase tracking-[0.2em]">AGA • RISCO CLÍNICO</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1 uppercase">{activeTab === 'braden' ? 'Escala de Braden' : activeTab === 'charlson' ? 'Comorbidade de Charlson' : 'Palliative Performance (PPS)'}</h2>
        </div>
      </header>

      <div className="flex gap-2 no-print overflow-x-auto pb-2 custom-scrollbar">
        {[{ id: 'braden', label: 'Braden' }, { id: 'charlson', label: 'Charlson' }, { id: 'pps', label: 'PPS' }].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id as any)} className={`flex-1 min-w-[150px] py-4 rounded-2xl font-black text-xs uppercase border-2 transition-all ${activeTab === t.id ? 'bg-white border-purple-600 text-purple-600 shadow-lg' : 'bg-white border-slate-100 text-slate-400'}`}>{t.label}</button>
        ))}
      </div>

      <div className="bg-white border-2 border-slate-200 p-8 rounded-[3rem] shadow-strong space-y-8 animate-fade-in">
        {activeTab === 'braden' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
               <div><h3 className="text-xl font-black text-slate-900 uppercase">Braden</h3><p className="text-xs font-bold text-slate-400">Risco de Lesão por Pressão</p></div>
               <div className={`text-center px-8 py-3 rounded-2xl text-white shadow-lg ${bradenScore <= 12 ? 'bg-rose-600' : bradenScore <= 18 ? 'bg-amber-500' : 'bg-emerald-600'}`}>
                  <p className="text-3xl font-black">{bradenScore}</p>
                  <p className="text-[7px] font-black uppercase">{bradenScore <= 12 ? 'Risco Alto' : bradenScore <= 18 ? 'Risco Moderado' : 'Risco Baixo'}</p>
               </div>
            </div>
            <div className="space-y-4">
               <OptionRow label="Percepção Sensorial" options={['1-Lim.', '2-M.Lim.', '3-P.Lim.', '4-Norm.']} current={braden[0]-1} onChange={(v:any)=> {const n=[...braden]; n[0]=v+1; setBraden(n);}} />
               <OptionRow label="Umidade" options={['1-Const.', '2-Muito', '3-Ocas.', '4-Raro']} current={braden[1]-1} onChange={(v:any)=> {const n=[...braden]; n[1]=v+1; setBraden(n);}} />
               <OptionRow label="Atividade" options={['1-Acam.', '2-Cad.', '3-Ocas.', '4-Norm.']} current={braden[2]-1} onChange={(v:any)=> {const n=[...braden]; n[2]=v+1; setBraden(n);}} />
               <OptionRow label="Mobilidade" options={['1-Imov.', '2-M.Lim.', '3-P.Lim.', '4-Norm.']} current={braden[3]-1} onChange={(v:any)=> {const n=[...braden]; n[3]=v+1; setBraden(n);}} />
               <OptionRow label="Nutrição" options={['1-Ruim', '2-Inad.', '3-Adeq.', '4-Exc.']} current={braden[4]-1} onChange={(v:any)=> {const n=[...braden]; n[4]=v+1; setBraden(n);}} />
               <OptionRow label="Fricção / Cisalhamento" options={['1-Prob.', '2-Potenc.', '3-S.Prob']} current={braden[5]-1} onChange={(v:any)=> {const n=[...braden]; n[5]=v+1; setBraden(n);}} />
            </div>
          </div>
        )}

        {activeTab === 'charlson' && (
          <div className="space-y-6 animate-fade-in">
             <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-xl font-black text-slate-900 uppercase">Comorbidade de Charlson</h3>
                <div className="text-center px-10 py-4 bg-purple-600 text-white rounded-[2rem] shadow-xl">
                   <p className="text-3xl font-black">{charlsonScore}</p>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div className="col-span-full"><p className="text-[10px] font-black text-slate-400 uppercase">Idade Geriátrica</p>
                   <div className="flex gap-1.5 flex-wrap mt-2">{['<50 (0)', '50-59 (1)', '60-69 (2)', '70-79 (3)', '≥80 (4)'].map((l, i) => (
                      <button key={i} onClick={()=>setAgeCharlson(i)} className={`px-3 py-2 rounded-lg border-2 text-[9px] font-black ${ageCharlson===i ? 'bg-purple-600 text-white':'bg-slate-50'}`}>{l}</button>
                   ))}</div>
                </div>
                {[
                  {id:'iam', label:'IAM prévio', pts:1}, {id:'icc', label:'ICC', pts:1}, {id:'daop', label:'DAOP', pts:1},
                  {id:'avc', label:'AVC ou AIT', pts:1}, {id:'dem', label:'Demência', pts:1}, {id:'dpoc', label:'DPOC', pts:1},
                  {id:'ulc', label:'Úlcera Péptica', pts:1}, {id:'liv_mild', label:'Disf. Hepática Leve', pts:1},
                  {id:'dm', label:'Diabetes (sem lesão)', pts:1}, {id:'dm_comp', label:'Diabetes com lesão', pts:2},
                  {id:'hemi', label:'Hemiplegia', pts:2}, {id:'renal', label:'Insuf. Renal Mod/Sev', pts:2},
                  {id:'tumor', label:'Tumor Sólido', pts:2}, {id:'leuk', label:'Leucemia', pts:6}, {id:'lym', label:'Linfoma', pts:6},
                  {id:'liver_sev', label:'Cirrose Grave', pts:3}, {id:'met', label:'Metástase Sólida', pts:6}, {id:'aid', label:'AIDS/HIV', pts:6}
                ].map(item => (
                  <button key={item.id} onClick={()=>{const n = new Set(charlson); if(n.has(item.id)) n.delete(item.id); else n.add(item.id); setCharlson(n);}} className={`p-3 rounded-xl border-2 text-left text-[10px] font-black transition-all flex justify-between items-center ${charlson.has(item.id) ? 'bg-purple-50 border-purple-600 text-purple-900' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                    <span>{item.label}</span> <span className="opacity-60">+{item.pts}</span>
                  </button>
                ))}
             </div>
             <div className="p-4 bg-purple-50 rounded-2xl text-center"><p className="text-xs font-bold text-slate-600 uppercase">Probabilidade de Sobrevida (10 anos): <span className="text-purple-700 font-black">{charlsonSurvival}%</span></p></div>
          </div>
        )}

        {activeTab === 'pps' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b pb-4">
               <div><h3 className="text-xl font-black text-slate-900 uppercase">Palliative Performance Scale</h3><p className="text-xs font-bold text-slate-400">Escala de Funcionalidade em Paliativos</p></div>
               <div className="text-center px-10 py-4 bg-purple-600 text-white rounded-[2rem] shadow-xl"><p className="text-3xl font-black">{pps}%</p></div>
            </div>
            <input type="range" min="0" max="100" step="10" value={pps} onChange={e=>setPps(parseInt(e.target.value))} className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-purple-600" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 { val: 100, label: "Plena Atividade" }, { val: 70, label: "Incapaz de trabalho normal" },
                 { val: 50, label: "Sentado/Deitado maior parte" }, { val: 30, label: "Totalmente acamado" },
                 { val: 10, label: "Acamado, obnubilado" }, { val: 0, label: "Óbito" }
               ].map(item => (
                 <button key={item.val} onClick={()=>setPps(item.val)} className={`p-4 rounded-xl border-2 text-left text-xs font-bold transition-all ${pps === item.val ? 'bg-purple-600 text-white' : 'bg-slate-50'}`}>[{item.val}%] {item.label}</button>
               ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicalRiskTool;