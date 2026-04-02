"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { LeadershipProfile } from "@/data/leadershipProfiles";

const INITIAL_VISIBLE = 4;

export default function AboutLeadershipSection({
  profiles,
  initialVisible = INITIAL_VISIBLE,
}: {
  profiles: LeadershipProfile[];
  initialVisible?: number;
}) {
  const [showAll, setShowAll] = useState(false);

  const { visible, hasMore } = useMemo(() => {
    const list = profiles.length ? profiles : [];
    const hasMoreInner = list.length > initialVisible;
    const visibleInner = showAll
      ? list
      : list.slice(0, initialVisible);
    return { visible: visibleInner, hasMore: hasMoreInner };
  }, [profiles, showAll, initialVisible]);

  return (
    <>
      <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
        {visible.map((member) => (
          <div key={`${member.name}-${member.designation}`} className="group">
            <div className="card-premium relative aspect-[296/395] overflow-hidden rounded-sm border border-white/10">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover grayscale transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:grayscale-0"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent transition-opacity duration-500 group-hover:from-black/70" />
              {/* Overlay info on hover */}
              <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
                <div className="rounded bg-black/70 px-3 py-2 backdrop-blur-sm">
                  <p className="font-serif text-sm font-medium italic text-white/90">{member.name}</p>
                  {member.designation ? (
                    <p className="mt-0.5 text-[10px] uppercase tracking-[1.8px] text-[#c9a84c]/90">
                      {member.designation}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-1 transition-transform duration-300 group-hover:translate-x-1">
              <p className="font-serif text-lg font-medium italic text-white/90 transition-colors duration-300 group-hover:text-[#fcf6ba]">{member.name}</p>
              {member.designation ? (
                <p className="text-xs uppercase tracking-[2.2px] text-[#c9a84c]/90">
                  {member.designation}
                </p>
              ) : null}
              {member.email ? (
                <p className="text-xs text-white/55 transition-colors duration-300 group-hover:text-white/70">{member.email}</p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      {hasMore ? (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="btn-magnetic border border-white/25 bg-transparent px-8 py-3 font-light text-sm text-white/85 transition-all duration-400 hover:border-[#c9a84c] hover:text-[#c9a84c]"
          >
            {showAll ? "Show less" : "View all"}
          </button>
        </div>
      ) : null}
    </>
  );
}
