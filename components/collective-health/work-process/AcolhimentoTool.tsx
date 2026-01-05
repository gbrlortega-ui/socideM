import React, { useState } from 'react';

const AcolhimentoTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const quizData = [
    {
      category: "Dilema de Acesso",
      question: "Um usuário chega às 11h30 (horário de fecho para o almoço) com uma queixa de 'dor no peito leve há 2 dias'. A receção diz para ele voltar às 14h. Qual a falha técnica?",
      options: [
        "Não houve falha, pois a unidade tem direito ao intervalo de almoço.",
        "Falha no acolhimento como postura ética: qualquer queixa (especialmente dor torácica) exige escuta e avaliação imediata de risco.",
        "O erro foi não ter dado uma senha para a tarde.",
        "A falha foi do Agente de Saúde que não visitou este usuário antes."
      ],
      correct: 1,
      rationale: "O acolhimento não tem hora certa. Queixas agudas ou potencialmente graves exigem avaliação imediata, independentemente do horário administrativo."
    },
    {
      category: "Equidade e Vulnerabilidade",
      question: "Ao acolher uma pessoa em situação de rua que não possui documentos nem comprovante de residência, a equipe deve:",
      options: [
        "Orientar que ela procure o serviço social do hospital central primeiro.",
        "Exigir que ela traga uma declaração de algum abrigo para abrir o prontuário.",
        "Garantir o acesso imediato e a escuta, reconhecendo a vulnerabilidade e os determinantes sociais, sem exigências burocráticas impeditivas.",
        "Atender apenas se houver uma urgência visível (sangramento ou fratura)."
      ],
      correct: 2,
      rationale: "A equidade na APS exige a remoção de barreiras burocráticas para populações em extrema exclusão. O direito à saúde precede a documentação."
    },
    {
      category: "Clínica Ampliada",
      question: "Uma usuária procura o acolhimento pela quarta vez no mês com queixa de 'dor de estômago'. Exames físicos são normais. A abordagem da Clínica Ampliada sugere:",
      options: [
        "Encaminhar imediatamente para um gastroenterologista de alta complexidade.",
        "Prescrever um protetor gástrico mais forte e dar alta.",
        "Investigar dimensões subjetivas e sociais (ex: luto, violência doméstica, desemprego) que possam estar a somatizar na queixa física.",
        "Dizer à paciente que ela não tem nada e está a ocupar a vaga de outros."
      ],
      correct: 2,
      rationale: "A clínica ampliada entende que o sofrimento psíquico e social muitas vezes se manifesta como queixa somática. O acolhimento deve captar essa subjetividade."
    },
    {
      category: "Gestão do Trabalho",
      question: "A coordenação decide que o 'acolhimento' será feito apenas pela equipe de enfermagem numa sala específica. Segundo a PNH, isso é:",
      options: [
        "Uma excelente forma de organizar o fluxo e otimizar o tempo do médico.",
        "Um erro, pois reduz o acolhimento a um local físico e desresponsabiliza o restante da equipe multiprofissional.",
        "O modelo padrão recomendado pelo Ministério da Saúde.",
        "Correto, desde que a sala tenha ar-condicionado e cadeiras confortáveis."
      ],
      correct: 1,
      rationale: "Acolhimento é uma diretriz de toda a unidade. Criar uma 'sala de acolhimento' muitas vezes acaba por burocratizar o que deveria ser uma postura de todos."
    },
    {
      category: "Responsabilização",
      question: "Após acolher um caso que necessita de consulta com cardiologista, a conduta de 'Referenciamento Responsável' implica em:",
      options: [
        "Entregar a guia de encaminhamento e dizer para o paciente 'dar um jeito' de agendar.",
        "Acompanhar o agendamento, garantir que o paciente saiba onde ir e manter o seguimento dele na APS enquanto aguarda.",
        "Retirar o paciente da lista da APS, pois agora ele é responsabilidade do especialista.",
        "Pedir para o paciente não voltar à unidade até ser visto pelo cardiologista."
      ],
      correct: 1,
      rationale: "A coordenação do cuidado exige que a APS mantenha o vínculo e a responsabilidade sobre o usuário, mesmo quando ele circula por outros níveis da rede."
    },
    {
      category: "Educação Permanente",
      question: "A equipe reclama que 'o acolhimento demora muito e atrasa as consultas agendadas'. Qual a melhor estratégia de Educação Permanente?",
      options: [
        "Suspender o acolhimento para priorizar os agendados.",
        "Contratar um funcionário apenas para dizer 'não' aos pacientes sem vaga.",
        "Reunir a equipe para refletir sobre o processo de trabalho, fluxos de demanda espontânea e a importância da escuta resolutiva.",
        "Ignorar as reclamações da equipe, pois o acolhimento é obrigatório."
      ],
      correct: 2,
      rationale: "A EPS serve para a equipe analisar os seus nós críticos e encontrar soluções coletivas para equilibrar oferta e demanda sem perder a humanização."
    }
  ];

  const handleAnswer = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === quizData[currentQuestion].correct) {
      setScore(score + 1);
    }
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
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-slate-900 to-blue-800 text-white py-24 px-6 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#smallGrid)" />
            </svg>
        </div>
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <button 
            onClick={onBack}
            className="absolute top-0 left-0 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all flex items-center gap-2 text-xs font-bold no-print"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span> VOLTAR
          </button>
          
          <span className="inline-block bg-blue-500/20 text-blue-100 px-4 py-1.5 rounded-full text-[10px] font-black mb-6 tracking-widest uppercase border border-blue-400/30">
            HumanizaSUS & PNH
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
            Acolhimento <br className="hidden md:block" /> <span className="text-blue-400 uppercase">Integral na APS</span>
          </h1>
          <p className="text-xl md:text-2xl opacity-80 font-light max-w-3xl mx-auto">
            A tecnologia leve que sustenta a coordenação do cuidado. Transforme o fluxo assistencial através da responsabilização e da clínica ampliada.
          </p>
        </div>
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none select-none">
            <span className="material-symbols-outlined text-[25rem]">hail</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-20 flex-1 w-full">
        
        {/* Pilares */}
        <section id="pilares" className="grid md:grid-cols-3 gap-8 mb-32 -mt-40 relative z-30">
            {[
              { icon: "route", title: "Porta de Entrada", desc: "A APS como ordenadora da rede. O acolhimento garante que o usuário não se perca nos labirintos do sistema.", color: "text-blue-600", bg: "bg-blue-50" },
              { icon: "forum", title: "Escuta Qualificada", desc: "Para além do sintoma físico. É a escuta que capta o medo, a angústia e o contexto social que gera o adoecimento.", color: "text-indigo-600", bg: "bg-indigo-50" },
              { icon: "link", title: "Vínculo Contínuo", desc: "Responsabilização após o encontro. A equipe acompanha o percurso terapêutico, garantindo a longitudinalidade.", color: "text-emerald-600", bg: "bg-emerald-50" }
            ].map((p, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 hover:-translate-y-4 transition-all duration-500 group">
                  <div className={`size-16 ${p.bg} ${p.color} rounded-3xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined text-[inherit] font-black">{p.icon}</span>
                  </div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight uppercase text-slate-900">{p.title}</h3>
                  <p className="text-slate-500 text-sm font-bold leading-relaxed">{p.desc}</p>
              </div>
            ))}
        </section>

        {/* Section 1: Fundamentos */}
        <section id="fundamentos" className="mb-40 scroll-mt-24">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
                <div className="lg:w-1/2">
                    <span className="text-blue-600 font-black uppercase tracking-widest text-[10px] mb-4 block">Fundamentos e Conceitos</span>
                    <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tighter leading-tight uppercase">Postura Ética vs. <br />Triagem Seletiva</h2>
                    <p className="text-lg text-slate-600 mb-10 font-medium">O acolhimento não é uma etapa, é um <strong>compromisso de resposta</strong>. É a materialização da APS como um serviço inclusivo e resolutivo.</p>
                    
                    <div className="space-y-6">
                        <div className="p-8 rounded-[2.5rem] bg-white border-2 border-slate-100 shadow-soft flex gap-6 group hover:border-rose-200 transition-colors">
                            <div className="shrink-0 size-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center font-black">X</div>
                            <div>
                                <h4 className="font-black text-slate-900 uppercase text-sm tracking-tight">A Armadilha da Triagem</h4>
                                <p className="text-xs text-slate-500 font-bold mt-2 leading-relaxed">Processo excludente baseado no modelo queixa-conduta. Seleciona quem "pode" entrar com base em critérios meramente biomédicos.</p>
                            </div>
                        </div>
                        <div className="p-8 rounded-[2.5rem] bg-blue-600 text-white shadow-xl flex gap-6 transform hover:scale-[1.02] transition-transform">
                            <div className="shrink-0 size-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center shadow-lg">
                              <span className="material-symbols-outlined font-black">check</span>
                            </div>
                            <div>
                                <h4 className="font-black uppercase text-sm tracking-tight">A Potência do Acolhimento</h4>
                                <p className="text-xs text-blue-100 font-bold mt-2 leading-relaxed">Tecnologia leve que reorganiza o processo de trabalho para escutar todas as demandas, processando-as com equidade e inteligência clínica.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:w-1/2 relative">
                    <div className="bg-slate-900 p-12 md:p-16 rounded-[4rem] text-white relative z-10 shadow-2xl">
                        <h3 className="text-3xl font-black mb-10 text-blue-400 uppercase tracking-tighter">O que a PNH exige?</h3>
                        <div className="grid gap-8">
                            {[
                              { id: "01", title: "Protagonismo", desc: "O usuário é sujeito ativo no seu plano de cuidado, não um objeto de intervenção." },
                              { id: "02", title: "Equidade", desc: "Atendimento prioritário para vulnerabilidades específicas (negros, LGBTQIAPN+, povos tradicionais)." },
                              { id: "03", title: "Clínica Ampliada", desc: "Diagnósticos que integram o biológico, o psíquico e o social." }
                            ].map((item, i) => (
                              <div key={i} className="flex gap-5">
                                  <div className="size-10 bg-slate-800 rounded-xl flex items-center justify-center shrink-0 border border-slate-700 text-blue-400 font-black text-xs">{item.id}</div>
                                  <p className="text-sm text-slate-300 font-medium"><strong>{item.title}:</strong> {item.desc}</p>
                              </div>
                            ))}
                        </div>
                    </div>
                    <div className="absolute -bottom-10 -right-10 size-64 bg-blue-500 rounded-full blur-[100px] opacity-20 -z-10"></div>
                </div>
            </div>
        </section>

        {/* Section 2: Gestão */}
        <section id="gestao" className="mb-40 scroll-mt-24">
            <div className="bg-white rounded-[4rem] p-12 md:p-24 shadow-2xl border-2 border-slate-50">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter leading-none">Gestão do Trabalho e Resolutividade</h2>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">A implantação do acolhimento exige uma mudança radical no "fazer" das equipes.</p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-16">
                    <div className="space-y-12">
                        {[
                          { id: "01", title: "Reorganização da Agenda", desc: "Fim do modelo de agendamento fechado. É necessário reservar espaços protegidos para a demanda espontânea." },
                          { id: "02", title: "Educação Permanente (EPS)", desc: "Momentos de reflexão da equipe sobre a prática. O despreparo subjetivo para lidar com a dor do outro deve ser trabalhado." },
                          { id: "03", title: "Coordenação do Cuidado", desc: "O acolhimento deve gerar um referenciamento responsável. A APS não 'se livra' do paciente, ela o acompanha." }
                        ].map((item, i) => (
                          <div key={i} className="flex gap-8">
                              <div className="text-5xl text-blue-600 font-black opacity-10 leading-none">{item.id}</div>
                              <div>
                                  <h4 className="text-xl font-black mb-3 uppercase tracking-tight text-slate-900">{item.title}</h4>
                                  <p className="text-sm text-slate-500 font-bold leading-relaxed">{item.desc}</p>
                              </div>
                          </div>
                        ))}
                    </div>
                    <div className="bg-slate-50 p-10 rounded-[3.5rem] border-2 border-slate-100 flex flex-col">
                        <h4 className="font-black text-slate-900 mb-8 uppercase text-[10px] tracking-widest text-center">Checklist do Erro Comum</h4>
                        <div className="space-y-4 flex-1">
                            {[
                              "Ter uma 'sala de acolhimento' isolada",
                              "Estabelecer horário rígido (ex: 7h às 9h)",
                              "Ausência de retaguarda médica no turno",
                              "Focar apenas no sintoma físico urgente"
                            ].map((err, i) => (
                              <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-rose-100 shadow-sm">
                                  <span className="material-symbols-outlined text-rose-500 text-xl font-black">cancel</span>
                                  <span className="text-[11px] font-black uppercase text-slate-700">{err}</span>
                              </div>
                            ))}
                        </div>
                        <div className="mt-10 p-8 bg-blue-600 rounded-[2.5rem] text-white text-center shadow-lg relative overflow-hidden">
                            <p className="text-[10px] font-black uppercase mb-4 tracking-widest opacity-60">A Analogia Final</p>
                            <p className="text-base italic font-medium leading-relaxed">
                              "A triagem é um guarda à porta; o acolhimento é o anfitrião que abre a casa e não descansa até que o visitante tenha uma solution."
                            </p>
                            <span className="absolute -bottom-10 -right-10 material-symbols-outlined text-[10rem] opacity-10">house</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Quiz Section */}
        <section id="quiz-container" className="bg-slate-950 text-white rounded-[4.5rem] p-8 md:p-20 shadow-2xl relative overflow-hidden scroll-mt-24">
          <div className="absolute top-0 right-0 size-96 bg-blue-600 rounded-full blur-[150px] opacity-10"></div>
          
          <div className="max-w-4xl mx-auto relative z-10">
            {!showResults ? (
              <div className="space-y-12 animate-fade-in">
                <div className="text-center">
                  <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Simulação Profissional</span>
                  <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight uppercase">Dilemas de Acolhimento</h2>
                  <p className="text-slate-400 max-w-2xl mx-auto font-medium">
                    Teste sua capacidade de aplicar o acolhimento em cenários complexos de gestão e assistência na rede pública.
                  </p>
                </div>

                <div className="bg-white text-slate-900 rounded-[3rem] p-8 md:p-14 shadow-2xl relative">
                  {/* Progress Bar */}
                  <div className="mb-12">
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-1">{quizData[currentQuestion].category}</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Questão {currentQuestion + 1} de {quizData.length}</span>
                      </div>
                      <span className="text-3xl font-black text-slate-900 font-mono">{score.toString().padStart(2, '0')}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-700 ease-out" 
                        style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Question Title */}
                  <h3 className="text-2xl md:text-3xl font-black mb-10 leading-tight tracking-tight text-slate-800">
                    {quizData[currentQuestion].question}
                  </h3>

                  {/* Options */}
                  <div className="grid gap-4">
                    {quizData[currentQuestion].options.map((opt, idx) => {
                      let btnStyle = "bg-white border-2 border-slate-100 text-slate-700 hover:border-blue-500 hover:bg-blue-50/30";
                      if (isAnswered) {
                        if (idx === quizData[currentQuestion].correct) btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-100";
                        else if (idx === selectedOption) btnStyle = "bg-rose-50 border-rose-500 text-rose-900";
                        else btnStyle = "opacity-40 grayscale border-slate-100";
                      }

                      return (
                        <button
                          key={idx}
                          disabled={isAnswered}
                          onClick={() => handleAnswer(idx)}
                          className={`w-full text-left p-6 rounded-[2rem] font-bold text-base md:text-lg transition-all shadow-sm flex gap-4 items-start ${btnStyle}`}
                        >
                          <span className={`size-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${isAnswered && idx === quizData[currentQuestion].correct ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="pt-0.5">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback */}
                  {isAnswered && (
                    <div className={`mt-12 p-8 rounded-[2.5rem] animate-zoom-in border-2 ${
                      selectedOption === quizData[currentQuestion].correct 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                        : 'bg-rose-50 border-rose-200 text-rose-900'
                    }`}>
                      <div className="flex items-start gap-6">
                        <span className="material-symbols-outlined text-4xl font-black">
                          {selectedOption === quizData[currentQuestion].correct ? 'check_circle' : 'warning'}
                        </span>
                        <div>
                          <p className="font-black text-xl uppercase tracking-tight mb-2">
                            {selectedOption === quizData[currentQuestion].correct ? 'Excelente Decisão!' : 'Conduta Inadequada.'}
                          </p>
                          <p className="text-sm font-bold opacity-80 leading-relaxed">
                            {quizData[currentQuestion].rationale}
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={handleNext}
                        className="mt-10 w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all transform active:scale-95 shadow-xl flex items-center justify-center gap-3"
                      >
                        {currentQuestion < quizData.length - 1 ? 'Próxima Situação' : 'Ver Avaliação Final'}
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-16 animate-fade-in flex flex-col items-center">
                <div className="size-32 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-2xl mb-10 animate-bounce">
                  <span className="material-symbols-outlined text-6xl font-black">verified_user</span>
                </div>
                <h2 className="text-5xl font-black mb-4 uppercase tracking-tighter">Formação Concluída!</h2>
                <p className="text-2xl text-slate-400 mb-12 font-bold uppercase tracking-widest text-sm">
                  Competência em Acolhimento Humanizado
                </p>
                <div className="bg-white/10 p-12 rounded-[4rem] border border-white/20 mb-12 w-full max-w-sm">
                  <p className="text-blue-400 text-[10px] mb-2 uppercase font-black tracking-[0.4em]">Resolutividade Ética</p>
                  <div className="text-8xl font-black text-white">{Math.round((score / quizData.length) * 100)}%</div>
                  <p className="text-slate-500 font-bold mt-6 text-sm italic">{score} de {quizData.length} acertos</p>
                </div>
                <button 
                  onClick={() => {
                    setCurrentQuestion(0);
                    setScore(0);
                    setShowResults(false);
                    setSelectedOption(null);
                    setIsAnswered(false);
                  }}
                  className="bg-white text-slate-900 px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-slate-100 shadow-xl transition-all"
                >
                  Recomeçar Simulação
                </button>
              </div>
            )}
          </div>
          <div className="absolute top-0 left-0 p-20 opacity-5 pointer-events-none select-none">
             <span className="material-symbols-outlined text-[40rem]">hail</span>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-500 py-20 text-center border-t border-slate-800 no-print">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-2">socidéM • Formação Continuada em APS &copy; 2025</p>
        <p className="text-[9px] opacity-50 uppercase font-bold tracking-widest">Política Nacional de Humanização (PNH) • Ministério da Saúde</p>
      </footer>
    </div>
  );
};

export default AcolhimentoTool;