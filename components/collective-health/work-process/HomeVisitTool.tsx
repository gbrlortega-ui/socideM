import React from 'react';

const HomeVisitTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const PRIORITIES = [
    { level: "Alta Prioridade", color: "bg-rose-600", items: ["Pós-internação recente", "Cuidados paliativos exclusivos", "Recém-nascidos de risco", "Vítimas de violência ativa"] },
    { level: "Prioridade Moderada", color: "bg-amber-500", items: ["Acamados estáveis", "Puérperas de risco habitual", "Doenças crônicas descompensadas", "Acompanhamento de Hanseníase/TB"] },
    { level: "Rotina / Manutenção", color: "bg-emerald-600", items: ["Vigilância do território", "Busca ativa vacinal", "Orientação de saneamento", "Cadastro e atualização"] }
  ];

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10 bg-light-glow min-h-full">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-600 shadow-sm">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-[9px] font-black uppercase tracking-[0.2em]">APS • CUIDADO NO DOMICÍLIO</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Visita Domiciliar</h2>
        </div>
      </header>

      <div className="bg-white border-2 border-slate-200 p-8 rounded-[3rem] shadow-strong space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {PRIORITIES.map((p, i) => (
             <div key={i} className="p-6 rounded-[2rem] border-2 border-slate-50 bg-slate-50/50 space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                   <div className={`size-3 rounded-full ${p.color}`}></div>
                   <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight">{p.level}</h4>
                </div>
                <ul className="space-y-3">
                   {p.items.map((item, idx) => (
                     <li key={idx} className="text-xs font-bold text-slate-600 leading-tight">• {item}</li>
                   ))}
                </ul>
             </div>
           ))}
        </div>

        <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] space-y-6">
           <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-emerald-400 text-3xl">medical_information</span>
              <h3 className="text-xl font-black uppercase tracking-tight">Roteiro de Visita Clínica</h3>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-[10px] font-black uppercase tracking-widest">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col gap-2">
                 <span className="text-emerald-400">1. Ambiência</span>
                 <span className="opacity-60 font-bold normal-case">Avaliar riscos físicos e sociais da moradia.</span>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col gap-2">
                 <span className="text-emerald-400">2. Medicamentos</span>
                 <span className="opacity-60 font-bold normal-case">Conferir armazenamento e adesão.</span>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col gap-2">
                 <span className="text-emerald-400">3. Cuidador</span>
                 <span className="opacity-60 font-bold normal-case">Identificar sobrecarga e suporte.</span>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col gap-2">
                 <span className="text-emerald-400">4. Exame</span>
                 <span className="opacity-60 font-bold normal-case">Focar em feridas, edemas e mobilidade.</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default HomeVisitTool;