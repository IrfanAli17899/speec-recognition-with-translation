"use server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});

async function translateText(text: string, srcLang: string, tgtLang: string) {
    // const chatCompletion = await openai.chat.completions.create({
    //     messages: [
    //         {
    //             role: "system",
    //             content: `You will be provided with a sentence in ${srcLang}, and your task is to translate it into ${tgtLang}.`,
    //         },
    //         { role: "user", content: text },
    //     ],
    //     model: "gpt-3.5-turbo",
    // });

    // const result = chatCompletion.choices[0]['message']['content'] || ''
    // console.log(srcLang.split('-')[0]);
    // console.log(tgtLang.split('-')[0]);
    const source_language = srcLang.split('-')[0];
    const target_language = tgtLang.split('-')[0];
    
    const res = await (await fetch(`https://dev-aps.metastarglobal.io/ai_api/translator/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text.trim(), source_language, target_language })
    })).json();
    return res.response;
}

export default translateText;