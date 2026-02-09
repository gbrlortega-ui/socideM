import React from 'react';
import SummaryCard from './SummaryCard';

const EBOOKS = [
  { id: '1', title: 'Semiologia Geral', area: 'Fundamentos', pages: 45, icon: 'edit_note', color: 'bg-blue-500', badge: 'Disponível' },
  { id: '2', title: 'Cardiologia Prática', area: 'Clínica Médica', pages: 120, icon: 'favorite', color: 'bg-rose-500', badge: 'Em breve' },
  { id: '3', title: 'Urgências em Pediatria', area: 'Pediatria', pages: 88, icon: 'child_care', color: 'bg-orange-500', badge: 'Em breve' },
  { id: '4', title: 'Manual do Internato', area: 'Geral', pages: 30, icon: 'school', color: 'bg-purple-500', badge: 'Novidade' },
  { id: '5', title: 'Antibioticoterapia', area: 'Infectologia', pages: 64, icon: 'medication', color: 'bg-emerald-500', badge: 'Em breve' },
  { id: '6', title: 'Cirurgia do Trauma', area: 'Cirurgia', pages: 95, icon: 'local_hospital', color: 'bg-slate-700', badge: 'Em breve' },
];

const SummariesModule: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-8 py-12 flex flex-col gap-14 bg-light-glow min-h-full">
      <header className="flex flex-col gap-5">
        <div className="inline-flex">
          <span className="px-5 py-2 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg shadow-slate-900/20">
            <span className="material-symbols-outlined text-[18px]">menu_book</span>
            BIBLIOTECA DE RESUMOS
          </span>
        </div>
        <div className="space-y-3">
          <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">Ebooks e Guias Rápidos</h2>
          <p className="text-slate-600 text-xl max-w-3xl font-bold leading-relaxed">
            Revisões teóricas estruturadas e guias de bolso otimizados para consulta rápida durante o plantão e internato.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
        {EBOOKS.map((ebook) => (
          <SummaryCard key={ebook.id} {...ebook} />
        ))}
      </div>

      <footer className="mt-8 border-t-2 border-slate-200 pt-10 pb-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-500 gap-4 font-black uppercase tracking-widest">
        <p>© socidéM • Medicina Baseada em Evidências</p>
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-slate-900"></span>
          <p>Conteúdo em Expansão Mensal</p>
        </div>
      </footer>
    </div>
  );
};

export default SummariesModule;