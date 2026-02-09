import React from 'react';

const TeamWorkTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const ROLES = [
    { title: "Médico(a)", icon: "medical_services", tasks: ["Diagnóstico clínico", "Prescrição", "Pequenas cirurgias", "Matriciamento"] },
    { title: "Enfermeiro(a)", icon: "monitor_heart", tasks: ["Pré-natal baixo risco", "Citopatologia", "Gestão da equipe", "Consultas de enfermagem"] },
    { title: "ACS / ACE", icon: "home_health", tasks: ["Mapeamento território", "Visitas domiciliares", "Vigilância em saúde", "Identificação de riscos"] },
    { title: "Téc. Enfermagem", icon: "vaccines", tasks: ["Vacinação", "Curativos", "Triagem / Acolhimento", "Procedimentos básicos"] },
    { title: "Equipe NASF-AB", icon: "diversity_3", tasks: ["Apoio especializado", "Matriciamento", "PTS compartilhado", "Saúde mental / Nutrição / Fisioterapia"] }
  ];

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10 bg-light-glow min-h-full">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-600 shadow-sm">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-[9px] font-black uppercase tracking-[0.2em]">APS • GESTÃO MULTIPROFISSIONAL</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Trabalho em Equipe</h2>
        </div>
      </header>

      <div className="bg-white border-2 border-slate-200 p-8 rounded-[3rem] shadow-strong space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {ROLES.map((r, i) => (
             <div key={i} className="p-6 bg-slate-50 border-2 border-slate-100 rounded-[2rem] space-y-6">
                <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                   <div className="size-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600">
                      <span className="material-symbols-outlined">{r.icon}</span>
                   </div>
                   <h4 className="font-black text-slate-900 uppercase tracking-tight">{r.title}</h4>
                </div>
                <ul className="space-y-3">
                   {r.tasks.map((t, ti) => (
                     <li key={ti} className="flex gap-2 text-xs font-bold text-slate-600 leading-tight">
                        <span className="text-emerald-600 material-symbols-outlined text-[14px]">check</span>
                        {t}
                     </li>
                   ))}
                </ul>
             </div>
           ))}
        </div>

        <div className="p-8 rounded-[2rem] bg-emerald-50 border-2 border-emerald-100 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
           <div className="size-20 rounded-full bg-white border-2 border-emerald-200 flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-4xl text-emerald-600">groups</span>
           </div>
           <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Matriciamento</h3>
              <p className="text-sm font-bold text-slate-600 leading-relaxed">
                Processo de compartilhamento de casos entre a equipe de referência e especialistas do NASF ou CAPS, visando ampliar a resolutividade e o conhecimento clínico.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TeamWorkTool;