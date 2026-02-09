import React from 'react';
import { PatientType, PediatricSubType } from '../types';

interface GuidanceProps {
  patientType: PatientType;
  subType?: PediatricSubType;
  section: 'history' | 'antecedents' | 'exam';
}

const ClinicalGuidance: React.FC<GuidanceProps> = ({ patientType, subType, section }) => {
  const getGuidance = () => {
    // PEDIATRIA
    if (patientType === PatientType.PEDIATRIC) {
      switch (subType) {
        case PediatricSubType.NEONATE:
          return {
            title: "Foco Neonatal (0-28 dias)",
            items: section === 'antecedents' 
              ? ["Tipo de Parto e APGAR", "Triagens: Pezinho, Orelhinha, Olhinho, Coração", "Peso ao nascer e alta", "Aleitamento Materno Exclusivo"]
              : ["Icterícia neonatal", "Padrão de sono", "Eliminação de mecônio", "Reflexos: Moro, Sucção, Preensão"]
          };
        case PediatricSubType.INFANT:
          return {
            title: "Foco Lactante (29 dias - 2 anos)",
            items: section === 'antecedents'
              ? ["Vacinação (Penta, VIP, Pneumo)", "DNPM: Sustento (3m), Rolar (4m), Sentar (6m)", "Introdução Alimentar (6m)"]
              : ["Ganho de peso/estatura", "Erupção dentária", "Sono e Higiene", "Desenvolvimento motor fino"]
          };
        case PediatricSubType.ADOLESCENT:
          return {
            title: "Foco Adolescente (HEEADSSS)",
            items: ["H: Home (Casa)", "E: Education (Escola)", "E: Eating (Dieta)", "A: Activities (Atividades)", "D: Drugs (Drogas)", "S: Sexuality (Sexualidade)", "S: Suicide (Humor)", "S: Safety (Segurança)", "Marcos Puberais (Tanner)"]
          };
        default: 
          return {
            title: "Puericultura Geral",
            items: ["Crescimento", "Desenvolvimento", "Alimentação", "Vacinação", "Prevenção de acidentes"]
          };
      }
    }

    // ADULTO
    if (patientType === PatientType.ADULT) {
      return {
        title: "Foco Adulto",
        items: section === 'history'
          ? ["P (Provocação/Piora)", "Q (Qualidade)", "R (Região/Irradiação)", "S (Severidade/Escala)", "T (Tempo/Duração)"]
          : ["Risco Cardiovascular", "Hábitos: Tabagismo/Etilismo", "Histórico ocupacional", "Rastreio: Preventivo/Mamografia"]
      };
    }

    // GERIATRIA
    if (patientType === PatientType.GERIATRIC) {
      return {
        title: "Avaliação Geriátrica Ampla (AGA)",
        items: ["Risco Cardiovascular", "Funcionalidade (AVDs e AIVDs)", "Cognição (Mini-Mental/Clock Test)", "Polifarmácia (&gt;5 meds)", "Risco de Quedas", "Suporte Social"]
      };
    }

    return null;
  };

  const guidance = getGuidance();
  if (!guidance) return null;

  return (
    <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-[1.5rem] flex gap-3 animate-fade-in no-print">
      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-primary text-xl">clinical_notes</span>
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">{guidance.title}</p>
        <div className="flex flex-wrap gap-x-3 gap-y-1.5">
          {guidance.items.map((item, i) => (
            <span key={i} className="text-[10px] font-bold text-gray-400 flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
              <span className="w-1 h-1 bg-primary rounded-full shadow-[0_0_5px_#46ec13]"></span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClinicalGuidance;