
import React from 'react';

interface VideoItem {
  title: string;
  description: string;
  icon: string;
  youtubeUrl: string;
}

const SBV_VIDEOS: VideoItem[] = [
  { 
    title: "Psicose no Plantão?", 
    description: "Guia de contenção física e manejo farmacológico de urgência.", 
    icon: "psychology", 
    youtubeUrl: "https://www.youtube.com/watch?v=I_g82Zz_F-4" 
  },
  { 
    title: "Acidente Ofídico?", 
    description: "Protocolo de soroterapia e classificação de gravidade MS.", 
    icon: "pets", 
    youtubeUrl: "https://www.youtube.com/watch?v=Kap1J6d5TKI" 
  },
  { 
    title: "Hemorragia Externa?", 
    description: "Controle massivo com torniquete e preenchimento de ferida.", 
    icon: "bloodtype", 
    youtubeUrl: "https://www.youtube.com/watch?v=e-7MIWyNOqQ" 
  },
  { 
    title: "Intoxicação Aguda?", 
    description: "Manejo inicial e primeiros socorros em intoxicações exógenas.", 
    icon: "warning", 
    youtubeUrl: "https://www.youtube.com/watch?v=1StNbHQGtQE" 
  },
  { 
    title: "Uso do DEA?", 
    description: "Passo a passo no socorro com desfibrilador externo automático.", 
    icon: "electric_bolt", 
    youtubeUrl: "https://www.youtube.com/watch?v=oElJmrUlEB8" 
  },
  { 
    title: "Parada Cardíaca?", 
    description: "RCP de alta qualidade conforme diretrizes AHA atualizadas.", 
    icon: "monitor_heart", 
    youtubeUrl: "https://www.youtube.com/watch?v=_astzJ-IAiw" 
  },
  { 
    title: "Engasgo em Adulto", 
    description: "Manobra de Heimlich e desobstrução de via aérea.", 
    icon: "air", 
    youtubeUrl: "https://www.youtube.com/watch?v=PyMq2iDMEkI" 
  },
  { 
    title: "Engasgo em Crianças", 
    description: "Protocolo de desobstrução de vias aéreas em pediatria.", 
    icon: "child_care", 
    youtubeUrl: "https://www.youtube.com/watch?v=gwAgRYYw1n8" 
  },
  { 
    title: "Crise Convulsiva?", 
    description: "Como proteger o paciente e manejar a crise de forma segura.", 
    icon: "neurology", 
    youtubeUrl: "https://www.youtube.com/watch?v=DC7w3DFfPW8" 
  },
  { 
    title: "AVC: Alerta!", 
    description: "Reconhecimento de sinais e conduta imediata no Acidente Vascular Cerebral.", 
    icon: "psychology", 
    youtubeUrl: "https://www.youtube.com/watch?v=SDkZB4nkVO0" 
  },
  { 
    title: "Engasgo em Bebê", 
    description: "Manobras de desobstrução específicas para lactentes.", 
    icon: "baby_changing_station", 
    youtubeUrl: "https://www.youtube.com/watch?v=NRBK74-P6JU" 
  }
];

const SBVModule: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-8 py-12 flex flex-col gap-14 bg-light-glow min-h-full">
      <header className="flex flex-col gap-5">
        <div className="inline-flex">
          <span className="px-5 py-2 rounded-full bg-red-100 border-2 border-red-600 text-red-900 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-[18px]">monitor_heart</span>
            MÓDULO SBV
          </span>
        </div>
        <div className="space-y-3">
          <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-none">Suporte Básico de Vida</h2>
          <p className="text-slate-800 text-xl max-w-3xl font-bold leading-relaxed">
            Protocolos visuais de emergência e tutoriais rápidos para condutas críticas salvadoras.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {SBV_VIDEOS.map((video, idx) => (
          <div key={idx} className="group bg-white border-2 border-slate-300 p-8 rounded-[2.5rem] shadow-card hover:shadow-strong transition-all duration-300 hover:border-red-600/50">
            <div className="size-16 rounded-2xl bg-slate-100 flex items-center justify-center text-red-600 border-2 border-slate-300 mb-6">
              <span className="material-symbols-outlined text-4xl font-black">{video.icon}</span>
            </div>
            <h4 className="text-xl font-black text-slate-900 mb-2 leading-tight group-hover:text-red-600 transition-colors">{video.title}</h4>
            <p className="text-sm text-slate-700 font-bold mb-8 leading-relaxed">{video.description}</p>
            <a 
              href={video.youtubeUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-widest text-center block hover:bg-red-600 transition-all shadow-lg shadow-slate-900/10"
            >
              Ver Protocolo Completo
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SBVModule;
