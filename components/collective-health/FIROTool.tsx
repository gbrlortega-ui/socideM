
import React, { useState, useMemo } from 'react';

interface FIROData {
  ie: string; id: string;
  ce: string; cd: string;
  ae: string; ad: string;
  obs: string;
}

const FIROTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [data, setData] = useState<FIROData>({
    ie: '', id: '',
    ce: '', cd: '',
    ae: '', ad: '',
    obs: ''
  });

  const interpretation = useMemo(() => {
    const { ie, id, ce, cd, ae, ad } = data;
    const vals = [ie, id, ce, cd, ae, ad].map(v => parseInt(v));
    
    if (vals.some(v => isNaN(v))) return null;

    const [IE, ID, CE, CD, AE, AD] = vals;
    const I = IE + ID;
    const C = CE + CD;
    const A = AE + AD;
    const total = I + C + A;

    const gapI = Math.abs(IE - ID);
    const gapC = Math.abs(CE - CD);
    const gapA = Math.abs(AE - AD);
    const gapSum = gapI + gapC + gapA;

    let intensityLabel = total <= 15 ? "Intensidade muito baixa" : total <= 30 ? "Intensidade moderada" : "Intensidade alta";
    let intensityColor = total > 30 ? "bg-amber-100 text-amber-700 border-amber-200" : "bg-emerald-100 text-emerald-700 border-emerald-200";

    let congruenceLabel = gapSum <= 6 ? "Boa congruência (Baixa tensão)" : gapSum <= 12 ? "Congruência moderada" : "Tensão alta (Gaps significativos)";
    let congruenceColor = gapSum > 12 ? "bg-rose-100 text-rose-700 border-rose-200" : gapSum > 6 ? "bg-amber-100 text-amber-700 border-amber-200" : "bg-emerald-100 text-emerald-700 border-emerald-200";

    const getDimText = (name: string, E: number, D: number, gap: number) => {
      if (gap >= 5) {
        if (E < D) return `${name}: Deseja muito mais do que expressa, sugerindo carência ou repressão desta necessidade.`;
        return `${name}: Expressa muito mais do que deseja, sugerindo invasão ou sobrecarga no sistema.`;
      }
      if (gap <= 2) return `${name}: Equilíbrio funcional entre expressão e desejo.`;
      return `${name}: Discrepância moderada; área de possível ajuste relacional.`;
    };

    return { 
      total, gapSum, intensityLabel, intensityColor, congruenceLabel, congruenceColor,
      details: [
        getDimText("Inclusão", IE, ID, gapI),
        getDimText("Controle", CE, CD, gapC),
        getDimText("Afeição", AE, AD, gapA)
      ]
    };
  }, [data]);

  const inputClass = "w-16 px-2 py-2 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-emerald-500/50 outline-none text-center font-black text-slate-900 transition-all";
  const labelClass = "text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 px-1";

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10 bg-light-glow min-h-full">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          #printable-content { padding: 0 !important; border: none !important; box-shadow: none !important; }
          @page { size: A5; margin: 1cm; }
        }
      `}</style>

      <header className="flex flex-col gap-5 no-print">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm group">
            <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
          </button>
          <div>
            <div className="inline-flex mb-1">
              <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                USF • COMPORTAMENTO INTERPESSOAL
              </span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Instrumento FIRO</h2>
          </div>
        </div>
        <p className="text-slate-600 text-base font-bold max-w-2xl">
          Avalie as necessidades de Inclusão, Controle e Afeição para entender o "clima" relacional da família.
        </p>
      </header>

      <div id="printable-content" className="bg-white border-2 border-slate-200 p-8 rounded-[2.5rem] shadow-strong flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Matriz de Pontuação (0-9)</h3>
            </div>
            
            <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
              <table className="w-full text-center">
                <thead className="bg-slate-50">
                  <tr className="text-[10px] font-black text-slate-400 uppercase">
                    <th className="px-4 py-3 text-left">Dimensão</th>
                    <th className="px-4 py-3">Expressado (E)</th>
                    <th className="px-4 py-3">Desejado (D)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {['Inclusão', 'Controle', 'Afeição'].map((dim, idx) => {
                    const keyE = ['ie', 'ce', 'ae'][idx] as keyof FIROData;
                    const keyD = ['id', 'cd', 'ad'][idx] as keyof FIROData;
                    return (
                      <tr key={dim}>
                        <td className="px-4 py-4 text-sm font-bold text-slate-700 text-left">{dim}</td>
                        <td className="px-4 py-4">
                          <input 
                            type="number" min="0" max="9" 
                            value={data[keyE]} 
                            onChange={e => setData({...data, [keyE]: e.target.value})}
                            className={inputClass}
                          />
                        </td>
                        <td className="px-4 py-4">
                          <input 
                            type="number" min="0" max="9" 
                            value={data[keyD]} 
                            onChange={e => setData({...data, [keyD]: e.target.value})}
                            className={inputClass}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="space-y-2">
               <label className={labelClass}>Notas Clínicas</label>
               <textarea 
                 value={data.obs}
                 onChange={e => setData({...data, obs: e.target.value})}
                 placeholder="Ex: Discrepância no controle sugere disputa de poder..."
                 className="w-full h-24 px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-3xl outline-none text-sm font-bold text-slate-900 focus:border-emerald-500/50 resize-none transition-all"
               />
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Leitura Sistêmica</h3>
            </div>

            {interpretation ? (
              <div className="space-y-4 animate-fade-in">
                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-4 rounded-2xl border-2 flex flex-col items-center ${interpretation.intensityColor}`}>
                     <span className="text-[8px] font-black uppercase opacity-60">Intensidade (0-54)</span>
                     <span className="text-2xl font-black">{interpretation.total}</span>
                     <span className="text-[9px] font-bold mt-1 text-center">{interpretation.intensityLabel}</span>
                  </div>
                  <div className={`p-4 rounded-2xl border-2 flex flex-col items-center ${interpretation.congruenceColor}`}>
                     <span className="text-[8px] font-black uppercase opacity-60">Congruência (Gap)</span>
                     <span className="text-2xl font-black">{interpretation.gapSum}</span>
                     <span className="text-[9px] font-bold mt-1 text-center">{interpretation.congruenceLabel}</span>
                  </div>
                </div>

                <div className="space-y-3 bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2 mb-3">Análise Qualitativa</p>
                  {interpretation.details.map((text, i) => (
                    <div key={i} className="flex gap-3 text-xs font-bold text-slate-600 leading-relaxed">
                      <span className="size-2 bg-emerald-500 rounded-full mt-1.5 shrink-0"></span>
                      {text}
                    </div>
                  ))}
                </div>

                {data.obs && (
                  <div className="p-4 bg-emerald-50/50 border-l-4 border-emerald-400 text-xs font-bold text-slate-700 italic rounded-r-xl">
                    "Obs: {data.obs}"
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-slate-50 rounded-[2rem] border-2 border-slate-100 border-dashed">
                <span className="material-symbols-outlined text-5xl mb-4 opacity-20">calculate</span>
                <p className="font-black uppercase tracking-widest text-[10px] text-center">Preencha todas as dimensões<br/>para gerar a análise</p>
              </div>
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100">
           <p className="text-[10px] text-slate-400 font-bold leading-relaxed">
             <span className="text-slate-900 font-black">Nota Técnica:</span> O FIRO não mede traços de personalidade, mas sim a orientação interacional em um dado momento. Intensidades extremas (muito altas ou baixas) associadas a gaps expressivos indicam áreas de vulnerabilidade sistêmica.
           </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 no-print pb-12">
        <button onClick={() => window.print()} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-emerald-600 transition-all shadow-lg">
          <span className="material-symbols-outlined">print</span> Imprimir Instrumento A5
        </button>
        <div className="ml-auto flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border-2 border-slate-100">
           <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
           <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Modelo Baseado em Will Schutz (1958)</span>
        </div>
      </div>
    </div>
  );
};

export default FIROTool;
