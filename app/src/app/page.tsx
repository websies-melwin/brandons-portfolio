'use client';

import { useRef, useState, useEffect } from 'react';
import InfiniteGallery from '@/components/InfiniteGallery';

export default function Home() {
	const [galleryComplete, setGalleryComplete] = useState(false);
	const aboutSectionRef = useRef<HTMLDivElement>(null);

	const sampleImages = [
		{ src: 'https://picsum.photos/seed/1/800/600', alt: 'Project 1' },
		{ src: 'https://picsum.photos/seed/2/800/600', alt: 'Project 2' },
		{ src: 'https://picsum.photos/seed/landscape/800/600', alt: 'Project 3' },
		{ src: 'https://picsum.photos/seed/4/800/600', alt: 'Project 4' },
		{ src: 'https://picsum.photos/seed/5/800/600', alt: 'Project 5' },
		{ src: 'https://picsum.photos/seed/6/800/600', alt: 'Project 6' },
		{ src: 'https://picsum.photos/seed/7/800/600', alt: 'Project 7' },
		{ src: 'https://picsum.photos/seed/8/800/600', alt: 'Project 8' },
	];

	// Scroll to top on page load/refresh
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// Lock body scroll while gallery is active
	useEffect(() => {
		if (!galleryComplete) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [galleryComplete]);

	const handleScrollComplete = () => {
		setGalleryComplete(true);
		setTimeout(() => {
			aboutSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
		}, 50);
	};

	return (
		<main className="min-h-screen bg-black text-white">
			{/* 3D Gallery Hero Section - Fixed position when locked */}
			<section className="relative h-screen bg-black">
				<div className={galleryComplete ? 'relative h-screen bg-black' : 'fixed inset-0 z-10 bg-black'}>
					<InfiniteGallery
						images={sampleImages}
						speed={1.2}
						zSpacing={3}
						visibleCount={12}
						falloff={{ near: 0.8, far: 14 }}
						className="h-screen w-full"
						onScrollComplete={handleScrollComplete}
						lockScroll={!galleryComplete}
					/>
					<div className="absolute inset-0 pointer-events-none flex items-center justify-center text-center px-3 mix-blend-exclusion">
						<h1 className="font-serif text-4xl md:text-7xl tracking-tight text-white">
							<span className="italic">I create;</span> therefore I am
						</h1>
					</div>

					<div className={`absolute bottom-10 left-0 right-0 text-center font-mono uppercase text-[11px] font-semibold text-white transition-opacity duration-300 ${galleryComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
						<p>Use mouse wheel, arrow keys, or touch to navigate</p>
						<p className="opacity-60">
							Auto-play resumes after 3 seconds of inactivity
						</p>
					</div>
				</div>
			</section>

			{/* About Preview Section */}
			<section
				ref={aboutSectionRef}
				className="min-h-screen bg-black px-4 sm:px-6 py-20 sm:py-32"
			>
				<div className="max-w-6xl mx-auto">
					{/* Section Header */}
					<div className="mb-16 sm:mb-20">
						<p className="text-zinc-500 text-xs sm:text-sm uppercase tracking-widest mb-3">About Me</p>
						<h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white mb-6">
							Hi, I&apos;m <span className="italic">Brandon</span>
						</h2>
					</div>

					<div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
						{/* Left - Large Quote */}
						<div className="lg:sticky lg:top-32">
							<div className="relative">
								<span className="absolute -top-8 -left-4 text-8xl sm:text-9xl font-serif text-white/10">&ldquo;</span>
								<blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif text-white leading-relaxed pl-4 border-l-2 border-white/20">
									I believe every image tells a story, and my job is to make that story unforgettable.
								</blockquote>
							</div>
							
							<a
								href="/about"
								className="inline-flex items-center gap-3 mt-10 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-zinc-100 hover:scale-105 transition-all duration-300"
							>
								More about me
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
								</svg>
							</a>
						</div>

						{/* Right - Bio & Stats */}
						<div className="space-y-8">
							<div className="space-y-6 text-base sm:text-lg text-zinc-400 leading-relaxed">
								<p>
									A creative professional passionate about bringing ideas to life through
									design, photography, and visual storytelling. Based in [Location], I&apos;ve 
									spent years developing a unique visual style.
								</p>
								<p>
									When I&apos;m not behind the camera or designing, you&apos;ll find me exploring 
									new places, seeking inspiration in architecture, nature, and the everyday 
									moments that make life beautiful.
								</p>
							</div>

							{/* Photo Grid */}
							<div className="grid grid-cols-2 gap-4 pt-4">
								<div className="aspect-[4/5] rounded-2xl overflow-hidden">
									<img
										src="https://picsum.photos/seed/brandon1/600/750"
										alt="Brandon at work"
										className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
									/>
								</div>
								<div className="aspect-[4/5] rounded-2xl overflow-hidden mt-8">
									<img
										src="https://picsum.photos/seed/brandon2/600/750"
										alt="Behind the scenes"
										className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
									/>
								</div>
							</div>

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

			{/* Services Section */}
			<section className="bg-black px-4 sm:px-6 py-16 sm:py-24 overflow-hidden">
				<div className="max-w-7xl mx-auto">
					{/* Header with side text */}
					<div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-12 sm:mb-16">
						<div>
							<p className="text-zinc-500 text-xs sm:text-sm uppercase tracking-widest mb-2 sm:mb-3">Services</p>
							<h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white">
								What I <span className="italic">Do</span>
							</h2>
						</div>
						<div className="flex items-end">
							<p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
								From concept to execution, I bring a unique blend of technical skill and creative vision to every project. Here&apos;s how I can help bring your ideas to life.
							</p>
						</div>
					</div>

					{/* Creative bento grid for services */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 auto-rows-[180px] sm:auto-rows-[200px]">
						{/* Photography - Large card */}
						<div className="lg:col-span-5 lg:row-span-2 group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer">
							<img 
								src="https://picsum.photos/seed/neon-city/800/800" 
								alt="Photography"
								className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
							<div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
							<div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
								<div className="flex items-center gap-3 mb-3">
									<div className="w-10 h-10 rounded-full backdrop-blur-xl bg-white/20 flex items-center justify-center">
										<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
										</svg>
									</div>
									<span className="text-white/60 text-sm">01</span>
								</div>
								<h3 className="text-white text-2xl sm:text-3xl font-serif mb-2 group-hover:translate-x-2 transition-transform duration-300">Photography</h3>
								<p className="text-white/70 text-sm sm:text-base max-w-md">Capturing authentic moments and crafting visual narratives that resonate with your audience.</p>
							</div>
							{/* Animated corner line */}
							<div className="absolute top-6 right-6 w-12 h-12">
								<div className="absolute top-0 right-0 w-full h-[2px] bg-white/30 origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
								<div className="absolute top-0 right-0 w-[2px] h-full bg-white/30 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 delay-100" />
							</div>
						</div>

						{/* Videography - Medium card */}
						<div className="lg:col-span-7 group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer">
							<img 
								src="https://picsum.photos/seed/music-filming/800/400" 
								alt="Videography"
								className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
							/>
							<div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
							<div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between">
								<div className="flex items-center justify-between">
									<div className="w-10 h-10 rounded-full backdrop-blur-xl bg-white/20 flex items-center justify-center">
										<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
										</svg>
									</div>
									<span className="text-white/60 text-sm">02</span>
								</div>
								<div>
									<h3 className="text-white text-xl sm:text-2xl font-serif mb-1 group-hover:translate-x-2 transition-transform duration-300">Videography</h3>
									<p className="text-white/70 text-sm">Cinematic storytelling that captivates</p>
								</div>
							</div>
						</div>

						{/* Design - Medium card */}
						<div className="lg:col-span-4 group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-gradient-to-br from-zinc-800 to-zinc-900">
							<div className="absolute inset-0 opacity-30">
								<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/20 rounded-full group-hover:scale-150 transition-transform duration-700" />
								<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/10 rounded-full group-hover:scale-125 transition-transform duration-700 delay-100" />
								<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/5 rounded-full group-hover:scale-110 transition-transform duration-700 delay-200" />
							</div>
							<div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between">
								<div className="flex items-center justify-between">
									<div className="w-10 h-10 rounded-full backdrop-blur-xl bg-white/10 flex items-center justify-center">
										<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
										</svg>
									</div>
									<span className="text-white/60 text-sm">03</span>
								</div>
								<div>
									<h3 className="text-white text-xl sm:text-2xl font-serif mb-1 group-hover:translate-x-2 transition-transform duration-300">Design</h3>
									<p className="text-white/70 text-sm">Visual solutions that inspire</p>
								</div>
							</div>
						</div>

						{/* Creative Direction - Small card */}
						<a href="/projects" className="lg:col-span-3 group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-white block">
							<div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between">
								<div className="flex items-center justify-between">
									<div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center">
										<svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
										</svg>
									</div>
									<span className="text-black/40 text-sm">04</span>
								</div>
								<div>
									<h3 className="text-black text-xl sm:text-2xl font-serif mb-1 group-hover:translate-x-2 transition-transform duration-300">Creative Direction</h3>
									<p className="text-black/60 text-sm">Concept to completion</p>
								</div>
							</div>
							{/* Hover arrow */}
							<div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-black flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
								<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
								</svg>
							</div>
						</a>
					</div>
				</div>
			</section>

			{/* Selected Works Section */}
			<section className="bg-zinc-950 px-4 sm:px-6 py-20 sm:py-32">
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<div className="grid lg:grid-cols-2 gap-6 lg:gap-16 mb-14 sm:mb-20">
						<div>
							<p className="text-zinc-500 text-xs sm:text-sm uppercase tracking-widest mb-3">Portfolio</p>
							<h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white">
								Selected <span className="italic">Works</span>
							</h2>
						</div>
						<div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6 lg:justify-end">
							<p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-md lg:hidden">
								A curated collection of my best work across photography, design, and creative direction.
							</p>
							<a 
								href="/projects" 
								className="inline-flex items-center justify-center gap-3 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-zinc-100 hover:scale-105 transition-all duration-300 w-full sm:w-auto"
							>
								View all
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
								</svg>
							</a>
						</div>
					</div>

					{/* Projects Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Featured Project - Large */}
						<div className="md:col-span-2 group relative rounded-3xl overflow-hidden cursor-pointer">
							<div className="aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9]">
								<img
									src="https://picsum.photos/seed/featured-wide/1600/700"
									alt="Featured Project"
									className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
								/>
							</div>
							<div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
							<div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
								<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
									<div>
										<span className="inline-block backdrop-blur-xl bg-white/10 border border-white/20 px-3 py-1 rounded-full text-white/80 text-xs mb-3">Featured Project</span>
										<h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-serif mb-2 group-hover:translate-x-2 transition-transform duration-300">Urban Perspectives</h3>
										<p className="text-white/70 text-sm sm:text-base max-w-xl">A visual exploration of city life, architecture, and the stories hidden in urban landscapes.</p>
									</div>
									<div className="w-12 h-12 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0">
										<svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
										</svg>
									</div>
								</div>
							</div>
						</div>
						
						{/* Project Cards */}
						{[
							{ title: "Brand Identity", category: "Design", seed: "project-1" },
							{ title: "Portrait Series", category: "Photography", seed: "project-2" },
							{ title: "Music Video", category: "Videography", seed: "project-3" },
							{ title: "Product Launch", category: "Creative Direction", seed: "project-4" },
						].map((project, i) => (
							<div 
								key={i}
								className="group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer"
							>
								<div className="aspect-[4/3]">
									<img
										src={`https://picsum.photos/seed/${project.seed}/800/600`}
										alt={project.title}
										className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
									/>
								</div>
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
								<div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
									<span className="text-white/60 text-xs uppercase tracking-wider">{project.category}</span>
									<h3 className="text-white text-xl sm:text-2xl font-serif mt-1 group-hover:translate-x-2 transition-transform duration-300">{project.title}</h3>
								</div>
								{/* Hover overlay */}
								<div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
									<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
									</svg>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Contact CTA Section */}
			<section className="bg-black px-4 sm:px-6 py-20 sm:py-32 relative overflow-hidden">
				{/* Animated background elements */}
				<div className="absolute inset-0 overflow-hidden">
					<div className="absolute top-1/4 -left-32 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
					<div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full" />
				</div>

				<div className="max-w-5xl mx-auto relative">
					{/* Main CTA Card */}
					<div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 md:p-16 text-center">
						<div className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-6 sm:mb-8">
							<span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
							<span className="text-white/80 text-xs sm:text-sm">Available for new projects</span>
						</div>
						
						<h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white mb-4 sm:mb-6">
							Let&apos;s <span className="italic">Create</span> Together
						</h2>
						
						<p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
							Have a project in mind? I&apos;d love to hear about it. Let&apos;s collaborate and bring your vision to life.
						</p>

						<div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 sm:mb-12">
							<a
								href="/contact"
								className="group relative inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-zinc-100 hover:scale-105 transition-all duration-300"
							>
								<span>Start a Project</span>
								<svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
								</svg>
							</a>
							
							<a
								href="mailto:brandon@example.com"
								className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/10 border border-white/20 px-6 py-4 rounded-full text-white hover:bg-white/20 hover:scale-105 transition-all duration-300"
							>
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
								</svg>
								brandon@example.com
							</a>
						</div>

						{/* Social links */}
						<div className="flex items-center justify-center gap-4">
							<span className="text-zinc-500 text-sm">Or find me on</span>
							<div className="flex items-center gap-3">
								<a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110">
									<svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
										<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
									</svg>
								</a>
								<a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110">
									<svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
										<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
									</svg>
								</a>
								<a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110">
									<svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
										<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
									</svg>
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-black px-4 sm:px-6 py-8 sm:py-12">
				<div className="max-w-6xl mx-auto">
					<div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-8 py-5 sm:py-6 flex flex-col md:flex-row items-center justify-between gap-4">
						<p className="text-zinc-400 text-xs sm:text-sm text-center md:text-left">
							&copy; {new Date().getFullYear()} Brandon. All rights reserved.
						</p>
						<div className="flex items-center gap-4 sm:gap-6">
							<a href="#" className="text-zinc-400 hover:text-white active:text-white transition-colors text-xs sm:text-sm">Instagram</a>
							<a href="#" className="text-zinc-400 hover:text-white active:text-white transition-colors text-xs sm:text-sm">LinkedIn</a>
							<a href="#" className="text-zinc-400 hover:text-white active:text-white transition-colors text-xs sm:text-sm">Email</a>
							<span className="text-zinc-600">·</span>
							<span className="text-zinc-500 text-xs sm:text-sm">Made by <a href="https://www.websies.co" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">Websies</a></span>
						</div>
					</div>
				</div>
			</footer>
		</main>
	);
}
