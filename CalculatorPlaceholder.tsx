
import React from 'react';
import { ModuleType } from '../types';

interface Props {
  module: ModuleType;
}

const CalculatorPlaceholder: React.FC<Props> = ({ module }) => {
  return (
    <div className="max-w-[1200px] mx-auto py-12 px-8 min-h-full flex items-center justify-center">
      <div className="bg-white border-2 border-slate-300 rounded-[3rem] p-16 shadow-2xl text-center relative overflow-hidden max-w-3xl w-full">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <span className="material-symbols-outlined text-[200px] text-primary">analytics</span>
        </div>
        
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-primary/10 text-primary mb-8 border-2 border-primary/20">
           <span className="material-symbols-outlined text-5xl font-black">construction</span>
        </div>
        
        <h2 className="text-4xl font-black text-slate-900 mb-4 capitalize">Módulo {module.replace('-', ' ')}</h2>
        <p className="text-lg text-slate-700 mb-12 font-bold leading-relaxed">
          Esta funcionalidade está em fase final de homologação técnica. Em breve, novos protocolos acadêmicos serão liberados.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {['Cálculos Clínicos', 'Scores de Risco', 'Resumos Acadêmicos', 'Diretrizes Atualizadas'].map((item, i) => (
            <div key={i} className="p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl text-left flex items-center gap-4">
              <span className="material-symbols-outlined text-slate-400">lock</span>
              <p className="text-sm font-black text-slate-800 uppercase tracking-widest">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalculatorPlaceholder;
