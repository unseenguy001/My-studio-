
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateStoryContent = async (prompt: string, genre: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Generate a creative story based on this prompt: "${prompt}". 
    Genre: ${genre}. 
    Provide the output in a structured JSON format with chapters, titles, and image prompts for each scene.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          chapters: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                chapterTitle: { type: Type.STRING },
                content: { type: Type.STRING },
                imagePrompt: { type: Type.STRING }
              }
            }
          }
        }
      }
    }
  });
  return JSON.parse(response.text);
};

export const generateCampaign = async (brand: string, goals: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Create a comprehensive marketing campaign for brand: ${brand} with goals: ${goals}.
    Include target personas, content calendar, and ad copy.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          strategyName: { type: Type.STRING },
          targetPersonas: { type: Type.ARRAY, items: { type: Type.STRING } },
          adVariations: { 
            type: Type.ARRAY, 
            items: { 
              type: Type.OBJECT,
              properties: {
                headline: { type: Type.STRING },
                body: { type: Type.STRING },
                cta: { type: Type.STRING }
              }
            } 
          },
          calendar: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      }
    }
  });
  return JSON.parse(response.text);
};

export const generateImage = async (prompt: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });
  
  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

export const generatePdfTemplate = async (topic: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Create professional layout structure for a multi-page PDF about: ${topic}. 
    Define sections, headings, and recommended visuals.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          pages: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                pageNumber: { type: Type.NUMBER },
                layoutType: { type: Type.STRING },
                sections: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            }
          }
        }
      }
    }
  });
  return JSON.parse(response.text);
};
