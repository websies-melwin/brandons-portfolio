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
				className="min-h-screen bg-black flex items-center px-4 sm:px-6 py-16 sm:py-24"
			>
				<div className="max-w-6xl mx-auto w-full">
					<div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
						{/* Left side - Text */}
						<div className="order-2 md:order-1 text-center md:text-left">
							<h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-4 sm:mb-6 text-white">
								Hi, I&apos;m <span className="italic">Brandon</span>
							</h2>

							<p className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-6 sm:mb-8">
								A creative professional passionate about bringing ideas to life through
								design, photography, and visual storytelling.
							</p>

							<a
								href="/about"
								className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/10 border border-white/20 px-5 py-2.5 rounded-full text-white hover:bg-white/20 active:bg-white/30 transition-all duration-200 text-sm sm:text-base"
							>
								More about me
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
								</svg>
							</a>
						</div>

						{/* Right side - Photo collage */}
						<div className="relative h-[280px] sm:h-[350px] md:h-[500px] order-1 md:order-2">
							{/* Main large photo */}
							<div className="absolute top-0 right-0 w-[65%] sm:w-[70%] h-[65%] sm:h-[70%] rounded-xl sm:rounded-2xl overflow-hidden">
								<img
									src="https://picsum.photos/seed/brandon1/600/600"
									alt="Brandon at work"
									className="w-full h-full object-cover"
								/>
							</div>
							{/* Smaller overlapping photo */}
							<div className="absolute bottom-0 left-0 w-[50%] sm:w-[55%] h-[50%] sm:h-[55%] rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-4 border-black">
								<img
									src="https://picsum.photos/seed/brandon2/400/400"
									alt="Behind the scenes"
									className="w-full h-full object-cover"
								/>
							</div>
							{/* Small accent photo */}
							<div className="absolute top-[55%] sm:top-[60%] right-[3%] sm:right-[5%] w-[28%] sm:w-[30%] h-[28%] sm:h-[30%] rounded-lg sm:rounded-xl overflow-hidden border-2 sm:border-4 border-black">
								<img
									src="https://picsum.photos/seed/brandon3/300/300"
									alt="Creative process"
									className="w-full h-full object-cover"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Selected Works Section */}
			<section className="bg-black px-4 sm:px-6 py-16 sm:py-32">
				<div className="max-w-7xl mx-auto">
					{/* Header with side alignment */}
					<div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 sm:mb-16">
						<div>
							<p className="text-zinc-500 text-xs sm:text-sm uppercase tracking-widest mb-2 sm:mb-3">Portfolio</p>
							<h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-white">
								Selected Works
							</h2>
						</div>
						<a 
							href="/projects" 
							className="mt-6 md:mt-0 inline-flex items-center gap-2 backdrop-blur-xl bg-white/10 border border-white/20 px-5 py-2.5 rounded-full text-white hover:bg-white/20 transition-all duration-200"
						>
							View all
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</a>
					</div>

					{/* Bento-style grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
						{/* Large featured project */}
						<div className="md:col-span-2 md:row-span-2 group relative aspect-[4/3] md:aspect-auto rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer">
							<img
								src="https://picsum.photos/seed/featured/1200/900"
								alt="Featured Project"
								className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
							<div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 md:bottom-8 md:left-8 md:right-8">
								<div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6">
									<p className="text-white/60 text-xs sm:text-sm mb-1 sm:mb-2">Featured</p>
									<h3 className="text-white text-xl sm:text-2xl md:text-3xl font-serif mb-1 sm:mb-2">Project Name</h3>
									<p className="text-white/80 text-xs sm:text-sm max-w-md">A brief description of this amazing project and what makes it special.</p>
								</div>
							</div>
						</div>
						
						{/* Smaller projects */}
						{[1, 2, 3, 4].map((i) => (
							<div 
								key={i}
								className="group relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer"
							>
								<img
									src={`https://picsum.photos/seed/${i + 20}/800/600`}
									alt={`Project ${i}`}
									className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
								<div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg sm:rounded-xl p-3 sm:p-4 md:translate-y-4 md:group-hover:translate-y-0 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
									<h3 className="text-white font-medium text-base sm:text-lg">Project {i}</h3>
									<p className="text-zinc-300 text-xs sm:text-sm">Category</p>
								</div>
							</div>
						))}
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
						</div>
					</div>
				</div>
			</footer>
		</main>
	);
}
