import { useEffect, useState, useRef } from 'react';

export function UseOnScreen(ref, threshold = 0.8) {
	const [isOnScreen, setIsOnScreen] = useState(false);
	const observerRef = useRef(null);

	useEffect(() => {
		observerRef.current = new IntersectionObserver(
			([entry]) => setIsOnScreen(entry.isIntersecting),
			{ threshold }
		);
	}, []);

	useEffect(() => {
		if (ref && ref.current) {
			observerRef.current.observe(ref.current);

			return () => {
				observerRef.current.disconnect();
			};
		}
	}, [ref]);

	return isOnScreen;
}
