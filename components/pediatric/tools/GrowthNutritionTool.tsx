import React, { useState, useMemo, useEffect, useRef } from 'react';

// ------------------------------------------------------------
// Tabelas resumidas OMS (pontos-chave 0–19 anos, em meses)
// ------------------------------------------------------------
const PONTOS = [0, 1, 2, 3, 4, 5, 6, 9, 12, 18, 24, 36, 48, 60, 84, 120, 156, 180, 204, 228];

const PESO_M = [3.3, 4.5, 5.6, 6.4, 7.0, 7.6, 8.0, 8.9, 9.6, 11.0, 12.2, 14.3, 16.3, 18.3, 23.0, 30.1, 40.5, 52.5, 61.0, 68.0];
const PESO_F = [3.2, 4.3, 5.3, 6.1, 6.7, 7.3, 7.8, 8.6, 8.9, 10.3, 11.5, 13.5, 15.5, 17.3, 22.0, 28.9, 38.0, 50.2, 56.0, 60.0];

const ALT_M = [49.9, 54.7, 58.4, 61.1, 63.5, 65.7, 67.6, 71.0, 75.7, 80.7, 87.8, 96.1, 103.3, 110.0, 124.0, 138.0, 152.0, 164.0, 171.0, 176.0];
const ALT_F = [49.1, 53.7, 57.1, 59.8, 62.1, 64.0, 65.7, 69.0, 74.0, 79.0, 86.4, 95.1, 102.7, 109.0, 125.0, 140.0, 153.0, 162.0, 166.0, 168.0];

const PC_M = [34.5, 37.3, 39.1, 40.5, 41.6, 42.5, 43.0, 44.5, 46.1, 47.4, 48.3, 49.0, 49.6, 50.2, 50.5, 50.8, 51.0, 51.1, 51.2, 51.3];
const PC_F = [34.2, 36.5, 38.3, 39.7, 40.8, 41.8, 42.4, 43.9, 45.6, 46.8, 47.8, 48.5, 49.1, 49.9, 50.3, 50.6, 50.8, 50.9, 51.0, 51.1];

const IMC_M = [13.5, 15.0, 15.8, 16.0, 16.1, 16.2, 16.3, 16.5, 16.0, 15.8, 15.6, 15.5, 16.1, 17.0, 18.2, 19.5, 20.8, 21.5, 22.0, 22.3];
const IMC_F = [13.4, 14.8, 15.5, 15.7, 15.8, 15.9, 16.0, 16.2, 15.7, 15.5, 15.3, 15.3, 16.2, 17.5, 18.7, 19.8, 20.5, 21.0, 21.8, 22.0];

const DP_PESO = 0.12;
const DP_ALT = 0.025;
const DP_IMC = 0.06;
const DP_PC = 0.02;

const interpola = (tab: number[], idade: number) => {
  if (idade <= PONTOS[0]) return tab[0];
  if (idade >= PONTOS[PONTOS.length - 1]) return tab[tab.length - 1];
  for (let i = 0; i < PONTOS.length - 1; i++) {
    if (idade >= PONTOS[i] && idade <= PONTOS[i + 1]) {
      const frac = (idade - PONTOS[i]) / (PONTOS[i + 1] - PONTOS[i]);
      return tab[i] + frac * (tab[i + 1] - tab[i]);
    }
  }
  return tab[0];
};

const normalCDF = (z: number) => {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp(-z * z / 2);
  let prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  if (z > 0) prob = 1 - prob;
  return prob;
};

const getZScore = (valor: number, media: number, dpRel: number) => (valor - media) / (media * dpRel);

const classificarZ = (z: number) => {
  if (z < -3) return ["Muito abaixo do esperado", "bg-rose-50 border-rose-200 text-rose-700"];
  if (z < -2) return ["Abaixo do esperado", "bg-amber-50 border-amber-200 text-amber-700"];
  if (z <= 2) return ["Dentro da faixa esperada", "bg-emerald-50 border-emerald-200 text-emerald-700"];
  if (z <= 3) return ["Acima do esperado", "bg-amber-50 border-amber-200 text-amber-700"];
  return ["Muito acima do esperado", "bg-rose-50 border-rose-200 text-rose-700"];
};

