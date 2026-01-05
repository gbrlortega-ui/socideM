import React, { useState, useEffect } from 'react';

interface Props {
  onBack: () => void;
  initialScale?: 'katz' | 'lawton' | 'barthel';
}

const FunctionalityTool: React.FC<Props> = ({ onBack, initialScale = 'katz' }) => {
  const [activeScale, setActiveScale] = useState<'katz' | 'lawton' | 'barthel'>(initialScale);
  
  useEffect(() => {
    setActiveScale(initialScale);
  }, [initialScale]);

  // Katz State
  const [katzAnswers, setKatzAnswers] = useState<boolean[]>(new Array(6).fill(true));
  const katzScore = katzAnswers.filter(a => a).length;

  // Lawton State
  const [lawtonAnswers, setLawtonAnswers] = useState<number[]>(new Array(8).fill(3));
  const lawtonScore = lawtonAnswers.reduce((a, b) => a + b, 0);

  // Barthel State
  const [barthelAnswers, setBarthelAnswers] = useState<number[]>(new Array(10).fill(10));
  const barthelScore = barthelAnswers.reduce((a, b) => a + b, 0);

  const OptionRow = ({ label, options, current, onChange }: any) => (
    <div className="space-y-2">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{label}</p>
      <div className="flex gap-1.5 flex-wrap">
        {options.map((opt: any, i: number) => (
          <button 
            key={i} 
            onClick={() => onChange(i)}
            className={`flex-1 min-w-[80px] py-3 rounded-xl border-2 text-[10px] font-black uppercase transition-all ${current === i ? 'bg-purple-600 text-white border-purple-600 shadow-md' : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-purple-200'}`}
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
        <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-purple-600 transition-all shadow-sm">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-[9px] font-black uppercase tracking-[0.2em]">AGA • FUNCIONALIDADE</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1 uppercase">
            {activeScale === 'katz' ? 'Índice de Katz' : activeScale === 'lawton' ? 'Escala de Lawton-Brody' : 'Índice de Barthel'}
          </h2>
        </div>
      </header>

      <div className="flex gap-2 no-print overflow-x-auto pb-2 custom-scrollbar">
        {[
          { id: 'katz', label: 'Katz (AVD Básica)' },
          { id: 'lawton', label: 'Lawton-Brody (AIVD)' },
          { id: 'barthel', label: 'Barthel (Dependência)' }
        ].map(t => (
          <button 
            key={t.id} 
            onClick={() => setActiveScale(t.id as any)}
            className={`flex-1 min-w-[180px] py-4 rounded-2xl font-black text-xs uppercase border-2 transition-all ${activeScale === t.id ? 'bg-white border-purple-600 text-purple-600 shadow-lg' : 'bg-white border-slate-100 text-slate-400'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white border-2 border-slate-200 p-8 rounded-[3rem] shadow-strong space-y-8 animate-fade-in">
        {activeScale === 'katz' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
               <div>
                 <h3 className="text-xl font-black text-slate-900 uppercase">Katz - ABVD</h3>
                 <p className="text-xs font-bold text-slate-400">Avaliação de Atividades Básicas</p>
               </div>
               <div className={`text-center px-6 py-2 rounded-2xl text-white shadow-lg ${katzScore === 6 ? 'bg-emerald-600' : katzScore >= 4 ? 'bg-amber-500' : 'bg-rose-600'}`}>
                  <p className="text-2xl font-black">{katzScore}/6</p>
                  <p className="text-[7px] font-black uppercase">Independência</p>
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Banho', 'Vestir-se', 'Uso do Banheiro', 'Transferência', 'Continência', 'Alimentação'].map((item, i) => (
                <button 
                  key={i} 
                  onClick={() => {
                    const n = [...katzAnswers];
                    n[i] = !n[i];
                    setKatzAnswers(n);
                  }}
                  className={`p-4 rounded-2xl border-2 text-left flex justify-between items-center transition-all ${katzAnswers[i] ? 'bg-purple-50 border-purple-600 text-purple-900' : 'bg-slate-50 border-slate-100 text-slate-400'}`}
                >
                  <span className="font-bold">{item}</span>
                  <span className="text-[10px] font-black uppercase">{katzAnswers[i] ? 'Independente' : 'Dependente'}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeScale === 'lawton' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
               <div>
                 <h3 className="text-xl font-black text-slate-900 uppercase">Lawton-Brody</h3>
                 <p className="text-xs font-bold text-slate-400">Atividades Instrumentais (AIVD)</p>
               </div>
               <div className={`text-center px-6 py-2 rounded-2xl text-white shadow-lg ${lawtonScore === 24 ? 'bg-emerald-600' : lawtonScore >= 18 ? 'bg-amber-500' : 'bg-rose-600'}`}>
                  <p className="text-2xl font-black">{lawtonScore}/24</p>
                  <p className="text-[7px] font-black uppercase">Pontos</p>
               </div>
            </div>
            <div className="space-y-4">
              <OptionRow label="Usar Telefone" options={['Não consegue (1)', 'Parcial (2)', 'Independente (3)']} current={lawtonAnswers[0]-1} onChange={(v:any) => { const n=[...lawtonAnswers]; n[0]=v+1; setLawtonAnswers(n); }} />
              <OptionRow label="Viagens / Transporte" options={['Não viaja (1)', 'Só c/ ajuda (2)', 'Independente (3)']} current={lawtonAnswers[1]-1} onChange={(v:any) => { const n=[...lawtonAnswers]; n[1]=v+1; setLawtonAnswers(n); }} />
              <OptionRow label="Compras" options={['Não faz (1)', 'Só c/ ajuda (2)', 'Independente (3)']} current={lawtonAnswers[2]-1} onChange={(v:any) => { const n=[...lawtonAnswers]; n[2]=v+1; setLawtonAnswers(n); }} />
              <OptionRow label="Preparar Refeições" options={['Não faz (1)', 'Só c/ ajuda (2)', 'Independente (3)']} current={lawtonAnswers[3]-1} onChange={(v:any) => { const n=[...lawtonAnswers]; n[3]=v+1; setLawtonAnswers(n); }} />
              <OptionRow label="Trabalho Doméstico" options={['Não faz (1)', 'Só c/ ajuda (2)', 'Independente (3)']} current={lawtonAnswers[4]-1} onChange={(v:any) => { const n=[...lawtonAnswers]; n[4]=v+1; setLawtonAnswers(n); }} />
              <OptionRow label="Remédios" options={['Não toma (1)', 'Só c/ ajuda (2)', 'Independente (3)']} current={lawtonAnswers[5]-1} onChange={(v:any) => { const n=[...lawtonAnswers]; n[5]=v+1; setLawtonAnswers(n); }} />
              <OptionRow label="Finanças" options={['Não controla (1)', 'Só c/ ajuda (2)', 'Independente (3)']} current={lawtonAnswers[6]-1} onChange={(v:any) => { const n=[...lawtonAnswers]; n[6]=v+1; setLawtonAnswers(n); }} />
              <OptionRow label="Lavar Roupa" options={['Não faz (1)', 'Só c/ ajuda (2)', 'Independente (3)']} current={lawtonAnswers[7]-1} onChange={(v:any) => { const n=[...lawtonAnswers]; n[7]=v+1; setLawtonAnswers(n); }} />
            </div>
          </div>
        )}

        {activeScale === 'barthel' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
               <div>
                 <h3 className="text-xl font-black text-slate-900 uppercase">Índice de Barthel</h3>
                 <p className="text-xs font-bold text-slate-400">Nível de Independência Física</p>
               </div>
               <div className={`text-center px-6 py-2 rounded-2xl text-white shadow-lg ${barthelScore >= 90 ? 'bg-emerald-600' : 'bg-rose-600'}`}>
                  <p className="text-2xl font-black">{barthelScore}/100</p>
                  <p className="text-[7px] font-black uppercase">Pontos</p>
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
               <OptionRow label="Alimentação" options={['Dependente (0)', 'Ajuda (5)', 'Indep (10)']} current={barthelAnswers[0]/5} onChange={(v:any) => { const n=[...barthelAnswers]; n[0]=v*5; setBarthelAnswers(n); }} />
               <OptionRow label="Banho" options={['Dependente (0)', 'Indep (5)']} current={barthelAnswers[1]/5} onChange={(v:any) => { const n=[...barthelAnswers]; n[1]=v*5; setBarthelAnswers(n); }} />
               <OptionRow label="Vestir-se" options={['Dependente (0)', 'Ajuda (5)', 'Indep (10)']} current={barthelAnswers[2]/5} onChange={(v:any) => { const n=[...barthelAnswers]; n[2]=v*5; setBarthelAnswers(n); }} />
               <OptionRow label="Higiene Pessoal" options={['Dependente (0)', 'Indep (5)']} current={barthelAnswers[3]/5} onChange={(v:any) => { const n=[...barthelAnswers]; n[3]=v*5; setBarthelAnswers(n); }} />
               <OptionRow label="Intestino" options={['Incont (0)', 'Acid (5)', 'Cont (10)']} current={barthelAnswers[4]/5} onChange={(v:any) => { const n=[...barthelAnswers]; n[4]=v*5; setBarthelAnswers(n); }} />
               <OptionRow label="Bexiga" options={['Incont (0)', 'Acid (5)', 'Cont (10)']} current={barthelAnswers[5]/5} onChange={(v:any) => { const n=[...barthelAnswers]; n[5]=v*5; setBarthelAnswers(n); }} />
               <OptionRow label="Uso do Banheiro" options={['Dep (0)', 'Ajuda (5)', 'Indep (10)']} current={barthelAnswers[6]/5} onChange={(v:any) => { const n=[...barthelAnswers]; n[6]=v*5; setBarthelAnswers(n); }} />
               <OptionRow label="Transferência" options={['Dep (0)', 'Ajuda (5)', 'Mínima (10)', 'Indep (15)']} current={barthelAnswers[7]/5} onChange={(v:any) => { const n=[...barthelAnswers]; n[7]=v*5; setBarthelAnswers(n); }} />
               <OptionRow label="Mobilidade" options={['Imóvel (0)', 'Cadeirante (5)', 'Ajuda (10)', 'Indep (15)']} current={barthelAnswers[8]/5} onChange={(v:any) => { const n=[...barthelAnswers]; n[8]=v*5; setBarthelAnswers(n); }} />
               <OptionRow label="Escadas" options={['Não (0)', 'Ajuda (5)', 'Indep (10)']} current={barthelAnswers[9]/5} onChange={(v:any) => { const n=[...barthelAnswers]; n[9]=v*5; setBarthelAnswers(n); }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FunctionalityTool;