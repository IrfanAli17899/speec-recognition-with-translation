import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY, // defaults to process.env["OPENAI_API_KEY"]
});


export async function POST(request: NextRequest) {
    const { text, srcLang, tgtLang } = await request.json();
    // const response = NextResponse.json;
    const chatCompletion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `You will be provided with a sentence in ${srcLang}, and your task is to translate it into ${tgtLang}.`,
            },
            { role: "user", content: text },
        ],
        model: "gpt-3.5-turbo",
    });

    const result = chatCompletion.choices[0]['message']['content'] || ''
    return NextResponse.json({ result });
}