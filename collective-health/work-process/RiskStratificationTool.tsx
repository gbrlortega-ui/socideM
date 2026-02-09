
import React, { useState } from 'react';

const RiskStratificationTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const quizData = [
    {
      question: "Um usuário de 55 anos, fumante, com PA 150/95 mmHg e sem lesão de órgão-alvo, é classificado em qual estrato de risco cardiovascular segundo as diretrizes brasileiras?",
      options: [
        "Risco Baixo",
        "Risco Moderado",
        "Risco Alto",
        "Risco Muito Alto"
      ],
      correct: 1,
      rationale: "Pacientes com Hipertensão Estágio 1 ou 2 com 1-2 fatores de risco adicionais (como tabagismo) são classificados como Risco Moderado."
    },
    {
      question: "Qual o principal objetivo da estratificação de risco na gestão da APS?",
      options: [
        "Reduzir o número de exames solicitados na unidade.",
        "Identificar quem deve ser atendido primeiro no pronto-socorro.",
        "Garantir a equidade, definindo a frequência e a intensidade do cuidado para cada usuário.",
        "Excluir pacientes de baixo risco do acompanhamento da equipe."
      ],
      correct: 2,
      rationale: "A estratificação permite que a equipe priorize recursos e tempo para os pacientes de maior risco (equidade)."
    },
    {
      question: "No manejo do Diabetes Mellitus (DM), a estratificação de risco deve considerar obrigatoriamente:",
      options: [
        "Apenas o valor da glicemia de jejum atual.",
        "Presença de complicações micro e macrovasculares, idade e tempo de diagnóstico.",
        "O número de filhos que o paciente possui.",
        "A distância da casa do paciente até a farmácia popular."
      ],
      correct: 1,
      rationale: "O risco no DM é multidimensional e depende de lesões em órgãos-alvo (rim, retina, coração)."
    },
    {
      question: "Usuário com HAS e diagnóstico prévio de Infarto Agudo do Miocárdio (IAM) é automaticamente estratificado como:",
      options: [
        "Risco Moderado.",
        "Risco Alto / Muito Alto (Prevenção Secundária).",
        "Risco Baixo, se a PA estiver controlada.",
        "Sem risco cardiovascular relevante."
      ],
      correct: 1,
      rationale: "Presença de doença cardiovascular estabelecida coloca o paciente no maior estrato de risco."
    }
  ];

  const handleAnswer = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === quizData[currentQuestion].correct) setScore(score + 1);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-full bg-slate-50 flex flex-col font-sans no-print-bg">
      <header className="bg-gradient-to-br from-orange-800 to-orange-600 text-white py-24 px-6 relative overflow-hidden shadow-2xl">
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <button onClick={onBack} className="absolute top-0 left-0 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all flex items-center gap-2 text-xs font-bold no-print">
            <span className="material-symbols-outlined text-sm">arrow_back</span> VOLTAR
          </button>
          <span className="inline-block bg-orange-400/20 text-orange-50 px-4 py-1.5 rounded-full text-[10px] font-black mb-6 tracking-widest uppercase border border-orange-400/30">
            Inteligência Clínica e Gestão
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">
            Estratificação <br className="hidden md:block" /> de Risco
          </h1>
          <p className="text-xl md:text-2xl opacity-90 font-light max-w-3xl mx-auto">
            Organize sua demanda e garanta a equidade através da classificação sistemática de riscos clínicos e sociais.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-20 flex-1 w-full">
        <section className="grid md:grid-cols-2 gap-12 mb-32">
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900 uppercase">O Conceito</h2>
            <p className="text-lg text-slate-600 font-medium leading-relaxed">
              Estratificar o risco é o processo de agrupar usuários conforme sua <strong>probabilidade</strong> de apresentar eventos adversos. Na APS, focamos principalmente em Doenças Crônicas Não Transmissíveis (DCNT).
            </p>
            <div className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 shadow-soft">
              <h4 className="font-black text-orange-600 uppercase text-xs mb-4">Critérios de Corte (HAS)</h4>
              <ul className="space-y-3 text-sm font-bold text-slate-500">
                <li className="flex gap-2"><span className="text-orange-500">•</span> Risco Baixo: Estágio 1 s/ fatores</li>
                <li className="flex gap-2"><span className="text-orange-500">•</span> Risco Médio: Estágio 1 ou 2 c/ 1-2 fatores</li>
                <li className="flex gap-2"><span className="text-orange-500">•</span> Risco Alto: Estágio 3 ou Presença de LOA</li>
              </ul>
            </div>
          </div>
          <div className="bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl flex flex-col justify-center">
             <div className="flex items-center gap-4 mb-6">
                <span className="material-symbols-outlined text-orange-400 text-5xl">equalizer</span>
                <h3 className="text-2xl font-black uppercase">Frequência de Cuidado</h3>
             </div>
             <p className="text-slate-300 text-base leading-relaxed mb-8">
               A classificação dita o ritmo: pacientes de baixo risco podem ter consultas anuais, enquanto os de alto risco exigem monitoramento mensal ou quinzenal.
             </p>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
                   <p className="text-2xl font-black text-emerald-400">R0/R1</p>
                   <p className="text-[10px] font-bold uppercase opacity-60">Seguimento Anual</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
                   <p className="text-2xl font-black text-rose-400">R3</p>
                   <p className="text-[10px] font-bold uppercase opacity-60">Acompanhamento Estrito</p>
                </div>
             </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section id="quiz-container" className="bg-slate-950 text-white rounded-[4rem] p-8 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10">
            {!showResults ? (
              <div className="space-y-12">
                <div className="text-center">
                  <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Desafio Técnico</span>
                  <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight uppercase">Teste sua Competência</h2>
                </div>
                <div className="bg-white text-slate-900 rounded-[3rem] p-8 md:p-14 shadow-2xl">
                  <div className="mb-8">
                    <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Questão {currentQuestion + 1} de {quizData.length}</span>
                    <h3 className="text-2xl font-black mt-4">{quizData[currentQuestion].question}</h3>
                  </div>
                  <div className="grid gap-4">
                    {quizData[currentQuestion].options.map((opt, idx) => (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleAnswer(idx)}
                        className={`w-full text-left p-6 rounded-[2rem] font-bold transition-all border-2 ${
                          isAnswered 
                            ? idx === quizData[currentQuestion].correct ? "bg-emerald-50 border-emerald-500 text-emerald-900" : idx === selectedOption ? "bg-rose-50 border-rose-500 text-rose-900" : "opacity-40"
                            : "bg-slate-50 border-slate-200 hover:border-orange-500"
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}) {opt}
                      </button>
                    ))}
                  </div>
                  {isAnswered && (
                    <div className="mt-8 p-6 bg-slate-50 rounded-2xl border-l-4 border-orange-500">
                      <p className="text-sm font-bold text-slate-700">{quizData[currentQuestion].rationale}</p>
                      <button onClick={handleNext} className="mt-6 w-full py-4 bg-slate-900 text-white rounded-xl font-black text-xs uppercase">Próximo</button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-5xl font-black mb-10">Simulado Finalizado!</h2>
                <p className="text-2xl font-bold mb-8">Seu aproveitamento: {Math.round((score / quizData.length) * 100)}%</p>
                <button onClick={() => { setCurrentQuestion(0); setScore(0); setShowResults(false); setIsAnswered(false); }} className="bg-orange-500 px-10 py-4 rounded-full font-black text-xs uppercase">Refazer Teste</button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default RiskStratificationTool;
