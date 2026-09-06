"use client";

import { useRef, useState } from "react";
import { states, type State, type District } from "@/lib/heritage-data";
import { useScrollReveal } from "@/lib/use-scroll-reveal";

type Level = "state" | "district" | "heritage";

export function HeritageExplorer() {
  const [level, setLevel] = useState<Level>("state");
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { ref, revealed } = useScrollReveal<HTMLDivElement>();

  const scrollBy = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  const handleStateClick = (state: State) => {
    setSelectedState(state);
    setLevel("district");
  };

  const handleDistrictClick = (district: District) => {
    setSelectedDistrict(district);
    setLevel("heritage");
  };

  const goBack = () => {
    if (level === "heritage") {
      setLevel("district");
      setSelectedDistrict(null);
    } else if (level === "district") {
      setLevel("state");
      setSelectedState(null);
    }
  };

  const breadcrumb = (
    <div className="flex items-center gap-2 text-sm text-ink-light">
      {level !== "state" && (
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 text-ink transition-colors hover:border-terracotta hover:text-terracotta"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>
      )}
      <span className="font-medium text-ink">Heritage</span>
      {selectedState && (
        <>
          <span className="text-ink/30">/</span>
          <span className="font-medium text-terracotta-dark">{selectedState.name}</span>
        </>
      )}
      {selectedDistrict && (
        <>
          <span className="text-ink/30">/</span>
          <span className="font-medium text-terracotta-dark">{selectedDistrict.name}</span>
        </>
      )}
    </div>
  );

  return (
    <div ref={ref} className={`reveal ${revealed ? "revealed" : ""}`}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">
            {level === "state" && "Explore by State"}
            {level === "district" && `${selectedState?.name} — Districts`}
            {level === "heritage" && selectedDistrict?.name}
          </h2>
          <p className="mt-1 text-sm text-ink-light">
            {level === "state" && "Tap a state to discover its craft districts"}
            {level === "district" && "Tap a district to see the heritage detail"}
            {level === "heritage" && selectedDistrict?.area}
          </p>
        </div>
        {breadcrumb}
      </div>

      {level === "state" && (
        <CardRow scrollRef={scrollRef} onScroll={scrollBy}>
          {states.map((state, i) => (
            <StateCard key={state.id} state={state} index={i} onClick={() => handleStateClick(state)} />
          ))}
        </CardRow>
      )}

      {level === "district" && selectedState && (
        <>
          {selectedState.documented && selectedState.districts ? (
            <CardRow scrollRef={scrollRef} onScroll={scrollBy}>
              {selectedState.districts.map((district, i) => (
                <DistrictCard key={district.id} district={district} index={i} onClick={() => handleDistrictClick(district)} />
              ))}
            </CardRow>
          ) : (
            <div className="rounded-2xl border border-gold/30 bg-parchment-light p-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gold/20 px-3 py-1 text-sm font-medium text-gold-dark">
                <span className="h-2 w-2 rounded-full bg-gold" />
                Coming Soon
              </div>
              <h3 className="font-serif text-2xl font-semibold text-ink">
                {selectedState.name} — Documentation in Progress
              </h3>
              <p className="mt-2 text-ink-light">
                We're working with artisans across {selectedState.name} to document their crafts. Here's what we know so far:
              </p>
              <ul className="mt-4 space-y-2">
                {selectedState.knownCrafts?.map((craft) => (
                  <li key={craft} className="flex items-center gap-2 text-ink">
                    <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                    {craft}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {level === "heritage" && selectedDistrict && (
        <div className="slide-up">
          <HeritageDetailCard district={selectedDistrict} stateName={selectedState?.name || ""} />
        </div>
      )}
    </div>
  );
}

function CardRow({
  children,
  scrollRef,
  onScroll,
}: {
  children: React.ReactNode;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  onScroll: (dir: number) => void;
}) {
  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="scroll-snap-x flex gap-6 overflow-x-auto pb-4"
      >
        {children}
      </div>
      <button
        onClick={() => onScroll(-1)}
        aria-label="Scroll left"
        className="absolute -left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ink/15 bg-parchment shadow-md transition-colors hover:bg-parchment-dark lg:flex"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        onClick={() => onScroll(1)}
        aria-label="Scroll right"
        className="absolute -right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ink/15 bg-parchment shadow-md transition-colors hover:bg-parchment-dark lg:flex"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}

function StateCard({ state, index, onClick }: { state: State; index: number; onClick: () => void }) {
  const offset = index % 2 === 0 ? "translate-y-0" : "translate-y-6";
  return (
    <button
      onClick={onClick}
      className={`scroll-snap-item floating-card ${offset} flex-shrink-0 w-72 text-left rounded-2xl border border-ink/10 bg-parchment-light overflow-hidden`}
    >
      <div className="relative h-44 overflow-hidden bg-indigo/10">
        <StateArtwork stateId={state.id} />
        {!state.documented && (
          <span className="absolute top-3 right-3 rounded-full bg-gold/90 px-2.5 py-1 text-xs font-medium text-ink">
            Coming Soon
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-serif text-xl font-semibold text-ink">{state.name}</h3>
        <p className="mt-1 text-sm text-ink-light">{state.tagline}</p>
        <p className="mt-3 text-xs font-medium text-terracotta-dark">
          {state.documented
            ? `${state.districts?.length ?? 0} districts documented`
            : `${state.knownCrafts?.length ?? 0} crafts identified`}
        </p>
      </div>
    </button>
  );
}

function DistrictCard({ district, index, onClick }: { district: District; index: number; onClick: () => void }) {
  const offset = index % 2 === 0 ? "translate-y-0" : "translate-y-6";
  return (
    <button
      onClick={onClick}
      className={`scroll-snap-item floating-card ${offset} flex-shrink-0 w-72 text-left rounded-2xl border border-ink/10 bg-parchment-light overflow-hidden`}
    >
      <div className="relative h-44 overflow-hidden bg-terracotta/10">
        <DistrictArtwork craft={district.craft} />
        <span className="absolute top-3 right-3 rounded-full bg-error/90 px-2.5 py-1 text-xs font-medium text-cream">
          {district.artisansLeft} artisans left
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-xl font-semibold text-ink">{district.name}</h3>
        <p className="mt-1 text-sm font-medium text-terracotta-dark">{district.craft}</p>
        <p className="mt-2 text-xs text-ink-light">{district.area}</p>
      </div>
    </button>
  );
}

function HeritageDetailCard({ district, stateName }: { district: District; stateName: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-parchment-light">
      <div className="grid gap-0 md:grid-cols-2">
        <div className="relative h-64 overflow-hidden bg-indigo/10 md:h-auto">
          <DistrictArtwork craft={district.craft} />
        </div>
        <div className="p-8">
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-error/15 px-3 py-1 text-xs font-medium text-error">
              {district.artisansLeft} artisans remaining
            </span>
            <span className="text-sm text-ink-light">{stateName}</span>
          </div>
          <h3 className="font-serif text-3xl font-semibold text-ink">{district.name}</h3>
          <p className="mt-1 text-lg text-terracotta-dark">{district.craft}</p>
          <p className="mt-1 text-sm font-medium text-ink-light">
            Area: <span className="text-ink">{district.area}</span>
          </p>
          <p className="mt-4 text-ink leading-relaxed">{district.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {district.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-indigo/20 bg-indigo/5 px-3 py-1 text-xs font-medium text-indigo"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StateArtwork({ stateId }: { stateId: string }) {
  const colors: Record<string, string> = {
    rajasthan: "#c65d3b",
    gujarat: "#3a4a6b",
    "west-bengal": "#5a7a4a",
    "tamil-nadu": "#c9a44c",
    odisha: "#a8472a",
    "uttar-pradesh": "#5a6b8f",
    karnataka: "#a08034",
  };
  const bg = colors[stateId] || "#c65d3b";
  return (
    <div className="flex h-full w-full items-center justify-center" style={{ background: `linear-gradient(135deg, ${bg}15, ${bg}30)` }}>
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="40" r="28" fill={bg} opacity="0.15" />
        <circle cx="40" cy="40" r="18" fill={bg} opacity="0.25" />
        <circle cx="40" cy="40" r="8" fill={bg} opacity="0.4" />
      </svg>
    </div>
  );
}

function DistrictArtwork({ craft }: { craft: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-terracotta/10 to-indigo/10">
      <div className="text-center">
        <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-terracotta/15">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c65d3b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <p className="text-xs font-medium text-ink-light">{craft}</p>
      </div>
    </div>
  );
}
