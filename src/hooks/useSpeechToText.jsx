import { useState, useEffect } from 'react';

const useSpeechToText = ({ onTranscriptChange }) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    let recognition;
    if (window.webkitSpeechRecognition) {
      recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            setTranscript((prev) => prev + transcriptPart + ' ');
            onTranscriptChange(transcriptPart + ' ');
          } else {
            interimTranscript += transcriptPart;
          }
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setListening(false);
      };
    }

    if (listening) {
      recognition.start();
    } else {
      if (recognition) recognition.stop();
    }

    return () => {
      if (recognition) recognition.stop();
    };
  }, [listening, onTranscriptChange]);

  return {
    listening,
    startListening: () => setListening(true),
    stopListening: () => setListening(false),
    transcript,
  };
};

export default useSpeechToText;