import { GenAiCode } from "@/configs/AiModel"
import { NextResponse } from "next/server";

export async function POST(req){
    const {prompt} = await req.json();
    try{
        const result = await GenAiCode.sendMessage(prompt);
        const resp = await result.response.text();
        const parsedResp = JSON.parse(resp);
        return NextResponse.json(parsedResp)
    }catch(e){
        return NextResponse.json({error:e.message}, {status:500})
    }
}