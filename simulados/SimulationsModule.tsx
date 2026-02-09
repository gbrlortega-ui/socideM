import React, { useState, useEffect, useMemo } from 'react';
import SimulationCard from './SimulationCard';

// Importação direta dos bancos convertidos para TS
import { clinicaQuestions } from './questions/clinica';
import { cirurgiaQuestions } from './questions/cirurgia';
import { pediatriaQuestions } from './questions/pediatria';
import { goQuestions } from './questions/go';
import { saudeQuestions } from './questions/saude';

interface Question {
  id: number;
  enunciado: string;
  alternativas: string[];
  correta: number;
  explicacao: string;
}

const AREAS = [
  { id: 'clinica', category: 'Simulado', status: 'Disponível', title: 'Clínica Médica', description: 'Banco unificado 2024/2025 focado em condutas clínicas e diagnósticos.', icon: 'medical_information' },
  { id: 'cirurgia', category: 'Simulado', status: 'Disponível', title: 'Cirurgia Geral', description: 'Trauma, abdome agudo e pré-operatório. Questões comentadas.', icon: 'surgical' },
  { id: 'pediatria', category: 'Simulado', status: 'Disponível', title: 'Pediatria', description: 'Puericultura, neonatologia e emergências infantis estruturadas.', icon: 'child_care' },
  { id: 'go', category: 'Simulado', status: 'Disponível', title: 'Gineco & Obstetrícia', description: 'Saúde da mulher, pré-natal e patologias ginecológicas.', icon: 'pregnant_woman' },
  { id: 'saude-comunidade', category: 'Simulado', status: 'Disponível', title: 'Saúde Coletiva', description: 'SUS, epidemiologia e medicina de família e comunidade.', icon: 'groups' },
];

