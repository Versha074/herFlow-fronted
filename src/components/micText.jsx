import React from "react";
import useSpeechToText from "../hooks/useSpeechToText";
import { Mic, MicOff } from "lucide-react";
import { useFormContext } from "react-hook-form";

const MicText = ({ index }) => {
  const { register, setValue, getValues } = useFormContext();

  const { listening, startListening, stopListening } = useSpeechToText({
    onTranscriptChange: (newTranscript) => {
      const currentValue = getValues(`symptoms.${index}.additionalNotes`) || "";
      setValue(`symptoms.${index}.additionalNotes`, currentValue + newTranscript, {
        shouldValidate: true,
      });
    },
  });

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
      <div className="relative">
        <textarea
          className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500 transition duration-200"
          rows="3"
          {...register(`symptoms.${index}.additionalNotes`)}
        />
        <button
          type="button"
          onClick={listening ? stopListening : startListening}
          className={`absolute right-2 bottom-2 p-2 rounded-full transition duration-200 ${
            listening
              ? "bg-red-500 hover:bg-red-600 text-white shadow-lg animate-pulse"
              : "bg-gray-100 hover:bg-gray-200 text-gray-600"
          }`}
        >
          {listening ? (
            <Mic className="w-5 h-5" />
          ) : (
            <MicOff className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default MicText;