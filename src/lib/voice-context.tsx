"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

interface VoiceContextValue {
  voiceOn: boolean;
  toggleVoice: () => void;
  speak: (text: string) => void;
}

const VoiceContext = createContext<VoiceContextValue | undefined>(undefined);

export function VoiceProvider({ children }: { children: ReactNode }) {
  const [voiceOn, setVoiceOn] = useState(false);

  const speak = useCallback((text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.95;
    utter.pitch = 1;
    window.speechSynthesis.speak(utter);
  }, []);

  const toggleVoice = useCallback(() => {
    setVoiceOn((prev) => {
      const next = !prev;
      if (!next && typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (!voiceOn && typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, [voiceOn]);

  return (
    <VoiceContext.Provider value={{ voiceOn, toggleVoice, speak }}>
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  const ctx = useContext(VoiceContext);
  if (!ctx) throw new Error("useVoice must be used within VoiceProvider");
  return ctx;
}
