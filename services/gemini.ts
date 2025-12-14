import { GoogleGenAI, Type } from "@google/genai";
import { Question } from '../types';

// NOTE: The API key must be provided via the environment variable API_KEY.

const getAI = () => {
    // Guidelines require strictly using process.env.API_KEY
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable is not set.");
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateExplanation = async (question: string, answer: string): Promise<string> => {
    try {
        const ai = getAI();
        const model = "gemini-2.5-flash";
        const prompt = `Explain why "${answer}" is the correct answer to the question: "${question}". Keep it concise (under 50 words) and educational.`;
        
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        
        return response.text || "Explanation not available.";
    } catch (error) {
        console.error("AI Error:", error);
        return "Could not generate explanation due to missing API key or network error.";
    }
};

export const generateMoreQuestions = async (topic: string, count: number = 3): Promise<Question[]> => {
    try {
        const ai = getAI();
        const model = "gemini-2.5-flash";
        
        const prompt = `Generate ${count} multiple choice biology questions about "${topic}" for a freshman college level. 
        Format the output as a JSON array of objects with keys: id (random number), question, options (array of 4 strings), correctAnswer (string matching one option).`;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            id: { type: Type.INTEGER },
                            question: { type: Type.STRING },
                            options: { 
                                type: Type.ARRAY,
                                items: { type: Type.STRING }
                            },
                            correctAnswer: { type: Type.STRING }
                        }
                    }
                }
            }
        });

        const text = response.text;
        if (!text) return [];
        return JSON.parse(text) as Question[];

    } catch (error) {
        console.error("AI Generation Error:", error);
        return [];
    }
};

export const generateDiagramConcept = async (topic: string): Promise<string> => {
    try {
         const ai = getAI();
         const model = "gemini-2.5-flash";
         const prompt = `Describe a simple visual diagram for the biological concept: "${topic}". 
         Describe it in 3 sentences max, focusing on key components to visualize.`;
         
         const response = await ai.models.generateContent({
             model: model,
             contents: prompt
         });
         return response.text || "No description available.";
    } catch (e) {
        return "Visual concept unavailable.";
    }
}