import React, { useState } from 'react';
import FunctionalityTool from './tools/FunctionalityTool';
import CognitionMoodTool from './tools/CognitionMoodTool';
import FrailtyNutritionTool from './tools/FrailtyNutritionTool';
import MobilityFallsTool from './tools/MobilityFallsTool';
import NutritionTool from './tools/NutritionTool';
import ClinicalRiskTool from './tools/ClinicalRiskTool';
import GeriatricPharmacyTool from './tools/GeriatricPharmacyTool';
import IVCF20Tool from './tools/IVCF20Tool';

interface Tool {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: string;
  component: string;
}

interface Section {
  title: string;
  tools: Tool[];
}

const SECTIONS: Section[] = [
  {
    title: "Triagem Inicial e Multidimensional",
    tools: [
      { id: 'ivcf20', category: "Protocolo Ouro", title: "IVCF-20 Oficial", description: "Índice de Vulnerabilidade Clínico-Funcional. Primeiro passo da avaliação.", icon: "analytics", component: "ivcf20" },
    ]
  },
  {
    title: "Funcionalidade e Autonomia",
    tools: [
      { id: 'katz', category: "AVD", title: "Escala de Katz", description: "Avaliação de independência em atividades básicas.", icon: "accessibility_new", component: "functionality" },
      { id: 'lawton', category: "AIVD", title: "Lawton-Brody", description: "Atividades instrumentais e vida comunitária.", icon: "home_repair_service", component: "functionality" },
      { id: 'barthel', category: "Dependência", title: "Índice de Barthel", description: "Grau de assistência física necessária.", icon: "wheelchair_pickup", component: "functionality" },
    ]
  },
  {
    title: "Cognição e Humor",
    tools: [
      { id: 'mmse', category: "Rastreio", title: "Mini-Mental (MEEM)", description: "Questionário completo de estado mental.", icon: "psychology", component: "cognition" },
      { id: 'moca', category: "Rastreio", title: "Montreal (MoCA)", description: "Avaliação de déficit cognitivo leve.", icon: "neurology", component: "cognition" },
      { id: 'clock', category: "Executivo", title: "Teste do Relógio", description: "Funções executivas e visuoespaciais.", icon: "schedule", component: "cognition" },
      { id: 'gds', category: "Humor", title: "GDS-15 (Yesavage)", description: "Rastreio de depressão geriátrica.", icon: "sentiment_dissatisfied", component: "cognition" },
    ]
  },
  {
    title: "Mobilidade e Quedas",
    tools: [
      { id: 'tug', category: "Mobilidade", title: "Timed Up and Go (TUG)", description: "Risco de quedas e mobilidade básica.", icon: "directions_walk", component: "mobility" },
      { id: 'sit-stand', category: "Força", title: "Sentar e Levantar 5x", description: "Força de membros inferiores.", icon: "airline_seat_recline_extra", component: "mobility" },
      { id: 'gait-speed', category: "Marcha", title: "Velocidade de Marcha", description: "Velocidade em 4 metros (m/s).", icon: "speed", component: "mobility" },
      { id: 'falls', category: "Risco", title: "Risco de Quedas", description: "Checklist de fatores de risco intrínsecos.", icon: "report_problem", component: "mobility" },
    ]
  },
  {
    title: "Fragilidade e Nutrição",
    tools: [
      { id: 'fried', category: "Fenótipo", title: "Fragilidade de Fried", description: "Critérios de fragilidade física.", icon: "elderly", component: "frailty" },
      { id: 'cfs', category: "Escala Visual", title: "Clinical Frailty (CFS)", description: "Escala visual de 1 a 9.", icon: "blind", component: "frailty" },
      { id: 'mna', category: "Nutrição", title: "MNA (Triagem)", description: "Mini Avaliação Nutricional.", icon: "restaurant", component: "nutrition" },
      { id: 'imc', category: "Biometria", title: "IMC em Idosos", description: "Classificação específica para idosos.", icon: "straighten", component: "nutrition" },
    ]
  },
  {
    title: "Risco Clínico e Prognóstico",
    tools: [
      { id: 'charlson', category: "Comorbidade", title: "Índice de Charlson", description: "Predição de sobrevida em 10 anos.", icon: "query_stats", component: "risk" },
      { id: 'braden', category: "Pele", title: "Escala de Braden", description: "Risco de lesão por pressão.", icon: "healing", component: "risk" },
      { id: 'pps', category: "Paliativos", title: "Escala PPS", description: "Palliative Performance Scale.", icon: "favorite", component: "risk" },
    ]
  },
  {
    title: "Farmacologia e Cardio-Renal",
    tools: [
      { id: 'beers', category: "Segurança", title: "Beers 2023", description: "Medicamentos inapropriados.", icon: "block", component: "pharmacy" },
      { id: 'stopp', category: "Segurança", title: "STOPP/START", description: "Otimização da prescrição.", icon: "medication", component: "pharmacy" },
      { id: 'renal', category: "Renal", title: "Cockcroft-Gault", description: "Clearance para ajuste de dose.", icon: "water_drop", component: "pharmacy" },
      { id: 'chads', category: "Cardio", title: "CHA₂DS₂-VASc", description: "Risco de AVC na FA.", icon: "reorder", component: "pharmacy" },
      { id: 'hasbled', category: "Cardio", title: "HAS-BLED", description: "Risco de sangramento.", icon: "bloodtype", component: "pharmacy" },
    ]
  }
];

