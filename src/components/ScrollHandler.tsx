"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ScrollHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const scrollTo = searchParams.get("scrollTo");
    if (scrollTo === "contact") {
      // Longer delay to ensure page is fully loaded and rendered
      const timer = setTimeout(() => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          // Scroll to contact section with offset for fixed header
          const headerOffset = 80;
          const elementPosition = contactSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
          
          // Clean up URL without refreshing
          const url = new URL(window.location.href);
          url.searchParams.delete("scrollTo");
          window.history.replaceState({}, "", url.toString());
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  return null;
}
