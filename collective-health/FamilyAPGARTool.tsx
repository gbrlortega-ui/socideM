import React, { useState, useMemo } from 'react';

interface Question {
  id: string;
  text: string;
}

const QUESTIONS: Question[] = [
  { id: 'adaptability', text: 'Posso recorrer à minha família em busca de ajuda quando algo me preocupa.' },
  { id: 'partnership', text: 'Minha família e eu conversamos e compartilhamos os problemas.' },
  { id: 'growth', text: 'Minha família aceita e apoia meus novos projetos e decisões.' },
  { id: 'affection', text: 'Minha família demonstra afeição e reage bem às minhas emoções.' },
  { id: 'resolve', text: 'Compartilhamos o tempo juntos de forma satisfatória.' },
];

const OPTIONS = [
  { value: 2, label: 'Sempre' },
  { value: 1.5, label: 'Quase sempre' },
  { value: 1, label: 'Algumas vezes' },
  { value: 0.5, label: 'Raramente' },
  { value: 0, label: 'Nunca' },
];

const FamilyAPGARTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [obs, setObs] = useState('');

  const analysis = useMemo(() => {
    // Fix: Explicitly cast values to number[] to avoid reduce operator errors on unknown types
    const values = Object.values(answers) as number[];
    if (values.length < QUESTIONS.length) return null;

    // Fix: Typed reduce parameters to avoid unknown type addition errors
    const total = values.reduce((a: number, b: number) => a + b, 0);
    let category = "Boa Funcionalidade Familiar";
    let color = "bg-emerald-100 text-emerald-700 border-emerald-200";
    
    // Fix: Typed total used in comparisons to resolve unknown operator errors
    if (total <= 3) {
      category = "Disfunção Familiar Grave";
      color = "bg-rose-100 text-rose-700 border-rose-200";
    } else if (total <= 6) {
      category = "Disfunção Familiar Moderada";
      color = "bg-amber-100 text-amber-700 border-amber-200";
    }

    return { total, category, color };
  }, [answers]);

  const handleSelect = (id: string, val: number) => {
    setAnswers(prev => ({ ...prev, [id]: val }));
  };

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10 bg-light-glow min-h-full">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          #printable-card { padding: 0 !important; border: none !important; box-shadow: none !important; }
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
                USF • FUNCIONALIDADE FAMILIAR
              </span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Apgar Familiar</h2>
          </div>
        </div>
        <p className="text-slate-600 text-base font-bold max-w-2xl">
          Instrumento de Smilkstein para avaliar a percepção de satisfação de cada membro com o sistema familiar.
        </p>
      </header>

      <div id="printable-card" className="bg-white border-2 border-slate-200 p-8 rounded-[2.5rem] shadow-strong flex flex-col gap-8">
        <div className="flex justify-between items-end border-b border-slate-100 pb-4">
           <div>
             <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase">Satisfação Familiar</h3>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Responda com base na percepção do usuário</p>
           </div>
           {analysis && (
             <div className={`px-4 py-1.5 rounded-full font-black text-[10px] uppercase border shadow-sm ${analysis.color}`}>
               {analysis.category}
             </div>
           )}
        </div>

        <div className="space-y-4">
          {QUESTIONS.map((q) => (
            <div key={q.id} className="p-6 rounded-3xl border border-slate-100 bg-slate-50/50 space-y-4">
              <p className="text-sm font-bold text-slate-700 leading-tight">{q.text}</p>
              <div className="flex flex-wrap gap-2">
                {OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(q.id, opt.value)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase border-2 transition-all ${
                      answers[q.id] === opt.value
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-md'
                        : 'bg-white border-slate-100 text-slate-400 hover:border-emerald-200'
                    }`}
                  >
                    {opt.label} ({opt.value})
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2 no-print">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Observações e Falas Relevantes</label>
          <textarea
            value={obs}
            onChange={(e) => setObs(e.target.value)}
            placeholder="Ex: Usuário relata que sente falta de tempo de qualidade com os filhos..."
            className="w-full h-24 px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-[2rem] outline-none text-sm font-bold text-slate-900 focus:border-emerald-500/50 resize-none transition-all"
          />
        </div>

        {analysis ? (
          <div className="flex flex-col md:flex-row gap-8 p-8 rounded-[2rem] border-2 border-emerald-100 bg-emerald-50/30 animate-fade-in">
             <div className="flex flex-col items-center justify-center bg-white px-8 py-6 rounded-2xl border border-emerald-100 shadow-sm min-w-[140px]">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Escore Total</p>
                <p className="text-4xl font-black text-slate-900 leading-none">{analysis.total.toFixed(1)}</p>
                <p className="text-[8px] font-black text-emerald-600 uppercase mt-2">Pts APGAR</p>
             </div>
             <div className="flex-1 space-y-4">
                <div>
                   <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Diagnóstico de Funcionalidade</h4>
                   <p className="text-sm font-bold text-slate-600 leading-relaxed">
                     O sistema familiar apresenta <span className="text-emerald-700 font-black">{analysis.category.toLowerCase()}</span>. 
                     {analysis.total <= 3 ? " Priorizar intervenção psicossocial e monitoramento de riscos em saúde mental." : 
                      analysis.total <= 6 ? " Necessita de matriciamento e avaliação de estressores externos." : 
                      " Família com bons recursos internos para lidar com adversidades."}
                   </p>
                </div>
                {obs && (
                  <div className="p-4 bg-white/60 rounded-xl border border-emerald-100/50 text-xs font-bold text-slate-500 italic">
                    "Obs: {obs}"
                  </div>
                )}
             </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400 bg-slate-50 rounded-[2rem] border-2 border-slate-100 border-dashed no-print">
            <span className="material-symbols-outlined text-6xl mb-4 opacity-20">checklist</span>
            <p className="font-black uppercase tracking-widest text-[11px]">Responda as 5 questões para visualizar o resultado</p>
          </div>
        )}

        <div className="pt-6 border-t border-slate-100">
           <p className="text-[10px] text-slate-400 font-bold leading-relaxed">
             <span className="text-slate-900 font-black">Nota Técnica:</span> O APGAR Familiar (Smilkstein, 1978) avalia Adaptabilidade, Companheirismo, Desenvolvimento, Afetividade e Capacidade Resolutiva. Deve ser integrado ao Genograma e Ciclo de Vida para planejamento em APS.
           </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 no-print pb-12">
        <button onClick={() => window.print()} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-emerald-600 transition-all shadow-lg">
          <span className="material-symbols-outlined">print</span> Imprimir Instrumento A5
        </button>
        <div className="ml-auto flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border-2 border-slate-100">
           <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
           <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Baseado em Protocolos da Atenção Básica</span>
        </div>
      </div>
    </div>
  );
};

export default FamilyAPGARTool;