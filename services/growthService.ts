
import { SinaisVitais, PatientType } from '../types';

/**
 * Converte string de idade ("45 anos", "4 meses") para meses.
 */
export const parseAgeToMonths = (ageStr: string): number => {
  if (!ageStr) return 0;
  const num = parseInt(ageStr.replace(/\D/g, '')) || 0;
  if (ageStr.toLowerCase().includes('ano')) return num * 12;
  return num;
};

/**
 * Placeholder para cálculo de Z-Score (Logica real requer tabelas L/M/S da OMS).
 * Retorna uma estimativa baseada em médias para visualização de UI.
 */
export const calculateZScore = (value: number, ageMonths: number, type: 'weight' | 'height' | 'bmi' | 'pc', sex: string): string => {
  if (!value || ageMonths === 0) return "0.0";
  // Simulação de cálculo de desvio padrão
  // Em produção, isso consultaria um dicionário de dados da WHO
  return (Math.random() * 2 - 1).toFixed(1); 
};

export const getZScoreColor = (zScore: string): string => {
  const z = parseFloat(zScore);
  if (Math.abs(z) > 2) return 'text-red-500';
  if (Math.abs(z) > 1) return 'text-yellow-500';
  return 'text-green-500';
};

export const classifyAdultBMI = (bmi: number, ageYears: number) => {
  if (!bmi) return { label: '--', color: 'text-gray-400' };
  
  // Idoso (> 60 anos) possui faixas diferentes
  if (ageYears >= 60) {
    if (bmi < 22) return { label: 'Baixo Peso', color: 'text-yellow-500' };
    if (bmi <= 27) return { label: 'Eutrofia', color: 'text-green-500' };
    return { label: 'Excesso de Peso', color: 'text-red-500' };
  }

  if (bmi < 18.5) return { label: 'Baixo Peso', color: 'text-yellow-500' };
  if (bmi < 25) return { label: 'Eutrofia', color: 'text-green-500' };
  if (bmi < 30) return { label: 'Sobrepeso', color: 'text-orange-500' };
  return { label: 'Obesidade', color: 'text-red-500' };
};

export const getVitalSignsInterpretation = (vitals: SinaisVitais, ageMonths: number, type: PatientType) => {
  const interp = (val: string, normalRange: [number, number], unit: string) => {
    const n = parseFloat(val);
    if (!n) return { label: '--', color: 'text-gray-400' };
    if (n < normalRange[0]) return { label: 'Baixo', color: 'text-yellow-500' };
    if (n > normalRange[1]) return { label: 'Alto', color: 'text-red-500' };
    return { label: 'Normal', color: 'text-green-500' };
  };

  const paInterp = (paStr: string) => {
    if (!paStr.includes('/')) return { label: '--', color: 'text-gray-400' };
    const [sys, dia] = paStr.split('/').map(Number);
    if (sys >= 140 || dia >= 90) return { label: 'Hipertensão', color: 'text-red-500' };
    if (sys >= 130 || dia >= 85) return { label: 'Limitrofe', color: 'text-orange-500' };
    if (sys < 90 || dia < 60) return { label: 'Hipotensão', color: 'text-yellow-500' };
    return { label: 'Normal', color: 'text-green-500' };
  };

  const satInterp = (sat: string) => {
    const s = parseFloat(sat);
    if (!s) return { label: '--', color: 'text-gray-400' };
    if (s < 93) return { label: 'Crítico', color: 'text-red-600' };
    if (s < 95) return { label: 'Alerta', color: 'text-orange-500' };
    return { label: 'Normal', color: 'text-green-500' };
  };

  // Faixas básicas para Adultos
  return {
    pa: paInterp(vitals.pa),
    fc: interp(vitals.fc, [60, 100], 'bpm'),
    fr: interp(vitals.fr, [12, 20], 'irpm'),
    temp: interp(vitals.temp, [36, 37.2], '°C'),
    sat: satInterp(vitals.sat)
  };
};
