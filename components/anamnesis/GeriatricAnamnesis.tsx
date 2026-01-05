
import React, { useState } from 'react';
import { FormStep, PatientType, ClinicalRecord, RiskLevel } from '../../types';
import IdentificationSection from '../IdentificationSection';
import HistorySection from '../HistorySection';
import ISDASection from '../ISDASection';
import PhysicalExamSection from '../PhysicalExamSection';
import SynthesisSection from '../SynthesisSection';
import SummarySection from '../SummarySection';
import ClinicalGuidance from '../ClinicalGuidance';
import CVRiskModal from '../CVRiskModal';
import IVCF20Modal from '../IVCF20Modal';

interface Props {
  onBack: () => void;
}

const GERIATRIC_STEPS_COUNT = 7;

export default function GeriatricAnamnesis({ onBack }: Props) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isIVCFModalOpen, setIsIVCFModalOpen] = useState(false);
  
  // Fix: Added missing mandatory 'habitos' property to satisfy ClinicalRecord interface
  const [record, setRecord] = useState<ClinicalRecord>({
    id: { nome: '', idade: '', sexo: '', profissao: '', naturalidade: '', residencia: '', cor: '', estadoCivil: '', cuidador: '', escolaridade: '' },
    patientType: PatientType.GERIATRIC,
    qd: '',
    hma: '',
    isda: {},
    antecedentes: { funcionalidade: '', polifarmacia: '', patologicos: '', habitos: '', riscoCardiovascular: '', riscoCardiovascularLevel: undefined, ivcf20Result: '', ivcf20Score: undefined, ivcf20Level: undefined },
    habitos: {},
    exameFisico: { 
      sinaisVitais: { pa: '', fc: '', fr: '', sat: '', temp: '', peso: '', estatura: '', pc: '', imc: '' },
      geral: '', peleAnexos: '', cabecaPescoco: '', aparelhoRespiratorio: '', aparelhoCardiovascular: '', abdome: '', extremidades: ''
    },
    fatoresRisco: '',
    conduta: ''
  });

  const getRiskStyles = (level?: string) => {
    if (level === 'LOW') return 'bg-green-50 border-green-200 text-green-700';
    if (level === 'MODERATE') return 'bg-yellow-50 border-yellow-200 text-yellow-700';
    return 'bg-red-50 border-red-200 text-red-700';
  };

  const handleNext = () => setCurrentStepIndex(prev => Math.min(prev + 1, GERIATRIC_STEPS_COUNT - 1));
  const handlePrev = () => setCurrentStepIndex(prev => Math.max(prev - 1, 0));

  return (
    <div className="flex h-full bg-light-glow animate-fade-in no-print-bg">
      <div className="flex-1 flex flex-col p-6 lg:p-12 overflow-y-auto">
        <header className="max-w-[1000px] mx-auto w-full flex flex-col md:flex-row items-start md:items-center justify-between mb-8 no-print gap-6">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all group shadow-sm">
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary group-hover:-translate-x-1 transition-all">arrow_back</span>
            </button>
            <div>
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Saúde do <span className="text-primary">Idoso</span></h3>
              <p className="text-text-muted text-[10px] font-black uppercase tracking-[0.2em]">Passo {currentStepIndex + 1} de {GERIATRIC_STEPS_COUNT}</p>
            </div>
          </div>
          <div className="flex gap-2">
             <button onClick={() => setIsCVModalOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary border border-primary/20 rounded-full font-black text-[10px] uppercase hover:bg-primary/20 transition-all shadow-sm">
               <span className="material-symbols-outlined text-[18px]">favorite</span> Risco CV
             </button>
             <button onClick={() => setIsIVCFModalOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-purple-50 text-purple-600 border border-purple-200 rounded-full font-black text-[10px] uppercase hover:bg-purple-100 transition-all shadow-sm">
               <span className="material-symbols-outlined text-[18px]">analytics</span> IVCF-20
             </button>
          </div>
        </header>

        <main className="max-w-[1000px] mx-auto w-full glass-card p-8 lg:p-14 rounded-[3rem] border border-slate-200 shadow-soft relative mb-12">
          {currentStepIndex === 0 && <IdentificationSection data={record.id} patientType={PatientType.GERIATRIC} onChange={(id) => setRecord({...record, id})} />}
          {currentStepIndex === 1 && <HistorySection qpd={record.Clar || ''} hma={record.hma || ''} patientType={PatientType.GERIATRIC} onChange={(updates) => setRecord({ ...record, qd: updates.qpd ?? record.qd, hma: updates.hma ?? record.hma })} />}
          {currentStepIndex === 2 && <ISDASection data={record.isda} patientType={PatientType.GERIATRIC} onChange={(isda) => setRecord({ ...record, isda })} />}
          {currentStepIndex === 3 && (
            <div className="flex flex-col gap-6 animate-fade-in">
               <ClinicalGuidance patientType={PatientType.GERIATRIC} section="antecedents" />
               
               <div className="grid md:grid-cols-2 gap-4">
                 {record.antecedentes.riscoCardiovascular && (
                   <div className={`p-6 border rounded-3xl flex items-center justify-between animate-zoom-in shadow-sm ${getRiskStyles(record.antecedentes.riscoCardiovascularLevel)}`}>
                     <div className="flex items-center gap-4">
                       <span className="material-symbols-outlined">analytics</span>
                       <div>
                         <p className="text-[10px] font-black uppercase opacity-60">Risco Cardiovascular Global</p>
                         <p className="text-sm font-black">{record.antecedentes.riscoCardiovascular}</p>
                       </div>
                     </div>
                     <button onClick={() => setRecord({...record, antecedentes: {...record.antecedentes, riscoCardiovascular: '', riscoCardiovascularLevel: undefined}})} className="text-[10px] font-bold uppercase opacity-50 hover:opacity-100">Remover</button>
                   </div>
                 )}
                 
                 {record.antecedentes.ivcf20Result && (
                   <div className={`p-6 border rounded-3xl flex items-center justify-between shadow-sm animate-zoom-in ${getRiskStyles(record.antecedentes.ivcf20Level)}`}>
                      <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined">elderly</span>
                        <div>
                          <p className="text-[10px] font-black uppercase opacity-60">Vulnerabilidade (IVCF-20: {record.antecedentes.ivcf20Score} pts)</p>
                          <p className="text-sm font-black">{record.antecedentes.ivcf20Result}</p>
                        </div>
                      </div>
                      <button onClick={() => setRecord({...record, antecedentes: {...record.antecedentes, ivcf20Result: '', ivcf20Score: undefined, ivcf20Level: undefined}})} className="text-[10px] font-bold uppercase opacity-50 hover:opacity-100">Remover</button>
                   </div>
                 )}
               </div>

               <div className="grid md:grid-cols-2 gap-6">
                 {['funcionalidade', 'polifarmacia', 'patologicos', 'habitos'].map(f => (
                   <div key={f}>
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">{f}</label>
                     <textarea className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 min-h-[120px] resize-none text-sm focus:border-primary/50 outline-none transition-all placeholder:text-slate-400" value={(record.antecedentes as any)[f]} onChange={e => setRecord({...record, antecedentes: {...record.antecedentes, [f]: e.target.value}})} />
                   </div>
                 ))}
               </div>
            </div>
          )}
          {currentStepIndex === 4 && <PhysicalExamSection data={record.exameFisico} patientType={PatientType.GERIATRIC} age={record.id.idade} sex={record.id.sexo} onChange={(exameFisico) => setRecord({...record, exameFisico})} />}
          {currentStepIndex === 5 && <SynthesisSection fatoresRisco={record.fatoresRisco || ''} conduta={record.conduta || ''} patientType={PatientType.GERIATRIC} onChange={(updates) => setRecord({...record, ...updates})} />}
          {currentStepIndex === 6 && <SummarySection record={record} />}

          <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-100 no-print">
            <button onClick={handlePrev} disabled={currentStepIndex === 0} className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${currentStepIndex === 0 ? 'text-slate-300' : 'text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>
              <span className="material-symbols-outlined text-sm">arrow_back</span> Anterior
            </button>
            {currentStepIndex < 6 && (
              <button onClick={handleNext} className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 shadow-lg transition-all shadow-primary/20">
                Próximo Passo <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            )}
          </div>
        </main>
      </div>

      <CVRiskModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} onCalculate={(res, lvl) => setRecord({...record, antecedentes: {...record.antecedentes, riscoCardiovascular: res, riscoCardiovascularLevel: lvl}})} defaultAge={record.id.idade} defaultSex={record.id.sexo} />
      <IVCF20Modal isOpen={isIVCFModalOpen} onClose={() => setIsIVCFModalOpen(false)} onCalculate={(score, res, lvl) => setRecord({...record, antecedentes: {...record.antecedentes, ivcf20Score: score, ivcf20Result: res, ivcf20Level: lvl}})} />
    </div>
  );
}
