import React from 'react';

const MPCModule: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-8 py-12 flex flex-col gap-14 bg-light-glow min-h-full">
      {/* Header */}
      <header className="flex flex-col gap-5">
        <div className="inline-flex">
          <span className="px-5 py-2 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg shadow-slate-900/20">
            <span className="material-symbols-outlined text-[18px]">menu_book</span>
            MÓDULO MPC
          </span>
        </div>
        <div className="space-y-3">
          <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">Metodologia da Pesquisa</h2>
          <p className="text-slate-600 text-xl max-w-3xl font-bold leading-relaxed">
            Guia técnico focado em Medicina Baseada em Evidências, Leitura Crítica e Interpretação de Estudos.
          </p>
        </div>
      </header>

      {/* Quick links */}
      <section className="bg-white border-2 border-slate-200 p-8 rounded-[3rem] shadow-strong">
        <div className="flex flex-col gap-2 border-b-2 border-slate-100 pb-5 mb-8">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Navegação Rápida</h2>
          <p className="text-slate-500 font-bold text-base">Pule direto para os conceitos mais cobrados.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Conceito de Ciência', 'Tipos de Estudo', 'Estatística', 'Leitura Crítica'].map((item, i) => (
            <button key={i} className="p-6 rounded-2xl bg-slate-50 hover:bg-slate-900 border-2 border-slate-200 hover:border-slate-900 transition-all text-center group">
              <div className="text-primary group-hover:text-primary-light text-[10px] font-black uppercase tracking-widest mb-1">Módulo 0{i+1}</div>
              <div className="text-sm font-black text-slate-900 group-hover:text-white transition-colors">{item}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Content Section */}
      <div className="flex flex-col gap-10">
        <section className="bg-white border-2 border-slate-200 p-10 rounded-[3rem] shadow-card">
          <div className="flex items-center gap-4 border-b-2 border-slate-100 pb-6 mb-8">
            <span className="size-10 rounded-xl bg-slate-900 text-white font-black flex items-center justify-center">1</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Base Histórica e Conceitos</h2>
          </div>
          <p className="text-slate-600 font-bold text-lg leading-relaxed mb-6">A ciência é a busca sistemática pelo conhecimento, diferenciando-se de outros saberes pelo rigor metodológico.</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="font-black text-slate-900 uppercase text-xs mb-2 text-primary">Empírico</p>
              <p className="text-sm text-slate-500 font-bold">Baseado na experiência prática sem método rigoroso.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="font-black text-slate-900 uppercase text-xs mb-2 text-primary">Filosófico</p>
              <p className="text-sm text-slate-500 font-bold">Baseado na razão, lógica e construção de pensamento.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="font-black text-slate-900 uppercase text-xs mb-2 text-primary">Científico</p>
              <p className="text-sm text-slate-500 font-bold">Baseado em teste, método e reprodutibilidade.</p>
            </div>
          </div>
        </section>

        <section className="bg-slate-900 p-12 rounded-[3.5rem] shadow-strong text-white">
          <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
             <span className="material-symbols-outlined text-amber-400 text-4xl">lightbulb</span>
             <h2 className="text-3xl font-black tracking-tight uppercase">Interpretação Crítica (MBE)</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h3 className="text-amber-400 font-black uppercase text-xs tracking-widest mb-3">Intervalo de Confiança (IC 95%)</h3>
                <p className="text-slate-300 font-bold leading-relaxed">Regra de ouro para RR, OR e HR: Se o intervalo <span className="text-white font-black">cruza o número 1</span>, o resultado <span className="text-white font-black">NÃO</span> é estatisticamente significativo.</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <p className="font-black text-white uppercase text-[10px] tracking-widest mb-3">Checklist Final de Leitura</p>
                <ul className="space-y-3 text-sm text-slate-400 font-bold">
                  <li className="flex gap-3"><span className="text-amber-400">✓</span> Validade Interna (O estudo foi bem feito?)</li>
                  <li className="flex gap-3"><span className="text-amber-400">✓</span> Magnitude (Olhe o NNT e o IC!)</li>
                  <li className="flex gap-3"><span className="text-amber-400">✓</span> Validade Externa (Aplica-se ao meu paciente?)</li>
                </ul>
              </div>
            </div>
            <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
              <h3 className="text-amber-400 font-black uppercase text-xs tracking-widest mb-4">Guia Rápido de Testes</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between border-b border-white/5 pb-2">
                   <span className="text-slate-400 font-bold">Dados Normais (2 grupos)</span>
                   <span className="text-white font-black">Teste T Student</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                   <span className="text-slate-400 font-bold">Dados Normais (&gt;2 grupos)</span>
                   <span className="text-white font-black">ANOVA</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                   <span className="text-slate-400 font-bold">Não-Paramétrico</span>
                   <span className="text-white font-black">Mann-Whitney</span>
                </div>
                <div className="flex justify-between">
                   <span className="text-slate-400 font-bold">Categórico (Quali)</span>
                   <span className="text-white font-black">Qui-Quadrado</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="mt-8 border-t-2 border-slate-200 pt-10 pb-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-500 gap-4 font-black uppercase tracking-widest">
        <p>© socidéM • Módulo MPC v1.0</p>
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-slate-900"></span>
          <p>Medicina Baseada em Evidências</p>
        </div>
      </footer>
    </div>
  );
};

export default MPCModule;