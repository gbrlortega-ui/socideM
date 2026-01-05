import { ModuleType, ModuleInfo } from './types';

export const MODULES_CONFIG: ModuleInfo[] = [
  { id: ModuleType.HOME, label: 'Início', icon: 'dashboard', description: 'Visão geral do sistema', category: 'top' },
  
  // Categoria: Prática Clínica
  { id: ModuleType.ANAMNESIS, label: 'Prontuário / SOAP', icon: 'clinical_notes', description: 'Modelos de coleta de dados estruturados e semiologia', category: 'clinical' },
  { id: ModuleType.COLLECTIVE_HEALTH, label: 'Saúde Coletiva', icon: 'medical_services', description: 'Instrumentos de abordagem familiar e comunitária', category: 'clinical' },
  { id: ModuleType.ADULT, label: 'Adulto', icon: 'person', description: 'Scores cardiovasculares e calculadoras clínicas para adultos', category: 'clinical' },
  { id: ModuleType.PEDIATRIC, label: 'Pediátrico', icon: 'child_care', description: 'Z-score OMS, pediatria e neonatologia na palma da mão', category: 'clinical' },
  { id: ModuleType.GERIATRIC, label: 'Geriátrico', icon: 'elderly', description: 'Avaliação Multidimensional (AGA) e escalas geriátricas', category: 'clinical' },
  { id: ModuleType.SBV, label: 'SBV', icon: 'monitor_heart', description: 'Protocolos visuais de emergência e Suporte de Vida', category: 'clinical' },
  
  // Categoria: Acadêmico
  { id: ModuleType.SUMMARIES, label: 'Resumos / Ebooks', icon: 'menu_book', description: 'Biblioteca de revisões teóricas e guias práticos', category: 'academic' },
  { id: ModuleType.SIMULATIONS, label: 'Simulados', icon: 'quiz', description: 'Casos clínicos integrados focados em provas de residência', category: 'academic' },
];