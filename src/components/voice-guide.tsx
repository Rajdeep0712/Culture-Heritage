"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useVoice } from "@/lib/voice-context";

const pageInstructions: Record<string, string> = {
  "/": "You're on the home page. Say 'marketplace' to explore crafts, 'story map' to see the India map, or 'learn' to discover techniques.",
  "/marketplace": "You're on the marketplace. Say 'search' to look for a product, or 'home' to go back.",
  "/story-map": "You're on the story map. Tap a state pin to zoom in, or say 'home' to go back.",
  "/learn": "You're on the learn page. Explore traditional craft techniques here. Say 'home' to go back.",
  "/profile": "You're on your profile. Say 'home' to go back to the main page.",
  "/dashboard": "You're on your artisan dashboard. Say 'home' to go back, or 'marketplace' to visit the market.",
  "/onboarding": "You're in onboarding. Follow the steps to set up your account.",
  "/login": "You're on the login page. Enter your email and password to sign in.",
};

const commandRoutes: Record<string, string> = {
  home: "/",
  marketplace: "/marketplace",
  "market": "/marketplace",
  "story map": "/story-map",
  "storymap": "/story-map",
  "map": "/story-map",
  learn: "/learn",
  profile: "/profile",
  dashboard: "/dashboard",
  search: "/marketplace",
  back: "__back__",
};

export function VoiceGuide() {
  const pathname = usePathname();
  const router = useRouter();
  const { voiceOn, speak } = useVoice();
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!voiceOn) return;
    const instruction = pageInstructions[pathname];
    if (instruction) {
      const t = setTimeout(() => speak(instruction), 300);
      return () => clearTimeout(t);
    }
  }, [pathname, voiceOn, speak]);

  useEffect(() => {
    if (!voiceOn) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
      setTranscript("");
      return;
    }

    const SpeechRecognition =
      (typeof window !== "undefined" && (window as any).SpeechRecognition) ||
      (typeof window !== "undefined" && (window as any).webkitSpeechRecognition);

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      let finalTranscript = "";
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPart = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPart;
        } else {
          interimTranscript += transcriptPart;
        }
      }
      setTranscript((interimTranscript || finalTranscript).trim().toLowerCase());

      if (finalTranscript) {
        const command = finalTranscript.trim().toLowerCase();
        for (const [keyword, route] of Object.entries(commandRoutes)) {
          if (command.includes(keyword)) {
            if (route === "__back__") {
              router.back();
            } else {
              router.push(route);
            }
            break;
          }
        }
        setTranscript("");
      }
    };

    recognition.onerror = (event: any) => {
      if (event.error === "no-speech" || event.error === "aborted") return;
    };

    recognition.onend = () => {
      if (recognitionRef.current === recognition) {
        try {
          recognition.start();
        } catch {
          // already started
        }
      }
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch {
      // already started
    }

    return () => {
      recognitionRef.current = null;
      try {
        recognition.stop();
      } catch {
        // already stopped
      }
    };
  }, [voiceOn, router]);

  if (!voiceOn) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-full bg-indigo-dark/95 px-5 py-2.5 shadow-xl backdrop-blur-sm border border-gold/30 fade-in">
      <span className="flex h-2.5 w-2.5 rounded-full bg-gold voice-pulse" />
      <span className="text-cream text-sm font-medium">
        {transcript ? `"${transcript}"` : "Listening…"}
      </span>
    </div>
  );
}
