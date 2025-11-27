import InfiniteGallery from '@/components/InfiniteGallery';

export default function Home() {
	const sampleImages = [
		{ src: 'https://picsum.photos/seed/1/800/600', alt: 'Project 1' },
		{ src: 'https://picsum.photos/seed/2/800/600', alt: 'Project 2' },
		{ src: 'https://picsum.photos/seed/3/800/600', alt: 'Project 3' },
		{ src: 'https://picsum.photos/seed/4/800/600', alt: 'Project 4' },
		{ src: 'https://picsum.photos/seed/5/800/600', alt: 'Project 5' },
		{ src: 'https://picsum.photos/seed/6/800/600', alt: 'Project 6' },
		{ src: 'https://picsum.photos/seed/7/800/600', alt: 'Project 7' },
		{ src: 'https://picsum.photos/seed/8/800/600', alt: 'Project 8' },
	];

	return (
		<main className="min-h-screen ">
			<InfiniteGallery
				images={sampleImages}
				speed={1.2}
				zSpacing={3}
				visibleCount={12}
				falloff={{ near: 0.8, far: 14 }}
				className="h-screen w-full rounded-lg overflow-hidden"
			/>
			<div className="h-screen inset-0 pointer-events-none fixed flex items-center justify-center text-center px-3 mix-blend-exclusion text-white">
				<h1 className="font-serif text-4xl md:text-7xl tracking-tight">
					<span className="italic">I create;</span> therefore I am
				</h1>
			</div>

			<div className="text-center fixed bottom-10 left-0 right-0 font-mono uppercase text-[11px] font-semibold">
				<p>Use mouse wheel, arrow keys, or touch to navigate</p>
				<p className=" opacity-60">
					Auto-play resumes after 3 seconds of inactivity
				</p>
			</div>
		</main>
	);
}
