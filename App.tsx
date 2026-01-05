import React, { useState } from 'react';
import { ModuleType } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AnamnesisModule from './components/AnamnesisModule';
import AdultModule from './components/adult/AdultModule';
import PediatricModule from './components/pediatric/PediatricModule';
import GeriatricModule from './components/geriatric/GeriatricModule';
import CollectiveHealthModule from './components/collective-health/CollectiveHealthModule';
import SimulationsModule from './components/simulados/SimulationsModule';
import SummariesModule from './components/resumos/SummariesModule';
import SBVModule from './components/SBVModule';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.HOME);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeModule) {
      case ModuleType.HOME:
        return <Dashboard onSelectModule={(m) => { setActiveModule(m); setIsSidebarOpen(false); }} />;
      case ModuleType.ANAMNESIS:
        return <AnamnesisModule />;
      case ModuleType.ADULT:
        return <AdultModule />;
      case ModuleType.PEDIATRIC:
        return <PediatricModule />;
      case ModuleType.GERIATRIC:
        return <GeriatricModule />;
      case ModuleType.COLLECTIVE_HEALTH:
        return <CollectiveHealthModule />;
      case ModuleType.SUMMARIES:
        return <SummariesModule />;
      case ModuleType.SIMULATIONS:
        return <SimulationsModule />;
      case ModuleType.SBV:
        return <SBVModule />;
      default:
        return <Dashboard onSelectModule={(m) => { setActiveModule(m); setIsSidebarOpen(false); }} />;
    }
  };

  return (
    <div className="flex bg-bg-main min-h-screen w-full font-display relative">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[45] lg:hidden animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar 
        activeModule={activeModule} 
        setActiveModule={(m) => { setActiveModule(m); setIsSidebarOpen(false); }} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 h-screen overflow-hidden transition-all duration-300 lg:ml-72 relative">
        <header className="lg:hidden h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-[40]">
           <div className="flex items-center gap-2">
              <div className="size-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-lg">medical_services</span>
              </div>
              <h1 className="text-xl font-black tracking-tighter text-slate-900 leading-none">socidéM</h1>
           </div>
           <button 
             onClick={() => setIsSidebarOpen(true)}
             className="size-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 active:bg-slate-200"
           >
             <span className="material-symbols-outlined">menu</span>
           </button>
        </header>

        <div className="h-full overflow-y-auto custom-scrollbar bg-light-glow">
          {renderContent()}
        </div>
      </main>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        
        @keyframes zoom-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-zoom-in { animation: zoom-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;