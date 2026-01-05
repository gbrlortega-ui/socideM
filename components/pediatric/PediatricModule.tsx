import React, { useState } from 'react';
import GrowthNutritionTool from './tools/GrowthNutritionTool';
import DoseHydrationTool from './tools/DoseHydrationTool';
import NeonatologyTool from './tools/NeonatologyTool';
import BilirubinTool from './tools/BilirubinTool';
import ClinicalScoresTool from './tools/ClinicalScoresTool';
import PediatricEmergencyTool from './tools/PediatricEmergencyTool';

interface Tool {
  id: string;
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

const PEDIATRIC_SECTIONS: Section[] = [
  {
    title: "Crescimento e Nutrição",
    subtitle: "Antropometria e Z-Scores",
    description: "Avaliação do estado nutricional e desenvolvimento físico conforme padrões da OMS.",
    tools: [
      { id: 'growth', category: "Antropometria", status: "Disponível", title: "Z-Scores e Percentis", description: "Peso, Estatura, IMC e Perímetro Cefálico com interpretação OMS.", icon: "monitoring", isAvailable: true },
      { id: 'sc-ped', category: "Cálculo", status: "Disponível", title: "Superfície Corporal", description: "Cálculos via Mosteller e Haycock adaptados para pediatria.", icon: "aspect_ratio", isAvailable: true },
    ]
  },
  {
    title: "Prescrição e Hidratação",
    subtitle: "Segurança e Manejo Hídrico",
    description: "Cálculos essenciais para evitar erros de dosagem e manter o equilíbrio hidroeletrolítico.",
    tools: [
      { id: 'doses', category: "Farmacologia", status: "Disponível", title: "Dose por Peso (mg/kg)", description: "Cálculo rápido de doses pediátricas com verificação de limites.", icon: "medication", isAvailable: true },
      { id: 'hydration', category: "Hidratação", status: "Disponível", title: "Holliday-Segar e Déficit", description: "Manutenção hídrica e cálculo de desidratação por perda de peso.", icon: "opacity", isAvailable: true },
    ]
  },
  {
    title: "Neonatologia",
    subtitle: "Do Nascimento ao Primeiro Mês",
    description: "Escalas de vitalidade, idade gestacional e triagem de icterícia.",
    tools: [
      { id: 'neo-scales', category: "Vitalidade", status: "Disponível", title: "Apgar, Silverman e Ballard", description: "Avaliação do RN e estimativa de idade gestacional.", icon: "baby_changing_station", isAvailable: true },
      { id: 'bilirubin', category: "Icterícia", status: "Disponível", title: "Bilirrubina Neonatal", description: "Nomograma de risco (Bhutani) e conduta na icterícia.", icon: "lightbulb", isAvailable: true },
    ]
  },
  {
    title: "Scores e Gravidade",
    subtitle: "Apoio à Decisão Clínica",
    description: "Escalas validadas para triagem diagnóstica e monitoramento de alerta.",
    tools: [
      { id: 'pews', category: "Alerta Precoce", status: "Disponível", title: "PEWS (Early Warning)", description: "Score de monitoramento de instabilidade clínica pediátrica.", icon: "notifications_active", isAvailable: true },
      { id: 'clinical-scores', category: "Triagem", status: "Disponível", title: "Alvarado e McIsaac", description: "Triagem para Apendicite e Faringite Estreptocócica.", icon: "assignment", isAvailable: true },
      { id: 'ped-emergency', category: "Urgência", status: "Disponível", title: "Glasgow, Gaso e PRESS", description: "Coma, interpretador ácido-base e gravidade da asma.", icon: "emergency", isAvailable: true },
    ]
  }
];

const PediatricModule: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const renderTool = () => {
    switch (activeTool) {
      case 'growth':
        return <GrowthNutritionTool onBack={() => setActiveTool(null)} initialTab="imc" />;
      case 'sc-ped':
        return <GrowthNutritionTool onBack={() => setActiveTool(null)} initialTab="sc" />;
      case 'doses':
        return <DoseHydrationTool onBack={() => setActiveTool(null)} initialTab="doses" />;
      case 'hydration':
        return <DoseHydrationTool onBack={() => setActiveTool(null)} initialTab="hydration" />;
      case 'neo-scales': return <NeonatologyTool onBack={() => setActiveTool(null)} />;
      case 'bilirubin': return <BilirubinTool onBack={() => setActiveTool(null)} />;
      case 'pews':
      case 'clinical-scores': return <ClinicalScoresTool onBack={() => setActiveTool(null)} />;
      case 'ped-emergency': return <PediatricEmergencyTool onBack={() => setActiveTool(null)} />;
      default: return null;
    }
  };

  if (activeTool) return renderTool();

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-12 flex flex-col gap-14 bg-light-glow min-h-full">
      <header className="flex flex-col gap-5">
        <div className="inline-flex">
          <span className="px-5 py-2 rounded-full bg-rose-100 border-2 border-rose-600 text-rose-900 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-[18px]">child_care</span>
            MÓDULO PEDIÁTRICO
          </span>
        </div>
        <div className="space-y-3">
          <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-none">Puericultura e Pediatria</h2>
          <p className="text-slate-800 text-xl max-w-3xl font-bold leading-relaxed">
            Arsenal completo de ferramentas acadêmicas para suporte à decisão na saúde da criança e do adolescente.
          </p>
        </div>
      </header>

      <div className="space-y-16">
        {PEDIATRIC_SECTIONS.map((section, idx) => (
          <section key={idx} className="flex flex-col gap-8">
            <div className="flex flex-col gap-2 border-b-4 border-slate-300 pb-5">
              <div className="flex items-center gap-4">
                 <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase">{section.title}</h3>
                 <span className="text-rose-700 text-sm font-black uppercase tracking-widest">— {section.subtitle}</span>
              </div>
              <p className="text-slate-700 font-black text-base">{section.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {section.tools.map((tool, tIdx) => (
                <button
                  key={tIdx}
                  onClick={() => tool.isAvailable && setActiveTool(tool.id)}
                  className={`group relative text-left bg-white border-2 p-8 rounded-[2.5rem] transition-all duration-300 shadow-card hover:shadow-strong ${
                    tool.isAvailable 
                    ? 'border-rose-100 hover:border-rose-600 hover:-translate-y-1' 
                    : 'border-slate-300 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-start">
                      <div className={`size-14 rounded-2xl flex items-center justify-center border-2 transition-colors ${
                        tool.isAvailable ? 'bg-rose-50 text-rose-600 border-rose-100 group-hover:bg-rose-600 group-hover:text-white' : 'bg-slate-100 text-slate-400 border-slate-300'
                      }`}>
                        <span className="material-symbols-outlined text-3xl font-black">{tool.icon}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border-2 ${
                        tool.isAvailable ? 'bg-rose-100 border-rose-200 text-rose-700' : 'bg-slate-200 border-slate-300 text-slate-800'
                      }`}>
                        {tool.status}
                      </span>
                    </div>
                    
                    <div>
                      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-rose-700 block mb-1">
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
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-8 border-t-2 border-slate-200 pt-8 pb-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-500 gap-4 font-black uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
          <p>desenvolvido por Gabriel Ortega Antonio</p>
        </div>
      </footer>
    </div>
  );
};

export default PediatricModule;