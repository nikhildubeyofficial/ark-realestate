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
              className="group flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left transition-all duration-300 hover:bg-white/[0.03] hover:pl-2 sm:py-6"
              aria-expanded={isOpen}
            >
              <h3 className="font-serif text-base font-medium text-white/90 transition-colors duration-300 group-hover:text-[#c9a84c] sm:text-lg">
                {item.q}
              </h3>
              <span
                className={`shrink-0 text-lg text-[#c9a84c] transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isOpen ? "rotate-45 scale-110" : "group-hover:scale-110"
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`accordion-content ${isOpen ? "is-open" : ""}`}
            >
              <div>
                <div className="pb-6 pr-2 font-light text-white/65 text-sm leading-relaxed sm:pr-8">
                  {item.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
