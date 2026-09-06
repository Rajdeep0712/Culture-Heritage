"use client";

import { useEffect, useRef, useState } from "react";
import { heritageMedia, trustStats } from "@/lib/heritage-data";

export function TrustSection() {
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const urls: string[] = [];
      for (const item of heritageMedia) {
        try {
          const res = await fetch(
            `https://api.pexels.com/v1/search?query=${encodeURIComponent(item.query)}&per_page=1`,
            {
              headers: { Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY || "" },
            }
          );
          if (!res.ok) break;
          const data = await res.json();
          if (data.photos?.[0]?.src?.medium && !cancelled) {
            urls.push(data.photos[0].src.medium);
          }
        } catch {
          break;
        }
      }
      if (!cancelled) setMediaUrls(urls);
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <div ref={sectionRef} className={`reveal ${revealed ? "revealed" : ""}`}>
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-6 font-serif text-3xl font-semibold text-ink sm:text-4xl">
            Heritage in motion
          </h2>
          <div className="scroll-snap-x flex gap-4 overflow-x-auto pb-4">
            {heritageMedia.map((item, i) => (
              <div
                key={i}
                className="scroll-snap-item flex-shrink-0 w-64 overflow-hidden rounded-2xl border border-ink/10 bg-parchment-light"
              >
                <div className="relative h-40 overflow-hidden bg-indigo/10">
                  {mediaUrls[i] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={mediaUrls[i]}
                      alt={item.caption}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <div className="h-12 w-12 animate-pulse rounded-full bg-terracotta/20" />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-ink">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-indigo-dark px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 text-center sm:grid-cols-4">
          <Stat value={trustStats.artisansDocumented} label="Artisans documented" />
          <Stat value={trustStats.districtsMapped} label="Districts mapped" />
          <Stat value={trustStats.endangeredCrafts} label="Endangered crafts flagged" />
          <Stat value={trustStats.languagesSupported} label="Languages supported" />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 text-center font-serif text-3xl font-semibold text-ink sm:text-4xl">
            How it works
          </h2>
          <p className="mb-10 text-center text-ink-light">A fair, transparent marketplace built for artisans first</p>
          <div className="grid gap-8 md:grid-cols-3">
            <HowItWorksCard
              icon="speak"
              title="Artisans speak"
              description="Artisans record their own stories, set their own prices, and share their craft in their own words — no middlemen, no scripts."
            />
            <HowItWorksCard
              icon="fair"
              title="Fair pricing"
              description="Prices are set by the artisan. Zero commission means what you pay goes directly to the family that made your piece."
            />
            <HowItWorksCard
              icon="qr"
              title="Meet the maker"
              description="Every product comes with a QR code linking you to the artisan's story — their village, their technique, their lineage."
            />
          </div>
        </div>
      </section>

      <section className="bg-parchment-light px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5a7a4a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
            <h3 className="font-serif text-2xl font-semibold text-ink">Every artisan is verified</h3>
          </div>
          <p className="max-w-2xl text-ink-light">
            We work directly with artisan cooperatives, craft councils, and NGO partners across India. Every maker on Sutr is a real person with a real craft — not a reseller, not a factory.
          </p>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <p className="font-serif text-4xl font-semibold text-gold-light sm:text-5xl">{value}</p>
      <p className="mt-1 text-sm text-cream/80">{label}</p>
    </div>
  );
}

function HowItWorksCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  const icons: Record<string, React.ReactNode> = {
    speak: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c65d3b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
      </svg>
    ),
    fair: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3a4a6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v12M8 10h8M8 14h8" />
      </svg>
    ),
    qr: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c9a44c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="3" height="3" />
        <rect x="18" y="18" width="3" height="3" />
      </svg>
    ),
  };

  return (
    <div className="rounded-2xl border border-ink/10 bg-parchment-light p-8">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-parchment">
        {icons[icon]}
      </div>
      <h3 className="font-serif text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-light">{description}</p>
    </div>
  );
}
