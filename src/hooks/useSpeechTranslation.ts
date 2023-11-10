"use client";

import translateText from "@src/services/translate";
import { useState, useEffect } from "react";
interface useSpeechTranslationProps {
    text: string;
    srcLang: string;
    tgtLang: string;
    onDone?: () => void;
};

const useSpeechTranslation = ({ text, srcLang, tgtLang, onDone }: useSpeechTranslationProps) => {
    const [translatedText, setTranslatedText] = useState("");

    useEffect(() => {
        if (text && srcLang && tgtLang) {
            translateText(text, srcLang, tgtLang)
                .then((result) => { setTranslatedText(result); onDone?.() })
                .catch((err) => console.log(err));
        }

    }, [text, srcLang, tgtLang, onDone]);

    return [translatedText, setTranslatedText] as const;
};

export default useSpeechTranslation;