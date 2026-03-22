"use client";

import { useState } from "react";

const ITEMS: { q: string; a: string }[] = [
  {
    q: "Who can buy property in Dubai?",
    a: "UAE nationals and GCC citizens may purchase freehold property across designated areas. Foreign nationals may buy freehold in approved zones (including most major communities) with full ownership rights. Buyers typically need a valid passport; residency is not always required for purchase, but mortgage and visa rules vary by bank and profile.",
  },
  {
    q: "What are the costs involved?",
    a: "Beyond the purchase price, budget for Dubai Land Department (DLD) fees, registration, trust fees, and broker commission where applicable. Off-plan purchases may include instalment schedules tied to construction milestones. Your advisor will provide a line-by-line estimate before you commit.",
  },
  {
    q: "How do I get a mortgage?",
    a: "UAE banks and select international lenders offer mortgages to residents and eligible non-residents, subject to income, affordability, and property eligibility. Typical requirements include proof of income, bank statements, and a valuation. We connect you with trusted mortgage partners and guide documentation end to end.",
  },
];

export default function HomeBuyingKnowAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mt-12 border-y border-white/10">
      {ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b border-white/10 last:border-b-0">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left transition-colors duration-300 hover:bg-white/5 sm:py-6"
              aria-expanded={isOpen}
            >
              <h3 className="font-serif text-base font-medium text-white/90 sm:text-lg">
                {item.q}
              </h3>
              <span
                className={`shrink-0 text-[#c9a84c] transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            {isOpen ? (
              <div className="animate-hero-sub pb-6 pr-2 font-light text-white/65 text-sm leading-relaxed sm:pr-8">
                {item.a}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
