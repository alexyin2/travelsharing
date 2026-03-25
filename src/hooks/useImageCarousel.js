import { useState, useEffect } from "react";

export default function useImageCarousel(images, intervalMs = 4000, initialDelay = 0) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    let interval;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % images.length);
      }, intervalMs);
    }, initialDelay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [images, intervalMs, initialDelay]);

  return currentIndex;
}
