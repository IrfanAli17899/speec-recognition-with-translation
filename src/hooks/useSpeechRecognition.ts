"use client";

import { useState, useEffect, useRef } from "react";

interface useSpeechRecognitionProps {
    srcLang: string;
    tgtLang: string;
}

const useSpeechRecognition = ({ srcLang, tgtLang }: useSpeechRecognitionProps) => {
  const [transcript, setTranscript] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const recognition = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (recognition.current === null) {
      recognition.current = new window.webkitSpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;
      recognition.current.lang = srcLang;

      recognition.current.onresult = (event) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
            setInterimTranscript("");
            setTranscript((prevTranscript) => prevTranscript + " " + finalTranscript);
          } else {
            interimTranscript += transcript;
            setInterimTranscript(interimTranscript);
          }
        }
      };
    }
    
    return () => {
        if (recognition.current) {
            recognition.current.stop();
            recognition.current = null;
        }
    };
}, [srcLang]);

const startRecognition = () => {
    if (recognition.current) {
        recognition.current.start();
        setIsPlaying(true);
    }
  };

  const stopRecognition = () => {
    if (recognition.current) {
      recognition.current.stop();
      setIsPlaying(false);
    }
  };

  return { transcript, interimTranscript, isPlaying, startRecognition, stopRecognition };
};

export default useSpeechRecognition;