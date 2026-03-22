"use client";

import { useState } from "react";
import InquireModal from "@/components/InquireModal";
import type { PropertyListing } from "@/lib/propertyData";

export default function PropertyDetailInquireButton({
  listing,
}: {
  listing: PropertyListing;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="border border-[#c9a84c] bg-[#c9a84c]/15 px-8 py-3 text-sm font-light text-[#c9a84c] transition hover:bg-[#c9a84c] hover:text-[#060606]"
      >
        Inquire
      </button>
      <InquireModal
        listing={open ? listing : null}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
