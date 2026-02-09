
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

export default function EscolarAnamnesis({ onBack }: Props) {
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.IDENTIFICATION);
  
  const [record, setRecord] = useState<ClinicalRecord>({
    id: { nome: '', idade: '6-12 anos', sexo: '', cor: '', estadoCivil: 'Solteiro(a)', profissao: 'Estudante', ocupacao: 'Ensino Fundamental', naturalidade: '', procedencia: '', residencia: '', nomeMae: '', responsavel: '', religiao: '', planoSaude: '' },
    patientType: PatientType.PEDIATRIC,
    pediatricSubType: PediatricSubType.SCHOOL,
    qd: '',
    hma: '',
    isda: {},
    antecedentes: {},
    habitos: {},
    exameFisico: { 
      sinaisVitais: { pa: '', fc: '', fr: '', sat: '', temp: '', peso: '', estatura: '', pc: '', imc: '' },
      geral: '', peleAnexos: '', cabecaPescoco: '', aparelhoRespiratorio: '', aparelhoCardiovascular: '', abdome: '', extremidades: ''
    }
  });

  const next = () => setCurrentStep(prev => prev + 1);
  const prev = () => setCurrentStep(prev => prev - 1);

  const textareaClass = "w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 min-h-[120px] resize-none text-sm outline-none focus:border-primary transition-all";
  const labelClass = "text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block px-1";

  return (
    <div className="flex h-full bg-light-glow animate-fade-in relative">
      <div className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <header className="max-w-[1000px] mx-auto w-full flex items-center justify-between mb-8 no-print">
          <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 shadow-sm transition-all"><span className="material-symbols-outlined">arrow_back</span></button>
          <div className="text-right">
            <h3 className="text-2xl font-black text-slate-900 uppercase">Roteiro Escolar</h3>
            <p className="text-primary text-[10px] font-black uppercase tracking-widest">Etapa {currentStep + 1} de 9</p>
          </div>
        </header>

        <main className="max-w-[1000px] mx-auto w-full glass-card p-8 lg:p-14 rounded-[3rem] border border-slate-200 shadow-soft mb-12 bg-white">
          {currentStep === FormStep.IDENTIFICATION && <IdentificationSection data={record.id} patientType={PatientType.PEDIATRIC} onChange={(id) => setRecord({...record, id})} />}
          {currentStep === FormStep.QD_HMA && <HistorySection qpd={record.qd || ''} hma={record.hma || ''} patientType={PatientType.PEDIATRIC} subType={PediatricSubType.SCHOOL} onChange={(updates) => setRecord({ ...record, qd: updates.qpd ?? record.qd, hma: updates.hma ?? record.hma })} />}
          {currentStep === FormStep.ISDA && <ISDASection data={record.isda} patientType={PatientType.PEDIATRIC} onChange={(isda) => setRecord({ ...record, isda })} />}
          
          {currentStep === FormStep.ANTECEDENTS_FISIO && (
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-xl font-black uppercase border-b-2 border-slate-100 pb-2 text-slate-800">Histórico de Desenvolvimento</h2>
              <div className="space-y-6">
                <div>
                  <label className={labelClass}>Desempenho Escolar</label>
                  <textarea className={textareaClass} value={record.antecedentes.dnpm} onChange={e=>setRecord({...record, antecedentes: {...record.antecedentes, dnpm: e.target.value}})} placeholder="Alfabetização, notas, relacionamento com professores, queixas da escola, bullying..." />
                </div>
                <div>
                  <label className={labelClass}>Vida Social e Lazer</label>
                  <textarea className={textareaClass} value={record.antecedentes.desenvSexual} onChange={e=>setRecord({...record, antecedentes: {...record.antecedentes, desenvSexual: e.target.value}})} placeholder="Amizades, atividades extracurriculares, tempo de tela, esportes..." />
                </div>
                <div>
                  <label className={labelClass}>DNPM Pregresso</label>
                  <textarea className={textareaClass} value={record.antecedentes.gestacaoNascimento} onChange={e=>setRecord({...record, antecedentes: {...record.antecedentes, gestacaoNascimento: e.target.value}})} placeholder="Marcos motores e de fala atingidos na idade correta?" />
                </div>
              </div>
            </div>
          )}

          {currentStep === FormStep.ANTECEDENTS_PATO && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-black uppercase border-b-2 border-slate-100 pb-2 text-slate-800">Histórico Patológico</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className={labelClass}>Doenças Crônicas</label><textarea className={textareaClass} value={record.antecedentes.doencasGraves} onChange={e=>setRecord({...record, antecedentes: {...record.antecedentes, doencasGraves: e.target.value}})} placeholder="TDAH, Asma, Diabetes, Obesidade..." /></div>
                <div><label className={labelClass}>Cirurgias e Internações</label><textarea className={textareaClass} value={record.antecedentes.cirurgias} onChange={e=>setRecord({...record, antecedentes: {...record.antecedentes, cirurgias: e.target.value}})} /></div>
                <div><label className={labelClass}>Vacinação (Reforços)</label><textarea className={textareaClass} value={record.antecedentes.imunizacoes} onChange={e=>setRecord({...record, antecedentes: {...record.antecedentes, imunizacoes: e.target.value}})} placeholder="HPV, Meningocócica ACWY..." /></div>
                <div><label className={labelClass}>Histórico Familiar</label><textarea className={textareaClass} value={record.antecedentes.familiares} onChange={e=>setRecord({...record, antecedentes: {...record.antecedentes, familiares: e.target.value}})} /></div>
              </div>
            </div>
          )}

          {currentStep === FormStep.HABITS && <HabitsSection data={record.habitos} onChange={(habitos)=>setRecord({...record, habitos})} />}
          {currentStep === FormStep.PHYSICAL_EXAM && <PhysicalExamSection data={record.exameFisico} patientType={PatientType.PEDIATRIC} subType={PediatricSubType.SCHOOL} age={record.id.idade} sex={record.id.sexo} onChange={(exameFisico) => setRecord({...record, exameFisico})} />}
          {currentStep === FormStep.SYNTHESIS && <SynthesisSection fatoresRisco={record.fatoresRisco || ''} conduta={record.conduta || ''} patientType={PatientType.PEDIATRIC} onChange={(updates) => setRecord({...record, ...updates})} />}
          {currentStep === FormStep.SUMMARY && <SummarySection record={record} />}

          <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-100 no-print">
            <button onClick={prev} disabled={currentStep === 0} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${currentStep === 0 ? 'text-slate-300' : 'text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>Anterior</button>
            {currentStep < 8 && <button onClick={next} className="px-10 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition-all">Continuar</button>}
          </div>
        </main>
      </div>
    </div>
  );
}
