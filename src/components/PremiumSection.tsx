"use client";

import type { ReactNode } from "react";

type PremiumSectionProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  center?: boolean;
};

export function PremiumSection({
  eyebrow,
  title,
  description,
  children,
  className = "",
  contentClassName = "",
  center = false,
}: PremiumSectionProps) {
  return (
    <section className={`premium-section border-b border-white/10 py-24 md:py-48 ${className}`}>
      <div className={`mx-auto max-w-[1280px] px-5 md:px-20 ${contentClassName}`}>
        <div className={center ? "text-center" : ""}>
          {eyebrow ? (
            <div
              className={`flex items-center gap-4 ${
                center ? "justify-center" : "justify-start"
              }`}
            >
              <span className="h-px w-10 bg-gradient-to-r from-[#C5A059] to-transparent" />
              <span className="text-[10px] font-light uppercase tracking-[5px] text-[#C5A059]">
                {eyebrow}
              </span>
              <span className="h-px w-10 bg-gradient-to-l from-[#C5A059] to-transparent" />
            </div>
          ) : null}
          <h2 className="premium-title mt-4 font-serif text-4xl font-light italic text-white/95 md:text-6xl">
            {title}
          </h2>
          {description ? (
            <p
              className={`mt-5 text-sm leading-relaxed text-white/60 ${
                center ? "mx-auto max-w-[760px]" : "max-w-[760px]"
              }`}
            >
              {description}
            </p>
          ) : null}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

export function TrustMetricRail({
  items,
}: {
  items: Array<{ value: string; label: string; icon?: ReactNode }>;
}) {
  return (
    <div className="premium-metric-rail grid grid-cols-1 overflow-hidden border border-white/10 bg-[#050505]/90 md:grid-cols-4">
      {items.map((item, index) => (
        <div
          key={item.label}
          className={`bg-[#050505] px-6 py-8 md:px-8 ${index !== items.length - 1 ? "md:border-r md:border-white/10" : ""}`}
        >
          {item.icon ? <div className="mb-4 text-[#C5A059]">{item.icon}</div> : null}
          <p className="font-serif text-3xl font-light italic text-[#C5A059] md:text-4xl">
            {item.value}
          </p>
          <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-white/60">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
