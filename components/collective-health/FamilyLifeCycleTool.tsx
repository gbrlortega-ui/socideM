
import React, { useState } from 'react';

interface Phase {
  id: number;
  title: string;
  description: string;
  tasks: string[];
  footer?: string;
  badge: string;
  badgeStyle: string;
}

const PHASES: Phase[] = [
  {
    id: 1,
    title: "Formação do casal",
    badge: "Início do Ciclo",
    badgeStyle: "bg-emerald-100 text-emerald-700 border-emerald-200",
    description: "Etapa de construção do sistema conjugal e separação da família de origem.",
    tasks: [
      "Formação do sistema conjugal e construção de um 'nós'.",
      "Realinhar relacionamentos com família de origem e amigos para incluir o cônjuge.",
      "Reconhecer e agradecer aos pais, passando a ser 'visita' na casa de origem.",
      "Estabelecer combinados/contratos sobre tarefas, finanças e responsabilidades."
    ]
  },
  {
    id: 2,
    title: "Família com filho pequeno",
    badge: "Expansão Familiar",
    badgeStyle: "bg-blue-100 text-blue-700 border-blue-200",
    description: "Aproximadamente do nascimento até os 11 anos.",
    tasks: [
      "Ajustar o sistema conjugal para a chegada e presença de um novo membro.",
      "Realinhar os relacionamentos com a família ampliada (avós, tios, cuidadores).",
      "Manter pais presentes, disponíveis e coesos no cuidado e na educação.",
      "Definir regras claras, limites e rotinas consistentes."
    ],
    footer: "Manter espaço protegido para o casal continuar sendo casal."
  },
  {
    id: 3,
    title: "Família com filho adolescente",
    badge: "Crise e Evolução",
    badgeStyle: "bg-amber-100 text-amber-700 border-amber-200",
    description: "Aproximadamente de 12 a 17 anos.",
    tasks: [
      "Pais passam de 'voz de comando' para 'voz de orientação e supervisão'.",
      "Conceder 'liberdade patrocinada': autonomia progressiva com supervisão.",
      "Flexibilizar fronteiras, incluindo amizades, escola e espaços de convivência.",
      "O adolescente precisa sentir que é ouvido e útil na família."
    ],
    footer: "Casal preserva tempo e espaço para a conjugalidade, além da parentalidade."
  },
  {
    id: 4,
    title: "Família com filho jovem/adulto",
    badge: "Lançamento",
    badgeStyle: "bg-rose-100 text-rose-700 border-rose-200",
    description: "A partir de 18 anos.",
    tasks: [
      "Pais observam, acolhem e legitimam escolhas profissionais e afetivas dos filhos.",
      "Família funciona como um time – o jovem traz ideias, projetos e responsabilidades.",
      "Desenvolver responsabilidades emocionais e financeiras crescentes.",
      "Favorecer identidade, autonomia e inserção social do jovem."
    ],
    footer: "Casal segue sendo casal, reorganizando o projeto de vida a dois."
  },
  {
    id: 5,
    title: "Estágio tardio da vida",
    badge: "Ninho Vazio",
    badgeStyle: "bg-sky-100 text-sky-700 border-sky-200",
    description: "Fase de reinvenção da conjugalidade e cuidado com as perdas.",
    tasks: [
      "Filhos saem de casa (casam, moram sozinhos, mudam de cidade/país).",
      "Reorganizar o sistema conjugal como dupla novamente – ninho vazio.",
      "Fortalecer comunicação, companheirismo e projetos compartilhados.",
      "Desenvolver relações adultas com filhos, noras/genros e netos.",
      "Lidar com adoecimento crônico, incapacidade e perdas."
    ],
    footer: "Aproveitar a fase para desfrutar da conjugalidade e das novas configurações."
  }
];

interface Props {
  onBack: () => void;
}

