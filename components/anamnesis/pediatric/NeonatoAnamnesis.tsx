
import React, { useState } from 'react';
import { PatientType, PediatricSubType, ClinicalRecord, FormStep } from '../../../types';
import IdentificationSection from '../../IdentificationSection';
import HistorySection from '../../HistorySection';
import ISDASection from '../../ISDASection';
import HabitsSection from '../../HabitsSection';
import PhysicalExamSection from '../../PhysicalExamSection';
import SynthesisSection from '../../SynthesisSection';
import SummarySection from '../../SummarySection';

interface Props {
  onBack: () => void;
}

export default function NeonatoAnamnesis({ onBack }: Props) {
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.IDENTIFICATION);
  
  const [record, setRecord] = useState<ClinicalRecord>({
    id: { nome: '', idade: '0-28 dias', sexo: '', cor: '', estadoCivil: 'Solteiro(a)', profissao: 'Neonato', ocupacao: 'Lactário', naturalidade: '', procedencia: '', residencia: '', nomeMae: '', responsavel: '', religiao: '', planoSaude: '' },
    patientType: PatientType.PEDIATRIC,
    pediatricSubType: PediatricSubType.NEONATE,
    qd: '',
    hma: '',
    isda: {},
    antecedentes: {},
    habitos: {},
    exameFisico: { 
      sinaisVitais: { pa: '', fc: '', fr: '', sat: '', temp: '', peso: '', estatura: '', pc: '', imc: '' },
      geral: '', peleAnexos: '', cabecaPescoco: '', aparelhoRespiratorio: '', aparelhoCardiovascular: '', abdome: '', extremidades: '', fontanelas: 'Normotensa'
    }
  });

  const next = () => setCurrentStep(prev => prev + 1);
  const prev = () => setCurrentStep(prev => prev - 1);

  const textareaClass = "w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 min-h-[150px] resize-none text-sm outline-none focus:border-primary";
  const labelClass = "text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block";

  return (
    <div className="flex h-full bg-light-glow animate-fade-in relative">
      <div className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <header className="max-w-[1000px] mx-auto w-full flex items-center justify-between mb-8 no-print">
          <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 shadow-sm"><span className="material-symbols-outlined">arrow_back</span></button>
          <div className="text-right">
            <h3 className="text-2xl font-black text-slate-900 uppercase">Roteiro Neonato</h3>
            <p className="text-primary text-[10px] font-black uppercase tracking-widest">Etapa {currentStep + 1} de 9</p>
          </div>
        </header>

        <main className="max-w-[1000px] mx-auto w-full glass-card p-8 lg:p-14 rounded-[3rem] border border-slate-200 shadow-soft mb-12">
          {currentStep === FormStep.IDENTIFICATION && <IdentificationSection data={record.id} patientType={PatientType.PEDIATRIC} onChange={(id) => setRecord({...record, id})} />}
          {currentStep === FormStep.QD_HMA && <HistorySection qpd={record.qd || ''} hma={record.hma || ''} patientType={PatientType.PEDIATRIC} subType={PediatricSubType.NEONATE} onChange={(updates) => setRecord({ ...record, qd: updates.qpd ?? record.qd, hma: updates.hma ?? record.hma })} />}
          {currentStep === FormStep.ISDA && <ISDASection data={record.isda} patientType={PatientType.PEDIATRIC} onChange={(isda) => setRecord({ ...record, isda })} />}
          
          {currentStep === FormStep.ANTECEDENTS_FISIO && (
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-xl font-black uppercase border-b pb-2">Antecedentes Pessoais (Fisiológicos)</h2>
              <div className="space-y-6">
                <div><label className={labelClass}>Gestação e Nascimento</label><textarea className={textareaClass} value={record.antecedentes.gestacaoNascimento} onChange={e=>setRecord({...record, antecedentes: {...record.antecedentes, gestacaoNascimento: e.target.value}})} placeholder="Normal/Complicações, tipo de parto, APGAR, ordem de nascimento..." /></div>
                <div><label className={labelClass}>Desenvolvimento (DNPM)</label><textarea className={textareaClass} value={record.antecedentes.dnpm} onChange={e=>setRecord({...record, antecedentes: {...record.antecedentes, dnpm: e.target.value}})} placeholder="Dentição, engatinhar, andar, falar, controle esfíncteres..." /></div>
                <div><label className={labelClass}>Desenvolvimento Sexual</label><textarea className={textareaClass} value={record.antecedentes.desenvSexual} onChange={e=>setRecord({...record, antecedentes: {...record.antecedentes, desenvSexual: e.target.value}})} placeholder="Puberdade, menarca, orientação sexual..." /></div>
              </div>
            </div>
          )}

          {currentStep === FormStep.ANTECEDENTS_PATO && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-black uppercase border-b pb-2">Antecedentes Pessoais (Patológicos)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className={labelClass}>Doenças da Infância</label><textarea className={textareaClass} value={record.antecedentes.doencasInfancia} onChange={e=>setRecord({...record, antecedentes: {...record.antecedentes, doencasInfancia: e.target.value}})} rows={2} /></div>
                <div><label className={labelClass}>Traumas / Acidentes</label><textarea className={textareaClass} value={record.antecedentes.traumas} onChange={e=>setRecord({...record, antecedentes: {...record.antecedentes, traumas: e.target.value}})} rows={2} /></div>
                <div><label className={labelClass}>Doenças Graves / Crônicas</label><textarea className={textareaClass} value={record.antecedentes.doencasGraves} onChange={e=>setRecord({...record, antecedentes: {...record.antecedentes, doencasGraves: e.target.value}})} rows={2} /></div>
                <div><label className={labelClass}>Cirurgias</label><textarea className={textareaClass} value={record.antecedentes.cirurgias} onChange={e=>setRecord({...record, antecedentes: {...record.antecedentes, cirurgias: e.target.value}})} rows={2} /></div>
                <div><label className={labelClass}>Transfusões Sanguíneas</label><textarea className={textareaClass} value={record.antecedentes.transfusoes} onChange={e=>setRecord({...record, antecedentes: {...record.antecedentes, transfusoes: e.target.value}})} rows={2} /></div>
                <div><label className={labelClass}>Imunizações e Alergias</label><textarea className={textareaClass} value={record.antecedentes.imunizacoes} onChange={e=>setRecord({...record, antecedentes: {...record.antecedentes, imunizacoes: e.target.value}})} rows={2} /></div>
              </div>
            </div>
          )}

          {currentStep === FormStep.HABITS && <HabitsSection data={record.habitos} onChange={(habitos)=>setRecord({...record, habitos})} />}
          {currentStep === FormStep.PHYSICAL_EXAM && <PhysicalExamSection data={record.exameFisico} patientType={PatientType.PEDIATRIC} subType={PediatricSubType.NEONATE} age={record.id.idade} sex={record.id.sexo} onChange={(exameFisico) => setRecord({...record, exameFisico})} />}
          {currentStep === FormStep.SYNTHESIS && <SynthesisSection fatoresRisco={record.fatoresRisco || ''} conduta={record.conduta || ''} patientType={PatientType.PEDIATRIC} onChange={(updates) => setRecord({...record, ...updates})} />}
          {currentStep === FormStep.SUMMARY && <SummarySection record={record} />}

          <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-100 no-print">
            <button onClick={prev} disabled={currentStep === 0} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest ${currentStep === 0 ? 'text-slate-300' : 'text-slate-600 border'}`}>Anterior</button>
            {currentStep < 8 && <button onClick={next} className="px-10 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg">Continuar</button>}
          </div>
        </main>
      </div>
    </div>
  );
}
