
import React from 'react';
import { PatientType, PatientIdentification } from '../types';

interface Props {
  data: PatientIdentification;
  patientType: PatientType;
  onChange: (data: PatientIdentification) => void;
}

const IdentificationSection: React.FC<Props> = ({ data, patientType, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange({ ...data, [e.target.name]: e.target.value });
  };

  const inputClass = "w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none text-sm font-bold text-slate-900 transition-all";
  const labelClass = "block text-[10px] font-black text-slate-700 uppercase tracking-widest mb-1.5 px-1";

  return (
    <section className="space-y-8 animate-fade-in">
      <div className="border-b-2 border-slate-200 pb-4">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Identificação do Paciente</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="md:col-span-2 lg:col-span-3">
          <label className={labelClass}>Nome Completo</label>
          <input name="nome" value={data.nome} onChange={handleChange} className={inputClass} placeholder="Nome do paciente" />
        </div>

        <div>
          <label className={labelClass}>Idade</label>
          <input name="idade" value={data.idade} onChange={handleChange} className={inputClass} placeholder="Ex: 5 anos" />
        </div>

        <div>
          <label className={labelClass}>Sexo / Gênero</label>
          <select name="sexo" value={data.sexo} onChange={handleChange} className={inputClass}>
            <option value="">Selecione...</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Cor / Etnia</label>
          <select name="cor" value={data.cor} onChange={handleChange} className={inputClass}>
            <option value="">Selecione...</option>
            <option value="Branca">Branca</option>
            <option value="Parda">Parda</option>
            <option value="Preta">Preta</option>
            <option value="Indígena">Indígena</option>
            <option value="Asiática">Asiática</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Estado Civil</label>
          <input name="estadoCivil" value={data.estadoCivil} onChange={handleChange} className={inputClass} placeholder="Ex: Solteiro" />
        </div>

        <div>
          <label className={labelClass}>Profissão</label>
          <input name="profissao" value={data.profissao} onChange={handleChange} className={inputClass} placeholder="Profissão" />
        </div>

        <div>
          <label className={labelClass}>Ocupação Atual / Local</label>
          <input name="ocupacao" value={data.ocupacao} onChange={handleChange} className={inputClass} placeholder="Onde trabalha/estuda" />
        </div>

        <div>
          <label className={labelClass}>Naturalidade</label>
          <input name="naturalidade" value={data.naturalidade} onChange={handleChange} className={inputClass} placeholder="Cidade onde nasceu" />
        </div>

        <div>
          <label className={labelClass}>Procedência</label>
          <input name="procedencia" value={data.procedencia} onChange={handleChange} className={inputClass} placeholder="De onde veio" />
        </div>

        <div className="md:col-span-2 lg:col-span-1">
          <label className={labelClass}>Residência</label>
          <input name="residencia" value={data.residencia} onChange={handleChange} className={inputClass} placeholder="Endereço atual" />
        </div>

        <div>
          <label className={labelClass}>Nome da Mãe</label>
          <input name="nomeMae" value={data.nomeMae} onChange={handleChange} className={inputClass} placeholder="Nome da genitora" />
        </div>

        <div>
          <label className={labelClass}>Responsável / Cuidador</label>
          <input name="responsavel" value={data.responsavel} onChange={handleChange} className={inputClass} placeholder="Nome do acompanhante" />
        </div>

        <div>
          <label className={labelClass}>Religião</label>
          <input name="religiao" value={data.religiao} onChange={handleChange} className={inputClass} placeholder="Religião" />
        </div>

        <div>
          <label className={labelClass}>Plano de Saúde</label>
          <input name="planoSaude" value={data.planoSaude} onChange={handleChange} className={inputClass} placeholder="Convênio ou SUS" />
        </div>
      </div>
    </section>
  );
};

export default IdentificationSection;
