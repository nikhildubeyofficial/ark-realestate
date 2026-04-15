"use client";

import AboutLeadershipSection from "@/components/AboutLeadershipSection";
import { PremiumSection } from "@/components/PremiumSection";
import { Reveal } from "@/components/Reveal";
import { leadershipProfiles } from "@/data/leadershipProfiles";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const HERO_VIDEO_SRC = "/video/hero.mp4";

const rnrVideos = [
  {
    src: "/RNR%20videos/AQMLl2zQPSEmne39MX8ZKm2cplr67NhmCcf-lpMRw2DEblobs14nV8BrJE-wASQp_SsYlS9UnAZX8nJB00sglNptvBcIOwjcUOdXTao.mp4",
    rotateCCW: false,
  },
  {
    src: "/RNR%20videos/AQN_yhu3mgIGdBwAqMiOyV3hfA5g-Kat9REqMlfgDd4DskGG2fkzCJYhaNrNkhRpQgqv28o-A-qXpEdJB3qwjDOb.mp4",
    rotateCCW: false,
  },
  {
    src: "/RNR%20videos/AQN1O3rYJYEwb75PQ11w5vF9ziobzUHErCiR3e5vvKiEA0WGFS78_YDKWV9fJ7jYbe_U_YO06JISpWIyljm0ma74IMOBq-dpjhK3AKY.mp4",
    rotateCCW: false,
  },
  {
    src: "/RNR%20videos/AQNl6-XwClEoejKHU1ofaw2ZeGrxpLi2_ZQoMiag_HfQo9gxDeWw-fZ2EblcGFc6KVR2DqI2em1ktsuzUs1Ws67aMg6ZLzlTBn29gck.mp4",
    rotateCCW: false,
  },
  {
    src: "/RNR%20videos/AQOD7mHhWt9Z8XjJQ9mi37RnsyGhsT_8rR6AmEclhM4AnZubKY3TS88Z1EjoIeaOxsAFa89xaN9ia98UrflrdOFCfOaZiuVa7jpTgHQ.mp4",
    rotateCCW: false,
  },
  {
    src: "/RNR%20videos/AQOGb71VB0fQKEfu_PXEvZMIYOXrvR1Q33t78-lL4ZLyM-FPalCCks9LxLYKh5Qc2OsljxpUMzSGOVNY1VDWilQwkAm47xYfZSBBLzs.mp4",
    rotateCCW: true,
  },
  {
    src: "/RNR%20videos/AQOVcZ7pXIcVmTCX43EbO76Cjf0AaCKVKZ-k3s5t8X3AhLV7APVfd_knPrg0cETZhO-7hzE4jx43S1QIPdAZn_Rn0RAKZjvfAQmGYOg.mp4",
    rotateCCW: false,
  },
  {
    src: "/RNR%20videos/AQOxik6hak1_lTEVTWi5oJdWv5p8CbKYnhs_XKDp5g7KKHbkU7YP5-_p8aDizDi1RsqrtitD3vP181QDWcmLK-qS1FOtSjets2mS63A.mp4",
    rotateCCW: false,
  },
  {
    src: "/RNR%20videos/Receiving%20the%20Top%20Broker%20Award%20at%20%40damacofficial%20Proud%20moment%20for%20all%20the%20Arkians%20%F0%9F%8F%86%F0%9F%9A%8F%40chelanivi.mp4",
    rotateCCW: false,
  },
] as const;

const visibleRnrVideos = rnrVideos.filter((_, index) => ![1, 2, 6, 7, 8].includes(index));

function RewardsAndRecognition() {
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
    const nextIndex = (activeIndex + 1) % visibleRnrVideos.length;
    goToSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (activeIndex - 1 + visibleRnrVideos.length) % visibleRnrVideos.length;
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
    <section className="border-b border-white/5 bg-[#060606] py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-5 md:px-12">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#c9a84c]" />
            <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">
              Recognition
            </span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#c9a84c]" />
          </div>
          <h2
            className="mt-4 font-serif text-[40px] font-light italic leading-tight text-white/90 md:text-[50px]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Rewards & <span className="text-[#c9a84c]">Recognition</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[500px] font-light text-white/50 text-sm">
            Celebrating our achievements and the milestones we have reached together
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
                src={visibleRnrVideos[activeIndex]?.src}
                className={`h-full w-full object-contain ${visibleRnrVideos[activeIndex]?.rotateCCW ? "-rotate-90" : ""}`}
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
                    Award Video
                  </p>
                  <p className="text-xs uppercase tracking-[2px] text-[#c9a84c]/80">
                    {activeIndex + 1} of {visibleRnrVideos.length}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 rounded-full bg-black/70 px-4 py-2 backdrop-blur-sm">
                  <span className="font-serif text-sm text-white/70">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="text-white/30">/</span>
                  <span className="font-serif text-sm text-white/50">
                    {String(visibleRnrVideos.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-sm text-white/70 transition-all duration-300 hover:border-[#c9a84c] hover:bg-[#c9a84c]/20 hover:text-[#c9a84c] md:-left-16 md:h-14 md:w-14"
            aria-label="Previous video"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-sm text-white/70 transition-all duration-300 hover:border-[#c9a84c] hover:bg-[#c9a84c]/20 hover:text-[#c9a84c] md:-right-16 md:h-14 md:w-14"
            aria-label="Next video"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          {visibleRnrVideos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 bg-[#c9a84c]"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function TeamPage() {
  return (
    <div className="min-h-screen">
      <section className="relative min-h-[600px] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <video
            className="absolute inset-0 z-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#080808] via-black/60 to-black/40" />
        <div className="absolute inset-0 z-[2] flex items-end">
          <div className="relative w-full max-w-[1280px] px-8 pb-20 md:px-20">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gradient-to-r from-[#c9a84c] to-transparent" />
              <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">Our People</span>
            </div>
            <h1 className="mt-4 flex flex-wrap items-baseline gap-2 font-serif text-5xl font-light italic leading-tight text-white/90 md:text-6xl lg:text-7xl">
              <span>Meet The</span>
              <span className="bg-gradient-to-r from-[#c9a84c] via-[#fcf6ba] to-[#b38f28] bg-clip-text text-transparent">Team</span>
            </h1>
            <p className="mt-5 max-w-[760px] font-light text-sm leading-relaxed text-white/70 md:text-base">
              The talented individuals behind ARK Vision who make every client experience exceptional.
            </p>
          </div>
        </div>
      </section>

      {/* Our Leadership Section */}
      <Reveal direction="up">
        <PremiumSection
          eyebrow="Leadership"
          title={
            <>
              Executive
              <span className="text-[#c9a84c]"> Leadership Team</span>
            </>
          }
          description="The leadership group driving strategy, market positioning, and client outcomes across Dubai's premium real estate segment."
        >
          <AboutLeadershipSection profiles={leadershipProfiles} />
        </PremiumSection>
      </Reveal>

      {/* Rewards and Recognition Video Section */}
      <Reveal direction="scale">
        <RewardsAndRecognition />
      </Reveal>
    </div>
  );
}
