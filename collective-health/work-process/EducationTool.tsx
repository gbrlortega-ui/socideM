import React from 'react';

const EducationTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const GROUPS = [
    { title: "Hiperdia", icon: "pulse_alert", desc: "Controle de HAS/DM, alimentação e atividade física." },
    { title: "Saúde Mental", icon: "psychology", desc: "Prevenção ao uso de substâncias e manejo de ansiedade." },
    { title: "Planejamento Familiar", icon: "family_restroom", desc: "LARC, contracepção e saúde sexual do adolescente." },
    { title: "Gestantes", icon: "pregnant_woman", desc: "Preparação para o parto e aleitamento materno." }
  ];

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10 bg-light-glow min-h-full">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-600 shadow-sm">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-[9px] font-black uppercase tracking-[0.2em]">APS • PROMOÇÃO DA SAÚDE</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Educação em Saúde</h2>
        </div>
      </header>

      <div className="bg-white border-2 border-slate-200 p-8 rounded-[3rem] shadow-strong space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {GROUPS.map((g, i) => (
             <div key={i} className="p-8 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] flex flex-col gap-6 group hover:border-emerald-600 transition-all">
                <div className="size-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                   <span className="material-symbols-outlined text-4xl">{g.icon}</span>
                </div>
                <div>
                   <h4 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">{g.title}</h4>
                   <p className="text-sm font-bold text-slate-500 leading-relaxed">{g.desc}</p>
                </div>
                <button className="mt-auto py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 hover:border-emerald-600 transition-all">Planejar Próxima Reunião</button>
             </div>
           ))}
        </div>

        <div className="p-8 bg-emerald-50 rounded-[2.5rem] border-2 border-emerald-100 space-y-4">
           <h3 className="text-lg font-black text-emerald-900 uppercase">Metodologias Ativas na UBS</h3>
           <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-1">
                 <span className="text-[10px] font-black text-emerald-700 uppercase">Círculo de Cultura</span>
                 <p className="text-xs font-bold text-emerald-600 opacity-80">Troca horizontal de saberes populares e científicos.</p>
              </div>
              <div className="space-y-1">
                 <span className="text-[10px] font-black text-emerald-700 uppercase">Tempestade de Ideias</span>
                 <p className="text-xs font-bold text-emerald-600 opacity-80">Identificação coletiva de problemas do território.</p>
              </div>
              <div className="space-y-1">
                 <span className="text-[10px] font-black text-emerald-700 uppercase">Dramatização (Role-Play)</span>
                 <p className="text-xs font-bold text-emerald-600 opacity-80">Simulação de situações cotidianas para aprendizagem.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default EducationTool;