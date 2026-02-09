
import React, { useState } from 'react';

const PTSTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeStep, setActiveStep] = useState(0);

  const PTS_STEPS = [
    { title: "Diagnóstico", icon: "search", desc: "Análise do caso em todas as dimensões: biológica, subjetiva e social. Não foca apenas na doença, mas no sujeito." },
    { title: "Metas", icon: "flag", desc: "Definição de objetivos de curto, médio e longo prazo, negociados com o usuário e sua família." },
    { title: "Responsáveis", icon: "groups", desc: "Divisão clara de quem faz o quê. Envolve a equipe de referência, o NASF e a rede intersetorial." },
    { title: "Reavaliação", icon: "update", desc: "O PTS é dinâmico. Deve-se pactuar uma data para rever condutas e celebrar conquistas." }
  ];

  return (
    <div className="min-h-full bg-slate-50 flex flex-col font-sans no-print-bg">
      <header className="bg-gradient-to-br from-indigo-900 to-indigo-700 text-white py-24 px-6 relative overflow-hidden shadow-2xl">
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <button onClick={onBack} className="absolute top-0 left-0 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all flex items-center gap-2 text-xs font-bold no-print">
            <span className="material-symbols-outlined text-sm">arrow_back</span> VOLTAR
          </button>
          <span className="inline-block bg-indigo-400/20 text-indigo-50 px-4 py-1.5 rounded-full text-[10px] font-black mb-6 tracking-widest uppercase border border-indigo-400/30">
            Avançado • Clínica Ampliada
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">
            Projeto Terapêutico <br className="hidden md:block" /> Singular (PTS)
          </h1>
          <p className="text-xl md:text-2xl opacity-90 font-light max-w-3xl mx-auto">
            A ferramenta máxima para o cuidado de casos complexos e de alta vulnerabilidade na Atenção Primária.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-20 flex-1 w-full">
        <section className="mb-32">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-8">O que é o PTS?</h2>
              <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
                É um conjunto de propostas de condutas terapêuticas articuladas, para um sujeito individual ou coletivo, resultado da discussão coletiva de uma equipe multidisciplinar.
              </p>
              <div className="p-8 bg-indigo-50 rounded-[2.5rem] border-2 border-indigo-100 flex gap-5">
                <span className="material-symbols-outlined text-indigo-600 text-4xl">psychology</span>
                <p className="text-sm font-bold text-indigo-900 leading-relaxed italic">
                  "O PTS é indicado quando o modelo de consulta comum não é suficiente para resolver a complexidade do sofrimento do usuário."
                </p>
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-1 gap-4">
              {PTS_STEPS.map((step, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`p-6 rounded-3xl border-2 transition-all flex items-center gap-6 text-left ${activeStep === i ? 'bg-white border-indigo-600 shadow-xl' : 'bg-slate-50 border-slate-100'}`}
                >
                  <div className={`size-12 rounded-2xl flex items-center justify-center ${activeStep === i ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
                    <span className="material-symbols-outlined">{step.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 uppercase text-sm">{step.title}</h4>
                    {activeStep === i && <p className="text-xs text-slate-500 font-bold mt-2 animate-fade-in">{step.desc}</p>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-900 text-white rounded-[4rem] p-12 md:p-20 shadow-2xl relative overflow-hidden text-center">
            <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter">Matriciamento</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium mb-12">O PTS ganha potência quando articulado com o apoio matricial (NASF, CAPS), unindo o saber da equipe de referência com o saber especializado.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest">Saúde Mental</span>
              <span className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest">Serviço Social</span>
              <span className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest">Fisioterapia</span>
              <span className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest">Nutrição</span>
            </div>
        </section>
      </main>
    </div>
  );
};

export default PTSTool;
