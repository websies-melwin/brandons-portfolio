"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

interface MediaItem {
  url: string;
  type: "image" | "video";
}

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  media_url: string;
  media_type: "image" | "video";
  thumbnail_url: string | null;
  additional_media: MediaItem[] | null;
  display_order: number;
  created_at: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("portfolio_projects")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Error fetching projects:", error);
      } else {
        setProjects(data || []);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white pt-24 sm:pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <p className="text-zinc-500 text-xs sm:text-sm uppercase tracking-widest mb-2 sm:mb-3">
            Portfolio
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white">
            All Projects
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl">
            A collection of my creative work spanning photography, design, and visual storytelling.
          </p>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-xl sm:rounded-2xl bg-white/5 animate-pulse"
              />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 sm:py-24">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-12 max-w-md mx-auto">
              <p className="text-zinc-400 text-lg">No projects yet</p>
              <p className="text-zinc-500 text-sm mt-2">
                Check back soon for new work
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer block"
              >
                {/* Thumbnail */}
                {project.media_type === "image" ? (
                  <img
                    src={project.media_url}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : project.thumbnail_url ? (
                  <img
                    src={project.thumbnail_url}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-white/5 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-zinc-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />

                {/* Info Card */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg sm:rounded-xl p-3 sm:p-4 md:translate-y-4 md:group-hover:translate-y-0 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-white font-medium text-base sm:text-lg truncate">
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="text-zinc-300 text-xs sm:text-sm mt-1 line-clamp-2">
                      {project.description}
                    </p>
                  )}
                  {project.additional_media && project.additional_media.length > 0 && (
                    <p className="text-zinc-400 text-xs mt-2">
                      +{project.additional_media.length} more media
                    </p>
                  )}
                </div>

                {/* Media type badge */}
                {project.media_type === "video" && (
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    <span className="px-2 py-1 text-xs backdrop-blur-xl bg-black/50 text-white rounded-full">
                      Video
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-24 sm:mt-32 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-8 py-5 sm:py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-zinc-400 text-xs sm:text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Brandon. All rights reserved.
            </p>
            <div className="flex items-center gap-4 sm:gap-6">
              <a
                href="#"
                className="text-zinc-400 hover:text-white active:text-white transition-colors text-xs sm:text-sm"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-zinc-400 hover:text-white active:text-white transition-colors text-xs sm:text-sm"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-zinc-400 hover:text-white active:text-white transition-colors text-xs sm:text-sm"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
