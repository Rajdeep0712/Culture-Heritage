"use client";

import { useScrollReveal } from "@/lib/use-scroll-reveal";

const techniques = [
  {
    name: "Block Printing",
    origin: "Sanganer, Rajasthan",
    description: "Carved teak blocks are dipped in natural dye and stamped onto cotton fabric, creating repeating patterns that have adorned Indian textiles for centuries.",
    difficulty: "Intermediate",
    time: "2-3 days per piece",
  },
  {
    name: "Patola Weaving",
    origin: "Patan, Gujarat",
    description: "A double-ikat technique where both warp and weft threads are tie-dyed before weaving, creating identical patterns on both sides. A single saree can take a year to complete.",
    difficulty: "Master level",
    time: "6-12 months per piece",
  },
  {
    name: "Bandhani Tie-Dye",
    origin: "Jodhpur, Rajasthan",
    description: "Tiny knots are tied on fabric before dyeing, creating intricate dotted patterns when untied. Each pattern carries cultural significance for weddings and festivals.",
    difficulty: "Intermediate",
    time: "1-2 weeks per piece",
  },
  {
    name: "Tanjore Painting",
    origin: "Thanjavur, Tamil Nadu",
    description: "Classical South Indian painting featuring deities adorned with gold leaf and semi-precious stones, created on wooden panels with a distinctive raised relief effect.",
    difficulty: "Advanced",
    time: "2-4 weeks per piece",
  },
  {
    name: "Rogan Painting",
    origin: "Nirona, Gujarat",
    description: "Castor-oil-based pigments are painted onto fabric using only a metal stylus — no brush. One of India's rarest crafts, practiced by a single family.",
    difficulty: "Master level",
    time: "1-3 months per piece",
  },
  {
    name: "Baluchari Weaving",
    origin: "Bishnupur, West Bengal",
    description: "Narrative silk sarees depicting mythological scenes, woven on jacquard looms. Each panel tells a story from the Ramayana or Mahabharata.",
    difficulty: "Advanced",
    time: "2-4 months per piece",
  },
];

export default function LearnPage() {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>();

  return (
    <div className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h1 className="font-serif text-4xl font-semibold text-ink sm:text-5xl">
            Learn the Techniques
          </h1>
          <p className="mt-2 text-ink-light">
            Understanding the craft is the first step to preserving it
          </p>
        </div>

        <div ref={ref} className={`reveal ${revealed ? "revealed" : ""} grid gap-6 md:grid-cols-2`}>
          {techniques.map((tech) => (
            <div
              key={tech.name}
              className="floating-card rounded-2xl border border-ink/10 bg-parchment-light p-6"
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-ink">{tech.name}</h3>
                  <p className="text-sm text-terracotta-dark">{tech.origin}</p>
                </div>
                <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-gold-dark">
                  {tech.difficulty}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-ink-light">{tech.description}</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-ink-light">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {tech.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
