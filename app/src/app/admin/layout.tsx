"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { isAdmin } from "@/lib/auth";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user || !isAdmin(session.user.email)) {
        router.push("/login");
        return;
      }
      
      setUser(session.user);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_OUT" || !session?.user || !isAdmin(session.user.email)) {
          router.push("/login");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-zinc-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 py-3 sm:py-4">
        <nav className="max-w-6xl mx-auto">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
            <div className="flex items-center gap-4 sm:gap-6">
              <h1 className="text-white font-serif text-base sm:text-lg">
                Admin
              </h1>
              <div className="hidden sm:flex items-center gap-1">
                <Link
                  href="/admin"
                  className="px-4 py-2 rounded-full text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all"
                >
                  Projects
                </Link>
                <Link
                  href="/"
                  target="_blank"
                  className="px-4 py-2 rounded-full text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all"
                >
                  View Site
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="hidden md:inline text-sm text-zinc-400 truncate max-w-[150px]">
                {user?.email}
              </span>
              <button
                onClick={handleSignOut}
                className="hidden sm:block px-4 py-2 rounded-full text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all"
              >
                Sign out
              </button>
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden mt-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-2 shadow-lg shadow-black/5">
              <div className="px-4 py-2 text-xs text-zinc-400 truncate border-b border-white/10 mb-1">
                {user?.email}
              </div>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all"
              >
                Projects
              </Link>
              <Link
                href="/"
                target="_blank"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all"
              >
                View Site
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSignOut();
                }}
                className="w-full text-left px-4 py-3 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
              >
                Sign out
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8">
        {children}
      </main>
    </div>
  );
}
