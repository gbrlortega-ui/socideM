import { GoogleGenAI } from "@google/genai";
import { PatientType } from "../types";

// Note: GoogleGenAI instance is created within each function to ensure it uses the current API key
// as per the guidelines to avoid issues with stale instances.

export const getClinicalSupport = async (prompt: string) => {
  try {
    // Always initialize with the latest API key from process.env right before the call
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "Você é um assistente médico especialista que ajuda profissionais de saúde com resumos rápidos baseados em evidências, diretrizes brasileiras (SUS) e cálculos clínicos. Seja conciso e direto.",
      },
    });
    // Access response.text directly as it is a getter
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Desculpe, ocorreu um erro ao processar sua consulta clínica.";
  }
};

export const refineMedicalText = async (text: string, context: string, patientType: PatientType) => {
  try {
    // Always initialize with the latest API key from process.env right before the call
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Refine o seguinte texto médico para um prontuário profissional. 
    Contexto: ${context}
    Paciente: ${patientType}
    Texto: ${text}
    
    Regras:
    1. Use terminologia médica técnica adequada.
    2. Seja extremamente conciso.
    3. Organize em tópicos se necessário.
    4. Mantenha o sentido original mas melhore a redação clínica.
    Retorne apenas o texto refinado.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    // Access response.text directly as it is a getter
    return response.text;
  } catch (error) {
    return text; // Fallback to original text
  }
};

export const getClinicalSuggestions = async (qd: string, hma: string, patientType: PatientType) => {
  try {
    // Always initialize with the latest API key from process.env right before the call
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Com base na Queixa Principal (QD) e História da Moléstia Atual (HMA) abaixo, sugira 4 perguntas semiológicas fundamentais que o médico deve fazer para este paciente ${patientType}.
    QD: ${qd}
    HMA: ${hma}
    
    Retorne apenas um array JSON de strings contendo as perguntas.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    
    try {
      // response.text is a getter, use it without calling it as a function
      return JSON.parse(response.text || "[]");
    } catch {
      return ["Quais fatores pioram a queixa?", "Há outros sintomas associados?", "Quando exatamente os sintomas começaram?", "Houve algum tratamento prévio?"];
    }
  } catch (error) {
    return [];
  }
};