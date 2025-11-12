import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Ensure scroll reset after page transition or lazy component load
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Smooth cinematic scroll
      });
    };

    // Add a tiny delay to handle lazy-loaded routes
    const timer = setTimeout(scrollToTop, 150);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null; // invisible helper component
}
