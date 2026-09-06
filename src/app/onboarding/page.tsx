"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useVoice } from "@/lib/voice-context";
import {
  commonTutorialSteps,
  artisanTutorialSteps,
  buyerTutorialSteps,
  type TutorialStep,
} from "@/lib/heritage-data";

type Step = "language" | "walkthrough" | "role" | "tutorial" | "login";

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी (Hindi)" },
  { code: "ta", label: "தமிழ் (Tamil)" },
  { code: "bn", label: "বাংলা (Bengali)" },
  { code: "gu", label: "ગુજરાતી (Gujarati)" },
  { code: "mr", label: "मराठी (Marathi)" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const { speak } = useVoice();
  const [step, setStep] = useState<Step>("language");
  const [language, setLanguage] = useState("en");
  const [wantWalkthrough, setWantWalkthrough] = useState(false);
  const [role, setRole] = useState<"artisan" | "buyer" | null>(null);
  const [tutorialIndex, setTutorialIndex] = useState(0);
  const [tutorialPlaying, setTutorialPlaying] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const tutorialSteps: TutorialStep[] = role
    ? [...commonTutorialSteps, ...(role === "artisan" ? artisanTutorialSteps : buyerTutorialSteps)]
    : [];

  useEffect(() => {
    if (step === "tutorial" && tutorialPlaying && tutorialSteps[tutorialIndex]) {
      speak(tutorialSteps[tutorialIndex].narration);
    }
  }, [step, tutorialIndex, tutorialPlaying, speak, tutorialSteps]);

  const handleWalkthroughChoice = (want: boolean) => {
    setWantWalkthrough(want);
    setStep("role");
  };

  const handleRoleSelect = (selectedRole: "artisan" | "buyer") => {
    setRole(selectedRole);
    if (wantWalkthrough) {
      setStep("tutorial");
      setTutorialIndex(0);
      setTutorialPlaying(true);
    } else {
      setStep("login");
    }
  };

  const handleTutorialNext = () => {
    if (tutorialIndex < tutorialSteps.length - 1) {
      setTutorialIndex(tutorialIndex + 1);
    } else {
      setStep("login");
    }
  };

  const handleTutorialSkip = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setStep("login");
  };

  const handleTutorialPlayPause = () => {
    if (tutorialPlaying) {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setTutorialPlaying(false);
    } else {
      setTutorialPlaying(true);
    }
  };

  const handleSignUp = async () => {
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!role) {
      setError("Please select a role.");
      return;
    }
    const { error } = await signUp(email, password, role, language);
    if (error) {
      setError(error);
    } else {
      router.push(role === "artisan" ? "/dashboard" : "/");
    }
  };

  const progressSteps = ["language", "walkthrough", "role", ...(wantWalkthrough ? ["tutorial"] : []), "login"];

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="mb-8 flex items-center justify-center gap-2">
        {progressSteps.map((s, i) => (
          <div
            key={s}
            className={`h-1.5 rounded-full transition-all ${
              progressSteps.indexOf(step) >= i ? "bg-terracotta" : "bg-ink/15"
            }`}
            style={{ width: progressSteps.indexOf(step) === i ? "32px" : "16px" }}
          />
        ))}
      </div>

      {step === "language" && (
        <div className="slide-up text-center">
          <h1 className="font-serif text-4xl font-semibold text-ink">Choose your language</h1>
          <p className="mt-2 text-ink-light">We'll use this throughout your journey</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`rounded-xl border p-4 text-left transition-all ${
                  language === lang.code
                    ? "border-terracotta bg-terracotta/10"
                    : "border-ink/15 bg-parchment-light hover:border-terracotta/50"
                }`}
              >
                <span className="font-medium text-ink">{lang.label}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep("walkthrough")}
            className="mt-8 w-full rounded-full bg-terracotta px-6 py-3 font-medium text-cream transition-colors hover:bg-terracotta-dark"
          >
            Continue
          </button>
        </div>
      )}

      {step === "walkthrough" && (
        <div className="slide-up text-center">
          <h1 className="font-serif text-4xl font-semibold text-ink">Want a quick walkthrough?</h1>
          <p className="mt-2 text-ink-light">We'll show you around in about a minute</p>
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => handleWalkthroughChoice(true)}
              className="flex-1 rounded-xl border-2 border-terracotta bg-terracotta/10 p-6 transition-all hover:bg-terracotta/20"
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c65d3b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <span className="font-medium text-ink">Yes, show me around</span>
            </button>
            <button
              onClick={() => handleWalkthroughChoice(false)}
              className="flex-1 rounded-xl border-2 border-ink/15 bg-parchment-light p-6 transition-all hover:border-ink/30"
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-ink/10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5a4a3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <span className="font-medium text-ink">No, skip to sign up</span>
            </button>
          </div>
        </div>
      )}

      {step === "role" && (
        <div className="slide-up text-center">
          <h1 className="font-serif text-4xl font-semibold text-ink">How will you use Sutr?</h1>
          <p className="mt-2 text-ink-light">This shapes your experience — you can change it later</p>
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => handleRoleSelect("artisan")}
              className="flex-1 rounded-xl border-2 border-ink/15 bg-parchment-light p-6 text-left transition-all hover:border-terracotta"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/15">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c65d3b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19l7-7 3 3L7 32l-7-7 3-3 7 7z" transform="scale(0.6) translate(5 0)" />
                  <path d="M18 2L22 6L12 16L8 12L18 2Z" />
                  <path d="M2 22L6 26" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-ink">I'm an Artisan</h3>
              <p className="mt-1 text-sm text-ink-light">I create crafts and want to sell them directly</p>
            </button>
            <button
              onClick={() => handleRoleSelect("buyer")}
              className="flex-1 rounded-xl border-2 border-ink/15 bg-parchment-light p-6 text-left transition-all hover:border-indigo"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo/15">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3a4a6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-ink">I'm a Buyer</h3>
              <p className="mt-1 text-sm text-ink-light">I want to discover and support Indian crafts</p>
            </button>
          </div>
        </div>
      )}

      {step === "tutorial" && role && tutorialSteps[tutorialIndex] && (
        <div className="tutorial-slide">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-ink-light">
              Step {tutorialIndex + 1} of {tutorialSteps.length}
            </span>
            <button
              onClick={handleTutorialSkip}
              className="text-sm font-medium text-ink-light hover:text-terracotta"
            >
              Skip
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-ink/10 bg-parchment-light">
            <div className="relative flex h-56 items-center justify-center bg-gradient-to-br from-terracotta/15 to-indigo/15">
              <TutorialArtwork query={tutorialSteps[tutorialIndex].query} />
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <button
                  onClick={handleTutorialPlayPause}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-dark/90 text-cream transition-colors hover:bg-indigo-dark"
                >
                  {tutorialPlaying ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-serif text-2xl font-semibold text-ink">{tutorialSteps[tutorialIndex].title}</h3>
              <p className="mt-2 text-ink leading-relaxed">{tutorialSteps[tutorialIndex].description}</p>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            {tutorialIndex > 0 && (
              <button
                onClick={() => setTutorialIndex(tutorialIndex - 1)}
                className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-terracotta"
              >
                Previous
              </button>
            )}
            <button
              onClick={handleTutorialNext}
              className="flex-1 rounded-full bg-terracotta px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-terracotta-dark"
            >
              {tutorialIndex < tutorialSteps.length - 1 ? "Next" : "Continue to sign up"}
            </button>
          </div>
        </div>
      )}

      {step === "login" && (
        <div className="slide-up">
          <div className="text-center">
            <h1 className="font-serif text-4xl font-semibold text-ink">Create your account</h1>
            <p className="mt-2 text-ink-light">
              {role === "artisan" ? "Welcome, artisan. Let's get you started." : "Welcome to Sutr. Let's get you started."}
            </p>
          </div>
          <div className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-ink/15 bg-parchment-light px-4 py-3 text-ink outline-none transition-colors focus:border-terracotta"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full rounded-xl border border-ink/15 bg-parchment-light px-4 py-3 text-ink outline-none transition-colors focus:border-terracotta"
              />
            </div>
            {error && (
              <p className="rounded-lg bg-error/10 px-4 py-2 text-sm text-error">{error}</p>
            )}
            <button
              onClick={handleSignUp}
              className="w-full rounded-full bg-terracotta px-6 py-3 font-medium text-cream transition-colors hover:bg-terracotta-dark"
            >
              Create Account
            </button>
            <p className="text-center text-sm text-ink-light">
              Already have an account?{" "}
              <a href="/login" className="font-medium text-terracotta-dark hover:underline">
                Sign in
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function TutorialArtwork({ query }: { query: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-parchment/80">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c65d3b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polygon points="10 8 16 12 10 16 10 8" />
          </svg>
        </div>
        <p className="mt-2 text-xs text-ink-light">{query}</p>
      </div>
    </div>
  );
}
