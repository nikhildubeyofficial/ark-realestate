"use client";

import { useMemo, useState } from "react";

const INITIAL_VISIBLE = 12;

export default function AboutTeamGrid({ imagePaths }: { imagePaths: string[] }) {
  const [showAll, setShowAll] = useState(false);

  const { visible, hasMore } = useMemo(() => {
    const paths = imagePaths ?? [];
    return {
      visible: showAll ? paths : paths.slice(0, INITIAL_VISIBLE),
      hasMore: paths.length > INITIAL_VISIBLE,
    };
  }, [imagePaths, showAll]);

  return (
    <>
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((src) => (
          <div
            key={src}
            className="group relative aspect-[4/5] overflow-hidden rounded-sm border border-white/10 bg-black"
          >
            <div
              className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.05]"
              style={{ backgroundImage: `url(${src})` }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70" />
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
