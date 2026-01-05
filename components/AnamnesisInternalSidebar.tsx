
import React from 'react';
import { FormStep, PatientType, PediatricSubType } from '../types';

interface Props {
  currentStep: FormStep;
  patientType: PatientType;
  pediatricSubType?: PediatricSubType;
  onStepClick: (step: FormStep) => void;
  onGoBack: () => void;
}

// Define the steps to be displayed in the sidebar
const STEPS = [
  { id: FormStep.IDENTIFICATION, label: 'Identificação', icon: 'person' },
  { id: FormStep.QD_HMA, label: 'História Atual', icon: 'history' },
  { id: FormStep.ISDA, label: 'ISDA', icon: 'clinical_notes' },
  { id: FormStep.ANTECEDENTS, label: 'Antecedentes', icon: 'history_edu' },
  { id: FormStep.PHYSICAL_EXAM, label: 'Exame Físico', icon: 'stethoscope' },
  { id: FormStep.SYNTHESIS, label: 'Síntese Clínica', icon: 'psychiatry' },
  { id: FormStep.SUMMARY, label: 'Sumário/Exportar', icon: 'picture_as_pdf' },
];

/**
 * AnamnesisInternalSidebar provides a vertical navigation menu for the structured
 * clinical record form, showing progress and allowing navigation between steps.
 */
const AnamnesisInternalSidebar: React.FC<Props> = ({ 
  currentStep, 
  onStepClick, 
  onGoBack 
}) => {
  return (
    <aside className="w-full lg:w-72 bg-sidebar-dark/40 border-r border-white/5 backdrop-blur-xl flex flex-col no-print h-full shrink-0">
      <div className="p-8 pb-4">
        {/* Back button to return to the category selection */}
        <button 
          onClick={onGoBack}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-white transition-all group mb-6"
        >
          <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
          Voltar ao Início
        </button>
      </div>

      <nav className="flex-1 px-6 space-y-1">
        {STEPS.map((step) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <button
              key={step.id}
              onClick={() => onStepClick(step.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-primary/10 text-primary border border-primary/10' 
                  : 'text-text-secondary hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] ${isActive ? 'filled' : ''}`} style={isActive ? {fontVariationSettings: "'FILL' 1"} : {}}>
                {isCompleted ? 'check_circle' : step.icon}
              </span>
              <span className={`text-[10px] font-black uppercase tracking-widest text-left ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                {step.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Footer information for the sidebar */}
      <div className="p-8 border-t border-white/5">
        <div className="flex flex-col gap-1">
          <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Protocolo</p>
          <p className="text-[11px] font-bold text-white">Exame Estruturado</p>
        </div>
      </div>
    </aside>
  );
};

export default AnamnesisInternalSidebar;
