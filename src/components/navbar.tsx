"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useVoice } from "@/lib/voice-context";

export function Navbar() {
  const { profile, signOut } = useAuth();
  const { voiceOn, toggleVoice } = useVoice();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const isArtisan = profile?.role === "artisan";
  const isBuyer = profile?.role === "buyer";

  const links = [
    { href: "/", label: "Home" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/story-map", label: "Story Map" },
    { href: "/learn", label: "Learn" },
  ];

  if (isArtisan) {
    links.push({ href: "/dashboard", label: "Dashboard" });
  }
  if (isBuyer || isArtisan) {
    links.push({ href: "/profile", label: "Profile" });
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-ink/10 bg-parchment/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-2xl font-semibold text-terracotta-dark">Sutr</span>
          <span className="hidden text-sm text-ink-light sm:inline">Living Heritage</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-terracotta-dark"
                  : "text-ink-light hover:text-terracotta"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleVoice}
            aria-label={voiceOn ? "Turn off voice guide" : "Turn on voice guide"}
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all ${
              voiceOn
                ? "border-gold bg-gold/20 text-terracotta-dark"
                : "border-ink/20 text-ink-light hover:border-terracotta hover:text-terracotta"
            }`}
          >
            {voiceOn ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="1" y1="1" x2="23" y2="23" />
                <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
                <line x1="12" y1="19" x2="12" y2="23" />
              </svg>
            )}
          </button>

          {profile ? (
            <button
              onClick={handleSignOut}
              className="hidden rounded-full bg-terracotta px-5 py-2 text-sm font-medium text-cream transition-colors hover:bg-terracotta-dark sm:block"
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/login"
              className="hidden rounded-full bg-terracotta px-5 py-2 text-sm font-medium text-cream transition-colors hover:bg-terracotta-dark sm:block"
            >
              Sign In
            </Link>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink-light md:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-ink/10 bg-parchment md:hidden">
          <div className="flex flex-col gap-1 px-4 py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm font-medium ${
                  pathname === link.href
                    ? "bg-terracotta/10 text-terracotta-dark"
                    : "text-ink-light"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {profile ? (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleSignOut();
                }}
                className="rounded-lg bg-terracotta px-3 py-2 text-left text-sm font-medium text-cream"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg bg-terracotta px-3 py-2 text-sm font-medium text-cream"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
