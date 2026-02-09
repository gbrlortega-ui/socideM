import React, { useState, useMemo, useEffect } from 'react';
import Stopwatch from '../../Stopwatch';

interface Props {
  onBack: () => void;
  initialTab?: 'fried' | 'cfs' | 'mna' | 'metrics' | 'tug' | 'sit-stand' | 'gait-speed';
}

const FrailtyNutritionTool: React.FC<Props> = ({ onBack, initialTab = 'fried' }) => {
  const [activeTab, setActiveTab] = useState<'fried' | 'cfs' | 'mna' | 'metrics' | 'sit-stand' | 'gait-speed'>(
    (initialTab === 'tug' ? 'metrics' : (initialTab as any || 'fried'))
  );
  
  useEffect(() => {
    if (initialTab) {
      if (initialTab === 'tug') setActiveTab('metrics');
      else setActiveTab(initialTab as any);
    }
  }, [initialTab]);
  
  // TUG Auto-result
  const [tugTime, setTugTime] = useState<number | null>(null);

  // Sit-to-Stand 5x State
  const [sitStandTime, setSitStandTime] = useState<number | null>(null);

  // Gait Speed 4m State
  const [gaitSpeedTime, setGaitSpeedTime] = useState<number | null>(null);

  // Fried State
  const [fried, setFried] = useState<boolean[]>(new Array(5).fill(false));
  const friedScore = fried.filter(a => a === true).length;

  // CFS State
  const [cfs, setCfs] = useState<number>(1);

  // MNA State
  const [mna, setMna] = useState<number[]>([2,2,2,2,2,2]);
  const mnaScore = mna.reduce((a,b) => a + b, 0);

  // Nutritional
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  
  const imcValue = useMemo(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (isNaN(w) || isNaN(h) || h <= 0) return null;
    return w / (h * h);
  }, [weight, height]);

  const imcClass = useMemo(() => {
    if (!imcValue) return null;
    if (imcValue < 22) return { label: 'Baixo Peso', color: 'text-amber-500' };
    if (imcValue <= 27) return { label: 'Eutrofia', color: 'text-emerald-600' };
    return { label: 'Excesso de Peso', color: 'text-rose-600' };
  }, [imcValue]);

  const tugClassification = useMemo(() => {
    if (tugTime === null) return null;
    if (tugTime < 10) return { label: "Baixo Risco", color: "text-emerald-600", desc: "Independente e com mobilidade preservada." };
    if (tugTime <= 20) return { label: "Médio Risco", color: "text-amber-600", desc: "Mobilidade limitada; pode precisar de auxílio." };
    return { label: "Alto Risco", color: "text-rose-600", desc: "Grande risco de quedas e dependência funcional." };
  }, [tugTime]);

  const sitStandClassification = useMemo(() => {
    if (sitStandTime === null) return null;
    if (sitStandTime <= 12) return { label: "Normal", color: "text-emerald-600", desc: "Boa força de membros inferiores." };
    if (sitStandTime <= 15) return { label: "Alerta", color: "text-amber-600", desc: "Sugere sarcopenia incipiente ou descondicionamento." };
    return { label: "Risco de Quedas", color: "text-rose-600", desc: "Força reduzida; alto risco de quedas e incapacidade." };
  }, [sitStandTime]);

  const gaitSpeedClassification = useMemo(() => {
    if (gaitSpeedTime === null || gaitSpeedTime === 0) return null;
    const speed = 4 / gaitSpeedTime; // 4 metros / tempo
    if (speed >= 1.0) return { speed, label: "Normal", color: "text-emerald-600", desc: "Velocidade de marcha preservada." };
    if (speed >= 0.8) return { speed, label: "Limítrofe", color: "text-amber-600", desc: "Atenção a declínio funcional futuro." };
    return { speed, label: "Lenta (Risco)", color: "text-rose-600", desc: "Forte preditor de fragilidade e eventos adversos." };
  }, [gaitSpeedTime]);

  const CFS_LEVELS = [
    { val: 1, label: "Muito Robusto", desc: "Ativo, energético, motivado. Exercita-se regularmente." },
    { val: 2, label: "Robusto", desc: "Sem doença ativa, mas menos ativo que o nível 1." },
    { val: 3, label: "Bem, com doença controlada", desc: "Sintomas tratados, mas sem limitações diárias." },
    { val: 4, label: "Vulnerável", desc: "Não dependente, mas limitado por sintomas (ex: fadiga)." },
    { val: 5, label: "Fragilidade Leve", desc: "Precisa de ajuda em AVDs instrumentais (finanças, meds)." },
    { val: 6, label: "Fragilidade Moderada", desc: "Precisa de ajuda em AVDs básicas (banho, vestir)." },
    { val: 7, label: "Fragilidade Grave", desc: "Dependência total para cuidados pessoais." },
    { val: 8, label: "Fragilidade Muito Grave", desc: "Completamente dependente, aproximando-se do fim da vida." },
    { val: 9, label: "Doença Terminal", desc: "Expectativa de vida inferior a 6 meses." }
  ];

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10 bg-light-glow min-h-full">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-purple-600 shadow-sm transition-all">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-[9px] font-black uppercase tracking-[0.2em]">AGA • FRAGILIDADE E MOBILIDADE</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1 uppercase">
            {activeTab === 'fried' ? 'Fragilidade de Fried' : 
             activeTab === 'cfs' ? 'Clinical Frailty Scale' : 
             activeTab === 'mna' ? 'Mini Avaliação Nutricional' : 
             activeTab === 'sit-stand' ? 'Sentar e Levantar 5x' :
             activeTab === 'gait-speed' ? 'Velocidade de Marcha' : 'IMC e TUG'}
          </h2>
        </div>
      </header>

      <div className="flex gap-2 no-print overflow-x-auto pb-2 custom-scrollbar">
        {[
          { id: 'fried', label: 'Fried' },
          { id: 'cfs', label: 'CFS (Visual)' },
          { id: 'metrics', label: 'TUG / IMC' },
          { id: 'sit-stand', label: 'Sentar/Levantar' },
          { id: 'gait-speed', label: 'Vel. Marcha' },
          { id: 'mna', label: 'MNA (Nutrição)' }
        ].map(t => (
          <button 
            key={t.id} 
            onClick={() => setActiveTab(t.id as any)}
            className={`flex-1 min-w-[120px] py-4 rounded-2xl font-black text-xs uppercase border-2 transition-all ${activeTab === t.id ? 'bg-white border-purple-600 text-purple-600 shadow-lg' : 'bg-white border-slate-100 text-slate-400'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white border-2 border-slate-200 p-8 rounded-[3rem] shadow-strong space-y-8 animate-fade-in">
        {activeTab === 'fried' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
               <div>
                 <h3 className="text-xl font-black text-slate-900 uppercase">Fenótipo de Fried</h3>
                 <p className="text-xs font-bold text-slate-400">Componentes Fisiológicos</p>
               </div>
               <div className={`text-center px-6 py-2 rounded-2xl text-white shadow-lg ${friedScore >= 3 ? 'bg-rose-600' : friedScore >= 1 ? 'bg-amber-500' : 'bg-emerald-600'}`}>
                  <p className="text-2xl font-black">{friedScore}/5</p>
                  <p className="text-[7px] font-black uppercase">{friedScore >= 3 ? 'Frágil' : friedScore >= 1 ? 'Pré-frágil' : 'Robusto'}</p>
               </div>
            </div>
            <div className="space-y-3">
              {[
                "Perda de peso não intencional (superior a 4.5kg no último ano)",
                "Exaustão (fadiga autorreferida)",
                "Baixa força de preensão (Dinamometria inferior a P20)",
                "Baixa velocidade de marcha (Tempo superior a P20)",
                "Baixo nível de atividade física (inferior a 383/270 kcal/sem)"
              ].map((q, i) => (
                <button 
                  key={i} 
                  onClick={() => {
                    const n = [...fried];
                    n[i] = !n[i];
                    setFried(n);
                  }}
                  className={`w-full p-5 rounded-2xl border-2 text-left flex justify-between items-center transition-all ${fried[i] ? 'bg-purple-50 border-purple-600 text-purple-900 shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-400'}`}
                >
                  <span className="text-sm font-bold">{q}</span>
                  <span className="material-symbols-outlined">{fried[i] ? 'check_box' : 'check_box_outline_blank'}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cfs' && (
          <div className="space-y-6 animate-fade-in">
             <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-xl font-black text-slate-900 uppercase">Clinical Frailty Scale</h3>
                <div className={`px-6 py-2 rounded-2xl text-white shadow-lg ${cfs >= 5 ? 'bg-rose-600' : 'bg-emerald-600'}`}>
                   <p className="text-2xl font-black">Nível {cfs}</p>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {CFS_LEVELS.map(item => (
                  <button 
                    key={item.val} 
                    onClick={() => setCfs(item.val)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${cfs === item.val ? 'bg-purple-600 text-white border-purple-600' : 'bg-slate-50 border-slate-100 text-slate-600'}`}
                  >
                     <p className="font-black text-xs uppercase">{item.val}. {item.label}</p>
                     <p className="text-[10px] mt-1 opacity-80">{item.desc}</p>
                  </button>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'sit-stand' && (
          <div className="space-y-10 animate-fade-in">
             <div className="border-b pb-4">
                <h3 className="text-xl font-black text-slate-900 uppercase">Sentar e Levantar 5x</h3>
                <p className="text-xs font-bold text-slate-400">Avaliação de força e equilíbrio</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                   <p className="text-sm font-bold text-slate-600 leading-relaxed">
                     Instrua o paciente a cruzar os braços sobre o peito e levantar-se e sentar-se da cadeira o mais rápido possível por 5 vezes consecutivas.
                   </p>
                   <Stopwatch label="Cronometrar 5 Repetições" color="rose" onStop={(sec) => setSitStandTime(sec)} />
                </div>
                <div>
                   {sitStandTime !== null && sitStandClassification && (
                     <div className="p-8 rounded-[2.5rem] border-2 border-rose-100 bg-rose-50 space-y-4 animate-fade-in shadow-sm">
                        <div className="flex justify-between items-center">
                           <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Resultado</span>
                           <span className={`px-4 py-1.5 rounded-full text-white text-[10px] font-black uppercase ${sitStandClassification.color.replace('text-', 'bg-')}`}>
                              {sitStandClassification.label}
                           </span>
                        </div>
                        <p className="text-4xl font-black text-slate-900">{sitStandTime.toFixed(2)}s</p>
                        <p className="text-sm font-bold text-slate-600 leading-tight italic">{sitStandClassification.desc}</p>
                     </div>
                   )}
                </div>
             </div>
          </div>
        )}

        {activeTab === 'gait-speed' && (
          <div className="space-y-10 animate-fade-in">
             <div className="border-b pb-4">
                <h3 className="text-xl font-black text-slate-900 uppercase">Velocidade de Marcha (4 metros)</h3>
                <p className="text-xs font-bold text-slate-400">Preditivo de fragilidade e sobrevida</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                   <p className="text-sm font-bold text-slate-600 leading-relaxed">
                     Marque 4 metros no chão. Cronometre o tempo que o paciente leva para percorrer a distância em passo usual.
                   </p>
                   <Stopwatch label="Tempo nos 4 Metros" color="blue" onStop={(sec) => setGaitSpeedTime(sec)} />
                </div>
                <div>
                   {gaitSpeedTime !== null && gaitSpeedClassification && (
                     <div className="p-8 rounded-[2.5rem] border-2 border-blue-100 bg-blue-50 space-y-4 animate-fade-in shadow-sm">
                        <div className="flex justify-between items-center">
                           <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Resultado</span>
                           <span className={`px-4 py-1.5 rounded-full text-white text-[10px] font-black uppercase ${gaitSpeedClassification.color.replace('text-', 'bg-')}`}>
                              {gaitSpeedClassification.label}
                           </span>
                        </div>
                        <div className="space-y-1">
                          <p className="text-4xl font-black text-slate-900">{gaitSpeedClassification.speed.toFixed(2)} m/s</p>
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Tempo: {gaitSpeedTime.toFixed(2)}s</p>
                        </div>
                        <p className="text-sm font-bold text-slate-600 leading-tight italic">{gaitSpeedClassification.desc}</p>
                     </div>
                   )}
                </div>
             </div>
          </div>
        )}

        {activeTab === 'mna' && (
          <div className="space-y-6 animate-fade-in">
             <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-xl font-black text-slate-900 uppercase">Mini Avaliação Nutricional</h3>
                <div className={`text-center px-6 py-2 rounded-2xl text-white shadow-lg ${mnaScore >= 12 ? 'bg-emerald-600' : mnaScore >= 8 ? 'bg-amber-500' : 'bg-rose-600'}`}>
                   <p className="text-2xl font-black">{mnaScore}/14</p>
                   <p className="text-[7px] font-black uppercase">{mnaScore >= 12 ? 'Normal' : mnaScore >= 8 ? 'Risco' : 'Desnutrido'}</p>
                </div>
             </div>
             <div className="space-y-4">
                {[
                  { label: "A. Ingestão alimentar diminuída nos últimos 3 meses?", opts: ["Grave (0)", "Moderada (1)", "Sem redução (2)"], points: [0, 1, 2] },
                  { label: "B. Perda de peso nos últimos 3 meses?", opts: ["superior a 3kg (0)", "Não sabe (1)", "1-3kg (2)", "Sem perda (3)"], points: [0, 1, 2, 3] },
                  { label: "C. Mobilidade?", opts: ["Restrito leito (0)", "UBS/Casa (1)", "Normal (2)"], points: [0, 1, 2] },
                  { label: "D. Estresse psicológico ou doença aguda (3m)?", opts: ["Sim (0)", "Não (2)"], points: [0, 2] },
                  { label: "E. Problemas neuropsicológicos?", opts: ["Demência/Depressão (0)", "CCL (1)", "Sem problemas (2)"], points: [0, 1, 2] },
                  { label: "F. IMC?", opts: ["abaixo de 19 (0)", "19-21 (1)", "21-23 (2)", "igual ou superior a 23 (3)"], points: [0, 1, 2, 3] }
                ].map((q, idx) => (
                  <div key={idx} className="space-y-2">
                    <p className="text-xs font-bold text-slate-700">{q.label}</p>
                    <div className="flex gap-1.5 flex-wrap">
                      {q.opts.map((opt, i) => (
                        <button key={i} onClick={() => {
                          const n = [...mna];
                          n[idx] = q.points[i];
                          setMna(n);
                        }} className={`px-3 py-2 rounded-lg border-2 text-[9px] font-black uppercase transition-all ${mna[idx] === q.points[i] ? 'bg-purple-600 text-white border-purple-600' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="space-y-12">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* IMC Section */}
                <div className="space-y-4">
                   <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b pb-2">IMC Idoso (OPAS/WHO)</h4>
                   <div className="grid grid-cols-2 gap-4">
                      <input type="number" placeholder="Peso (kg)" value={weight} onChange={e=>setWeight(e.target.value)} className="p-4 bg-slate-50 border-2 border-slate-200 rounded-xl font-bold outline-none focus:border-purple-600" />
                      <input type="number" placeholder="Altura (cm)" value={height} onChange={e=>setHeight(e.target.value)} className="p-4 bg-slate-50 border-2 border-slate-200 rounded-xl font-bold outline-none focus:border-purple-600" />
                   </div>
                   {imcValue && (
                     <div className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-100 text-center animate-fade-in">
                        <p className="text-4xl font-black text-slate-900">{imcValue.toFixed(1)}</p>
                        <p className={`text-[10px] font-black uppercase mt-1 ${imcClass?.color}`}>{imcClass?.label}</p>
                        <p className="text-[8px] text-slate-400 mt-2">Corte: Baixo Peso {"<"} 22 | Eutrofia 22-27 | Excesso {">"} 27</p>
                     </div>
                   )}
                </div>

                {/* TUG Section */}
                <div className="space-y-6">
                   <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b pb-2">Timed Up and Go (TUG)</h4>
                   
                   <Stopwatch label="Teste de Marcha" color="purple" onStop={(sec) => setTugTime(sec)} />

                   {tugTime !== null && tugClassification && (
                     <div className="p-6 rounded-3xl border-2 border-purple-100 bg-purple-50 space-y-2 animate-fade-in shadow-sm">
                        <div className="flex justify-between items-center">
                           <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Resultado</span>
                           <span className={`px-4 py-1.5 rounded-full text-white text-[10px] font-black uppercase ${tugClassification.color.replace('text-', 'bg-')}`}>
                              {tugClassification.label}
                           </span>
                        </div>
                        <p className="text-2xl font-black text-slate-900">{tugTime.toFixed(2)}s</p>
                        <p className="text-xs font-bold text-slate-600 leading-tight italic">{tugClassification.desc}</p>
                     </div>
                   )}

                   {!tugTime && (
                      <div className="p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-center">
                         <p className="text-xs font-bold text-slate-400 leading-relaxed italic">
                           Levante-se da cadeira, caminhe 3 metros, retorne e sente-se novamente.
                         </p>
                      </div>
                   )}
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FrailtyNutritionTool;