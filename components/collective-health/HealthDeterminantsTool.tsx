import React, { useState, useMemo } from 'react';

interface Determinant {
  id: string;
  label: string;
}

interface Group {
  title: string;
  items: Determinant[];
}

const DETERMINANTS_GROUPS: Group[] = [
  {
    title: "Biológicos",
    items: [
      { id: "bio_idade", label: "Idade extrema (menor de 1 ano ou maior de 70 anos)" },
      { id: "bio_cronicas", label: "Presença de doenças crônicas (DM2, HAS, DPOC, Renal)" },
      { id: "bio_deficiencia", label: "Deficiência física ou mental no núcleo familiar" }
    ]
  },
  {
    title: "Comportamentais",
    items: [
      { id: "comp_drogas", label: "Hábito de tabagismo, etilismo ou uso de substâncias" },
      { id: "comp_dieta", label: "Sedentarismo / alimentação inadequada" },
      { id: "comp_adesao", label: "Adesão inadequada ao tratamento ou autocuidado" }
    ]
  },
  {
    title: "Socioeconômicos",
    items: [
      { id: "socio_renda", label: "Baixa renda (≤ 1 Salário Mínimo per capita)" },
      { id: "socio_escola", label: "Baixa escolaridade / analfabetismo funcional" },
      { id: "socio_emprego", label: "Desemprego ou trabalho informal/instável" }
    ]
  },
  {
    title: "Ambientais",
    items: [
      { id: "amb_sanea", label: "Saneamento inadequado (água, esgoto, lixo)" },
      { id: "amb_moradia", label: "Moradia precária / superlotação" },
      { id: "amb_risco", label: "Risco ambiental (alagamento, contaminação, violência)" }
    ]
  },
  {
    title: "Acesso aos Serviços",
    items: [
      { id: "acesso_ubs", label: "Dificuldade de acesso à UBS / transporte precário" },
      { id: "acesso_vinculo", label: "Falta de vínculo com a equipe de referência" },
      { id: "acesso_meds", label: "Falta de medicamentos ou acompanhamento contínuo" }
    ]
  }
];

const HealthDeterminantsTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [obs, setObs] = useState('');

  const analysis = useMemo(() => {
    // Fix: Explicitly cast values to number[] to avoid reduce operator errors on unknown types
    const values = Object.values(answers) as number[];
    const totalItems = DETERMINANTS_GROUPS.reduce((acc, g) => acc + g.items.length, 0);
    
    if (values.length < totalItems) return null;

    // Fix: Typed reduce parameters to avoid unknown type addition errors
    const score = values.reduce((acc: number, v: number) => acc + v, 0);
    let level = "Baixa vulnerabilidade";
    let color = "bg-emerald-100 text-emerald-700 border-emerald-200";
    
    // Fix: Typed score used in comparisons to resolve unknown operator errors
    if (score >= 9) {
      level = "Alta vulnerabilidade social/familiar";
      color = "bg-rose-100 text-rose-700 border-rose-200";
    } else if (score >= 5) {
      level = "Vulnerabilidade moderada";
      color = "bg-amber-100 text-amber-700 border-amber-200";
    }

    return { score, level, color };
  }, [answers]);

  const handleSelect = (id: string, val: number) => {
    setAnswers(prev => ({ ...prev, [id]: val }));
  };

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10 bg-light-glow min-h-full">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          #printable-content { padding: 0 !important; border: none !important; box-shadow: none !important; }
          @page { size: A5; margin: 1cm; }
          .determinants-table th, .determinants-table td { font-size: 9px !important; padding: 4px !important; }
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
                USF • DETERMINANTES SOCIAIS
              </span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Fatores Determinantes em Saúde</h2>
          </div>
        </div>
        <p className="text-slate-600 text-base font-bold max-w-2xl">
          Avaliação baseada no modelo DSS do Ministério da Saúde para priorização de cuidados e visitas domiciliares.
        </p>
      </header>

      <div id="printable-content" className="bg-white border-2 border-slate-200 p-8 rounded-[2.5rem] shadow-strong flex flex-col gap-6">
        <div className="flex justify-between items-end border-b border-slate-100 pb-4">
           <div>
             <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase">Rastreio de Vulnerabilidade</h3>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Preencha todos os campos (0 a 2 pts)</p>
           </div>
           {analysis && (
             <div className={`px-4 py-1.5 rounded-full font-black text-[10px] uppercase border shadow-sm ${analysis.color}`}>
               {analysis.level}
             </div>
           )}
        </div>

        <div className="overflow-x-auto rounded-[2rem] border border-slate-100 no-print">
          <table className="w-full border-collapse determinants-table">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Fator / Determinante</th>
                <th className="px-4 py-4 text-center text-[10px] font-black text-emerald-600 uppercase">0 pts</th>
                <th className="px-4 py-4 text-center text-[10px] font-black text-amber-600 uppercase">1 pt</th>
                <th className="px-4 py-4 text-center text-[10px] font-black text-rose-600 uppercase">2 pts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {DETERMINANTS_GROUPS.map((group) => (
                <React.Fragment key={group.title}>
                  <tr className="bg-slate-50/50">
                    <td colSpan={4} className="px-6 py-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">{group.title}</td>
                  </tr>
                  {group.items.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-slate-700 leading-tight">{item.label}</td>
                      {[0, 1, 2].map((val) => (
                        <td key={val} className="px-4 py-4 text-center">
                          <button
                            onClick={() => handleSelect(item.id, val)}
                            className={`size-8 rounded-full border-2 transition-all font-black text-xs ${
                              answers[item.id] === val
                                ? 'bg-emerald-600 border-emerald-600 text-white shadow-md'
                                : 'bg-white border-slate-200 text-slate-300 hover:border-emerald-200'
                            }`}
                          >
                            {val}
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 no-print">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Observações e Contexto Territorial</label>
          <textarea
            value={obs}
            onChange={(e) => setObs(e.target.value)}
            placeholder="Ex: Renda instável, insegurança alimentar, suporte social frágil..."
            className="w-full h-24 px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-[2rem] outline-none text-sm font-bold text-slate-900 focus:border-emerald-500/50 resize-none transition-all"
          />
        </div>

        {analysis ? (
          <div className="flex flex-col md:flex-row gap-8 p-8 rounded-[2rem] border-2 border-emerald-100 bg-emerald-50/30 animate-fade-in">
             <div className="flex flex-col items-center justify-center bg-white px-8 py-6 rounded-2xl border border-emerald-100 shadow-sm min-w-[140px]">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Pontuação</p>
                <p className="text-4xl font-black text-slate-900 leading-none">{analysis.score}</p>
                <p className="text-[8px] font-black text-emerald-600 uppercase mt-2">Índice DSS</p>
             </div>
             <div className="flex-1 space-y-4">
                <div>
                   <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Diagnóstico de Vulnerabilidade</h4>
                   <p className="text-sm font-bold text-slate-600 leading-relaxed">
                     Esta família apresenta um índice classificado como <span className="text-emerald-700">{analysis.level}</span>. 
                     {analysis.score >= 9 && " Priorizar visita domiciliar imediata e articulação intersetorial (CRAS/CAPS)."}
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
            <span className="material-symbols-outlined text-6xl mb-4 opacity-20">rule</span>
            <p className="font-black uppercase tracking-widest text-[11px]">Responda todos os fatores para calcular o índice</p>
          </div>
        )}

        <div className="pt-6 border-t border-slate-100">
           <p className="text-[10px] text-slate-400 font-bold leading-relaxed">
             <span className="text-slate-900 font-black">Nota Técnica:</span> Instrumento auxiliar para construção do Plano Terapêutico Singular. Integre com o Ciclo Vital e Genograma para uma visão biopsicossocial completa.
           </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 no-print pb-12">
        <button onClick={() => window.print()} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-emerald-600 transition-all shadow-lg">
          <span className="material-symbols-outlined">print</span> Imprimir Instrumento A5
        </button>
        <div className="ml-auto flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border-2 border-slate-100">
           <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
           <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Baseado na Política Nacional de Atenção Básica</span>
        </div>
      </div>
    </div>
  );
};

export default HealthDeterminantsTool;