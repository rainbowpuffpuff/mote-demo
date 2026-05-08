import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export async function analyzeFragmentLive(content: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `You are an AI acting as a privacy-preserving marketplace descriptor. 
The user has provided a piece of text (a "knowledge fragment") that they want to sell. 
Your job is to read it and return exactly THREE descriptions of the text, plus a suggested price in USD.

RULES:
1. ALL descriptions MUST explicitly state the broad topic of the text (e.g., "emotional regulation", "Ethereum farming") so the buyer knows what subject they are paying for.
2. DO NOT spoil the actual insight or specific actionable knowledge in the text (e.g., do not mention specific techniques like "breathing" or specific references like "Koole's review"). Buyers must pay to see those details.
3. The descriptions must be highly objective, structural, and dry. Do not use marketing fluff, hype, or words like "amazing", "secret", or "in-depth". 
4. Frame the descriptions as analyzing what the text *is* structurally (e.g. "A set of instructions regarding...", "An unverified user log claiming...").
5. Provide the three descriptions in varying objective tones: 'Objective', 'Structural', and 'Empirical'.
6. Estimate a fair market price between $5 and $99 based on how actionable or specific the insight seems.

The text is:
---
${content}
---`
            }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            price: { type: Type.INTEGER, description: "Suggested price in USD between 5 and 99" },
            descriptions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  tone: { type: Type.STRING, description: "The tone label (Objective, Structural, or Empirical)" },
                  text: { type: Type.STRING, description: "The non-spoiling, dry description" }
                },
                required: ["tone", "text"]
              }
            }
          },
          required: ["price", "descriptions"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    throw new Error("Empty response");
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback to the heuristic mock if the API fails or is unconfigured
    const wordCount = content.split(/\\s+/).filter(Boolean).length;
    return {
      price: 24,
      descriptions: [
        { tone: 'Objective', text: `A ${wordCount}-word text outlining procedures related to the topic.` },
        { tone: 'Structural', text: `An informal set of notes detailing requirements and expected outcomes.` },
        { tone: 'Empirical', text: `A user claim regarding a specific configuration path.` }
      ]
    };
  }
}
