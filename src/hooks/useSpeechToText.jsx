import { useState, useEffect } from "react";

const useSpeechToText = ({ onTranscriptChange }) => {
  const [listening, setListening] = useState(false);
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  useEffect(() => {
    recognition.continuous = true; // Keeps listening until stopped
    recognition.interimResults = true; // Allows interim results
    recognition.lang = "en-US";

    recognition.onstart = () => {
      console.log("Speech recognition started");
      setListening(true);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      setListening(false);
    };

    recognition.onresult = (event) => {
      let finalTranscript = "";
      // Accumulate only final results to avoid interim flickering
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      // Call the callback with the accumulated final transcript
      if (finalTranscript) {
        onTranscriptChange(finalTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false); // Reset listening state on error
    };

    // Cleanup: stop recognition when the component unmounts
    return () => {
      recognition.stop();
    };
  }, [onTranscriptChange]); // Dependency on callback to ensure updates

  const startListening = () => {
    console.log("Starting recognition");
    recognition.start();
  };

  const stopListening = () => {
    console.log("Stopping recognition");
    recognition.stop();
  };

  return { listening, startListening, stopListening };
};

export default useSpeechToText;