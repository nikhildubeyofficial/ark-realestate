"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

const INITIAL_VISIBLE = 4;

export default function AboutLeadershipSection({
  imagePaths,
}: {
  imagePaths: string[];
}) {
  const [showAll, setShowAll] = useState(false);

  const { visible, hasMore } = useMemo(() => {
    const paths = imagePaths.length ? imagePaths : [];
    const hasMoreInner = paths.length > INITIAL_VISIBLE;
    const visibleInner = showAll
      ? paths
      : paths.slice(0, INITIAL_VISIBLE);
    return { visible: visibleInner, hasMore: hasMoreInner };
  }, [imagePaths, showAll]);

  return (
    <>
      <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
        {visible.map((src) => (
          <div key={src} className="group">
            <div className="relative aspect-[296/395] overflow-hidden rounded-sm border border-white/10 transition-all duration-500 group-hover:border-[#c9a84c]/45 group-hover:shadow-[0_0_45px_-15px_rgba(201,168,76,0.35)] group-hover:brightness-110">
              <Image
                src={src}
                alt=""
                fill
                className="object-cover grayscale transition duration-500 group-hover:scale-[1.04] group-hover:grayscale-0"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
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
