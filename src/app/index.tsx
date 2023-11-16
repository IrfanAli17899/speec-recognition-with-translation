"use client";

import React, { useState } from "react";
import LanguageSelector from "@src/components/LanguageSelector";
import useSpeechRecognition from "@src/hooks/useSpeechRecognition";
import useSpeechTranslation from "@src/hooks/useSpeechTranslation";
import languagesJson from "@src/app/languages.json";

const languages = Object.entries(languagesJson);

const SpeechRecognitionComponent = () => {
  const [srcLang, setSrcLang] = useState("en-US");
  const [tgtLang, setTgtLang] = useState("ko-KR");

  const {
    transcript,
    interimTranscript,
    isPlaying,
    startRecognition,
    stopRecognition,
  } = useSpeechRecognition({ srcLang, tgtLang });

  const [translatedText] = useSpeechTranslation({
    text: transcript,
    srcLang,
    tgtLang,
  });

  const [interimTranslatedText, setTranslatedInterim] = useSpeechTranslation({
    text: interimTranscript,
    srcLang,
    tgtLang,
  });

  return (
    <div>
      <div className="flex p-4 bg-gray-300 justify-between">
        {/* Start/Stop button */}
        {!isPlaying ? (
          <button onClick={startRecognition}>Start</button>
        ) : (
          <button onClick={stopRecognition}>Stop</button>
        )}
        {/* UI components */}
        <div className="flex gap-4">
          <LanguageSelector
            label="Source"
            languages={languages}
            selectedLanguage={srcLang}
            onLanguageChange={(lang) => setSrcLang(lang)}
          />
          <LanguageSelector
            label="Target"
            languages={languages}
            selectedLanguage={tgtLang}
            onLanguageChange={(lang) => setTgtLang(lang)}
          />
        </div>
      </div>

      {/* Display recognized and translated text */}
      <div className="flex gap-4 p-4">
        <p className="source flex-1">
          {transcript} {interimTranscript}
        </p>
        <p className="target flex-1">
          {translatedText} {interimTranslatedText}
        </p>
      </div>
    </div>
  );
};

export default SpeechRecognitionComponent;
