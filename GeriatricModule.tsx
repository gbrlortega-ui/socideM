
import React from 'react';

const GERIATRIC_SECTIONS = [
  {
    title: "Funcionalidade e Autonomia",
    subtitle: "Atividades de Vida Diária (AVD)",
    description: "Instrumentos para avaliar a independência funcional e riscos sociais na pessoa idosa.",
    tools: [
      { category: "Escala", status: "Em breve", title: "Índice de Katz", description: "Avaliação de independência em autocuidado básico (banho, vestir, higiene).", icon: "accessibility_new" },
      { category: "Escala", status: "Em breve", title: "Lawton & Brody", description: "Avaliação de atividades instrumentais (finanças, transporte, medicação).", icon: "home_repair_service" }
    ]
  }
];

const GeriatricModule: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-8 py-12 flex flex-col gap-14 bg-light-glow min-h-full">
      <header className="flex flex-col gap-5">
        <div className="inline-flex">
          <span className="px-5 py-2 rounded-full bg-purple-600 text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg shadow-purple-500/20">
            <span className="material-symbols-outlined text-[18px]">elderly</span>
            MÓDULO GERIÁTRICO
          </span>
        </div>
        <div className="space-y-3">
          <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-none">Saúde da Pessoa Idosa</h2>
          <p className="text-slate-700 text-xl max-w-3xl font-bold leading-relaxed">
            Avaliação Geriátrica Ampla (AGA) e escalas de fragilidade.
          </p>
        </div>
      </header>

      {GERIATRIC_SECTIONS.map((section, idx) => (
        <section key={idx} className="flex flex-col gap-8">
          <div className="flex flex-col gap-2 border-b-2 border-slate-300 pb-5">
            <div className="flex items-center gap-4">
               <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase">{section.title}</h3>
               <span className="text-purple-600 text-sm font-black uppercase tracking-widest">— {section.subtitle}</span>
            </div>
            <p className="text-slate-600 font-bold text-base">{section.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {section.tools.map((tool, tIdx) => (
              <div
                key={tIdx}
                className="group relative bg-white border-2 border-slate-300 p-8 rounded-[2.5rem] transition-all duration-300 opacity-80 hover:opacity-100 hover:border-purple-400 shadow-lg hover:shadow-2xl cursor-wait"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-start">
                    <div className="size-14 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100">
                      <span className="material-symbols-outlined text-3xl font-bold">{tool.icon}</span>
                    </div>
                    <span className="px-3 py-1 rounded-lg bg-slate-200 text-[10px] font-black text-slate-700 uppercase tracking-widest border border-slate-300">
                      {tool.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-purple-600 block mb-1">
                      {tool.category}
                    </span>
                    <h4 className="text-xl font-black text-slate-900 leading-tight mb-3">
                      {tool.title}
                    </h4>
                    <p className="text-sm text-slate-700 font-bold leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default GeriatricModule;
