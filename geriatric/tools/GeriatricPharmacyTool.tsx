import React, { useState, useMemo, useEffect } from 'react';

interface Props {
  onBack: () => void;
  initialTab?: 'beers' | 'stopp' | 'cardio' | 'renal' | 'chads' | 'hasbled';
}

const GeriatricPharmacyTool: React.FC<Props> = ({ onBack, initialTab = 'beers' }) => {
  const [activeTab, setActiveTab] = useState<'beers' | 'stopp' | 'chads' | 'hasbled' | 'renal'>('beers');
  
  useEffect(() => {
    if (initialTab === 'chads') setActiveTab('chads');
    else if (initialTab === 'hasbled') setActiveTab('hasbled');
    else if (initialTab) setActiveTab(initialTab as any);
  }, [initialTab]);
  
  // Cardio States
  const [cvData, setCvData] = useState<Set<string>>(new Set());
  
  // Renal State
  const [cr, setCr] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [sex, setSex] = useState<'M' | 'F'>('M');

  const cha2ds2vasc = useMemo(() => {
    let s = 0;
    if (cvData.has('chf')) s += 1;
    if (cvData.has('htn')) s += 1;
    if (cvData.has('dm')) s += 1;
    if (cvData.has('stroke')) s += 2;
    if (cvData.has('vasc')) s += 1;
    if (cvData.has('age75')) s += 2; else if (cvData.has('age65')) s += 1;
    if (cvData.has('sexF')) s += 1;
    return s;
  }, [cvData]);

  const hasbled = useMemo(() => {
    let s = 0;
    if (cvData.has('htn_sev')) s += 1;
    if (cvData.has('renal')) s += 1;
    if (cvData.has('liver')) s += 1;
    if (cvData.has('stroke')) s += 1;
    if (cvData.has('bleed')) s += 1;
    if (cvData.has('inr')) s += 1;
    if (cvData.has('age65')) s += 1;
    if (cvData.has('drugs')) s += 1;
    if (cvData.has('alcohol')) s += 1;
    return s;
  }, [cvData]);

  const clearance = useMemo(() => {
    const C = parseFloat(cr);
    const A = parseFloat(age);
    const W = parseFloat(weight);
    if (isNaN(C) || isNaN(A) || isNaN(W) || C <= 0) return null;
    let res = ((140 - A) * W) / (72 * C);
    if (sex === 'F') res *= 0.85;
    return res;
  }, [cr, age, weight, sex]);

  const BEERS_LIST = [
    { class: "Anticolinérgicos", meds: "Amitriptilina, Biperideno, Hidroxizina", risk: "Confusão, boca seca." },
    { class: "Benzodiazepínicos", meds: "Diazepam, Alprazolam, Clonazepam", risk: "Fraturas, delirium." },
    { class: "AINEs", meds: "Diclofenaco, Naproxeno, Ibuprofeno", risk: "Lesão renal, sangramento GI." },
    { class: "Sulfonilureias", meds: "Glibenclamida", risk: "Hipoglicemia prolongada." }
  ];

  const toggleCv = (id: string) => {
    const n = new Set(cvData);
    if (n.has(id)) n.delete(id); else n.add(id);
    setCvData(n);
  };

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10 bg-light-glow min-h-full text-slate-900">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-purple-600 shadow-sm">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-[9px] font-black uppercase tracking-[0.2em]">AGA • SEGURANÇA FARMACOLÓGICA</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1 uppercase">Farmacologia e Cardio-Renal</h2>
        </div>
      </header>

      <div className="flex gap-2 no-print overflow-x-auto pb-2 custom-scrollbar">
        {[
          { id: 'beers', label: 'Beers 2023' },
          { id: 'stopp', label: 'STOPP/START' },
          { id: 'renal', label: 'C-G (Renal)' },
          { id: 'chads', label: 'CHA₂DS₂-VASc' },
          { id: 'hasbled', label: 'HAS-BLED' }
        ].map(t => (
          <button 
            key={t.id} 
            onClick={() => setActiveTab(t.id as any)}
            className={`flex-1 min-w-[140px] py-4 rounded-2xl font-black text-[10px] uppercase border-2 transition-all ${activeTab === t.id ? 'bg-white border-purple-600 text-purple-600 shadow-lg' : 'bg-white border-slate-100 text-slate-400'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white border-2 border-slate-200 p-8 rounded-[3rem] shadow-strong space-y-8 animate-fade-in">
        {activeTab === 'beers' && (
          <div className="space-y-6">
             <h3 className="text-xl font-black text-slate-900 uppercase border-b pb-2">Critérios de Beers</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BEERS_LIST.map((item, i) => (
                  <div key={i} className="p-6 bg-slate-50 rounded-[2rem] border-2 border-slate-100 space-y-1">
                     <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest">{item.class}</p>
                     <h4 className="text-sm font-black text-slate-900">{item.meds}</h4>
                     <p className="text-xs font-bold text-slate-500 italic">Risco: {item.risk}</p>
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'stopp' && (
          <div className="space-y-6">
             <h3 className="text-xl font-black text-slate-900 uppercase border-b pb-2">STOPP (Prescrições Inadequadas)</h3>
             <div className="grid grid-cols-1 gap-4">
                {[
                  { cat: "Cardio", rule: "Digoxina > 0.125mg se ClCr < 50ml/min." },
                  { cat: "SNC", rule: "Neurolépticos se não houver sintomas psicóticos graves." },
                  { cat: "Gastro", rule: "Inibidores da Bomba de Prótons por mais de 8 semanas." }
                ].map((item, i) => (
                  <div key={i} className="p-5 bg-white border-2 border-slate-100 rounded-2xl flex items-start gap-4">
                     <span className="material-symbols-outlined text-rose-600">block</span>
                     <div><p className="text-[9px] font-black text-slate-400 uppercase">{item.cat}</p><p className="text-sm font-bold text-slate-700">{item.rule}</p></div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'renal' && (
          <div className="space-y-8">
             <h3 className="text-xl font-black text-slate-900 uppercase border-b pb-2">Cockcroft-Gault</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <input type="number" placeholder="Creatinina" value={cr} onChange={e=>setCr(e.target.value)} className="p-4 bg-slate-50 border-2 border-slate-200 rounded-xl font-black" />
                <input type="number" placeholder="Idade" value={age} onChange={e=>setAge(e.target.value)} className="p-4 bg-slate-50 border-2 border-slate-200 rounded-xl font-black" />
                <input type="number" placeholder="Peso (kg)" value={weight} onChange={e=>setWeight(e.target.value)} className="p-4 bg-slate-50 border-2 border-slate-200 rounded-xl font-black" />
                <div className="flex gap-1">
                   <button onClick={()=>setSex('M')} className={`flex-1 rounded-xl border-2 text-[10px] font-black ${sex==='M'?'bg-purple-600 text-white':'bg-slate-50'}`}>M</button>
                   <button onClick={()=>setSex('F')} className={`flex-1 rounded-xl border-2 text-[10px] font-black ${sex==='F'?'bg-purple-600 text-white':'bg-slate-50'}`}>F</button>
                </div>
             </div>
             {clearance && (
               <div className="p-8 bg-purple-50 border-2 border-purple-200 rounded-[2.5rem] text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1">ClCr Estimado</p>
                  <p className="text-5xl font-black text-purple-900 leading-none">{clearance.toFixed(1)} <span className="text-lg">mL/min</span></p>
               </div>
             )}
          </div>
        )}

        {activeTab === 'chads' && (
          <div className="space-y-6">
             <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-xl font-black text-slate-900 uppercase">CHA₂DS₂-VASc</h3>
                <div className="bg-purple-600 text-white px-6 py-2 rounded-xl text-2xl font-black">{cha2ds2vasc}</div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  {id:'chf', label:'IC / Disfunção VE', pts:1}, {id:'htn', label:'Hipertensão', pts:1},
                  {id:'age75', label:'Idade ≥ 75 anos', pts:2}, {id:'dm', label:'Diabetes', pts:1},
                  {id:'stroke', label:'AVC / AIT / Embolia', pts:2}, {id:'vasc', label:'Doença Vascular', pts:1},
                  {id:'age65', label:'Idade 65-74 anos', pts:1}, {id:'sexF', label:'Sexo Feminino', pts:1}
                ].map(item => (
                  <button key={item.id} onClick={()=>toggleCv(item.id)} className={`p-3 rounded-xl border-2 text-left text-[10px] font-black flex justify-between ${cvData.has(item.id)?'bg-purple-50 border-purple-600 text-purple-900':'bg-slate-50 border-slate-100 text-slate-400'}`}>
                    <span>{item.label}</span> <span>+{item.pts}</span>
                  </button>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'hasbled' && (
          <div className="space-y-6">
             <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-xl font-black text-slate-900 uppercase">HAS-BLED</h3>
                <div className="bg-rose-600 text-white px-6 py-2 rounded-xl text-2xl font-black">{hasbled}</div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  {id:'htn_sev', label:'Hipertensão (PAS > 160)'}, {id:'renal', label:'Disfunção Renal'},
                  {id:'liver', label:'Disfunção Hepática'}, {id:'stroke', label:'AVC prévio'},
                  {id:'bleed', label:'Hemorragia / Diátese'}, {id:'inr', label:'INR lábil'},
                  {id:'age65', label:'Idade > 65 anos'}, {id:'drugs', label:'Uso de AAS / AINEs'},
                  {id:'alcohol', label:'Consumo de Álcool'}
                ].map(item => (
                  <button key={item.id} onClick={()=>toggleCv(item.id)} className={`p-3 rounded-xl border-2 text-left text-[10px] font-black ${cvData.has(item.id)?'bg-rose-50 border-rose-600 text-rose-900':'bg-slate-50 border-slate-100 text-slate-400'}`}>
                    {item.label}
                  </button>
                ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeriatricPharmacyTool;