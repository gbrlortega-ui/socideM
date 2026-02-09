
import React, { useState, useEffect, useMemo } from 'react';

interface Props {
  onBack: () => void;
  initialTab?: 'fried' | 'cfs' | 'ivcf20';
}

const FrailtyTool: React.FC<Props> = ({ onBack, initialTab = 'fried' }) => {
  const [activeTab, setActiveTab] = useState<'fried' | 'cfs' | 'ivcf20'>(initialTab as any);
  
  useEffect(() => {
    if (initialTab) setActiveTab(initialTab as any);
  }, [initialTab]);
  
  // Fried State
  const [fried, setFried] = useState<boolean[]>(new Array(5).fill(false));
  const friedScore = fried.filter(a => a === true).length;
  
  // CFS State
  const [cfs, setCfs] = useState<number>(1);

  // IVCF-20 State
  const [ivcfAnswers, setIvcfAnswers] = useState<Record<string, any>>({
    q1: 0, q2: 0, q3: false, q4: false, q5: false, q6: false,
    q7: false, q8: false, q9: false, q10: false, q11: false,
    q12: false, q13: false, q14a: false, q14b: false, q14c: false, q14d: false,
    q15: false, q16: false, q17: false, q18: false, q19: false,
    q20a: false, q20b: false, q20c: false
  });

  const ivcfScore = useMemo(() => {
    let total = 0;
    total += parseInt(ivcfAnswers.q1 || 0);
    total += parseInt(ivcfAnswers.q2 || 0);
    if (ivcfAnswers.q3 || ivcfAnswers.q4 || ivcfAnswers.q5) total += 4;
    if (ivcfAnswers.q6) total += 6;
    if (ivcfAnswers.q7) total += 1;
    if (ivcfAnswers.q8) total += 1;
    if (ivcfAnswers.q9) total += 2;
    if (ivcfAnswers.q10) total += 2;
    if (ivcfAnswers.q11) total += 2;
    if (ivcfAnswers.q12) total += 1;
    if (ivcfAnswers.q13) total += 1;
    if (ivcfAnswers.q14a || ivcfAnswers.q14b || ivcfAnswers.q14c || ivcfAnswers.q14d) total += 2;
    if (ivcfAnswers.q15) total += 2;
    if (ivcfAnswers.q16) total += 2;
    if (ivcfAnswers.q17) total += 2;
    if (ivcfAnswers.q18) total += 2;
    if (ivcfAnswers.q19) total += 2;
    if (ivcfAnswers.q20a || ivcfAnswers.q20b || ivcfAnswers.q20c) total += 4;
    return total;
  }, [ivcfAnswers]);

  const ivcfClass = useMemo(() => {
    if (ivcfScore >= 15) return { label: 'Alta Vulnerabilidade (Frágil)', color: 'bg-rose-600' };
    if (ivcfScore >= 7) return { label: 'Moderada Vulnerabilidade (Pré-frágil)', color: 'bg-amber-500' };
    return { label: 'Baixa Vulnerabilidade (Robusto)', color: 'bg-emerald-600' };
  }, [ivcfScore]);

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

  const SectionTitle = ({ children, icon }: { children: React.ReactNode, icon: string }) => (
    <div className="flex items-center gap-2 border-b-2 border-slate-100 pb-2 mb-4 mt-8 first:mt-0">
      <span className="material-symbols-outlined text-purple-600 text-xl">{icon}</span>
      <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">{children}</h4>
    </div>
  );

  const QuestionRow = ({ id, text, points }: { id: string, text: string, points?: number }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 gap-4 mb-3">
      <div className="flex-1">
        <span className="text-sm font-bold text-slate-800">{text}</span>
        {points !== undefined && <span className="ml-2 text-[10px] text-slate-400 font-bold">({points} pts)</span>}
      </div>
      <div className="flex gap-2">
        <button 
          onClick={() => setIvcfAnswers(p => ({...p, [id]: true}))}
          className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all border-2 ${ivcfAnswers[id] === true ? 'bg-purple-600 border-purple-600 text-white shadow-md' : 'bg-white border-slate-100 text-slate-400'}`}
        >Sim</button>
        <button 
          onClick={() => setIvcfAnswers(p => ({...p, [id]: false}))}
          className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all border-2 ${ivcfAnswers[id] === false ? 'bg-slate-200 border-slate-200 text-slate-600 shadow-md' : 'bg-white border-slate-100 text-slate-400'}`}
        >Não</button>
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
          <span className="px-3 py-1 rounded-full bg-purple-800 text-white text-[9px] font-black uppercase tracking-[0.2em]">AGA • FRAGILIDADE</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1 uppercase">
            {activeTab === 'fried' ? 'Fenótipo de Fried' : activeTab === 'cfs' ? 'Clinical Frailty Scale' : 'IVCF-20 Oficial'}
          </h2>
        </div>
      </header>

      <div className="flex gap-2 no-print overflow-x-auto pb-2 custom-scrollbar">
        {[
          { id: 'ivcf20', label: 'IVCF-20 (Brasil)' },
          { id: 'fried', label: 'Fried' },
          { id: 'cfs', label: 'CFS (Visual)' }
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
        
        {activeTab === 'ivcf20' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4 sticky top-0 bg-white z-10 pt-2">
               <div>
                 <h3 className="text-xl font-black text-slate-900 uppercase">Índice Clínico-Funcional</h3>
                 <p className="text-xs font-bold text-slate-400 uppercase">Acompanhe a pontuação em tempo real</p>
               </div>
               <div className={`text-center px-10 py-4 rounded-[2rem] text-white shadow-xl transition-colors duration-500 ${ivcfClass.color}`}>
                  <p className="text-[10px] font-black uppercase opacity-60 mb-1">Escore Total</p>
                  <p className="text-4xl font-black">{ivcfScore}</p>
                  <p className="text-[8px] font-bold mt-1 uppercase">{ivcfClass.label}</p>
               </div>
            </div>

            <div className="max-h-[600px] overflow-y-auto pr-4 custom-scrollbar space-y-4">
              <SectionTitle icon="calendar_today">Idade</SectionTitle>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-sm font-bold text-slate-800 mb-4">1. Qual é a sua idade?</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[{v:0,l:"60-74a (0)"},{v:1,l:"75-84a (1)"},{v:3,l:"≥85a (3)"}].map(o => (
                    <button key={o.v} onClick={() => setIvcfAnswers(p=>({...p,q1:o.v}))} className={`p-3 rounded-xl text-[10px] font-black uppercase border-2 ${ivcfAnswers.q1 === o.v ? 'bg-purple-600 border-purple-600 text-white' : 'bg-white border-slate-100'}`}>{o.l}</button>
                  ))}
                </div>
              </div>

              <SectionTitle icon="visibility">Percepção da Saúde</SectionTitle>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-sm font-bold text-slate-800 mb-4">2. Como avalia sua saúde comparada aos outros?</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[{v:0,l:"Excelente/Boa (0)"},{v:1,l:"Regular/Ruim (1)"}].map(o => (
                    <button key={o.v} onClick={() => setIvcfAnswers(p=>({...p,q2:o.v}))} className={`p-3 rounded-xl text-[10px] font-black uppercase border-2 ${ivcfAnswers.q2 === o.v ? 'bg-purple-600 border-purple-600 text-white' : 'bg-white border-slate-100'}`}>{o.l}</button>
                  ))}
                </div>
              </div>

              <SectionTitle icon="shopping_cart">AVD Instrumental (AIVD)</SectionTitle>
              <QuestionRow id="q3" text="3. Deixou de fazer compras por causa da saúde?" />
              <QuestionRow id="q4" text="4. Deixou de controlar dinheiro ou pagar contas?" />
              <QuestionRow id="q5" text="5. Deixou de realizar pequenos trabalhos domésticos?" />

              <SectionTitle icon="bathtub">AVD Básica (ABVD)</SectionTitle>
              <QuestionRow id="q6" text="6. Deixou de tomar banho sozinho por causa da saúde?" points={6} />

              <SectionTitle icon="psychology">Cognição</SectionTitle>
              <QuestionRow id="q7" text="7. Algum familiar falou que está ficando esquecido?" points={1} />
              <QuestionRow id="q8" text="8. Este esquecimento está piorando nos últimos meses?" points={1} />
              <QuestionRow id="q9" text="9. Impede a realização de alguma atividade diária?" points={2} />

              <SectionTitle icon="sentiment_dissatisfied">Humor</SectionTitle>
              <QuestionRow id="q10" text="10. Ficou com desânimo ou tristeza no último mês?" points={2} />
              <QuestionRow id="q11" text="11. Perdeu o interesse ou prazer nas atividades?" points={2} />

              <SectionTitle icon="blind">Mobilidade</SectionTitle>
              <QuestionRow id="q12" text="12. Incapaz de elevar braços acima dos ombros?" points={1} />
              <QuestionRow id="q13" text="13. Incapaz de manusear pequenos objetos?" points={1} />
              
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-sm font-bold text-slate-800 mb-4">14. Apresenta perda de peso, IMC baixo ou marcha lenta?</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {['q14a','q14b','q14c','q14d'].map((q,i) => (
                    <button key={q} onClick={() => setIvcfAnswers(p=>({...p,[q]:!p[q]}))} className={`p-2 rounded-lg border text-[9px] font-black uppercase ${ivcfAnswers[q] ? 'bg-purple-100 border-purple-600 text-purple-900' : 'bg-white border-slate-100 text-slate-400'}`}>
                      Critério {i+1}
                    </button>
                  ))}
                </div>
              </div>

              <QuestionRow id="q15" text="15. Dificuldade para caminhar que impede atividades?" points={2} />
              <QuestionRow id="q16" text="16. Teve duas ou mais quedas no último ano?" points={2} />
              <QuestionRow id="q17" text="17. Perde urina ou fezes sem querer?" points={2} />

              <SectionTitle icon="hearing">Comunicação</SectionTitle>
              <QuestionRow id="q18" text="18. Problemas de visão que impedem atividades?" points={2} />
              <QuestionRow id="q19" text="19. Problemas de audição que impedem atividades?" points={2} />

              <SectionTitle icon="medical_services">Comorbidades</SectionTitle>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
                <p className="text-sm font-bold text-slate-800 mb-4">20. Possui ≥ 5 doenças, usa ≥ 5 meds ou internou recentemente?</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {['q20a','q20b','q20c'].map((q,i) => (
                    <button key={q} onClick={() => setIvcfAnswers(p=>({...p,[q]:!p[q]}))} className={`p-2 rounded-lg border text-[9px] font-black uppercase ${ivcfAnswers[q] ? 'bg-purple-100 border-purple-600 text-purple-900' : 'bg-white border-slate-100 text-slate-400'}`}>
                      Fator {i+1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fried' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
               <div>
                 <h3 className="text-xl font-black text-slate-900 uppercase">Fried Score</h3>
                 <p className="text-xs font-bold text-slate-400">Cinco componentes físicos de fragilidade.</p>
               </div>
               <div className={`text-center px-10 py-4 rounded-[2rem] text-white shadow-xl ${friedScore >= 3 ? 'bg-rose-600' : friedScore >= 1 ? 'bg-amber-500' : 'bg-emerald-600'}`}>
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
                   <p className="text-2xl font-black">Nível {cfs}</p>
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
