"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

const testimonials = [
  {
    id: 1,
    videoSrc: "/testimonials/Mona%20Testimoal%20Video.mp4",
    name: "Mona",
    title: "Happy Client",
  },
  {
    id: 2,
    videoSrc: "/testimonials/VID-20260208-WA0048.mp4",
    name: "Happy Client",
    title: "Satisfied Customer",
  },
  {
    id: 3,
    videoSrc: "/testimonials/VID-20260208-WA0049%20(1).mp4",
    name: "Happy Client",
    title: "Valued Customer",
  },
];

export default function TestimonialVideos() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [activeIndex]);

  const goToSlide = (index: number) => {
    if (index === activeIndex || isTransitioning) return;
    setIsTransitioning(true);
    setIsPlaying(false);
    setTimeout(() => {
      setActiveIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  const nextSlide = () => {
    const nextIndex = (activeIndex + 1) % testimonials.length;
    goToSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
    goToSlide(prevIndex);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  return (
    <section className="relative border-b border-white/5 bg-[#060606] py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
      
      <div className="relative mx-auto max-w-[1280px] px-5 md:px-12">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#c9a84c]" />
            <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">
              Client Voices
            </span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#c9a84c]" />
          </div>
          <h2
            className="mt-4 font-serif text-[40px] font-light italic leading-tight text-white/90 md:text-[50px]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Words of <span className="text-[#c9a84c]">Trust</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[500px] font-light text-white/50 text-sm">
            Hear directly from our satisfied clients about their experience with Ark Vision
          </p>
        </div>

        <div className="relative">
          <div className="relative mx-auto max-w-[900px]">
            <div
              className={`relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-black transition-opacity duration-300 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              <video
                ref={videoRef}
                src={testimonials[activeIndex].videoSrc}
                className="h-full w-full object-contain"
                onEnded={handleVideoEnded}
                playsInline
                preload="metadata"
                style={{ backgroundColor: '#000' }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center group cursor-pointer"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#c9a84c]/90 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-[#c9a84c]">
                  {isPlaying ? (
                    <Pause className="h-8 w-8 text-black" fill="black" />
                  ) : (
                    <Play className="ml-1 h-8 w-8 text-black" fill="black" />
                  )}
                </div>
              </button>

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div className="rounded-lg bg-black/70 backdrop-blur-sm px-4 py-3">
                  <p className="font-serif text-lg font-medium italic text-white/90">
                    {testimonials[activeIndex].name}
                  </p>
                  <p className="text-xs uppercase tracking-[2px] text-[#c9a84c]/80">
                    {testimonials[activeIndex].title}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 rounded-full bg-black/70 px-4 py-2 backdrop-blur-sm">
                  <span className="font-serif text-sm text-white/70">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="text-white/30">/</span>
                  <span className="font-serif text-sm text-white/50">
                    {String(testimonials.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-sm text-white/70 transition-all duration-300 hover:border-[#c9a84c] hover:bg-[#c9a84c]/20 hover:text-[#c9a84c] md:-left-16 md:h-14 md:w-14"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-sm text-white/70 transition-all duration-300 hover:border-[#c9a84c] hover:bg-[#c9a84c]/20 hover:text-[#c9a84c] md:-right-16 md:h-14 md:w-14"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 bg-[#c9a84c]"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
