"use client";
import React, { useState, useRef } from "react";
import languagesJson from "./languages.json";

const languages = Object.entries(languagesJson);

const SpeechRecognitionComponent = () => {
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [translatedTranscript, setTranslatedTranscript] = useState("");
  const [translatedInterimTranscript, setTranslatedInterimTranscript] =
    useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [srcLang, setSrcLang] = useState("en-US");
  const [tgtLang, setTgtLang] = useState("ko-KR");

  const recognition = useRef<SpeechRecognition | null>();
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.lang = tgtLang;

  const startRecognition = () => {
    let _recognition = new window.webkitSpeechRecognition();
    _recognition.continuous = true;
    _recognition.interimResults = true;
    _recognition.lang = "en-US";
    _recognition.onresult = async (event) => {
      let _interimTranscript = "";
      let _interimTranslatedTranscript = "";
      let finalTranscript = "";
      let finalTranslatedTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          // source language
          finalTranscript += transcript + " ";
          setInterimTranscript("");
          setTranscript((_pv) => _pv + " " + finalTranscript);
          // target language
          const translated = await translate(transcript);
          finalTranslatedTranscript += translated + " ";
          // setTranslatedInterimTranscript("");
          setTranslatedTranscript(
            (_pv) => _pv + " " + finalTranslatedTranscript
          );
          utterance.text = finalTranslatedTranscript;
          synth.speak(utterance);
        } else {
          // source language
          _interimTranscript += transcript;
          setInterimTranscript(_interimTranscript);
          // target language
        //   const translated = await translate(transcript);
        //   _interimTranslatedTranscript += translated;
        //   setTranslatedInterimTranscript(_interimTranslatedTranscript);
        }
      }
    };
    recognition.current = _recognition;
    _recognition.start();
    setIsPlaying(true);
  };

  const stopRecognition = () => {
    recognition.current?.stop();
    recognition.current = null;
    setIsPlaying(false);
  };

  async function translate(text: string) {
    const response = await (
      await fetch("/translate", {
        body: JSON.stringify({ text, srcLang, tgtLang }),
        method: "POST",
      })
    ).json();
    return response.result;

    // console.log(chatCompletion.choices);
  }

  return (
    <div>
      <div className="w-full flex justify-between p-4 bg-slate-400">
        <div className="play-pause">
          {!isPlaying ? (
            <button onClick={startRecognition}>Start</button>
          ) : (
            <button onClick={stopRecognition}>Stop</button>
          )}
        </div>
        <div className="flex gap-4">
          <label className="flex gap-2">
            <span>Source</span>
            <select
              name="source-lang"
              value={srcLang}
              className="outline-none"
              onChange={(ev) => setSrcLang(ev.target.value)}
            >
              {languages.map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <label className="flex gap-2">
            <span>Target</span>
            <select
              name="target-lang"
              value={tgtLang}
              className="outline-none"
              onChange={(ev) => setTgtLang(ev.target.value)}
            >
              {languages.map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div className="flex gap-4 p-4">
        <p className="source flex-1">
          {transcript} {interimTranscript}
        </p>
        <p className="target flex-1">
          {translatedTranscript} {translatedInterimTranscript}
        </p>
      </div>
    </div>
  );
};

export default SpeechRecognitionComponent;
