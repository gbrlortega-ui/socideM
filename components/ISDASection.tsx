
import React from 'react';
import { ISDA, PatientType } from '../types';

interface Props {
  data: ISDA;
  patientType: PatientType;
  onChange: (data: ISDA) => void;
}

const ISDASection: React.FC<Props> = ({ data, patientType, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ ...data, [e.target.name]: e.target.value });
  };

  const systems = [
    { title: "Sintomas Gerais", fields: [
      { name: 'estadoGeral', label: 'Estado Geral', placeholder: 'Febre, calafrios, sudorese, astenia, alteração de peso...' }
    ]},
    { title: "Pele e Fâneros", fields: [
      { name: 'peleFaneros', label: 'Sintomas', placeholder: 'Prurido, icterícia, palidez, cianose, lesões, unhas...' },
      { name: 'promocaoPele', label: 'Promoção da Saúde', placeholder: 'Exposição solar, protetor, cuidados com cabelos...' }
    ]},
    { title: "Cabeça e Sentidos", fields: [
      { name: 'cabeca', label: 'Cabeça', placeholder: 'Cefaleia, tonturas, traumas...' },
      { name: 'olhos', label: 'Olhos', placeholder: 'Dor, diplopia, fotofobia, secreção, acuidade...' },
      { name: 'promocaoOlhos', label: 'Promoção (Olhos)', placeholder: 'Óculos, lentes, último exame...' },
      { name: 'ouvidos', label: 'Ouvidos', placeholder: 'Dor, otorreia, acuidade, zumbidos, vertigem...' },
      { name: 'promocaoOuvidos', label: 'Promoção (Ouvidos)', placeholder: 'Aparelhos, ruídos, limpeza (cotonetes)...' }
    ]},
    { title: "Vias Aéreas e Pescoço", fields: [
      { name: 'nariz', label: 'Nariz e Seios', placeholder: 'Obstrução, coriza, epistaxe, olfato, dor facial...' },
      { name: 'boca', label: 'Cavidade Bucal', placeholder: 'Halitose, sangramentos, aftas, ATM...' },
      { name: 'promocaoBoca', label: 'Promoção (Boca)', placeholder: 'Escovação, último exame odontológico...' },
      { name: 'faringe', label: 'Faringe e Laringe', placeholder: 'Dor de garganta, roncos, alterações na voz...' },
      { name: 'promocaoVoz', label: 'Promoção (Voz)', placeholder: 'Cuidados com a voz, gargarejos...' },
      { name: 'vasosLinfonodos', label: 'Vasos e Linfonodos', placeholder: 'Pulsações, turgência jugular, adenomegalias...' }
    ]},
    { title: "Tórax e Abdome", fields: [
      { name: 'mamas', label: 'Mamas', placeholder: 'Dor, nódulos, retrações, secreção papilar...' },
      { name: 'promocaoMamas', label: 'Promoção (Mamas)', placeholder: 'Autoexame, última USG/Mamografia...' },
      { name: 'respiratorio', label: 'Sistema Respiratório', placeholder: 'Dor torácica, tosse, hemoptise, dispneia, chieira...' },
      { name: 'promocaoResp', label: 'Promoção (Resp)', placeholder: 'Alergênios, última RX de tórax...' },
      { name: 'cardiovascular', label: 'Sistema Cardiovascular', placeholder: 'Dor precordial, palpitações, ortopneia, síncope...' },
      { name: 'promocaoCardio', label: 'Promoção (Cardio)', placeholder: 'Estresse, último check-up...' },
      { name: 'digestorio', label: 'Sistema Digestório', placeholder: 'Apetite, disfagia, pirose, ritmo intestinal, melena...' },
      { name: 'promocaoDigest', label: 'Promoção (Digest)', placeholder: 'Antiácidos, laxantes, chás...' }
    ]},
    { title: "Geniturinário e Outros", fields: [
      { name: 'urinario', label: 'Sistema Urinário', placeholder: 'Disúria, poliúria, nictúria, hematúria, colúria...' },
      { name: 'genitalMasculino', label: 'Genital Masculino', placeholder: 'Dor, priapismo, corrimento, fimose...' },
      { name: 'genitalFeminino', label: 'Genital Feminino', placeholder: 'Ciclo, DUM, corrimento, anticoncepção...' },
      { name: 'hemolinfopoetico', label: 'Hemolinfopoético', placeholder: 'Adenomegalias, esplenomegalia, sangramentos...' },
      { name: 'endocrino', label: 'Sistema Endócrino', placeholder: 'Desenv. físico/sexual, tolerância térmica, bócio...' },
      { name: 'osteoarticular', label: 'Osteoarticular', placeholder: 'Dor óssea/articular, rigidez, mialgia...' },
      { name: 'promocaoOsteo', label: 'Promoção (Postura)', placeholder: 'Postura, peso, ergonomia, atividade laboral...' },
      { name: 'nervoso', label: 'Sistema Nervoso', placeholder: 'Convulsões, memória, fala, sono, paralisias...' },
      { name: 'psiquico', label: 'Exame Psíquico', placeholder: 'Condições emocionais, humor, orientação...' }
    ]}
  ];

  const textareaClass = "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary outline-none text-sm font-medium text-slate-900 resize-none transition-all";
  const labelClass = "block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 px-1";

  return (
    <section className="space-y-12 animate-fade-in">
      <div className="border-b-2 border-slate-200 pb-4">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Interrogatório Sintomatológico (ISDA)</h2>
      </div>

      <div className="space-y-16">
        {systems.map((sys, sIdx) => (
          <div key={sIdx} className="space-y-6">
            <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] flex items-center gap-3">
              <span className="w-8 h-[2px] bg-primary/30"></span>
              {sys.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sys.fields.map((f) => (
                <div key={f.name} className={f.name.includes('promocao') ? 'bg-primary/5 p-4 rounded-2xl border border-primary/10' : ''}>
                  <label className={labelClass}>{f.label}</label>
                  <textarea
                    name={f.name}
                    value={(data as any)[f.name] || ''}
                    onChange={handleChange}
                    placeholder={f.placeholder}
                    rows={2}
                    className={textareaClass}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ISDASection;
