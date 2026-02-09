
import React from 'react';
import { ClinicalRecord } from '../types';

interface Props {
  record: ClinicalRecord;
}

const SummarySection: React.FC<Props> = ({ record }) => {
  const handlePrint = () => window.print();

  const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="mb-8 break-inside-avoid">
      <h3 className="text-sm font-black text-slate-900 uppercase border-b-2 border-slate-900 pb-1 mb-3">{title}</h3>
      <div className="text-[11px] leading-relaxed text-slate-800 space-y-1">
        {children}
      </div>
    </div>
  );

  const Item = ({ label, value }: { label: string, value?: string }) => {
    if (!value) return null;
    return (
      <div className="mb-1">
        <span className="font-black uppercase text-[9px] mr-1">{label}:</span>
        <span>{value}</span>
      </div>
    );
  };

  return (
    <div className="animate-fade-in print:p-0">
      <div className="no-print mb-8 flex justify-end">
        <button onClick={handlePrint} className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg">
          <span className="material-symbols-outlined">print</span> Imprimir Prontuário
        </button>
      </div>

      <div className="bg-white p-10 rounded-[2rem] shadow-strong print:shadow-none print:p-0 font-serif">
        <header className="text-center mb-10 border-b-4 border-slate-900 pb-4">
          <h1 className="text-2xl font-black uppercase tracking-tighter">Prontuário Médico Acadêmico</h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Documento Clínico • {record.patientType}</p>
        </header>

        <Section title="I. Identificação">
          <div className="grid grid-cols-2 gap-x-8">
            <Item label="Nome" value={record.id.nome} />
            <Item label="Idade" value={record.id.idade} />
            <Item label="Sexo" value={record.id.sexo} />
            <Item label="Cor/Etnia" value={record.id.cor} />
            <Item label="Estado Civil" value={record.id.estadoCivil} />
            <Item label="Profissão" value={record.id.profissao} />
            <Item label="Ocupação/Local" value={record.id.ocupacao} />
            <Item label="Naturalidade" value={record.id.naturalidade} />
            <Item label="Procedência" value={record.id.procedencia} />
            <Item label="Residência" value={record.id.residencia} />
            <Item label="Nome da Mãe" value={record.id.nomeMae} />
            <Item label="Responsável" value={record.id.responsavel} />
            <Item label="Religião" value={record.id.religiao} />
            <Item label="Plano" value={record.id.planoSaude} />
          </div>
        </Section>

        <Section title="II. Motivo da Consulta">
          <Item label="Queixa Principal" value={record.qd} />
        </Section>

        <Section title="III. História da Doença Atual">
          <div className="whitespace-pre-wrap italic bg-slate-50 p-4 rounded-xl border border-slate-100">{record.hma}</div>
        </Section>

        <Section title="IV. Interrogatório Sintomatológico (ISDA)">
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(record.isda).map(([key, val]) => val && (
              <div key={key} className="flex gap-2 border-b border-slate-50 pb-1">
                <span className="font-black uppercase text-[8px] min-w-[120px] text-slate-500">{key}:</span>
                <span className="text-[10px]">{val}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="V. Antecedentes Pessoais (Fisiológicos)">
          <Item label="Gestação/Nascimento" value={record.antecedentes.gestacaoNascimento} />
          <Item label="Desenvolvimento (DNPM)" value={record.antecedentes.dnpm} />
          <Item label="Desenvolvimento Sexual" value={record.antecedentes.desenvSexual} />
        </Section>

        <Section title="VI. Antecedentes Pessoais (Patológicos)">
          <Item label="Doenças Infância" value={record.antecedentes.doencasInfancia} />
          <Item label="Traumas/Acidentes" value={record.antecedentes.traumas} />
          <Item label="Doenças Graves/Crônicas" value={record.antecedentes.doencasGraves} />
          <Item label="Cirurgias" value={record.antecedentes.cirurgias} />
          <Item label="Transfusões" value={record.antecedentes.transfusoes} />
          <Item label="História Obstétrica" value={record.antecedentes.historiaObstetrica} />
          <Item label="Imunizações" value={record.antecedentes.imunizacoes} />
          <Item label="Alergias" value={record.antecedentes.alergias} />
          <Item label="Medicações Atuais" value={record.antecedentes.medicacoesAtuais} />
        </Section>

        <Section title="VII. Antecedentes Familiares">
          <div className="text-[11px]">{record.antecedentes.familiares}</div>
        </Section>

        <Section title="VIII. Hábitos de Vida e Social">
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(record.habitos).map(([key, val]) => val && (
              <div key={key} className="flex gap-2 border-b border-slate-50 pb-1">
                <span className="font-black uppercase text-[8px] min-w-[140px] text-slate-500">{key}:</span>
                <span className="text-[10px]">{val}</span>
              </div>
            ))}
          </div>
        </Section>

        <footer className="mt-20 pt-10 border-t-2 border-slate-900 flex justify-between items-end">
          <div className="text-center w-64 border-t border-slate-400 pt-2">
            <p className="text-[10px] font-black uppercase">Assinatura do Médico</p>
            <p className="text-[8px] text-slate-500">CRM / Matrícula Acadêmica</p>
          </div>
          <div className="text-right">
            <p className="text-[8px] font-bold text-slate-400">socidéM • Processado via IA em {new Date().toLocaleDateString()}</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SummarySection;
