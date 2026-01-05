import React, { useState } from 'react';
import IMCCalculator from './tools/IMCCalculator';
import RenalFunctionTool from './tools/RenalFunctionTool';
import CardiovascularRiskTool from './tools/CardiovascularRiskTool';
import ASCVDCalculator from './tools/ASCVDCalculator';
import CHA2DS2VAScTool from './tools/CHA2DS2VAScTool';
import HASBLEDTool from './tools/HASBLEDTool';
import RCRITool from './tools/RCRITool';
import ChildPughTool from './tools/ChildPughTool';
import ABGInterpreter from './tools/ABGInterpreter';
import MiscTools from './tools/MiscTools';

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

const ADULT_SECTIONS: Section[] = [
  {
    title: "Risco Cardiovascular",
    subtitle: "Predição e Prevenção",
    description: "Modelos oficiais para estimativa de risco de eventos isquêmicos.",
    tools: [
      { id: 'ascvd', category: "AHA/ACC", status: "Disponível", title: "ASCVD Risk (AHA)", description: "Estimativa de risco em 10 anos via Pooled Cohort Equations.", icon: "monitor_heart", isAvailable: true },
      { id: 'risco-cv', category: "OMS/OPAS", status: "Disponível", title: "Risco Cardiovascular (OMS)", description: "Modelo adaptado para as Américas (PAHO), clínico ou laboratorial.", icon: "favorite", isAvailable: true },
    ]
  },
  {
    title: "Cardiologia e Hematologia",
    subtitle: "Manejo da Fibrilação Atrial e Risco",
    description: "Decisões sobre anticoagulação e risco hemorrágico.",
    tools: [
      { id: 'chads-vasc', category: "AVC", status: "Disponível", title: "CHA₂DS₂-VASc", description: "Risco embólico em pacientes com FA não valvar.", icon: "reorder", isAvailable: true },
      { id: 'has-bled', category: "Sangramento", status: "Disponível", title: "HAS-BLED", description: "Avaliação de risco hemorrágico em anticoagulados.", icon: "bloodtype", isAvailable: true },
    ]
  },
  {
    title: "Nefrologia e Metabolismo",
    subtitle: "Apoio Diagnóstico",
    description: "Estadiamento de DRC e interpretação ácido-base.",
    tools: [
      { id: 'funcao-renal', category: "Função Renal", status: "Disponível", title: "CKD-EPI e Clearance", description: "TFG estimada (2021) e Cockcroft-Gault para fármacos.", icon: "water_drop", isAvailable: true },
      { id: 'gasometria', category: "Equilíbrio Ácido-Base", status: "Disponível", title: "Gasometria Arterial", description: "Interpretador com cálculos de compensação respiratória/metabólica.", icon: "air", isAvailable: true },
    ]
  },
  {
    title: "Escores Prognósticos",
    subtitle: "Risco Cirúrgico e Organopatias",
    description: "Ferramentas para estratificação de gravidade.",
    tools: [
      { id: 'rcri', category: "Perioperatório", status: "Disponível", title: "Índice de Lee (RCRI)", description: "Risco cardíaco para cirurgias não cardíacas.", icon: "surgical", isAvailable: true },
      { id: 'child-pugh', category: "Hepatologia", status: "Disponível", title: "Escore Child-Pugh", description: "Avaliação prognóstica na cirrose hepática.", icon: "medication", isAvailable: true },
    ]
  },
  {
    title: "Antropometria",
    subtitle: "Dados Biométricos",
    description: "Cálculos básicos de estado nutricional.",
    tools: [
      { id: 'imc-metabolismo', category: "Nutrição", status: "Disponível", title: "IMC e TMB", description: "Índice de Massa Corporal e Taxa Metabólica Basal (Harris-Benedict).", icon: "straighten", isAvailable: true },
      { id: 'misc-tools', category: "Misc", status: "Disponível", title: "PAM e Outros", description: "Pressão Arterial Média e Razão Cintura-Quadril.", icon: "calculate", isAvailable: true },
    ]
  }
];

const AdultModule: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const renderTool = () => {
    switch (activeTool) {
      case 'imc-metabolismo': return <IMCCalculator onBack={() => setActiveTool(null)} />;
      case 'funcao-renal': return <RenalFunctionTool onBack={() => setActiveTool(null)} />;
      case 'risco-cv': return <CardiovascularRiskTool onBack={() => setActiveTool(null)} />;
      case 'ascvd': return <ASCVDCalculator onBack={() => setActiveTool(null)} />;
      case 'chads-vasc': return <CHA2DS2VAScTool onBack={() => setActiveTool(null)} />;
      case 'has-bled': return <HASBLEDTool onBack={() => setActiveTool(null)} />;
      case 'rcri': return <RCRITool onBack={() => setActiveTool(null)} />;
      case 'child-pugh': return <ChildPughTool onBack={() => setActiveTool(null)} />;
      case 'gasometria': return <ABGInterpreter onBack={() => setActiveTool(null)} />;
      case 'misc-tools': return <MiscTools onBack={() => setActiveTool(null)} />;
      default: return null;
    }
  };

  const activeContent = renderTool();
  if (activeContent) return activeContent;

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
            Ferramentas de apoio à decisão clínica e interpretadores baseados em evidências.
          </p>
        </div>
      </header>

      <div className="space-y-16">
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
                <button
                  key={tIdx}
                  onClick={() => tool.isAvailable && setActiveTool(tool.id)}
                  className={`group relative text-left bg-white border-2 p-8 rounded-[2.5rem] transition-all duration-300 shadow-card hover:shadow-strong ${
                    tool.isAvailable 
                    ? 'border-blue-100 hover:border-blue-600 hover:-translate-y-1' 
                    : 'border-slate-300 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-start">
                      <div className={`size-14 rounded-2xl flex items-center justify-center border-2 transition-colors ${
                        tool.isAvailable ? 'bg-blue-50 text-blue-600 border-blue-100 group-hover:bg-blue-600 group-hover:text-white' : 'bg-slate-100 text-slate-400 border-slate-300'
                      }`}>
                        <span className="material-symbols-outlined text-3xl font-black">{tool.icon}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border-2 ${
                        tool.isAvailable ? 'bg-blue-100 border-blue-200 text-blue-700' : 'bg-slate-200 border-slate-300 text-slate-800'
                      }`}>
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

export default AdultModule;