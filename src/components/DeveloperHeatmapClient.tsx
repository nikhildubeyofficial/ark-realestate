"use client";

import dynamic from "next/dynamic";
import type { HeatPoint } from "@/lib/propertyData";

const DeveloperHeatmap = dynamic(() => import("./DeveloperHeatmap"), {
  ssr: false,
  loading: () => (
    <div className="h-[320px] w-full bg-[#060606] sm:h-[420px] md:h-[520px]" />
  ),
});

export default function DeveloperHeatmapClient({ points }: { points: HeatPoint[] }) {
  return <DeveloperHeatmap points={points} />;
}

