import React from 'react';

const ProtocolsTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const PROTOCOLS = [
    { title: "Protocolo de Hipertensão e Diabetes", area: "Clínica", provider: "Ministério da Saúde (MS)" },
    { title: "Diretriz de Acolhimento e Fluxo", area: "Trabalho", provider: "MS / CAB 28" },
    { title: "Manual de Saúde Mental na APS", area: "Saúde Mental", provider: "MS / Matriciamento" },
    { title: "Linha de Cuidado do Pré-Natal", area: "Materno-Infantil", provider: "Rede Cegonha" },
    { title: "Protocolos de Enfermagem APS", area: "Profissional", provider: "COREN / SMS" },
    { title: "Atenção à Pessoa Idosa na APS", area: "Geriátrica", provider: "MS / Caderno 19" }
  ];

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10 bg-light-glow min-h-full">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-600 shadow-sm">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-[9px] font-black uppercase tracking-[0.2em]">APS • CONHECIMENTO TÉCNICO</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Protocolos e Diretrizes APS</h2>
        </div>
      </header>

      <div className="bg-white border-2 border-slate-200 p-10 rounded-[3rem] shadow-strong space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {PROTOCOLS.map((p, i) => (
             <div key={i} className="p-6 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] hover:border-emerald-500/50 transition-all flex flex-col gap-4 group">
                <div>
                   <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase tracking-widest border border-emerald-200">{p.area}</span>
                   <h4 className="text-lg font-black text-slate-900 mt-2 leading-tight group-hover:text-emerald-600 transition-colors">{p.title}</h4>
                </div>
                <div className="flex justify-between items-center mt-auto">
                   <p className="text-[10px] font-bold text-slate-400 uppercase">{p.provider}</p>
                   <span className="material-symbols-outlined text-slate-300 group-hover:text-emerald-600 transition-all">open_in_new</span>
                </div>
             </div>
           ))}
        </div>

        <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] text-center space-y-2">
           <h4 className="text-sm font-black uppercase tracking-widest text-emerald-400">Em Breve: Acervo PDF Unificado</h4>
           <p className="text-xs font-bold opacity-60">Integração com a biblioteca de resumos acadêmicos do socidéM.</p>
        </div>
      </div>
    </div>
  );
};

export default ProtocolsTool;