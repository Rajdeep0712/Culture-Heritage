"use client";

import { useState } from "react";
import { states, type State, type District } from "@/lib/heritage-data";

interface PinPosition {
  x: number;
  y: number;
}

const statePins: Record<string, PinPosition> = {
  rajasthan: { x: 28, y: 25 },
  gujarat: { x: 18, y: 45 },
  "west-bengal": { x: 65, y: 40 },
  "tamil-nadu": { x: 45, y: 82 },
  odisha: { x: 55, y: 50 },
  "uttar-pradesh": { x: 42, y: 28 },
  karnataka: { x: 32, y: 72 },
};

const districtPins: Record<string, PinPosition> = {
  jaipur: { x: 35, y: 30 },
  jodhpur: { x: 22, y: 45 },
  barmer: { x: 15, y: 55 },
  kutch: { x: 20, y: 50 },
  patan: { x: 35, y: 40 },
  surendranagar: { x: 30, y: 55 },
  murshidabad: { x: 55, y: 25 },
  nadia: { x: 60, y: 35 },
  kancheepuram: { x: 40, y: 70 },
  tanjore: { x: 45, y: 80 },
};

export function IndiaMap() {
  const [zoomLevel, setZoomLevel] = useState<1 | 2>(1);
  const [selectedState, setSelectedState] = useState<State | null>(null);

  const handleStateClick = (state: State) => {
    setSelectedState(state);
    setZoomLevel(2);
  };

  const handleZoomOut = () => {
    setZoomLevel(1);
    setSelectedState(null);
  };

  return (
    <div className="relative mx-auto max-w-4xl">
      {zoomLevel === 1 && (
        <div className="map-zoom-in">
          <div className="mb-4 text-center">
            <h2 className="font-serif text-3xl font-semibold text-ink">India — Story Map</h2>
            <p className="mt-1 text-sm text-ink-light">Tap a state pin to zoom into its districts</p>
          </div>
          <IndiaOutline>
            {states.map((state) => {
              const pos = statePins[state.id];
              if (!pos) return null;
              return (
                <StatePin
                  key={state.id}
                  pos={pos}
                  state={state}
                  onClick={() => handleStateClick(state)}
                />
              );
            })}
          </IndiaOutline>
        </div>
      )}

      {zoomLevel === 2 && selectedState && (
        <div className="map-zoom-in">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-3xl font-semibold text-ink">{selectedState.name}</h2>
              <p className="mt-1 text-sm text-ink-light">{selectedState.tagline}</p>
            </div>
            <button
              onClick={handleZoomOut}
              className="flex items-center gap-2 rounded-full border border-ink/15 bg-parchment px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-terracotta hover:text-terracotta"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Zoom out to India
            </button>
          </div>

          {selectedState.documented && selectedState.districts ? (
            <IndiaOutline stateName={selectedState.name}>
              {selectedState.districts.map((district) => {
                const pos = districtPins[district.id];
                if (!pos) return null;
                return (
                  <DistrictPin
                    key={district.id}
                    pos={pos}
                    district={district}
                  />
                );
              })}
            </IndiaOutline>
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
                We're working with artisans across {selectedState.name} to document their crafts. Known crafts and districts:
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {selectedState.knownCrafts?.map((craft) => (
                  <li key={craft} className="flex items-center gap-2 rounded-lg border border-ink/10 bg-parchment px-3 py-2 text-sm text-ink">
                    <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                    {craft}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function IndiaOutline({ children, stateName }: { children?: React.ReactNode; stateName?: string }) {
  return (
    <div className="relative mx-auto aspect-[3/4] max-w-2xl rounded-2xl border border-ink/10 bg-parchment-light p-4">
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M 35 5
             L 50 8
             L 60 5
             L 68 12
             L 72 20
             L 70 28
             L 65 32
             L 68 40
             L 72 48
             L 68 55
             L 60 62
             L 55 70
             L 50 78
             L 42 85
             L 38 92
             L 35 88
             L 30 80
             L 25 72
             L 20 65
             L 15 58
             L 12 50
             L 15 42
             L 18 35
             L 15 28
             L 20 22
             L 25 15
             L 30 10
             Z"
          fill="rgba(58, 74, 107, 0.06)"
          stroke="rgba(58, 74, 107, 0.3)"
          strokeWidth="0.4"
          strokeDasharray="1 0.5"
        />
        {stateName && (
          <text
            x="50"
            y="50"
            textAnchor="middle"
            className="font-serif"
            fill="rgba(42, 31, 21, 0.08)"
            fontSize="8"
            fontWeight="600"
          >
            {stateName}
          </text>
        )}
      </svg>
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}

function StatePin({ pos, state, onClick }: { pos: PinPosition; state: State; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="absolute -translate-x-1/2 -translate-y-full"
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
    >
      <div className="relative flex flex-col items-center">
        {hovered && (
          <div className="absolute -top-8 whitespace-nowrap rounded-lg bg-indigo-dark px-2.5 py-1 text-xs font-medium text-cream shadow-lg">
            {state.name}
          </div>
        )}
        <svg
          width="28"
          height="36"
          viewBox="0 0 28 36"
          fill="none"
          className="drop-shadow-md transition-transform"
          style={{ transform: hovered ? "scale(1.2)" : "scale(1)" }}
        >
          <path
            d="M14 0C6.27 0 0 6.27 0 14c0 10 14 22 14 22s14-12 14-22C28 6.27 21.73 0 14 0z"
            fill={state.documented ? "#c65d3b" : "#c9a44c"}
          />
          <circle cx="14" cy="14" r="5" fill="#faf4e6" />
          {!state.documented && (
            <circle cx="14" cy="14" r="2.5" fill="#c9a44c" />
          )}
        </svg>
        {!state.documented && (
          <span className="mt-1 rounded-full bg-gold/90 px-1.5 py-0.5 text-[10px] font-medium text-ink">
            Soon
          </span>
        )}
      </div>
    </button>
  );
}

function DistrictPin({ pos, district }: { pos: PinPosition; district: District }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-full"
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
    >
      <div className="relative flex flex-col items-center">
        {hovered && (
          <div className="absolute -top-10 w-40 rounded-lg bg-terracotta-dark px-2.5 py-1.5 text-center text-xs text-cream shadow-lg">
            <p className="font-medium">{district.name}</p>
            <p className="text-cream/80">{district.craft}</p>
          </div>
        )}
        <button
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="cursor-pointer"
        >
          <svg
            width="22"
            height="30"
            viewBox="0 0 28 36"
            fill="none"
            className="drop-shadow-md transition-transform"
            style={{ transform: hovered ? "scale(1.2)" : "scale(1)" }}
          >
            <path
              d="M14 0C6.27 0 0 6.27 0 14c0 10 14 22 14 22s14-12 14-22C28 6.27 21.73 0 14 0z"
              fill="#3a4a6b"
            />
            <circle cx="14" cy="14" r="4" fill="#faf4e6" />
          </svg>
        </button>
        <span className="mt-0.5 max-w-[80px] text-center text-[10px] font-medium text-ink">
          {district.name}
        </span>
      </div>
    </div>
  );
}
