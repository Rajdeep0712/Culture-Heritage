"use client";

import { useState } from "react";
import { states } from "@/lib/heritage-data";

export default function MarketplacePage() {
  const [search, setSearch] = useState("");

  const allDistricts = states
    .filter((s) => s.documented && s.districts)
    .flatMap((s) =>
      s.districts!.map((d) => ({
        ...d,
        stateName: s.name,
        stateId: s.id,
      }))
    );

  const filtered = search
    ? allDistricts.filter(
        (d) =>
          d.name.toLowerCase().includes(search.toLowerCase()) ||
          d.craft.toLowerCase().includes(search.toLowerCase()) ||
          d.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      )
    : allDistricts;

  return (
    <div className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-serif text-4xl font-semibold text-ink">Marketplace</h1>
        <p className="mt-2 text-ink-light">Discover crafts from every corner of India</p>

        <div className="mt-8 relative max-w-md">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-light"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by craft, district, or tag…"
            className="w-full rounded-full border border-ink/15 bg-parchment-light py-3 pl-12 pr-4 text-ink outline-none transition-colors focus:border-terracotta"
          />
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((district) => (
            <div
              key={`${district.stateId}-${district.id}`}
              className="floating-card overflow-hidden rounded-2xl border border-ink/10 bg-parchment-light"
            >
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-terracotta/15 to-indigo/15">
                <div className="flex h-full w-full items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-terracotta/15">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c65d3b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                      </svg>
                    </div>
                  </div>
                </div>
                <span className="absolute top-3 right-3 rounded-full bg-error/90 px-2.5 py-1 text-xs font-medium text-cream">
                  {district.artisansLeft} left
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs font-medium text-indigo">{district.stateName}</p>
                <h3 className="mt-1 font-serif text-xl font-semibold text-ink">{district.name}</h3>
                <p className="mt-1 text-sm font-medium text-terracotta-dark">{district.craft}</p>
                <p className="mt-2 text-xs text-ink-light">{district.area}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {district.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-indigo/15 bg-indigo/5 px-2.5 py-0.5 text-xs text-indigo"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="mt-4 w-full rounded-full bg-terracotta px-4 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-terracotta-dark">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-ink-light">No crafts found for "{search}". Try another search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
