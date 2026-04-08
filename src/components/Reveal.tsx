"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealDirection = "up" | "down" | "left" | "right" | "scale" | "blur";

const directionStyles: Record<RevealDirection, { hidden: string; visible: string }> = {
  up: {
    hidden: "translate-y-10 opacity-0",
    visible: "translate-y-0 opacity-100",
  },
  down: {
    hidden: "-translate-y-10 opacity-0",
    visible: "translate-y-0 opacity-100",
  },
  left: {
    hidden: "translate-x-10 opacity-0",
    visible: "translate-x-0 opacity-100",
  },
  right: {
    hidden: "-translate-x-10 opacity-0",
    visible: "translate-x-0 opacity-100",
  },
  scale: {
    hidden: "scale-[0.92] opacity-0",
    visible: "scale-100 opacity-100",
  },
  blur: {
    hidden: "translate-y-4 opacity-0",
    visible: "translate-y-0 opacity-100",
  },
};

export function Reveal({
  children,
  className = "",
  delayMs = 0,
  direction = "up",
  once = true,
  threshold = 0.08,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  direction?: RevealDirection;
  once?: boolean;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once, threshold]);

  const styles = directionStyles[direction];

  return (
    <div
      ref={ref}
      className={`transition-opacity transition-transform duration-500 ease-out motion-reduce:transition-none ${
        visible ? styles.visible : styles.hidden
      } ${className}`}
      style={{
        transitionDelay: visible ? `${delayMs}ms` : "0ms",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/**
 * StaggerReveal — reveals children one by one with increasing delay.
 * Each direct child gets a staggered transition-delay.
 */
export function StaggerReveal({
  children,
  className = "",
  staggerMs = 80,
  threshold = 0.08,
}: {
  children: ReactNode;
  className?: string;
  staggerMs?: number;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const children = container.querySelectorAll(".stagger-child");
          children.forEach((child, i) => {
            setTimeout(() => {
              child.classList.add("is-visible");
            }, i * staggerMs);
          });
          obs.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -5% 0px" }
    );
    obs.observe(container);
    return () => obs.disconnect();
  }, [staggerMs, threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
