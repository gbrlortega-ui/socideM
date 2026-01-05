
import React from 'react';

interface Tool {
  category: string;
  status: string;
  title: string;
  description: string;
  icon: string;
}

interface Section {
  title: string;
  subtitle: string;
  description: string;
  tools: Tool[];
}

const ADULT_SECTIONS: Section[] = [
  {
    title: "Dados gerais",
    subtitle: "Antropometria e estimativas básicas",
    description: "Ferramentas para avaliação rápida do estado nutricional e estimativa de necessidades calóricas no adulto.",
    tools: [
      { category: "Antropometria", status: "Em breve", title: "IMC – Índice de Massa Corporal", description: "Cálculo de IMC a partir de peso e altura, com classificação em baixo peso, eutrofia, sobrepeso e obesidade.", icon: "straighten" },
      { category: "Antropometria", status: "Em breve", title: "Superfície corporal (SC)", description: "Estimativa da superfície corporal para apoio em ajustes de doses e cálculos diversos.", icon: "aspect_ratio" },
      { category: "Metabolismo", status: "Em breve", title: "TMB / Necessidade calórica diária", description: "Estimativa da taxa metabólica basal e necessidade calórica aproximada para planejamento nutricional básico.", icon: "bolt" },
    ]
  },
  {
    title: "Função renal e metabólica",
    subtitle: "Apoio à interpretação laboratorial",
    description: "Cálculos que ajudam na classificação da função renal, ajuste de doses e interpretação de distúrbios metabólicos.",
    tools: [
      { category: "Função renal", status: "Em breve", title: "Clearance de creatinina (Cockcroft-Gault)", description: "Estimativa do clearance de creatinina para ajuste de dose de diversos medicamentos.", icon: "water_drop" },
      { category: "Função renal", status: "Em breve", title: "TFG estimada (CKD-EPI)", description: "Cálculo simplificado da taxa de filtração glomerular para estadiamento da doença renal crônica.", icon: "biotech" },
    ]
  }
];

const AdultModule: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-8 py-12 flex flex-col gap-14 bg-light-glow min-h-full">
      <header className="flex flex-col gap-5">
        <div className="inline-flex">
          <span className="px-5 py-2 rounded-full bg-blue-100 border-2 border-blue-600 text-blue-900 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-[18px]">person</span>
            MÓDULO ADULTO
          </span>
        </div>
        <div className="space-y-3">
          <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-none">Clínica Médica Adulto</h2>
          <p className="text-slate-800 text-xl max-w-3xl font-bold leading-relaxed">
            Ferramentas de apoio à decisão clínica e protocolos estruturados com base em evidências.
          </p>
        </div>
      </header>

      {ADULT_SECTIONS.map((section, idx) => (
        <section key={idx} className="flex flex-col gap-8">
          <div className="flex flex-col gap-2 border-b-4 border-slate-300 pb-5">
            <div className="flex items-center gap-4">
               <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase">{section.title}</h3>
               <span className="text-blue-700 text-sm font-black uppercase tracking-widest">— {section.subtitle}</span>
            </div>
            <p className="text-slate-700 font-black text-base">{section.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {section.tools.map((tool, tIdx) => (
              <div
                key={tIdx}
                className="group relative bg-white border-2 border-slate-300 p-8 rounded-[2.5rem] transition-all duration-300 shadow-card hover:shadow-strong hover:border-blue-600/50 cursor-wait"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-start">
                    <div className="size-14 rounded-2xl bg-slate-100 flex items-center justify-center text-blue-700 border-2 border-slate-300">
                      <span className="material-symbols-outlined text-3xl font-black">{tool.icon}</span>
                    </div>
                    <span className="px-3 py-1 rounded-lg bg-slate-200 text-[10px] font-black text-slate-800 uppercase tracking-widest border-2 border-slate-300">
                      {tool.status}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-700 block mb-1">
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

export default AdultModule;
