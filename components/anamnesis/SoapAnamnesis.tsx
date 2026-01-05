
import React, { useState } from 'react';
import { PatientType, ClinicalRecord } from '../../types';
// Fix: Ensure SoapSection is imported correctly.
import SoapSection from '../SoapSection';
import SummarySection from '../SummarySection';

interface Props {
  onBack: () => void;
}

const SOAP_STEPS_COUNT = 5;

export default function SoapAnamnesis({ onBack }: Props) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  // Fix: Added missing mandatory 'habitos' property to satisfy ClinicalRecord interface.
  const [record, setRecord] = useState<ClinicalRecord>({
    id: { nome: '', idade: '', sexo: '', profissao: '', naturalidade: '', residencia: '', cor: '', estadoCivil: '' },
    patientType: PatientType.SOAP,
    isda: {},
    antecedentes: {},
    habitos: {},
    exameFisico: { 
      sinaisVitais: { pa: '', fc: '', fr: '', sat: '', temp: '', peso: '', estatura: '', pc: '', imc: '' },
      geral: '', peleAnexos: '', cabecaPescoco: '', aparelhoRespiratorio: '', aparelhoCardiovascular: '', abdome: '', extremidades: ''
    },
    soap: {
      s: { qpHma: '', isda: '', antFisiologicos: '', antPatologicos: '', medicacoes: '', antFamiliares: '', habitos: '', socioeconomico: '', vacinacao: '' },
      o: { 
        sinaisVitais: { pa: '', fc: '', fr: '', sat: '', temp: '', peso: '', estatura: '', pc: '', imc: '' },
        geral: '', peleAnexos: '', cabecaPescoco: '', aparelhoRespiratorio: '', aparelhoCardiovascular: '', abdome: '', extremidades: ''
      },
      assessments: [{ id: '1', text: '' }],
      plans: [{ id: '1', text: '', category: 'DIAGNOSTIC', linkedAssessments: [] }]
    }
  });

  const handleNext = () => {
    setCurrentStepIndex(prev => Math.min(prev + 1, SOAP_STEPS_COUNT - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handlePrev = () => {
    setCurrentStepIndex(prev => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex h-full bg-light-glow animate-fade-in relative">
      <div className="flex-1 p-4 sm:p-6 lg:p-12 overflow-y-auto">
        <header className="max-w-[1000px] mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 no-print gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <button onClick={onBack} className="size-10 sm:size-12 rounded-xl sm:rounded-2xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all group shadow-sm">
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary group-hover:-translate-x-1 transition-all text-xl sm:text-2xl">arrow_back</span>
            </button>
            <div>
              <h3 className="text-xl sm:text-3xl font-black text-slate-900 uppercase tracking-tighter">Registro <span className="text-primary">SOAP</span></h3>
              <p className="text-text-muted text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em]">Passo {currentStepIndex + 1} de {SOAP_STEPS_COUNT}</p>
            </div>
          </div>
        </header>

        <main className="max-w-[1000px] mx-auto w-full glass-card p-5 sm:p-8 lg:p-14 rounded-[1.5rem] sm:rounded-[3rem] border border-slate-200 shadow-soft mb-12 relative overflow-hidden">
          {currentStepIndex === 0 && <SoapSection part="S" data={record.soap!} idData={record.id} patientType={PatientType.SOAP} onChange={(soap) => setRecord({...record, soap})} onIdChange={(id) => setRecord({...record, id})} />}
          {currentStepIndex === 1 && <SoapSection part="O" data={record.soap!} idData={record.id} patientType={PatientType.SOAP} onChange={(soap) => setRecord({...record, soap})} onIdChange={(id) => setRecord({...record, id})} />}
          {(currentStepIndex === 2 || currentStepIndex === 3) && <SoapSection part="AP" data={record.soap!} idData={record.id} patientType={PatientType.SOAP} onChange={(soap) => setRecord({...record, soap})} onIdChange={(id) => setRecord({...record, id})} />}
          {currentStepIndex === 4 && <SummarySection record={record} />}

          <div className="flex justify-between items-center mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-100 no-print">
            <button onClick={handlePrev} disabled={currentStepIndex === 0} className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${currentStepIndex === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>
              <span className="material-symbols-outlined text-sm">arrow_back</span> <span className="hidden sm:inline">Anterior</span>
            </button>
            {currentStepIndex < 4 ? (
              <button onClick={handleNext} className="flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-primary text-white rounded-xl sm:rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 shadow-lg shadow-primary/20 transition-all">
                <span className="hidden sm:inline">Próximo Passo</span> <span className="sm:hidden">Próximo</span> <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
}
