"use client";

import { useEffect, useId, useState } from "react";
import { buildInquireWhatsAppUrl } from "@/lib/inquire";
import type { PropertyListing } from "@/lib/propertyData";

type Props = {
  listing: PropertyListing | null;
  onClose: () => void;
};

export default function InquireModal({ listing, onClose }: Props) {
  const titleId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!listing) return;
    setMessage(
      `I would like more details about "${listing.title}" (${listing.location}).`
    );
  }, [listing]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!listing) return null;

  const submitWhatsApp = () => {
    const url = buildInquireWhatsAppUrl({
      propertyTitle: listing.title,
      slug: listing.slug,
      location: listing.location,
      price: listing.price,
      name: name.trim() || undefined,
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      message: message.trim() || undefined,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const mailtoHref = `mailto:info@arkvision.ae?subject=${encodeURIComponent(
    `Inquiry: ${listing.title}`
  )}&body=${encodeURIComponent(
    `${message}\n\nRef: ${listing.slug}\n${listing.price} — ${listing.location}`
  )}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto border border-white/15 bg-[#080808] shadow-2xl">
        <div className="border-b border-white/10 px-6 py-4">
          <h2 id={titleId} className="font-serif text-xl font-medium text-white/90">
            Inquire
          </h2>
          <p className="mt-1 text-xs text-white/45 line-clamp-2">{listing.title}</p>
        </div>
        <div className="space-y-4 px-6 py-5">
          <label className="block">
            <span className="text-[10px] uppercase tracking-widest text-white/40">
              Full name
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white/90 outline-none focus:border-[#c9a84c]/60"
              autoComplete="name"
            />
          </label>
          <label className="block">
            <span className="text-[10px] uppercase tracking-widest text-white/40">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white/90 outline-none focus:border-[#c9a84c]/60"
              autoComplete="email"
            />
          </label>
          <label className="block">
            <span className="text-[10px] uppercase tracking-widest text-white/40">
              Phone
            </span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white/90 outline-none focus:border-[#c9a84c]/60"
              autoComplete="tel"
            />
          </label>
          <label className="block">
            <span className="text-[10px] uppercase tracking-widest text-white/40">
              Message
            </span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="mt-1 w-full resize-none border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white/90 outline-none focus:border-[#c9a84c]/60"
            />
          </label>
        </div>
        <div className="flex flex-wrap gap-3 border-t border-white/10 px-6 py-4">
          <button
            type="button"
            onClick={submitWhatsApp}
            className="flex-1 min-w-[140px] border border-[#c9a84c] bg-[#c9a84c]/10 px-4 py-3 text-sm font-light text-[#c9a84c] transition hover:bg-[#c9a84c] hover:text-[#060606]"
          >
            Continue on WhatsApp
          </button>
          <a
            href={mailtoHref}
            className="flex-1 min-w-[120px] border border-white/20 px-4 py-3 text-center text-sm font-light text-white/80 transition hover:border-[#c9a84c] hover:text-[#c9a84c]"
          >
            Email instead
          </a>
          <button
            type="button"
            onClick={onClose}
            className="w-full border border-white/15 px-4 py-3 text-sm font-light text-white/60 transition hover:text-white sm:w-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
