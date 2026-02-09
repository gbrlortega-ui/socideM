
import React from 'react';

interface SimulationArea {
  id: string;
  category: string;
  status: string;
  title: string;
  description: string;
  icon: string;
  isAvailable?: boolean;
}

const SIMULATION_AREAS: SimulationArea[] = [
  { id: 'clinica', category: 'Simulado', status: 'Em breve', title: 'Clínica Médica', description: 'Casos integrados de especialidades clínicas no estilo prova de residência.', icon: 'medical_information', isAvailable: false },
  { id: 'pediatria', category: 'Simulado', status: 'Em breve', title: 'Pediatria', description: 'Neonatologia, puericultura e emergências pediátricas comentadas.', icon: 'child_care', isAvailable: false },
  { id: 'cirurgia', category: 'Simulado', status: 'Em breve', title: 'Cirurgia', description: 'Trauma, abdome agudo e cirurgia geral com foco em conduta imediata.', icon: 'surgical', isAvailable: false },
];

const SimulationsModule: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-8 py-12 flex flex-col gap-14 bg-light-glow min-h-full">
      <header className="flex flex-col gap-5">
        <div className="inline-flex">
          <span className="px-5 py-2 rounded-full bg-amber-100 border-2 border-amber-600 text-amber-900 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-[18px]">quiz</span>
            MÓDULO SIMULADOS
          </span>
        </div>
        <div className="space-y-3">
          <h2 className="text-5xl font-black text-slate-900 tracking-tight">Simulados Acadêmicos</h2>
          <p className="text-slate-800 text-xl max-w-3xl font-bold leading-relaxed">
            Blocos de questões comentadas em nível de residência para treinamento de alto desempenho.
          </p>
        </div>
      </header>

      <section className="bg-white border-4 border-amber-200 p-10 rounded-[3rem] shadow-strong flex flex-col md:flex-row gap-10 items-center">
        <div className="size-24 shrink-0 rounded-3xl bg-slate-100 flex items-center justify-center text-amber-600 border-2 border-slate-300 shadow-inner">
          <span className="material-symbols-outlined text-5xl font-black">info</span>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Preparação Estratégica</h3>
          <p className="text-slate-700 font-bold text-lg leading-relaxed">
            O sistema sorteia casos clínicos reais para simular o tempo e a pressão das provas oficiais de residência e revalidação.
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 border-b-4 border-slate-300 pb-5">
          <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Bancos Disponíveis</h3>
          <p className="text-slate-700 font-black text-base">Selecione uma especialidade para iniciar seu treinamento.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {SIMULATION_AREAS.map((area, idx) => (
            <div
              key={idx}
              className="group relative bg-white border-2 border-slate-300 p-8 rounded-[2.5rem] transition-all duration-300 shadow-card hover:shadow-strong hover:border-amber-600/50 cursor-wait"
            >
              <div className="flex flex-col gap-6">
                <div className="size-14 rounded-2xl bg-slate-100 flex items-center justify-center text-amber-600 border-2 border-slate-300">
                  <span className="material-symbols-outlined text-3xl font-black">{area.icon}</span>
                </div>

                <div>
                  <div className="flex flex-col gap-1 mb-3">
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-700">{area.category}</span>
                    <h4 className="text-xl font-black text-slate-900">{area.title}</h4>
                  </div>
                  <p className="text-sm text-slate-700 font-bold leading-relaxed mb-6">
                    {area.description}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t-2 border-slate-100">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{area.status}</span>
                    <button className="px-6 py-2.5 rounded-xl bg-slate-200 text-slate-700 text-[10px] font-black uppercase tracking-widest border-2 border-slate-300">Em breve</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-8 border-t-2 border-slate-200 pt-10 pb-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-600 gap-4 font-black uppercase tracking-widest">
        <p>© socidéM • Foco em Alto Rendimento Acadêmico</p>
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          <p>Internato Médico</p>
        </div>
      </footer>
    </div>
  );
};

export default SimulationsModule;
