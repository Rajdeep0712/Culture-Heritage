"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { profile, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !profile) {
      router.push("/login");
    }
  }, [loading, profile, router]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-ink-light">Loading…</p>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-serif text-4xl font-semibold text-ink">Your Profile</h1>
      <div className="mt-8 space-y-4 rounded-2xl border border-ink/10 bg-parchment-light p-8">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-ink-light">Name</span>
          <span className="text-ink">{profile.full_name || "Not set"}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-ink-light">Email</span>
          <span className="text-ink">{profile.email}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-ink-light">Role</span>
          <span className="rounded-full bg-terracotta/15 px-3 py-1 text-sm font-medium capitalize text-terracotta-dark">
            {profile.role}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-ink-light">Language</span>
          <span className="text-ink">{profile.language || "English"}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-ink-light">Location</span>
          <span className="text-ink">{profile.location || "Not set"}</span>
        </div>
      </div>
      <button
        onClick={async () => {
          await signOut();
          router.push("/");
        }}
        className="mt-6 w-full rounded-full border border-ink/15 px-6 py-3 font-medium text-ink transition-colors hover:border-terracotta hover:text-terracotta"
      >
        Sign Out
      </button>
    </div>
  );
}