const SimulationsModule: React.FC = () => {
  const [activeArea, setActiveArea] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [customQuestions, setCustomQuestions] = useState<Question[]>([]);

  // Mapeamento das questões
  const questions: Question[] = useMemo(() => {
    if (activeArea?.startsWith('compiled-')) {
      return customQuestions;
    }
    switch (activeArea) {
      case 'clinica': return clinicaQuestions;
      case 'cirurgia': return cirurgiaQuestions;
      case 'pediatria': return pediatriaQuestions;
      case 'go': return goQuestions;
      case 'saude-comunidade': return saudeQuestions;
      default: return [];
    }
  }, [activeArea, customQuestions]);

  useEffect(() => {
    let timer: number;
    if (activeArea && !showResults && questions.length > 0) {
      timer = window.setInterval(() => setTimeSpent(t => t + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [activeArea, showResults, questions]);

  const handleStart = (id: string) => {
    setActiveArea(id);
    setCurrentIdx(0);
    setAnswers({});
    setShowResults(false);
    setTimeSpent(0);
  };

  const handleStartCompiled = (count: number) => {
    const all = [
      ...clinicaQuestions,
      ...cirurgiaQuestions,
      ...pediatriaQuestions,
      ...goQuestions,
      ...saudeQuestions
    ];
    
    // Shuffle e slice
    const shuffled = [...all].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);
    
    setCustomQuestions(selected);
    setActiveArea(`compiled-${count}`);
    setCurrentIdx(0);
    setAnswers({});
    setShowResults(false);
    setTimeSpent(0);
  };

  const handleAnswer = (val: number) => {
    if (answers[currentIdx] !== undefined) return;
    setAnswers(prev => ({ ...prev, [currentIdx]: val }));
  };

  const hits = useMemo(() => {
    return Object.entries(answers).filter(([idx, val]) => val === questions[Number(idx)]?.correta).length;
  }, [answers, questions]);

  const errors = useMemo(() => {
    return Object.entries(answers).filter(([idx, val]) => val !== questions[Number(idx)]?.correta).length;
  }, [answers, questions]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  if (activeArea && questions.length > 0 && !showResults) {
    const q = questions[currentIdx];
    const userAnswer = answers[currentIdx];
    const isAnswered = userAnswer !== undefined;

    return (
      <div className="flex h-full bg-slate-100 overflow-hidden animate-fade-in font-display">
        {/* SIDEBAR ESQUERDA - PAINEL DE ACERTOS */}
        <aside className="w-80 bg-white border-r-2 border-slate-200 hidden xl:flex flex-col shadow-xl z-20 overflow-y-auto custom-scrollbar">
          <div className="p-8 space-y-8">
            <header className="space-y-1">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-tighter">Desempenho Atual</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {activeArea.startsWith('compiled') 
                  ? `Compilado ${activeArea.split('-')[1]} Questões` 
                  : AREAS.find(a => a.id === activeArea)?.title}
              </p>
            </header>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-emerald-50 border-2 border-emerald-100 p-4 rounded-2xl text-center">
                <p className="text-[9px] font-black text-emerald-600 uppercase mb-1">Acertos</p>
                <p className="text-3xl font-black text-emerald-700">{hits}</p>
              </div>
              <div className="bg-rose-50 border-2 border-rose-100 p-4 rounded-2xl text-center">
                <p className="text-[9px] font-black text-rose-600 uppercase mb-1">Erros</p>
                <p className="text-3xl font-black text-rose-700">{errors}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Questões</span>
                 <span className="text-[10px] font-black text-slate-900">{Math.round((Object.keys(answers).length / questions.length) * 100)}%</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {questions.map((_, i) => {
                  const ans = answers[i];
                  let bg = "bg-slate-100 text-slate-400 border-slate-200";
                  if (ans !== undefined) bg = ans === questions[i].correta ? "bg-emerald-500 text-white" : "bg-rose-500 text-white";
                  else if (i === currentIdx) bg = "bg-white text-amber-600 border-amber-500 ring-2 ring-amber-50";

                  return (
                    <button key={i} onClick={() => setCurrentIdx(i)} className={`size-10 rounded-xl border-2 text-[11px] font-black flex items-center justify-center transition-all ${bg}`}>
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            <button onClick={() => window.confirm("Finalizar?") && setShowResults(true)} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest">
              Finalizar Simulado
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-6 lg:p-12 relative custom-scrollbar">
          <div className="max-w-4xl mx-auto space-y-10 pb-20">
            <header className="flex justify-between items-center">
               <button onClick={() => setActiveArea(null)} className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-rose-600">
                  <span className="material-symbols-outlined text-sm">close</span> Sair do Simulado
               </button>
               <div className="flex gap-4 items-center">
                  <span className="font-black text-slate-900 font-mono">{formatTime(timeSpent)}</span>
               </div>
            </header>

            <section className="space-y-8">
               <div className="bg-white p-10 lg:p-14 rounded-[3rem] border-2 border-slate-200 shadow-card">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest mb-6">QUESTÃO {currentIdx + 1}</span>
                  <p className="text-xl lg:text-2xl font-bold text-slate-800 leading-relaxed">
                    {q.enunciado}
                  </p>
               </div>

               <div className="grid grid-cols-1 gap-4">
                  {q.alternativas.map((alt, i) => {
                    const isCorrect = q.correta === i;
                    const isUserPick = userAnswer === i;
                    let style = "border-slate-200 bg-white text-slate-700 hover:border-amber-400 hover:bg-slate-50";
                    if (isAnswered) {
                      if (isCorrect) style = "border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-100";
                      else if (isUserPick) style = "border-rose-500 bg-rose-50 text-rose-900";
                      else style = "opacity-40 border-slate-100 grayscale";
                    }
                    return (
                      <button key={i} disabled={isAnswered} onClick={() => handleAnswer(i)} className={`p-6 rounded-[2rem] border-2 text-left transition-all flex items-start gap-5 ${style}`}>
                        <span className={`size-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${isAnswered && isCorrect ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="font-bold text-base lg:text-lg pt-1.5">{alt}</span>
                      </button>
                    );
                  })}
               </div>

               {isAnswered && (
                 <div className="bg-slate-900 text-white p-10 lg:p-14 rounded-[3.5rem] space-y-8 animate-zoom-in relative overflow-hidden shadow-2xl">
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 text-amber-400 mb-6">
                         <span className="material-symbols-outlined font-black">lightbulb</span>
                         <h4 className="text-sm font-black uppercase tracking-[0.2em]">Comentário Acadêmico</h4>
                      </div>
                      <p className="text-base lg:text-lg text-slate-300 font-medium leading-relaxed italic border-l-4 border-amber-500 pl-6">
                        {q.explicacao}
                      </p>
                      <div className="pt-10 flex justify-end">
                         <button onClick={() => currentIdx < questions.length - 1 ? setCurrentIdx(currentIdx + 1) : setShowResults(true)} className="px-12 py-5 bg-amber-500 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3">
                           {currentIdx < questions.length - 1 ? 'Próxima Questão' : 'Ver Resultado Final'}
                           <span className="material-symbols-outlined text-sm">arrow_forward</span>
                         </button>
                      </div>
                    </div>
                 </div>
               )}
            </section>
          </div>
        </main>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="max-w-[800px] mx-auto px-8 py-20 flex flex-col gap-12 items-center text-center bg-light-glow min-h-full">
         <header className="space-y-6">
            <div className="size-32 bg-amber-100 text-amber-600 rounded-[3rem] flex items-center justify-center mx-auto shadow-inner border-2 border-amber-200">
               <span className="material-symbols-outlined text-7xl font-black">emoji_events</span>
            </div>
            <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tighter">Simulado Concluído</h2>
            <p className="text-slate-500 font-bold text-xl">
              {activeArea?.startsWith('compiled') 
                ? `Mix Interdisciplinar (${activeArea.split('-')[1]} questões)` 
                : AREAS.find(a => a.id === activeArea)?.title}
            </p>
         </header>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <div className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-200 shadow-card">
               <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Acertos</p>
               <p className="text-5xl font-black text-emerald-600">{hits}/{questions.length}</p>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-200 shadow-card">
               <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Aproveitamento</p>
               <p className="text-5xl font-black text-amber-600">{Math.round((hits / questions.length) * 100)}%</p>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-200 shadow-card">
               <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Tempo Total</p>
               <p className="text-5xl font-black text-slate-900 font-mono">{formatTime(timeSpent)}</p>
            </div>
         </div>
         <div className="flex gap-4">
            <button onClick={() => setActiveArea(null)} className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl">Voltar ao Centro</button>
            <button 
              onClick={() => activeArea?.startsWith('compiled') ? handleStartCompiled(parseInt(activeArea.split('-')[1])) : handleStart(activeArea!)} 
              className="px-12 py-5 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg"
            >
              Refazer Simulado
            </button>
         </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-12 flex flex-col gap-14 bg-light-glow min-h-full">
      <header className="flex flex-col gap-5">
        <div className="inline-flex">
          <span className="px-5 py-2 rounded-full bg-amber-100 border-2 border-amber-600 text-amber-900 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">quiz</span>
            CENTRO DE TREINAMENTO
          </span>
        </div>
        <div className="space-y-3">
          <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-none">Simulados Unificados</h2>
          <p className="text-slate-800 text-xl max-w-3xl font-bold leading-relaxed">
            Prepare-se para o internato e residência com o banco de questões 2024/2025.
          </p>
        </div>
      </header>

      {/* QUICK START COMPILED MODES */}
      <section className="bg-slate-900 p-10 rounded-[3rem] shadow-strong space-y-8 text-white relative overflow-hidden group">
         <div className="absolute -top-10 -right-10 size-40 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all duration-700"></div>
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
            <div className="space-y-2">
               <h3 className="text-2xl font-black uppercase tracking-tight">Simulado Geral Compilado</h3>
               <p className="text-slate-400 font-bold text-sm">Sorteio aleatório de questões de todas as especialidades.</p>
            </div>
            <div className="flex flex-wrap gap-3">
               {[20, 40, 60].map(n => (
                  <button 
                    key={n}
                    onClick={() => handleStartCompiled(n)}
                    className="px-6 py-4 bg-white/10 hover:bg-amber-500 text-white hover:text-slate-900 border border-white/20 rounded-2xl font-black text-xs uppercase tracking-widest transition-all transform hover:scale-105 active:scale-95"
                  >
                    {n} Questões
                  </button>
               ))}
            </div>
         </div>
      </section>

      <div id="motores-simulados" className="space-y-12">
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2 border-b-4 border-slate-300 pb-5">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Por Especialidade</h3>
            <p className="text-slate-700 font-black text-base">Foque o seu estudo em áreas específicas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-20">
            {AREAS.map((area) => (
              <SimulationCard key={area.id} {...area} onClick={handleStart} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SimulationsModule;