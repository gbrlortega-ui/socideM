
export enum ModuleType {
  HOME = 'inicio',
  ANAMNESIS = 'anamneses',
  ADULT = 'adulto',
  PEDIATRIC = 'pediatrico',
  GERIATRIC = 'geriatrico',
  COLLECTIVE_HEALTH = 'saude-coletiva',
  SIMULATIONS = 'simulados',
  SUMMARIES = 'resumos',
  SBV = 'sbv'
}

/* Fix: Export ModuleInfo to be used in constants.tsx */
export interface ModuleInfo {
  id: ModuleType;
  label: string;
  icon: string;
  description: string;
  category: string;
}

export enum FormStep {
  IDENTIFICATION = 0,
  QD_HMA = 1,
  ISDA = 2,
  /* Fix: Add ANTECEDENTS to be used in AnamnesisInternalSidebar.tsx */
  ANTECEDENTS = 3,
  ANTECEDENTS_FISIO = 3,
  ANTECEDENTS_PATO = 4,
  HABITS = 5,
  PHYSICAL_EXAM = 6,
  SYNTHESIS = 7,
  SUMMARY = 8
}

export type AnamnesisCategory = 'pediatrico' | 'adulto' | 'geriatrico' | 'soap';
export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'VERY_HIGH' | 'EXTREME';

export enum PatientType {
  ADULT = 'Adulto',
  PEDIATRIC = 'Pediátrico',
  GERIATRIC = 'Geriátrico',
  SOAP = 'SOAP'
}

export enum PediatricSubType {
  NEONATE = 'Neonato',
  INFANT = 'Lactente',
  PRE_SCHOOL = 'Pré-escolar',
  SCHOOL = 'Escolar',
  ADOLESCENT = 'Adolescente'
}

/* Fix: Make properties optional to allow partial initialization in multiple files */
export interface PatientIdentification {
  nome?: string;
  idade?: string;
  sexo?: string;
  cor?: string;
  estadoCivil?: string;
  profissao?: string;
  ocupacao?: string;
  naturalidade?: string;
  procedencia?: string;
  residencia?: string;
  nomeMae?: string;
  responsavel?: string;
  religiao?: string;
  planoSaude?: string;
  /* Fix: Add missing fields used in GeriatricAnamnesis.tsx */
  cuidador?: string;
  escolaridade?: string;
}

export interface ISDA {
  estadoGeral?: string;
  peleFaneros?: string;
  promocaoPele?: string;
  cabeca?: string;
  olhos?: string;
  promocaoOlhos?: string;
  ouvidos?: string;
  promocaoOuvidos?: string;
  nariz?: string;
  boca?: string;
  promocaoBoca?: string;
  faringe?: string;
  laringe?: string;
  promocaoVoz?: string;
  vasosLinfonodos?: string;
  mamas?: string;
  promocaoMamas?: string;
  respiratorio?: string;
  promocaoResp?: string;
  cardiovascular?: string;
  promocaoCardio?: string;
  digestorio?: string;
  promocaoDigest?: string;
  urinario?: string;
  genitalMasculino?: string;
  promocaoGenitalM?: string;
  genitalFeminino?: string;
  promocaoGenitalF?: string;
  hemolinfopoetico?: string;
  endocrino?: string;
  osteoarticular?: string;
  promocaoOsteo?: string;
  nervoso?: string;
  promocaoNervoso?: string;
  psiquico?: string;
}

export interface SinaisVitais {
  pa: string;
  fc: string;
  fr: string;
  sat: string;
  temp: string;
  peso: string;
  estatura: string;
  pc: string;
  imc: string;
}

export interface PhysicalExam {
  sinaisVitais: SinaisVitais;
  geral: string;
  peleAnexos: string;
  cabecaPescoco: string;
  aparelhoRespiratorio: string;
  aparelhoCardiovascular: string;
  abdome: string;
  extremidades: string;
  fontanelas?: string;
}

/* Fix: Add missing fields used across different anamnesis modules */
export interface Antecendentes {
  // General / Generic fields
  fisiologicos?: string;
  patologicos?: string;
  familiares?: string;
  habitos?: string;
  psicossocial?: string;
  vacinacao?: string;
  medicacoesAtuais?: string;
  
  // Risk assessment fields
  riscoCardiovascular?: string;
  riscoCardiovascularLevel?: RiskLevel;
  
  // Fisiológicos (Pediatrics specific)
  gestacaoNascimento?: string;
  dnpm?: string;
  desenvSexual?: string;
  
  // Patológicos (Pediatrics specific)
  doencasInfancia?: string;
  traumas?: string;
  doencasGraves?: string;
  cirurgias?: string;
  transfusoes?: string;
  historiaObstetrica?: string;
  paternidade?: string;
  imunizacoes?: string;
  alergias?: string;

  // Geriatric specific
  funcionalidade?: string;
  polifarmacia?: string;
  ivcf20Result?: string;
  ivcf20Score?: number;
  ivcf20Level?: 'LOW' | 'MODERATE' | 'HIGH';
}

export interface HabitosVida {
  alimentacao?: string;
  ocupacaoAnterior?: string;
  viagens?: string;
  atividadeFisica?: string;
  atividadeSexual?: string;
  manutencaoPeso?: string;
  alcool?: string;
  tabaco?: string;
  drogas?: string;
  outrasSubstancias?: string;
  condicoesSocioeconomicas?: string;
  contatoAnimais?: string;
  vidaConjugal?: string;
  condicoesEconomicas?: string;
}

/* Fix: Add SOAP related types used in SoapSection.tsx and SoapAnamnesis.tsx */
export type SoapPlanCategory = 'DIAGNOSTIC' | 'THERAPEUTIC' | 'FOLLOW_UP' | 'EDUCATION' | 'ADMINISTRATIVE';

export interface SoapPlanItem {
  id: string;
  text: string;
  category: SoapPlanCategory;
  linkedAssessments: string[];
}

export interface SoapSubjective {
  qpHma?: string;
  isda?: string;
  antFisiologicos?: string;
  antPatologicos?: string;
  medicacoes?: string;
  antFamiliares?: string;
  habitos?: string;
  socioeconomico?: string;
  vacinacao?: string;
  riscoCardiovascular?: string;
  riscoCardiovascularLevel?: RiskLevel;
  ivcf20Result?: string;
  ivcf20Score?: number;
  ivcf20Level?: 'LOW' | 'MODERATE' | 'HIGH';
}

export interface SoapData {
  s: SoapSubjective;
  o: PhysicalExam;
  assessments: { id: string; text: string }[];
  plans: SoapPlanItem[];
}

export interface ClinicalRecord {
  id: PatientIdentification;
  patientType: PatientType;
  pediatricSubType?: PediatricSubType;
  qd?: string;
  hma?: string;
  isda: ISDA;
  antecedentes: Antecendentes;
  habitos: HabitosVida;
  exameFisico: PhysicalExam;
  hipoteseDiagnostica?: string;
  fatoresRisco?: string;
  conduta?: string;
  soap?: SoapData;
}
