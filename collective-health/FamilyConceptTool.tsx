
import React, { useState, useMemo } from 'react';

interface FormData {
  fronteiras: string;
  hierarquia: string;
  coesaoProx: string;
  coesaoTempo: string;
  coesaoLeal: string;
  comunicacao: string;
  regras: string;
  flex: string;
  aliancas: string;
  triang: string;
  estressores: string;
  obs: string;
}

const FamilyConceptTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [form, setForm] = useState<FormData>({
    fronteiras: '',
    hierarquia: '',
    coesaoProx: '',
    coesaoTempo: '',
    coesaoLeal: '',
    comunicacao: '',
    regras: '',
    flex: '',
    aliancas: '',
    triang: '',
    estressores: '',
    obs: ''
  });

  const analysis = useMemo(() => {
    const { fronteiras, hierarquia, coesaoProx, coesaoTempo, coesaoLeal, comunicacao, regras, flex, aliancas, triang, estressores, obs } = form;
    
    const isComplete = [fronteiras, hierarquia, coesaoProx, coesaoTempo, coesaoLeal, comunicacao, regras, flex, aliancas, triang, estressores].every(v => v !== '');
    
    if (!isComplete) return null;

    const coesaoVal = (Number(coesaoProx) + Number(coesaoTempo) + Number(coesaoLeal)) / 3;
    let coesaoPerfil = coesaoVal < 1 ? 'desligada' : coesaoVal <= 2 ? 'equilibrada' : 'enredada';

    let perfil = 'Estrutura equilibrada';
    let pillColor = 'bg-emerald-100 text-emerald-700 border-emerald-200';
    let foco = 'Manter fatores protetores; monitorar estressores e transições do ciclo de vida.';

    if (coesaoPerfil === 'enredada' && fronteiras === 'difusas') {
      perfil = 'Estrutura ENREDADA';
      pillColor = 'bg-amber-100 text-amber-700 border-amber-200';
      foco = 'Trabalhar fronteiras (diferenciação), incentivar autonomia individual e regras explícitas.';
    } else if (coesaoPerfil === 'desligada' && fronteiras === 'rigidas') {
      perfil = 'Estrutura DESLIGADA';
      pillColor = 'bg-amber-100 text-amber-700 border-amber-200';
      foco = 'Aumentar coesão/pertencimento, criar espaços de convivência e comunicação afetiva.';
    } else if ((hierarquia === 'ausente' || hierarquia === 'invertida') && (flex === 'caotica' || comunicacao === 'hostil' || aliancas === 'coalizoes' || triang === 'sim')) {
      perfil = 'Estrutura CAÓTICA / DESORGANIZADA';
      pillColor = 'bg-rose-100 text-rose-700 border-rose-200';
      foco = 'Restaurar hierarquia parental, acordar regras claras, reduzir triangulações e coalizões disfuncionais.';
    }

    // Geração do texto descritivo (Seção 1.3)
    let intro = perfil.includes('EQUILIBRADA') ? 'Trata-se de uma família organizada e funcional, com estrutura geral favorecedora do cuidado.' : 
                perfil.includes('ENREDADA') ? 'Trata-se de uma família com vínculos intensos e forte proximidade, porém com tendência ao enredamento.' :
                perfil.includes('DESLIGADA') ? 'Trata-se de uma família mais distanciada, com menor integração e risco de desligamento afetivo.' :
                'Trata-se de uma família em configuração desorganizada, com instabilidade funcional importante.';

    const partes = [];
    if (fronteiras === 'difusas') partes.push('As fronteiras tendem a ser difusas, com maior envolvimento mútuo e menor diferenciação de papéis.');
    else if (fronteiras === 'rigidas') partes.push('As fronteiras apresentam-se rígidas, com tendência ao distanciamento entre os subsistemas.');
    
    if (hierarquia === 'invertida') partes.push('Observa-se hierarquia parcialmente invertida, com inversão de poder geracional.');
    else if (hierarquia === 'ausente') partes.push('Há fragilidade na liderança parental, com ausência de comando claro.');

    if (comunicacao === 'indireta') partes.push('A comunicação é ambígua, dificultando o ajuste de expectativas.');
    else if (comunicacao === 'hostil') partes.push('A comunicação apresenta elementos hostis, aumentando a tensão sistêmica.');

    const synthesis = `${intro} ${partes.join(' ')} O foco terapêutico deve ser ${foco.toLowerCase()}`;

    return { perfil, pillColor, foco, coesaoPerfil, synthesis };
  }, [form]);

  const selectClass = "w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-emerald-500/50 outline-none text-sm font-bold text-slate-900 transition-all appearance-none cursor-pointer";
  const labelClass = "block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-1";

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10 bg-light-glow min-h-full">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          #printable-content { padding: 0 !important; border: none !important; shadow: none !important; }
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
                USF • CONCEITO FAMILIAR (MINUCHIN)
              </span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Análise Estrutural Sistêmica</h2>
          </div>
        </div>
        <p className="text-slate-600 text-base font-bold max-w-2xl">
          Leitura de fronteiras, hierarquia e coesão para orientar o Plano Terapêutico Singular (PTS).
        </p>
      </header>

      <div id="printable-content" className="bg-white border-2 border-slate-200 p-8 rounded-[2.5rem] shadow-strong flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 no-print">
          <div>
            <label className={labelClass}>Fronteiras</label>
            <select value={form.fronteiras} onChange={e => setForm({...form, fronteiras: e.target.value})} className={selectClass}>
              <option value="">Selecione...</option>
              <option value="difusas">Difusas (Enredamento)</option>
              <option value="claras">Claras (Funcionais)</option>
              <option value="rigidas">Rígidas (Desligamento)</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Hierarquia Parental</label>
            <select value={form.hierarquia} onChange={e => setForm({...form, hierarquia: e.target.value})} className={selectClass}>
              <option value="">Selecione...</option>
              <option value="adequada">Adequada</option>
              <option value="invertida">Invertida</option>
              <option value="ausente">Ausente / Caótica</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Comunicação</label>
            <select value={form.comunicacao} onChange={e => setForm({...form, comunicacao: e.target.value})} className={selectClass}>
              <option value="">Selecione...</option>
              <option value="clara">Clara / Assertiva</option>
              <option value="indireta">Indireta / Ambígua</option>
              <option value="hostil">Hostil / Violenta</option>
            </select>
          </div>
          
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-200">
             <div className="col-span-full mb-2">
               <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Eixo de Coesão (0-3)</h4>
             </div>
             <div>
               <label className={labelClass}>Proximidade</label>
               <select value={form.coesaoProx} onChange={e => setForm({...form, coesaoProx: e.target.value})} className={selectClass}>
                 <option value="">0-3</option>
                 <option value="0">0 - Distante</option><option value="1">1</option><option value="2">2</option><option value="3">3 - Muito Próximo</option>
               </select>
             </div>
             <div>
               <label className={labelClass}>Tempo Juntos</label>
               <select value={form.coesaoTempo} onChange={e => setForm({...form, coesaoTempo: e.target.value})} className={selectClass}>
                 <option value="">0-3</option>
                 <option value="0">0 - Nunca</option><option value="1">1</option><option value="2">2</option><option value="3">3 - Sempre</option>
               </select>
             </div>
             <div>
               <label className={labelClass}>Lealdade</label>
               <select value={form.coesaoLeal} onChange={e => setForm({...form, coesaoLeal: e.target.value})} className={selectClass}>
                 <option value="">0-3</option>
                 <option value="0">0 - Baixa</option><option value="1">1</option><option value="2">2</option><option value="3">3 - Muito Alta</option>
               </select>
             </div>
          </div>

          <div>
            <label className={labelClass}>Flexibilidade</label>
            <select value={form.flex} onChange={e => setForm({...form, flex: e.target.value})} className={selectClass}>
              <option value="">Selecione...</option>
              <option value="rigida">Rígida</option>
              <option value="equilibrada">Equilibrada</option>
              <option value="caotica">Caótica</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Alianças / Coalizões</label>
            <select value={form.aliancas} onChange={e => setForm({...form, aliancas: e.target.value})} className={selectClass}>
              <option value="">Selecione...</option>
              <option value="funcionais">Funcionais (Suporte)</option>
              <option value="coalizoes">Coalizões (Contra alguém)</option>
              <option value="nenhuma">Nenhuma relevante</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Estressores</label>
            <select value={form.estressores} onChange={e => setForm({...form, estressores: e.target.value})} className={selectClass}>
              <option value="">Selecione...</option>
              <option value="nenhum">Manejáveis</option>
              <option value="moderado">Moderados</option>
              <option value="severo">Severos (Crise)</option>
            </select>
          </div>

          <div className="md:col-span-2 lg:col-span-3">
             <label className={labelClass}>Resumo do Caso / Triangulações</label>
             <textarea 
               value={form.obs} 
               onChange={e => setForm({...form, obs: e.target.value})} 
               placeholder="Ex: Terceiro puxado para reduzir tensão, conflitos geracionais..."
               className="w-full h-24 px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-[2rem] outline-none text-sm font-bold text-slate-900 focus:border-emerald-500/50 resize-none transition-all"
             />
          </div>
        </div>

        {analysis ? (
          <div className="flex flex-col gap-6 p-8 rounded-[2rem] border-2 border-emerald-100 bg-emerald-50/30 animate-fade-in">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Diagnóstico Estrutural</h3>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Análise baseada em Salvador Minuchin</p>
              </div>
              <span className={`px-5 py-2 rounded-full font-black text-[10px] uppercase tracking-widest border-2 shadow-sm ${analysis.pillColor}`}>
                {analysis.perfil}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                 <div>
                   <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Síntese para Prontuário (1.3)</p>
                   <div className="p-4 bg-white rounded-2xl border border-emerald-100 text-sm text-slate-700 font-bold leading-relaxed shadow-inner">
                     {analysis.synthesis}
                   </div>
                 </div>
                 <div className="flex items-center gap-3 p-4 bg-emerald-600 text-white rounded-2xl shadow-lg">
                    <span className="material-symbols-outlined font-black">focal_point</span>
                    <div>
                      <p className="text-[8px] font-black uppercase opacity-60">Foco de Intervenção USF</p>
                      <p className="text-xs font-black leading-tight">{analysis.foco}</p>
                    </div>
                 </div>
              </div>
              <div className="space-y-4">
                 <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                       <p className="text-[9px] font-black text-slate-400 uppercase">Eixo Coesão</p>
                       <p className="text-xs font-black text-slate-800 uppercase">{analysis.coesaoPerfil}</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                       <p className="text-[9px] font-black text-slate-400 uppercase">Hierarquia</p>
                       <p className="text-xs font-black text-slate-800 uppercase">{form.hierarquia}</p>
                    </div>
                 </div>
                 <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Checklist Semiológico</p>
                    <div className="space-y-2">
                       <div className="flex justify-between text-[11px] font-bold">
                          <span className="text-slate-500">Comunicação</span>
                          <span className={form.comunicacao === 'clara' ? 'text-emerald-600' : 'text-rose-500'}>{form.comunicacao}</span>
                       </div>
                       <div className="flex justify-between text-[11px] font-bold">
                          <span className="text-slate-500">Flexibilidade</span>
                          <span className={form.flex === 'equilibrada' ? 'text-emerald-600' : 'text-rose-500'}>{form.flex}</span>
                       </div>
                       <div className="flex justify-between text-[11px] font-bold">
                          <span className="text-slate-500">Estressores</span>
                          <span className={form.estressores === 'nenhum' ? 'text-emerald-600' : 'text-amber-500'}>{form.estressores}</span>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400 bg-slate-50 rounded-[2rem] border-2 border-slate-100 border-dashed">
            <span className="material-symbols-outlined text-6xl mb-4 opacity-20">analytics</span>
            <p className="font-black uppercase tracking-widest text-[11px]">Preencha todos os campos para gerar o perfil estrutural</p>
          </div>
        )}

        <div className="pt-6 border-t border-slate-100">
           <p className="text-[10px] text-slate-400 font-bold leading-relaxed">
             <span className="text-slate-900 font-black">Nota Técnica:</span> Fronteiras difusas indicam enredamento; fronteiras rígidas indicam desligamento. A hierarquia adequada é a base da organização funcional parental.
           </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 no-print pb-12">
        <button onClick={() => window.print()} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-emerald-600 transition-all shadow-lg">
          <span className="material-symbols-outlined">print</span> Imprimir Instrumento A5
        </button>
        <div className="ml-auto flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border-2 border-slate-100">
           <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
           <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Baseado em Terapia Familiar Sistêmica</span>
        </div>
      </div>
    </div>
  );
};

export default FamilyConceptTool;
