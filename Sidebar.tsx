import React from 'react';
import { ModuleType } from '../types';
import { MODULES_CONFIG } from '../constants';

interface SidebarProps {
  activeModule: ModuleType;
  setActiveModule: (module: ModuleType) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule, isOpen, onClose }) => {
  const topItems = MODULES_CONFIG.filter(m => m.category === 'top');
  const clinicalItems = MODULES_CONFIG.filter(m => m.category === 'clinical');
  const academicItems = MODULES_CONFIG.filter(m => m.category === 'academic');

  const renderButton = (module: any) => (
    <button
      key={module.id}
      onClick={() => setActiveModule(module.id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group relative border-2 ${
        activeModule === module.id
          ? 'bg-slate-900 text-white border-slate-900 shadow-xl'
          : 'text-slate-700 bg-transparent border-transparent hover:bg-slate-100 hover:text-slate-900 hover:border-slate-200'
      }`}
    >
      <span 
        className={`material-symbols-outlined text-[22px] transition-transform duration-300 group-hover:scale-110`} 
        style={activeModule === module.id ? {fontVariationSettings: "'FILL' 1"} : {}}
      >
        {module.icon}
      </span>
      <span className={`text-sm tracking-tight ${activeModule === module.id ? 'font-black' : 'font-bold'}`}>
        {module.label}
      </span>
    </button>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="px-4 py-4 mt-4">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{title}</span>
        <div className="h-[1px] flex-1 bg-slate-100"></div>
      </div>
    </div>
  );

  return (
    <aside className={`sidebar-style w-72 h-full flex flex-col justify-between shrink-0 fixed left-0 top-0 z-[50] shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="flex flex-col h-full overflow-hidden">
        
        <div className="p-8 pb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-11 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl">
              <span className="material-symbols-outlined font-black text-2xl">medical_services</span>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-slate-900 leading-none mb-1">socidéM</h1>
              <span className="text-[10px] font-black text-brand-green uppercase tracking-widest bg-brand-green/10 px-1.5 py-0.5 rounded border border-brand-green/20">Acadêmico</span>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-slate-600 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-2 space-y-1 custom-scrollbar">
          {topItems.map(renderButton)}
          
          <SectionHeader title="Prática Clínica" />
          {clinicalItems.map(renderButton)}

          <SectionHeader title="Conteúdo Acadêmico" />
          {academicItems.map(renderButton)}
        </nav>
      </div>

      <div className="p-8 border-t-2 border-slate-200 bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-2xl bg-white border-2 border-slate-300 flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-slate-900 font-bold">person</span>
          </div>
          <div className="flex flex-col">
            <p className="text-[9px] text-slate-600 uppercase font-black tracking-widest">desenvolvido por</p>
            <p className="text-xs font-black text-slate-900 uppercase tracking-tight">Gabriel Ortega Antonio</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;