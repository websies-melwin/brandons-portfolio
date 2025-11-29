'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
	{ href: '/', label: 'Home' },
	{ href: '/projects', label: 'Projects' },
	{ href: '/about', label: 'About' },
	{ href: '/contact', label: 'Contact' },
];

export default function Header() {
	const pathname = usePathname();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	// Hide header on homepage until user scrolls past the gallery
	// Once visible, it stays visible until page refresh
	useEffect(() => {
		// On non-homepage routes, always show header
		if (pathname !== '/') {
			setIsVisible(true);
			return;
		}

		// If already visible, don't add scroll listener (keep it visible)
		if (isVisible) {
			return;
		}

		const handleScroll = () => {
			if (window.scrollY > window.innerHeight * 0.8) {
				setIsVisible(true);
				// Remove listener once visible - header stays visible
				window.removeEventListener('scroll', handleScroll);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [pathname, isVisible]);

	// Don't show header on admin pages
	if (pathname?.startsWith('/admin') || pathname === '/login') {
		return null;
	}

	return (
		<header className={`fixed top-0 left-0 right-0 z-50 px-4 py-4 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
			<nav className="max-w-6xl mx-auto">
				<div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-full px-4 sm:px-6 py-3 flex items-center justify-between shadow-lg shadow-black/5">
					{/* Logo / Name */}
					<Link 
						href="/" 
						className="text-white font-serif text-lg tracking-tight hover:opacity-80 transition-opacity"
					>
						Brandon's Portfolio
					</Link>

					{/* Desktop Navigation Links */}
					<div className="hidden md:flex items-center gap-1">
						{navLinks.map((link) => {
							const isActive = pathname === link.href;
							return (
								<Link
									key={link.href}
									href={link.href}
									className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
										isActive
											? 'bg-white text-black font-medium'
											: 'text-white/80 hover:text-white hover:bg-white/10'
									}`}
								>
									{link.label}
								</Link>
							);
						})}
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						className="md:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
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

				{/* Mobile Menu */}
				{mobileMenuOpen && (
					<div className="md:hidden mt-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-2 shadow-lg shadow-black/5">
						{navLinks.map((link) => {
							const isActive = pathname === link.href;
							return (
								<Link
									key={link.href}
									href={link.href}
									onClick={() => setMobileMenuOpen(false)}
									className={`block px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
										isActive
											? 'bg-white text-black font-medium'
											: 'text-white/80 hover:text-white hover:bg-white/10'
									}`}
								>
									{link.label}
								</Link>
							);
						})}
					</div>
				)}
			</nav>
		</header>
	);
}
