
import { GoogleGenAI, VideoGenerationReferenceImage, VideoGenerationReferenceType } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  async chat(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: [
          ...history,
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });
      return response.text || "I'm sorry, I couldn't process that request.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "An error occurred while connecting to the AI tutor. Please check your connection.";
    }
  }

  async generateBackgroundVideo(prompt: string) {
    try {
      // Re-initialize to ensure latest API key from dialog is used
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (!downloadLink) throw new Error("No video URI returned");

      const response = await fetch(downloadLink, {
        method: 'GET',
        headers: {
          'x-goog-api-key': process.env.API_KEY as string,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch video blob");
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Video Generation Error:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
