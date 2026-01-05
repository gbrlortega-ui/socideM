
import React from 'react';

interface Tool {
  category: string;
  status: string;
  title: string;
  description: string;
  icon: string;
  isAvailable?: boolean;
}

interface Section {
  title: string;
  subtitle: string;
  description: string;
  tools: Tool[];
}

const COLLECTIVE_SECTIONS: Section[] = [
  {
    title: "Instrumentos da USF",
    subtitle: "Clique em um item para abrir (Em Breve)",
    description: "Instrumentos de abordagem familiar e territorial fundamentais para a Estratégia Saúde da Família.",
    tools: [
      { category: "Risco familiar", status: "Em breve", title: "Escala Coelho Savassi", description: "Estratificação de risco familiar na Atenção Primária para priorização de visitas.", icon: "bar_chart" },
      { category: "Funcionalidade", status: "Em breve", title: "Apgar Familiar", description: "Percepção de suporte familiar pelo próprio usuário para detecção de conflitos.", icon: "family_restroom" },
      { category: "Contexto", status: "Em breve", title: "Genograma Interativo", description: "Representação gráfica da dinâmica e estrutura familiar em pelo menos três gerações.", icon: "account_tree" },
    ]
  }
];

const CollectiveHealthModule: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-8 py-12 flex flex-col gap-14 bg-light-glow min-h-full">
      <header className="flex flex-col gap-5">
        <div className="inline-flex">
          <span className="px-5 py-2 rounded-full bg-emerald-100 border-2 border-emerald-600 text-emerald-900 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-[18px]">medical_services</span>
            MÓDULO SAÚDE COLETIVA
          </span>
        </div>
        <div className="space-y-3">
          <h2 className="text-5xl font-black text-slate-900 tracking-tight">Saúde da Família e Comunidade</h2>
          <p className="text-slate-800 text-xl max-w-3xl font-bold leading-relaxed">
            Abordagem centrada na pessoa, na família e no território para o internato em APS.
          </p>
        </div>
      </header>

      {COLLECTIVE_SECTIONS.map((section, idx) => (
        <section key={idx} className="flex flex-col gap-8">
          <div className="flex flex-col gap-2 border-b-4 border-slate-300 pb-5">
            <div className="flex items-center gap-4">
               <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase">{section.title}</h3>
               <span className="text-emerald-700 text-sm font-black uppercase tracking-widest">— {section.subtitle}</span>
            </div>
            <p className="text-slate-700 font-black text-base">{section.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {section.tools.map((tool, tIdx) => (
              <div
                key={tIdx}
                className="group relative bg-white border-2 border-slate-300 p-8 rounded-[2.5rem] transition-all duration-300 shadow-card hover:shadow-strong hover:border-emerald-600/50 cursor-wait"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-start">
                    <div className="size-14 rounded-2xl bg-slate-100 flex items-center justify-center text-emerald-600 border-2 border-slate-300">
                      <span className="material-symbols-outlined text-3xl font-black">{tool.icon}</span>
                    </div>
                    <span className="px-3 py-1 rounded-lg bg-slate-200 text-[10px] font-black text-slate-800 uppercase tracking-widest border-2 border-slate-300">
                      {tool.status}
                    </span>
                  </div>
                  
                  <div>
                    <div className="flex flex-col gap-1 mb-3">
                      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700">
                        {tool.category}
                      </span>
                      <h4 className="text-xl font-black text-slate-900 leading-tight">
                        {tool.title}
                      </h4>
                    </div>
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

      <footer className="mt-8 border-t-2 border-slate-200 pt-10 pb-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-600 gap-4 font-black uppercase tracking-widest">
        <p>© socidéM • Medicina Baseada em Evidências</p>
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <p>Atenção Primária à Saúde (APS)</p>
        </div>
      </footer>
    </div>
  );
};

export default CollectiveHealthModule;
