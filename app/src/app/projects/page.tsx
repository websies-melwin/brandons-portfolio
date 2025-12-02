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
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");

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

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(p => p.media_type === filter);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-32 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-end">
            <div>
              <p className="text-zinc-500 text-xs sm:text-sm uppercase tracking-widest mb-3">
                Portfolio
              </p>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-white mb-6">
                All <span className="italic">Projects</span>
              </h1>
              <p className="text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed">
                A curated collection of my creative work spanning photography, design, 
                videography, and visual storytelling. Each project represents a unique 
                story waiting to be discovered.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 lg:justify-end">
              {[
                { value: "all", label: "All Work" },
                { value: "image", label: "Photography" },
                { value: "video", label: "Video" },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setFilter(tab.value as "all" | "image" | "video")}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    filter === tab.value
                      ? "bg-white text-black"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-12 sm:mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-wrap gap-8 sm:gap-16">
              <div>
                <p className="text-3xl sm:text-4xl font-serif text-white">{projects.length}</p>
                <p className="text-sm text-zinc-500">Total Projects</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-serif text-white">
                  {projects.filter(p => p.media_type === "image").length}
                </p>
                <p className="text-sm text-zinc-500">Photography</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-serif text-white">
                  {projects.filter(p => p.media_type === "video").length}
                </p>
                <p className="text-sm text-zinc-500">Video Projects</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 sm:px-6 pb-20 sm:pb-32">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className={`rounded-2xl sm:rounded-3xl bg-white/5 animate-pulse ${
                    i === 1 ? "md:col-span-2 aspect-[21/9]" : "aspect-[4/3]"
                  }`}
                />
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20 sm:py-32">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 sm:p-16 max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-white mb-2">No projects yet</h3>
                <p className="text-zinc-400 text-sm sm:text-base">
                  Check back soon for new creative work
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project, index) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer block ${
                    index === 0 ? "md:col-span-2" : ""
                  }`}
                >
                  {/* Image/Video Container */}
                  <div className={index === 0 ? "aspect-[21/9]" : "aspect-[4/3]"}>
                    {project.media_type === "image" ? (
                      <img
                        src={project.media_url}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : project.thumbnail_url ? (
                      <img
                        src={project.thumbnail_url}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
                          <svg
                            className="w-10 h-10 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        {/* Type Badge */}
                        <span className="inline-block backdrop-blur-xl bg-white/10 border border-white/20 px-3 py-1 rounded-full text-white/80 text-xs mb-3 uppercase tracking-wider">
                          {project.media_type === "video" ? "Video" : "Photography"}
                        </span>
                        
                        {/* Title */}
                        <h3 className={`text-white font-serif group-hover:translate-x-2 transition-transform duration-300 ${
                          index === 0 ? "text-2xl sm:text-3xl md:text-4xl" : "text-xl sm:text-2xl"
                        }`}>
                          {project.title}
                        </h3>
                        
                        {/* Description */}
                        {project.description && (
                          <p className={`text-white/70 mt-2 line-clamp-2 ${
                            index === 0 ? "text-sm sm:text-base max-w-2xl" : "text-sm"
                          }`}>
                            {project.description}
                          </p>
                        )}

                        {/* Additional Media Count */}
                        {project.additional_media && project.additional_media.length > 0 && (
                          <p className="text-white/50 text-xs mt-3">
                            +{project.additional_media.length} more in this project
                          </p>
                        )}
                      </div>

                      {/* Arrow Button */}
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0 translate-x-4 group-hover:translate-x-0">
                        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 pb-20 sm:pb-32">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full" />
            </div>
            <div className="relative p-8 sm:p-12 md:p-16 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-4">
                Have a project in <span className="italic">mind</span>?
              </h2>
              <p className="text-base sm:text-lg text-zinc-400 mb-8 max-w-xl mx-auto">
                Let&apos;s collaborate and bring your vision to life. I&apos;m always excited to work on new creative challenges.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-zinc-100 hover:scale-105 transition-all duration-300"
              >
                Start a Project
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 pb-8 sm:pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-8 py-5 sm:py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-zinc-400 text-xs sm:text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Brandon. All rights reserved.
            </p>
            <div className="flex items-center gap-4 sm:gap-6">
              <a
                href="https://www.instagram.com/iamm__brandon/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors text-xs sm:text-sm"
              >
                Instagram
              </a>
              <a
                href="mailto:brandon.bui04@gmail.com"
                className="text-zinc-400 hover:text-white transition-colors text-xs sm:text-sm"
              >
                Email
              </a>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-500 text-xs sm:text-sm">Made by <a href="https://www.websies.co" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">Websies</a></span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
