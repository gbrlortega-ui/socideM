
import React from 'react';
import { HabitosVida } from '../types';

interface Props {
  data: HabitosVida;
  onChange: (data: HabitosVida) => void;
}

const HabitsSection: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ ...data, [e.target.name]: e.target.value });
  };

  const fields = [
    { name: 'alimentacao', label: 'Alimentação', placeholder: 'Dieta, restrições, horários...' },
    { name: 'ocupacaoAnterior', label: 'Ocupações Anteriores', placeholder: 'Histórico laboral relevante...' },
    { name: 'viagens', label: 'Viagens Recentes', placeholder: 'Locais e períodos de estadia...' },
    { name: 'atividadeFisica', label: 'Atividade Física', placeholder: 'Tipo, frequência, intensidade...' },
    { name: 'atividadeSexual', label: 'Atividade Sexual', placeholder: 'Parceiros, práticas, proteção...' },
    { name: 'manutencaoPeso', label: 'Manutenção do Peso', placeholder: 'Estratégias ou dificuldades...' },
    { name: 'alcool', label: 'Álcool', placeholder: 'Tipo, quantidade, frequência...' },
    { name: 'tabaco', label: 'Tabaco', placeholder: 'Cargas tabágicas, abstinência...' },
    { name: 'drogas', label: 'Drogas Ilícitas', placeholder: 'Uso atual ou pregresso...' },
    { name: 'outrasSubstancias', label: 'Outras Substâncias', placeholder: 'Suplementos, chás, etc...' },
    { name: 'condicoesSocioeconomicas', label: 'Moradia e Saneamento', placeholder: 'Lixo, esgoto, água tratada...' },
    { name: 'contatoAnimais', label: 'Contato com Doentes/Animais', placeholder: 'Onde, quando, duração...' },
    { name: 'vidaConjugal', label: 'Vida Conjugal e Familiar', placeholder: 'Relacionamento com pais, filhos, amigos...' },
    { name: 'condicoesEconomicas', label: 'Condições Econômicas', placeholder: 'Renda, dependência, aposentadoria...' },
  ];

  return (
    <section className="space-y-8 animate-fade-in">
      <div className="border-b-2 border-slate-200 pb-4">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Hábitos de Vida e Social</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((f) => (
          <div key={f.name}>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 px-1">{f.label}</label>
            <textarea
              name={f.name}
              value={(data as any)[f.name] || ''}
              onChange={handleChange}
              placeholder={f.placeholder}
              rows={2}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary outline-none text-sm font-medium text-slate-900 resize-none transition-all"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HabitsSection;
