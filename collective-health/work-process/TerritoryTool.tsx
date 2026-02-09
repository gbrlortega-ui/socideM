import React, { useState } from 'react';

const TerritoryTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const quizData = [
    {
      question: "O que melhor define o concept de 'território' no contexto da ESF?",
      options: [
        "Uma delimitação exclusivamente administrativa.",
        "Um espaço estático definido apenas por barreiras físicas.",
        "Um processo dinâmico de relações entre objetos e ações humanas.",
        "Apenas o prédio físico da Unidade Básica de Saúde."
      ],
      correct: 2,
      rationale: "O território na ESF é 'vivo' e 'usado', integrando a geografia com as relações sociais e afetivas da comunidade."
    },
    {
      question: "Qual o objetivo central da territorialização como técnica de planejamento?",
      options: [
        "Organizar o transporte de emergência para hospitais.",
        "Transformar o território-solo em território-sanitário para planejar ações.",
        "Reduzir o quadro de funcionários da unidade de saúde.",
        "Contar quantas casas possuem muros altos no bairro."
      ],
      correct: 1,
      rationale: "Ela organiza o conhecimento sobre a área para que a equipe possa intervir nos problemas reais de saúde."
    },
    {
      question: "Qual é a recomendação de população adscrita por equipe de saúde na APS?",
      options: [
        "De 100 a 500 pessoas.",
        "De 2.000 a 4.000 pessoas.",
        "De 10.000 a 15.000 pessoas.",
        "Não existe número recomendado."
      ],
      correct: 1,
      rationale: "Essa faixa populacional permite que a equipe conheça as pessoas pelo nome e acompanhe suas histórias de vida."
    },
    {
      question: "Qual o papel principal do ACS na gestão do território?",
      options: [
        "Prescrever medicação em casos de urgência domiciliar.",
        "Substituir o médico nas consultas da unidade.",
        "Ser o elo central entre a comunidade e a equipe de saúde.",
        "Realizar apenas a limpeza da Unidade Básica de Saúde."
      ],
      correct: 2,
      rationale: "O ACS vive no território ou tem contato íntimo com ele, mapeando riscos e facilitando o acesso da população."
    },
    {
      question: "Como a territorialidade ajuda a promover a Equidade no SUS?",
      options: [
        "Tratando todos os cidadãos de forma absolutamente idêntica.",
        "Identificando quem tem mais recursos financeiros para cobrar taxas.",
        "Priorizando recursos e atenção para as áreas de maior vulnerabilidade social.",
        "Impedindo que pessoas de outros bairros usem a unidade."
      ],
      correct: 2,
      rationale: "A equidade significa tratar desigualmente os desiguais, focando em quem mais precisa conforme o diagnóstico do território."
    },
    {
      question: "O diagnóstico situacional é realizado para:",
      options: [
        "Punição administrativa de famílias que não comparecem à UBS.",
        "Identificar prioridades de intervenção baseadas em evidências sociais e epidemiológicas.",
        "Vender dados dos pacientes para empresas de seguro de saúde.",
        "Escolher qual cor a unidade será pintada no próximo ano."
      ],
      correct: 1,
      rationale: "Ele permite um planejamento assertivo, focando nos problemas reais da população adscrita."
    },
    {
      question: "O que são Determinantes Sociais da Saúde (DSS)?",
      options: [
        "As escolhas puramente genéticas de cada indivíduo.",
        "Condições sociais (renda, moradia, trabalho) que moldam o processo saúde-doença.",
        "A lista de remédios que cada paciente decide tomar por conta própria.",
        "O valor da consulta em clínicas particulares."
      ],
      correct: 1,
      rationale: "Os DSS explicam por que certas populações adoecem mais do que outras devido ao seu contexto social."
    },
    {
      question: "O conceito de 'Território Vivo' envolve:",
      options: [
        "Apenas os animais domésticos da região.",
        "As relações de poder, afetos e redes de apoio entre os moradores.",
        "O tempo de vida útil das ambulâncias do município.",
        "A quantidade de árvores frutíferas no bairro."
      ],
      correct: 1,
      rationale: "O território vivo é onde as relações sociais acontecem, gerando saúde ou sofrimento."
    },
    {
      question: "O cadastro no e-SUS APS é importante para o financiamento porque:",
      options: [
        "Monitora quem paga as contas de luz em dia.",
        "Define o valor do repasse federal através do programa Previne Brasil.",
        "Cria uma lista de pessoas para o sistema de marketing da prefeitura.",
        "Não tem qualquer impacto financeiro no município."
      ],
      correct: 1,
      rationale: "O financiamento federal atual é fortemente baseado no número de pessoas cadastradas e acompanhadas."
    },
    {
      question: "A dimensão 'Sanitária' do território é definida por:",
      options: [
        "Pela área sob responsabilidade técnica e adscrição de uma equipe.",
        "Pela proximidade com a rede de esgoto da cidade.",
        "Pela quantidade de lixeiras instaladas nas ruas.",
        "Pelo número de farmácias privadas no bairro."
      ],
      correct: 0,
      rationale: "É a delimitação técnica onde a equipe exerce sua vigilância e cuidado à saúde."
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
      <header className="bg-gradient-to-br from-teal-800 to-teal-600 text-white py-24 px-6 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="url(#grid-teal)"></path>
                <defs>
                    <pattern id="grid-teal" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"></path>
                    </pattern>
                </defs>
            </svg>
        </div>
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <button 
            onClick={onBack}
            className="absolute top-0 left-0 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all flex items-center gap-2 text-xs font-bold no-print"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span> VOLTAR
          </button>
          
          <span className="inline-block bg-teal-400/20 text-teal-50 px-4 py-1.5 rounded-full text-[10px] font-black mb-6 tracking-widest uppercase border border-teal-400/30">
            A Base da Estratégia Saúde da Família
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">
            O Território <br className="hidden md:block" /> na APS
          </h1>
          <p className="text-xl md:text-2xl opacity-90 font-light max-w-3xl mx-auto">
            Entenda como a geografia se transforma em responsabilidade sanitária e cuidado longitudinal através da territorialização.
          </p>
        </div>
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none select-none">
            <span className="material-symbols-outlined text-[25rem]">public</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-20 flex-1 w-full">
        
        {/* Seção 1: Conceito */}
        <section id="conceito" className="mb-32 scroll-mt-24">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-12 bg-teal-100 text-teal-700 flex items-center justify-center rounded-2xl text-xl font-bold">01</span>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Territorialidade</h2>
              </div>
              <p className="text-lg text-slate-600 mb-8 font-medium leading-relaxed">
                A territorialidade não é apenas o mapa colado na parede da UBS. É o <strong>processo social</strong> de habitar um espaço. Na Atenção Primária, o território é "vivo" porque nele circulam pessoas, doenças, afetos e problemas sociais.
              </p>
              
              <div className="grid gap-6">
                <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm hover:border-teal-500 transition-all duration-300 group">
                  <div className="flex gap-5">
                    <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600 h-fit group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined">landscape</span>
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 mb-1 uppercase tracking-tight">Território-Solo</h4>
                      <p className="text-sm text-slate-500 font-bold leading-relaxed">A base geográfica física: limites de bairros, ruas, relevos e barreiras físicas que impactam o acesso.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm hover:border-teal-500 transition-all duration-300 group">
                  <div className="flex gap-5">
                    <div className="bg-teal-100 p-4 rounded-2xl text-teal-600 h-fit group-hover:bg-teal-600 group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined">volunteer_activism</span>
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 mb-1 uppercase tracking-tight">Território-Vivo</h4>
                      <p className="text-sm text-slate-500 font-bold leading-relaxed">O território usado pelas pessoas: relações de poder, afetos e dinâmicas sociais da comunidade.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="bg-teal-700 text-white p-10 rounded-[3rem] col-span-2 shadow-xl relative overflow-hidden">
                <h4 className="text-2xl font-black mb-4 uppercase tracking-tighter">Responsabilização Sanitária</h4>
                <p className="text-teal-100 text-base font-medium leading-relaxed mb-6 opacity-90">
                  É a técnica que garante que a equipe não fique apenas esperando no consultório; ela monitora ativamente quem vive naquela área.
                </p>
                <div className="inline-block px-4 py-2 bg-teal-500/30 border border-teal-400 rounded-xl text-xs font-black uppercase tracking-widest">
                  Monitoramento Ativo
                </div>
                <span className="absolute -bottom-10 -right-10 material-symbols-outlined text-[12rem] opacity-10">my_location</span>
              </div>
              <div className="bg-slate-200/50 p-8 rounded-[2.5rem] flex flex-col justify-center items-center text-center">
                <span className="text-4xl font-black text-slate-800">100%</span>
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-[0.1em] mt-2">Vigilância</span>
              </div>
              <div className="bg-slate-800 text-white p-8 rounded-[2.5rem] flex flex-col justify-center items-center text-center">
                <span className="text-4xl font-black text-teal-400"><span className="material-symbols-outlined text-4xl">travel_explore</span></span>
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-[0.1em] mt-2">Territorialização</span>
              </div>
            </div>
          </div>
        </section>

        {/* Seção 2: Vínculo e Cadastro */}
        <section id="vinculo" className="mb-32 scroll-mt-24">
          <div className="bg-slate-900 text-white rounded-[4rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
            <div className="max-w-4xl relative z-10">
              <span className="text-teal-400 font-black uppercase tracking-[0.2em] text-xs mb-4 block">Módulo 02</span>
              <h2 className="text-4xl md:text-5xl font-black mb-12 leading-tight uppercase tracking-tighter">Vínculo e Cadastro: <br />O DNA do Território</h2>
              
              <div className="grid md:grid-cols-2 gap-16">
                <div className="space-y-12">
                  <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-sm">
                    <h3 className="text-2xl font-black mb-4 flex items-center gap-3 uppercase tracking-tight text-teal-400"><span className="material-symbols-outlined">badge</span> Adscrição</h3>
                    <p className="text-slate-300 text-base font-medium leading-relaxed">
                      Cada equipe deve ser responsável por uma população definida (2.000 a 4.000 pessoas). Garante a <strong>longitudinalidade</strong> — o acompanhamento ao longo da vida.
                    </p>
                  </div>
                  <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-sm">
                    <h3 className="text-2xl font-black mb-4 flex items-center gap-3 uppercase tracking-tight text-teal-400"><span className="material-symbols-outlined">database</span> e-SUS APS</h3>
                    <p className="text-slate-300 text-base font-medium leading-relaxed">
                      O cadastro individual e domiciliar coleta condições de moradia e histórico. Essencial para o financiamento (Previne Brasil).
                    </p>
                  </div>
                </div>
                <div className="bg-teal-600/20 p-8 rounded-[2.5rem] border-2 border-teal-500/30 flex flex-col justify-center items-center text-center gap-6">
                    <div className="size-20 bg-teal-500 rounded-full flex items-center justify-center text-white shadow-lg">
                      <span className="material-symbols-outlined text-4xl">id_card</span>
                    </div>
                    <h4 className="text-xl font-black uppercase">Vínculo Formal</h4>
                    <p className="text-sm text-teal-100 font-medium">O cadastro é o que torna o cidadão visível para as políticas públicas e garante seu direito ao cuidado contínuo.</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-20 -top-20 opacity-5 pointer-events-none select-none">
                <span className="material-symbols-outlined text-[35rem]">how_to_reg</span>
            </div>
          </div>
        </section>

        {/* Seção 3: DSS e Diagnóstico */}
        <section id="dss" className="mb-32 scroll-mt-24">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight uppercase">Determinantes e Diagnóstico</h2>
                <p className="text-slate-500 max-w-2xl mx-auto font-bold uppercase tracking-widest text-xs">Transformando observação em inteligência sanitária.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm hover:border-teal-500 transition-all duration-300">
                    <div className="size-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-inner">
                      <span className="material-symbols-outlined text-[inherit]">analytics</span>
                    </div>
                    <h4 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">Determinantes Sociais (DSS)</h4>
                    <p className="text-sm text-slate-500 font-bold leading-relaxed">
                        Onde a pessoa nasce, vive e trabalha determina quanto ela adoece. Fatores como saneamento, escolaridade e emprego são chaves.
                    </p>
                </div>
                <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm hover:border-teal-500 transition-all duration-300">
                    <div className="size-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-inner">
                      <span className="material-symbols-outlined text-[inherit]">clinical_notes</span>
                    </div>
                    <h4 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">Diagnóstico Situacional</h4>
                    <p className="text-sm text-slate-500 font-bold leading-relaxed">
                        Análise da equipe para decidir prioridades. O diagnóstico aponta onde a intervenção é mais urgente no território.
                    </p>
                </div>
            </div>
        </section>

        {/* Seção 4: O papel do ACS */}
        <section id="acs" className="mb-32 scroll-mt-24">
          <div className="bg-white rounded-[3.5rem] p-10 md:p-20 shadow-xl border border-slate-100 border-t-[12px] border-t-teal-600">
            <div className="flex flex-col md:flex-row gap-16">
              <div className="md:w-1/3">
                <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight uppercase leading-tight">O Protagonista: O ACS</h2>
                <div className="flex flex-col gap-3">
                  <div className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-widest border border-emerald-200 inline-block text-center">Elo Comunidade-Equipe</div>
                  <div className="px-4 py-2 rounded-full bg-teal-100 text-teal-800 text-[10px] font-black uppercase tracking-widest border border-teal-200 inline-block text-center">Gestão de Microáreas</div>
                </div>
              </div>
              <div className="md:w-2/3 grid grid-cols-2 gap-4">
                  {[
                    { val: "Visita", sub: "Domiciliar Constante", icon: "home" },
                    { val: "Educação", sub: "Popular em Saúde", icon: "campaign" },
                    { val: "Escuta", sub: "Ativa e Empática", icon: "forum" },
                    { val: "Mapeamento", sub: "de Áreas de Risco", icon: "distance" }
                  ].map((item, i) => (
                    <div key={i} className="p-6 bg-slate-50 rounded-3xl border-2 border-slate-100 flex flex-col items-center gap-2 text-center group hover:border-teal-500 transition-all">
                      <span className="material-symbols-outlined text-teal-600 text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
                      <div>
                        <p className="text-teal-700 font-black text-lg leading-none">{item.val}</p>
                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-1">{item.sub}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* Analogia */}
        <section className="mb-24 py-12 px-8 bg-white rounded-[3rem] border-4 border-dashed border-teal-100 shadow-inner">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="size-20 bg-teal-50 rounded-full flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-5xl text-teal-300">psychology</span>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-800 mb-3 uppercase tracking-tight">Analogia do Jardim</h3>
              <p className="text-slate-600 italic leading-relaxed text-lg font-medium">
                Imagine que a saúde pública é um grande jardim. O <strong>território</strong> é o canteiro específico onde as plantas crescem. A <strong>territorialização</strong> é o ato de estudar o solo e o clima desse canteiro. O <strong>ACS</strong> é o jardineiro que mora ali e sabe qual planta precisa de mais água (Equidade). Sem conhecer o solo, você pode aplicar o mesmo adubo em todo lugar, mas algumas plantas morrerão.
              </p>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section id="quiz-container" className="bg-slate-950 text-white rounded-[4rem] p-8 md:p-16 shadow-2xl scroll-mt-24 overflow-hidden relative">
          <div className="max-w-4xl mx-auto relative z-10">
            {!showResults ? (
              <div className="space-y-12 animate-fade-in">
                <div className="text-center">
                  <span className="text-teal-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Desafio Acadêmico</span>
                  <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight uppercase">Teste seu Conhecimento</h2>
                  <p className="text-slate-400 max-w-2xl mx-auto font-medium">
                    Domine os fundamentos do território respondendo às situações reais do cotidiano da ESF abaixo.
                  </p>
                </div>

                <div className="bg-white text-slate-900 rounded-[3rem] p-8 md:p-14 shadow-2xl relative">
                  {/* Progress Bar */}
                  <div className="mb-12">
                    <div className="flex justify-between items-end mb-4">
                      <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest">Questão {currentQuestion + 1} de {quizData.length}</span>
                      <span className="text-3xl font-black text-slate-900 font-mono">{score.toString().padStart(2, '0')}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3">
                      <div 
                        className="bg-teal-600 h-3 rounded-full transition-all duration-700 ease-out" 
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
                      let btnStyle = "bg-white border-2 border-slate-100 text-slate-700 hover:border-teal-500 hover:bg-teal-50/30";
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
                            {selectedOption === quizData[currentQuestion].correct ? 'Excelente! Você acertou.' : 'Atenção aos detalhes.'}
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
                        {currentQuestion < quizData.length - 1 ? 'Próxima Questão' : 'Ver Resultado Final'}
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-16 animate-fade-in flex flex-col items-center">
                <div className="size-32 bg-teal-500 rounded-full flex items-center justify-center text-white shadow-2xl mb-10 animate-bounce">
                  <span className="material-symbols-outlined text-6xl font-black">emoji_events</span>
                </div>
                <h2 className="text-5xl font-black mb-4 uppercase tracking-tighter">Estudo Concluído!</h2>
                <p className="text-2xl text-slate-400 mb-12 font-bold uppercase tracking-widest text-sm">
                  Domínio de Territorialidade na APS
                </p>
                <div className="bg-white/10 p-12 rounded-[4rem] border border-white/20 mb-12 w-full max-w-sm">
                  <p className="text-teal-400 text-[10px] mb-2 uppercase font-black tracking-[0.4em]">Aproveitamento</p>
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
                  Estudar Novamente
                </button>
              </div>
            )}
          </div>
          <div className="absolute top-0 left-0 p-20 opacity-5 pointer-events-none select-none">
             <span className="material-symbols-outlined text-[40rem]">map</span>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 text-slate-600 py-16 text-center border-t border-slate-900 no-print">
        <p className="text-[10px] font-black uppercase tracking-[0.3em]">socidéM • Saúde da Família e Comunidade &copy; 2025</p>
        <p className="text-[9px] mt-2 opacity-50 uppercase font-bold tracking-widest">Baseado em princípios da PNAB - Ministério da Saúde</p>
      </footer>
    </div>
  );
};

export default TerritoryTool;