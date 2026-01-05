import React, { useState } from 'react';

const RecordsTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const quizData = [
    {
      question: "O cadastro é a 'certidão de nascimento' do vínculo entre cidadão e serviço de saúde. Na estratégia e-SUS, o cadastro domiciliar foca em:",
      options: [
        "Diagnosticar doenças crónicas do indivíduo.",
        "Mapear o ambiente, saneamento e determinantes sociais da família.",
        "Agendar consultas e exames de média complexidade.",
        "Prescrever medicamentos de uso contínuo."
      ],
      correct: 1,
      rationale: "O cadastro domiciliar e territorial mapeia as condições de vida (água, lixo, luz) que influenciam na saúde daquela comunidade."
    },
    {
      question: "O prontuário é descrito como uma 'biografia técnica' porque:",
      options: [
        "Deve conter relatos sobre a infância do médico.",
        "É um registo cronológico dinâmico do percurso do paciente ao longo da vida.",
        "É um livro de ficção baseado em histórias de pacientes.",
        "Serve apenas para guardar resultados de exames de sangue."
      ],
      correct: 1,
      rationale: "Garante a longitudinalidade; o profissional consegue ver o percurso do cuidado e não apenas o momento atual."
    },
    {
      question: "O conceito de 'Adscrição' na APS refere-se a:",
      options: [
        "O ato de prescrever medicamentos controlados.",
        "O vínculo formal de responsabilidade da equipa sobre o usuário cadastrado.",
        "A transferência de um paciente para a unidade hospitalar.",
        "A demissão de um profissional de saúde da equipa."
      ],
      correct: 1,
      rationale: "Adscrever é definir quem são as pessoas pelas quais aquela equipa é sanitariamente responsável."
    },
    {
      question: "Como o prontuário auxilia na 'Coordenação do Cuidado' na Rede de Atenção (RAS)?",
      options: [
        "Impedindo o paciente de consultar outros médicos.",
        "Atuando como centro de comunicação para acompanhar o paciente em especialistas e hospitais.",
        "Substituindo a necessidade de exames de imagem.",
        "Permitindo que o paciente altere o seu próprio diagnóstico."
      ],
      correct: 1,
      rationale: "O prontuário centraliza as informações de diferentes pontos da rede, evitando exames repetidos e condutas contraditórias."
    },
    {
      question: "No modelo SOAP de registo, o que deve constar na letra 'S' (Subjetivo)?",
      options: [
        "O valor da pressão arterial aferida no momento.",
        "A queixa, a história do problema atual e os sentimentos relatados pelo usuário.",
        "O diagnóstico final da patologia.",
        "A prescrição de medicamentos."
      ],
      correct: 1,
      rationale: "O 'S' traz a perspetiva do sujeito, seus sintomas subjetivos e o contexto que ele traz para a consulta."
    },
    {
      question: "A Estratificação de Risco combina dados do prontuário e do cadastro para:",
      options: [
        "Sortear brindes para os pacientes mais saudáveis.",
        "Classificar usuários em estratos para definir periodicidade e intensidade das intervenções.",
        "Excluir usuários que moram muito longe da unidade básica.",
        "Definir quem pagará pelo atendimento médico."
      ],
      correct: 1,
      rationale: "Serve para gerir a equidade: quem tem maior risco (clínico + social) recebe atenção mais frequente."
    },
    {
      question: "O Projeto Terapêutico Singular (PTS) é uma ferramenta do prontuário para:",
      options: [
        "Pacientes que querem ser atendidos sozinhos na sala.",
        "Casos complexos, articulado por equipa multiprofissional com a participação do usuário.",
        "Reduzir o tempo de consulta para menos de 5 minutos.",
        "Agrupar pacientes com o mesmo CPF no sistema."
      ],
      correct: 1,
      rationale: "O PTS usa o prontuário para integrar médicos, enfermeiros, psicólogos etc., num plano de ação único para casos difíceis."
    },
    {
      question: "Sobre a LGPD e o Prontuário, como são classificados os dados de saúde?",
      options: [
        "Dados públicos de livre acesso à comunidade.",
        "Dados pessoais sensíveis, exigindo sigilo, confidencialidade e acesso restrito.",
        "Dados irrelevantes que não possuem proteção jurídica.",
        "Dados pertencentes exclusivamente à empresa de software do prontuário."
      ],
      correct: 1,
      rationale: "Dados de saúde podem gerar preconceito ou exclusão se revelados; a lei exige proteção máxima ao sigilo."
    },
    {
      question: "O Prontuário Eletrônico do Cidadão (PEC) contribui para a segurança do paciente pois:",
      options: [
        "Permite imprimir o prontuário em cores variadas.",
        "Elimina erros por letra ilegível e previne eventos adversos via alertas automáticos.",
        "Faz com que o médico não precise de falar com o paciente.",
        "Apaga o histórico do paciente todos os anos para poupar memória."
      ],
      correct: 1,
      rationale: "Alertas de alergia e interações medicamentosas, além da legibilidade, são chaves para evitar iatrogenias."
    },
    {
      question: "Um erro crítico no preenchimento do cadastro que prejudica a gestão é:",
      options: [
        "Escrever o nome da rua corretamente.",
        "Cadastros duplicados devido a erros de digitação ou buscas ineficazes no sistema.",
        "Registrar o peso e altura do paciente.",
        "Cadastrar o número do cartão do SUS."
      ],
      correct: 1,
      rationale: "Duplicidades geram dados estatísticos falsos, dificultam a vigilância e podem causar erros na medicação e histórico."
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
      <header className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-24 px-6 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="url(#grid-blue)"></path>
                <defs>
                    <pattern id="grid-blue" width="10" height="10" patternUnits="userSpaceOnUse">
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
          
          <span className="inline-block bg-blue-400/20 text-blue-100 px-4 py-1.5 rounded-full text-[10px] font-black mb-6 tracking-widest uppercase border border-blue-400/30">
            Gestão da Informação em Saúde
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">
            Cadastro & <br className="hidden md:block" /> Prontuário na APS
          </h1>
          <p className="text-xl md:text-2xl opacity-90 font-light max-w-3xl mx-auto">
            Domine as ferramentas fundamentais que transformam a adscrição territorial em cuidado longitudinal e coordenação de rede.
          </p>
        </div>
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none select-none">
            <span className="material-symbols-outlined text-[25rem]">assignment_ind</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-20 flex-1 w-full">
        
        {/* Módulo 1: Cadastro */}
        <section id="cadastro" className="mb-32 scroll-mt-24">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
                <div className="lg:w-1/2">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="w-12 h-12 bg-blue-100 text-blue-700 flex items-center justify-center rounded-2xl text-xl font-bold">01</span>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Fundamentos do Cadastro</h2>
                    </div>
                    <p className="text-lg text-slate-600 mb-8 font-medium leading-relaxed">
                        O cadastro é o processo sistemático de identificação e registro das famílias sob a responsabilidade de uma equipe. Não é apenas uma recolha de nomes, mas a ferramenta que viabiliza a <strong>universalidade</strong> e a <strong>equidade</strong>.
                    </p>
                    
                    <div className="grid gap-6">
                        <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm hover:border-blue-500 transition-all duration-300 group">
                            <div className="flex gap-5">
                                <div className="bg-indigo-100 p-4 rounded-2xl text-indigo-600 h-fit group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                  <span className="material-symbols-outlined">person</span>
                                </div>
                                <div>
                                    <h4 className="font-black text-slate-900 mb-1 uppercase tracking-tight">Cadastro Individual</h4>
                                    <p className="text-sm text-slate-500 font-bold leading-relaxed">Foca na singularidade: histórico de saúde, etnia, orientação sexual e condições de vulnerabilidade individual.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm hover:border-emerald-500 transition-all duration-300 group">
                            <div className="flex gap-5">
                                <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600 h-fit group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                  <span className="material-symbols-outlined">home</span>
                                </div>
                                <div>
                                    <h4 className="font-black text-slate-900 mb-1 uppercase tracking-tight">Cadastro Domiciliar</h4>
                                    <p className="text-sm text-slate-500 font-bold leading-relaxed">Mapeia o contexto: tipo de habitação, acesso a saneamento, eletricidade e riscos ambientais diretos.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                    <div className="bg-blue-700 text-white p-10 rounded-[3rem] col-span-2 shadow-xl relative overflow-hidden">
                        <h4 className="text-2xl font-black mb-4 uppercase tracking-tighter">Adscrição de Usuários</h4>
                        <p className="text-blue-100 text-base font-medium leading-relaxed mb-6 opacity-90">
                            É o vínculo formal de responsabilidade entre a equipe e o cidadão. A adscrição define o "endereço da responsabilidade", garantindo que ninguém fique "invisível" ao sistema.
                        </p>
                        <div className="inline-block px-4 py-2 bg-blue-500/30 border border-blue-400 rounded-xl text-xs font-black uppercase tracking-widest">
                          2.000 a 4.000 usuários por equipe
                        </div>
                        <span className="absolute -bottom-10 -right-10 material-symbols-outlined text-[12rem] opacity-10">link</span>
                    </div>
                    <div className="bg-slate-200/50 p-8 rounded-[2.5rem] flex flex-col justify-center items-center text-center">
                        <span className="text-4xl font-black text-slate-800">100%</span>
                        <span className="text-[10px] uppercase font-black text-slate-400 tracking-[0.1em] mt-2">Foco na Equidade</span>
                    </div>
                    <div className="bg-slate-800 text-white p-8 rounded-[2.5rem] flex flex-col justify-center items-center text-center">
                        <span className="text-4xl font-black text-blue-400"><span className="material-symbols-outlined text-4xl">sync_alt</span></span>
                        <span className="text-[10px] uppercase font-black text-slate-400 tracking-[0.1em] mt-2">Vínculo Contínuo</span>
                    </div>
                </div>
            </div>
        </section>

        {/* Módulo 2: Prontuário */}
        <section id="prontuario" className="mb-32 scroll-mt-24">
            <div className="bg-slate-900 text-white rounded-[4rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
                <div className="max-w-4xl relative z-10">
                    <span className="text-blue-400 font-black uppercase tracking-[0.2em] text-xs mb-4 block">Módulo 02</span>
                    <h2 className="text-4xl md:text-5xl font-black mb-12 leading-tight uppercase tracking-tighter">O Prontuário: <br />A Biografia Técnica do Cuidado</h2>
                    
                    <div className="grid md:grid-cols-2 gap-16">
                        <div className="space-y-12">
                            <div>
                                <h3 className="text-2xl font-black mb-4 flex items-center gap-3 uppercase tracking-tight text-blue-400"><span className="material-symbols-outlined">all_inclusive</span> Longitudinalidade</h3>
                                <p className="text-slate-300 text-base font-medium leading-relaxed">
                                    Diferente de um registro hospitalar (episódico), o prontuário na APS é dinâmico e vitalício. Ele acompanha os efeitos das intervenções e os ciclos de vida.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-black mb-4 flex items-center gap-3 uppercase tracking-tight text-blue-400"><span className="material-symbols-outlined">hub</span> Coordenação do Cuidado</h3>
                                <p className="text-slate-300 text-base font-medium leading-relaxed">
                                    O prontuário atua como centro de comunicação entre especialistas e hospitais na Rede de Atenção à Saúde (RAS).
                                </p>
                            </div>
                        </div>
                        <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-sm">
                            <h4 className="font-black text-blue-400 mb-8 uppercase text-[10px] tracking-widest border-b border-white/10 pb-4">A Prática do Registro (SOAP)</h4>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <span className="font-black text-2xl text-blue-500 italic">S</span>
                                    <div>
                                      <p className="text-xs text-white font-black uppercase tracking-widest mb-1">Subjetivo</p>
                                      <p className="text-[11px] text-slate-400 font-medium">A queixa, os sentimentos e o contexto relatado pelo usuário.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <span className="font-black text-2xl text-blue-500 italic">O</span>
                                    <div>
                                      <p className="text-xs text-white font-black uppercase tracking-widest mb-1">Objetivo</p>
                                      <p className="text-[11px] text-slate-400 font-medium">Sinais vitais, exame físico e resultados de exames complementares.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <span className="font-black text-2xl text-blue-500 italic">A</span>
                                    <div>
                                      <p className="text-xs text-white font-black uppercase tracking-widest mb-1">Avaliação</p>
                                      <p className="text-[11px] text-slate-400 font-medium">O raciocínio clínico, hipóteses e diagnósticos definidos.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <span className="font-black text-2xl text-blue-500 italic">P</span>
                                    <div>
                                      <p className="text-xs text-white font-black uppercase tracking-widest mb-1">Plano</p>
                                      <p className="text-[11px] text-slate-400 font-medium">Condutas, prescrições e orientações negociadas.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute -right-20 -top-20 opacity-5 pointer-events-none select-none">
                    <span className="material-symbols-outlined text-[35rem]">notes_medical</span>
                </div>
            </div>
        </section>

        {/* Módulo 3: Planejamento & Gestão */}
        <section id="gestao" className="mb-32 scroll-mt-24">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight uppercase">Vigilância e Planejamento</h2>
                <p className="text-slate-500 max-w-2xl mx-auto font-bold uppercase tracking-widest text-xs">Como a informação recolhida gera inteligência sanitária.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm hover:border-blue-500 transition-all duration-300">
                    <div className="size-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-inner">
                      <span className="material-symbols-outlined text-[inherit]">priority_high</span>
                    </div>
                    <h4 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">Estratificação de Risco</h4>
                    <p className="text-sm text-slate-500 font-bold leading-relaxed">
                        Combina indicadores clínicos (PA, Glicemia) e sociais (Vulnerabilidades) para definir a intensidade do cuidado e prioridade na fila.
                    </p>
                </div>
                <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm hover:border-blue-500 transition-all duration-300">
                    <div className="size-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-inner">
                      <span className="material-symbols-outlined text-[inherit]">psychology</span>
                    </div>
                    <h4 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">Clínica Ampliada</h4>
                    <p className="text-sm text-slate-500 font-bold leading-relaxed">
                        Registro focado no biopsicossocial. Valoriza a escuta qualificada e a autonomia do sujeito na tomada de decisões sobre sua saúde.
                    </p>
                </div>
                <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm hover:border-blue-500 transition-all duration-300">
                    <div className="size-16 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-inner">
                      <span className="material-symbols-outlined text-[inherit]">account_tree</span>
                    </div>
                    <h4 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">PTS</h4>
                    <p className="text-sm text-slate-500 font-bold leading-relaxed">
                        Projeto Terapêutico Singular: Para casos complexos, o prontuário serve como plano articulado entre equipe e usuário.
                    </p>
                </div>
            </div>
        </section>

        {/* Módulo 4: Ética e Tecnologia */}
        <section id="etica" className="mb-32 scroll-mt-24">
            <div className="bg-white rounded-[3.5rem] p-10 md:p-20 shadow-xl border border-slate-100 border-t-[12px] border-t-blue-600">
                <div className="flex flex-col md:flex-row gap-16">
                    <div className="md:w-1/3">
                        <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight uppercase leading-tight">Segurança e Ética</h2>
                        <div className="flex flex-col gap-3">
                            <div className="px-4 py-2 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-widest border border-amber-200 inline-block text-center">LGPD: Dados Sensíveis</div>
                            <div className="px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black uppercase tracking-widest border border-blue-200 inline-block text-center">e-SUS APS</div>
                            <div className="px-4 py-2 rounded-full bg-slate-100 text-slate-800 text-[10px] font-black uppercase tracking-widest border border-slate-200 inline-block text-center">PEC vs CDS</div>
                        </div>
                    </div>
                    <div className="md:w-2/3 grid md:grid-cols-2 gap-12">
                        <div className="space-y-2">
                            <h4 className="font-black text-slate-800 uppercase text-sm flex items-center gap-2 tracking-tight"><span className="material-symbols-outlined text-blue-600 text-xl">encrypted</span> Sigilo Absoluto</h4>
                            <p className="text-xs text-slate-500 font-bold leading-relaxed">
                                O prontuário é um documento médico-legal sigiloso. A Lei Geral de Proteção de Dados (LGPD) classifica estes registros como "dados pessoais sensíveis".
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-black text-slate-800 uppercase text-sm flex items-center gap-2 tracking-tight"><span className="material-symbols-outlined text-blue-600 text-xl">devices</span> Tecnologia e-SUS</h4>
                            <p className="text-xs text-slate-500 font-bold leading-relaxed">
                                O Prontuário Eletrônico do Cidadão (PEC) qualifica o registro, elimina erros por caligrafia e gera alertas em tempo real.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-black text-slate-800 uppercase text-sm flex items-center gap-2 tracking-tight"><span className="material-symbols-outlined text-red-500 text-xl">error</span> Erros a Evitar</h4>
                            <p className="text-xs text-slate-600 font-black leading-relaxed">
                                - Cadastros duplicados.<br />
                                - Uso de abreviaturas não padronizadas.<br />
                                - Omissão de sinais vitais essenciais.<br />
                                - Registro puramente clínico (ignorar o social).
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-black text-slate-800 uppercase text-sm flex items-center gap-2 tracking-tight"><span className="material-symbols-outlined text-indigo-600 text-xl">school</span> Papel do Acadêmico</h4>
                            <p className="text-xs text-slate-500 font-bold leading-relaxed italic">
                                Ferramenta de aprendizado do raciocínio clínico. Deve ser feito sob supervisão, com ética inabalável.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Quiz Section */}
        <section id="quiz-container" className="bg-slate-950 text-white rounded-[4rem] p-8 md:p-16 shadow-2xl scroll-mt-24 overflow-hidden relative">
          <div className="max-w-4xl mx-auto relative z-10">
            {!showResults ? (
              <div className="space-y-12 animate-fade-in">
                <div className="text-center">
                  <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Simulação Profissional</span>
                  <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight uppercase">Certificação de Conhecimento</h2>
                  <p className="text-slate-400 max-w-2xl mx-auto font-medium">
                    As questões abaixo simulam situações reais do cotidiano da APS. Prove o seu domínio sobre cadastro e prontuário.
                  </p>
                </div>

                <div className="bg-white text-slate-900 rounded-[3rem] p-8 md:p-14 shadow-2xl relative">
                  {/* Progress Bar */}
                  <div className="mb-12">
                    <div className="flex justify-between items-end mb-4">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Questão {currentQuestion + 1} de {quizData.length}</span>
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
                <div className="size-32 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-2xl mb-10 animate-bounce">
                  <span className="material-symbols-outlined text-6xl font-black">emoji_events</span>
                </div>
                <h2 className="text-5xl font-black mb-4 uppercase tracking-tighter">Estudo Concluído!</h2>
                <p className="text-2xl text-slate-400 mb-12 font-bold uppercase tracking-widest text-sm">
                  Domínio de Sistemas de Informação na APS
                </p>
                <div className="bg-white/10 p-12 rounded-[4rem] border border-white/20 mb-12 w-full max-w-sm">
                  <p className="text-blue-400 text-[10px] mb-2 uppercase font-black tracking-[0.4em]">Aproveitamento</p>
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
             <span className="material-symbols-outlined text-[40rem]">clinical_notes</span>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 text-slate-600 py-16 text-center border-t border-slate-900 no-print">
        <p className="text-[10px] font-black uppercase tracking-[0.3em]">socidéM • Gestão da Informação em Saúde &copy; 2025</p>
        <p className="text-[9px] mt-2 opacity-50 uppercase font-bold tracking-widest">Tecnologia e-SUS APS • Ministério da Saúde</p>
      </footer>
    </div>
  );
};

export default RecordsTool;