const GeriatricModule: React.FC = () => {
  const [selection, setSelection] = useState<{ comp: string; id: string } | null>(null);

  const renderTool = () => {
    if (!selection) return null;
    const props = { onBack: () => setSelection(null), initialTab: selection.id };
    
    switch (selection.comp) {
      case 'functionality': return <FunctionalityTool onBack={props.onBack} initialScale={selection.id as any} />;
      case 'cognition': return <CognitionMoodTool onBack={props.onBack} initialTab={selection.id as any} />;
      case 'frailty': return <FrailtyNutritionTool onBack={props.onBack} initialTab={selection.id as any} />;
      case 'ivcf20': return <IVCF20Tool onBack={props.onBack} />;
      case 'mobility': return <MobilityFallsTool onBack={props.onBack} initialTab={selection.id as any} />;
      case 'nutrition': return <NutritionTool onBack={props.onBack} initialTab={selection.id as any} />;
      case 'risk': return <ClinicalRiskTool onBack={props.onBack} initialTab={selection.id as any} />;
      case 'pharmacy': return <GeriatricPharmacyTool onBack={props.onBack} initialTab={selection.id as any} />;
      default: return null;
    }
  };

  if (selection) return renderTool();

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-12 flex flex-col gap-14 bg-light-glow min-h-full">
      <header className="flex flex-col gap-5">
        <div className="inline-flex">
          <span className="px-5 py-2 rounded-full bg-purple-100 border-2 border-purple-600 text-purple-900 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-[18px]">elderly</span>
            AGA • AVALIAÇÃO GERIÁTRICA AMPLA
          </span>
        </div>
        <div className="space-y-3">
          <h2 className="text-5xl font-black text-slate-900 tracking-tight">Painel de Escalas Geriátricas</h2>
          <p className="text-slate-800 text-xl max-w-3xl font-bold leading-relaxed">
            Ferramentas acadêmicas para o suporte à decisão clínica e funcional na saúde da pessoa idosa.
          </p>
        </div>
      </header>

      <div className="space-y-16 pb-20">
        {SECTIONS.map((section, idx) => (
          <div key={idx} className="space-y-8">
            <div className="flex items-center gap-4 border-b-4 border-slate-200 pb-4">
               <h3 className="text-2xl font-black text-slate-900 uppercase tracking-widest">{section.title}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {section.tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setSelection({ comp: tool.component, id: tool.id })}
                  className={`group relative bg-white border-2 p-6 rounded-[2rem] transition-all duration-300 shadow-card hover:shadow-strong hover:-translate-y-1 text-left flex flex-col gap-4 ${tool.id === 'ivcf20' ? 'border-purple-600 ring-4 ring-purple-50' : 'border-slate-200 hover:border-purple-600'}`}
                >
                  <div className="flex justify-between items-start">
                    <div className={`size-12 rounded-2xl flex items-center justify-center transition-all ${tool.id === 'ivcf20' ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-600 border border-purple-100 group-hover:bg-purple-600 group-hover:text-white'}`}>
                      <span className="material-symbols-outlined text-2xl font-black">{tool.icon}</span>
                    </div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{tool.category}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900 leading-tight mb-1 group-hover:text-purple-700 transition-colors">{tool.title}</h4>
                    <p className="text-xs text-slate-500 font-bold leading-relaxed line-clamp-2">{tool.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeriatricModule;