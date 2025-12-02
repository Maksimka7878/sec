import { GoogleGenAI } from "@google/genai";

export const getSecurityAdvice = async (userMessage: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      console.warn("API Key is missing in process.env");
    }

    const ai = new GoogleGenAI({ apiKey: apiKey || '' });

    const model = 'gemini-2.5-flash';
    const systemInstruction = `
      Ты — элитный AI-эксперт по кибербезопасности компании CRIMSON VECTOR.
      Твой стиль общения: профессиональный, техничный, параноидальный, "хакерский". 
      Твоя цель: консультировать по вопросам защиты данных, сетевой безопасности и предотвращения взломов.
      
      Если спрашивают про услуги: "У нас есть защита периметра, Red Teaming и круглосуточный SOC мониторинг."
      Если спрашивают про цены: "Тарифы начинаются от 15 000 руб за базовый аудит. Для корпораций — индивидуальные контракты."
      
      Отвечай на русском языке. Используй термины (эксплойт, фишинг, бэкдор, VPN, шифрование).
      Не давай советов по незаконному взлому (отвечай: "Протокол этики запрещает атаку на неавторизованные цели").
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
        maxOutputTokens: 250,
      }
    });

    return response.text || "Ошибка соединения с узлом нейросети.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.toString().includes("API key")) {
        return "ОШИБКА ДОСТУПА. ТРЕБУЕТСЯ КЛЮЧ ШИФРОВАНИЯ (API KEY).";
    }
    return "СБОЙ СВЯЗИ С ГЛАВНЫМ СЕРВЕРОМ.";
  }
};