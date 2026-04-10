"use client";

import { useMemo, useState } from "react";

const INITIAL_VISIBLE = 12;

type AboutTeamGridProps = {
  imagePaths: string[];
  names?: readonly string[];
};

export default function AboutTeamGrid({ imagePaths, names = [] }: AboutTeamGridProps) {
  const [showAll, setShowAll] = useState(false);

  const { visible, hasMore } = useMemo(() => {
    const paths = imagePaths ?? [];
    const members = names ?? [];
    const items = paths.map((path, index) => ({
      path,
      name: members[index] ?? `Team Member ${index + 1}`,
    }));
    return {
      visible: showAll ? items : items.slice(0, INITIAL_VISIBLE),
      hasMore: items.length > INITIAL_VISIBLE,
    };
  }, [imagePaths, names, showAll]);

  return (
    <>
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map(({ path, name }, index) => (
          <div
            key={`${path}-${index}`}
            className="group relative aspect-[4/5] overflow-hidden rounded-sm border border-white/10 bg-black"
          >
            <div
              className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.05]"
              style={{ backgroundImage: `url(${path})` }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-85" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a0a0a]/95 via-[#0a0a0a]/70 to-transparent" />
            <p className="pointer-events-none absolute bottom-3 left-3 right-3 truncate bg-gradient-to-r from-[#f6e7b0] via-[#e9c979] to-[#c9a84c] bg-clip-text font-serif text-[12px] font-medium tracking-[1.4px] text-transparent">
              {name}
            </p>
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
