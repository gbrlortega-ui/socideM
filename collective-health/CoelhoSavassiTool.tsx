import React, { useState, useMemo } from 'react';

interface Condition {
  id: string;
  label: string;
  points: number;
}

const CONDITIONS: Condition[] = [
  { id: 'acamado', label: 'Acamado', points: 3 },
  { id: 'def_fisica', label: 'Deficiência física', points: 3 },
  { id: 'def_mental', label: 'Deficiência mental', points: 3 },
  { id: 'saneamento', label: 'Baixas condições de saneamento', points: 3 },
  { id: 'desnutricao', label: 'Desnutrição (grave)', points: 3 },
  { id: 'drogadicao', label: 'Drogadição', points: 2 },
  { id: 'desemprego', label: 'Desemprego', points: 2 },
  { id: 'analfabetismo', label: 'Analfabetismo', points: 1 },
  { id: 'menor_6m', label: 'Menor de 6 meses', points: 1 },
  { id: 'maior_70a', label: 'Maior de 70 anos', points: 1 },
  { id: 'has', label: 'Hipertensão arterial sistêmica', points: 1 },
];

const CoelhoSavassiTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selectedConditions, setSelectedConditions] = useState<Set<string>>(new Set());
  const [residents, setResidents] = useState<string>('');
  const [rooms, setRooms] = useState<string>('');

  const analysis = useMemo(() => {
    let conditionScore = 0;
    selectedConditions.forEach(id => {
      const condition = CONDITIONS.find(c => c.id === id);
      if (condition) conditionScore += condition.points;
    });

    let ratioScore = 0;
    let ratioValue = 0;
    const resCount = parseInt(residents);
    const roomCount = parseInt(rooms);

    if (resCount > 0 && roomCount > 0) {
      ratioValue = resCount / roomCount;
      if (ratioValue > 1) ratioScore = 3;
      else if (ratioValue === 1) ratioScore = 2;
      else ratioScore = 0;
    }

    const totalScore = conditionScore + ratioScore;
    let riskLabel = "R0 – Sem risco";
    let riskColor = "bg-emerald-100 text-emerald-700 border-emerald-200";

    if (totalScore >= 9) {
      riskLabel = "R3 – Risco alto";
      riskColor = "bg-rose-100 text-rose-700 border-rose-200";
    } else if (totalScore >= 7) {
      riskLabel = "R2 – Risco moderado";
      riskColor = "bg-orange-100 text-orange-700 border-orange-200";
    } else if (totalScore >= 5) {
      riskLabel = "R1 – Risco leve";
      riskColor = "bg-amber-100 text-amber-700 border-amber-200";
    }

    return { totalScore, conditionScore, ratioScore, ratioValue, riskLabel, riskColor };
  }, [selectedConditions, residents, rooms]);

  const toggleCondition = (id: string) => {
    const newSet = new Set(selectedConditions);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedConditions(newSet);
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
              <span className="px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-900 text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                USF • ESTRATIFICAÇÃO DE RISCO
              </span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Escala Coelho-Savassi</h2>
          </div>
        </div>
        <p className="text-slate-600 text-base font-bold max-w-2xl">
          Instrumento oficial para priorização de visitas domiciliares e organização do cuidado na Estratégia Saúde da Família.
        </p>
      </header>

      <div id="printable-card" className="bg-white border-2 border-slate-200 p-8 rounded-[2.5rem] shadow-strong flex flex-col gap-8">
        <div className="flex justify-between items-end border-b border-slate-100 pb-4">
           <div>
             <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase">Risco Familiar</h3>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Selecione as condições presentes</p>
           </div>
           <div className={`px-4 py-1.5 rounded-full font-black text-[10px] uppercase border shadow-sm ${analysis.riskColor}`}>
             {analysis.riskLabel}
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2">
          {CONDITIONS.map((c) => (
            <button
              key={c.id}
              onClick={() => toggleCondition(c.id)}
              className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all group ${
                selectedConditions.has(c.id)
                  ? 'bg-emerald-50 border-emerald-600/30'
                  : 'bg-white border-slate-100 hover:border-emerald-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`size-5 rounded flex items-center justify-center border-2 transition-colors ${
                  selectedConditions.has(c.id) ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-slate-200'
                }`}>
                  {selectedConditions.has(c.id) && <span className="material-symbols-outlined text-[14px] font-black">check</span>}
                </div>
                <span className={`text-sm font-bold transition-colors ${selectedConditions.has(c.id) ? 'text-emerald-900' : 'text-slate-600'}`}>{c.label}</span>
              </div>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg border ${
                selectedConditions.has(c.id) ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-slate-50 text-slate-400 border-slate-200'
              }`}>
                {c.points} pt{c.points > 1 ? 's' : ''}
              </span>
            </button>
          ))}
        </div>

        <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-200">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                 <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Habitação e Densidade</h4>
                 <p className="text-xs text-slate-400 font-bold leading-tight">Relação Morador / Cômodo (Dormitórios + Convívio)</p>
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase text-center">Moradores</label>
                    <input 
                      type="number" 
                      value={residents} 
                      onChange={e => setResidents(e.target.value)}
                      className="w-20 px-3 py-2 bg-white border-2 border-slate-200 rounded-xl outline-none focus:border-emerald-500 text-center font-black text-slate-900"
                    />
                 </div>
                 <span className="text-2xl text-slate-300 pt-4">/</span>
                 <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase text-center">Cômodos</label>
                    <input 
                      type="number" 
                      value={rooms} 
                      onChange={e => setRooms(e.target.value)}
                      className="w-20 px-3 py-2 bg-white border-2 border-slate-200 rounded-xl outline-none focus:border-emerald-500 text-center font-black text-slate-900"
                    />
                 </div>
              </div>
           </div>
           
           {analysis.ratioValue > 0 && (
             <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center">
                <p className="text-xs font-bold text-slate-600">
                  Relação: <span className="text-slate-900 font-black">{analysis.ratioValue.toFixed(2)}</span>
                </p>
                <div className={`px-3 py-1 rounded-lg font-black text-[10px] uppercase border ${
                  analysis.ratioScore === 3 ? 'bg-rose-100 text-rose-700 border-rose-200' : 
                  analysis.ratioScore === 2 ? 'bg-amber-100 text-amber-700 border-amber-200' : 
                  'bg-emerald-100 text-emerald-700 border-emerald-200'
                }`}>
                  + {analysis.ratioScore} pontos na escala
                </div>
             </div>
           )}
        </div>

        <div className="flex flex-col md:flex-row gap-8 p-8 rounded-[2.5rem] border-2 border-emerald-100 bg-emerald-50/20 animate-fade-in">
           <div className="flex flex-col items-center justify-center bg-white px-8 py-6 rounded-3xl border border-emerald-100 shadow-sm min-w-[160px]">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Escore Total</p>
              <p className="text-5xl font-black text-slate-900 leading-none">{analysis.totalScore}</p>
              <p className="text-[9px] font-black text-emerald-600 uppercase mt-2 tracking-widest">Pontos Coelho-Savassi</p>
           </div>
           <div className="flex-1 space-y-4">
              <div className="space-y-1">
                 <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Estratificação Acadêmica</h4>
                 <p className="text-sm font-bold text-slate-600 leading-relaxed">
                   A família foi classificada em <span className="text-emerald-700 font-black">{analysis.riskLabel}</span>. 
                   {analysis.totalScore >= 9 ? " Prioridade máxima de acompanhamento multiprofissional." : 
                    analysis.totalScore >= 5 ? " Necessita de seguimento periódico e monitoramento de riscos." : 
                    " Família com boas condições gerais; seguimento rotineiro."}
                 </p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                 <div className="p-3 bg-white/60 rounded-xl border border-emerald-100/50">
                    <p className="text-[8px] font-black text-slate-400 uppercase">Pontos Clínicos</p>
                    <p className="text-xs font-black text-slate-700">{analysis.conditionScore}</p>
                 </div>
                 <div className="p-3 bg-white/60 rounded-xl border border-emerald-100/50">
                    <p className="text-[8px] font-black text-slate-400 uppercase">Pontos Habitacionais</p>
                    <p className="text-xs font-black text-slate-700">{analysis.ratioScore}</p>
                 </div>
              </div>
           </div>
        </div>

        <div className="pt-6 border-t border-slate-100">
           <p className="text-[10px] text-slate-400 font-bold leading-relaxed">
             <span className="text-slate-900 font-black">Nota Metodológica:</span> Escala baseada em Coelho & Savassi (2004). R0 (0-4 pts), R1 (5-6 pts), R2 (7-8 pts), R3 ({" > "}9 pts). Integre com APGAR e Genograma para decisão clínica completa.
           </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 no-print pb-12">
        <button onClick={() => window.print()} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-emerald-600 transition-all shadow-lg">
          <span className="material-symbols-outlined">print</span> Imprimir Escala A5
        </button>
        <div className="ml-auto flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border-2 border-slate-100">
           <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
           <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Baseado em Protocolos da Atenção Básica</span>
        </div>
      </div>
    </div>
  );
};

export default CoelhoSavassiTool;