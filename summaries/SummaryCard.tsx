import React from 'react';

interface SummaryCardProps {
  title: string;
  area: string;
  pages: number;
  icon: string;
  color: string;
  badge: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, area, pages, icon, color, badge }) => {
  const isAvailable = badge === 'Disponível' || badge === 'Novidade';

  return (
    <div className="group relative bg-white border-2 border-slate-200 p-8 rounded-[2.5rem] shadow-card hover:shadow-strong transition-all duration-500 hover:-translate-y-2 flex flex-col gap-6 overflow-hidden">
      <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-5 rounded-bl-[4rem] group-hover:scale-110 transition-transform`}></div>
      
      <div className="flex justify-between items-start relative z-10">
        <div className={`size-14 rounded-2xl ${color} text-white flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform`}>
          <span className="material-symbols-outlined text-3xl">{icon}</span>
        </div>
        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border-2 ${isAvailable ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
          {badge}
        </span>
      </div>

      <div className="relative z-10">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{area}</p>
        <h4 className="text-2xl font-black text-slate-900 leading-tight mb-2 group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-xs text-slate-500 font-bold">{pages} páginas de conteúdo denso</p>
      </div>

      <button className={`mt-auto w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${isAvailable ? 'bg-slate-900 text-white hover:bg-primary shadow-lg shadow-slate-900/10' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
        {isAvailable ? 'Abrir Ebook' : 'Aguardando Liberação'}
      </button>
    </div>
  );
};

export default SummaryCard;