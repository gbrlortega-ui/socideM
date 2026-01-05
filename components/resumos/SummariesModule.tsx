import React from 'react';

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

      <div className="flex-1 flex items-center justify-center py-20">
        <div className="group relative bg-white border-2 border-slate-200 p-12 sm:p-20 rounded-[3rem] shadow-strong text-center flex flex-col items-center gap-8 max-w-2xl w-full transition-all duration-500 hover:shadow-2xl">
          <div className="size-24 rounded-[2rem] bg-slate-100 text-slate-400 flex items-center justify-center shadow-inner group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
            <span className="material-symbols-outlined text-5xl font-black">lock_clock</span>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-4xl font-black text-slate-900 tracking-tight">Conteúdo em Desenvolvimento</h3>
            <p className="text-lg text-slate-500 font-bold leading-relaxed">
              Estamos preparando uma biblioteca exclusiva com resumos de alta qualidade, focados nas principais diretrizes e protocolos atualizados.
            </p>
          </div>

          <div className="inline-flex px-8 py-3 rounded-full bg-amber-50 border-2 border-amber-200 text-amber-700 text-xs font-black uppercase tracking-widest animate-pulse">
            Lançamento em breve
          </div>
        </div>
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