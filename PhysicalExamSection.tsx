import React, { useEffect, useMemo } from 'react';
import { PhysicalExam, PatientType, PediatricSubType } from '../types';
import ClinicalGuidance from './ClinicalGuidance';
import { calculateZScore, parseAgeToMonths, getZScoreColor, classifyAdultBMI, getVitalSignsInterpretation } from '../services/growthService';

interface Props {
  data: PhysicalExam;
  patientType: PatientType;
  subType?: PediatricSubType;
  age?: string;
  sex?: string;
  onChange: (data: PhysicalExam) => void;
}

const PhysicalExamSection: React.FC<Props> = ({ data, patientType, subType, age = "", sex = "Masculino", onChange }) => {
  const ageMonths = useMemo(() => parseAgeToMonths(age), [age]);
  const ageYears = ageMonths / 12;

  useEffect(() => {
    const peso = parseFloat(data.sinaisVitais.peso || '0');
    const estatura = parseFloat(data.sinaisVitais.estatura || '0');
    if (peso > 0 && estatura > 0) {
      const imc = (peso / ((estatura / 100) ** 2)).toFixed(1);
      if (imc !== data.sinaisVitais.imc) {
        onChange({ ...data, sinaisVitais: { ...data.sinaisVitais, imc } });
      }
    }
  }, [data.sinaisVitais.peso, data.sinaisVitais.estatura]);

  const handleVitalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...data, sinaisVitais: { ...data.sinaisVitais, [e.target.name]: e.target.value } });
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ ...data, [e.target.name]: e.target.value });
  };

  const bmiInterpretation = useMemo(() => {
    if (patientType === PatientType.PEDIATRIC) return null;
    return classifyAdultBMI(parseFloat(data.sinaisVitais.imc || '0'), ageYears);
  }, [data.sinaisVitais.imc, ageYears, patientType]);

  const vitalStatus = useMemo(() => 
    getVitalSignsInterpretation(data.sinaisVitais, ageMonths, patientType), 
  [data.sinaisVitais, ageMonths, patientType]);

  const getAreas = () => {
    const base = [
      { name: 'geral', label: 'Ectoscopia / Estado Geral', placeholder: 'BEG/REG/MEG, LOTE, Corado, Acianótico, Anictérico...' },
      { name: 'peleAnexos', label: 'Pele e Fâneros', placeholder: 'Turgor, elasticidade, lesões, perfusão periférica...' },
      { name: 'cabecaPescoco', label: 'Cabeça e Pescoço', placeholder: 'Pupilas, tireoide, linfonodos, jugulares...' },
      { name: 'aparelhoRespiratorio', label: 'Aparelho Respiratório', placeholder: 'MV universalmente audível, sem ruídos adventícios...' },
      { name: 'aparelhoCardiovascular', label: 'Aparelho Cardiovascular', placeholder: 'RCR 2T, bulhas normofonéticas, sem sopros...' },
      { name: 'abdome', label: 'Abdome', placeholder: 'RHA presentes, plano, indolor, sem massas ou megalias...' },
      { name: 'extremidades', label: 'Extremidades / Neurológico', placeholder: 'Pulsos simétricos, sem edema, força e reflexos...' },
    ];
    if (patientType === PatientType.PEDIATRIC) base.push({ name: 'fontanelas', label: 'Fontanelas (Pediátrico)', placeholder: 'Normotensa, abaulada, deprimida...' });
    return base;
  };

  const inputClass = "w-full px-3 py-3 bg-white border-2 border-slate-300 rounded-xl focus:ring-4 focus:ring-primary/10 outline-none text-[11px] font-black transition-all text-slate-900";
  const interpretationClass = "text-[9px] font-black uppercase block mt-1.5 min-h-[14px] text-center px-1 py-0.5 rounded";

  return (
    <section className="space-y-6 sm:space-y-10 animate-fade-in">
      <div className="border-b-2 border-slate-200 pb-4 sm:pb-5">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase leading-tight">Exame Físico (Objetivo)</h2>
        <p className="text-xs sm:text-sm text-slate-600 font-bold mt-1">Achados clínicos diretos e mensurações vitais.</p>
      </div>

      <ClinicalGuidance patientType={patientType} subType={subType} section="exam" />

      <div className="bg-slate-100 p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] border-2 border-slate-300 shadow-lg">
        <h3 className="text-[10px] sm:text-[11px] font-black text-slate-700 mb-6 sm:mb-8 uppercase tracking-[0.25em] flex items-center gap-3">
          <div className="size-8 rounded-lg bg-primary text-white flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-lg">monitoring</span>
          </div>
          Biometria e Parâmetros Vitais
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-6 sm:gap-y-10 gap-x-3 sm:gap-x-5">
          {[
            { name: 'pa', label: 'PA (mmHg)', placeholder: '120/80', status: vitalStatus.pa },
            { name: 'fc', label: 'FC (bpm)', placeholder: '80', status: vitalStatus.fc },
            { name: 'fr', label: 'FR (irpm)', placeholder: '16', status: vitalStatus.fr },
            { name: 'sat', label: 'SAT (%)', placeholder: '98', status: vitalStatus.sat },
            { name: 'temp', label: 'TEMP (°C)', placeholder: '36.5', status: vitalStatus.temp },
            { name: 'peso', label: 'PESO (kg)', placeholder: '70' },
            { name: 'estatura', label: 'ESTATURA (cm)', placeholder: '170' },
          ].map((field) => (
            <div key={field.name}>
              <label className="text-[9px] sm:text-[10px] font-black text-slate-600 block mb-2 uppercase tracking-widest text-center">{field.label}</label>
              <input name={field.name} value={(data.sinaisVitais as any)[field.name]} onChange={handleVitalChange} className={inputClass} placeholder={field.placeholder} />
              {field.status && <span className={`${interpretationClass} ${field.status.color} bg-white border border-slate-200`}>{field.status.label}</span>}
            </div>
          ))}

          {patientType === PatientType.PEDIATRIC && (
            <div>
              <label className="text-[9px] sm:text-[10px] font-black text-slate-600 block mb-2 uppercase tracking-widest text-center">PC (cm)</label>
              <input name="pc" value={data.sinaisVitais.pc} onChange={handleVitalChange} className={inputClass} placeholder="Perímetro" />
            </div>
          )}

          <div>
            <label className="text-[9px] sm:text-[10px] font-black text-slate-600 block mb-2 uppercase tracking-widest text-center">IMC Calculado</label>
            <input 
              name="imc" 
              value={data.sinaisVitais.imc} 
              readOnly 
              className={`${inputClass} !text-center bg-slate-50 cursor-default shadow-inner`} 
            />
            {bmiInterpretation && (
              <span className={`${interpretationClass} ${bmiInterpretation.color} bg-white border border-slate-200`}>
                {bmiInterpretation.label}
              </span>
            )}
          </div>
        </div>
        {patientType === PatientType.GERIATRIC && (
          <p className="text-[8px] text-slate-400 mt-4 text-center">Corte Idoso: Baixo Peso &lt; 22 | Eutrofia 22-27 | Excesso &gt; 27</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:gap-10 pt-4">
        {getAreas().map((a) => (
          <div key={a.name}>
            <label className="block text-[9px] sm:text-[11px] font-black text-slate-800 uppercase tracking-[0.2em] mb-2 sm:mb-3 px-1">{a.label}</label>
            <textarea 
              name={a.name} 
              value={(data as any)[a.name] || ''} 
              onChange={handleAreaChange} 
              placeholder={a.placeholder} 
              className="w-full px-5 sm:px-6 py-4 sm:py-5 bg-white border-2 border-slate-300 rounded-xl sm:rounded-[2rem] text-sm font-medium h-32 sm:h-40 resize-none text-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm" 
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PhysicalExamSection;