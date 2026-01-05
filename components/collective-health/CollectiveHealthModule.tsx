import React, { useState } from 'react';
import FamilyLifeCycleTool from './FamilyLifeCycleTool';
import FamilyConceptTool from './FamilyConceptTool';
import HealthDeterminantsTool from './HealthDeterminantsTool';
import CoelhoSavassiTool from './CoelhoSavassiTool';
import FIROTool from './FIROTool';
import PRACTICETool from './PRACTICETool';
import FamilyAPGARTool from './FamilyAPGARTool';

// Novas ferramentas de Processo de Trabalho
import TerritoryTool from './work-process/TerritoryTool';
import RecordsTool from './work-process/RecordsTool';
import AcolhimentoTool from './work-process/AcolhimentoTool';
import RiskStratificationTool from './work-process/RiskStratificationTool';
import PTSTool from './work-process/PTSTool';
import ProtocolsTool from './work-process/ProtocolsTool';
import TeamWorkTool from './work-process/TeamWorkTool';
import HomeVisitTool from './work-process/HomeVisitTool';
import EducationTool from './work-process/EducationTool';

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

const COLLECTIVE_SECTIONS: Section[] = [
  {
    title: "Instrumentos da USF",
    subtitle: "Abordagem Familiar e Territorial",
    description: "Instrumentos fundamentais para a Estratégia Saúde da Família e abordagem comunitária.",
    tools: [
      { id: 'ciclo-vital', category: "Abordagem Familiar", status: "Disponível", title: "Ciclo de Vida Familiar", description: "Identificação da etapa evolutiva da família e tarefas de desenvolvimento.", icon: "family_restroom", isAvailable: true },
      { id: 'conceito-familiar', category: "Estrutural", status: "Disponível", title: "Conceito Familiar", description: "Leitura de fronteiras, hierarquia e coesão baseada no modelo de Minuchin.", icon: "account_tree", isAvailable: true },
      { id: 'determinantes', category: "Vulnerabilidade", status: "Disponível", title: "Determinantes em Saúde", description: "Índice de vulnerabilidade baseado em fatores biológicos, sociais e ambientais.", icon: "analytics", isAvailable: true },
      { id: 'coelho-savassi', category: "Risco familiar", status: "Disponível", title: "Escala Coelho Savassi", description: "Estratificação de risco familiar na APS para priorização de visitas e cuidado.", icon: "bar_chart", isAvailable: true },
      { id: 'firo', category: "Interpessoal", status: "Disponível", title: "FIRO", description: "Necessidades interpessoais de Inclusão, Controle e Afeição na dinâmica familiar.", icon: "groups", isAvailable: true },
      { id: 'practice', category: "Funcionalidade", status: "Disponível", title: "PRACTICE", description: "Avaliação multidimensional da funcionalidade familiar em oito domínios.", icon: "dashboard_customize", isAvailable: true },
      { id: 'apgar', category: "Satisfação", status: "Disponível", title: "Apgar Familiar", description: "Avaliação rápida da percepção de suporte familiar e detecção de conflitos.", icon: "favorite", isAvailable: true },
    ]
  },
  {
    title: "Processo de Trabalho na APS",
    subtitle: "Organização da Assistência",
    description: "Conceitos e ferramentas para a gestão do cuidado e rotina das equipes multiprofissionais.",
    tools: [
      { id: 'territorio', category: "Comunitária", status: "Disponível", title: "Território", description: "Mapeamento, territorialização e diagnóstico sociossanitário da área de abrangência.", icon: "map", isAvailable: true },
      { id: 'cadastro', category: "Gestão", status: "Disponível", title: "Cadastro e Prontuário", description: "Organização do e-SUS, cadastro individual e familiar e prontuário eletrônico.", icon: "assignment_ind", isAvailable: true },
      { id: 'acolhimento', category: "Acesso", status: "Disponível", title: "Acolhimento", description: "Escuta qualificada e classificação de risco para demanda espontânea na UBS.", icon: "hail", isAvailable: true },
      { id: 'estratificacao', category: "Clínica", status: "Em breve", title: "Estratificação de Risco", description: "Classificação de usuários com condições crônicas (HAS/DM) para fluxos de cuidado.", icon: "equalizer", isAvailable: false },
      { id: 'pts', category: "Cuidado", status: "Em breve", title: "PTS", description: "Elaboração do Plano Terapêutico Singular para casos de alta complexidade biopsicossocial.", icon: "assignment", isAvailable: false },
      { id: 'protocolos', category: "Diretrizes", status: "Em breve", title: "Protocolos da APS", description: "Linhas de cuidado e guias de conduta clínica oficiais do Ministério da Saúde.", icon: "menu_book", isAvailable: false },
      { id: 'equipe', category: "Gestão", status: "Em breve", title: "Trabalho em Equipe", description: "Reuniões de equipe, matriciamento e apoio matricial com o NASF.", icon: "groups_3", isAvailable: false },
      { id: 'visita', category: "Cuidado", status: "Em breve", title: "Visita Domiciliar", description: "Protocolo de atendimento no domicílio e papel de cada categoria profissional.", icon: "home_health", isAvailable: false },
      { id: 'educacao', category: "Promoção", status: "Em breve", title: "Educação em Saúde", description: "Metodologias ativas para grupos operativos e ações comunitárias.", icon: "campaign", isAvailable: false },
    ]
  }
];

