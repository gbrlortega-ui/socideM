import React from 'react';
import { ModuleType } from '../types';
import { MODULES_CONFIG } from '../constants';

interface DashboardProps {
  onSelectModule: (module: ModuleType) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectModule }) => {
  const categories = Array.from(new Set(MODULES_CONFIG.filter(m => m.id !== ModuleType.HOME).map(m => m.category)));

  const categoryLabels: Record<string, string> = {
    'clinical': 'Prática Clínica',
    'academic': 'Conteúdo Acadêmico'
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-6 sm:py-10 flex flex-col gap-8 sm:gap-12 bg-light-glow min-h-full">
      
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row gap-8 sm:gap-10 items-start justify-between animate-fade-in">
        <div className="flex flex-col gap-4 sm:gap-6 max-w-2xl sm:pt-4">
          <div className="inline-flex">
            <span className="px-3 sm:px-4 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-[9px] sm:text-[10px] font-black tracking-[0.2em] uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.3)]"></span>
              Painel interdisciplinar • Medicina
            </span>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-slate-900 leading-[1.0]">
              Bem-vindo ao <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500">socidéM</span>
            </h2>
            <h3 className="text-lg sm:text-xl text-primary font-semibold">
              Integração clínica e acadêmica em um só lugar.
            </h3>
          </div>

          <p className="text-text-muted text-sm sm:text-base leading-relaxed max-w-lg font-medium">
            Navegue pelos módulos para acessar conteúdos clínicos e acadêmicos integrados, otimizados para sua rotina de estudos e prática médica.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4 pt-4">
            <button 
              onClick={() => {
                const element = document.getElementById('grid-modulos');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-primary hover:bg-primary-dark text-white h-12 px-6 sm:px-8 rounded-full font-black text-[10px] sm:text-xs uppercase tracking-widest transition-all transform hover:scale-105 shadow-lg shadow-primary/30 flex items-center gap-2"
            >
              Explorar Áreas
              <span className="material-symbols-outlined text-[18px] sm:text-[20px]">expand_more</span>
            </button>
          </div>
        </div>

        {/* Feature Summary Card */}
        <aside className="hidden lg:flex w-[340px] glass-card p-8 rounded-3xl flex-col gap-6 shadow-soft rotate-1 hover:rotate-0 transition-transform duration-500 border-2 border-slate-100">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-white text-3xl">verified_user</span>
          </div>
          <div className="space-y-3">
            <h4 className="text-xl font-black text-slate-900 tracking-tight uppercase">Compromisso Técnico</h4>
            <p className="text-sm text-text-muted leading-relaxed font-bold">
              Plataforma desenvolvida para auxiliar acadêmicos e médicos no raciocínio clínico baseado em evidências, protocolos oficiais e na prática humanizada do SUS.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-green"></span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Atualizado Semanalmente</span>
          </div>
        </aside>
      </section>

      {/* Grid Section - Categorized */}
      <section id="grid-modulos" className="space-y-12 sm:space-y-16 pb-16 sm:pb-20">
        {categories.map((cat) => (
          <div key={cat} className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-4">
              <h3 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight uppercase tracking-[0.1em]">
                {categoryLabels[cat] || cat}
              </h3>
              <div className="h-[1px] flex-1 bg-slate-200"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {MODULES_CONFIG.filter(m => m.category === cat && m.id !== ModuleType.HOME).map((module) => (
                <button
                  key={module.id}
                  onClick={() => onSelectModule(module.id)}
                  className="group relative bg-white hover:bg-slate-50 border border-slate-200 hover:border-primary/40 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] transition-all duration-500 hover:-translate-y-2 text-left overflow-hidden shadow-card hover:shadow-lg"
                >
                  <div className="absolute -top-10 -right-10 size-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
                  
                  <div className="flex flex-col gap-4 sm:gap-6 relative z-10">
                    <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center bg-slate-50 text-text-muted group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                      <span className="material-symbols-outlined text-2xl sm:text-3xl group-hover:scale-110 transition-transform">{module.icon}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-primary transition-colors">{module.label}</h4>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[8px] font-bold text-slate-500 border border-slate-200 uppercase whitespace-nowrap">{categoryLabels[cat] || cat}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-text-muted leading-relaxed group-hover:text-slate-600 transition-colors font-medium">
                        {module.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-4 border-t border-slate-200 pt-8 pb-6 flex flex-col sm:flex-row justify-between items-center text-[9px] sm:text-[10px] text-text-muted gap-4 font-bold uppercase tracking-[0.15em] text-center">
        <p>© 2024 socidéM • Medicina Baseada em Evidências</p>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green shadow-[0_0_8px_rgba(34,197,94,0.4)]"></span>
          <p>desenvolvido por Gabriel Ortega Antonio</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;