import { NextResponse } from 'next/server';
import { chatSession } from '@/configs/AiModel';

export async function POST(req) {
    try {
        const { prompt } = await req.json();
        
        if (!prompt) {
            return NextResponse.json({
                error: 'Prompt is required',
            }, { status: 400 });
        }

        const result = await chatSession.sendMessage(prompt);
        const AIResp = result.response.text();

        return NextResponse.json({
            result: AIResp,
        });
    } catch (e) {
        console.error('AI Chat Error:', e);
        return NextResponse.json({
            error: e.message || 'Internal server error',
        }, { status: 500 });
    }
}   