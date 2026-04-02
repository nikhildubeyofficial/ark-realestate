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
            <div className="relative aspect-[296/395] overflow-hidden rounded-sm border border-white/10 transition-all duration-500 group-hover:border-[#c9a84c]/45 group-hover:shadow-[0_0_45px_-15px_rgba(201,168,76,0.35)] group-hover:brightness-110">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover grayscale transition duration-500 group-hover:scale-[1.04] group-hover:grayscale-0"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
            </div>
            <div className="mt-4 space-y-1">
              <p className="font-serif text-lg font-medium italic text-white/90">{member.name}</p>
              {member.designation ? (
                <p className="text-xs uppercase tracking-[2.2px] text-[#c9a84c]/90">
                  {member.designation}
                </p>
              ) : null}
              {member.email ? (
                <p className="text-xs text-white/55">{member.email}</p>
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
            className="border border-white/25 bg-transparent px-8 py-3 font-light text-sm text-white/85 transition hover:border-[#c9a84c] hover:text-[#c9a84c]"
          >
            {showAll ? "Show less" : "View all"}
          </button>
        </div>
      ) : null}
    </>
  );
}
