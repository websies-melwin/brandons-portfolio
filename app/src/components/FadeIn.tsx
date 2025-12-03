'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface FadeInProps {
	children: ReactNode;
	className?: string;
	delay?: number;
	direction?: 'up' | 'down' | 'left' | 'right' | 'none';
	duration?: number;
	threshold?: number;
}

export default function FadeIn({
	children,
	className = '',
	delay = 0,
	direction = 'up',
	duration = 700,
	threshold = 0.1,
}: FadeInProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.unobserve(entry.target);
				}
			},
			{ threshold, rootMargin: '0px 0px -50px 0px' }
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => observer.disconnect();
	}, [threshold]);

	const getTransform = () => {
		if (isVisible) return 'translate3d(0, 0, 0)';
		switch (direction) {
			case 'up': return 'translate3d(0, 40px, 0)';
			case 'down': return 'translate3d(0, -40px, 0)';
			case 'left': return 'translate3d(40px, 0, 0)';
			case 'right': return 'translate3d(-40px, 0, 0)';
			case 'none': return 'translate3d(0, 0, 0)';
			default: return 'translate3d(0, 40px, 0)';
		}
	};

	return (
		<div
			ref={ref}
			className={className}
			style={{
				opacity: isVisible ? 1 : 0,
				transform: getTransform(),
				transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
				willChange: 'opacity, transform',
			}}
		>
			{children}
		</div>
	);
}
