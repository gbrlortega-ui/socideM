import React, { useState, useMemo, useEffect } from 'react';

interface Props {
  onBack: () => void;
  initialTab?: 'mna' | 'imc';
}

const NutritionTool: React.FC<Props> = ({ onBack, initialTab = 'mna' }) => {
  const [activeTab, setActiveTab] = useState<'mna' | 'imc'>(initialTab as any);
  
  useEffect(() => {
    if (initialTab) setActiveTab(initialTab as any);
  }, [initialTab]);

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [mna, setMna] = useState<number[]>(new Array(6).fill(2));
  const mnaScore = mna.reduce((a, b) => a + b, 0);

  const imcValue = useMemo(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (isNaN(w) || isNaN(h) || h <= 0) return null;
    return w / (h * h);
  }, [weight, height]);

  const imcClass = useMemo(() => {
    if (!imcValue) return null;
    if (imcValue < 22) return { label: 'Baixo Peso', color: 'text-amber-500' };
    if (imcValue <= 27) return { label: 'Eutrofia', color: 'text-emerald-600' };
    return { label: 'Excesso de Peso', color: 'text-rose-600' };
  }, [imcValue]);

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10 bg-light-glow min-h-full">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-purple-600 shadow-sm">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-[9px] font-black uppercase tracking-[0.2em]">AGA • NUTRIÇÃO</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1 uppercase">Nutrição e Biometria</h2>
        </div>
      </header>

      <div className="flex gap-2 no-print overflow-x-auto pb-2 custom-scrollbar">
        {[
          { id: 'mna', label: 'Mini Avaliação Nutricional (MNA)' },
          { id: 'imc', label: 'IMC Geriátrico' }
        ].map(t => (
          <button 
            key={t.id} 
            onClick={() => setActiveTab(t.id as any)}
            className={`flex-1 min-w-[200px] py-4 rounded-2xl font-black text-xs uppercase border-2 transition-all ${activeTab === t.id ? 'bg-white border-purple-600 text-purple-600 shadow-lg' : 'bg-white border-slate-100 text-slate-400'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white border-2 border-slate-200 p-8 rounded-[3rem] shadow-strong space-y-8 animate-fade-in">
        {activeTab === 'imc' && (
          <div className="space-y-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                   <h3 className="text-xl font-black text-slate-900 uppercase">Cálculo de IMC</h3>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-400 uppercase ml-1">Peso (kg)</label>
                        <input type="number" value={weight} onChange={e=>setWeight(e.target.value)} className="w-full p-4 bg-slate-50 border-2 rounded-xl font-black" placeholder="70" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-400 uppercase ml-1">Altura (cm)</label>
                        <input type="number" value={height} onChange={e=>setHeight(e.target.value)} className="w-full p-4 bg-slate-50 border-2 rounded-xl font-black" placeholder="165" />
                      </div>
                   </div>
                </div>
                {imcValue && (
                  <div className="p-8 rounded-[2.5rem] bg-emerald-50 border-2 border-emerald-100 text-center animate-fade-in">
                     <p className="text-5xl font-black text-slate-900">{imcValue.toFixed(1)}</p>
                     <p className={`text-lg font-black uppercase mt-2 ${imcClass?.color}`}>{imcClass?.label}</p>
                     <p className="text-[10px] text-slate-400 mt-4 leading-tight italic">Corte Idoso (Lipschitz/OPAS): Eutrofia entre 22 e 27 kg/m².</p>
                  </div>
                )}
             </div>
          </div>
        )}

        {activeTab === 'mna' && (
          <div className="space-y-6">
             <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-xl font-black text-slate-900">Mini Avaliação Nutricional</h3>
                <div className={`text-center px-8 py-3 rounded-2xl text-white shadow-lg ${mnaScore >= 12 ? 'bg-emerald-600' : mnaScore >= 8 ? 'bg-amber-500' : 'bg-rose-600'}`}>
                   <p className="text-3xl font-black">{mnaScore}/14</p>
                   <p className="text-[8px] font-black uppercase">{mnaScore >= 12 ? 'Normal' : mnaScore >= 8 ? 'Risco' : 'Desnutrido'}</p>
                </div>
             </div>
             <div className="space-y-4">
                {[
                  { label: "A. Ingestão alimentar diminuída nos últimos 3 meses?", opts: ["Grave (0)", "Moderada (1)", "Sem redução (2)"], points: [0, 1, 2] },
                  { label: "B. Perda de peso nos últimos 3 meses?", opts: ["> 3kg (0)", "NS (1)", "1-3kg (2)", "Sem perda (3)"], points: [0, 1, 2, 3] },
                  { label: "C. Mobilidade?", opts: ["Leito/Cadeira (0)", "Casa/UBS (1)", "Normal (2)"], points: [0, 1, 2] },
                  { label: "D. Estresse psicológico ou doença aguda (3m)?", opts: ["Sim (0)", "Não (2)"], points: [0, 2] },
                  { label: "E. Problemas neuropsicológicos?", opts: ["Demência/Depre (0)", "CCL (1)", "Sem prob (2)"], points: [0, 1, 2] },
                  { label: "F. IMC?", opts: ["< 19 (0)", "19-21 (1)", "21-23 (2)", "≥ 23 (3)"], points: [0, 1, 2, 3] }
                ].map((q, idx) => (
                  <div key={idx} className="space-y-2">
                    <p className="text-xs font-bold text-slate-700">{q.label}</p>
                    <div className="flex gap-2 flex-wrap">
                      {q.opts.map((opt, i) => (
                        <button key={i} onClick={() => {
                          const n = [...mna];
                          n[idx] = q.points[i];
                          setMna(n);
                        }} className={`px-3 py-2 rounded-lg border-2 text-[9px] font-black uppercase transition-all ${mna[idx] === q.points[i] ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionTool;