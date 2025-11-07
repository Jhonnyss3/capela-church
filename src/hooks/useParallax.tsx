import { useEffect, useRef } from 'react';

export const useParallax = (speed: number = 0.5) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrolled;
      const windowHeight = window.innerHeight;
      
      // Only apply parallax when element is in view
      if (scrolled + windowHeight > elementTop && scrolled < elementTop + rect.height) {
        const yPos = -(scrolled - elementTop) * speed;
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return ref;
};