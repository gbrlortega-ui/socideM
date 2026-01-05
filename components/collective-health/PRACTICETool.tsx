import React, { useState, useMemo } from 'react';

interface Domain {
  id: string;
  label: string;
  description: string;
}

const DOMAINS: Domain[] = [
  { id: 'P', label: 'Problem Solving', description: 'Resolução de problemas de saúde e cotidianos.' },
  { id: 'R', label: 'Roles', description: 'Distribuição de papéis e responsabilidades.' },
  { id: 'A', label: 'Affect', description: 'Grau de proximidade emocional e clima afetivo.' },
  { id: 'C1', label: 'Communication', description: 'Clareza e abertura para o diálogo.' },
  { id: 'T', label: 'Time', description: 'Qualidade e quantidade do tempo de convivência.' },
  { id: 'I', label: 'Involvement', description: 'Engajamento no cuidado com a saúde/doença.' },
  { id: 'C2', label: 'Coping', description: 'Capacidade de enfrentar estressores e crises.' },
  { id: 'E', label: 'Empathy', description: 'Reciprocidade e apoio na rede interna/externa.' }
];

const PRACTICETool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [scores, setScores] = useState<Record<string, number>>({});
  const [obs, setObs] = useState('');

  const analysis = useMemo(() => {
    // Fix: Explicitly cast values to number[] to avoid reduce operator errors on unknown types
    const values = Object.values(scores) as number[];
    if (values.length < DOMAINS.length) return null;

    // Fix: Typed reduce parameters to avoid unknown type addition errors
    const total = values.reduce((a: number, b: number) => a + b, 0);
    let category = "Família Funcional";
    let color = "bg-emerald-100 text-emerald-700 border-emerald-200";
    let interpretation = "Indica boa organização global e capacidade adaptativa preservada.";

    // Fix: Typed total used in comparisons to resolve unknown operator errors
    if (total <= 8) {
      category = "Disfunção Grave";
      color = "bg-rose-100 text-rose-700 border-rose-200";
      interpretation = "Configura disfunção importante, com prejuízo em vários domínios funcionais.";
    } else if (total <= 16) {
      category = "Disfunção Leve/Moderada";
      color = "bg-amber-100 text-amber-700 border-amber-200";
      interpretation = "Indica áreas de fragilidade com risco de sobrecarga, embora com recursos preservados.";
    }

    const getDomainAnalysis = (id: string, val: number) => {
      const phrases: Record<string, string[]> = {
        P: ["Dificuldade crítica em reconhecer e manejar problemas.", "Reconhece parcialmente, mas manejo irregular.", "Identifica e maneja satisfatoriamente.", "Manejo estruturado e adesão consistente."],
        R: ["Papéis pouco definidos e sobrecarga concentrada.", "Papéis parcialmente organizados, zonas de ambiguidade.", "Bem definidos, divisão de tarefas adequada.", "Estrutura equilibrada e apoio mútuo eficiente."],
        A: ["Clima afetivo empobrecido, pouca validação.", "Afeto presente, porém irregular ou distante.", "Bom padrão afetivo e demonstrações de cuidado.", "Relação fortalecida e clima positivo predominante."],
        C1: ["Comunicação prejudicada, alta chance de mal-entendidos.", "Comunicação marcada por ruídos ou omissões.", "Geralmente eficaz, discute decisões com clareza.", "Troca aberta e manejo dialogado do cotidiano."],
        T: ["Tempo muito limitado para convivência de qualidade.", "Convivência irregular e pouco estruturada.", "Tempo razoável, favorecendo acompanhamento.", "Valoriza tempo compartilhado e bem-estar mútuo."],
        I: ["Baixo envolvimento e delegação excessiva a terceiros.", "Envolvimento parcial com oscilações na participação.", "Satisfatório, com compartilhamento razoável.", "Consistente, com participação ativa de todos."],
        C2: ["Coping fragilizado e alta vulnerabilidade ao estresse.", "Enfrentamento parcial, sujeito a desorganização.", "Lida de forma razoável com estressores.", "Mobiliza suporte e recursos de forma resiliente."],
        E: ["Baixa empatia interna e integração limitada com a rede.", "Empatia esporádica e contato externo pouco estruturado.", "Bom nível de empatia e relação razoável com rede apoio.", "Boa empatia e relação positiva com a comunidade."]
      };
      return phrases[id][val];
    };

    return { 
      total, category, color, interpretation,
      details: DOMAINS.map(d => ({ 
        label: d.label, 
        score: scores[d.id], 
        text: getDomainAnalysis(d.id, scores[d.id]) 
      }))
    };
  }, [scores]);

  const selectClass = "w-full px-3 py-2 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-emerald-500/50 outline-none text-[11px] font-black text-slate-900 transition-all cursor-pointer";
  const labelClass = "block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-1";

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
                USF • FUNCIONALIDADE FAMILIAR
              </span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Instrumento PRACTICE</h2>
          </div>
        </div>
        <p className="text-slate-600 text-base font-bold max-w-2xl">
          Avaliação multidimensional em 8 domínios para identificar fragilidades e recursos da dinâmica familiar.
        </p>
      </header>

      <div id="printable-content" className="bg-white border-2 border-slate-200 p-8 rounded-[2.5rem] shadow-strong flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 no-print">
          {DOMAINS.map((domain) => (
            <div key={domain.id}>
              <label className={labelClass}>{domain.label}</label>
              <select 
                value={scores[domain.id] ?? ''} 
                onChange={e => setScores({...scores, [domain.id]: parseInt(e.target.value)})}
                className={selectClass}
              >
                <option value="">Pontuar...</option>
                <option value="0">0 - Muito Ruim</option>
                <option value="1">1 - Regular</option>
                <option value="2">2 - Bom</option>
                <option value="3">3 - Excelente</option>
              </select>
            </div>
          ))}
          <div className="lg:col-span-4">
            <label className={labelClass}>Notas e Contexto (Ciclo de Vida, Rede de Apoio...)</label>
            <input 
              type="text"
              value={obs}
              onChange={e => setObs(e.target.value)}
              placeholder="Ex: Casal idoso, filho cuidador com sobrecarga, rede de apoio frágil..."
              className="w-full px-5 py-3 bg-slate-50 border-2 border-slate-200 rounded-2xl outline-none text-sm font-bold text-slate-900 focus:border-emerald-500/50 transition-all"
            />
          </div>
        </div>

        {analysis ? (
          <div className="flex flex-col gap-8 p-8 rounded-[2rem] border-2 border-emerald-100 bg-emerald-50/30 animate-fade-in">
             <div className="flex flex-col md:flex-row items-start justify-between gap-6 border-b border-emerald-100 pb-6">
                <div className="space-y-1">
                   <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Síntese de Funcionalidade</h3>
                   <p className="text-sm font-bold text-slate-500">{analysis.interpretation}</p>
                </div>
                <div className="flex items-center gap-4">
                   <div className="bg-white px-6 py-4 rounded-2xl border border-emerald-100 text-center shadow-sm">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Escore PRACTICE</p>
                      <p className="text-3xl font-black text-slate-900">{analysis.total}</p>
                      <p className="text-[7px] font-black text-slate-400 uppercase mt-1">(0-24 pts)</p>
                   </div>
                   <span className={`px-5 py-2 rounded-full font-black text-[10px] uppercase border-2 shadow-sm ${analysis.color}`}>
                     {analysis.category}
                   </span>
                </div>
             </div>

             <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                {analysis.details.map((detail, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                     <div className="size-8 rounded-lg bg-white border border-emerald-100 flex items-center justify-center shrink-0 shadow-sm text-[11px] font-black text-emerald-600">
                        {detail.score}
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{detail.label}</p>
                        <p className="text-xs font-bold text-slate-700 leading-relaxed mt-0.5">{detail.text}</p>
                     </div>
                  </div>
                ))}
             </div>

             {obs && (
               <div className="p-5 bg-white/60 rounded-2xl border border-emerald-100/50 text-xs font-bold text-slate-600 italic shadow-inner">
                 "Resumo: {obs}"
               </div>
             )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400 bg-slate-50 rounded-[2rem] border-2 border-slate-100 border-dashed">
            <span className="material-symbols-outlined text-6xl mb-4 opacity-20">dashboard_customize</span>
            <p className="font-black uppercase tracking-widest text-[11px] text-center">Preencha todos os 8 domínios<br/>para gerar o relatório de funcionalidade</p>
          </div>
        )}

        <div className="pt-6 border-t border-slate-100">
           <p className="text-[10px] text-slate-400 font-bold leading-relaxed">
             <span className="text-slate-900 font-black">Nota Técnica:</span> O PRACTICE oferece uma visão sistêmica detalhada. Famílias com escore ≤ 16 devem ter seus domínios mais frágeis priorizados no PTS (Plano Terapêutico Singular). Integre com o FIRO e Ciclo Vital.
           </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 no-print pb-12">
        <button onClick={() => window.print()} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-emerald-600 transition-all shadow-lg">
          <span className="material-symbols-outlined">print</span> Imprimir Instrumento A5
        </button>
        <div className="ml-auto flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border-2 border-slate-100">
           <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
           <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Modelo Baseado em Smilkstein G (1978)</span>
        </div>
      </div>
    </div>
  );
};

export default PRACTICETool;