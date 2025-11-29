"use client";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-24 sm:pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center mb-16 sm:mb-24">
          {/* Photo */}
          <div className="relative aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden order-1 md:order-1">
            <img
              src="https://picsum.photos/seed/brandon-about/800/1000"
              alt="Brandon"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Intro Text */}
          <div className="order-2 md:order-2">
            <p className="text-zinc-500 text-xs sm:text-sm uppercase tracking-widest mb-2 sm:mb-3">
              About Me
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white mb-6">
              Hi, I&apos;m <span className="italic">Brandon</span>
            </h1>
            <div className="space-y-4 text-base sm:text-lg text-zinc-400 leading-relaxed">
              <p>
                I&apos;m a creative professional with a passion for visual storytelling. 
                My work spans photography, design, and digital media, always with an 
                emphasis on creating meaningful, impactful imagery.
              </p>
              <p>
                Based in [Location], I&apos;ve spent years honing my craft and developing 
                a unique visual style that blends modern aesthetics with timeless elegance.
              </p>
            </div>
          </div>
        </div>

        {/* Skills & Expertise */}
        <section className="mb-16 sm:mb-24">
          <h2 className="text-2xl sm:text-3xl font-serif text-white mb-8 sm:mb-12">
            What I Do
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: "Photography",
                description: "Capturing moments and stories through the lens, from portraits to landscapes.",
              },
              {
                title: "Visual Design",
                description: "Creating stunning visuals for brands, from logos to complete identity systems.",
              },
              {
                title: "Video Production",
                description: "Bringing stories to life through motion, from concept to final cut.",
              },
            ].map((skill, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8"
              >
                <h3 className="text-lg sm:text-xl font-medium text-white mb-2">
                  {skill.title}
                </h3>
                <p className="text-sm sm:text-base text-zinc-400">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Experience / Timeline */}
        <section className="mb-16 sm:mb-24">
          <h2 className="text-2xl sm:text-3xl font-serif text-white mb-8 sm:mb-12">
            Experience
          </h2>
          <div className="space-y-6">
            {[
              {
                year: "2023 - Present",
                title: "Freelance Creative",
                description: "Working with clients worldwide on photography and design projects.",
              },
              {
                year: "2021 - 2023",
                title: "Senior Designer",
                description: "Led visual design initiatives for major brand campaigns.",
              },
              {
                year: "2019 - 2021",
                title: "Junior Photographer",
                description: "Started my professional journey capturing events and portraits.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-4 sm:gap-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-5 sm:p-6"
              >
                <div className="sm:w-32 flex-shrink-0">
                  <span className="text-xs sm:text-sm text-zinc-500 font-mono">
                    {item.year}
                  </span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-400">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-serif text-white mb-4">
              Let&apos;s Work Together
            </h2>
            <p className="text-base sm:text-lg text-zinc-400 mb-6 max-w-xl mx-auto">
              Have a project in mind? I&apos;d love to hear about it.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-zinc-200 active:bg-zinc-300 transition-colors text-sm sm:text-base"
            >
              Get in Touch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-24 sm:mt-32 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-8 py-5 sm:py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-zinc-400 text-xs sm:text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Brandon. All rights reserved.
            </p>
            <div className="flex items-center gap-4 sm:gap-6">
              <a href="#" className="text-zinc-400 hover:text-white transition-colors text-xs sm:text-sm">Instagram</a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors text-xs sm:text-sm">LinkedIn</a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors text-xs sm:text-sm">Email</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
