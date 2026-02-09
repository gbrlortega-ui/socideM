
import React from 'react';
import { FormStep, PatientType } from '../types';

interface NavigationProps {
  currentStep: FormStep;
  patientType: PatientType;
  onNext: () => void;
  onPrev: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentStep, patientType, onNext, onPrev }) => {
  const isFirstStep = currentStep === FormStep.IDENTIFICATION;
  const isLastStep = currentStep === FormStep.SUMMARY;

  return (
    <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/5 no-print">
      <button
        onClick={onPrev}
        disabled={isFirstStep}
        className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
          isFirstStep 
            ? 'text-gray-600 cursor-not-allowed opacity-50' 
            : 'text-white hover:bg-white/5 border border-white/5'
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Anterior
      </button>
      
      {!isLastStep && (
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-8 py-3 bg-primary text-background-dark rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
        >
          Próximo Passo
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      )}
    </div>
  );
};

export default Navigation;
