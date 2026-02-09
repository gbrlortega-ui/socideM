
import React from 'react';

const ProtocolsTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const PROTOCOLS = [
    { title: "Protocolo de Hipertensão e Diabetes", area: "Clínica", provider: "Ministério da Saúde (MS)", icon: "pulse_alert" },
    { title: "Diretriz de Acolhimento e Fluxo", area: "Trabalho", provider: "MS / CAB 28", icon: "hail" },
    { title: "Manual de Saúde Mental na APS", area: "Saúde Mental", provider: "MS / Matriciamento", icon: "psychology" },
    { title: "Linha de Cuidado do Pré-Natal", area: "Materno-Infantil", provider: "Rede Cegonha", icon: "pregnant_woman" },
    { title: "Protocolos de Enfermagem APS", area: "Profissional", provider: "COREN / SMS", icon: "vaccines" },
    { title: "Atenção à Pessoa Idosa na APS", area: "Geriátrica", provider: "MS / Caderno 19", icon: "elderly" }
  ];

  return (
    <div className="min-h-full bg-slate-50 flex flex-col font-sans no-print-bg">
      <header className="bg-gradient-to-br from-emerald-900 to-emerald-700 text-white py-24 px-6 relative overflow-hidden shadow-2xl">
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <button onClick={onBack} className="absolute top-0 left-0 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all flex items-center gap-2 text-xs font-bold no-print">
            <span className="material-symbols-outlined text-sm">arrow_back</span> VOLTAR
          </button>
          <span className="inline-block bg-emerald-400/20 text-emerald-50 px-4 py-1.5 rounded-full text-[10px] font-black mb-6 tracking-widest uppercase border border-emerald-400/30">
            Segurança do Paciente e Evidências
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">
            Protocolos <br className="hidden md:block" /> e Diretrizes APS
          </h1>
          <p className="text-xl md:text-2xl opacity-90 font-light max-w-3xl mx-auto">
            Acesso rápido aos guias de conduta oficiais que normatizam a prática clínica e o fluxo de trabalho no SUS.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-20 flex-1 w-full">
        <section className="mb-24 text-center">
          <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">Por que seguir protocolos?</h2>
          <p className="text-lg text-slate-500 font-bold max-w-2xl mx-auto">Garantem a padronização do cuidado, aumentam a segurança do paciente e servem como salvaguarda ética para o profissional.</p>
        </section>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
           {PROTOCOLS.map((p, i) => (
             <div key={i} className="bg-white border-2 border-slate-100 p-8 rounded-[3rem] shadow-card hover:border-emerald-600 hover:-translate-y-2 transition-all duration-500 group">
                <div className="flex justify-between items-start mb-8">
                   <div className="size-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <span className="material-symbols-outlined text-3xl font-black">{p.icon}</span>
                   </div>
                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 px-3 py-1 rounded-full">{p.area}</span>
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-4 leading-tight">{p.title}</h4>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p.provider}</p>
                   <button className="text-emerald-600 font-black text-[10px] uppercase tracking-widest flex items-center gap-1 hover:underline">
                      Acessar <span className="material-symbols-outlined text-xs">open_in_new</span>
                   </button>
                </div>
             </div>
           ))}
        </div>
      </main>
    </div>
  );
};

export default ProtocolsTool;
