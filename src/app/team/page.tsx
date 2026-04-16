"use client";

import Image from "next/image";
import AboutLeadershipSection from "@/components/AboutLeadershipSection";
import { PremiumSection } from "@/components/PremiumSection";
import { Reveal } from "@/components/Reveal";
import { leadershipProfiles } from "@/data/leadershipProfiles";

const HERO_VIDEO_SRC = "/video/hero.mp4";
const directorOfSales = [
  { name: "Sachin Madhan", image: "/Director%20of%20sales/sachin.JPG" },
  { name: "Pranav Anand", image: "/Director%20of%20sales/Pranav.JPG" },
  { name: "Krishna Kumar", image: "/Director%20of%20sales/Ganesh.png" },
  { name: "Anisha Antony", image: "/Director%20of%20sales/anisha.JPG" },
  { name: "Nikhil chandani", image: "/Director%20of%20sales/Nikhil.JPG" },
  { name: "Sumitra nayar", image: "/Director%20of%20sales/Sumitra.JPG" },
] as const;

const rewardsRecognitionImages = [
  "/rewards%20and%20recognition/WhatsApp%20Image%202026-04-16%20at%2012.34.10%20(1).jpeg",
  "/rewards%20and%20recognition/WhatsApp%20Image%202026-04-16%20at%2012.34.11.jpeg",
  "/rewards%20and%20recognition/WhatsApp%20Image%202026-04-16%20at%2012.34.11%20(1).jpeg",
  "/rewards%20and%20recognition/WhatsApp%20Image%202026-04-16%20at%2012.34.11%20(2).jpeg",
  "/rewards%20and%20recognition/WhatsApp%20Image%202026-04-16%20at%2012.34.11%20(3).jpeg",
  "/rewards%20and%20recognition/WhatsApp%20Image%202026-04-16%20at%2012.34.11%20(4).jpeg",
] as const;

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

      <Reveal direction="up">
        <section className="border-b border-white/10 bg-[#050505] py-10 md:py-14">
          <div className="mx-auto max-w-[1280px] px-5 md:px-20">
            <div className="relative overflow-hidden rounded-xl border border-white/10">
              <Image
                src="/team.JPG"
                alt="ARK Vision team"
                width={1400}
                height={900}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </section>
      </Reveal>

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

      <Reveal direction="up">
        <PremiumSection
          eyebrow="Sales Team"
          title={
            <>
              Director of
              <span className="text-[#c9a84c]"> Sales</span>
            </>
          }
          description="The director team leading execution quality, advisory excellence, and client outcomes."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {directorOfSales.map((person) => (
              <article key={person.name} className="overflow-hidden rounded-xl border border-white/10 bg-black/30">
                <div className="relative aspect-[4/5]">
                  <Image src={person.image} alt={person.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="border-t border-white/10 p-4">
                  <p className="font-serif text-xl italic text-[#c9a84c]">{person.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[2px] text-white/60">Director of Sales</p>
                </div>
              </article>
            ))}
          </div>
        </PremiumSection>
      </Reveal>

      <Reveal direction="scale">
        <section className="border-b border-white/5 bg-[#060606] py-16 md:py-24">
          <div className="mx-auto max-w-[1280px] px-5 md:px-12">
            <div className="mb-10 text-center">
              <h2 className="font-serif text-[40px] font-light italic leading-tight text-white/90 md:text-[50px]">
                Rewards & <span className="text-[#c9a84c]">Recognition</span>
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rewardsRecognitionImages.map((image) => (
                <div key={image} className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-black">
                  <Image src={image} alt="Rewards and Recognition" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
