"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase-client";

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    const { error } = await signIn(email, password);
    if (error) {
      setError(error);
      return;
    }
    const { data: userData } = await supabase.auth.getUser();
    if (userData.user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userData.user.id)
        .maybeSingle();
      if (profile?.role === "artisan") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="text-center">
        <h1 className="font-serif text-4xl font-semibold text-ink">Welcome back</h1>
        <p className="mt-2 text-ink-light">Sign in to continue your journey</p>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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
            placeholder="Your password"
            className="w-full rounded-xl border border-ink/15 bg-parchment-light px-4 py-3 text-ink outline-none transition-colors focus:border-terracotta"
          />
        </div>
        {error && (
          <p className="rounded-lg bg-error/10 px-4 py-2 text-sm text-error">{error}</p>
        )}
        <button
          type="submit"
          className="w-full rounded-full bg-terracotta px-6 py-3 font-medium text-cream transition-colors hover:bg-terracotta-dark"
        >
          Sign In
        </button>
        <p className="text-center text-sm text-ink-light">
          New to Sutr?{" "}
          <a href="/onboarding" className="font-medium text-terracotta-dark hover:underline">
            Get started
          </a>
        </p>
      </form>
    </div>
  );
}