const GrowthNutritionTool: React.FC<{ onBack: () => void, initialTab?: 'imc' | 'sc' }> = ({ onBack, initialTab = 'imc' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sex, setSex] = useState<'M' | 'F'>('M');
  const [ageUnit, setAgeUnit] = useState<'meses' | 'anos'>('meses');
  const [ageValue, setAgeValue] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [pc, setPc] = useState('');
  const [activeChart, setActiveChart] = useState<'imc' | 'peso' | 'altura' | 'pc' | 'sc'>(initialTab as any);

  const ageInMonths = useMemo(() => {
    const val = parseFloat(ageValue);
    if (isNaN(val)) return 0;
    return ageUnit === 'anos' ? val * 12 : val;
  }, [ageValue, ageUnit]);

  const results = useMemo(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const p = parseFloat(pc);
    if (isNaN(w) || isNaN(h) || h <= 0) return null;

    const imc = w / Math.pow(h / 100, 2);

    const mPeso = interpola(sex === 'M' ? PESO_M : PESO_F, ageInMonths);
    const mAlt = interpola(sex === 'M' ? ALT_M : ALT_F, ageInMonths);
    const mIMC = interpola(sex === 'M' ? IMC_M : IMC_F, ageInMonths);
    const mPC = interpola(sex === 'M' ? PC_M : PC_F, ageInMonths);

    const zPeso = getZScore(w, mPeso, DP_PESO);
    const zAlt = getZScore(h, mAlt, DP_ALT);
    const zIMC = getZScore(imc, mIMC, DP_IMC);
    const zPC = isNaN(p) ? null : getZScore(p, mPC, DP_PC);

    // Superfície Corporal
    const scMosteller = Math.sqrt((w * h) / 3600);
    const scHaycock = 0.024265 * Math.pow(h, 0.3964) * Math.pow(w, 0.5378);

    return {
      imc: { val: imc, z: zIMC, p: Math.round(normalCDF(zIMC) * 100), class: classificarZ(zIMC) },
      peso: { val: w, z: zPeso, p: Math.round(normalCDF(zPeso) * 100), class: classificarZ(zPeso) },
      altura: { val: h, z: zAlt, p: Math.round(normalCDF(zAlt) * 100), class: classificarZ(zAlt) },
      pc: zPC !== null ? { val: p, z: zPC, p: Math.round(normalCDF(zPC) * 100), class: classificarZ(zPC) } : null,
      sc: { mosteller: scMosteller, haycock: scHaycock }
    };
  }, [weight, height, pc, ageInMonths, sex]);

  useEffect(() => {
    if (!canvasRef.current || activeChart === 'sc') return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    let tabMediana, labelY, valorPonto, dpRel;
    const isBoy = sex === 'M';

    switch (activeChart) {
      case 'imc': tabMediana = isBoy ? IMC_M : IMC_F; labelY = "IMC"; valorPonto = results?.imc.val; dpRel = DP_IMC; break;
      case 'peso': tabMediana = isBoy ? PESO_M : PESO_F; labelY = "Peso (kg)"; valorPonto = results?.peso.val; dpRel = DP_PESO; break;
      case 'altura': tabMediana = isBoy ? ALT_M : ALT_F; labelY = "Alt (cm)"; valorPonto = results?.altura.val; dpRel = DP_ALT; break;
      case 'pc': tabMediana = isBoy ? PC_M : PC_F; labelY = "PC (cm)"; valorPonto = results?.pc?.val; dpRel = DP_PC; break;
    }

    if (!tabMediana) return;

    const marginLeft = 60, marginRight = 20, marginTop = 30, marginBottom = 40;
    const zLevels = [-3, -2, -1, 0, 1, 2, 3];
    const curves = zLevels.map(z => PONTOS.map((m, idx) => tabMediana![idx] + z * (tabMediana![idx] * dpRel!)));

    let minRef = curves[0][0], maxRef = curves[6][curves[6].length - 1];
    curves.forEach(cur => cur.forEach(v => { minRef = Math.min(minRef, v); maxRef = Math.max(maxRef, v); }));
    const rangeY = maxRef - minRef;
    minRef -= rangeY * 0.1; maxRef += rangeY * 0.1;

    const xScale = (m: number) => marginLeft + (m / 228) * (w - marginLeft - marginRight);
    const yScale = (v: number) => h - marginBottom - ((v - minRef) / (maxRef - minRef)) * (h - marginTop - marginBottom);

    ctx.strokeStyle = "rgba(148,163,184,0.15)";
    ctx.lineWidth = 1;
    [0, 60, 120, 180, 228].forEach(m => {
      ctx.beginPath();
      ctx.moveTo(xScale(m), marginTop);
      ctx.lineTo(xScale(m), h - marginBottom);
      ctx.stroke();
    });

    ctx.strokeStyle = "rgba(148,163,184,0.4)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(marginLeft, marginTop);
    ctx.lineTo(marginLeft, h - marginBottom);
    ctx.lineTo(w - marginRight, h - marginBottom);
    ctx.stroke();

    zLevels.forEach((z, idx) => {
      ctx.beginPath();
      if (z === 0) { ctx.strokeStyle = "#3b82f6"; ctx.lineWidth = 3; }
      else if (Math.abs(z) === 2) { ctx.strokeStyle = "rgba(245,158,11,0.5)"; ctx.lineWidth = 1.5; }
      else if (Math.abs(z) === 3) { ctx.strokeStyle = "rgba(225,29,72,0.5)"; ctx.lineWidth = 1.5; }
      else { ctx.strokeStyle = "rgba(148,163,184,0.3)"; ctx.lineWidth = 1; }

      PONTOS.forEach((m, pIdx) => {
        const x = xScale(m);
        const y = yScale(curves[idx][pIdx]);
        if (pIdx === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
    });

    if (valorPonto && ageInMonths > 0) {
      const x = xScale(Math.min(228, ageInMonths));
      const y = yScale(valorPonto);
      ctx.fillStyle = "#fff";
      ctx.shadowBlur = 15;
      ctx.shadowColor = "rgba(225,29,72,0.4)";
      ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "#e11d48";
      ctx.lineWidth = 3;
      // Fix: ctx.arc was called without the ctx object reference
      ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.stroke();
      ctx.shadowBlur = 0;
    }

    ctx.fillStyle = "rgba(15,23,42,0.6)";
    ctx.font = "bold 10px Manrope";
    [0, 60, 120, 180, 228].forEach(m => ctx.fillText(m.toString(), xScale(m) - 5, h - 20));
    ctx.fillText("Meses de Vida", w / 2 - 30, h - 5);
    ctx.save();
    ctx.translate(20, h / 2 + 20);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(labelY!, 0, 0);
    ctx.restore();

  }, [results, sex, ageInMonths, activeChart]);

  const inputClass = "w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl outline-none focus:border-rose-500 font-bold text-slate-900 transition-all text-sm";
  const labelClass = "text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block px-1";

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10 flex flex-col gap-8 bg-light-glow min-h-full font-display">
      <header className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:border-rose-600 transition-all shadow-sm group">
            <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
          </button>
          <span className="px-4 py-1.5 rounded-full bg-rose-100 border-2 border-rose-600 text-rose-900 text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-sm">
            PEDIATRIA • APOIO BIOMÉTRICO
          </span>
        </div>
        <div>
          <h2 className="text-4xl font-black tracking-tight text-slate-900">
            {activeChart === 'sc' ? 'Superfície Corporal' : 'Antropometria Pediátrica'}
          </h2>
          <p className="text-slate-600 font-bold text-lg">Cálculo de percentis, Z-scores e BSA oficiais.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="bg-white border-2 border-slate-200 p-8 rounded-[3rem] shadow-strong space-y-6 h-fit">
          <div className="space-y-2">
            <label className={labelClass}>Sexo Biológico</label>
            <div className="flex gap-2">
              <button onClick={() => setSex('M')} className={`flex-1 py-3 rounded-xl font-black text-xs border-2 transition-all ${sex === 'M' ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-slate-50 text-slate-400 border-slate-100 text-slate-400'}`}>MENINO</button>
              <button onClick={() => setSex('F')} className={`flex-1 py-3 rounded-xl font-black text-xs border-2 transition-all ${sex === 'F' ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-slate-50 text-slate-400 border-slate-100 text-slate-400'}`}>MENINA</button>
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Idade do Paciente</label>
            <div className="flex gap-2">
              <select value={ageUnit} onChange={e => setAgeUnit(e.target.value as any)} className={`${inputClass} w-32`}>
                <option value="meses">Meses</option>
                <option value="anos">Anos</option>
              </select>
              <input type="number" value={ageValue} onChange={e => setAgeValue(e.target.value)} placeholder="Valor" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={labelClass}>Peso (kg)</label>
              <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className={inputClass} placeholder="0.0" />
            </div>
            <div className="space-y-2">
              <label className={labelClass}>Estatura (cm)</label>
              <input type="number" value={height} onChange={e => setHeight(e.target.value)} className={inputClass} placeholder="0" />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClass}>P. Cefálico (cm)</label>
            <input type="number" value={pc} onChange={e => setPc(e.target.value)} className={inputClass} placeholder="Opcional" />
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button onClick={() => window.print()} className="w-full py-4 bg-slate-100 border-2 border-slate-200 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all flex items-center justify-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-lg">print</span> Imprimir Relatório
            </button>
          </div>
        </section>

        <section className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
            {[
              { id: 'imc', label: 'IMC/I', icon: 'straighten' },
              { id: 'peso', label: 'Peso/I', icon: 'weight' },
              { id: 'altura', label: 'Est/I', icon: 'height' },
              { id: 'pc', label: 'PC/I', icon: 'face' },
              { id: 'sc', label: 'BSA', icon: 'aspect_ratio' }
            ].map(t => (
              <button 
                key={t.id} 
                onClick={() => setActiveChart(t.id as any)}
                className={`p-4 rounded-2xl border-2 font-black text-[10px] uppercase transition-all flex flex-col items-center gap-1 ${activeChart === t.id ? 'bg-rose-600 text-white border-rose-600 shadow-md' : 'bg-white border-slate-100 text-slate-400'}`}
              >
                <span className="material-symbols-outlined text-xl">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>

          <div className="bg-white border-2 border-slate-200 p-8 rounded-[3rem] shadow-strong min-h-[400px]">
            {activeChart === 'sc' ? (
              <div className="space-y-10 animate-fade-in">
                 <div className="border-b pb-4">
                    <h3 className="text-xl font-black text-slate-900 uppercase">Superfície Corporal (BSA)</h3>
                    <p className="text-xs font-bold text-slate-400">Essencial para cálculos de quimioterapia e hidratação avançada.</p>
                 </div>
                 
                 {results ? (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="p-8 rounded-[2.5rem] bg-rose-50 border-2 border-rose-100 flex flex-col items-center text-center gap-2">
                         <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest">Fórmula de Haycock</span>
                         <span className="text-5xl font-black text-rose-700 leading-none">{results.sc.haycock.toFixed(3)}</span>
                         <span className="text-xs font-bold text-rose-500 uppercase">Metros Quadrados (m²)</span>
                         <p className="text-[10px] text-rose-400 mt-2 italic">Recomendada para crianças e neonatos.</p>
                      </div>
                      <div className="p-8 rounded-[2.5rem] bg-slate-50 border-2 border-slate-100 flex flex-col items-center text-center gap-2">
                         <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Fórmula de Mosteller</span>
                         <span className="text-5xl font-black text-rose-700 leading-none">{results.sc.mosteller.toFixed(3)}</span>
                         <span className="text-xs font-bold text-rose-500 uppercase">Metros Quadrados (m²)</span>
                         <p className="text-[10px] text-slate-400 mt-2 italic">Método simplificado universal.</p>
                      </div>
                   </div>
                 ) : (
                   <div className="flex flex-col items-center justify-center py-20 text-slate-300">
                      <span className="material-symbols-outlined text-6xl mb-4 opacity-20">calculate</span>
                      <p className="font-black uppercase tracking-widest text-xs">Insira peso e altura para calcular a BSA</p>
                   </div>
                 )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center px-2">
                  <h3 className="text-xs font-black text-rose-600 uppercase tracking-[0.2em]">Gráfico Evolutivo OMS</h3>
                  {results && (results as any)[activeChart]?.class && (
                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border ${(results as any)[activeChart].class[1]}`}>
                       {(results as any)[activeChart].class[0]}
                    </div>
                  )}
                </div>
                <div className="bg-slate-50 rounded-[2rem] border-2 border-slate-100 overflow-hidden shadow-inner p-4 relative">
                  <canvas ref={canvasRef} width={800} height={380} className="w-full h-auto block" />
                  {!results && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[1px]">
                       <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Aguardando dados biométricos...</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap justify-center gap-6 pt-2">
                  <div className="flex items-center gap-2"><div className="w-3 h-1 bg-rose-500/60 rounded"></div><span className="text-[8px] font-black uppercase text-slate-400">Desvio Z -3/+3</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-1 bg-amber-500/60 rounded"></div><span className="text-[8px] font-black uppercase text-slate-400">Desvio Z -2/+2</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-1 bg-blue-500 rounded"></div><span className="text-[8px] font-black uppercase text-slate-400">Z 0 (Padrão)</span></div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      <footer className="mt-4 border-t border-slate-200 pt-8 pb-6 text-[10px] text-slate-500 flex flex-col sm:flex-row justify-between font-bold uppercase tracking-widest gap-4 text-center">
        <p>© socidéM • Medicina Baseada em Evidências</p>
        <p>Referência: WHO Child Growth Standards {'&'} Haycock BSA Formula</p>
      </footer>
    </div>
  );
};

export default GrowthNutritionTool;