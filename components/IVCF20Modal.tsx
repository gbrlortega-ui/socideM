import React, { useState, useEffect } from 'react';

interface IVCF20ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCalculate: (score: number, resultText: string, level: 'LOW' | 'MODERATE' | 'HIGH') => void;
}

const IVCF20Modal: React.FC<IVCF20ModalProps> = ({ isOpen, onClose, onCalculate }) => {
  const [answers, setAnswers] = useState<Record<string, any>>({
    q1: 0, // idade
    q2: 0, // percepção
    q3: false, q4: false, q5: false, // avd instrumental
    q6: false, // avd básica
    q7: false, q8: false, q9: false, // cognição
    q10: false, q11: false, // humor
    q12: false, q13: false, // alcance/pinça
    q14a: false, q14b: false, q14c: false, q14d: false, // cap aeróbica
    q15: false, q16: false, // marcha
    q17: false, // continência
    q18: false, // visão
    q19: false, // audição
    q20a: false, q20b: false, q20c: false // comorbidade
  });

  const [score, setScore] = useState(0);

  useEffect(() => {
    let total = 0;

    // 1. Idade
    total += parseInt(answers.q1 || 0);

    // 2. Percepção
    total += parseInt(answers.q2 || 0);

    // 3, 4, 5. AVD Instrumental (Max 4 pontos)
    if (answers.q3 || answers.q4 || answers.q5) {
      total += 4;
    }

    // 6. AVD Básica (6 pontos)
    if (answers.q6) total += 6;

    // 7, 8, 9. Cognição (1 + 1 + 2)
    if (answers.q7) total += 1;
    if (answers.q8) total += 1;
    if (answers.q9) total += 2;

    // 10, 11. Humor (2 + 2)
    if (answers.q10) total += 2;
    if (answers.q11) total += 2;

    // 12, 13. Alcance/Pinça (1 + 1)
    if (answers.q12) total += 1;
    if (answers.q13) total += 1;

    // 14. Cap Aeróbica (Max 2 pontos)
    if (answers.q14a || answers.q14b || answers.q14c || answers.q14d) {
      total += 2;
    }

    // 15, 16. Marcha (2 + 2)
    if (answers.q15) total += 2;
    if (answers.q16) total += 2;

    // 17. Continência (2)
    if (answers.q17) total += 2;

    // 18. Visão (2)
    if (answers.q18) total += 2;

    // 19. Audição (2)
    if (answers.q19) total += 2;

    // 20. Comorbidade (Max 4 pontos)
    if (answers.q20a || answers.q20b || answers.q20c) {
      total += 4;
    }

    setScore(total);
  }, [answers]);

  if (!isOpen) return null;

  const setAnswer = (id: string, value: any) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleFinish = () => {
    let level: 'LOW' | 'MODERATE' | 'HIGH' = 'LOW';
    let text = "Baixa vulnerabilidade clínico funcional";
    
    if (score >= 15) { 
      level = 'HIGH'; 
      text = "Alta vulnerabilidade clínico funcional"; 
    } else if (score >= 7) { 
      level = 'MODERATE'; 
      text = "Moderada vulnerabilidade clínico funcional"; 
    }
    
    onCalculate(score, text, level);
    onClose();
  };

  const reset = () => {
    setAnswers({
      q1: 0, q2: 0, q3: false, q4: false, q5: false, q6: false,
      q7: false, q8: false, q9: false, q10: false, q11: false,
      q12: false, q13: false, q14a: false, q14b: false, q14c: false, q14d: false,
      q15: false, q16: false, q17: false, q18: false, q19: false,
      q20a: false, q20b: false, q20c: false
    });
  };

  // Fix: Changed children type to React.ReactNode to avoid JSX children mismatch
  const SectionTitle = ({ children, icon }: { children: React.ReactNode, icon: string }) => (
    <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2 mb-4 mt-8 first:mt-0">
      <span className="material-symbols-outlined text-purple-600 text-xl">{icon}</span>
      <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">{children}</h4>
    </div>
  );

  const QuestionRow = ({ id, text, points }: { id: string, text: string, points?: number }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 gap-4 mb-3">
      <div className="flex-1">
        <span className="text-sm font-bold text-slate-800">{text}</span>
        {points !== undefined && <span className="ml-2 text-[10px] text-slate-400 font-bold">({points} pts)</span>}
      </div>
      <div className="flex gap-2">
        <button 
          onClick={() => setAnswer(id, true)}
          className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all border-2 ${
            answers[id] === true 
              ? 'bg-red-50 border-red-500 text-red-700 shadow-md' 
              : 'bg-white border-slate-100 text-slate-400 hover:border-red-200'
          }`}
        >
          Sim
        </button>
        <button 
          onClick={() => setAnswer(id, false)}
          className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all border-2 ${
            answers[id] === false 
              ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-md' 
              : 'bg-white border-slate-100 text-slate-400 hover:border-emerald-200'
          }`}
        >
          Não
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white w-full max-w-4xl h-full sm:h-auto sm:max-h-[90vh] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-zoom-in">
        
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-purple-600 shrink-0">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-white rounded-xl flex items-center justify-center text-purple-600 shadow-sm">
              <span className="material-symbols-outlined font-black">elderly</span>
            </div>
            <div>
              <h3 className="text-lg font-black text-white">IVCF-20 Oficial</h3>
              <p className="text-[10px] text-purple-100 font-bold uppercase tracking-widest">Índice de Vulnerabilidade Clínico-Funcional</p>
            </div>
          </div>
          <button onClick={onClose} className="material-symbols-outlined text-white/70 hover:text-white transition-colors">close</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
          
          <SectionTitle icon="calendar_today">Idade</SectionTitle>
          <div className="p-4 bg-white rounded-2xl border border-slate-200">
            <p className="text-sm font-bold text-slate-800 mb-4">1. Qual é a sua idade?</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { val: 0, label: "60 a 74 anos (0)" },
                { val: 1, label: "75 a 84 anos (1)" },
                { val: 3, label: "&ge; 85 anos (3)" }
              ].map(opt => (
                <button 
                  key={opt.val} 
                  onClick={() => setAnswer('q1', opt.val)}
                  className={`p-3 rounded-xl text-[10px] font-black uppercase border-2 transition-all ${
                    answers.q1 === opt.val ? 'bg-purple-600 border-purple-600 text-white' : 'bg-slate-50 border-slate-100 text-slate-400'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <SectionTitle icon="visibility">Percepção da Saúde</SectionTitle>
          <div className="p-4 bg-white rounded-2xl border border-slate-200">
            <p className="text-sm font-bold text-slate-800 mb-4">2. Em geral, comparando com outras pessoas de sua idade, você diria que sua saúde é:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { val: 0, label: "Excelente, muito boa ou boa (0)" },
                { val: 1, label: "Regular ou ruim (1)" }
              ].map(opt => (
                <button 
                  key={opt.val} 
                  onClick={() => setAnswer('q2', opt.val)}
                  className={`p-3 rounded-xl text-[10px] font-black uppercase border-2 transition-all ${
                    answers.q2 === opt.val ? 'bg-purple-600 border-purple-600 text-white' : 'bg-slate-50 border-slate-100 text-slate-400'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <SectionTitle icon="shopping_cart">AVD Instrumental (Máx 4 pts)</SectionTitle>
          <QuestionRow id="q3" text="3. Por causa de sua saúde ou condição física, você deixou de fazer compras?" />
          <QuestionRow id="q4" text="4. Por causa de sua saúde ou condição física, você deixou de controlar seu dinheiro, gasto ou pagar as contas de sua casa?" />
          <QuestionRow id="q5" text="5. Por causa de sua saúde ou condição física, você deixou de realizar pequenos trabalhos domésticos (lavar louça, arrumar casa)?" />

          <SectionTitle icon="bathtub">AVD Básica</SectionTitle>
          <QuestionRow id="q6" text="6. Por causa de sua saúde ou condição física, você deixou de tomar banho sozinho?" points={6} />

          <SectionTitle icon="psychology">Cognição</SectionTitle>
          <QuestionRow id="q7" text="7. Algum familiar ou amigo falou que você está ficando esquecido?" points={1} />
          <QuestionRow id="q8" text="8. Este esquecimento está piorando nos últimos meses?" points={1} />
          <QuestionRow id="q9" text="9. Este esquecimento está impedindo a realização de alguma atividade do cotidiano?" points={2} />

          <SectionTitle icon="sentiment_very_dissatisfied">Humor</SectionTitle>
          <QuestionRow id="q10" text="10. No último mês, você ficou com desânimo, tristeza ou desesperança?" points={2} />
          <QuestionRow id="q11" text="11. No último mês, você perdeu o interesse ou prazer em atividades anteriormente prazerosas?" points={2} />

          <SectionTitle icon="blind">Mobilidade: Alcance e Pinça</SectionTitle>
          <QuestionRow id="q12" text="12. Você é incapaz de elevar os braços acima do nível do ombro?" points={1} />
          <QuestionRow id="q13" text="13. Você é incapaz de manusear ou segurar pequenos objetos?" points={1} />

          <SectionTitle icon="fitness_center">Mobilidade: Capacidade Aeróbica (Máx 2 pts)</SectionTitle>
          <div className="p-4 bg-white rounded-2xl border border-slate-200 mb-3">
            <p className="text-sm font-bold text-slate-800 mb-4">14. Você tem alguma das condições abaixo relacionadas?</p>
            <div className="space-y-2">
              {[
                { id: 'q14a', label: 'Perda de peso não intencional (4.5kg/ano ou 6kg/6m ou 3kg/mês)' },
                { id: 'q14b', label: 'Índice de Massa Corporal (IMC) &lt; 22kg/m²' },
                { id: 'q14c', label: 'Circunferência da panturrilha &lt; 31cm' },
                { id: 'q14d', label: 'Velocidade da marcha (4m) &gt; 5 segundos' }
              ].map(opt => (
                <button 
                  key={opt.id} 
                  onClick={() => setAnswer(opt.id, !answers[opt.id])}
                  className={`w-full p-3 rounded-xl text-[10px] font-black uppercase border-2 transition-all text-left flex justify-between items-center ${
                    answers[opt.id] ? 'bg-purple-100 border-purple-600 text-purple-900' : 'bg-slate-50 border-slate-100 text-slate-400'
                  }`}
                >
                  {opt.label}
                  {answers[opt.id] && <span className="material-symbols-outlined text-sm">check</span>}
                </button>
              ))}
            </div>
          </div>

          <SectionTitle icon="directions_walk">Mobilidade: Marcha</SectionTitle>
          <QuestionRow id="q15" text="15. Tem dificuldade para caminhar capaz de impedir atividade do cotidiano?" points={2} />
          <QuestionRow id="q16" text="16. Teve duas ou mais quedas no último ano?" points={2} />

          <SectionTitle icon="wc">Continência Esfincteriana</SectionTitle>
          <QuestionRow id="q17" text="17. Você perde urina ou fezes, sem querer, em algum momento?" points={2} />

          <SectionTitle icon="hearing">Comunicação</SectionTitle>
          <QuestionRow id="q18" text="18. Problemas de visão que impedem atividades?" points={2} />
          <QuestionRow id="q19" text="19. Problemas de audição que impedem atividades?" points={2} />

          <SectionTitle icon="medical_services">Comorbidade Múltipla (Máx 4 pts)</SectionTitle>
          <div className="p-4 bg-white rounded-2xl border border-slate-200 mb-8">
            <p className="text-sm font-bold text-slate-800 mb-4">20. Você tem alguma das três condições abaixo?</p>
            <div className="space-y-2">
              {[
                { id: 'q20a', label: 'Cinco ou mais doenças crônicas' },
                { id: 'q20b', label: 'Uso regular de cinco ou mais medicamentos diferentes por dia (&gt; 5 medicamentos)' },
                { id: 'q20c', label: 'Internação recente (últimos seis meses)' }
              ].map(opt => (
                <button 
                  key={opt.id} 
                  onClick={() => setAnswer(opt.id, !answers[opt.id])}
                  className={`w-full p-3 rounded-xl text-[10px] font-black uppercase border-2 transition-all text-left flex justify-between items-center ${
                    answers[opt.id] ? 'bg-purple-100 border-purple-600 text-purple-900' : 'bg-slate-50 border-slate-100 text-slate-400'
                  }`}
                >
                  {opt.label}
                  {answers[opt.id] && <span className="material-symbols-outlined text-sm">check</span>}
                </button>
              ))}
            </div>
          </div>

        </div>

        <div className="p-6 border-t border-slate-100 bg-white shrink-0 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1 flex items-center gap-6">
            <div className="text-center bg-slate-900 px-6 py-3 rounded-2xl min-w-[120px] shadow-lg">
              <p className="text-[8px] font-black uppercase text-slate-400">Pontuação</p>
              <p className="text-3xl font-black text-white leading-none mt-1">{score}</p>
            </div>
            <div className={`flex-1 p-4 rounded-2xl border-2 ${
               score >= 15 ? 'text-red-700 bg-red-50 border-red-200' : 
               score >= 7 ? 'text-amber-700 bg-amber-50 border-amber-200' : 
               'text-emerald-700 bg-emerald-50 border-emerald-200'
            }`}>
              <p className="text-[9px] font-black uppercase opacity-60">Vulnerabilidade Clínico Funcional</p>
              <p className="text-sm font-black uppercase tracking-tight">
                {score >= 15 ? 'ALTA VULNERABILIDADE' : score >= 7 ? 'MODERADA VULNERABILIDADE' : 'BAIXA VULNERABILIDADE'}
              </p>
            </div>
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <button onClick={reset} className="px-6 py-3 text-slate-400 font-bold text-xs uppercase hover:text-slate-600">Limpar</button>
            <button 
              onClick={handleFinish} 
              className="flex-1 sm:flex-none px-10 py-4 bg-purple-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-purple-600/20 hover:scale-105 active:scale-95 transition-all"
            >
              Lançar Resultado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IVCF20Modal;