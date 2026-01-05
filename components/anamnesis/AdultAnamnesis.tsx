
import React, { useState } from 'react';
import ClinicalGuidance from '../ClinicalGuidance';
import CVRiskModal from '../CVRiskModal';
import IdentificationSection from '../IdentificationSection';
import HistorySection from '../HistorySection';
import ISDASection from '../ISDASection';
import SummarySection from '../SummarySection';
import PhysicalExamSection from '../PhysicalExamSection';
import SynthesisSection from '../SynthesisSection';
import { RiskLevel, PatientType, ClinicalRecord } from '../../types';

interface Props {
  onBack: () => void;
}

const ADULT_STEPS_COUNT = 7;

export default function AdultAnamnesis({ onBack }: Props) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  
  // Fix: Added missing mandatory 'habitos' property to satisfy ClinicalRecord interface
  const [record, setRecord] = useState<ClinicalRecord>({
    id: { nome: '', idade: '', sexo: '', profissao: '', naturalidade: '', residencia: '', cor: '', estadoCivil: '' },
    patientType: PatientType.ADULT,
    qd: '',
    hma: '',
    isda: {},
    antecedentes: { fisiologicos: '', patologicos: '', familiares: '', habitos: '', psicossocial: '', riscoCardiovascular: '', riscoCardiovascularLevel: undefined },
    habitos: {},
    exameFisico: { 
      sinaisVitais: { pa: '', fc: '', fr: '', sat: '', temp: '', peso: '', estatura: '', pc: '', imc: '' },
      geral: '', peleAnexos: '', cabecaPescoco: '', aparelhoRespiratorio: '', aparelhoCardiovascular: '', abdome: '', extremidades: ''
    },
    hipoteseDiagnostica: '',
    fatoresRisco: '',
    conduta: ''
  });

  const getRiskStyles = (level?: RiskLevel) => {
    switch (level) {
      case 'LOW': return 'bg-green-50 border-green-200 text-green-700';
      case 'MODERATE': return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'HIGH':
      case 'VERY_HIGH': return 'bg-orange-50 border-orange-200 text-orange-700';
      case 'EXTREME': return 'bg-red-50 border-red-200 text-red-700';
      default: return 'bg-slate-50 border-slate-200 text-slate-700';
    }
  };

  const handleNext = () => {
    setCurrentStepIndex(prev => Math.min(prev + 1, ADULT_STEPS_COUNT - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handlePrev = () => {
    setCurrentStepIndex(prev => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-full bg-light-glow animate-fade-in no-print-bg">
      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-12">
        <header className="max-w-[1000px] mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 no-print gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <button onClick={onBack} className="size-10 sm:size-12 rounded-xl sm:rounded-2xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all group shadow-sm">
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary group-hover:-translate-x-1 transition-all text-xl sm:text-2xl">arrow_back</span>
            </button>
            <div>
              <h3 className="text-xl sm:text-3xl font-black text-slate-900 uppercase tracking-tighter">Anamnese <span className="text-primary">Adulto</span></h3>
              <p className="text-text-muted text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em]">Passo {currentStepIndex + 1} de {ADULT_STEPS_COUNT}</p>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
             <button onClick={() => setIsCVModalOpen(true)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-primary/10 text-primary border border-primary/20 rounded-xl sm:rounded-full font-black text-[9px] sm:text-[10px] uppercase hover:bg-primary/20 transition-all shadow-sm">
               <span className="material-symbols-outlined text-[16px] sm:text-[18px]">favorite</span> Risco CV
             </button>
          </div>
        </header>

        <main className="max-w-[1000px] mx-auto w-full glass-card p-5 sm:p-8 lg:p-14 rounded-[1.5rem] sm:rounded-[3rem] border border-slate-200 shadow-soft relative mb-12">
          {currentStepIndex === 0 && <IdentificationSection data={record.id} patientType={PatientType.ADULT} onChange={(id) => setRecord({...record, id})} />}
          {currentStepIndex === 1 && <HistorySection qpd={record.qd || ''} hma={record.hma || ''} patientType={PatientType.ADULT} onChange={(updates) => setRecord({ ...record, qd: updates.qpd ?? record.qd, hma: updates.hma ?? record.hma })} />}
          {currentStepIndex === 2 && <ISDASection data={record.isda} patientType={PatientType.ADULT} onChange={(isda) => setRecord({ ...record, isda })} />}
          {currentStepIndex === 3 && (
            <div className="flex flex-col gap-6 animate-fade-in">
               <ClinicalGuidance patientType={PatientType.ADULT} section="antecedents" />
               {record.antecedentes.riscoCardiovascular && (
                 <div className={`p-4 sm:p-6 border rounded-2xl sm:rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between animate-zoom-in shadow-sm gap-4 ${getRiskStyles(record.antecedentes.riscoCardiovascularLevel)}`}>
                   <div className="flex items-center gap-4">
                     <span className="material-symbols-outlined">analytics</span>
                     <div><p className="text-[9px] sm:text-[10px] font-black uppercase opacity-60">Risco Cardiovascular</p><p className="text-base sm:text-lg font-black">{record.antecedentes.riscoCardiovascular}</p></div>
                   </div>
                   <button onClick={() => setRecord({...record, antecedentes: {...record.antecedentes, riscoCardiovascular: '', riscoCardiovascularLevel: undefined}})} className="text-[9px] sm:text-[10px] font-bold uppercase opacity-50">Remover</button>
                 </div>
               )}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                 {['patologicos', 'habitos', 'fisiologicos', 'familiares'].map(f => (
                   <div key={f}>
                     <label className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">{f}</label>
                     <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl p-4 text-slate-900 min-h-[100px] sm:min-h-[120px] resize-none text-sm focus:border-primary/50 outline-none transition-all placeholder:text-slate-400" value={(record.antecedentes as any)[f]} onChange={e => setRecord({...record, antecedentes: {...record.antecedentes, [f]: e.target.value}})} />
                   </div>
                 ))}
               </div>
            </div>
          )}
          {currentStepIndex === 4 && <PhysicalExamSection data={record.exameFisico} patientType={PatientType.ADULT} age={record.id.idade} sex={record.id.sexo} onChange={(exameFisico) => setRecord({...record, exameFisico})} />}
          {currentStepIndex === 5 && <SynthesisSection fatoresRisco={record.fatoresRisco || ''} conduta={record.conduta || ''} patientType={PatientType.ADULT} onChange={(updates) => setRecord({...record, ...updates})} />}
          {currentStepIndex === 6 && <SummarySection record={record} />}

          <div className="flex justify-between items-center mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-100 no-print">
            <button onClick={handlePrev} disabled={currentStepIndex === 0} className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${currentStepIndex === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>
              <span className="material-symbols-outlined text-sm">arrow_back</span> <span className="hidden sm:inline">Anterior</span>
            </button>
            {currentStepIndex < 6 && (
              <button onClick={handleNext} className="flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-primary text-white rounded-xl sm:rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 shadow-lg shadow-primary/20 transition-all">
                <span className="hidden sm:inline">Próximo Passo</span> <span className="sm:hidden">Próximo</span> <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            )}
          </div>
        </main>
      </div>

      <CVRiskModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} onCalculate={(res, lvl) => setRecord({...record, antecedentes: {...record.antecedentes, riscoCardiovascular: res, riscoCardiovascularLevel: lvl}})} defaultAge={record.id.idade} defaultSex={record.id.sexo} />
    </div>
  );
}
