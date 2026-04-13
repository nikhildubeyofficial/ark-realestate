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
    <section className={`premium-section border-b border-white/5 py-16 md:py-24 ${className}`}>
      <div className={`mx-auto max-w-[1280px] px-5 md:px-20 ${contentClassName}`}>
        <div className={center ? "text-center" : ""}>
          {eyebrow ? (
            <div
              className={`flex items-center gap-4 ${
                center ? "justify-center" : "justify-start"
              }`}
            >
              <span className="h-px w-10 bg-gradient-to-r from-[#c9a84c] to-transparent" />
              <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">
                {eyebrow}
              </span>
              <span className="h-px w-10 bg-gradient-to-l from-[#c9a84c] to-transparent" />
            </div>
          ) : null}
          <h2 className="premium-title mt-4 font-serif text-4xl font-light italic text-white/90 md:text-6xl">
            {title}
          </h2>
          {description ? (
            <p
              className={`mt-5 text-sm leading-relaxed text-white/55 ${
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
    <div className="premium-metric-rail grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/5 md:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="bg-[#090909] px-6 py-6 md:px-8">
          {item.icon ? <div className="mb-3 text-[#c9a84c]">{item.icon}</div> : null}
          <p className="font-serif text-2xl font-light italic text-[#c9a84c] md:text-3xl">
            {item.value}
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[2px] text-white/40">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
