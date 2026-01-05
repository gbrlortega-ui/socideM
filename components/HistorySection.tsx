
import React, { useState } from 'react';
import { PatientType, PediatricSubType } from '../types';
import { refineMedicalText, getClinicalSuggestions } from '../services/geminiService';
import ClinicalGuidance from './ClinicalGuidance';

interface Props {
  qpd: string;
  hma: string;
  patientType: PatientType;
  subType?: PediatricSubType;
  onChange: (updates: { qpd?: string; hma?: string }) => void;
}

const HistorySection: React.FC<Props> = ({ qpd, hma, patientType, subType, onChange }) => {
  const [isRefining, setIsRefining] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const handleRefine = async () => {
    if (!hma) return;
    setIsRefining(true);
    const refined = await refineMedicalText(hma, "História da Moléstia Atual (HMA)", patientType);
    onChange({ hma: refined });
    setIsRefining(false);
  };

  const handleGetSuggestions = async () => {
    if (!qpd && !hma) return;
    setLoadingSuggestions(true);
    const clinicalSuggestions = await getClinicalSuggestions(qpd, hma, patientType);
    setSuggestions(clinicalSuggestions);
    setLoadingSuggestions(false);
  };

  const inputClass = "w-full px-5 py-4 bg-slate-100/50 border-2 border-slate-300 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none text-sm font-bold text-slate-900 transition-all placeholder:text-slate-400";
  const labelClass = "block text-[11px] font-black text-slate-700 uppercase tracking-[0.2em] mb-2 px-1";

  return (
    <section className="space-y-10 animate-fade-in">
      <div className="border-b-2 border-slate-200 pb-5">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">História Clínica</h2>
        <p className="text-sm text-slate-600 font-bold mt-1">Evolução dos sintomas e queixa atual.</p>
      </div>

      <ClinicalGuidance patientType={patientType} subType={subType} section="history" />

      <div className="space-y-8">
        <div>
          <label className={labelClass}>Queixa Principal (QP)</label>
          <input
            value={qpd}
            onChange={(e) => onChange({ qpd: e.target.value })}
            placeholder="Ex: Dor torácica opressiva há 2 horas..."
            className={inputClass}
          />
        </div>

        <div className="relative">
          <div className="flex justify-between items-center mb-3">
            <label className={labelClass}>História da Moléstia Atual (HMA)</label>
            <button
              onClick={handleRefine}
              disabled={isRefining || !hma}
              className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-2 px-4 py-2 rounded-xl border-2 shadow-sm transition-all ${
                isRefining 
                  ? 'bg-slate-200 text-slate-500 border-slate-300' 
                  : 'bg-primary text-white border-primary-dark hover:scale-105 active:scale-95 shadow-primary/20'
              }`}
            >
              <span className="material-symbols-outlined text-sm">magic_button</span>
              {isRefining ? 'Processando...' : 'IA: Refinar Texto'}
            </button>
          </div>
          <textarea
            value={hma}
            onChange={(e) => onChange({ hma: e.target.value })}
            placeholder="Roteiro: Início, Localização, Caráter, Irradiação, Intensidade (1-10), Duração, Frequência, Fatores de Melhora/Piora..."
            className={`${inputClass} h-80 resize-none leading-relaxed`}
          />
        </div>

        <div className="bg-white rounded-3xl p-8 border-2 border-primary/30 shadow-lg shadow-primary/5">
           <div className="flex justify-between items-center mb-6">
             <div className="flex items-center gap-3">
               <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                 <span className="material-symbols-outlined text-2xl font-bold">psychiatry</span>
               </div>
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                 Assistente Semiológico
               </h3>
             </div>
             <button 
                onClick={handleGetSuggestions}
                disabled={loadingSuggestions}
                className="text-[11px] font-black uppercase tracking-[0.2em] text-primary hover:underline bg-primary/5 px-4 py-2 rounded-full border border-primary/20"
             >
               {loadingSuggestions ? 'Analisando...' : 'Sugerir Perguntas'}
             </button>
           </div>
           
           {suggestions.length > 0 ? (
             <ul className="space-y-4">
               {suggestions.map((s, i) => (
                 <li key={i} className="text-sm text-slate-800 flex gap-4 items-start font-bold bg-slate-50 p-4 rounded-2xl border border-slate-200">
                   <span className="size-6 rounded-full bg-primary text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i+1}</span>
                   {s}
                 </li>
               ))}
             </ul>
           ) : (
             <div className="text-center py-4">
               <p className="text-xs text-slate-500 font-bold italic">O assistente analisa sua HMA e sugere tópicos que podem ter sido esquecidos.</p>
             </div>
           )}
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
