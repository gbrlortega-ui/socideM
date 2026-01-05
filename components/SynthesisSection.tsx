
import React, { useState } from 'react';
import { PatientType } from '../types';
import { refineMedicalText } from '../services/geminiService';

interface Props {
  fatoresRisco: string;
  conduta: string;
  patientType: PatientType;
  onChange: (updates: { fatoresRisco?: string; conduta?: string }) => void;
}

const SynthesisSection: React.FC<Props> = ({ fatoresRisco, conduta, patientType, onChange }) => {
  const [isRefining, setIsRefining] = useState<'fatores' | 'conduta' | null>(null);

  const handleRefine = async (field: 'fatoresRisco' | 'conduta', label: string) => {
    const text = field === 'fatoresRisco' ? fatoresRisco : conduta;
    if (!text) return;
    setIsRefining(field === 'fatoresRisco' ? 'fatores' : 'conduta');
    const refined = await refineMedicalText(text, label, patientType);
    onChange({ [field]: refined });
    setIsRefining(null);
  };

  const inputClass = "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all placeholder:text-slate-400 text-slate-900";
  const labelClass = "block text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2";

  return (
    <section className="space-y-8 animate-fade-in">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Síntese Clínica</h2>
        <p className="text-sm text-text-muted font-medium">Raciocínio final, riscos identificados e plano terapêutico.</p>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className={labelClass}>Fatores de Risco (Físicos, Psicológicos e Sociais)</label>
            <button
              onClick={() => handleRefine('fatoresRisco', "Fatores de Risco")}
              disabled={isRefining === 'fatores' || !fatoresRisco}
              className="text-[10px] font-bold flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm">magic_button</span>
              {isRefining === 'fatores' ? 'Refinando...' : 'Refinar IA'}
            </button>
          </div>
          <textarea
            value={fatoresRisco}
            onChange={(e) => onChange({ fatoresRisco: e.target.value })}
            placeholder="Ex: Sedentarismo, histórico familiar de IAM precoce..."
            className={`${inputClass} h-40 resize-none leading-relaxed`}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className={labelClass}>Condutas e Orientações</label>
            <button
              onClick={() => handleRefine('conduta', "Condutas e Orientações")}
              disabled={isRefining === 'conduta' || !conduta}
              className="text-[10px] font-bold flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm">magic_button</span>
              {isRefining === 'conduta' ? 'Refinando...' : 'Refinar IA'}
            </button>
          </div>
          <textarea
            value={conduta}
            onChange={(e) => onChange({ conduta: e.target.value })}
            placeholder="Prescrições, solicitações de exames, encaminhamentos e orientações verbais..."
            className={`${inputClass} h-56 resize-none leading-relaxed`}
          />
        </div>
      </div>
    </section>
  );
};

export default SynthesisSection;
