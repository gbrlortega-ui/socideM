import React, { useState, useEffect } from 'react';

interface Props {
  onBack: () => void;
  initialTab?: 'fried' | 'cfs';
}

const FrailtyTool: React.FC<Props> = ({ onBack, initialTab = 'fried' }) => {
  const [activeTab, setActiveTab] = useState<'fried' | 'cfs'>(initialTab as any);
  
  useEffect(() => {
    if (initialTab) setActiveTab(initialTab as any);
  }, [initialTab]);
  
  const [fried, setFried] = useState<boolean[]>(new Array(5).fill(false));
  const friedScore = fried.filter(a => a === true).length;
  const [cfs, setCfs] = useState<number>(1);

  const CFS_LEVELS = [
    { val: 1, label: "Muito Robusto", desc: "Ativo, motivado, exercício regular." },
    { val: 2, label: "Robusto", desc: "Sem doença ativa, mas menos ativo que o nível 1." },
    { val: 3, label: "Bem, doença controlada", desc: "Sintomas tratados, sem limitações diárias." },
    { val: 4, label: "Vulnerável", desc: "Não dependente, mas limitado por sintomas." },
    { val: 5, label: "Fragilidade Leve", desc: "Ajuda em AVDs instrumentais." },
    { val: 6, label: "Fragilidade Moderada", desc: "Ajuda em AVDs básicas." },
    { val: 7, label: "Fragilidade Grave", desc: "Dependência total para cuidados." },
    { val: 8, label: "Fragilidade Muito Grave", desc: "Dependência total, fim da vida próximo." },
    { val: 9, label: "Doença Terminal", desc: "Expectativa < 6 meses." }
  ];

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10 bg-light-glow min-h-full">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-purple-600 shadow-sm">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-[9px] font-black uppercase tracking-[0.2em]">AGA • FRAGILIDADE</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1 uppercase">Avaliação de Fragilidade</h2>
        </div>
      </header>

      <div className="flex gap-2 no-print overflow-x-auto pb-2 custom-scrollbar">
        {[
          { id: 'fried', label: 'Fenótipo de Fried' },
          { id: 'cfs', label: 'Clinical Frailty Scale (CFS)' }
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
        {activeTab === 'fried' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
               <div>
                 <h3 className="text-xl font-black text-slate-900 uppercase">Fried Score</h3>
                 <p className="text-xs font-bold text-slate-400">Cinco componentes físicos de fragilidade.</p>
               </div>
               <div className={`text-center px-10 py-4 rounded-[2rem] text-white shadow-lg ${friedScore >= 3 ? 'bg-rose-600' : friedScore >= 1 ? 'bg-amber-500' : 'bg-emerald-600'}`}>
                  <p className="text-3xl font-black">{friedScore}/5</p>
                  <p className="text-[7px] font-black uppercase">{friedScore >= 3 ? 'Frágil' : friedScore >= 1 ? 'Pré-frágil' : 'Robusto'}</p>
               </div>
            </div>
            <div className="space-y-3">
              {[
                "Perda de peso não intencional (> 4.5kg no último ano)",
                "Exaustão (fadiga autorreferida)",
                "Baixa força de preensão (Dinamometria < P20)",
                "Baixa velocidade de marcha (Tempo > P20)",
                "Baixo nível de atividade física"
              ].map((q, i) => (
                <button 
                  key={i} 
                  onClick={() => {
                    const n = [...fried];
                    n[i] = !n[i];
                    setFried(n);
                  }}
                  className={`w-full p-5 rounded-2xl border-2 text-left flex justify-between items-center transition-all ${fried[i] ? 'bg-purple-50 border-purple-600 text-purple-900 shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-400'}`}
                >
                  <span className="text-sm font-bold">{q}</span>
                  <span className="material-symbols-outlined">{fried[i] ? 'check_box' : 'check_box_outline_blank'}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cfs' && (
          <div className="space-y-6 animate-fade-in">
             <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-xl font-black text-slate-900 uppercase">Clinical Frailty Scale</h3>
                <div className={`px-10 py-4 rounded-[2rem] text-white shadow-lg ${cfs >= 5 ? 'bg-rose-600' : 'bg-emerald-600'}`}>
                   <p className="text-3xl font-black">Nível {cfs}</p>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {CFS_LEVELS.map(item => (
                  <button 
                    key={item.val} 
                    onClick={() => setCfs(item.val)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${cfs === item.val ? 'bg-purple-600 text-white border-purple-600' : 'bg-slate-50 border-slate-100 text-slate-600'}`}
                  >
                     <p className="font-black text-xs uppercase">{item.val}. {item.label}</p>
                     <p className="text-[9px] mt-1 opacity-80 leading-tight">{item.desc}</p>
                  </button>
                ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FrailtyTool;