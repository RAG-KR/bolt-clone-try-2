import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from '@google/generative-ai';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp',
    // systemInstruction: 'You are a helpful assistant that can answer questions and help with tasks.',
});

const generationConfig = {
    temperature: 0.1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
};

const CodeGenerationConfig = {
    temperature: 0.1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: 'application/json',
};

export const chatSession = model.startChat({
    generationConfig,
    history: [],
});

export const GenAiCode = model.startChat({
    generationConfig:CodeGenerationConfig,
    history: [],
})
// const result = await chatSession.sendMessage('INSERT PROMPT HERE');
// console.log(result.response.text());