const CollectiveHealthModule: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const renderTool = () => {
    switch (activeTool) {
      case 'ciclo-vital': return <FamilyLifeCycleTool onBack={() => setActiveTool(null)} />;
      case 'conceito-familiar': return <FamilyConceptTool onBack={() => setActiveTool(null)} />;
      case 'determinantes': return <HealthDeterminantsTool onBack={() => setActiveTool(null)} />;
      case 'coelho-savassi': return <CoelhoSavassiTool onBack={() => setActiveTool(null)} />;
      case 'firo': return <FIROTool onBack={() => setActiveTool(null)} />;
      case 'practice': return <PRACTICETool onBack={() => setActiveTool(null)} />;
      case 'apgar': return <FamilyAPGARTool onBack={() => setActiveTool(null)} />;
      
      // Processo de Trabalho
      case 'territorio': return <TerritoryTool onBack={() => setActiveTool(null)} />;
      case 'cadastro': return <RecordsTool onBack={() => setActiveTool(null)} />;
      case 'acolhimento': return <AcolhimentoTool onBack={() => setActiveTool(null)} />;
      case 'estratificacao': return <RiskStratificationTool onBack={() => setActiveTool(null)} />;
      case 'pts': return <PTSTool onBack={() => setActiveTool(null)} />;
      case 'protocolos': return <ProtocolsTool onBack={() => setActiveTool(null)} />;
      case 'equipe': return <TeamWorkTool onBack={() => setActiveTool(null)} />;
      case 'visita': return <HomeVisitTool onBack={() => setActiveTool(null)} />;
      case 'educacao': return <EducationTool onBack={() => setActiveTool(null)} />;
      default: return null;
    }
  };

  const toolContent = renderTool();
  if (toolContent) return toolContent;

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
          <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-none">Saúde da Família e Comunidade</h2>
          <p className="text-slate-800 text-xl max-w-3xl font-bold leading-relaxed">
            Arsenal completo de ferramentas para abordagem centrada na pessoa, na família e no território.
          </p>
        </div>
      </header>

      <div id="calculadoras-saude-coletiva" className="space-y-20 pb-20">
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
                <button
                  key={tIdx}
                  onClick={() => tool.isAvailable && setActiveTool(tool.id)}
                  className={`group relative text-left bg-white border-2 p-8 rounded-[2.5rem] transition-all duration-300 shadow-card hover:shadow-strong ${
                    tool.isAvailable 
                    ? 'border-emerald-200 hover:border-emerald-600 hover:-translate-y-1' 
                    : 'border-slate-300 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-start">
                      <div className={`size-14 rounded-2xl flex items-center justify-center border-2 transition-colors ${
                        tool.isAvailable ? 'bg-emerald-50 text-emerald-600 border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white' : 'bg-slate-100 text-slate-400 border-slate-300'
                      }`}>
                        <span className="material-symbols-outlined text-3xl font-black">{tool.icon}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border-2 ${
                        tool.isAvailable ? 'bg-emerald-100 border-emerald-200 text-emerald-700' : 'bg-slate-200 border-slate-300 text-slate-800'
                      }`}>
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
                      <p className="text-sm text-slate-700 font-bold leading-relaxed line-clamp-2">
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
    </div>
  );
};

export default CollectiveHealthModule;