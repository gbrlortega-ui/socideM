import React, { useState, useEffect, useMemo } from 'react';
import Stopwatch from '../../Stopwatch';

interface Props {
  onBack: () => void;
  initialTab?: 'mmse' | 'moca' | 'clock' | 'gds';
}

const CognitionMoodTool: React.FC<Props> = ({ onBack, initialTab = 'mmse' }) => {
  const [activeTab, setActiveTab] = useState<'mmse' | 'moca' | 'clock' | 'gds'>(initialTab);
  
  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);
  
  // MEEM (MMSE) State
  const [mmseAnswers, setMmseAnswers] = useState<Record<string, number>>({});
  const mmseTotal = useMemo(() => Object.values(mmseAnswers).reduce((a, b) => a + b, 0), [mmseAnswers]);

  // MoCA State
  const [mocaAnswers, setMocaAnswers] = useState<Record<string, number>>({});
  const mocaTotal = useMemo(() => Object.values(mocaAnswers).reduce((a, b) => a + b, 0), [mocaAnswers]);
  
  // GDS-15 State
  const [gdsAnswers, setGdsAnswers] = useState<boolean[]>(new Array(15).fill(false));
  const gdsTotal = gdsAnswers.filter(a => a === true).length;

  // Clock Test State
  const [clockPoints, setClockPoints] = useState<boolean[]>(new Array(5).fill(true));
  const clockScore = clockPoints.filter(p => p === true).length;

  const handleMmseChange = (id: string, val: number) => {
    setMmseAnswers(prev => ({ ...prev, [id]: val }));
  };

  const handleMocaChange = (id: string, val: number) => {
    setMocaAnswers(prev => ({ ...prev, [id]: val }));
  };

  const CounterInput = ({ id, label, max, current, onChange }: any) => (
    <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <div className="flex items-center gap-3">
        <button 
          onClick={() => onChange(id, Math.max(0, (current || 0) - 1))}
          className="size-8 rounded-full bg-white border border-slate-300 flex items-center justify-center text-slate-400 hover:text-purple-600 transition-all"
        >
          <span className="material-symbols-outlined text-sm">remove</span>
        </button>
        <span className="w-8 text-center font-black text-slate-900">{current || 0}</span>
        <button 
          onClick={() => onChange(id, Math.min(max, (current || 0) + 1))}
          className="size-8 rounded-full bg-white border border-slate-300 flex items-center justify-center text-slate-400 hover:text-purple-600 transition-all"
        >
          <span className="material-symbols-outlined text-sm">add</span>
        </button>
        <span className="text-[10px] font-black text-slate-300 ml-1">/ {max}</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10 bg-light-glow min-h-full">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-purple-600 shadow-sm">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <span className="px-3 py-1 rounded-full bg-purple-800 text-white text-[9px] font-black uppercase tracking-[0.2em]">AGA • NEUROPSIQUIATRIA</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1 uppercase">
            {activeTab === 'mmse' ? 'Mini-Mental (MEEM)' : activeTab === 'moca' ? 'Montreal Cognitive Assessment (MoCA)' : activeTab === 'clock' ? 'Teste do Relógio' : 'Escala de Depressão (GDS)'}
          </h2>
        </div>
      </header>

      <div className="flex gap-2 no-print overflow-x-auto pb-2 custom-scrollbar">
        {[
          { id: 'mmse', label: 'MEEM / MMSE' },
          { id: 'moca', label: 'MoCA' },
          { id: 'clock', label: 'Teste do Relógio' },
          { id: 'gds', label: 'Depressão (GDS-15)' }
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

      <div className="bg-white border-2 border-slate-200 p-8 rounded-[3rem] shadow-strong space-y-8 animate-fade-in relative overflow-hidden">
        
        {activeTab === 'mmse' && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-center border-b pb-4">
               <div>
                 <h3 className="text-xl font-black text-slate-900 uppercase">Questionário MEEM</h3>
                 <p className="text-xs font-bold text-slate-400">Aplique o teste e pontue cada seção abaixo.</p>
               </div>
               <div className="text-center px-10 py-4 bg-purple-600 text-white rounded-[2rem] shadow-xl">
                  <p className="text-[10px] font-black uppercase opacity-60 mb-1">Escore Total</p>
                  <p className="text-4xl font-black">{mmseTotal}</p>
                  <p className="text-[8px] font-bold mt-1">/ 30 PONTOS</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <section className="space-y-4">
                <h4 className="text-[10px] font-black text-purple-600 uppercase tracking-widest border-b pb-2">Orientação</h4>
                <CounterInput id="o_temp" label="Temporal (Ano, Semestre, Mês, Dia, Semana)" max={5} current={mmseAnswers.o_temp} onChange={handleMmseChange} />
                <CounterInput id="o_spat" label="Espacial (Estado, Cidade, Bairro, Local, Andar)" max={5} current={mmseAnswers.o_spat} onChange={handleMmseChange} />
                
                <h4 className="text-[10px] font-black text-purple-600 uppercase tracking-widest border-b pb-2 pt-4">Memória e Atenção</h4>
                <CounterInput id="reg" label="Registro (Repetir 3 palavras)" max={3} current={mmseAnswers.reg} onChange={handleMmseChange} />
                <CounterInput id="att" label="Atenção/Cálculo (Serial 7 ou MUNDO)" max={5} current={mmseAnswers.att} onChange={handleMmseChange} />
                <CounterInput id="rec" label="Evocação Tardia (Recordar 3 palavras)" max={3} current={mmseAnswers.rec} onChange={handleMmseChange} />
              </section>

              <section className="space-y-4">
                <h4 className="text-[10px] font-black text-purple-600 uppercase tracking-widest border-b pb-2">Linguagem e Praxia</h4>
                <CounterInput id="lang_name" label="Nomeação (Relógio e Caneta)" max={2} current={mmseAnswers.lang_name} onChange={handleMmseChange} />
                <CounterInput id="lang_rep" label="Repetição (Nem aqui, nem ali, nem lá)" max={1} current={mmseAnswers.lang_rep} onChange={handleMmseChange} />
                <CounterInput id="lang_cmd" label="Comando de 3 estágios" max={3} current={mmseAnswers.lang_cmd} onChange={handleMmseChange} />
                <CounterInput id="lang_read" label="Leitura (Feche os olhos)" max={1} current={mmseAnswers.lang_read} onChange={handleMmseChange} />
                <CounterInput id="lang_write" label="Escrita (Frase completa)" max={1} current={mmseAnswers.lang_write} onChange={handleMmseChange} />
                <CounterInput id="lang_copy" label="Cópia (Pentágonos cruzados)" max={1} current={mmseAnswers.lang_copy} onChange={handleMmseChange} />
              </section>
            </div>
          </div>
        )}

        {activeTab === 'moca' && (
          <div className="space-y-8 animate-fade-in">
             <div className="flex justify-between items-center border-b pb-4">
                <div>
                   <h3 className="text-xl font-black text-slate-900 uppercase">Questionário MoCA</h3>
                   <p className="text-xs font-bold text-slate-400">Pontuação por domínios cognitivos.</p>
                </div>
                <div className="text-center px-10 py-4 bg-purple-600 text-white rounded-[2rem] shadow-xl">
                   <p className="text-[10px] font-black uppercase opacity-60 mb-1">Escore MoCA</p>
                   <p className="text-4xl font-black">{mocaTotal}</p>
                   <p className="text-[8px] font-bold mt-1">/ 30 PONTOS</p>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                <section className="space-y-4">
                   <h4 className="text-[10px] font-black text-purple-600 uppercase tracking-widest border-b pb-2">Domínios 1</h4>
                   <CounterInput id="exec" label="Visuoespacial / Executiva" max={5} current={mocaAnswers.exec} onChange={handleMocaChange} />
                   <CounterInput id="name" label="Nomeação" max={3} current={mocaAnswers.name} onChange={handleMocaChange} />
                   <CounterInput id="att" label="Atenção" max={6} current={mocaAnswers.att} onChange={handleMocaChange} />
                   <CounterInput id="lang" label="Linguagem" max={3} current={mocaAnswers.lang} onChange={handleMocaChange} />
                </section>
                <section className="space-y-4">
                   <h4 className="text-[10px] font-black text-purple-600 uppercase tracking-widest border-b pb-2">Domínios 2</h4>
                   <CounterInput id="abs" label="Abstração" max={2} current={mocaAnswers.abs} onChange={handleMocaChange} />
                   <CounterInput id="rec" label="Evocação Tardia" max={5} current={mocaAnswers.rec} onChange={handleMocaChange} />
                   <CounterInput id="ori" label="Orientação" max={6} current={mocaAnswers.ori} onChange={handleMocaChange} />
                   <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl mt-4">
                      <p className="text-[9px] font-black text-amber-700 uppercase mb-1">Nota Acadêmica</p>
                      <p className="text-xs font-bold text-amber-900 leading-tight">Adicione 1 ponto se escolaridade {'<'} 12 anos e escore {'<'} 30.</p>
                   </div>
                </section>
             </div>
          </div>
        )}

        {activeTab === 'clock' && (
          <div className="space-y-8 animate-fade-in">
             <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-xl font-black text-slate-900 uppercase">Teste do Relógio (TR)</h3>
                <div className={`text-center px-6 py-2 rounded-2xl text-white shadow-lg ${clockScore >= 4 ? 'bg-emerald-600' : 'bg-rose-600'}`}>
                   <p className="text-2xl font-black">{clockScore}/5</p>
                   <p className="text-[7px] font-black uppercase">Escore Shulman</p>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Desenhou o círculo (fechamento adequado)",
                  "Colocou todos os números (1 a 12)",
                  "Números em ordem e posição correta",
                  "Dois ponteiros presentes",
                  "Hora solicitada correta (11:10)"
                ].map((item, i) => (
                  <button 
                    key={i} 
                    onClick={() => {
                      const n = [...clockPoints];
                      n[i] = !n[i];
                      setClockPoints(n);
                    }}
                    className={`p-5 rounded-2xl border-2 text-left flex justify-between items-center transition-all ${clockPoints[i] ? 'bg-purple-50 border-purple-600 text-purple-900' : 'bg-slate-50 border-slate-100 text-slate-400'}`}
                  >
                    <span className="text-sm font-bold">{item}</span>
                    <span className="material-symbols-outlined">{clockPoints[i] ? 'check_circle' : 'circle'}</span>
                  </button>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'gds' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
               <div>
                 <h3 className="text-xl font-black text-slate-900 uppercase">GDS-15 (Yesavage)</h3>
                 <p className="text-xs font-bold text-slate-400">Escala de Depressão Geriátrica</p>
               </div>
               <div className={`text-center px-6 py-2 rounded-2xl text-white shadow-lg ${gdsTotal >= 5 ? 'bg-rose-600' : gdsTotal >= 1 ? 'bg-amber-500' : 'bg-emerald-600'}`}>
                  <p className="text-2xl font-black">{gdsTotal}/15</p>
                  <p className="text-[7px] font-black uppercase">{gdsTotal >= 5 ? 'Sintomas Depressivos' : gdsTotal >= 1 ? 'Sintomas Leves' : 'Normal'}</p>
               </div>
            </div>
            <div className="grid grid-cols-1 gap-3 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
              {[
                "1. Está satisfeito com sua vida? (NÃO = 1)",
                "2. Interrompeu muitas de suas atividades? (SIM = 1)",
                "3. Sente que sua vida está vazia? (SIM = 1)",
                "4. Aborrece-se com facilidade? (SIM = 1)",
                "5. Sente-se de bom humor a maior parte do tempo? (NÃO = 1)",
                "6. Tem medo que algo ruim lhe aconteça? (SIM = 1)",
                "7. Sente-se feliz a maior parte do tempo? (NÃO = 1)",
                "8. Sente-se desamparado com frequência? (SIM = 1)",
                "9. Prefere ficar em casa em vez de sair? (SIM = 1)",
                "10. Problemas de memória do que os outros? (SIM = 1)",
                "11. Acha maravilhoso estar vivo? (NÃO = 1)",
                "12. Sente-se inútil no momento? (SIM = 1)",
                "13. Sente-se cheio de energia? (NÃO = 1)",
                "14. Acha sua situação sem esperança? (SIM = 1)",
                "15. Acha que os outros estão melhor que você? (SIM = 1)"
              ].map((q, i) => (
                <button 
                  key={i} 
                  onClick={() => {
                    const n = [...gdsAnswers];
                    n[i] = !n[i];
                    setGdsAnswers(n);
                  }}
                  className={`w-full p-4 rounded-xl border-2 text-left flex justify-between items-center transition-all ${gdsAnswers[i] ? 'bg-rose-50 border-rose-600 text-rose-900' : 'bg-slate-50 border-slate-100 text-slate-400'}`}
                >
                  <span className="text-sm font-bold">{q}</span>
                  <span className="font-black text-xs">{gdsAnswers[i] ? 'PONTUAR' : 'NÃO'}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CognitionMoodTool;