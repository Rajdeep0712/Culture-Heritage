"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useScrollReveal } from "@/lib/use-scroll-reveal";

export default function DashboardPage() {
  const { profile, loading } = useAuth();
  const router = useRouter();
  const { ref, revealed } = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    if (!loading && (!profile || profile.role !== "artisan")) {
      router.push("/");
    }
  }, [loading, profile, router]);

  if (loading || !profile) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-ink-light">Loading…</p>
      </div>
    );
  }

  const quickActions = [
    {
      title: "Record a Product",
      description: "Photograph and list a new craft",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      ),
      color: "terracotta",
    },
    {
      title: "View Earnings",
      description: "Track your sales and payouts",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      color: "gold",
    },
    {
      title: "Learn Techniques",
      description: "Watch tutorials from master artisans",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
      color: "indigo",
    },
    {
      title: "View Badges",
      description: "See your craft achievements",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="7" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
      ),
      color: "terracotta",
    },
    {
      title: "Fair Trade Score",
      description: "Check your transparency rating",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      color: "success",
    },
  ];

  const colorMap: Record<string, string> = {
    terracotta: "bg-terracotta/10 text-terracotta-dark border-terracotta/20",
    gold: "bg-gold/10 text-gold-dark border-gold/20",
    indigo: "bg-indigo/10 text-indigo border-indigo/20",
    success: "bg-success/10 text-success border-success/20",
  };

  const stats = [
    { label: "Commission", value: "0%", subtext: "You keep everything" },
    { label: "Payouts", value: "Direct", subtext: "Straight to your account" },
    { label: "Middlemen", value: "None", subtext: "You set your price" },
  ];

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-indigo-dark px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-sm font-medium text-gold-light">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Artisan Dashboard
          </span>
          <h1 className="mt-6 font-serif text-5xl font-semibold leading-tight text-cream sm:text-6xl">
            Your craft.
            <span className="block text-gold-light">Your voice.</span>
            <span className="block text-cream">Your income.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/80">
            Welcome back, {profile.full_name || profile.email}. Here's where you manage your craft, your story, and your earnings — all in one place.
          </p>
        </div>
        <div className="pointer-events-none absolute -right-10 top-10 hidden opacity-10 lg:block">
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
            <circle cx="150" cy="150" r="140" stroke="#c9a44c" strokeWidth="1" />
            <circle cx="150" cy="150" r="100" stroke="#c9a44c" strokeWidth="1" />
            <circle cx="150" cy="150" r="60" stroke="#c9a44c" strokeWidth="1" />
            <circle cx="150" cy="150" r="20" stroke="#c9a44c" strokeWidth="1" />
          </svg>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-parchment px-4 py-8 sm:px-6">
        <div className="mx-auto grid max-w-3xl grid-cols-3 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-3xl font-semibold text-terracotta-dark">{stat.value}</p>
              <p className="mt-1 text-sm font-medium text-ink">{stat.label}</p>
              <p className="text-xs text-ink-light">{stat.subtext}</p>
            </div>
          ))}
        </div>
      </section>

      <section ref={ref} className={`reveal ${revealed ? "revealed" : ""} px-4 py-16 sm:px-6`}>
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 font-serif text-3xl font-semibold text-ink">Quick actions</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((action) => (
              <button
                key={action.title}
                className="floating-card rounded-2xl border border-ink/10 bg-parchment-light p-6 text-left"
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full border ${colorMap[action.color]}`}>
                  {action.icon}
                </div>
                <h3 className="font-serif text-xl font-semibold text-ink">{action.title}</h3>
                <p className="mt-1 text-sm text-ink-light">{action.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
