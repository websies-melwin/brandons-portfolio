"use client";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section - Full width with parallax-style image */}
      <section className="relative h-[70vh] sm:h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://picsum.photos/seed/brandon-hero/1600/1000"
            alt="Brandon"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
        
        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 md:p-16">
          <div className="max-w-6xl mx-auto">
            <p className="text-white/60 text-xs sm:text-sm uppercase tracking-widest mb-3">About Me</p>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif text-white mb-4">
              Hi, I&apos;m <span className="italic">Brandon</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl">
              Creative professional with a passion for visual storytelling
            </p>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Large Quote */}
            <div className="lg:sticky lg:top-32">
              <div className="relative">
                <span className="absolute -top-8 -left-4 text-8xl sm:text-9xl font-serif text-white/10">&ldquo;</span>
                <blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif text-white leading-relaxed pl-4 border-l-2 border-white/20">
                  I believe every image tells a story, and my job is to make that story unforgettable.
                </blockquote>
              </div>
            </div>

            {/* Bio Text */}
            <div className="space-y-6 text-base sm:text-lg text-zinc-400 leading-relaxed">
              <p>
                I&apos;m a creative professional with a passion for visual storytelling. 
                My work spans photography, design, and digital media, always with an 
                emphasis on creating meaningful, impactful imagery.
              </p>
              <p>
                Based in Ho Chi Minh, Vietnam, I&apos;ve spent years honing my craft and developing 
                a unique visual style that blends modern aesthetics with timeless elegance.
              </p>
              <p>
                When I&apos;m not behind the camera or designing, you&apos;ll find me exploring 
                new places, seeking inspiration in architecture, nature, and the everyday 
                moments that make life beautiful.
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
                <div>
                  <p className="text-3xl sm:text-4xl font-serif text-white">5+</p>
                  <p className="text-sm text-zinc-500">Years Experience</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-serif text-white">100+</p>
                  <p className="text-sm text-zinc-500">Projects Done</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-serif text-white">50+</p>
                  <p className="text-sm text-zinc-500">Happy Clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Bento Grid */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 sm:mb-14">
            <div>
              <p className="text-zinc-500 text-xs sm:text-sm uppercase tracking-widest mb-2">Expertise</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white">
                What I <span className="italic">Bring</span>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Photography - Featured */}
            <div className="md:col-span-2 lg:col-span-1 lg:row-span-2 group relative rounded-2xl sm:rounded-3xl overflow-hidden">
              <img 
                src="https://picsum.photos/seed/skill-photo/600/800" 
                alt="Photography"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end min-h-[300px] lg:min-h-full">
                <div className="w-12 h-12 rounded-full backdrop-blur-xl bg-white/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-white mb-2">Photography</h3>
                <p className="text-white/70 text-sm sm:text-base">Capturing moments and stories through the lens, from portraits to landscapes and everything in between.</p>
              </div>
            </div>

            {/* Visual Design */}
            <div className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-white mb-3">Visual Design</h3>
              <p className="text-zinc-400 text-sm sm:text-base">Creating stunning visuals for brands, from logos to complete identity systems.</p>
            </div>

            {/* Video Production */}
            <div className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-white mb-3">Video Production</h3>
              <p className="text-zinc-400 text-sm sm:text-base">Bringing stories to life through motion, from concept to final cut.</p>
            </div>

            {/* Creative Direction */}
            <div className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-white mb-3">Creative Direction</h3>
              <p className="text-zinc-400 text-sm sm:text-base">Guiding projects from initial concept to polished final delivery.</p>
            </div>

            {/* Brand Strategy */}
            <div className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-white mb-3">Brand Strategy</h3>
              <p className="text-zinc-400 text-sm sm:text-base">Developing cohesive brand narratives that resonate with audiences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 sm:mb-14">
            <p className="text-zinc-500 text-xs sm:text-sm uppercase tracking-widest mb-2">Journey</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white">
              My <span className="italic">Experience</span>
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 transform md:-translate-x-1/2" />

            {/* Timeline items */}
            <div className="space-y-12">
              {[
                {
                  year: "2023 - Present",
                  title: "Freelance Creative",
                  description: "Working with clients worldwide on photography and design projects. Collaborating with brands to create impactful visual content.",
                  align: "right"
                },
                {
                  year: "2021 - 2023",
                  title: "Senior Designer",
                  description: "Led visual design initiatives for major brand campaigns. Managed a team of junior designers and established design systems.",
                  align: "left"
                },
                {
                  year: "2019 - 2021",
                  title: "Junior Photographer",
                  description: "Started my professional journey capturing events and portraits. Built a strong foundation in composition and lighting.",
                  align: "right"
                },
              ].map((item, index) => (
                <div key={index} className={`relative flex flex-col md:flex-row gap-8 ${item.align === 'left' ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-white rounded-full transform md:-translate-x-1/2 mt-2" />
                  
                  {/* Content */}
                  <div className={`md:w-1/2 pl-8 md:pl-0 ${item.align === 'right' ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <span className="inline-block text-xs sm:text-sm text-zinc-500 font-mono mb-2 backdrop-blur-xl bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                      {item.year}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif text-white mb-2">{item.title}</h3>
                    <p className="text-zinc-400 text-sm sm:text-base">{item.description}</p>
                  </div>
                  
                  {/* Spacer for other side */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl">
            <img 
              src="https://picsum.photos/seed/cta-about/1200/600" 
              alt="Let's work together"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div className="relative p-8 sm:p-12 md:p-16 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-4">
                Let&apos;s Work <span className="italic">Together</span>
              </h2>
              <p className="text-base sm:text-lg text-white/80 mb-8 max-w-xl mx-auto">
                Have a project in mind? I&apos;d love to hear about it. Let&apos;s create something amazing.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-zinc-100 hover:scale-105 transition-all duration-300"
              >
                Get in Touch
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
