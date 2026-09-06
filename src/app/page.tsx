"use client";

import { HeritageExplorer } from "@/components/heritage-explorer";
import { TrustSection } from "@/components/trust-section";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HomePage() {
  const { profile, loading } = useAuth();
  const router = useRouter();

  if (!loading && profile?.role === "artisan") {
    router.push("/dashboard");
    return null;
  }

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-sm font-medium text-gold-dark">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              India's Living Heritage Marketplace
            </span>
            <h1 className="mt-6 font-serif text-5xl font-semibold leading-tight text-ink sm:text-6xl">
              Every thread tells a story.
              <span className="block text-terracotta-dark">Every purchase keeps one alive.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-light">
              Discover handcrafted treasures from India's vanishing artisan communities. Learn the story behind each piece, meet the maker, and support a craft that has endured for centuries.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/marketplace"
                className="rounded-full bg-terracotta px-7 py-3.5 text-center font-medium text-cream transition-colors hover:bg-terracotta-dark"
              >
                Explore the Marketplace
              </Link>
              <Link
                href="/story-map"
                className="rounded-full border border-ink/20 px-7 py-3.5 text-center font-medium text-ink transition-colors hover:border-terracotta hover:text-terracotta"
              >
                View the Story Map
              </Link>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-20 top-10 hidden opacity-10 lg:block">
          <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
            <circle cx="200" cy="200" r="180" stroke="#c65d3b" strokeWidth="1" />
            <circle cx="200" cy="200" r="140" stroke="#c65d3b" strokeWidth="1" />
            <circle cx="200" cy="200" r="100" stroke="#c65d3b" strokeWidth="1" />
            <circle cx="200" cy="200" r="60" stroke="#c65d3b" strokeWidth="1" />
            <circle cx="200" cy="200" r="20" stroke="#c65d3b" strokeWidth="1" />
          </svg>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <HeritageExplorer />
        </div>
      </section>

      <TrustSection />
    </div>
  );
}
