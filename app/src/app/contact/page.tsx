"use client";

import FadeIn from "@/components/FadeIn";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full" />
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <FadeIn>
            <p className="text-zinc-500 text-xs sm:text-sm uppercase tracking-widest mb-3">Contact</p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-white mb-6">
              Let&apos;s <span className="italic">Connect</span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl">
              Have a project in mind or just want to say hello? I&apos;d love to hear from you.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Content Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left - Quote */}
            <div className="lg:sticky lg:top-32">
              <FadeIn>
                <div className="relative">
                  <span className="absolute -top-8 -left-4 text-8xl sm:text-9xl font-serif text-white/10">&ldquo;</span>
                  <blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif text-white leading-relaxed pl-4 border-l-2 border-white/20">
                    Great work begins with great conversations. I&apos;m excited to hear your story.
                  </blockquote>
                </div>
                
                {/* Availability Badge */}
                <div className="mt-10 flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <span className="text-zinc-400 text-sm">Available for new projects</span>
                </div>
              </FadeIn>
            </div>

            {/* Right - Contact Info */}
            <FadeIn delay={150}>
              <div className="space-y-8">
                <div className="space-y-6 text-base sm:text-lg text-zinc-400 leading-relaxed">
                  <p>
                    Whether it&apos;s a fully formed idea or just the beginning of a thought, 
                    don&apos;t hesitate to reach out. I believe in building meaningful connections 
                    with the people I work with.
                  </p>
                  <p>
                    Every project is a collaboration, and I&apos;m here to listen, understand, 
                    and bring your vision to life. Let&apos;s explore the possibilities together.
                  </p>
                </div>

                {/* Contact Links */}
                <div className="pt-8 border-t border-white/10 space-y-4">
                  {/* Email */}
                  <a
                    href="mailto:brandon.bui04@gmail.com"
                    className="group flex items-center gap-5 p-4 -mx-4 rounded-2xl hover:bg-white/5 transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Email</p>
                      <p className="text-white text-lg group-hover:translate-x-2 transition-transform duration-300">brandon.bui04@gmail.com</p>
                    </div>
                    <svg className="w-5 h-5 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/iamm__brandon/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-5 p-4 -mx-4 rounded-2xl hover:bg-white/5 transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Instagram</p>
                      <p className="text-white text-lg group-hover:translate-x-2 transition-transform duration-300">@iamm__brandon</p>
                    </div>
                    <svg className="w-5 h-5 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                {/* Response Time */}
                <div className="pt-8 border-t border-white/10">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-3xl sm:text-4xl font-serif text-white">24-48h</p>
                      <p className="text-sm text-zinc-500">Response Time</p>
                    </div>
                    <div>
                      <p className="text-3xl sm:text-4xl font-serif text-white">Global</p>
                      <p className="text-sm text-zinc-500">Remote Friendly</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
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
              <a href="https://www.instagram.com/iamm__brandon/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors text-xs sm:text-sm">Instagram</a>
              <a href="mailto:brandon.bui04@gmail.com" className="text-zinc-400 hover:text-white transition-colors text-xs sm:text-sm">Email</a>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-500 text-xs sm:text-sm">Made by <a href="https://www.websies.co" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">Websies</a></span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