const FamilyLifeCycleTool: React.FC<Props> = ({ onBack }) => {
  const [selectedPhaseId, setSelectedPhaseId] = useState<number | null>(null);
  
  const selectedPhase = PHASES.find(p => p.id === selectedPhaseId);

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10 bg-light-glow min-h-full">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          #printable-card { 
            position: absolute; 
            top: 0; left: 0; width: 100%; 
            padding: 0 !important;
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }
          @page { size: A5; margin: 1cm; }
          body { background: white !important; }
        }
      `}</style>

      <header className="flex flex-col gap-5 no-print">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm group">
            <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
          </button>
          <div>
            <div className="inline-flex mb-1">
              <span className="px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-900 text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                USF • ABORDAGEM FAMILIAR
              </span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Ciclo de Vida Familiar</h2>
          </div>
        </div>
        <p className="text-slate-600 text-base font-bold max-w-2xl">
          Identifique a etapa evolutiva para qualificar a discussão de caso e o planejamento terapêutico singular (PTS).
        </p>
      </header>

      <div id="printable-card" className="bg-white border-2 border-slate-200 p-8 rounded-[2.5rem] shadow-strong flex flex-col gap-8 transition-all">
        <div className="no-print">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Marcar fase atual da família</label>
          <div className="flex flex-wrap gap-3">
            {PHASES.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPhaseId(p.id)}
                className={`px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border-2 ${
                  selectedPhaseId === p.id 
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-200' 
                    : 'bg-slate-50 text-slate-500 border-slate-100 hover:border-emerald-200'
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        <div className={`flex flex-col gap-6 p-8 rounded-[2rem] border-2 transition-all min-h-[300px] ${selectedPhase ? 'bg-slate-50 border-emerald-100' : 'bg-slate-50/50 border-slate-100 border-dashed'}`}>
          {selectedPhase ? (
            <div className="animate-fade-in flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-xl shadow-lg">
                    {selectedPhase.id}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 leading-tight">{selectedPhase.title}</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{selectedPhase.badge}</p>
                  </div>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${selectedPhase.badgeStyle}`}>
                  Protocolo USF
                </span>
              </div>

              <div className="flex-1 space-y-6">
                <div>
                  <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-3">Principais Tarefas Evolutivas</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedPhase.tasks.map((task, i) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-700 font-bold bg-white p-4 rounded-2xl border border-slate-200">
                        <span className="text-emerald-500 material-symbols-outlined text-base">check_circle</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedPhase.footer && (
                  <div className="p-4 bg-emerald-50 border-l-4 border-emerald-400 text-emerald-800 text-xs font-black italic rounded-r-xl">
                    "{selectedPhase.footer}"
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center flex-1 text-center py-12 text-slate-400">
              <span className="material-symbols-outlined text-6xl mb-4 opacity-20">family_restroom</span>
              <p className="font-black uppercase tracking-widest text-[11px]">Selecione uma fase para visualizar os pontos de atenção</p>
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-slate-100">
           <p className="text-[10px] text-slate-400 font-bold leading-relaxed">
             <span className="text-slate-900 font-black">Nota Técnica:</span> Utilize este instrumento para compreender fronteiras, papéis e desafios sistêmicos. Integre os achados com o APGAR Familiar e Genograma para uma visão integral da saúde da família.
           </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 no-print pb-12">
        <button onClick={() => window.print()} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-emerald-600 transition-all shadow-lg">
          <span className="material-symbols-outlined">print</span> Imprimir Instrumento A5
        </button>
        <div className="ml-auto flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border-2 border-slate-100">
           <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
           <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Baseado em Terapia Familiar Sistêmica</span>
        </div>
      </div>

      <section className="bg-white border-2 border-slate-200 p-10 rounded-[3rem] no-print">
         <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Orientações Acadêmicas</h4>
         <div className="grid md:grid-cols-2 gap-10">
           <div className="space-y-4">
             <div className="flex gap-4">
               <div className="size-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                 <span className="material-symbols-outlined text-lg">psychology</span>
               </div>
               <p className="text-sm text-slate-600 font-bold leading-relaxed">Avalie transições recentes (nascimentos, lutos, mudanças) que podem estar gerando estresse no sistema.</p>
             </div>
             <div className="flex gap-4">
               <div className="size-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                 <span className="material-symbols-outlined text-lg">diversity_3</span>
               </div>
               <p className="text-sm text-slate-600 font-bold leading-relaxed">Identifique famílias que transitem entre fases ou vivam ciclos sobrepostos.</p>
             </div>
           </div>
           <div className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-100">
             <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">Discussão de Caso</p>
             <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
               "A crise no ciclo vital não é necessariamente patológica, mas sim um momento de desequilíbrio que exige reorganização de papéis. Como a equipe pode facilitar essa transição?"
             </p>
           </div>
         </div>
      </section>
    </div>
  );
};

export default FamilyLifeCycleTool;
