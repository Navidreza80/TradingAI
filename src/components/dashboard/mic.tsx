"use client"; // Required for client-side functionality

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Mic } from "lucide-react";

export default function VoiceNavigation() {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  let recognition;

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      console.warn("Speech Recognition API not supported in this browser");
      return;
    }
    
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
      console.log("Recognized:", transcript);

      // **Route Navigation in Next.js**
      if (transcript.includes("go to home")) router.push("/");
      else if (transcript.includes("go to blogs")) router.push("/blogs");
      else if (transcript.includes("go to suggestions")) router.push("/suggestion");
      else if (transcript.includes("go to trade")) router.push("/trade");
      else if (transcript.includes("go to education")) router.push("/education");

      // **Window Navigation**
      else if (transcript.includes("reload page")) window.location.reload();
      else if (transcript.includes("go back")) router.back();
      else if (transcript.includes("go forward")) router.forward();
    };

    return () => {
      recognition.stop();
    };
  }, [router]);

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsListening(!isListening);
  };

  return (
    <div
      className={`fixed bottom-24 right-6 z-[49] p-4 rounded-full shadow-lg cursor-pointer transition ${isListening ? "bg-red-500" : "bg-blue-500"} text-white hover:bg-blue-600`}
      onClick={toggleListening}
    >
      <Mic size={24} />
    </div>
  );
}