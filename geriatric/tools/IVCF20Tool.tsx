import React, { useState, useEffect, useMemo } from 'react';

interface Props {
  onBack: () => void;
}

const IVCF20Tool: React.FC<Props> = ({ onBack }) => {
  const [answers, setAnswers] = useState<Record<string, any>>({
    q1: 0, q2: 0, q3: false, q4: false, q5: false, q6: false,
    q7: false, q8: false, q9: false, q10: false, q11: false,
    q12: false, q13: false, q14a: false, q14b: false, q14c: false, q14d: false,
    q15: false, q16: false, q17: false, q18: false, q19: false,
    q20a: false, q20b: false, q20c: false
  });

  const score = useMemo(() => {
    let total = 0;
    total += parseInt(answers.q1 || 0);
    total += parseInt(answers.q2 || 0);
    if (answers.q3 || answers.q4 || answers.q5) total += 4;
    if (answers.q6) total += 6;
    if (answers.q7) total += 1;
    if (answers.q8) total += 1;
    if (answers.q9) total += 2;
    if (answers.q10) total += 2;
    if (answers.q11) total += 2;
    if (answers.q12) total += 1;
    if (answers.q13) total += 1;
    if (answers.q14a || answers.q14b || answers.q14c || answers.q14d) total += 2;
    if (answers.q15) total += 2;
    if (answers.q16) total += 2;
    if (answers.q17) total += 2;
    if (answers.q18) total += 2;
    if (answers.q19) total += 2;
    if (answers.q20a || answers.q20b || answers.q20c) total += 4;
    return total;
  }, [answers]);

  const classification = useMemo(() => {
    if (score >= 15) return { label: 'ALTA VULNERABILIDADE (FRÁGIL)', color: 'bg-rose-600', text: 'Indica necessidade de avaliação geriátrica ampla e plano de cuidado intensivo.' };
    if (score >= 7) return { label: 'MODERADA VULNERABILIDADE (PRÉ-FRÁGIL)', color: 'bg-amber-500', text: 'Indica necessidade de intervenções preventivas para evitar o declínio funcional.' };
    return { label: 'BAIXA VULNERABILIDADE (ROBUSTO)', color: 'bg-emerald-600', text: 'Indica preservação da autonomia e independência; manter promoção de saúde.' };
  }, [score]);

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
          onClick={() => setAnswers(p => ({...p, [id]: true}))}
          className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all border-2 ${answers[id] === true ? 'bg-purple-600 border-purple-600 text-white shadow-md' : 'bg-white border-slate-100 text-slate-400'}`}
        >Sim</button>
        <button 
          onClick={() => setAnswers(p => ({...p, [id]: false}))}
          className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all border-2 ${answers[id] === false ? 'bg-slate-200 border-slate-200 text-slate-600 shadow-md' : 'bg-white border-slate-100 text-slate-400'}`}
        >Não</button>
      </div>
    </div>
  );

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10 bg-light-glow min-h-full">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-purple-600 shadow-sm transition-all">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <span className="px-3 py-1 rounded-full bg-purple-800 text-white text-[9px] font-black uppercase tracking-[0.2em]">AGA • INSTRUMENTO MULTIDIMENSIONAL</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1 uppercase">IVCF-20 Oficial</h2>
        </div>
      </header>

      <div className="bg-white border-2 border-slate-200 p-8 rounded-[3rem] shadow-strong space-y-8 animate-fade-in relative overflow-hidden">
        
        <div className="flex justify-between items-center border-b pb-6 sticky top-0 bg-white z-10 pt-2">
           <div>
             <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Vulnerabilidade Clínico-Funcional</h3>
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Questionário de 20 perguntas do Brasil</p>
           </div>
           <div className={`text-center px-10 py-4 rounded-[2rem] text-white shadow-xl transition-colors duration-500 ${classification.color}`}>
              <p className="text-[10px] font-black uppercase opacity-60 mb-1">Escore Total</p>
              <p className="text-4xl font-black">{score}</p>
              <p className="text-[8px] font-bold mt-1 uppercase">{classification.label}</p>
           </div>
        </div>

        <div className="space-y-6">
          <SectionTitle icon="calendar_today">Idade</SectionTitle>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-sm font-bold text-slate-800 mb-4">1. Qual é a sua idade?</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[{v:0,l:"60-74 anos (0)"},{v:1,l:"75-84 anos (1)"},{v:3,l:"≥ 85 anos (3)"}].map(o => (
                <button key={o.v} onClick={() => setAnswers(p=>({...p,q1:o.v}))} className={`p-3 rounded-xl text-[10px] font-black uppercase border-2 transition-all ${answers.q1 === o.v ? 'bg-purple-600 border-purple-600 text-white' : 'bg-white border-slate-100 text-slate-400'}`}>{o.l}</button>
              ))}
            </div>
          </div>

          <SectionTitle icon="visibility">Percepção da Saúde</SectionTitle>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-sm font-bold text-slate-800 mb-4">2. Como avalia sua saúde comparada aos outros da sua idade?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[{v:0,l:"Excelente/Boa/Muito Boa (0)"},{v:1,l:"Regular/Ruim (1)"}].map(o => (
                <button key={o.v} onClick={() => setAnswers(p=>({...p,q2:o.v}))} className={`p-3 rounded-xl text-[10px] font-black uppercase border-2 transition-all ${answers.q2 === o.v ? 'bg-purple-600 border-purple-600 text-white' : 'bg-white border-slate-100 text-slate-400'}`}>{o.l}</button>
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

          <SectionTitle icon="blind">Mobilidade: Alcance e Pinça</SectionTitle>
          <QuestionRow id="q12" text="12. Incapaz de elevar braços acima dos ombros?" points={1} />
          <QuestionRow id="q13" text="13. Incapaz de manusear pequenos objetos?" points={1} />
          
          <SectionTitle icon="fitness_center">Capacidade Aeróbica</SectionTitle>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-sm font-bold text-slate-800 mb-4">14. Apresenta perda de peso, IMC baixo ou marcha lenta?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                {id:'q14a', label:'Perda peso involuntária'},
                {id:'q14b', label:'IMC < 22 kg/m²'},
                {id:'q14c', label:'Panturrilha < 31cm'},
                {id:'q14d', label:'Vel. Marcha > 5s'}
              ].map((q,i) => (
                <button key={q.id} onClick={() => setAnswers(p=>({...p,[q.id]:!p[q.id]}))} className={`p-3 rounded-lg border text-[9px] font-black uppercase transition-all ${answers[q.id] ? 'bg-purple-100 border-purple-600 text-purple-900' : 'bg-white border-slate-100 text-slate-400'}`}>
                  {q.label}
                </button>
              ))}
            </div>
            <p className="text-[9px] text-slate-400 mt-3 italic">Basta um critério positivo para pontuar +2.</p>
          </div>

          <SectionTitle icon="directions_walk">Marcha e Quedas</SectionTitle>
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
              {[
                {id:'q20a', label:'≥ 5 Doenças'},
                {id:'q20b', label:'≥ 5 Remédios'},
                {id:'q20c', label:'Internação 6m'}
              ].map((q,i) => (
                <button key={q.id} onClick={() => setAnswers(p=>({...p,[q.id]:!p[q.id]}))} className={`p-3 rounded-lg border text-[9px] font-black uppercase transition-all ${answers[q.id] ? 'bg-purple-100 border-purple-600 text-purple-900' : 'bg-white border-slate-100 text-slate-400'}`}>
                  {q.label}
                </button>
              ))}
            </div>
            <p className="text-[9px] text-slate-400 mt-3 italic">Basta um critério positivo para pontuar +4.</p>
          </div>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white animate-zoom-in">
           <div className="flex items-center gap-6">
              <div className="size-16 rounded-2xl bg-white/10 flex items-center justify-center">
                 <span className="material-symbols-outlined text-4xl text-purple-400">info</span>
              </div>
              <div className="flex-1">
                 <h4 className="text-lg font-black uppercase tracking-tight">Resultado Final</h4>
                 <p className="text-sm text-slate-300 font-medium leading-relaxed">{classification.text}</p>
              </div>
              <button 
                onClick={() => window.print()}
                className="px-6 py-3 bg-white text-slate-900 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined">print</span> Imprimir
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default IVCF20Tool;