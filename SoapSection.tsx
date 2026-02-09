
import React, { useState } from 'react';
import { SoapData, PatientType, SoapPlanCategory, SoapSubjective, PatientIdentification, RiskLevel } from '../types';
import { refineMedicalText } from '../services/geminiService';
import IdentificationSection from './IdentificationSection';
import CVRiskModal from './CVRiskModal';
import IVCF20Modal from './IVCF20Modal';
import PhysicalExamSection from './PhysicalExamSection';

interface Props {
  part: 'S' | 'O' | 'AP';
  data: SoapData;
  idData: PatientIdentification;
  patientType: PatientType;
  onChange: (data: SoapData) => void;
  onIdChange: (id: PatientIdentification) => void;
}

const SoapSection: React.FC<Props> = ({ part, data, idData, patientType, onChange, onIdChange }) => {
  const [isRefining, setIsRefining] = useState<string | null>(null);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isIVCFModalOpen, setIsIVCFModalOpen] = useState(false);

  const handleRefineSubjective = async (field: keyof SoapSubjective, label: string) => {
    if (!data.s[field]) return;
    // Fix: cast field to string to satisfy SetStateAction
    setIsRefining(field as string);
    const refined = await refineMedicalText(data.s[field] as string, label, patientType);
    onChange({
      ...data,
      s: { ...data.s, [field]: refined }
    });
    setIsRefining(null);
  };

  const handleCVResult = (result: string, level: RiskLevel) => {
    onChange({
      ...data,
      s: { ...data.s, riscoCardiovascular: result, riscoCardiovascularLevel: level }
    });
  };

  const handleIVCFResult = (score: number, resultText: string, level: 'LOW' | 'MODERATE' | 'HIGH') => {
    onChange({
      ...data,
      s: { ...data.s, ivcf20Score: score, ivcf20Result: resultText, ivcf20Level: level }
    });
  };

  const getRiskStyles = (level?: RiskLevel | 'LOW' | 'MODERATE' | 'HIGH') => {
    switch (level) {
      case 'LOW': return 'bg-green-50 border-green-200 text-green-700';
      case 'MODERATE': return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'HIGH': return 'bg-orange-50 border-orange-200 text-orange-700';
      case 'VERY_HIGH': return 'bg-red-50 border-red-200 text-red-700';
      case 'EXTREME': return 'bg-red-900 border-red-950 text-white';
      default: return 'bg-slate-50 border-slate-200 text-slate-700';
    }
  };

  const textareaClass = "w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 min-h-[120px] resize-none text-sm outline-none focus:border-primary transition-all";
  const labelClass = "text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block px-1";

  // Fix: Added return statement with full JSX implementation to avoid 'void' return type error.
  return (
    <div className="space-y-8 animate-fade-in">
      {part === 'S' && (
        <div className="space-y-10">
          <IdentificationSection data={idData} patientType={PatientType.SOAP} onChange={onIdChange} />
          
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-xl font-black uppercase text-slate-900">Subjetivo (S)</h3>
            <div className="flex gap-2">
               <button onClick={() => setIsCVModalOpen(true)} className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-[10px] font-black uppercase">Risco CV</button>
               <button onClick={() => setIsIVCFModalOpen(true)} className="px-4 py-2 bg-purple-50 text-purple-600 rounded-xl text-[10px] font-black uppercase">IVCF-20</button>
            </div>
          </div>

          {(data.s.riscoCardiovascular || data.s.ivcf20Result) && (
            <div className="grid md:grid-cols-2 gap-4">
              {data.s.riscoCardiovascular && (
                <div className={`p-4 border rounded-2xl flex items-center justify-between ${getRiskStyles(data.s.riscoCardiovascularLevel)}`}>
                   <div><p className="text-[8px] font-black uppercase opacity-60">Risco CV</p><p className="text-xs font-black">{data.s.riscoCardiovascular}</p></div>
                </div>
              )}
              {data.s.ivcf20Result && (
                <div className={`p-4 border rounded-2xl flex items-center justify-between ${getRiskStyles(data.s.ivcf20Level)}`}>
                   <div><p className="text-[8px] font-black uppercase opacity-60">IVCF-20</p><p className="text-xs font-black">{data.s.ivcf20Result}</p></div>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {(['qpHma', 'isda', 'antFisiologicos', 'antPatologicos', 'medicacoes', 'antFamiliares', 'habitos', 'socioeconomico', 'vacinacao'] as (keyof SoapSubjective)[]).map(field => (
               <div key={field}>
                  <div className="flex justify-between items-center mb-1">
                    <label className={labelClass}>{field}</label>
                    <button 
                      onClick={() => handleRefineSubjective(field, field)}
                      disabled={!!isRefining || !data.s[field]}
                      className="text-[9px] font-black text-primary uppercase hover:underline disabled:opacity-30"
                    >
                      {isRefining === field ? '...' : 'IA'}
                    </button>
                  </div>
                  <textarea 
                    value={data.s[field] as string || ''} 
                    onChange={e => onChange({...data, s: {...data.s, [field]: e.target.value}})}
                    className={textareaClass}
                  />
               </div>
             ))}
          </div>
        </div>
      )}

      {part === 'O' && (
        <div className="space-y-8">
          <h3 className="text-xl font-black uppercase text-slate-900 border-b pb-2">Objetivo (O)</h3>
          <PhysicalExamSection 
            data={data.o} 
            patientType={PatientType.SOAP} 
            onChange={(o) => onChange({...data, o})} 
          />
        </div>
      )}

      {part === 'AP' && (
        <div className="space-y-10">
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-slate-900 border-b pb-2">Avaliação (A)</h3>
            <div className="space-y-4">
              {data.assessments.map((item, idx) => (
                <div key={item.id} className="flex gap-4">
                  <div className="size-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black shrink-0">{idx + 1}</div>
                  <textarea 
                    value={item.text} 
                    onChange={e => {
                      const n = [...data.assessments];
                      n[idx].text = e.target.value;
                      onChange({...data, assessments: n});
                    }}
                    className={textareaClass}
                    placeholder="Problema / Hipótese..."
                  />
                </div>
              ))}
              <button onClick={() => onChange({...data, assessments: [...data.assessments, {id: Date.now().toString(), text: ''}]})} className="text-[10px] font-black uppercase text-primary">+ Adicionar Problema</button>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-slate-900 border-b pb-2">Plano (P)</h3>
            <div className="space-y-4">
              {data.plans.map((item, idx) => (
                <div key={item.id} className="p-6 bg-slate-50 rounded-[2rem] border-2 border-slate-100 space-y-4">
                   <div className="flex justify-between items-center">
                     <select 
                       value={item.category} 
                       onChange={e => {
                         const n = [...data.plans];
                         n[idx].category = e.target.value as SoapPlanCategory;
                         onChange({...data, plans: n});
                       }}
                       className="bg-white border rounded-lg px-3 py-1 text-[10px] font-black uppercase"
                     >
                       <option value="DIAGNOSTIC">Diagnóstico</option>
                       <option value="THERAPEUTIC">Terapêutico</option>
                       <option value="FOLLOW_UP">Seguimento</option>
                       <option value="EDUCATION">Educação</option>
                     </select>
                   </div>
                   <textarea 
                    value={item.text} 
                    onChange={e => {
                      const n = [...data.plans];
                      n[idx].text = e.target.value;
                      onChange({...data, plans: n});
                    }}
                    className={textareaClass}
                    placeholder="Conduta..."
                  />
                </div>
              ))}
              <button onClick={() => onChange({...data, plans: [...data.plans, {id: Date.now().toString(), text: '', category: 'DIAGNOSTIC', linkedAssessments: []}]})} className="text-[10px] font-black uppercase text-primary">+ Adicionar Conduta</button>
            </div>
          </div>
        </div>
      )}

      <CVRiskModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} onCalculate={handleCVResult} defaultAge={idData.idade || ''} defaultSex={idData.sexo || ''} />
      <IVCF20Modal isOpen={isIVCFModalOpen} onClose={() => setIsIVCFModalOpen(false)} onCalculate={handleIVCFResult} />
    </div>
  );
};

// Fix: Add default export to allow usage in other files.
export default SoapSection;
