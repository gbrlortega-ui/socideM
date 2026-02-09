import React from 'react';

interface SimulationCardProps {
  title: string;
  category: string;
  description: string;
  icon: string;
  status: string;
}

const SimulationCard: React.FC<SimulationCardProps> = ({ title, category, description, icon, status }) => {
  const isAvailable = status === 'Disponível';

  return (
    <div className={`group relative bg-white border-2 border-slate-300 p-8 rounded-[2.5rem] transition-all duration-300 shadow-card hover:shadow-strong ${isAvailable ? 'hover:border-amber-600/50' : 'cursor-wait'}`}>
      <div className="flex flex-col gap-6">
        <div className="size-14 rounded-2xl bg-slate-100 flex items-center justify-center text-amber-600 border-2 border-slate-300 group-hover:bg-amber-600 group-hover:text-white transition-all">
          <span className="material-symbols-outlined text-3xl font-black">{icon}</span>
        </div>

        <div>
          <div className="flex flex-col gap-1 mb-3">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-700">{category}</span>
            <h4 className="text-xl font-black text-slate-900 group-hover:text-amber-700 transition-colors">{title}</h4>
          </div>
          <p className="text-sm text-slate-700 font-bold leading-relaxed mb-6">
            {description}
          </p>
          <div className="flex items-center justify-between pt-6 border-t-2 border-slate-100">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{status}</span>
            <button className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${isAvailable ? 'bg-amber-600 text-white border-amber-700 shadow-lg' : 'bg-slate-200 text-slate-700 border-slate-300'}`}>
              {isAvailable ? 'Iniciar' : 'Em breve'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationCard;